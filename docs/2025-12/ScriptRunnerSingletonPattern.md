# Script Runner Singleton Pattern

We've designed a clean, lazy-initialization singleton pattern for the LunyScript runner that only creates itself when first accessed, avoiding overhead when unused. The architecture uses a dispatcher pattern: `EngineLifecycleDispatcher` is the singleton that receives engine lifecycle callbacks and dispatches them to registered domain runners (`LunyScriptRunner`, `AIRunner`, etc.) via the `IEngineLifecycle` interface.

## TODOs

### TODO: Considerations

- consider if IEngineLifecycle implementations would benefit from subclassing an abstract base class
  - **Pros:** Shared initialization logic, template method pattern for lifecycle, easier to add common utilities
  - **Cons:** Less flexible (can't inherit from other base classes), interface is already simple enough, YAGNI principle applies
- consider if execution order should be made deterministic (explicit priority values, etc.)
- consider maintaining same execution order for lifecycle observers when enabled/disabled (currently changes order)
- consider allowing registering same observer type multiple times (probably not meaningful, users can further distribute events)
- add unit tests ensuring adapter instantiation and lifecycle observer registration

## Key Design Decisions

### Instantiation Timeline

```
Runtime starts (Unity/Godot engine initialization)
  ↓
Auto-initialization triggers (before first scene load)
  ↓
Unity-/GodotLifecycleAdapter instantiates via engine autoload mechanism
  ↓
LifecycleAdapter instantiates new GameObject with UnityLifecycleAdapter component
LifecycleAdapter instantiates new GodotLifecycleAdapter Node and adds it to SceneTree (deferred)
  ↓
LifecycleAdapter Awake/_Ready() instantiates EngineLifecycleDispatcher via Instance property (keeps dispatcher reference)  
  ↓
EngineLifecycleDispatcher constructor instantiates and registers domain runners (LunyScriptRunner, etc.)
  ↓
LifecycleDispatcher calls OnStartup() on each runner
  ↓
System ready - heartbeat event dispatch begins (OnUpdate/OnFixedStep)
```

**Architecture:**
- ✅ `IEngineLifecycleDispatcher` interface defines the contract for the dispatcher (receives callbacks from engine adapters)
- ✅ `IEngineLifecycle` interface defines the contract for all lifecycle observers (receives callbacks from dispatcher)
- ✅ Clear separation: dispatcher doesn't implement `OnStartup` (only observers do)
- ✅ `EngineLifecycleDispatcher` class is the singleton dispatcher - discovers and manages all lifecycle observers
- ✅ Lifecycle observers (`LunyScriptRunner`, future `AIRunner`, etc.) implement `IEngineLifecycle`
- ✅ Automatic discovery via reflection - no attributes required, interface-based only
- ✅ Runtime enable/disable per observer (critical for debugging)
- ✅ Execution order is currently non-deterministic (reflection assembly scan order)
- ✅ **Note:** Enabling/disabling observers changes execution order (may be improved later)
- ✅ Engine-native adapters are **ultra-thin** sealed, internal classes - only create `EngineLifecycleDispatcher` and forward lifecycle
- ✅ All observer instantiation logic lives in `EngineLifecycleDispatcher` (engine-agnostic side), NOT in engine-native adapters
- ✅ Engine-native adapters hold `IEngineLifecycleDispatcher` interface reference (not concrete type)
- ✅ Callback methods use "On" prefix convention: `OnStartup`, `OnUpdate`, `OnFixedStep`, `OnShutdown`
- ✅ Clean separation: no `#if` preprocessor directives, engine-specific code isolated in adapter layer

**Cross-Engine:**
- ✅ `Awake`/`_Ready` serve as duplicate detection guards only
- ✅ **IMPORTANT:** Never use `_instance != this` checks in Awake/_Ready - this condition is impossible since `_instance` is set in AutoInitialize before Awake/_Ready runs. This is cargo-cult programming.

**Engine-Native Singleton Instantiation (Always-On)**

**Decision:** Always initialize Engine LifecycleAdapters and EngineLifecycleDispatcher

**Rationale:**
- Luny is not optional - it's the foundation that discovers and instantiates IEngineLifecycle implementations
- Always-on initialization ensures deterministic, predictable behavior
- Early initialization (before first scene) prevents mid-frame instantiation issues
- A "lazy init" pattern would provide no benefit since LunyScript usage implies the engine must be running

## Interface Definitions

```csharp
namespace Luny
{
    public interface IEngineLifecycleDispatcher
    {
        // Dispatcher interface - receives callbacks from engine adapters
        void OnUpdate(double deltaTime);
        void OnFixedStep(double fixedDeltaTime);
        void OnShutdown();
    }

    public interface IEngineLifecycle
    {
        // Lifecycle observer interface - receives callbacks from dispatcher
        void OnStartup();
        void OnUpdate(double deltaTime);
        void OnFixedStep(double fixedDeltaTime);
        void OnShutdown();
        // add remaining lifecycle callbacks here
    }
}
```

## EngineLifecycleDispatcher (Singleton Dispatcher)

```csharp
namespace Luny
{
    public sealed class EngineLifecycleDispatcher : IEngineLifecycleDispatcher
    {
        private static EngineLifecycleDispatcher _instance;

        private readonly LifecycleObserverRegistry _registry;

        public static EngineLifecycleDispatcher Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new EngineLifecycleDispatcher();
                }
                return _instance;
            }
        }

        private EngineLifecycleDispatcher()
        {
            _registry = new LifecycleObserverRegistry();
        }

        public void EnableObserver<T>() where T : IEngineLifecycle => _registry.EnableObserver<T>();

        public void DisableObserver<T>() where T : IEngineLifecycle => _registry.DisableObserver<T>();

        public bool IsObserverEnabled<T>() where T : IEngineLifecycle => _registry.IsObserverEnabled<T>();

        public void OnUpdate(double deltaTime)
        {
            foreach (var observer in _registry.GetEnabledObservers())
            {
                observer.OnUpdate(deltaTime);
            }
        }

        public void OnFixedStep(double fixedDeltaTime)
        {
            foreach (var observer in _registry.GetEnabledObservers())
            {
                observer.OnFixedStep(fixedDeltaTime);
            }
        }

        public void OnShutdown()
        {
            foreach (var observer in _registry.GetEnabledObservers())
            {
                observer.OnShutdown();
            }
        }

        public static void ThrowDuplicateAdapterException(string adapterTypeName, string existingObjectName, long existingInstanceId, string duplicateObjectName, long duplicateInstanceId)
        {
            throw new System.InvalidOperationException(
                $"Duplicate {adapterTypeName} singleton detected! " +
                $"Existing: Name='{existingObjectName}' InstanceID={existingInstanceId}, " +
                $"Duplicate: Name='{duplicateObjectName}' InstanceID={duplicateInstanceId}");
        }

        private sealed class LifecycleObserverRegistry
        {
            private readonly Dictionary<Type, IEngineLifecycle> _registeredObservers = new();
            private readonly List<IEngineLifecycle> _enabledObservers = new();

            public LifecycleObserverRegistry()
            {
                DiscoverAndInstantiateObservers();
            }

            private void DiscoverAndInstantiateObservers()
            {
                var observerTypes = AppDomain.CurrentDomain.GetAssemblies()
                    .SelectMany(a => a.GetTypes())
                    .Where(t => typeof(IEngineLifecycle).IsAssignableFrom(t)
                                && !t.IsAbstract
                                && t != typeof(EngineLifecycleDispatcher));

                foreach (var type in observerTypes)
                {
                    var instance = (IEngineLifecycle)Activator.CreateInstance(type);
                    _registeredObservers[type] = instance;
                    _enabledObservers.Add(instance); // All observers enabled by default
                    instance.OnStartup(); // Initialize immediately after instantiation
                }
            }

            public void EnableObserver<T>() where T : IEngineLifecycle
            {
                if (_registeredObservers.TryGetValue(typeof(T), out var observer) && !_enabledObservers.Contains(observer))
                {
                    _enabledObservers.Add(observer);
                }
            }

            public void DisableObserver<T>() where T : IEngineLifecycle
            {
                if (_registeredObservers.TryGetValue(typeof(T), out var observer))
                {
                    _enabledObservers.Remove(observer);
                }
            }

            public bool IsObserverEnabled<T>() where T : IEngineLifecycle
            {
                return _registeredObservers.TryGetValue(typeof(T), out var observer) && _enabledObservers.Contains(observer);
            }

            public IEnumerable<IEngineLifecycle> GetEnabledObservers() => _enabledObservers;
        }
    }
}
```

## LunyScriptRunner (Lifecycle Observer)

```csharp
namespace LunyScript
{
    public sealed class LunyScriptRunner : IEngineLifecycle
    {
        // Engine-agnostic script execution logic
        // State machines, behavior trees, script lifecycle, etc.

        public void OnStartup()
        {
            // Initialize runner systems
        }

        public void OnUpdate(double deltaTime)
        {
            // Process per-frame logic
        }

        public void OnFixedStep(double fixedDeltaTime)
        {
            // Process fixed timestep logic
        }

        public void OnShutdown()
        {
            // Cleanup runner systems
        }
    }
}
```

## Unity Implementation (Ultra-Thin Adapter)

```csharp
namespace Luny.Unity
{
    using UnityEngine;

    internal sealed class UnityLifecycleAdapter : MonoBehaviour
    {
        private static UnityLifecycleAdapter _instance;

        private IEngineLifecycleDispatcher _dispatcher;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        private static void AutoInitialize()
        {
            // Force creation before first scene loads
            var go = new GameObject(nameof(UnityLifecycleAdapter));
            _instance = go.AddComponent<UnityLifecycleAdapter>();
            DontDestroyOnLoad(go);
        }

        private void Awake()
        {
            if (_instance != null)
            {
                EngineLifecycleDispatcher.ThrowDuplicateAdapterException(
                    nameof(UnityLifecycleAdapter),
                    _instance.gameObject.name,
                    _instance.GetInstanceID(),
                    gameObject.name,
                    GetInstanceID());
            }

            // Only responsibility: create EngineLifecycleDispatcher singleton
            _dispatcher = EngineLifecycleDispatcher.Instance;
        }

        // Only responsibility: forward Unity lifecycle to EngineLifecycleDispatcher
        private void Update() => _dispatcher.OnUpdate(Time.deltaTime);

        private void FixedUpdate() => _dispatcher.OnFixedStep(Time.fixedDeltaTime);

        private void OnApplicationQuit()
        {
            _dispatcher?.OnShutdown();
            _dispatcher = null;
            _instance = null;
        }
    }
}
```

## Godot Implementation (Ultra-Thin Adapter)

```csharp
namespace Luny.Godot
{
    using Godot;

    internal sealed partial class GodotLifecycleAdapter : Node
    {
        private static GodotLifecycleAdapter _instance;

        private IEngineLifecycleDispatcher _dispatcher;

        [System.Runtime.CompilerServices.ModuleInitializer]
        internal static void AutoInitialize()
        {
            // Deferred to first frame since Godot isn't ready yet
            Callable.From(() =>
            {
                if (_instance == null)
                {
                    _instance = new GodotLifecycleAdapter
                    {
                        Name = nameof(GodotLifecycleAdapter)
                    };
                    var root = Engine.GetMainLoop() as SceneTree;
                    root?.Root.CallDeferred(nameof(add_child), _instance);
                }
            }).CallDeferred();
        }

        public override void _Ready()
        {
            if (_instance != null)
            {
                EngineLifecycleDispatcher.ThrowDuplicateAdapterException(
                    nameof(GodotLifecycleAdapter),
                    _instance.Name,
                    _instance.GetInstanceId(),
                    Name,
                    GetInstanceId());
            }

            // Only responsibility: create EngineLifecycleDispatcher singleton
            _dispatcher = EngineLifecycleDispatcher.Instance;
        }

        // Only responsibility: forward Godot lifecycle to EngineLifecycleDispatcher
        public override void _Process(double delta) => _dispatcher.OnUpdate(delta);

        public override void _PhysicsProcess(double delta) => _dispatcher.OnFixedStep(delta);

        public override void _Notification(int what)
        {
            if (what == NotificationWMCloseRequest)
            {
                _dispatcher?.OnShutdown();
                _dispatcher = null;
                _instance = null;
            }
        }
    }
}
```
