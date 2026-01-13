# LunyScript Architecture

## Design Principles

1. **Convention over configuration:** Sane defaults, minimal boilerplate
2. **Explicit is better than implicit:** Clear contracts over magic behavior
3. **Performance by default:** Fast path should be the easy path
4. **Progressive disclosure:** Simple things simple, complex things possible
5. **Engine parity:** Feature set must work identically across all supported engines
6. **Fault Tolerant:** No exceptions, visual error display, hold on to debug information (Name, ID)

## Core Layers

LunyScript follows a three-layered architecture model:

1. LunyEngine abstraction layer (interfaces, proxies, observers)
2. LunyScript block execution engine (Sequences, StateMachine, BehaviorTree)
3. Engine Adapters & Bridges (API Services)

### 1. Luny
**Namespace:** `Luny`

- **Pure abstractions** - the cross-engine developer SDK
- **Core interfaces** - ILunyObject, ILunyEngineObserver, ILunyEngineService
- **Runtime services** - object/asset/scene registry, frame scheduling, game events
- **Behavioral contracts** - execution order and lifecycle event guarantees and semantic rules
- **Zero engine dependencies** - internalized logic defers only engine-native API calls to engine services

### 2. LunyScript
**Namespace:** `LunyScript`

- **Script execution logic** - processes user-written behaviors
- **Built-in implementations** - sequences, statemachines, behavior trees
- **Consumes Luny abstractions**
- **Portable** - LunyScript implementations do not work with engine types by default
- **Escape Hatch** - Engine-native references can be used directly, sacrificing portability for likely marginal performance gains

### 3. Engine Adapters & Bridges (engine-native glue)
**Namespaces:** `LunyScript.Unity`, `LunyScript.Godot`, ..

- **Engine-specific bindings** - Unity/Godot/.. integration
- **Native event observers** - collision, input, scene load, ..
- **Native API wrappers** - input, physics, audio, camera, scene
- **Lifecycle management** - startup & shutdown, update heartbeat
- **Mostly mechanical glue** - straightforward bridging/mapping code
- **Asset & Scene** - uniform addressing

#### Size Notes
- Adapter overall complexity and size similar between engines (complexity goes down with maturity of engine)
- Adapater complexity highest for assets and scene - but likely only a few hundred lines of 'query' code
- As API expands, adapter size grows proportionally but automates well
- Shared engine functionality is largely semantic differences
- Focus on established, stable, shared features: Not chasing the latest features 

---

## Namespace Usage

```csharp
using Luny;                    // Implementers extending core (abstractions only)
using LunyScript;              // Everyone - the main user-facing API
using LunyScript.Unity;        // Unity projects - bootstrap and setup only

// User code - derived from LunyScript, must implement abstract Build() method.
// LunyScripts are front-loaded and converted into runtime-optimized block patterns.
// GC or "Find" implications are of little concern since scripts convert when 'loading' the game/scene.
When.Collision.With("ball")
    .Begins(Audio.Play("kick"));

// Implementer code - uses Luny abstractions, registers automatically
class MyObserver : Luny.ILunyEngineObserver {
    // Implement engine lifecycle methods as needed:
    void OnEngineStartup() {}
    void OnEnginePreUpdate() {}
    void OnEngineFixedStep(Double fixedDeltaTime) {}
    void OnEngineUpdate(Double deltaTime) {}
    void OnEngineLateUpdate(Double deltaTime) {}
    void OnEnginePostUpdate() {}
    void OnEngineShutdown() {}
    void OnSceneLoaded(ILunyScene loadedScene) {}
    void OnSceneUnloaded(ILunyScene unloadedScene) {}
    // ...
}
```

---

## Key Architectural Decisions

### Abstraction Decoupling
**Decision:** Decouple low-level abstractions (interfaces/contracts) from concrete implementations (coroutines, FSMs, BTs)

**Rationale:**
- Enables custom implementations per engine or use case
- Creates "pure" portable core for community to build upon
- Improves testability and maintainability
- Re-implementing common types (eg Vector3, Color, Mathf) is straightforward with AI or utilizes .NET implementations

### Execution Model
- Central script runner processing static graphs
- Engine heartbeat-driven execution
- Single-frame event trapping by condition blocks processing native events: `If(IsTouching("ball"), Audio.Play("kick"))`
- Deferred execution for structural changes to scene (native destroy => end of frame)

---

## Critical Architectural Concerns

### 1. ✅ Object/Node/Actor Registration System (Implemented)
**Requirements:**
- **When to register:** On create or when 'registering' existing native object to LunyEngine
- **Identity management:** Stable IDs that survive engine-native object moves/reparenting
- **Debugging:** Object IDs/Name persist even if native object gets destroyed (controlled by DEBUG symbols)
- **Lookup performance:** Fast hashed queries by tag, name, and perhaps type, parent, proximity, ...

**Considerations:**
- Interoperability with engine-native scripting and built-in behaviour
- Auto-Pooling of Prefab instances (configurable, avoids create/destroy overhead)
- Single-threaded builders, potentially multi-threaded runner execution
- Sandboxed execution: limits user script access of scene hierarchy (objects), assets, and APIs

### 2. ✅ Event Ordering Contract (Implemented)
**Requirements:**
- **Deterministic object lifecycle order:** Consistent across all engines
- **Frame-phase ordering:**
  1. Native engine events → trapped/queued for current frame, where necessary
  3. Stable, deterministic update order
  4. Deferred operations → structural changes: 'ready', destroy, ..
- **Event priority system:** Allow user-defined ordering of engine observers

**Considerations:**
- What happens when user code triggers events during event processing? May defer to next frame.

### 3. ✅ Execution Tracing & Profiling Hooks (Implemented)
**Requirements:**
- **Minimal intrusion:** Zero overhead when disabled
- **Flexible instrumentation:**
  - Function entry/exit hooks
  - State transitions (FSM state changes, BT node execution)
  - Event dispatch (what triggered, what handled)
  - Object lifecycle (spawn, enable, disable, destroy)
  - Observer lifecycle (startup, update, shutdown)
- **Pluggable backends:** Users provide trace collectors (logging, profiler integration, replay systems)

**Design approaches:**
- **Compile-time toggles:** `#ifdef LUNY_TRACE` for zero overhead
- **Delegate-based:** Optional callbacks injected into runner
- **Event bus:** Internal trace event stream that trace systems subscribe to

**Data to expose:**
- Execution time per script/node
- Call graphs and hot paths
- Memory allocations (object spawns)
- Event propagation chains

### 4. ✅ Memory Management Strategy (Verified)
**Requirements:**
- **Cleanup guarantees:** No dangling references after object destruction

### 5. Error Handling & Recovery
**Requirements:**
- **Fail gracefully:** Script errors shouldn't crash engine
- **Error propagation:** Surface errors to user code with context
- **Partial execution:** Other scripts continue if one fails
- **Debug mode:** Detailed error messages with full context (stack, state)

### 6. Serialization & Hot Reload
**Desirable:**
- **State persistence:** Save/load active state machines, coroutines, BTs
- **Hot reload:** Swap script logic without losing runtime state
- **Version tolerance:** Handle schema changes gracefully

### 7. Concurrency Model
**Requirements:**
- **Single-threaded by default:** Simplifies reasoning and debugging

**Desirable:**
- **Internal Multi-Threading:** Supported optionally, orchestrates execution of Entity Component System or Jobs
- **Async-ready abstractions:** Support engine-specific async patterns (Unity Jobs, UE TaskGraph)
- **Safe data sharing:** Clear ownership and mutation rules

### 8. API Versioning & Compatibility
**Requirements:**
- **Semantic versioning:** Breaking changes clearly signaled
- **Deprecation path:** Old APIs supported for migration period

**Desirable:**
- **Multi-version support:** Allow mixing scripts from different API versions (if feasible)
