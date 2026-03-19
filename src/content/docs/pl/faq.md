---
title: FAQ
description: Najczęściej zadawane pytania o PHM — binarny menedżer pakietów PHP dla macOS.
---

## Ogólne

### Czym jest PHM?

PHM (PHP Manager) to binarny menedżer pakietów PHP dla macOS. Dostarcza prekompilowane pakiety PHP, które instalują się w sekundy — bez Homebrew, bez MacPorts, bez lokalnej kompilacji.

### Czy PHM jest darmowy?

Tak. PHM jest oprogramowaniem open-source wydanym na licencji MIT. Zarówno [narzędzie CLI](https://github.com/phm-dev/phm), jak i [repozytorium pakietów](https://github.com/phm-dev/php-packages) są dostępne na GitHubie.

### Czy PHM działa na Linuxie?

Nie. PHM jest zaprojektowane wyłącznie dla macOS. Użytkownicy Linuxa powinni korzystać z menedżera pakietów swojej dystrybucji — dla Ubuntu/Debian, [Ondrej Sury PPA](https://deb.sury.org/) dostarcza doskonałe pakiety PHP.

### Czy PHM działa na Macach z Intelem?

Tak. PHM dostarcza prekompilowane pakiety zarówno dla Apple Silicon (arm64), jak i Intel (amd64) Maców z macOS 13 (Ventura) lub nowszym.

### Czy PHM zastępuje Homebrew?

Nie w całości. PHM zastępuje Homebrew tylko w zakresie pakietów związanych z PHP. Nadal możesz potrzebować Homebrew do baz danych (MySQL, PostgreSQL), narzędzi (nginx, serwer Redis) i innego oprogramowania niezwiązanego z PHP.

---

## Instalacja

### Jak zainstalować PHM?

```bash
curl -fsSL https://raw.githubusercontent.com/phm-dev/phm/main/scripts/install-phm.sh | bash
export PATH="/opt/php/bin:$PATH"
```

### Gdzie PHM instaluje PHP?

PHP jest instalowane w `/opt/php/`. Każda wersja ma swój katalog:
- `/opt/php/8.5/` — PHP 8.5
- `/opt/php/8.4/` — PHP 8.4
- `/opt/php/bin/` — dowiązania symboliczne do aktywnej wersji

### Czy mogę mieć zainstalowanych kilka wersji PHP jednocześnie?

Tak. PHM instaluje każdą wersję PHP w osobnym katalogu. Możesz mieć PHP 8.1, 8.2, 8.3, 8.4 i 8.5 zainstalowane jednocześnie bez konfliktów.

### Jak przełączać się między wersjami PHP?

Dwa sposoby:
- **Per projekt** (zalecane): Użyj Symfony CLI z plikiem `.php-version` — `phm install symfony`, potem `symfony php -v`
- **Globalnie**: Użyj `phm use 8.5` aby ustawić domyślną wersję systemową

### Jak odinstalować PHM?

```bash
phm destruct
```

To usuwa wszystkie pakiety zainstalowane przez PHM oraz sam PHM.

---

## Pakiety

### Jakie wersje PHP są dostępne?

PHM obsługuje PHP 8.1, 8.2, 8.3, 8.4 i 8.5. Nowe wersje patchowe są budowane automatycznie w ciągu kilku godzin od wydania na php.net.

### Jakie rozszerzenia są dostępne?

Ponad 40 rozszerzeń w tym: Redis, Xdebug, ImageMagick, MongoDB, AMQP, APCu, igbinary, intl, mbstring, GD, pcov i wiele innych. Zobacz [pełną listę pakietów](/pl/packages/).

### Jak zainstalować Composer?

```bash
phm install composer
```

PHM pobiera Composer z getcomposer.org i konfiguruje go automatycznie. Bez ręcznego `curl` czy `mv`.

### Jak często aktualizowane są pakiety?

Codziennie. Workflow GitHub Actions sprawdzają nowe wersje PHP i rozszerzeń każdego dnia o 3:00 UTC. Jeśli zostanie znaleziona nowa wersja, pakiety są budowane i publikowane automatycznie.

### Czy mogę zainstalować konkretną wersję patchową PHP?

Tak:
```bash
phm install php8.5.4-cli    # konkretna wersja patchowa
phm install php8.5-cli      # najnowsza 8.5.x (zalecane)
```

---

## Rozwiązywanie problemów

### Proces PHP crashuje po cichu po zainstalowaniu rozszerzenia z PECL

To problem z podpisywaniem kodu macOS. Pakiety PHM są budowane jako spójny zestaw z prawidłowymi podpisami. Jeśli skompilujesz rozszerzenie przez `pecl install`, niepodpisany plik `.so` może unieważnić podpis procesu PHP, powodując, że ochrona kernela macOS go zabije.

**Rozwiązanie**: Używaj `phm install` zamiast `pecl install` dla wszystkich dostępnych rozszerzeń. Jeśli rozszerzenie nie jest dostępne w PHM, [zgłoś zapotrzebowanie](https://github.com/phm-dev/php-packages/issues).

### `php: command not found` po instalacji

Musisz dodać katalog bin PHM do PATH:

```bash
# Dodaj do ~/.zshrc (lub ~/.bashrc)
export PATH="/opt/php/bin:$PATH"

# Przeładuj
source ~/.zshrc
```

### Homebrew PHP koliduje z PHM

PHM instaluje w `/opt/php/bin`, co jest oddzielone od `/opt/homebrew/bin` Homebrew. Jeśli oba są w PATH, upewnij się, że `/opt/php/bin` jest pierwszy:

```bash
export PATH="/opt/php/bin:$PATH"
```

### Jak zgłosić błąd lub zaproponować funkcję?

- Problemy z PHM CLI: [github.com/phm-dev/phm/issues](https://github.com/phm-dev/phm/issues)
- Problemy z pakietami/rozszerzeniami: [github.com/phm-dev/php-packages/issues](https://github.com/phm-dev/php-packages/issues)
