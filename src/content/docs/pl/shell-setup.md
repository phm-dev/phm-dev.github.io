---
title: Konfiguracja powłoki
description: Jak dodać PHP do PATH w bash lub zsh
---

## Sprawdź jakiej powłoki używasz

macOS domyślnie używa zsh (od Catalina). Sprawdź swoją powłokę:

```bash
echo $SHELL
# lub
echo $0
```

## Który plik edytować

| Powłoka | Plik konfiguracyjny |
|---------|---------------------|
| **zsh** (domyślna w macOS) | `~/.zshrc` |
| **bash** | `~/.bashrc` lub `~/.bash_profile` |

## Co dodać do pliku

Dodaj poniższą linię na końcu odpowiedniego pliku:

```bash
export PATH="/opt/php/bin:$PATH"
```

:::note[Alternatywna lokalizacja]
Możesz też dodać tę linię do pliku `~/.zprofile` (dla zsh) lub `~/.bash_profile` (dla bash), jeśli chcesz, aby zmienna była dostępna tylko podczas logowania.
:::

## Przeładuj konfigurację

Po zapisaniu pliku, przeładuj konfigurację powłoki:

```bash
# Dla bash
source ~/.bashrc

# Dla zsh
source ~/.zshrc
```

## Instalacja PHP

Teraz możesz zainstalować PHP:

```bash
# Zaktualizuj indeks pakietów
phm update

# Zainstaluj PHP 8.5 z FPM i popularnymi rozszerzeniami
phm install php8.5-cli php8.5-fpm php8.5-redis php8.5-opcache

# Ustaw jako domyślną wersję
phm use 8.5
```

## Weryfikacja

Sprawdź czy wszystko jest poprawnie skonfigurowane:

```bash
which php
# Powinno zwrócić: /opt/php/bin/php

php -v
# Powinno pokazać: PHP 8.5.x
```

:::tip[Następny krok]
Jeśli chcesz używać PHP z serwerem WWW, przejdź do konfiguracji serwerów.

[Przejdź do serwerów WWW →](/pl/web-servers/)
:::
