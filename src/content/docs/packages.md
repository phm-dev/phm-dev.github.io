---
title: Available Packages
description: Complete list of PHP packages available in PHM
---

PHM provides precompiled binary packages for PHP 8.1 through 8.5 on macOS (Apple Silicon and Intel).

## Supported PHP Versions

| Version | Latest |
|---------|--------|
| PHP 8.5 | 8.5.4 |
| PHP 8.4 | 8.4.19 |
| PHP 8.3 | 8.3.30 |
| PHP 8.2 | 8.2.30 |
| PHP 8.1 | 8.1.34 |

## Package Naming

All packages follow the pattern `phpX.Y-name`. For example:

```bash
phm install php8.5-cli php8.5-redis php8.5-xdebug
```

## Core Packages

These packages provide PHP itself and essential components.

| Package | Description | PHP Versions |
|---------|-------------|:------------:|
| `cli` | PHP command-line interpreter | 8.1 – 8.5 |
| `fpm` | FastCGI Process Manager | 8.1 – 8.5 |
| `cgi` | CGI binary | 8.1 – 8.5 |
| `common` | Shared files and php.ini | 8.1 – 8.5 |
| `dev` | Development files (headers, phpize) | 8.1 – 8.5 |
| `pear` | PEAR/PECL package manager | 8.1 – 8.5 |

## Extensions — Data & Serialization

| Package | Description | PHP Versions |
|---------|-------------|:------------:|
| `igbinary` | Compact binary serializer (faster alternative to PHP serialize) | 8.1 – 8.4 |
| `msgpack` | MessagePack serialization | 8.1 – 8.5 |
| `protobuf` | Google Protocol Buffers | 8.1 – 8.5 |
| `yaml` | YAML parser and emitter | 8.1 – 8.5 |
| `ds` | Efficient data structures (Vector, Deque, Map, Set) | 8.1 – 8.5 |
| `zstd` | Zstandard compression | 8.4 – 8.5 |

## Extensions — Databases

| Package | Description | PHP Versions |
|---------|-------------|:------------:|
| `mysql` | MySQL/MariaDB driver (mysqli + PDO) | 8.1 – 8.5 |
| `pgsql` | PostgreSQL driver (pgsql + PDO) | 8.1 – 8.5 |
| `redis` | Redis client | 8.1 – 8.5 |
| `mongodb` | MongoDB driver | 8.1 – 8.5 |

## Extensions — Networking & Messaging

| Package | Description | PHP Versions |
|---------|-------------|:------------:|
| `amqp` | RabbitMQ / AMQP client | 8.1 – 8.5 |
| `curl` | HTTP client (libcurl) | 8.1 – 8.5 |
| `ftp` | FTP client | 8.1 – 8.5 |
| `soap` | SOAP web services client | 8.1 – 8.5 |
| `sockets` | Low-level socket interface | 8.1 – 8.5 |
| `stomp` | STOMP messaging protocol | 8.1 – 8.4 |
| `oauth` | OAuth 1.0/2.0 consumer/provider | 8.1 – 8.5 |
| `opentelemetry` | OpenTelemetry instrumentation | 8.1 – 8.5 |

## Extensions — Text & Internationalization

| Package | Description | PHP Versions |
|---------|-------------|:------------:|
| `mbstring` | Multibyte string handling | 8.1 – 8.5 |
| `intl` | Internationalization (ICU) | 8.1 – 8.5 |
| `xml` | XML parser (DOM, SimpleXML, XMLReader/Writer) | 8.1 – 8.5 |
| `mailparse` | Email message parsing | 8.1 – 8.5 |

## Extensions — Images & Media

| Package | Description | PHP Versions |
|---------|-------------|:------------:|
| `gd` | Image processing (GD library) | 8.1 – 8.5 |
| `imagick` | ImageMagick bindings | 8.1 – 8.5 |
| `exif` | EXIF metadata reader | 8.1 – 8.5 |

## Extensions — Development & Debugging

| Package | Description | PHP Versions |
|---------|-------------|:------------:|
| `xdebug` | Step debugger and profiler | 8.1 – 8.5 |
| `pcov` | Code coverage driver (lightweight alternative to Xdebug) | 8.1 – 8.5 |
| `ast` | PHP AST (Abstract Syntax Tree) access | 8.1 – 8.5 |
| `uopz` | Runtime opcode manipulation for testing | 8.1 – 8.3 |
| `excimer` | Low-overhead sampling profiler | 8.1 – 8.5 |

## Extensions — System & I/O

| Package | Description | PHP Versions |
|---------|-------------|:------------:|
| `pcntl` | Process control (fork, signals) | 8.1 – 8.5 |
| `ev` | High-performance event loop (libev) | 8.1 – 8.5 |
| `dio` | Direct I/O (low-level file operations) | 8.1 – 8.5 |
| `uploadprogress` | File upload progress tracking | 8.1 – 8.5 |

## Extensions — Cryptography & Math

| Package | Description | PHP Versions |
|---------|-------------|:------------:|
| `bcmath` | Arbitrary precision math | 8.1 – 8.5 |
| `mcrypt` | Encryption (legacy, libmcrypt) | 8.1 – 8.5 |

## Extensions — Other

| Package | Description | PHP Versions |
|---------|-------------|:------------:|
| `apcu` | Shared memory cache (user data) | 8.1 – 8.5 |
| `calendar` | Calendar conversion functions | 8.1 – 8.5 |
| `libedit` | Interactive line editing (readline alternative) | 8.1 – 8.5 |
| `zip` | ZIP archive support | 8.1 – 8.5 |

## Meta Packages

Meta packages install groups of packages in a single command. There are two variants:

### `phpX.Y` / `phpX.Y-slim` — Core set

Installs the essential packages: common, cli, fpm, cgi, dev, pear.

```bash
phm install php8.5
# or equivalently:
phm install php8.5-slim
```

### `phpX.Y-full` — Everything

Installs the slim set **plus all available extensions** for that PHP version.

```bash
phm install php8.5-full
```

Available for all supported versions: `php8.1`, `php8.2`, `php8.3`, `php8.4`, `php8.5`

## Searching Packages

```bash
# List all available packages
phm list

# Search by name
phm search redis

# Show package details
phm info php8.5-redis
```
