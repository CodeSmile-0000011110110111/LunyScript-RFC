# Architecture Requirements

## Core Layers

### 1. Portable Core (70%)
- **Pure abstractions** - no engine dependencies
- **Behavioral contracts** - guaranteed execution order and semantics
- **Decoupled implementations** - pluggable coroutines, state machines, behavior trees

#### Decoupled implementations => Notes
  - Design contracts first - must think through abstraction boundaries before coding
  - Dependency injection - need initialization/configuration system to wire implementations
  - Boundary decisions - where to draw abstraction lines (too granular = verbose, too coarse = inflexible)
- 
### 2. Engine Adapter Layer (30%)
- Engine-specific bindings and observers
- Native event trapping and forwarding
- Lifecycle management and integration

---

## Key Architectural Decisions

### Abstraction Decoupling
**Decision:** Decouple low-level abstractions (interfaces/contracts) from concrete implementations (coroutines, FSMs, BTs)

**Rationale:**
- Enables custom implementations per engine or use case
- Creates "pure" portable core for community to build upon
- Improves testability and maintainability

### Execution Model
- Central script runner processing static graphs
- Engine heartbeat-driven execution
- Single-frame event trapping for native events
- Deferred execution for structural changes (destroy, disable) to end-of-frame

---

## Critical Architectural Concerns

### 1. Object/Node/Actor Registration System
**Requirements:**
- **When to register:** On creation, before any lifecycle events fire
- **Registration contract:**
  - Objects register with central runner on construction
  - Deregistration deferred to end-of-frame to allow cleanup events
  - Handle mid-frame spawns/despawns gracefully
- **Identity management:** Stable IDs that survive engine-native object moves/reparenting
- **Lookup performance:** Fast queries by tag, type, parent, spatial proximity

**Considerations:**
- How to handle objects created outside LunyScript (native spawns)?
- Registration hooks for engine-specific object pools
- Thread-safety if engines support multithreaded spawning

### 2. Event Ordering Contract
**Requirements:**
- **Deterministic lifecycle order:**
  - Parent-first or child-first (document and enforce)
  - Consistent across all engines
- **Frame-phase ordering:**
  1. Native engine events → trapped
  2. User logic processing → state machines, coroutines, BTs tick
  3. Deferred operations → destroys, disables, structural changes
  4. Late update → physics, animation, rendering
- **Event priority system:** Allow user-defined ordering within phases
- **Guarantee atomicity:** Events within same frame-phase see consistent world state

**Considerations:**
- What happens when user code triggers events during event processing?
- How to handle recursive event triggers (e.g., collision starts spawning object that collides)?

### 3. Execution Tracing & Profiling Hooks
**Requirements:**
- **Minimal intrusion:** Zero overhead when disabled
- **Flexible instrumentation:**
  - Function entry/exit hooks
  - State transitions (FSM state changes, BT node execution)
  - Event dispatch (what triggered, what handled)
  - Object lifecycle (spawn, enable, disable, destroy)
- **Pluggable backends:** Users provide trace collectors (logging, profiler integration, replay systems)

**Design approaches:**
- **Compile-time toggles:** `#ifdef LUNYSCRIPT_TRACE` for zero overhead
- **Delegate-based:** Optional callbacks injected into runner
- **Event bus:** Internal trace event stream that trace systems subscribe to

**Data to expose:**
- Execution time per script/node
- Call graphs and hot paths
- Memory allocations (object spawns)
- Event propagation chains

### 4. Memory Management Strategy
**Requirements:**
- **Pooling:** Reusable nodes/objects to avoid allocations during gameplay
- **Cleanup guarantees:** No dangling references after object destruction
- **Cache locality:** Hot data structures packed for cache efficiency

### 5. Error Handling & Recovery
**Requirements:**
- **Fail gracefully:** Script errors shouldn't crash engine
- **Error propagation:** Surface errors to user code with context
- **Partial execution:** Other scripts continue if one fails
- **Debug mode:** Detailed error messages with full context (stack, state)

### 6. Serialization & Hot Reload
**Requirements:**
- **State persistence:** Save/load active state machines, coroutines, BTs
- **Hot reload:** Swap script logic without losing runtime state
- **Version tolerance:** Handle schema changes gracefully

### 7. Concurrency Model
**Requirements:**
- **Single-threaded by default:** Simplifies reasoning and debugging
- **Async-ready abstractions:** Support engine-specific async patterns (Unity Jobs, UE TaskGraph)
- **Safe data sharing:** Clear ownership and mutation rules

### 8. API Versioning & Compatibility
**Requirements:**
- **Semantic versioning:** Breaking changes clearly signaled
- **Deprecation path:** Old APIs supported for migration period
- **Multi-version support:** Allow mixing scripts from different API versions (if feasible)

---

## Open Questions for Design Phase

1. **Coroutine implementation:** Stackful vs stackless? How to handle across C#/Lua/GDScript?
2. **FSM/BT ownership:** Per-object or shared/instanced?
3. **Variable scope:** Global, per-scene, per-object? How to serialize?
4. **Native interop:** How much native engine code should LunyScript scripts call directly?
5. **Physics determinism:** Can we guarantee identical physics results? Should we?
6. **Networking:** How does replication work across engines?
7. **Asset references:** How to make asset paths portable across engines?

---

## Design Principles

1. **Convention over configuration:** Sane defaults, minimal boilerplate
2. **Explicit is better than implicit:** Clear contracts over magic behavior
3. **Performance by default:** Fast path should be the easy path
4. **Progressive disclosure:** Simple things simple, complex things possible
5. **Engine parity:** Feature set must work identically across all supported engines
