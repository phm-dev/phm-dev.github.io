---
title: Version Switching
description: How to switch PHP versions per project using Symfony CLI and .php-version
---

PHM installs multiple PHP versions side by side. There are two ways to switch between them.

## Recommended: Symfony CLI + `.php-version`

The recommended approach is to use [Symfony CLI](https://symfony.com/download) with a `.php-version` file in your project root. This gives you automatic, per-project PHP version switching.

### Setup

1. Install Symfony CLI via PHM:

```bash
phm install symfony
```

2. Create a `.php-version` file in your project root:

```bash
echo "8.5" > .php-version
```

3. Use `symfony php` instead of `php`:

```bash
symfony php -v
# PHP 8.5.4 (cli) ...

symfony composer install
symfony console cache:clear
```

Symfony CLI reads the `.php-version` file and automatically selects the correct PHP binary from PHM's `/opt/php/` directory.

### Per-project workflow

```
project-a/
├── .php-version    # Contains: 8.4
├── composer.json
└── src/

project-b/
├── .php-version    # Contains: 8.5
├── composer.json
└── src/
```

```bash
cd project-a
symfony php -v    # PHP 8.4.19

cd ../project-b
symfony php -v    # PHP 8.5.4
```

### Symfony local web server

Symfony CLI includes a built-in web server that also respects `.php-version`:

```bash
# Start the server (uses PHP version from .php-version)
symfony server:start -d

# Check which PHP version is being used
symfony server:status

# View logs
symfony server:log

# Stop the server
symfony server:stop
```

The Symfony server provides automatic HTTPS with locally-trusted certificates, HTTP/2 support, and handles `.php-version` seamlessly.

:::tip[Commit `.php-version`]
Add `.php-version` to your Git repository so the whole team uses the same PHP version.
:::

## Alternative: `phm use`

For setting a system-wide default PHP version:

```bash
# Set PHP 8.5 as the global default
phm use 8.5

# Verify
php -v
```

This creates symlinks in `/opt/php/bin/` pointing to the selected version. It affects all terminal sessions.

:::caution[Global only]
`phm use` changes the PHP version globally. For per-project switching, use Symfony CLI with `.php-version` instead.
:::

## Comparison

| Feature | Symfony CLI + `.php-version` | `phm use` |
|---------|------------------------------|-----------|
| Scope | Per-project | Global |
| Switching | Automatic (reads file) | Manual command |
| Team-friendly | Yes (commit `.php-version`) | No |
| Web server | Built-in (with HTTPS) | Requires separate setup |
| Recommended | Yes | For simple setups |
