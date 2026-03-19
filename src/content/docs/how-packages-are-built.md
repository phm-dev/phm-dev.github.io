---
title: How Packages Are Built
description: Where PHM packages come from and how the build pipeline works
---

All PHM packages are built automatically from source and hosted on GitHub. The entire process is open-source and transparent.

## Source Repository

Packages are built in the [phm-dev/php-packages](https://github.com/phm-dev/php-packages) repository. It contains:

- Build scripts for PHP core and extensions
- Extension configuration (versions, dependencies, build flags)
- GitHub Actions workflows for automated builds
- The `index.json` package index that PHM reads when you run `phm update`

## Build Pipeline

Every day at 3:00 UTC, GitHub Actions workflows check [php.net](https://www.php.net/) for new PHP patch versions and [Packagist](https://packagist.org/) for new extension releases. If a new version is found, a build is triggered automatically.

The pipeline:

1. **Check for updates** — compares the latest version on php.net / Packagist with the last built version in GitHub Releases
2. **Build dependencies** — compiles static libraries needed by extensions (e.g., librabbitmq for amqp, ImageMagick for imagick)
3. **Build PHP core** — compiles PHP from source, then packages it into separate archives: common, cli, fpm, cgi, dev, pear
4. **Build extensions** — compiles each extension against the freshly built PHP, packages as individual archives
5. **Upload to GitHub Releases** — each PHP patch version gets its own release (e.g., `php-8.5.4`), old versions are preserved
6. **Update index** — regenerates `index.json` from all releases and commits it to the repository

## Hosting

Packages are hosted as GitHub Release assets — there is no separate package server. When you run:

```bash
phm update
```

PHM downloads `index.json` from the repository. When you install a package:

```bash
phm install php8.5-cli
```

PHM downloads the `.tar.zst` archive directly from GitHub Releases.

## Package Format

Each package is a zstd-compressed tar archive containing:

```
package.tar.zst
├── pkginfo.json    # Package metadata (name, version, dependencies)
└── files/
    └── opt/php/8.5/...  # Files to install
```

## Platforms

Packages are built on macOS runners provided by GitHub Actions:

| Platform | Runner | Status |
|----------|--------|--------|
| Apple Silicon (arm64) | `macos-latest` | Available |
| Intel (amd64) | `macos-15-intel` | Available |

## Contributing

Want to add a new extension or report a build issue?

- [Open an issue](https://github.com/phm-dev/php-packages/issues) on the php-packages repository
- Extension build configs live in the `extensions/` directory
