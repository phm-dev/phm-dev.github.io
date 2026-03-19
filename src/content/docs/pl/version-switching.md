---
title: Przełączanie wersji
description: Jak przełączać wersje PHP per projekt za pomocą Symfony CLI i .php-version
---

PHM instaluje wiele wersji PHP obok siebie. Są dwa sposoby przełączania między nimi.

## Zalecane: Symfony CLI + `.php-version`

Zalecanym podejściem jest użycie [Symfony CLI](https://symfony.com/download) z plikiem `.php-version` w katalogu głównym projektu. Daje to automatyczne przełączanie wersji PHP per projekt.

### Konfiguracja

1. Zainstaluj Symfony CLI przez PHM:

```bash
phm install symfony
```

2. Utwórz plik `.php-version` w katalogu głównym projektu:

```bash
echo "8.5" > .php-version
```

3. Używaj `symfony php` zamiast `php`:

```bash
symfony php -v
# PHP 8.5.4 (cli) ...

symfony composer install
symfony console cache:clear
```

Symfony CLI odczytuje plik `.php-version` i automatycznie wybiera odpowiednią binarkę PHP z katalogu PHM `/opt/php/`.

### Praca per projekt

```
projekt-a/
├── .php-version    # Zawiera: 8.4
├── composer.json
└── src/

projekt-b/
├── .php-version    # Zawiera: 8.5
├── composer.json
└── src/
```

```bash
cd projekt-a
symfony php -v    # PHP 8.4.19

cd ../projekt-b
symfony php -v    # PHP 8.5.4
```

### Wbudowany serwer Symfony

Symfony CLI zawiera wbudowany serwer WWW, który również respektuje `.php-version`:

```bash
# Uruchom serwer (używa wersji PHP z .php-version)
symfony server:start -d

# Sprawdź używaną wersję PHP
symfony server:status

# Podgląd logów
symfony server:log

# Zatrzymaj serwer
symfony server:stop
```

Serwer Symfony zapewnia automatyczny HTTPS z lokalnie zaufanymi certyfikatami, wsparcie HTTP/2 i bezproblemową obsługę `.php-version`.

:::tip[Commituj `.php-version`]
Dodaj `.php-version` do repozytorium Git, aby cały zespół używał tej samej wersji PHP.
:::

## Alternatywa: `phm use`

Aby ustawić globalną domyślną wersję PHP:

```bash
# Ustaw PHP 8.5 jako globalny domyślny
phm use 8.5

# Zweryfikuj
php -v
```

Tworzy to dowiązania symboliczne w `/opt/php/bin/` wskazujące na wybraną wersję. Wpływa na wszystkie sesje terminala.

:::caution[Tylko globalne]
`phm use` zmienia wersję PHP globalnie. Do przełączania per projekt używaj Symfony CLI z `.php-version`.
:::

## Porównanie

| Cecha | Symfony CLI + `.php-version` | `phm use` |
|-------|------------------------------|-----------|
| Zakres | Per projekt | Globalny |
| Przełączanie | Automatyczne (czyta plik) | Ręczne polecenie |
| Dla zespołu | Tak (commituj `.php-version`) | Nie |
| Serwer WWW | Wbudowany (z HTTPS) | Wymaga osobnej konfiguracji |
| Zalecane | Tak | Dla prostych konfiguracji |
