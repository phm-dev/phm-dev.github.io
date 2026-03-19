---
title: Shell Setup
description: How to add PHP to PATH in bash or zsh
---

## Check Your Shell

macOS uses zsh by default (since Catalina). Check your shell:

```bash
echo $SHELL
# or
echo $0
```

## Which File to Edit

| Shell | Config file |
|-------|-------------|
| **zsh** (macOS default) | `~/.zshrc` |
| **bash** | `~/.bashrc` or `~/.bash_profile` |

## What to Add

Add the following line at the end of the appropriate file:

```bash
export PATH="/opt/php/bin:$PATH"
```

:::note[Alternative location]
You can also add this line to `~/.zprofile` (for zsh) or `~/.bash_profile` (for bash) if you want the variable available only during login.
:::

## Reload Configuration

After saving the file, reload your shell configuration:

```bash
# For bash
source ~/.bashrc

# For zsh
source ~/.zshrc
```

## Install PHP

Now you can install PHP:

```bash
# Update the package index
phm update

# Install PHP 8.5 with FPM and popular extensions
phm install php8.5-cli php8.5-fpm php8.5-redis php8.5-opcache

# Set as default version
phm use 8.5
```

## Verification

Check that everything is set up correctly:

```bash
which php
# Should return: /opt/php/bin/php

php -v
# Should show: PHP 8.5.x
```

:::tip[Next step]
If you want to use PHP with a web server, proceed to web server configuration.

[Go to web servers →](/web-servers/)
:::
