# Engine Differences

## Overview

LunyScript provides a uniform API across game engines by abstracting their architectural differences. This document details how Godot, Unity, and Unreal differ structurally, and how LunyScript unifies them.

---

## Scene Graph Architecture

### Engine Comparisons

**Godot: Node Hierarchy (Contextual Components)**
```
Scene
└── RigidBody3D "Player"
    ├── CollisionShape3D (component-like child)
    ├── MeshInstance3D (component-like child)
    ├── Node: PlayerController.gd (script)
    └── Node3D "Weapon" (object-like child)
        └── MeshInstance3D (component-like child)
```

**Unity: GameObject + Components**
```
Scene
└── GameObject "Player"
    ├── Component: Transform
    ├── Component: Rigidbody
    ├── Component: PlayerController (script)
    └── GameObject "Weapon" (child)
        ├── Component: Transform
        └── Component: MeshRenderer
```

**Unreal: Actor + Components**
```
Level
└── Actor "Player"
    ├── Component: RootComponent (SceneComponent)
    │   └── Component: StaticMeshComponent
    │       └── Component: CapsuleComponent
    ├── Component: CharacterMovementComponent
    ├── Component: PlayerController (script/blueprint)
    └── Component: ChildActorComponent "Weapon"
        └── Actor reference with nested components
```

### Key Differences

| Aspect | Godot | Unity | Unreal |
|--------|-------|-------|--------|
| **Primary Structure** | Node hierarchy | GameObject + Components | Actor + Components |
| **Child Semantics** | Context-dependent (objects OR components) | Always sub-objects | Components or nested actors |
| **Script Attachment** | Node property | Component | Component or blueprint |
| **Transform** | Inherited from node type | Component | Component (SceneComponent) |

### Differences in Layman's Terms

Think of the grouping elements as folders and files in an Explorer/Finder tree view:

- **Godot** only has folders (Node 🧩). There are over 200 specialized folder types to make up for the lack of files.
- **Unity** has folders (GameObject) with files in them (MonoBehaviour 🧩). There is exactly one type of folder, with hundreds of file types available.
- **Unreal** has folders (Actor 🧩) with files in them (Component 🧩), which can have more nested files inside. There are dozens of folder types, hundreds of file types, and they cannot be freely mixed and matched.

The 🧩symbol denotes the types we write logic for. The above analogy also maps perfectly to the perceived complexity of each engine. 

- In Godot, we can attach a single GDScript to each folder.
- In Unity, we can attach multiple MonoBehaviour scripts or built-in components to each folder.
- In Unreal, we have to subclass the 'correct' Actor type to create a folder. We then add files to the folder in a separate tree view. The files also need to inherit the 'correct' file type for the intended use.

Unreal Engine is significantly more challenging for new users due to the explosion of subclassing and arrangement choices. Each class has built-in use-cases and restrictions.

### LunyScript Unification

LunyScript treats all entities uniformly as **Objects** with **Behaviors**:

```csharp
// Works identically across all engines
When.Self.Spawns(
    Get.Child("Weapon").Transform.Position = Vector3.Up * 2
);

// Godot: Finds child node "Weapon"
// Unity: Finds child GameObject "Weapon"
// Unreal: Finds child component or actor "Weapon"
```

**Unified Hierarchy Model:**
```
Object "Player"
├── Behavior: LunyScript behaviors
├── Children: Nested objects
└── Properties: Transform, Physics, etc.
```

Adapters translate:
- Godot: Node → Object, Node children → Object.Children (contextually)
- Unity: GameObject → Object, MonoBehaviour → Behavior attachment point
- Unreal: Actor → Object, ActorComponent → Behavior attachment point

---

## Lifecycle Events

### Engine Comparisons

**Godot Lifecycle**
```
Constructor
    ↓
_init()         // Node initialization
    ↓
_ready()        // Scene tree ready (like Start)
    ↓
_enter_tree()   // Added to scene tree (can repeat)
    ↓
_process()      // Per-frame update
_physics_process()  // Physics timestep update
    ↓
_exit_tree()    // Removed from scene tree
    ↓
(Node destroyed when no references - no reliable destruction callback)
```

**Unity Lifecycle**
```
Awake           // Object initialization, called once
    ↓
OnEnable        // Called when enabled (can repeat)
    ↓
Start           // First frame initialization
    ↓
FixedUpdate     // Physics timestep update
Update          // Per-frame update
LateUpdate      // After all Updates
    ↓
OnDisable       // Called when disabled
    ↓
OnDestroy       // Cleanup before destruction
    ↓
(Object destroyed)
```

**Unreal Lifecycle**
```
Constructor
    ↓
PostInitializeComponents  // After all components initialized (used for Awake/_init purposes)
    ↓
BeginPlay       // When gameplay starts
    ↓
Tick            // Per-frame update (enacts all update types)
    ↓
EndPlay         // When gameplay ends or destroyed
    ↓
BeginDestroy    // Cleanup phase
    ↓
(Object destroyed)
```

### Lifecycle Comparison Table

| Phase | Godot                     | Unity             | Unreal |
|-------|---------------------------|-------------------|--------|
| **Construction** | _init()                   | N/A (discouraged) | Constructor |
| **Pre-Start Init** | N/A                       | Awake             | PostInitializeComponents |
| **Enable/Enter** | _enter_tree()             | OnEnable          | BeginPlay |
| **First Frame** | _ready()                  | Start             | BeginPlay |
| **Physics Step** | _physics_process()        | FixedUpdate       | Tick |
| **Per-Frame** | _process()                | Update            | Tick |
| **Late Update** | N/A                       | LateUpdate        | Tick |
| **Disable/Exit** | _exit_tree()              | OnDisable         | EndPlay |
| **Destruction** | N/A (unreliable) | OnDestroy         | EndPlay + BeginDestroy |

### Key Behavioral Differences

1. **Enable/Disable:**
   - Godot: _enter_tree/_exit_tree (scene tree membership, can repeat)
   - Unity: OnEnable/OnDisable (can be toggled, can repeat)
   - Unreal: BeginPlay/EndPlay (typically once per gameplay session)

2. **Destruction:**
   - Godot: No reliable destruction callback (garbage collected when no references)
   - Unity: OnDestroy called explicitly
   - Unreal: EndPlay (covers multiple scenarios), BeginDestroy (final cleanup)

3. **Update Phases:**
   - Godot: _process() and _physics_process() (no late update)
   - Unity: FixedUpdate (physics timestep), Update, LateUpdate (separate phases)
   - Unreal: Tick (enacts all update types in one callback)

### LunyScript Unified Lifecycle

```
OnAwake         // First setup (maps: Awake/_ready/PostInitializeComponents)
    ↓
OnEnable        // Object becomes active (maps: OnEnable/_enter_tree/BeginPlay)
    ↓
OnStep          // Physics timestep (maps: FixedUpdate/_physics_process/Tick)
OnUpdate        // Per-frame (maps: Update/_process/Tick)
OnLateUpdate    // After updates (maps: LateUpdate/custom/Tick)
    ↓
OnDisable       // Object becomes inactive (maps: OnDisable/_exit_tree/EndPlay)
    ↓
OnDestroy       // Cleanup (maps: OnDestroy/custom/BeginDestroy)
    ↓
(Cleaned up)
```

**Event Mapping:**

```csharp
// Unified lifecycle events (wrapped in When, not directly exposed)
When.Self.Awakes(/* first setup */);
When.Self.Enables(/* when activated */);
When.Self.Steps(/* physics timestep */);
When.Self.Updates(/* per frame */);
When.Self.LateUpdates(/* after updates */);
When.Self.Disables(/* when deactivated */);
When.Self.Destroys(/* final cleanup */);
```

> **Note:** Lifecycle events are wrapped in `When` and not directly exposed to LunyScript users. Developers using Luny abstractions may utilize them directly for advanced scenarios.

**Adapter Behavior:**

| LunyScript Event | Godot              | Unity | Unreal |
|------------------|--------------------|-------|--------|
| Awakes | _ready()           | Awake | PostInitializeComponents |
| Enables | _enter_tree()      | OnEnable | BeginPlay |
| Steps | _physics_process() | FixedUpdate | Tick |
| Updates | _process()         | Update | Tick |
| LateUpdates | **(added)**        | LateUpdate | Tick |
| Disables | _exit_tree()       | OnDisable | EndPlay |
| Destroys | **(added)**        | OnDestroy | BeginDestroy |

**Special Note: Godot Destruction**

Godot lacks explicit destruction callbacks. LunyScript raises its own `OnDestroy` event when:
- Nodes are freed via `queue_free()` or `free()`
- LunyScript detects node removal from scene tree before final cleanup
- Custom adapter hooks track node lifecycle

```csharp
// In Godot adapter - LunyScript raises destruction event
public override void _ExitTree() {
    if (_isBeingDestroyed) {
        SendDestroyEvent(this);
    }
}
```

**Special Note: Godot LateUpdate**

Godot does not have a native late update phase. LunyScript may add its own `OnLateUpdate` event for Godot to maintain cross-engine consistency.

---

## Summary

LunyScript unifies three seemingly very diverse and unique conceptual models. But as the proof of concept has shown, the differences are superficial on a technical level. They can be unified in a straightforward manner by mere mapping and re-ordering.

1. **Scene Graph:** Treats GameObjects/Nodes/Actors uniformly as Entities
2. **Lifecycle:** Maps diverse event systems to consistent Initialize→Enable→Update→Disable→Destroy flow
3. **API Complexity:** Favors editor-driven design over runtime parameter tweaking

This enables truly portable gameplay code without sacrificing engine-specific capabilities. The overhead is minimal but varies between engines depending on how well they match the uniform behaviour.

Under consideration: Configurability of Lifecycle event ordering. In many cases the precise order of events simply does not matter, not even across engines.

---

> **TO BE REVIEWED:** Technical accuracy verification needed, especially for Godot destruction handling and Unreal component hierarchy mapping.
