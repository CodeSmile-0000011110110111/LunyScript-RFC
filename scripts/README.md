# Scripts

Utility scripts for LunyScript development and contribution.

## Available Scripts

### `serve-jekyll.bat` (Windows)
**Purpose:** Run Jekyll locally to preview GitHub Pages site before committing.

**Usage:**
```cmd
cd P:\LunyScript-RFC
scripts\serve-jekyll.bat
```

**First-time setup:**
1. Install Ruby from https://rubyinstaller.org/ (with MSYS2 development toolchain)
2. Restart terminal
3. Run the script - it will install dependencies automatically

**Features:**
- Installs Jekyll and dependencies on first run
- Serves site at `http://localhost:4000`
- Live reload - changes automatically refresh browser
- Press Ctrl+C to stop

### `setup-contributor.bat` (Windows)
**Purpose:** Configure local repository for DCO-compliant contributions.

**Usage:**
```cmd
cd P:\LunyScript-RFC
scripts\setup-contributor.bat
```

**What it does:**
- Verifies git user configuration
- Installs commit-msg hook for automatic DCO sign-off
- Configures commit signing settings

### `setup-contributor.sh` (Linux/Mac)
Same as `setup-contributor.bat` but for Unix-based systems.

---

## Adding New Scripts

When adding scripts to this directory:
1. Use descriptive names (`verb-noun.bat/sh`)
2. Include error checking and helpful messages
3. Document usage in this README
4. Make scripts idempotent (safe to run multiple times)
