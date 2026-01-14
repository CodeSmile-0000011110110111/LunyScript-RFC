# Repository Structure Overview

## High-Level Divisions

The Luny repositories follows a modular architecture with clear separation between:
- **Engine-agnostic core** (Luny, LunyScript)
- **Engine-specific integrations** (suffixed with `.Unity`, `.Godot`, etc.)
- **Engine-native 'plugin'** (Unity: upm package / Godot: addon)

Note: The current setup will not allow multiple LunyEngine-based frameworks to coexist in a single project. This will be improved in the future.

## Engine 'Plugin' Integration

Luny frameworks should be imported into projects via the engine-native concept of a 'plugin' (package).

- Unity: upm package installed via Package Manager from git URL
- Godot: contents placed in the `addons/` folder, then enable plugin
- Others: Unreal, Stride, Flax, Unigine, Evergine, CryEngine all have support for 'plugins'

## Repositories

### Engine-Agnostic Code
- [**Luny**](https://github.com/CodeSmile-0000011110110111/Luny)
- [**LunyLua**](https://github.com/CodeSmile-0000011110110111/LunyLua)
- [**LunyScript**](https://github.com/CodeSmile-0000011110110111/LunyScript)
  - **LunyLuaScript** - not yet available

### Engine-Native Code
- [**Luny.Godot**](https://github.com/CodeSmile-0000011110110111/Luny.Godot)
- [**Luny.Unity**](https://github.com/CodeSmile-0000011110110111/Luny.Unity)
- [**LunyScript.Godot**](https://github.com/CodeSmile-0000011110110111/LunyScript.Godot)
- [**LunyScript.Unity**](https://github.com/CodeSmile-0000011110110111/LunyScript.Unity)

### Engine-Native 'Plugins'
- [**LunyScript-UnityPackage**](https://github.com/CodeSmile-0000011110110111/LunyScript-UnityPackage)
- [**LunyScript-GodotAddon**](https://github.com/CodeSmile-0000011110110111/LunyScript-GodotAddon)

### LunyScript Example Projects

Fully operable engine projects for LunyScript development:
 
- [**LunyScratch_Examples_Godot**](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Godot)
- [**LunyScratch_Examples_Unity**](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Unity)

**Note:** I will most likely rename the example repositories in the future, replacing 'Scratch' with 'Script'.

### Development

These repositories contain documentation, design, notes.

- [**LunyScript-RFC**](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/) - LunyScript Website & Documentation
- [**LunyScript-Plan**](https://github.com/CodeSmile-0000011110110111/LunyScript-Plan) - Notes, Tasks, Issues as [LogSeq](https://logseq.com/) Journal

## How to create a development repository

This outlines the high-level steps. Where in doubt analyze and follow LunyScript's repository structure and setup.

This assumes that your framework is named 'MyFramework' - adjust as needed. If Luny becomes popular this process will be eased eg via setup scripts - I understand it's more than 'the usual' and seems complicated at first.

- Create `MyFramework-Examples-<Engine>` engine-native project repositories, one per engine. Replace `<Engine>` with the name of the engine.
- Create a plugin repository, one per engine. This contains the engine-native plugin files (eg `plugin.cfg` or `package.json`).
  - Unity: name the repo `MyFramework.Unity` and import it as submodule into `Packages/com.<yourdomain>.myframework`
  - Godot: name the repo `MyFramework.Godot` and import it as submodule into `addons/myframework`
  - (continue with any other engine you wish to support...)
- Include, as submodules of each plugin repository, the following repositories as subfolders using the exact same names:
  - **`Luny`** - The LunyEngine core
  - **`Luny.<Engine>`** - The engine-native LunyEngine implementations
  - **`MyFramework`** - Your framework's engine-agnostic layer
  - **`MyFramework.<Engine>`** - Your framework's engine-native implementations (if any)

### Godot Example Addon

Your `MyFramework` Godot addon structure should look like this:
```
addons/
└── myframework/
    ├── plugin.cfg                 # Godot plugin config
    ├── Luny/                      # submodule
    ├── Luny.Godot/                # submodule
    ├── MyFramework/               # submodule
    └── MyFramework.Godot/         # submodule
```

This package is included as submodule in the `MyFramework-Examples-Godot` project and located in `addons/myframework`.

### Unity Example Package

Your `MyFramework` Unity package structure should look like this:
```
Packages/
└── de.<yourdomain>.myframework/
    ├── package.json               # Unity UPM package manifest
    ├── Luny/                      # submodule
    ├── Luny.Unity/                # submodule
    ├── MyFramework/               # submodule
    └── MyFramework.Unity/         # submodule
```

This package is included as submodule in the `MyFramework-Examples-Unity` project and located in `Packages/de.<yourdomain>.myframework`.

Ensure `MyFramework` Assembly Definition has **No Engine References** checked and depends on `Luny`. While `MyFramework.Unity` depends on both `Luny` and `Luny.Unity`.

Create `Runtime` or `Editor` folders as needed only within the `MyFramework.Unity/` subfolder - don't nest everything under Runtime or Editor folders!

## Directory Structure

This showcases the structure of a Unity upm package. Other engines similarly will need a 'plugin' repository as the basis, then include the necessary Luny repositories as submodules. 

The engine-native 'plugin' shouly typically contain only the bare minimum files, such as `package.json` for Unity or `plugin.cfg` for Godot, whereas the actual code should be in submodule repositories next to Luny etc.

### `de.codesmile.lunyscript` - Unity UPM Package

The main framework package containing all core and Unity-specific functionality. The Godot 'addon' directory structure is practically identical.

```
de.codesmile.lunyscript/ (submodule in project, located in: Packages/de.codesmile.lunyscript)
├── package.json               # Unity UPM package manifest
├── README.md                  # Plugin readme
├── ...                        # Any other plugin files or support code
│
├── Luny/ (submodule)          # Core engine framework (engine-agnostic)
│   ├── Core/                  # Logging, number utilities, trace logging
│   ├── Engine/                # Engine abstraction layer
│   │   ├── Bridge/            # Engine adapter interfaces
│   │   ├── Identity/          # Object identification structs
│   │   ├── Services/          # Service registry pattern
│   │   └── Diagnostics/       # Profiling and logging
│   ├── Exceptions/            # Framework-specific exceptions
│   ├── Extensions/            # Utility extensions for System types
│   └── Tests/                 # Core framework tests
│
├── Luny.Unity/ (submodule)    # Unity-specific engine integration
│   ├── Engine/
│   │   ├── Bridge/            # Unity adapter implementation
│   │   └── Services/          # Unity service implementations
│   ├── Editor/                # Unity Editor utilities
│   │   └── Linking/           # Linker stripping hints
│   └── Tests/                 # Unity integration tests
│
├── LunyScript/ (submodule)    # Scripting DSL (engine-agnostic)
│   ├── Blocks/                # Scripting blocks
│   │   ├── Debug/             # Debugging blocks
│   │   ├── Editor/            # Editor-related blocks
│   │   ├── Engine/            # Engine lifecycle blocks
│   │   ├── Object/            # Object manipulation blocks
│   │   ├── Run/               # Execution control blocks
│   │   └── Scene/             # Scene management blocks
│   ├── Core/                  # Script definitions, variables, IDs
│   ├── Diagnostics/           # Profiling and logging
│   ├── Events/                # Event scheduling and response
│   ├── Execution/             # Script runner, activator, context
│   ├── Runnables/             # Executable script interfaces
│   └── Tests/                 # Script system tests
│
├── LunyScript.Unity/ (subm.)  # Unity-specific scripting integration
│   ├── Editor/                # Unity Editor tools for LunyScript
│   └── Tests/                 # Unity-specific script tests
│
└── LunyLua/ (submodule)       # Lua runtime integration
    └── Lua-CSharp/            # Lua C# bindings
```

### Test Organization

Tests are co-located within their respective modules:
- `Luny/Tests/` - Core framework tests
- `Luny.Unity/Tests/` - Unity integration tests (includes test scenes)
- `LunyScript/Tests/` - Script system tests
- `LunyScript.Unity/Tests/` - Unity-specific script tests

## How to work with Git Submodules

The repository uses git submodules extensively for modular development:
- `Packages/de.codesmile.lunyscript` is the main submodule
- Within that package, subdirectories (`Luny/`, `Luny.Unity/`, `LunyScript/`, etc.) are also git submodules
- This allows independent versioning of core vs. engine-specific code

To ensure proper submodule workflows one must first commit to submodules before committing repositories containing a modified submodule. A pre-commit hook that verifies this and prevents "detached head" issues is included below.

This avoids all of the frustrations developers without submodule experience usually face when first working with submodules. Submodules are otherwise fine, except that you manage multiple repositories.

### Submodule Commit Check Hook

Save this script in the project's repository root under `.git/hooks` as `pre-commit` text file. Only add this to the root repository, not in any of the submodules.

This pre-commit hook prevents commits if a submodule is "dirty" and should be committed first. If that is the case, a message pops up instructing you to first commit the submodule (you do not lose any changes). Works with both command line and git GUI tools (eg SourceTree).

```
#!/bin/sh

# Check if any submodule has uncommitted changes
git submodule foreach --quiet --recursive '
    if [ -n "$(git status --porcelain)" ]; then
        echo "ERROR: Submodule $path has uncommitted changes!"
        echo "Commit submodule changes first, then commit parent."
        exit 1
    fi
'

# Check if any submodule has unpushed commits
git submodule foreach --quiet --recursive '
    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse @{u} 2>/dev/null || echo $LOCAL)
    if [ "$LOCAL" != "$REMOTE" ]; then
        echo "ERROR: Submodule $path has unpushed commits!"
        echo "Push submodule changes first, then commit parent."
        exit 1
    fi
'
```

On Linux/OS X you *may* have to give execute permission to the file. Review the git hook documentation.
