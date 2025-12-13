# Script Runner Singleton Pattern

We've designed a clean, lazy-initialization singleton pattern for the LunyScript runner that only creates itself when first accessed, avoiding overhead when unused. The architecture uses a dispatcher pattern: `EngineRunner` is the singleton that receives engine lifecycle callbacks and dispatches them to registered domain runners (`LunyScriptRunner`, `AIRunner`, etc.) via the `IEngineRunner` interface.

## TODOs

### TODO: Dynamic Runner Instantiation with Runtime Control
**Current:** `EngineRunner` constructor hardcodes runner instantiation
```csharp
private EngineRunner()
{
    var scriptRunner = new LunyScriptRunner(this);
    // Hardcoded - not flexible
}
```

**Requirements:**
1. Automatic discovery via reflection (no manual registration)
2. Runtime enable/disable per runner (critical for debugging)
3. One-time initialization on startup (execution order is immutable after initialization)

**Design Decision: No Guaranteed Execution Order**

Runners execute in discovery order (non-deterministic, based on reflection assembly scan).

**Rationale:**
- **Registration-time ordering is impossible:** Runners register in their constructors, but other runner types aren't instantiated yet (cannot specify "run before AIRunner" when AIRunner doesn't exist)
- **Immutable after init:** Order cannot change after startup, eliminating runtime ordering APIs
- **YAGNI principle:** Don't add complexity until proven necessary
- **Encourages good design:** Runners should be independent subsystems; dependencies indicate design smell (use events/messaging instead)
- **Can evolve later:** If ordering becomes necessary, can add two-phase initialization or external configuration

**Implementation approach:**

**Attribute definition:**
```csharp
[AttributeUsage(AttributeTargets.Class)]
public class LunyRunnerAttribute : Attribute
{
    // Marker attribute only - no properties
}
```

**EngineRunner implementation:**
```csharp
private readonly Dictionary<Type, IEngineRunner> _runnerInstances = new();
private readonly List<IEngineRunner> _runners = new(); // Execution list (discovery order)
private readonly HashSet<Type> _enabledRunners = new();

private EngineRunner()
{
    DiscoverAndInstantiateRunners();
    // After this point, runner list is immutable
}

private void DiscoverAndInstantiateRunners()
{
    var runnerTypes = AppDomain.CurrentDomain.GetAssemblies()
        .SelectMany(a => a.GetTypes())
        .Where(t => t.GetCustomAttribute<LunyRunnerAttribute>() != null
                    && typeof(IEngineRunner).IsAssignableFrom(t)
                    && !t.IsAbstract);

    foreach (var type in runnerTypes)
    {
        var instance = (IEngineRunner)Activator.CreateInstance(type, this);
        _runnerInstances[type] = instance;
        _runners.Add(instance);
        _enabledRunners.Add(type); // All runners enabled by default
    }

    // Note: Execution order is now locked (discovery order)
}

// Runtime control API - Enable/Disable only
public void EnableRunner<T>() where T : IEngineRunner => _enabledRunners.Add(typeof(T));
public void DisableRunner<T>() where T : IEngineRunner => _enabledRunners.Remove(typeof(T));
public bool IsRunnerEnabled<T>() where T : IEngineRunner => _enabledRunners.Contains(typeof(T));

public void OnUpdate(float deltaTime)
{
    // Execute in discovery order, skip disabled runners
    foreach (var runner in _runners)
    {
        if (_enabledRunners.Contains(runner.GetType()))
        {
            runner.OnUpdate(deltaTime);
        }
    }
}
```

**Usage:**
```csharp
[LunyRunner]
public sealed class LunyScriptRunner : IEngineRunner
{
    public LunyScriptRunner(EngineRunner engineRunner)
    {
        // No ordering specification - executes in discovery order
        Initialize();
    }
}

[LunyRunner]
public sealed class AIRunner : IEngineRunner { ... }

// Runtime control - Enable/Disable only
EngineRunner.Instance.DisableRunner<LunyScriptRunner>(); // For debugging
EngineRunner.Instance.EnableRunner<LunyScriptRunner>();  // Re-enable
```

✅ **Benefits:**
- Automatic discovery via reflection
- Runtime enable/disable for debugging
- Simple implementation (no ordering complexity)
- Encourages order-independent runner design
- Immutable execution order (no mid-runtime surprises)
- Type-safe runtime API
- All runners enabled by default

⚠️ **Limitations:**
- Execution order is non-deterministic (discovery order)
- Cannot specify dependencies between runners
- **Future:** Can add explicit ordering mechanism if use case emerges

### TODO: Engine-Native Singleton Instantiation (Always-On)
**Decision:** Always initialize - LunyScript is core infrastructure that instantiates all user LunyScripts

**Rationale:**
- LunyScript is not optional - it's the foundation that discovers and instantiates user scripts
- Always-on initialization ensures deterministic, predictable behavior
- Early initialization (before first scene) prevents mid-frame instantiation issues
- The "lazy" pattern would provide no benefit since LunyScript usage implies the engine must be running

**Implementation:**

**Unity:**
```csharp
namespace LunyScript.Unity
{
    using UnityEngine;
    using LunyScript.Core;

    internal sealed class EngineRunnerUnity : MonoBehaviour
    {
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        private static void AutoInitialize()
        {
            // Force creation before first scene loads
            _ = Instance;
        }

        // ... rest of singleton implementation
    }
}
```

**Godot:**
```csharp
namespace LunyScript.Godot
{
    using Godot;
    using LunyScript.Core;

    internal sealed partial class EngineRunnerGodot : Node
    {
        // Option 1: ModuleInitializer (C# 9+)
        [System.Runtime.CompilerServices.ModuleInitializer]
        internal static void AutoInitialize()
        {
            // Deferred to first frame since Godot isn't ready yet
            Callable.From(() => _ = Instance).CallDeferred();
        }

        // Option 2: Custom EditorPlugin (more reliable)
        // Create EditorPlugin that adds EngineRunnerGodot to AutoLoad list

        // ... rest of singleton implementation
    }
}
```

✅ **Benefits:**
- Deterministic initialization timing (before scene load)
- No user interaction required
- Predictable behavior for LunyScript instantiation
- Prevents mid-frame initialization surprises
- Lazy pattern as fallback still works if auto-init fails

## Key Design Decisions

**Architecture:**
- ✅ `IEngineRunner` interface defines the contract for all domain runners that need lifecycle updates
- ✅ `EngineRunner` class is the singleton dispatcher - creates and manages all domain runners
- ✅ Domain runners (`LunyScriptRunner`, future `AIRunner`, etc.) implement `IEngineRunner` and register with `EngineRunner`
- ✅ Engine-native wrappers are **ultra-thin** sealed, internal classes - only create `EngineRunner` and forward lifecycle
- ✅ All domain runner instantiation logic lives in `EngineRunner` (engine-agnostic side), NOT in engine-native wrappers
- ✅ Engine-native wrappers hold `IEngineRunner` interface reference (not concrete type)
- ✅ Callback methods use "On" prefix convention: constructor for initialization, `OnUpdate`, `OnFixedStep`
- ✅ Clean separation: no `#if` preprocessor directives, engine-specific code isolated in adapter layer
- ✅ C# legal: uses composition and registration pattern, not illegal multiple inheritance

**Cross-Engine:**
- ✅ Lazy initialization via `Instance` property getter (not eager `RuntimeInitializeOnLoad`)
- ✅ Only initializes when first LunyScript actually needs the runner
- ✅ Null-check for singleton pattern (no `_initialized` bool needed - same performance as bool check)
- ✅ "Instance" property name preferred over "Singleton" (more conventional)
- ✅ `Awake`/`_Ready` serve as duplicate detection guards only
- ✅ Removed unnecessary `_instance != this` check (impossible condition)
- ✅ Removed `_instance = this` assignment from lifecycle methods (only set via `Instance`)
- ✅ Duplicate detection throws exception with detailed debug info (GameObject/Node names and instance IDs)

**Unity-Specific:**
- Inherits from `MonoBehaviour`
- `Awake()` for duplicate detection
- `DontDestroyOnLoad()` for persistence
- `GetInstanceID()` for debugging info

**Godot-Specific:**
- Inherits from `Node` with `partial` class modifier
- `_Ready()` for duplicate detection
- `CallDeferred("add_child", ...)` to safely add to SceneTree
- `GetInstanceId()` for debugging info (note lowercase 'd')

## Interface Definition

```csharp
namespace LunyScript.Core
{
    public interface IEngineRunner
    {
        // Lifecycle callbacks dispatched from EngineRunner
        void OnUpdate(float deltaTime);
        void OnFixedStep(float fixedDeltaTime);
    }
}
```

## EngineRunner (Singleton Dispatcher)

```csharp
namespace LunyScript.Core
{
    public sealed class EngineRunner : IEngineRunner
    {
        private static EngineRunner _instance;

        private readonly List<IEngineRunner> _registeredRunners = new List<IEngineRunner>();

        public static EngineRunner Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new EngineRunner();
                }
                return _instance;
            }
        }

        private EngineRunner()
        {
            // EngineRunner decides which domain runners to instantiate
            // This logic is engine-agnostic and controlled here, not in Unity/Godot wrappers
            var scriptRunner = new LunyScriptRunner(this);
            // Future: var aiRunner = new AIRunner(this);
            // Future: var physicsRunner = new PhysicsRunner(this);
        }

        public void Register(IEngineRunner runner)
        {
            if (!_registeredRunners.Contains(runner))
            {
                _registeredRunners.Add(runner);
            }
        }

        public void OnUpdate(float deltaTime)
        {
            // Dispatch to all registered runners
            foreach (var runner in _registeredRunners)
            {
                runner.OnUpdate(deltaTime);
            }
        }

        public void OnFixedStep(float fixedDeltaTime)
        {
            // Dispatch to all registered runners
            foreach (var runner in _registeredRunners)
            {
                runner.OnFixedStep(fixedDeltaTime);
            }
        }
    }
}
```

## LunyScriptRunner (Domain Runner)

```csharp
namespace LunyScript.Core
{
    public sealed class LunyScriptRunner : IEngineRunner
    {
        // Engine-agnostic script execution logic
        // State machines, behavior trees, script lifecycle, etc.

        public LunyScriptRunner(EngineRunner engineRunner)
        {
            // Register with dispatcher
            engineRunner.Register(this);

            // Initialize runner systems (moved from OnCreate to constructor)
            Initialize();
        }

        private void Initialize()
        {
            // Initialize runner systems
        }

        public void OnUpdate(float deltaTime)
        {
            // Process per-frame logic
        }

        public void OnFixedStep(float fixedDeltaTime)
        {
            // Process fixed timestep logic
        }
    }
}
```

## Unity Implementation (Ultra-Thin Wrapper)

```csharp
namespace LunyScript.Unity
{
    using UnityEngine;
    using LunyScript.Core;

    internal sealed class EngineRunnerUnity : MonoBehaviour
    {
        private static EngineRunnerUnity _instance;
        private static bool _initialized;

        private IEngineRunner _engineRunner;

        public static EngineRunnerUnity Instance
        {
            get
            {
                if (!_initialized)
                {
                    var go = new GameObject("LunyScriptEngine");
                    _instance = go.AddComponent<EngineRunnerUnity>();
                    DontDestroyOnLoad(go);
                    _initialized = true;
                }
                return _instance;
            }
        }

        private void Awake()
        {
            if (_instance != null)
            {
                throw new System.InvalidOperationException(
                    $"Duplicate EngineRunnerUnity singleton detected! " +
                    $"Existing: GameObject='{_instance.gameObject.name}' InstanceID={_instance.GetInstanceID()}, " +
                    $"Duplicate: GameObject='{gameObject.name}' InstanceID={GetInstanceID()}");
            }

            // Only responsibility: create EngineRunner singleton
            _engineRunner = EngineRunner.Instance;
        }

        // Only responsibility: forward Unity lifecycle to EngineRunner
        private void Update() => _engineRunner.OnUpdate(Time.deltaTime);

        private void FixedUpdate() => _engineRunner.OnFixedStep(Time.fixedDeltaTime);
    }
}
```

## Godot Implementation (Ultra-Thin Wrapper)

```csharp
namespace LunyScript.Godot
{
    using Godot;
    using LunyScript.Core;

    internal sealed partial class EngineRunnerGodot : Node
    {
        private static EngineRunnerGodot _instance;

        private IEngineRunner _engineRunner;

        public static EngineRunnerGodot Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new EngineRunnerGodot();

                    var root = Engine.GetMainLoop() as SceneTree;
                    root?.Root.CallDeferred("add_child", _instance);
                }
                return _instance;
            }
        }

        public override void _Ready()
        {
            if (_instance != null)
            {
                throw new System.InvalidOperationException(
                    $"Duplicate EngineRunnerGodot singleton detected! " +
                    $"Existing: Name='{_instance.Name}' InstanceID={_instance.GetInstanceId()}, " +
                    $"Duplicate: Name='{Name}' InstanceID={GetInstanceId()}");
            }

            // Only responsibility: create EngineRunner singleton
            _engineRunner = EngineRunner.Instance;
        }

        // Only responsibility: forward Godot lifecycle to EngineRunner
        public override void _Process(double delta) => _engineRunner.OnUpdate((float)delta);

        public override void _PhysicsProcess(double delta) => _engineRunner.OnFixedStep((float)delta);
    }
}
```

## Architecture Flow Summary

### 1. First Access Trigger
User code accesses `EngineRunnerUnity.Instance` (or `EngineRunnerGodot.Instance`)

### 2. Engine-Native Wrapper Creation
- Creates GameObject/Node
- Adds MonoBehaviour/Node component
- Sets DontDestroyOnLoad / adds to SceneTree root

### 3. Awake/_Ready Hook
- Duplicate detection guard
- **Creates `EngineRunner.Instance`** (the core singleton)

### 4. EngineRunner Constructor (Engine-Agnostic)
```csharp
private EngineRunner()
{
    // ALL domain runner instantiation happens here
    var scriptRunner = new LunyScriptRunner(this);
    // Future runners...
}
```

### 5. Domain Runner Registration
```csharp
public LunyScriptRunner(EngineRunner engineRunner)
{
    engineRunner.Register(this);  // Self-registers
    Initialize();                  // Initializes in constructor
}
```

### 6. Lifecycle Dispatch
```
Unity.Update()
  → EngineRunner.OnUpdate(deltaTime)
    → LunyScriptRunner.OnUpdate(deltaTime)
    → AIRunner.OnUpdate(deltaTime)
    → etc.
```

## Key Benefits

✅ **Ultra-thin engine wrappers**: Only 3 responsibilities (create, duplicate check, forward lifecycle)
✅ **No duplication**: Domain runner instantiation logic exists in ONE place (`EngineRunner` constructor)
✅ **Easy to extend**: Add new runners by adding one line in `EngineRunner` constructor
✅ **Testable**: Can mock `IEngineRunner` interface
✅ **Type safety**: Engine wrappers use `IEngineRunner` interface, not concrete types
✅ **Clear separation**: Engine-native vs engine-agnostic concerns are completely separated
