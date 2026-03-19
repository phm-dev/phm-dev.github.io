---
title: Narzędzia deweloperskie
description: Jak zainstalować Composer, Symfony CLI i inne narzędzia PHP za pomocą PHM
---

PHM ma wbudowany menedżer narzędzi. Narzędzia deweloperskie instalujesz tak samo jak pakiety PHP — poleceniem `phm install`.

## Dostępne narzędzia

| Narzędzie | Opis | Polecenie instalacji |
|-----------|------|----------------------|
| **composer** | Menedżer zależności PHP | `phm install composer` |
| **symfony** | Symfony CLI — buduj, uruchamiaj i zarządzaj aplikacjami PHP z terminala | `phm install symfony` |
| **phpstan** | Narzędzie analizy statycznej PHP | `phm install phpstan` |
| **php-cs-fixer** | PHP Coding Standards Fixer | `phm install php-cs-fixer` |
| **psalm** | Narzędzie analizy statycznej od Vimeo | `phm install psalm` |
| **laravel** | Instalator Laravel | `phm install laravel` |
| **deployer** | Narzędzie do wdrożeń PHP | `phm install deployer` |
| **castor** | Task runner zorientowany na DX | `phm install castor` |

## Instalacja narzędzi

Narzędzia instalowane są w `/opt/phm/bin` i zarządzane oddzielnie od pakietów PHP:

```bash
# Zainstaluj Composer i Symfony CLI
phm install composer symfony

# Zainstaluj PHP i narzędzia razem
phm install php8.5-cli composer phpstan

# Wymuś reinstalację (aktualizacja)
phm install composer --force

# Lista zainstalowanych pakietów i narzędzi
phm list
```

Narzędzia są instalowane globalnie i dostępne od razu w terminalu (jeśli `/opt/phm/bin` jest w PATH).

## Composer

```bash
phm install composer
```

PHM pobiera `composer.phar` z getcomposer.org i tworzy skrypt wrapper, który automatycznie używa PHP z PHM. Bez ręcznego `curl` czy `mv`.

```bash
composer --version
composer install
composer require some/package
```

:::tip[Aktualizacja Composer]
```bash
phm install composer --force
```
:::

## Symfony CLI

```bash
phm install symfony
```

Symfony CLI to narzędzie deweloperskie do budowania, uruchamiania i zarządzania aplikacjami PHP bezpośrednio z terminala. PHM pobiera binarkę dla Twojej platformy z GitHub releases.

Choć zaprojektowane dla Symfony, działa świetnie z **każdym projektem PHP** — Laravel, WordPress czy czysty PHP. Główne funkcje:

- **Lokalny serwer WWW** z automatycznym HTTPS i HTTP/2
- **Wersja PHP per projekt** przez plik `.php-version` — `symfony php` automatycznie używa właściwej wersji
- **Proxy** do dostępu do projektów przez lokalne domeny `.wip`
- **Integracja** z Docker, SymfonyCloud i platform.sh

```bash
# Uruchom lokalny serwer
symfony server:start -d

# Użyj wersji PHP specyficznej dla projektu (czyta .php-version)
symfony php -v
symfony composer install

# Działa z każdym projektem PHP, nie tylko Symfony
cd my-laravel-app
echo "8.4" > .php-version
symfony php artisan serve
```

Szczegóły w [Przełączanie wersji](/pl/version-switching/).

## PHPStan / Psalm / PHP CS Fixer

Te narzędzia instalowane są jako Phary przez Composer, zarządzane przez PHM:

```bash
phm install phpstan
phm install psalm
phm install php-cs-fixer
```

PHM obsługuje cały proces — pobiera narzędzie przez Composer w izolowanym katalogu, wyodrębnia phar i tworzy skrypt wrapper wskazujący na PHP z PHM. Nie trzeba konfigurować `~/.composer/vendor/bin`.

```bash
phpstan analyse src/
php-cs-fixer fix src/
psalm
```

## Laravel / Deployer / Castor

```bash
phm install laravel
phm install deployer
phm install castor
```

```bash
laravel new my-app
dep deploy
castor task:run
```

## Zarządzanie narzędziami

```bash
# Lista wszystkich zainstalowanych narzędzi
phm list

# Pokaż dostępne narzędzia
phm list -a

# Usuń narzędzie
phm remove phpstan

# Pokaż informacje o narzędziu
phm info composer
```

## PEAR / PECL

PEAR/PECL jest dostępny jako pakiet PHP:

```bash
phm install php8.5-pear
```

:::caution[Preferuj paczki PHM]
Dla rozszerzeń dostępnych jako paczki PHM (Redis, Xdebug itd.) zawsze używaj `phm install` zamiast `pecl install`. Paczki PHM są prekompilowane i nie wymagają narzędzi kompilacji.
:::

:::danger[Podpisywanie kodu w macOS]
macOS przypisuje ad-hoc podpis kodu binarkom przy pierwszym uruchomieniu. Paczki PHM są zbudowane i dystrybuowane jako spójny zestaw — binarka PHP i wszystkie rozszerzenia `.so` pochodzą z tego samego pipeline'u budowania, więc macOS waliduje je bez problemów.

Jeśli skompilujesz rozszerzenie lokalnie przez `pecl install`, wynikowy plik `.so` ma inny (lub żaden) podpis. Załadowanie go może **unieważnić podpis kodu procesu PHP**, powodując, że ochrona kernela macOS **zabije proces**. Często dzieje się to po cichu — PHP po prostu się crashuje bez czytelnego komunikatu błędu.

**Zasada**: jeśli paczka PHM istnieje dla rozszerzenia, którego potrzebujesz, zawsze jej użyj. Jeśli rozszerzenie nie jest dostępne w PHM — zgłoś zapotrzebowanie.

Brakuje Ci rozszerzenia? [Zgłoś issue](https://github.com/phm-dev/php-packages/issues) w repozytorium php-packages.
:::
