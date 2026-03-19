---
title: Pliki konfiguracyjne
description: Struktura katalogów i konfiguracja PHP
---

## Struktura katalogów

PHM instaluje każdą wersję PHP w osobnym katalogu:

```
/opt/php/8.5/
├── bin/                          # Pliki wykonywalne
│   ├── php
│   ├── phpize
│   ├── php-config
│   └── pecl
├── sbin/
│   └── php-fpm                   # PHP-FPM
├── etc/
│   ├── cli/
│   │   └── php.ini               # Konfiguracja dla CLI
│   ├── fpm/
│   │   └── php.ini               # Konfiguracja dla FPM
│   ├── php-fpm.conf              # Główna konfiguracja FPM
│   ├── php-fpm.d/
│   │   └── www.conf              # Konfiguracja puli
│   └── conf.d/                   # Konfiguracja rozszerzeń
│       ├── 10-opcache.ini
│       └── 20-redis.ini
└── lib/php/extensions/
    └── no-debug-non-zts-*/       # Pliki rozszerzeń (.so)
        ├── redis.so
        └── ...
```

## Różnice między CLI a FPM

PHM używa oddzielnych plików `php.ini` dla CLI i FPM:

| Ustawienie | CLI | FPM |
|------------|-----|-----|
| `memory_limit` | -1 (bez limitu) | 128M |
| `max_execution_time` | 0 (bez limitu) | 30 |
| `display_errors` | On | Off |

## Zmiana memory_limit

### Dla CLI

```bash
# Edytuj plik php.ini dla CLI
nano /opt/php/8.5/etc/cli/php.ini

# Lub dodaj na końcu pliku:
echo "memory_limit = 512M" >> /opt/php/8.5/etc/cli/php.ini
```

### Dla FPM

```bash
# Edytuj plik php.ini dla FPM
nano /opt/php/8.5/etc/fpm/php.ini

# Lub dodaj na końcu pliku:
echo "memory_limit = 256M" >> /opt/php/8.5/etc/fpm/php.ini

# Zrestartuj PHP-FPM
phm fpm restart 8.5
```

:::caution[Uwaga]
Pamiętaj o restarcie PHP-FPM po zmianie konfiguracji FPM.
:::

## Zarządzanie rozszerzeniami

PHM pozwala łatwo włączać i wyłączać rozszerzenia:

| Komenda | Opis |
|---------|------|
| `phm ext list` | Lista rozszerzeń |
| `phm ext enable redis` | Włącz rozszerzenie |
| `phm ext disable xdebug` | Wyłącz rozszerzenie |
| `phm ext enable opcache --sapi fpm` | Włącz tylko dla FPM |

## Pliki konfiguracyjne rozszerzeń

Rozszerzenia są konfigurowane przez pliki `.ini` w katalogu `conf.d`:

```
/opt/php/8.5/etc/conf.d/
├── 10-opcache.ini    # Ładowany jako pierwszy (priorytet 10)
├── 20-redis.ini      # Ładowany jako drugi (priorytet 20)
├── 20-igbinary.ini
└── 20-mongodb.ini
```

:::note[Kolejność ładowania]
Prefiks liczbowy (10-, 20-) określa kolejność ładowania rozszerzeń.
:::

### Przykładowe pliki .ini

```ini
# 20-redis.ini
extension=redis.so

# 10-opcache.ini (używa zend_extension)
zend_extension=opcache.so
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=10000
```
