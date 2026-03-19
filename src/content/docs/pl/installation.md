---
title: Instalacja PHM
description: Jak zainstalować PHM na macOS
---

## Wymagania systemowe

- macOS 13 (Ventura) lub nowszy
- Apple Silicon (arm64) lub Intel (amd64)

## Polecenie instalacji

Uruchom poniższe polecenie w terminalu:

```bash
curl -fsSL https://raw.githubusercontent.com/phm-dev/phm/main/scripts/install-phm.sh | bash
```

## Co robi skrypt instalacyjny

1. Wykrywa architekturę procesora (arm64 lub amd64)
2. Pobiera najnowszą wersję PHM z GitHub Releases
3. Instaluje binarkę w `/usr/local/bin/phm`
4. Tworzy katalogi robocze: `/var/phm/` i `/opt/php/`

## Weryfikacja instalacji

Sprawdź czy PHM został zainstalowany poprawnie:

```bash
phm --version
```

:::tip[Następny krok]
Po instalacji PHM musisz skonfigurować swoją powłokę, aby PHP było dostępne globalnie.

[Przejdź do konfiguracji powłoki →](/pl/shell-setup/)
:::
