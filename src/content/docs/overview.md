---
title: Documentation
description: Complete guide to PHM — the PHP manager for macOS
---

PHM (PHP Manager) is a binary PHP package manager for macOS. Forget about Homebrew, MacPorts, and local compilation. PHM downloads ready-made, precompiled packages and installs them in seconds.

## Quick Start

### 1. Install PHM

```bash
curl -fsSL https://raw.githubusercontent.com/phm-dev/phm/main/scripts/install-phm.sh | bash
```

### 2. Add PHP to PATH

```bash
export PATH="/opt/php/bin:$PATH"
```

### 3. Install PHP

```bash
phm install php8.5-cli php8.5-fpm
phm use 8.5
php -v
```

## What's Next

- [Installation](/installation/) — detailed installation instructions
- [Shell Setup](/shell-setup/) — bash, zsh, and environment variables
- [Developer Tools](/tools/) — Composer, Symfony CLI, PHPStan
- [Version Switching](/version-switching/) — per-project PHP versions with `.php-version`
- [Web Servers](/web-servers/) — Symfony server and PHP-FPM configuration
- [Configuration](/configuration/) — directory structure and php.ini
- [Available Packages](/packages/) — complete list of PHP packages

## Available Commands

```bash
phm install <package>         # Install packages or tools
phm remove <package>          # Remove packages or tools
phm upgrade                   # Upgrade all packages
phm list                      # List installed packages
phm search <query>            # Search packages
phm info <package>            # Show package details
phm use <version>             # Set default PHP version
phm fpm start|stop|restart    # Manage PHP-FPM
phm ext enable|disable <ext>  # Manage extensions
phm self-update               # Update PHM itself
```
