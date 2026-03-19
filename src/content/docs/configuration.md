---
title: Configuration Files
description: Directory structure and PHP configuration
---

## Directory Structure

PHM installs each PHP version in a separate directory:

```
/opt/php/8.5/
├── bin/                          # Executables
│   ├── php
│   ├── phpize
│   ├── php-config
│   └── pecl
├── sbin/
│   └── php-fpm                   # PHP-FPM
├── etc/
│   ├── cli/
│   │   └── php.ini               # CLI configuration
│   ├── fpm/
│   │   └── php.ini               # FPM configuration
│   ├── php-fpm.conf              # Main FPM configuration
│   ├── php-fpm.d/
│   │   └── www.conf              # Pool configuration
│   └── conf.d/                   # Extension configuration
│       ├── 10-opcache.ini
│       └── 20-redis.ini
└── lib/php/extensions/
    └── no-debug-non-zts-*/       # Extension files (.so)
        ├── redis.so
        └── ...
```

## CLI vs FPM Differences

PHM uses separate `php.ini` files for CLI and FPM:

| Setting | CLI | FPM |
|---------|-----|-----|
| `memory_limit` | -1 (unlimited) | 128M |
| `max_execution_time` | 0 (unlimited) | 30 |
| `display_errors` | On | Off |

## Changing memory_limit

### For CLI

```bash
# Edit the CLI php.ini file
nano /opt/php/8.5/etc/cli/php.ini

# Or append to the file:
echo "memory_limit = 512M" >> /opt/php/8.5/etc/cli/php.ini
```

### For FPM

```bash
# Edit the FPM php.ini file
nano /opt/php/8.5/etc/fpm/php.ini

# Or append to the file:
echo "memory_limit = 256M" >> /opt/php/8.5/etc/fpm/php.ini

# Restart PHP-FPM
phm fpm restart 8.5
```

:::caution[Important]
Remember to restart PHP-FPM after changing FPM configuration.
:::

## Managing Extensions

PHM makes it easy to enable and disable extensions:

| Command | Description |
|---------|-------------|
| `phm ext list` | List extensions |
| `phm ext enable redis` | Enable extension |
| `phm ext disable xdebug` | Disable extension |
| `phm ext enable opcache --sapi fpm` | Enable for FPM only |

## Extension Configuration Files

Extensions are configured via `.ini` files in the `conf.d` directory:

```
/opt/php/8.5/etc/conf.d/
├── 10-opcache.ini    # Loaded first (priority 10)
├── 20-redis.ini      # Loaded second (priority 20)
├── 20-igbinary.ini
└── 20-mongodb.ini
```

:::note[Loading order]
The numeric prefix (10-, 20-) determines the extension loading order.
:::

### Example .ini Files

```ini
# 20-redis.ini
extension=redis.so

# 10-opcache.ini (uses zend_extension)
zend_extension=opcache.so
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=10000
```
