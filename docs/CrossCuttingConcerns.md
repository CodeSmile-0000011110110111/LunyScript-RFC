# Cross-Cutting Concerns Analysis

**Purpose:** Identifies architectural concerns that span multiple layers and must be designed cohesively upfront.

**Document Type:** Architecture Risk Assessment & Design Priority Matrix

**Last Updated:** 2026-01-13

---

## Ranked Concerns

Cross-cutting concerns ranked by **Correctness Impact**, **Complexity**, **Cross-Layer Penetration**, **Performance Impact**, and **Developer Experience**.

---

### 1. Event Ordering Contract ⭐⭐⭐⭐⭐ (Priority: Critical)

**Scores:** Correctness (10/10) · Complexity (9/10) · Cross-Layer (10/10) · Performance (7/10) · DevEx (8/10)

**Affected Layers:** Luny abstractions, LunyScript runtime, all engine adapters

**Risk Profile:**
- Non-determinism breaks user expectations
- Hardest class of bugs to debug (race conditions, order dependencies)
- Cascades into object lifecycle, event dispatch, state machine transitions

**Requirements:**
- Deterministic lifecycle order (parent-first vs child-first)
- Frame-phase ordering: native events → user logic → deferred ops → late update
- Event priority system within phases
- Atomicity guarantees (consistent world state within phase)
- Handling recursive event triggers

**Design Now:** Must be designed before implementation begins. Cannot be changed without breaking all user code.

---

### 2. Object/Node/Actor Registration System ⭐⭐⭐⭐⭐ (Priority: Critical)

**Scores:** Correctness (9/10) · Complexity (10/10) · Cross-Layer (9/10) · Performance (9/10) · DevEx (7/10)

**Affected Layers:** LunyScript core, all engine adapters

**Risk Profile:**
- Foundational system - everything depends on it
- Registration bugs cause silent failures
- Lookup performance affects every frame
- Identity management complexity across engine object lifecycles

**Requirements:**
- Registration timing (on creation, before lifecycle events)
- Stable IDs surviving reparenting/moves
- Fast queries (tag, type, parent, spatial proximity)
- Deferred deregistration (end-of-frame)
- Graceful handling of mid-frame spawns/despawns
- Native object spawn integration

**Dependencies:** Required by event dispatch, lifecycle management, queries, serialization

**Design Now:** Core contracts must be established upfront. Poor design creates permanent performance bottlenecks.

---

### 3. Memory Management Strategy ⭐⭐⭐⭐ (Priority: High)

**Scores:** Correctness (8/10) · Complexity (7/10) · Cross-Layer (7/10) · Performance (10/10) · DevEx (6/10)

**Affected Layers:** LunyScript core, engine-specific pooling strategies

**Risk Profile:**
- Memory leaks kill long-running games
- GC pressure destroys frame timing
- Dangling references cause crashes
- Cache misses impact hot paths

**Requirements:**
- Object pooling for runtime allocations
- Cleanup guarantees (no dangling references)
- Cache-friendly data structures
- Per-engine GC interaction strategies

**Dependencies:** Ties into registration, object lifecycle, serialization

**Design Now:** Pooling architecture and ownership rules must be defined before implementation. Retrofitting is expensive.

---

### 4. Execution Tracing & Profiling Hooks ⭐⭐⭐⭐ (Priority: High)

**Scores:** Correctness (5/10) · Complexity (8/10) · Cross-Layer (8/10) · Performance (8/10) · DevEx (10/10)

**Affected Layers:** Every execution path in LunyScript, optional adapter hooks

**Risk Profile:**
- Poor design adds overhead to every operation
- Missing hooks make debugging impossible
- Hard to retrofit without invasive changes

**Requirements:**
- Zero overhead when disabled (compile-time toggles)
- Function entry/exit hooks
- State transition instrumentation
- Event dispatch tracing
- Object lifecycle events
- Pluggable backends (logging, profilers, replay)

**Data to Expose:**
- Execution time per script/node
- Call graphs and hot paths
- Memory allocations
- Event propagation chains

**Design Now:** Hook points must be designed into architecture from the start.

---

### 5. Error Handling & Recovery ⭐⭐⭐⭐ (Priority: High)

**Scores:** Correctness (8/10) · Complexity (6/10) · Cross-Layer (8/10) · Performance (5/10) · DevEx (9/10)

**Affected Layers:** Luny error contracts, LunyScript handling, engine-specific reporting

**Risk Profile:**
- Poor error handling makes system unusable
- Cascading failures break script isolation
- Missing context makes debugging painful

**Requirements:**
- Graceful degradation (script errors don't crash engine)
- Error propagation with context
- Partial execution (other scripts continue)
- Debug vs release modes
- User-facing error messages

**Dependencies:** Interacts with event ordering, execution model, registration

**Design Now:** Error boundaries and propagation rules must be established before writing core logic.

---

### 6. Concurrency Model ⭐⭐⭐ (Priority: Medium - Future-Proof)

**Scores:** Correctness (9/10) · Complexity (9/10) · Cross-Layer (6/10) · Performance (7/10) · DevEx (6/10)

**Affected Layers:** Luny async abstractions, LunyScript threading rules, adapter implementations

**Risk Profile:**
- Single-threaded default is safe
- Modern engines need async support (Unity Jobs, UE TaskGraph)
- Concurrency bugs are catastrophic but rare in game scripting

**Requirements:**
- Single-threaded by default
- Async-ready abstractions
- Clear ownership and mutation rules
- Engine-specific async pattern support

**Design Later:** Can start single-threaded. Design async hooks into abstractions for future expansion.

---

### 7. Serialization & Hot Reload ⭐⭐⭐ (Priority: Medium - Developer Quality)

**Scores:** Correctness (6/10) · Complexity (7/10) · Cross-Layer (6/10) · Performance (4/10) · DevEx (8/10)

**Affected Layers:** LunyScript runtime state, engine-specific serializers

**Risk Profile:**
- High value for iteration speed
- Not required for MVP
- Can be added incrementally

**Requirements:**
- Save/load active state (FSMs, coroutines, BTs)
- Hot reload without losing state
- Version tolerance (schema changes)

**Design Later:** Nice-to-have. Can be bolted on after core runtime is stable.

---

### 8. API Versioning & Compatibility ⭐⭐ (Priority: Low - Deferred)

**Scores:** Correctness (7/10) · Complexity (6/10) · Cross-Layer (10/10) · Performance (1/10) · DevEx (7/10)

**Affected Layers:** All public APIs across all layers

**Risk Profile:**
- Critical for mature projects
- Premature for early development
- Don't over-engineer for hypothetical future

**Requirements:**
- Semantic versioning
- Deprecation paths
- Multi-version script support

**Design Later:** Establish versioning scheme early but don't constrain initial design. Implement migration tools after API stabilizes.

---

## Design Priority Matrix

### Must Design Now (Before Implementation)
**Reason:** Changing these later requires major refactoring or breaks existing code.

1. **Event Ordering Contract** - Correctness foundation
2. **Object Registration System** - Performance foundation
3. **Memory Management Strategy** - Prevents permanent bottlenecks
4. **Execution Tracing Hooks** - Cannot retrofit without invasive changes
5. **Error Handling & Recovery** - Required for usable MVP

### Can Design Later (Incremental Addition)
**Reason:** Can be added without breaking existing architecture.

6. **Concurrency Model** - Start single-threaded, add async later
7. **Serialization & Hot Reload** - Quality-of-life feature
8. **API Versioning** - Implement after API stabilizes

---

## Cross-Layer Dependency Graph

```
Event Ordering Contract
    ├── Object Registration (requires ordered lifecycle)
    ├── Error Handling (requires atomic phases)
    └── Memory Management (requires cleanup phases)

Object Registration System
    ├── Event Dispatch (requires object lookup)
    ├── Serialization (requires stable IDs)
    └── Profiling Hooks (requires object identity)

Memory Management
    ├── Object Registration (requires pooling integration)
    └── Serialization (requires ownership clarity)

Execution Tracing
    └── (observes all other systems)
```

**Key Insight:** Event Ordering + Object Registration + Memory Management form tightly coupled core. Must be designed together.

---

## Risk Levels

- ⭐⭐⭐⭐⭐ **Critical** - System inoperable without correct design
- ⭐⭐⭐⭐ **High** - Major refactoring required if designed poorly
- ⭐⭐⭐ **Medium** - Can be fixed with moderate effort
- ⭐⭐ **Low** - Localized changes sufficient

---

## Related Documents

- **Architecture.md** - Full architectural requirements
- **QUESTIONS.md** - Unresolved design questions
- **TODO.md** - Design tasks derived from this analysis
- **Guidelines.md** - Scoring criteria and assessment methodology
