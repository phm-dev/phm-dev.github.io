---
title: FAQ
description: Frequently asked questions about PHM — the binary PHP package manager for macOS.
---

## General

### What is PHM?

PHM (PHP Manager) is a binary package manager for PHP on macOS. It provides precompiled PHP packages that install in seconds — no Homebrew, no MacPorts, no local compilation required.

### Is PHM free?

Yes. PHM is open-source software released under the MIT license. Both the [CLI tool](https://github.com/phm-dev/phm) and the [package repository](https://github.com/phm-dev/php-packages) are freely available on GitHub.

### Does PHM work on Linux?

No. PHM is designed exclusively for macOS. Linux users should use their distribution's package manager — for Ubuntu/Debian, the [Ondrej Sury PPA](https://deb.sury.org/) provides excellent PHP packages.

### Does PHM work on Intel Macs?

Yes. PHM provides precompiled packages for both Apple Silicon (arm64) and Intel (amd64) Macs running macOS 13 (Ventura) or newer.

### Does PHM replace Homebrew?

Not entirely. PHM replaces Homebrew only for PHP-related packages. You may still want Homebrew for databases (MySQL, PostgreSQL), tools (nginx, Redis server), and other non-PHP software.

---

## Installation

### How do I install PHM?

```bash
curl -fsSL https://raw.githubusercontent.com/phm-dev/phm/main/scripts/install-phm.sh | bash
export PATH="/opt/php/bin:$PATH"
```

### Where does PHM install PHP?

PHP is installed to `/opt/php/`. Each version has its own directory:
- `/opt/php/8.5/` — PHP 8.5
- `/opt/php/8.4/` — PHP 8.4
- `/opt/php/bin/` — symlinks to the active version

### Can I have multiple PHP versions installed simultaneously?

Yes. PHM installs each PHP version in a separate directory. You can have PHP 8.1, 8.2, 8.3, 8.4, and 8.5 all installed at the same time with no conflicts.

### How do I switch between PHP versions?

Two options:
- **Per-project** (recommended): Use Symfony CLI with a `.php-version` file — `phm install symfony`, then `symfony php -v`
- **Globally**: Use `phm use 8.5` to set the system-wide default

### How do I uninstall PHM?

```bash
phm destruct
```

This removes all PHM-installed packages and the PHM binary itself.

---

## Packages

### What PHP versions are available?

PHM supports PHP 8.1, 8.2, 8.3, 8.4, and 8.5. New patch versions are built automatically within hours of release on php.net.

### What extensions are available?

Over 40 extensions including: Redis, Xdebug, ImageMagick, MongoDB, AMQP, APCu, igbinary, intl, mbstring, GD, pcov, and many more. See the [full package list](/packages/).

### How do I install Composer?

```bash
phm install composer
```

PHM downloads Composer from getcomposer.org and sets it up automatically. No manual `curl` or `mv` needed.

### How often are packages updated?

Daily. GitHub Actions workflows check for new PHP versions and extension releases every day at 3:00 UTC. If a new version is found, packages are built and published automatically.

### Can I install a specific PHP patch version?

Yes:
```bash
phm install php8.5.4-cli    # specific patch version
phm install php8.5-cli      # latest 8.5.x (recommended)
```

---

## Troubleshooting

### PHP process crashes silently after installing a PECL extension

This is a macOS code signing issue. PHM packages are built as a consistent set with valid signatures. If you compile an extension with `pecl install`, the unsigned `.so` file can invalidate the PHP process signature, causing macOS kernel protection to kill it.

**Solution**: Use `phm install` instead of `pecl install` for all available extensions. If an extension is not available in PHM, [request it](https://github.com/phm-dev/php-packages/issues).

### `php: command not found` after installation

You need to add PHM's bin directory to your PATH:

```bash
# Add to ~/.zshrc (or ~/.bashrc)
export PATH="/opt/php/bin:$PATH"

# Reload
source ~/.zshrc
```

### Homebrew PHP conflicts with PHM

PHM installs to `/opt/php/bin`, which is separate from Homebrew's `/opt/homebrew/bin`. If both are in your PATH, ensure `/opt/php/bin` comes first:

```bash
export PATH="/opt/php/bin:$PATH"
```

### How do I report a bug or request a feature?

- PHM CLI issues: [github.com/phm-dev/phm/issues](https://github.com/phm-dev/phm/issues)
- Package/extension issues: [github.com/phm-dev/php-packages/issues](https://github.com/phm-dev/php-packages/issues)
