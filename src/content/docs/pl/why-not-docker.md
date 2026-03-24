---
title: Dlaczego nie Docker?
description: Dlaczego uruchamianie PHP w kontenerach Docker do lokalnego developmentu jest często architektonicznym nieporozumieniem i kiedy natywny runtime PHP jest lepszym wyborem.
---

## „Just use Docker, bro"

W świecie PHP jest pewien odruch, który z czasem urósł do rangi domyślnego standardu:

> masz uruchomić projekt lokalnie? Wrzuć wszystko do Dockera.

PHP, nginx, baza danych, Redis, kolejka, search engine, mailpit — a potem dorzuć jeszcze warstwę zarządzającą (Warden, DDEV, Lando), bo samo `docker compose up` okazuje się niewystarczające.

I właśnie w tym miejscu warto się zatrzymać i zadać jedno pytanie: **czy naprawdę rozwiązujemy problem, czy po prostu przyzwyczailiśmy się do jego obchodzenia?**

---

## Docker jest świetny. Na swoim miejscu.

To nie jest tekst przeciwko Dockerowi. Docker rozwiązuje realne, trudne problemy:

- izolacja środowiska między projektami,
- powtarzalne i deterministyczne deploye,
- hermetyzacja zależności systemowych,
- skalowanie i orkiestracja na produkcji.

Dlatego Docker **naprawdę ma sens** dla usług infrastrukturalnych, nawet lokalnie:

- PostgreSQL / MySQL
- Redis / Valkey
- RabbitMQ
- OpenSearch / Meilisearch
- Mailpit

To są niezależne procesy ze swoim własnym stanem, wersjami i cyklem życia. Trzymanie ich w kontenerach jest rozsądne i pragmatyczne.

**Ale PHP runtime to nie jest usługa infrastrukturalna.**

To narzędzie dewelopera. Interpreter, z którym pracujesz bezpośrednio: uruchamiasz `php`, `composer`, `phpunit`, `phpstan`, `rector`, skrypty CLI, debugger, watchery. I właśnie dlatego wrzucanie go do kontenera lokalnie jest bardzo często architektonicznym nieporozumieniem.

---

## Co się dzieje, gdy kontener staje się protezą runtime

W większości ekosystemów runtime języka działa natywnie na maszynie dewelopera. Go jest instalowane lokalnie. Node działa lokalnie, z `nvm` albo `volta`. Python działa lokalnie, z `pyenv` i virtualenv. Docker bywa tam używany, ale jako opcja, nie fundament.

W PHP przez lata poszło inaczej. Zamiast uporządkować sposób instalacji i przełączania wersji runtime, bardzo wiele środowisk poszło w stronę: *„wrzućmy PHP do kontenera, to problem zniknie"*. Tyle że problem nie zniknął — tylko przeniósł się warstwę niżej.

Od tego momentu każde proste działanie zaczyna wymagać pośrednika. Zamiast uruchamiać polecenia bezpośrednio, działasz przez kontener — co oznacza:

- dodatkową warstwę I/O,
- dodatkową warstwę sieci,
- dodatkową warstwę konfiguracji,
- dodatkową warstwę debugowania,
- dodatkowe punkty, w których coś może pójść nie tak.

Każda warstwa abstrakcji ma cenę. Warstwy nie są darmowe.

---

## Każda warstwa abstrakcji ma koszt

To jest punkt, który często ginie pod marketingiem narzędzi. Warstwa abstrakcji:

- utrudnia obserwowalność,
- oddala dewelopera od rzeczywistego procesu,
- zwiększa liczbę miejsc, w których coś może pójść źle,
- komplikuje debugowanie,
- wprowadza narzut — wydajnościowy lub poznawczy.

Model natywny jest prosty:

```
interpreter → projekt → polecenie
```

Model kontenerowy staje się wielopoziomowy:

```
host OS → Docker Desktop → obraz → kontener → mounty / wolumeny / sieć → PHP
```

Każda awaria, spowolnienie albo niespójność może wynikać z każdej z tych warstw. Prosty problem przestaje być prosty do zdiagnozowania.

---

## Twarde dane: wydajność to nie detal

### File system I/O

Na macOS Docker (nawet z VirtioFS) jest **1.5× – 5× wolniejszy** od natywnego dostępu do plików.

Dla frameworków PHP to ma realne znaczenie:

- `vendor/` z tysiącami plików,
- cache Symfony/Laravel,
- skompilowane szablony,
- pliki sesji.

Każdy request w trybie dev = intensywny dostęp do filesystemu. Każda iteracja testów = to samo. Przemnóż to przez liczbę requestów w ciągu dnia.

### Cold start

| Operacja | Czas |
|---|---|
| `php -S localhost:8000` | ~50ms |
| `docker compose up` | 3–15s |

To nie jest detal optymalizacyjny. To jest różnica między *flow* a *czekaniem*.

### RAM i bateria

| Runtime | Zużycie RAM |
|---|---|
| Natywne PHP | ~30MB |
| Docker Desktop + kontenery | 1–2GB |

Docker Desktop utrzymuje stale działającą VM, synchronizuje I/O i obsługuje wirtualną sieć. Na laptopie deweloperskim przekłada się to na zauważalny drain baterii i wyższe zużycie CPU przy każdej operacji.

### Debugger

**Natywnie:**
```
Xdebug → localhost:9003 → działa
```

**W kontenerze:**
- forwarding portów,
- `host.docker.internal`,
- mapowanie ścieżek (host ↔ container),
- rozbieżności między ścieżkami plików w IDE i kontenerze.

To nie są edge case'y. To jest codzienność każdego, kto próbuje złapać breakpointa z IDE.

### Zestawienie

| Kryterium | Native PHP | Docker | Wygrywa |
|---|---|---|---|
| Cold start | ~50ms | 3–15s | Native |
| File I/O (macOS) | 1× | 1.5–5× wolniej | Native |
| Debugger | trivial | wymaga konfiguracji | Native |
| RAM | ~30MB | 1–2GB | Native |
| Disk | ~50MB | 500MB–2GB | Native |
| Zużycie baterii | niskie | wysokie | Native |
| Onboarding | wymaga narzędzia | łatwiejszy | Docker |
| Infra (DB, Redis) | trudniej | łatwo | Docker |
| CI parity | brak | możliwe | Docker |

Wynik **6:3 dla Native** — w kontekście codziennego environment deweloperskiego.

---

## „Works on my machine" nie znika. Tylko zmienia formę.

Argument za Dockerem brzmi często: *Docker eliminuje problem „u mnie działa"*. To półprawda.

Docker potrafi zwiększyć powtarzalność środowiska, ale tylko wtedy, gdy:

- obrazy są dobrze zdefiniowane i rebuildowane po zmianach,
- wersje są pilnowane i nie driftują,
- host system nie wpływa istotnie na I/O,
- architektura procesora nie robi niespodzianek (ARM vs x86),
- permissions i UID/GID są spójne między hostem a kontenerem,
- narzędzia wokół kontenera są stabilne.

Gdy któryś z tych warunków nie jest spełniony, znika problem *„jaką masz wersję PHP?"*, a pojawiają się nowe:

- *czemu kontener działa wolno?*
- *czemu pliki tworzą się z innym właścicielem?*
- *czemu debugger nie łapie breakpointów?*
- *czemu `composer install` w kontenerze daje inne wyniki niż lokalnie?*
- *czemu po restarcie trzeba czyścić cache albo przebudowywać obraz?*

To nie jest brak kompetencji. To jest koszt architektoniczny wynikający z dokładania zbędnych warstw pośrednich.

---

## Wardeny, DDEV, Lando — sygnał, nie rozwiązanie

Narzędzia do zarządzania lokalnym środowiskiem Dockerowym nie wzięły się znikąd. One istnieją, bo sam model *runtime w kontenerze* generuje tyle tarcia, że potrzebna jest kolejna warstwa do jego ukrycia.

Jeśli do uruchomienia interpretera języka potrzebujesz:

- Dockera,
- Docker Compose,
- gotowego zestawu obrazów,
- skryptów bootstrapujących,
- własnego CLI,
- wrapperów do wykonywania poleceń,
- i zestawu instrukcji *„co zrobić, gdy coś się rozsypie"*,

to nie uprościłeś środowiska deweloperskiego. Ty je skomplikowałeś — a potem dobudowałeś panel sterowania do tej komplikacji.

Warden i podobne narzędzia bywają wygodne. Ale rozwiązują problemy stworzone przez wcześniejszą decyzję architektoniczną, nie przez naturę samego zadania.

---

## Najbardziej nadużywany argument: parity z produkcją

*„Ale na produkcji mamy Dockera"* — to jeden z najczęstszych kontrargumentów. I jeden z najbardziej nadużywanych.

Środowisko deweloperskie nie istnieje po to, żeby symulować produkcję w każdej warstwie. Istnieje po to, żeby:

- **maksymalizować szybkość iteracji**,
- być przewidywalne,
- zapewniać wygodny, krótki feedback loop.

Prawdziwe parity z produkcją to:

- CI/CD,
- staging,
- testy integracyjne i end-to-end.

Nie laptop dewelopera. Nikt rozsądny nie oczekuje, że lokalne środowisko będzie kopią klastra produkcyjnego z load balancerami, service meshem i politykami bezpieczeństwa z live.

---

## Jaki jest właściwy podział?

To nie jest wybór między *Docker a Native*. To jest kwestia właściwego podziału odpowiedzialności.

**Optymalny setup:**

```sh
# Infrastruktura — Docker
docker compose up -d mysql redis rabbitmq opensearch

# PHP runtime — natywnie
php -S localhost:8000
```

Takie podejście nie jest kompromisem. To jest właściwy podział narzędzi według ich natury:

- Docker zarządza procesami ze stanem, wersjami, własnym cyklem życia — usługami,
- natywny runtime daje bezpośredni, szybki, niezapośredniczony dostęp do interpretera.

---

## Kiedy Docker dla PHP lokalnie ma sens

Żeby było uczciwie: są sytuacje, w których runtime PHP w kontenerze jest uzasadniony:

- projekt wymaga specyficznych natywnych bibliotek, które trudno zainstalować lokalnie,
- projekt jest legacy — łatwiej go zamrozić niż sensownie przenieść.

To są prawdziwe wyjątki. Problem zaczyna się wtedy, gdy wyjątek zostaje ogłoszony domyślnym standardem.

---

## Skąd się wziął ten problem

Prawdziwy problem PHP przez lata nie brzmiał: *„potrzebujemy Dockera"*. Brzmiał: **przez lata brakowało dobrego, lekkiego i przewidywalnego sposobu na zarządzanie lokalnym runtime PHP oraz jego wersjami**.

Gdy ekosystem nie dawał wygodnej odpowiedzi na pytanie *jak łatwo zainstalować i przełączać wersje PHP między projektami*, naturalnie pojawił się skrót: *„to wrzućmy wszystko do kontenera"*. I Docker stał się dla wielu zespołów nie tyle najlepszym rozwiązaniem, co zastępczym obejściem braków toolingowych.

---

## Wniosek

Docker jest świetnym narzędziem. Jak każde dobre narzędzie — staje się złym, gdy używa się go do wszystkiego.

Lokalne uruchamianie PHP w kontenerze bywa uzasadnione, ale w wielu projektach jest po prostu kosztownym objazdem wokół problemu, który powinien być rozwiązany u źródła.

Jeśli konteneryzujesz bazę, kolejkę i cache — to rozsądne. Jeśli konteneryzujesz interpreter tylko dlatego, że tak się przyjęło, a potem potrzebujesz kolejnych narzędzi do oswojenia tej decyzji — warto zadać sobie pytanie, czy nie pomyliłeś rozwiązania z obejściem.

Dobre środowisko deweloperskie nie jest tym, które ma najwięcej warstw. Jest tym, które ma **najmniej tarcia przy największej przewidywalności**.
