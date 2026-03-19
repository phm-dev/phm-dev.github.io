---
title: Dokumentacja
description: Kompletny przewodnik po PHM — menedżerze PHP dla macOS
---

PHM (PHP Manager) to binarny menedżer pakietów PHP dla macOS. Zapomnij o Homebrew, MacPorts i lokalnej kompilacji. PHM pobiera gotowe, prekompilowane pakiety i instaluje je w kilka sekund.

## Szybki start

### 1. Zainstaluj PHM

```bash
curl -fsSL https://raw.githubusercontent.com/phm-dev/phm/main/scripts/install-phm.sh | bash
```

### 2. Dodaj PHP do PATH

```bash
export PATH="/opt/php/bin:$PATH"
```

### 3. Zainstaluj PHP

```bash
phm install php8.5-cli php8.5-fpm
phm use 8.5
php -v
```

## Następne kroki

- [Instalacja PHM](/pl/installation/) — szczegółowe instrukcje instalacji
- [Konfiguracja powłoki](/pl/shell-setup/) — bash, zsh i zmienne środowiskowe
- [Narzędzia deweloperskie](/pl/tools/) — Composer, Symfony CLI, PHPStan
- [Przełączanie wersji](/pl/version-switching/) — wersje PHP per projekt z `.php-version`
- [Serwery WWW](/pl/web-servers/) — serwer Symfony i konfiguracja PHP-FPM
- [Pliki konfiguracyjne](/pl/configuration/) — struktura katalogów i php.ini
- [Dostępne pakiety](/pl/packages/) — pełna lista pakietów PHP

## Dostępne polecenia

```bash
phm install <pakiet>          # Zainstaluj pakiety lub narzędzia
phm remove <pakiet>           # Usuń pakiety lub narzędzia
phm upgrade                   # Zaktualizuj wszystkie pakiety
phm list                      # Lista zainstalowanych pakietów
phm search <zapytanie>        # Szukaj pakietów
phm info <pakiet>             # Pokaż szczegóły pakietu
phm use <wersja>              # Ustaw domyślną wersję PHP
phm fpm start|stop|restart    # Zarządzaj PHP-FPM
phm ext enable|disable <roz>  # Zarządzaj rozszerzeniami
phm self-update               # Zaktualizuj PHM
```
