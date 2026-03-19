---
title: Dostępne pakiety
description: Pełna lista pakietów PHP dostępnych w PHM
---

PHM udostępnia prekompilowane pakiety binarne dla PHP 8.1 do 8.5 na macOS (Apple Silicon i Intel).

## Obsługiwane wersje PHP

| Wersja | Najnowsza |
|--------|-----------|
| PHP 8.5 | 8.5.4 |
| PHP 8.4 | 8.4.19 |
| PHP 8.3 | 8.3.30 |
| PHP 8.2 | 8.2.30 |
| PHP 8.1 | 8.1.34 |

## Nazewnictwo pakietów

Wszystkie pakiety mają format `phpX.Y-nazwa`. Na przykład:

```bash
phm install php8.5-cli php8.5-redis php8.5-xdebug
```

## Pakiety bazowe

Te pakiety dostarczają samo PHP i niezbędne komponenty.

| Pakiet | Opis | Wersje PHP |
|--------|------|:----------:|
| `cli` | Interpreter wiersza poleceń PHP | 8.1 – 8.5 |
| `fpm` | FastCGI Process Manager | 8.1 – 8.5 |
| `cgi` | Binarka CGI | 8.1 – 8.5 |
| `common` | Współdzielone pliki i php.ini | 8.1 – 8.5 |
| `dev` | Pliki deweloperskie (nagłówki, phpize) | 8.1 – 8.5 |
| `pear` | Menedżer pakietów PEAR/PECL | 8.1 – 8.5 |

## Rozszerzenia — Dane i serializacja

| Pakiet | Opis | Wersje PHP |
|--------|------|:----------:|
| `igbinary` | Kompaktowy serializer binarny (szybsza alternatywa dla PHP serialize) | 8.1 – 8.4 |
| `msgpack` | Serializacja MessagePack | 8.1 – 8.5 |
| `protobuf` | Google Protocol Buffers | 8.1 – 8.5 |
| `yaml` | Parser i emiter YAML | 8.1 – 8.5 |
| `ds` | Wydajne struktury danych (Vector, Deque, Map, Set) | 8.1 – 8.5 |
| `zstd` | Kompresja Zstandard | 8.4 – 8.5 |

## Rozszerzenia — Bazy danych

| Pakiet | Opis | Wersje PHP |
|--------|------|:----------:|
| `mysql` | Sterownik MySQL/MariaDB (mysqli + PDO) | 8.1 – 8.5 |
| `pgsql` | Sterownik PostgreSQL (pgsql + PDO) | 8.1 – 8.5 |
| `redis` | Klient Redis | 8.1 – 8.5 |
| `mongodb` | Sterownik MongoDB | 8.1 – 8.5 |

## Rozszerzenia — Sieć i wiadomości

| Pakiet | Opis | Wersje PHP |
|--------|------|:----------:|
| `amqp` | Klient RabbitMQ / AMQP | 8.1 – 8.5 |
| `curl` | Klient HTTP (libcurl) | 8.1 – 8.5 |
| `ftp` | Klient FTP | 8.1 – 8.5 |
| `soap` | Klient usług SOAP | 8.1 – 8.5 |
| `sockets` | Niskopoziomowy interfejs gniazd | 8.1 – 8.5 |
| `stomp` | Protokół wiadomości STOMP | 8.1 – 8.4 |
| `oauth` | OAuth 1.0/2.0 | 8.1 – 8.5 |
| `opentelemetry` | Instrumentacja OpenTelemetry | 8.1 – 8.5 |

## Rozszerzenia — Tekst i internacjonalizacja

| Pakiet | Opis | Wersje PHP |
|--------|------|:----------:|
| `mbstring` | Obsługa ciągów wielobajtowych | 8.1 – 8.5 |
| `intl` | Internacjonalizacja (ICU) | 8.1 – 8.5 |
| `xml` | Parser XML (DOM, SimpleXML, XMLReader/Writer) | 8.1 – 8.5 |
| `mailparse` | Parsowanie wiadomości email | 8.1 – 8.5 |

## Rozszerzenia — Obrazy i multimedia

| Pakiet | Opis | Wersje PHP |
|--------|------|:----------:|
| `gd` | Przetwarzanie obrazów (biblioteka GD) | 8.1 – 8.5 |
| `imagick` | Wiązania ImageMagick | 8.1 – 8.5 |
| `exif` | Czytnik metadanych EXIF | 8.1 – 8.5 |

## Rozszerzenia — Development i debugowanie

| Pakiet | Opis | Wersje PHP |
|--------|------|:----------:|
| `xdebug` | Debugger krokowy i profiler | 8.1 – 8.5 |
| `pcov` | Sterownik pokrycia kodu (lekka alternatywa dla Xdebug) | 8.1 – 8.5 |
| `ast` | Dostęp do PHP AST (Abstract Syntax Tree) | 8.1 – 8.5 |
| `uopz` | Manipulacja opkodami w runtime (do testów) | 8.1 – 8.3 |
| `excimer` | Niskonarzutowy profiler próbkujący | 8.1 – 8.5 |

## Rozszerzenia — System i I/O

| Pakiet | Opis | Wersje PHP |
|--------|------|:----------:|
| `pcntl` | Kontrola procesów (fork, sygnały) | 8.1 – 8.5 |
| `ev` | Wydajna pętla zdarzeń (libev) | 8.1 – 8.5 |
| `dio` | Direct I/O (niskopoziomowe operacje na plikach) | 8.1 – 8.5 |
| `uploadprogress` | Śledzenie postępu uploadu plików | 8.1 – 8.5 |

## Rozszerzenia — Kryptografia i matematyka

| Pakiet | Opis | Wersje PHP |
|--------|------|:----------:|
| `bcmath` | Matematyka dowolnej precyzji | 8.1 – 8.5 |
| `mcrypt` | Szyfrowanie (legacy, libmcrypt) | 8.1 – 8.5 |

## Rozszerzenia — Pozostałe

| Pakiet | Opis | Wersje PHP |
|--------|------|:----------:|
| `apcu` | Cache w pamięci współdzielonej (dane użytkownika) | 8.1 – 8.5 |
| `calendar` | Funkcje konwersji kalendarzy | 8.1 – 8.5 |
| `libedit` | Interaktywna edycja linii (alternatywa readline) | 8.1 – 8.5 |
| `zip` | Obsługa archiwów ZIP | 8.1 – 8.5 |

## Meta pakiety

Meta pakiety instalują grupy pakietów jednym poleceniem. Dostępne są dwa warianty:

### `phpX.Y` / `phpX.Y-slim` — Zestaw bazowy

Instaluje niezbędne pakiety: common, cli, fpm, cgi, dev, pear.

```bash
phm install php8.5
# lub równoważnie:
phm install php8.5-slim
```

### `phpX.Y-full` — Wszystko

Instaluje zestaw bazowy **plus wszystkie dostępne rozszerzenia** dla danej wersji PHP.

```bash
phm install php8.5-full
```

Dostępne dla wszystkich wspieranych wersji: `php8.1`, `php8.2`, `php8.3`, `php8.4`, `php8.5`

## Wyszukiwanie pakietów

```bash
# Lista wszystkich dostępnych pakietów
phm list

# Szukaj po nazwie
phm search redis

# Pokaż szczegóły pakietu
phm info php8.5-redis
```
