# Engine Differences

## Overview

LunyScript provides a uniform API across game engines by abstracting their architectural differences. This document details how Godot, Unity, and Unreal differ structurally, and how LunyScript unifies them.

---

## Scene Graph Architecture

### Engine Comparisons

**Godot: Node Hierarchy (Contextual Components)**
```
// a Node 'is a' component
Scene
└── RigidBody3D "Player"
    ├── CollisionShape3D
    ├── MeshInstance3D
    ├── Node: PlayerController.gd (script)
    └── Node3D "Weapon" (object-like child)
        └── MeshInstance3D
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

- **Godot** only has folders (Node🧩). There are over 200 specialized folder types to make up for the lack of files. **It's one unit of separation.**
- **Unity** has folders (GameObject) with files in them (MonoBehaviour🧩). There is one type of folder, with hundreds of file types available. **Matches Explorer.**
- **Unreal** has folders (Actor🧩) with files in them (Component🧩), which can have more nested files inside. There are dozens of folder types, hundreds of file types, and they cannot be freely mixed and matched. **It's a tree with branches.**

The 🧩symbol denotes the types we write logic for. The above analogy also maps perfectly to the perceived complexity of each engine. 

- In Godot, we can attach a single custom script to each folder. It is the most consistent system, but has intransparent dependencies.
- In Unity, we can attach multiple custom scripts or built-in components to each folder. It is the most flexible system, but learning to use it efficiently takes time.
- In Unreal, we have to subclass the 'correct' Actor type to create a folder. We then add files to the folder in a separate tree view. The files also need to inherit the 'correct' file type for the intended use. It is the least consistent, the least flexible system, but it makes up for it in visual presentation and readily available essential systems (eg character controllers).

Unreal Engine is significantly more challenging for new users due to the explosion of subclassing and arrangement choices. The PoC also relied on the UnrealSharp plugin for C# support - which is a non-standard setup. Unreal is therefore not a preferred target for LunyScript, but the PoC proofs that it would even work for the 'worst case' scenario.

### LunyScript Unification

LunyScript treats all entities uniformly as **Objects** with **Components**:

```csharp
// Works identically across all engines
When.Object.Spawns(
    Child("Weapon").Transform.Position = Vector3.Up * 2
);

// Godot: Finds child node "Weapon"
// Unity: Finds child GameObject "Weapon"
// Unreal: Finds child component or actor "Weapon"
```
The same works with types.
```csharp
// Works identically across all engines
When.CollisionWith("ball")
    .Begins(Log("touching ball"));

// Godot: Finds Rigidbody3D node for "ball" on current or child nodes
// Unity: Finds Rigidbody component on GameObject or children
// Unreal: Finds Rigidbody component on Actor or children
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

LunyScript generates its own object lifecycle events for best consistency. 
This sidelines any behavioural differences across engines.

```
OnCreate        // First setup (maps: Awake/_ready/PostInitializeComponents)
    ↓
OnEnable        // Object becomes active (maps: OnEnable/_enter_tree/BeginPlay)
    ↓
OnFixedStep     // Physics timestep (maps: FixedUpdate/_physics_process/Tick)
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
When.Created(/* first setup */);
When.Enabled(/* when activated */);
Every.FixedStep(/* physics timestep */);
Every.Frame(/* per frame */);
Every.FrameEnds(/* after updates */);
When.Disabled(/* when deactivated */);
When.Destroyed(/* final cleanup */);
```

> **Note:** Lifecycle events are wrapped in `When` and not directly exposed to LunyScript users. Developers using Luny abstractions may utilize them directly for advanced scenarios.

**Special Note: Destruction**

Godot lacks explicit destruction callbacks. LunyScript raises its own `OnDestroy` event when handled internally, or during scene unload.
If native scripting destroys the native engine object, the LunyScript object will stop working but won't throw exceptions.

**Special Note: Godot LateUpdate**

Godot does not have a native late update phase. LunyScript adds its own `OnLateUpdate` event for Godot to maintain cross-engine consistency.

---

## Summary

LunyScript unifies three seemingly very diverse and unique conceptual models. But as the proof of concept has shown, the differences are superficial on a technical level. They can be unified in a straightforward manner. 

1. **Scene Graph:** Treats GameObjects/Nodes/Actors uniformly as 'Objects'. Treats Godot Nodes as Components.
2. **Lifecycle:** Uses its own object lifecycle event systems for consistent Create→Enable→Update→Disable→Destroy flow.
3. **API Complexity:** Favors editor-driven design over runtime parameter tweaking.

This enables truly portable gameplay code without sacrificing engine-specific capabilities. The overhead is minimal but varies between engines depending on how well they match the uniform behaviour.
