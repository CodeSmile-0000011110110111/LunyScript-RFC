# Decision 001: Naming Scheme

**Date:** 2025-11-05
**Status:** Accepted

## Decision

Use three-tier naming:
1. **Luny** - abstraction layer namespace
2. **LunyScript** - execution engine namespace (not `Luny.Script`)
3. **LunyScript.{Engine}** - adapter namespaces (Unity, Godot, Unreal)

## Reasoning

### Why "Luny" for abstractions?
- Short, memorable
- Language-neutral (works in C#, Lua, GDScript, C++)
- Natural namespace root

### Why "LunyScript" not "Luny.Script"?
- User-facing API should be concise: `LunyScript.Run()` vs `Luny.Script.Run()`
- "Script" adds no information when nested
- Follows Unity convention: `UnityEngine` not `Unity.Engine`
- Single word reads more naturally in code

### Why "LunyScript.{Engine}" for adapters?
- Self-documenting: `LunyScript.Unity` clearly indicates Unity adapter
- Hierarchical relationship: adapters extend LunyScript
- Standard C# convention for platform-specific code
- Scales cleanly: `LunyScript.Godot`, `LunyScript.Unreal`, etc.

### Rejected alternatives
- **"Luny Engine"** - implies LunyScript is an engine (it's not, it runs ON engines)
- **"Luny Coupling"** - negative connotation (coupling = bad)
- **"Luny.Script"** - unnecessary nesting, verbose

## Implications

- Clear separation for implementers (`using Luny;`) vs users (`using LunyScript;`)
- Engine adapters only imported in bootstrap code
- Namespace structure maps directly to repository/package structure
- Documentation can reference layers by name without ambiguity
