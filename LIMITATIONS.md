# LunyScript Limitations

> **Quick reference** for LunyScript's scope and boundaries

## Current Limitations (Proof of Concept Phase)

### Supported Systems
- ✅ Input, Physics, Collision, Assets, Scene Graph, UI, Variables, Audio, Event Handling
- ⚠️ Limited to vertical slice demonstrated in PoC

### Engine Support
- ✅ Proof of Concept: Unity, Godot, Unreal via UnrealSharp
- ✅ Implementation: Unity first, Godot second
- ⏳ Additional C# engines planned for future, likely candidates: Stride, Flax, Unigine, CryEngine
- ⚠️ Unreal: low priority due to complexity (not beginner friendly, C# not native)

### Performance
- ⏳ Performance benchmarks not yet established
- ⏳ Overhead vs native code not yet quantified

### Tooling & Developer Experience
- ⏳ Debugging integration not yet documented
- ⏳ Profiler integration not yet implemented
- ⏳ Editor integration not yet defined
- ⏳ Testing not yet defined (unit tests, integration tests, behaviour verification tests)

### Integration with Native Code
- ⏳ Native escape hatches not yet documented
- ⏳ Interop with native types not yet defined
- ⏳ Object lifetime awareness between native/LunyScript not yet specified

### Type System
- ⏳ Type safety guarantees not yet documented
- ⏳ Compile-time error detection not yet specified

### Extensibility
- ⏳ Custom extension workflows not yet documented
- ⏳ Engine-specific feature integration not yet defined

### Production Readiness
- ⚠️ Currently proof-of-concept stage
- ⚠️ Not recommended for production use until Phase 2+ completion
- ⏳ Known edge cases not yet catalogued
- ⏳ Maintenance and version upgrade strategy not yet defined

### Feature Coverage
- ⏳ Advanced AI systems support TBD
- ⏳ Networking/multiplayer support TBD
- ⏳ Custom shader integration TBD
- ⏳ Advanced physics features TBD
- ⏳ Third-party asset/plugin compatibility TBD

### Build & Deployment
- ⏳ CI/CD integration not yet documented
- ⏳ Asset bundle support not yet defined
- ⏳ Hot reload capabilities not yet specified

## Design Boundaries

### What LunyScript IS
- High-level gameplay scripting layer
- Cross-engine behavior abstraction
- Fluent API for common game logic patterns
- Code-based alternative to visual scripting

### What LunyScript IS NOT
- Not a complete engine replacement
- Not intended for low-level systems programming
- Not a visual programming tool
- Not a game engine itself

## Legend
- ✅ Implemented/Supported
- ⚠️ Partial support or important caveat
- ⏳ Planned but not yet implemented
- ❌ Out of scope / not planned

---

**This document should be updated when:**
- Design decisions create new boundaries
- Known limitations are encountered
- Limitations are resolved or lifted
- Scope changes occur
