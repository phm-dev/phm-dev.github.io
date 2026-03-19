---
title: Installation
description: How to install PHM on macOS
---

## System Requirements

- macOS 13 (Ventura) or newer
- Apple Silicon (arm64) or Intel (amd64)

## Install Command

Run the following command in your terminal:

```bash
curl -fsSL https://raw.githubusercontent.com/phm-dev/phm/main/scripts/install-phm.sh | bash
```

## What the Install Script Does

1. Detects your processor architecture (arm64 or amd64)
2. Downloads the latest PHM release from GitHub Releases
3. Installs the binary to `/usr/local/bin/phm`
4. Creates working directories: `/var/phm/` and `/opt/php/`

## Verify Installation

Check that PHM was installed correctly:

```bash
phm --version
```

:::tip[Next step]
After installing PHM, you need to configure your shell so PHP is available globally.

[Go to shell setup →](/shell-setup/)
:::
