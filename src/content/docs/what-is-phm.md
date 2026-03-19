---
title: What is PHM
description: PHM is a binary package manager for PHP on macOS. It provides precompiled PHP packages — no Homebrew, no MacPorts, no compilation required.
---

## Definition

**PHM (PHP Manager)** is a binary package manager for PHP on macOS. It provides precompiled PHP packages that install in seconds — no Homebrew, no MacPorts, no local compilation required.

PHM follows the Debian/Ubuntu model: PHP and its extensions are built once on CI, distributed as signed binary packages, and installed instantly on any Mac.

## The Problem PHM Solves

On Linux (Ubuntu/Debian), installing PHP is trivial:

```bash
apt install php8.5-cli php8.5-fpm php8.5-redis
```

On macOS, there is no equivalent. Installing PHP itself is only half the problem — extensions are worse. If you need Redis, ImageMagick, or MongoDB you're stuck with PECL, which means:

- installing Xcode Command Line Tools, autoconf, and build dependencies
- running `pecl install redis` and hoping the compilation succeeds
- manually configuring `php.ini` to load the extension
- repeating this for every extension, every PHP version, every machine
- dealing with macOS code signing issues that can silently crash PHP

The situation with PHP itself isn't much better:

- **Homebrew** — compiles PHP from source on every machine, takes 10+ minutes, breaks on updates, doesn't support multiple versions cleanly, no extension packages
- **MacPorts** — similar compilation overhead, smaller community
- **phpbrew** — requires build tools (autoconf, bison, re2c), fragile, no binary packages
- **Docker** — overhead for local development, filesystem performance issues on macOS
- **Manual compilation** — requires Xcode, build dependencies, deep knowledge of configure flags

PHM eliminates all of this. One command, instant install, zero compilation:

```bash
phm install php8.5-cli php8.5-fpm php8.5-redis
```

## How PHM Works

1. **Precompiled packages** are built daily on GitHub Actions (macOS runners for both Apple Silicon and Intel)
2. **Packages are hosted** as GitHub Release assets — no separate server infrastructure
3. **PHM CLI** downloads and extracts packages to `/opt/php/`, managing symlinks and configuration
4. **Each PHP version** lives in its own directory (`/opt/php/8.5/`, `/opt/php/8.4/`), with no conflicts
5. **Extensions** are separate packages, precompiled against the matching PHP version

## Key Features

- **Instant installation** — precompiled binaries, no compilation on your machine
- **Multiple PHP versions** — 8.1, 8.2, 8.3, 8.4, 8.5 side by side
- **40+ extensions** — Redis, Xdebug, ImageMagick, MongoDB, and more
- **Built-in tools** — Composer, Symfony CLI, PHPStan, PHP CS Fixer via `phm install`
- **PHP-FPM management** — start, stop, restart, enable autostart
- **Per-project PHP versions** — via Symfony CLI + `.php-version` file
- **macOS native** — designed specifically for macOS, no cross-platform compromises
- **Open source** — MIT licensed, fully transparent build pipeline

## Who PHM is For

- **PHP developers on macOS** who want fast, reliable PHP installation
- **Teams** who need consistent PHP environments across developer machines
- **Developers working on multiple projects** with different PHP version requirements
- **Anyone tired of Homebrew PHP** breaking on updates or taking too long to compile

## Who PHM is Not For

- **Linux users** — Linux already has excellent PHP repositories (Ondrej Sury PPA, Remi RPM)
- **Windows users** — PHM is macOS only
- **Production servers** — PHM is for development machines, not server deployments

## Quick Start

```bash
# Install PHM
curl -fsSL https://raw.githubusercontent.com/phm-dev/phm/main/scripts/install-phm.sh | bash

# Add to PATH
export PATH="/opt/php/bin:$PATH"

# Install PHP
phm install php8.5-cli php8.5-fpm php8.5-redis

# Install developer tools
phm install composer symfony
```

## Links

- [PHM CLI on GitHub](https://github.com/phm-dev/phm)
- [PHP Packages Repository](https://github.com/phm-dev/php-packages)
- [Installation Guide](/installation/)
- [Available Packages](/packages/)
