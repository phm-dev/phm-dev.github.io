---
title: Czym jest PHM
description: PHM to binarny menedżer pakietów PHP dla macOS. Dostarcza prekompilowane pakiety PHP — bez Homebrew, bez MacPorts, bez kompilacji.
---

## Definicja

**PHM (PHP Manager)** to binarny menedżer pakietów PHP dla macOS. Dostarcza prekompilowane pakiety PHP, które instalują się w sekundy — bez Homebrew, bez MacPorts, bez lokalnej kompilacji.

PHM podąża za modelem Debiana/Ubuntu: PHP i jego rozszerzenia są budowane raz na CI, dystrybuowane jako podpisane pakiety binarne i instalowane natychmiast na dowolnym Macu.

## Problem, który PHM rozwiązuje

Na Linuxie (Ubuntu/Debian) instalacja PHP jest trywialna:

```bash
apt install php8.5-cli php8.5-fpm php8.5-redis
```

Na macOS nie ma odpowiednika. Instalacja samego PHP to dopiero połowa problemu — rozszerzenia są gorsze. Jeśli potrzebujesz Redis, ImageMagick lub MongoDB, jesteś skazany na PECL, co oznacza:

- instalację Xcode Command Line Tools, autoconf i zależności budowania
- uruchomienie `pecl install redis` i nadzieję, że kompilacja się powiedzie
- ręczną konfigurację `php.ini` żeby załadować rozszerzenie
- powtórzenie tego dla każdego rozszerzenia, każdej wersji PHP, każdej maszyny
- radzenie sobie z problemami podpisywania kodu macOS, które mogą po cichu crashować PHP

Sytuacja z samym PHP nie jest dużo lepsza:

- **Homebrew** — kompiluje PHP ze źródeł na każdej maszynie, trwa 10+ minut, psuje się przy aktualizacjach, nie obsługuje czysto wielu wersji, brak pakietów rozszerzeń
- **MacPorts** — podobny narzut kompilacji, mniejsza społeczność
- **phpbrew** — wymaga narzędzi budowania (autoconf, bison, re2c), kruchy, brak pakietów binarnych
- **Docker** — narzut dla lokalnego developmentu, problemy z wydajnością systemu plików na macOS
- **Ręczna kompilacja** — wymaga Xcode, zależności budowania, głębokiej wiedzy o flagach configure

PHM eliminuje to wszystko. Jedno polecenie, natychmiastowa instalacja, zero kompilacji:

```bash
phm install php8.5-cli php8.5-fpm php8.5-redis
```

## Jak działa PHM

1. **Prekompilowane pakiety** są budowane codziennie na GitHub Actions (runnery macOS dla Apple Silicon i Intel)
2. **Pakiety są hostowane** jako assety GitHub Releases — bez osobnej infrastruktury serwerowej
3. **PHM CLI** pobiera i rozpakowuje pakiety do `/opt/php/`, zarządzając dowiązaniami symbolicznymi i konfiguracją
4. **Każda wersja PHP** żyje w osobnym katalogu (`/opt/php/8.5/`, `/opt/php/8.4/`), bez konfliktów
5. **Rozszerzenia** to osobne pakiety, prekompilowane wobec pasującej wersji PHP

## Główne cechy

- **Natychmiastowa instalacja** — prekompilowane binarki, bez kompilacji na Twojej maszynie
- **Wiele wersji PHP** — 8.1, 8.2, 8.3, 8.4, 8.5 obok siebie
- **40+ rozszerzeń** — Redis, Xdebug, ImageMagick, MongoDB i inne
- **Wbudowane narzędzia** — Composer, Symfony CLI, PHPStan, PHP CS Fixer przez `phm install`
- **Zarządzanie PHP-FPM** — start, stop, restart, autostart
- **Wersje PHP per projekt** — przez Symfony CLI + plik `.php-version`
- **Natywne dla macOS** — zaprojektowane specjalnie dla macOS, bez kompromisów wieloplatformowych
- **Open source** — licencja MIT, w pełni przejrzysty pipeline budowania

## Dla kogo jest PHM

- **Deweloperzy PHP na macOS** którzy chcą szybkiej, niezawodnej instalacji PHP
- **Zespoły** potrzebujące spójnych środowisk PHP na maszynach deweloperów
- **Deweloperzy pracujący nad wieloma projektami** z różnymi wymaganiami wersji PHP
- **Każdy zmęczony Homebrew PHP** psującym się przy aktualizacjach lub zbyt długą kompilacją

## Dla kogo PHM nie jest

- **Użytkownicy Linuxa** — Linux ma już doskonałe repozytoria PHP (Ondrej Sury PPA, Remi RPM)
- **Użytkownicy Windows** — PHM jest tylko dla macOS
- **Serwery produkcyjne** — PHM jest dla maszyn deweloperskich, nie wdrożeń serwerowych

## Szybki start

```bash
# Zainstaluj PHM
curl -fsSL https://raw.githubusercontent.com/phm-dev/phm/main/scripts/install-phm.sh | bash

# Dodaj do PATH
export PATH="/opt/php/bin:$PATH"

# Zainstaluj PHP
phm install php8.5-cli php8.5-fpm php8.5-redis

# Zainstaluj narzędzia deweloperskie
phm install composer symfony
```

## Linki

- [PHM CLI na GitHubie](https://github.com/phm-dev/phm)
- [Repozytorium pakietów PHP](https://github.com/phm-dev/php-packages)
- [Instrukcja instalacji](/pl/installation/)
- [Dostępne pakiety](/pl/packages/)
