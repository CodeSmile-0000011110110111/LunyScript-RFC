# Namespace Structure

## Overview

```
Luny/                           (Pure abstractions | Changes: Rare)
├── ICoroutineScheduler
├── IStateMachine
├── IBehaviorTree
├── IEventDispatcher
├── IObjectRegistry
└── Contracts/
    ├── ExecutionOrder
    └── LifecycleGuarantees

LunyScript/                     (Execution engine | Changes: Moderate)
├── When                        (Entry point for behaviors)
├── Audio
├── Spawn
├── Wait
├── Runtime/
│   ├── DefaultCoroutineScheduler
│   ├── DefaultStateMachine
│   ├── DefaultBehaviorTree
│   ├── ObjectRegistry
│   ├── EventDispatcher
│   └── FrameScheduler
└── Graph/
    ├── GraphProcessor
    ├── NodeEvaluator
    └── StateTracker

LunyScript.Unity/               (Unity adapter | Changes: Frequent)
├── UnityBootstrap
├── Observers/
│   ├── CollisionObserver
│   ├── InputObserver
│   └── LifecycleObserver
└── Wrappers/
    ├── UnityAudio
    ├── UnityPhysics
    └── UnitySceneGraph

LunyScript.Godot/               (Godot adapter | Changes: Frequent)
├── GodotBootstrap
├── Observers/
│   ├── CollisionObserver
│   ├── InputObserver
│   └── LifecycleObserver
└── Wrappers/
    ├── GodotAudio
    ├── GodotPhysics
    └── GodotSceneTree

LunyScript.Unreal/              (Unreal adapter | Changes: Frequent)
├── UnrealBootstrap
├── Observers/
│   ├── CollisionObserver
│   ├── InputObserver
│   └── LifecycleObserver
└── Wrappers/
    ├── UnrealAudio
    ├── UnrealPhysics
    └── UnrealWorld
```

## Size & Effort

**Portable Core (Luny + LunyScript):**
- Write once, use everywhere
- Complex design, stable implementation

**Each Engine Adapter:**
- One per engine
- Mostly straightforward bridging code
- Grows proportionally as API expands

Example: If portable core is 10,000 lines, each adapter is ~3,000-4,000 lines (largely automated).

## Usage Patterns

### End Users (Game Developers)
```csharp
using LunyScript;              // Main API
using LunyScript.Unity;        // Bootstrap only (in one startup file)

// Just write behaviors
When.Collision.With("ball")
    .Begins(Audio.Play("sound"));
```

### Implementers (Custom Schedulers/Extensions)
```csharp
using Luny;                    // Access abstractions
using LunyScript;              // Use existing runtime

// Implement custom behavior
class CustomScheduler : Luny.ICoroutineScheduler {
    public void Tick(float deltaTime) {
        // Custom scheduling logic
    }
}

// Configure at startup
LunyScript.Configure(scheduler: new CustomScheduler());
```

### Engine Adapter Developers
```csharp
using Luny;                    // Abstractions to implement
using LunyScript;              // Core runtime to integrate
using UnityEngine;             // Native engine APIs

// Bridge native events to Luny
class UnityCollisionObserver : MonoBehaviour {
    void OnCollisionEnter(Collision collision) {
        LunyScript.Runtime.EventDispatcher.Dispatch(
            new CollisionEvent(gameObject, collision.gameObject)
        );
    }
}
```

## Dependencies

```
Luny                 → (no dependencies)
    ↑
    |
LunyScript           → Luny
    ↑                  ↑
    |                  |
LunyScript.Unity ----→|
LunyScript.Godot ----→|
LunyScript.Unreal ---→|
```

## Repository Structure

Suggested organization:
```
/LunyScript-RFC/              (this repo - design docs)
/Luny/                        (abstractions - single repo)
/LunyScript/                  (core engine - single repo)
/LunyScript-Unity/            (Unity adapter)
/LunyScript-Godot/            (Godot adapter)
/LunyScript-Unreal/           (Unreal adapter)
/LunyScript-Examples/         (cross-engine examples)
```

Each adapter repo is independently maintained, can be community-driven.
