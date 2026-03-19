---
title: Developer Tools
description: How to install Composer, Symfony CLI, and other PHP tools with PHM
---

PHM has a built-in tool manager. You install developer tools the same way you install PHP packages — with `phm install`.

## Available Tools

| Tool | Description | Install command |
|------|-------------|-----------------|
| **composer** | Dependency Manager for PHP | `phm install composer` |
| **symfony** | Symfony CLI — build, run, and manage PHP applications from terminal | `phm install symfony` |
| **phpstan** | PHP Static Analysis Tool | `phm install phpstan` |
| **php-cs-fixer** | PHP Coding Standards Fixer | `phm install php-cs-fixer` |
| **psalm** | Static Analysis Tool by Vimeo | `phm install psalm` |
| **laravel** | Laravel Installer | `phm install laravel` |
| **deployer** | Deployment tool for PHP | `phm install deployer` |
| **castor** | DX-oriented task runner | `phm install castor` |

## Installing Tools

Tools are installed to `/opt/phm/bin` and managed separately from PHP packages:

```bash
# Install Composer and Symfony CLI
phm install composer symfony

# Install PHP and tools together
phm install php8.5-cli composer phpstan

# Force reinstall (upgrade)
phm install composer --force

# List installed packages and tools
phm list
```

Tools are installed globally and available immediately in your terminal (if `/opt/phm/bin` is in your PATH).

## Composer

```bash
phm install composer
```

PHM downloads `composer.phar` from getcomposer.org and creates a wrapper script that uses PHM's PHP automatically. No manual `curl` or `mv` needed.

```bash
composer --version
composer install
composer require some/package
```

:::tip[Updating Composer]
```bash
phm install composer --force
```
:::

## Symfony CLI

```bash
phm install symfony
```

The Symfony CLI is a developer tool to help you build, run, and manage your PHP applications directly from your terminal. PHM downloads the binary for your platform from GitHub releases.

While designed for Symfony, it works great with **any PHP project** — Laravel, WordPress, or plain PHP. Key features:

- **Local web server** with automatic HTTPS and HTTP/2
- **Per-project PHP version** via `.php-version` file — `symfony php` automatically uses the right version
- **Proxy** for accessing projects via local `.wip` domains
- **Integration** with Docker, SymfonyCloud, and platform.sh

```bash
# Start local server
symfony server:start -d

# Use project-specific PHP version (reads .php-version)
symfony php -v
symfony composer install

# Works with any PHP project, not just Symfony
cd my-laravel-app
echo "8.4" > .php-version
symfony php artisan serve
```

See [Version Switching](/version-switching/) for details on per-project PHP version management.

## PHPStan / Psalm / PHP CS Fixer

These tools are installed as Phars via Composer, managed by PHM:

```bash
phm install phpstan
phm install psalm
phm install php-cs-fixer
```

PHM handles the entire process — downloads the tool via Composer in an isolated directory, extracts the phar, and creates a wrapper script pointing to PHM's PHP. No need to configure `~/.composer/vendor/bin`.

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

## Managing Tools

```bash
# List all installed tools
phm list

# Show available tools
phm list -a

# Remove a tool
phm remove phpstan

# Show tool info
phm info composer
```

## PEAR / PECL

PEAR/PECL is available as a PHP package:

```bash
phm install php8.5-pear
```

:::caution[Prefer PHM packages]
For extensions available as PHM packages (Redis, Xdebug, etc.), always use `phm install` instead of `pecl install`. PHM packages are precompiled and don't require build tools.
:::

:::danger[macOS code signing]
macOS assigns an ad-hoc code signature to binaries on first run. PHM packages are built and distributed as a consistent set — PHP binary and all `.so` extensions come from the same build pipeline, so macOS validates them without issues.

If you compile an extension locally with `pecl install`, the resulting `.so` has a different (or no) signature. Loading it can **invalidate the code signature of the PHP process**, causing macOS kernel protection to **kill the process**. This often happens silently — PHP simply crashes without a clear error message.

**Rule of thumb**: if a PHM package exists for the extension you need, always use it. If an extension is not available in PHM — request it.

Missing an extension? [Open an issue](https://github.com/phm-dev/php-packages/issues) on the php-packages repository to request it.
:::
