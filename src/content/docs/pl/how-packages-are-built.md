---
title: Skąd się biorą pakiety
description: Skąd pochodzą pakiety PHM i jak działa pipeline budowania
---

Wszystkie pakiety PHM są budowane automatycznie ze źródeł i hostowane na GitHubie. Cały proces jest open-source i przejrzysty.

## Repozytorium źródłowe

Pakiety budowane są w repozytorium [phm-dev/php-packages](https://github.com/phm-dev/php-packages). Zawiera ono:

- Skrypty budowania PHP core i rozszerzeń
- Konfigurację rozszerzeń (wersje, zależności, flagi kompilacji)
- Workflow GitHub Actions do automatycznych buildów
- Indeks pakietów `index.json`, który PHM pobiera gdy uruchomisz `phm update`

## Pipeline budowania

Codziennie o 3:00 UTC workflow GitHub Actions sprawdzają [php.net](https://www.php.net/) pod kątem nowych wersji PHP i [Packagist](https://packagist.org/) pod kątem nowych wersji rozszerzeń. Jeśli zostanie znaleziona nowa wersja, build uruchamia się automatycznie.

Pipeline:

1. **Sprawdzenie aktualizacji** — porównuje najnowszą wersję na php.net / Packagist z ostatnio zbudowaną wersją w GitHub Releases
2. **Budowanie zależności** — kompiluje statyczne biblioteki potrzebne rozszerzeniom (np. librabbitmq dla amqp, ImageMagick dla imagick)
3. **Budowanie PHP core** — kompiluje PHP ze źródeł, pakuje w osobne archiwa: common, cli, fpm, cgi, dev, pear
4. **Budowanie rozszerzeń** — kompiluje każde rozszerzenie wobec świeżo zbudowanego PHP, pakuje jako osobne archiwa
5. **Upload do GitHub Releases** — każda wersja patchowa PHP dostaje własny release (np. `php-8.5.4`), stare wersje są zachowywane
6. **Aktualizacja indeksu** — regeneruje `index.json` ze wszystkich releases i commituje do repozytorium

## Hosting

Pakiety hostowane są jako assety GitHub Releases — nie ma osobnego serwera pakietów. Gdy uruchomisz:

```bash
phm update
```

PHM pobiera `index.json` z repozytorium. Gdy instalujesz pakiet:

```bash
phm install php8.5-cli
```

PHM pobiera archiwum `.tar.zst` bezpośrednio z GitHub Releases.

## Format pakietu

Każdy pakiet to skompresowane zstd archiwum tar zawierające:

```
package.tar.zst
├── pkginfo.json    # Metadane pakietu (nazwa, wersja, zależności)
└── files/
    └── opt/php/8.5/...  # Pliki do zainstalowania
```

## Platformy

Pakiety budowane są na runnerach macOS udostępnianych przez GitHub Actions:

| Platforma | Runner | Status |
|-----------|--------|--------|
| Apple Silicon (arm64) | `macos-latest` | Dostępne |
| Intel (amd64) | `macos-15-intel` | Dostępne |

## Współtworzenie

Chcesz dodać nowe rozszerzenie lub zgłosić problem z buildem?

- [Otwórz issue](https://github.com/phm-dev/php-packages/issues) w repozytorium php-packages
- Konfiguracje buildów rozszerzeń znajdują się w katalogu `extensions/`
