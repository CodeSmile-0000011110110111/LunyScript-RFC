# Open Questions

Unresolved design questions that need decisions before implementation.

## Core Abstractions

### Coroutine Implementation
**Question:** Stackful vs stackless? How to handle across C#/Lua/GDScript?

**Why it matters:** Affects performance, memory usage, and language portability

**Potential approaches:**
- Stackless (async/await style) - more portable, less memory
- Stackful (fibers) - more flexible, harder to implement cross-language

### FSM/BT Ownership
**Question:** Per-object instances or shared/instanced?

**Why it matters:** Memory usage vs. flexibility tradeoff

### Variable Scope
**Question:** Global, per-scene, per-object? How to serialize?

**Why it matters:** Affects save/load system and data isolation

### Native Interop
**Question:** How much native engine code should LunyScript scripts call directly?

**Why it matters:** Balancing abstraction vs. flexibility, affects portability guarantees

## Engine Integration

### Physics Determinism
**Question:** Can we guarantee identical physics results? Should we?

**Why it matters:** Affects portability claims and replay systems

### Networking
**Question:** How does replication work across engines?

**Why it matters:** Multiplayer support architecture

### Asset References
**Question:** How to make asset paths portable across engines?

**Why it matters:** Core portability feature, affects all content

---

When a question is resolved, move it to `/decisions/` as a formal decision record.
