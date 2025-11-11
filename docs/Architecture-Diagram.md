# LunyScript Architecture Diagram

This diagram illustrates the layered architecture of LunyScript, showing how portable game logic runs across multiple game engines.

## Architecture Overview

```mermaid
graph TB
    subgraph User["👤 Game Developer"]
        UserCode["Game Logic Code<br/>(Portable C#)"]
    end

    subgraph LunyScript["🎮 LunyScript Layer<br/><i>Write Once, Run Anywhere</i>"]
        FluentAPI["Fluent API<br/>When.Collision.With('Enemy').Begins(...)"]
        CoreLogic["Script Execution Engine<br/>• Coroutine Scheduler<br/>• State Machines<br/>• Behavior Trees<br/>• Event Dispatcher"]
    end

    subgraph Luny["⚙️ Luny Abstractions<br/><i>Pure Interfaces & Contracts</i>"]
        LunySpace[" "]
        Interfaces["Core Interfaces<br/>• ICoroutineScheduler<br/>• IStateMachine<br/>• IBehaviorTree<br/>• IEventDispatcher"]
        Contracts["Behavioral Contracts<br/>• Execution Order<br/>• Semantic Rules<br/>• Zero Engine Dependencies"]
    end

    subgraph EAL["🔧 Engine Abstraction Layer<br/><i>Luny.EAL</i>"]
        EALSpace[" "]
        EALInterfaces["Engine Interfaces<br/>• IPhysics<br/>• IAudio<br/>• ISceneGraph<br/>• IInput"]
        EALObservers["Event Observers<br/>• Collision<br/>• Input<br/>• Lifecycle"]
    end

    subgraph Adapters["🔌 Engine Adapters<br/><i>Platform-Specific Glue</i>"]
        UnityAdapter["Unity Adapter<br/>LunyScript.Unity"]
        GodotAdapter["Godot Adapter<br/>LunyScript.Godot"]
    end

    subgraph Engines["🎯 Game Engines"]
        Unity["Unity<br/>• MonoBehaviour<br/>• Physics<br/>• Audio"]
        Godot["Godot<br/>• Node System<br/>• Signals<br/>• Resources"]
    end

    UserCode -->|uses| FluentAPI
    FluentAPI -->|delegates to| CoreLogic
    CoreLogic -->|implements| Interfaces
    Interfaces -.->|defines contracts| Contracts

    CoreLogic -->|calls| EALInterfaces
    EALInterfaces -.->|observes| EALObservers

    EALInterfaces -->|via| UnityAdapter
    EALInterfaces -->|via| GodotAdapter

    UnityAdapter -->|integrates with| Unity
    GodotAdapter -->|integrates with| Godot

    classDef userLayer fill:#e1f5ff,stroke:#0077cc,stroke-width:2px,color:#2d3748
    classDef lunyScriptLayer fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#2d3748
    classDef lunyLayer fill:#fff3cd,stroke:#ffc107,stroke-width:2px,color:#2d3748
    classDef ealLayer fill:#ffe5cc,stroke:#ff8c00,stroke-width:2px,color:#2d3748
    classDef adapterLayer fill:#f8d7da,stroke:#dc3545,stroke-width:2px,color:#2d3748
    classDef engineLayer fill:#e2e3e5,stroke:#6c757d,stroke-width:2px,color:#2d3748
    classDef spacer fill:none,stroke:none,color:transparent

    class UserCode userLayer
    class FluentAPI,CoreLogic lunyScriptLayer
    class Interfaces,Contracts lunyLayer
    class EALInterfaces,EALObservers ealLayer
    class UnityAdapter,GodotAdapter adapterLayer
    class Unity,Godot engineLayer
    class LunySpace,EALSpace spacer
```

## Layer Descriptions

### 👤 Game Developer Layer
**What:** Your game logic written in C#, GDScript, or Lua
**Benefit:** Write once, deploy to multiple engines without changes

### 🎮 LunyScript Layer (Portable)
**What:** The main API you interact with - fluent, declarative, gameplay-focused
**Benefit:** Clean, readable code that expresses intent, not implementation
**Example:**
```csharp
When.Collision.With("Enemy").Begins(
    Audio.Play("hit"),
    DecrementVariable(health),
    If(IsVariableLessOrEqual(health, 0), EndGame())
);
```

### ⚙️ Luny Abstractions Layer (Foundation)
**What:** Pure interfaces and contracts with zero engine dependencies
**Benefit:** Enables custom implementations and ensures clean architecture
**Who uses it:** Advanced users extending LunyScript, not typical game developers

### 🔧 Engine Abstraction Layer (EAL)
**What:** Engine-agnostic interfaces for physics, audio, scene management, and input
**Benefit:** LunyScript code calls these interfaces, adapters implement them for each engine
**Examples:**
- **IPhysics:** Collision detection, raycasts, forces
- **IAudio:** Sound playback, 3D positioning
- **ISceneGraph:** Object hierarchy, spawning, destruction
- **IInput:** Keyboard, mouse, gamepad input

### 🔌 Engine Adapter Layer (Glue)
**What:** Platform-specific bindings that connect LunyScript to each engine
**Benefit:** Isolates engine differences, making porting straightforward
**Examples:**
- **Unity:** MonoBehaviour lifecycle, Component architecture
- **Godot:** Node system, Signals, Resources

### 🎯 Game Engine Layer
**What:** The actual game engines (Unity, Godot, etc.)
**Benefit:** Use the engine's native tools (editor, debugger, profiler) alongside LunyScript

## Key Benefits

### ✅ Portability
Same game logic runs on Unity and Godot (and future engines)

### ✅ Simplicity
Declarative API reduces boilerplate by 70-83% compared to native engine code

### ✅ Beginner-Friendly
No need to learn engine-specific patterns - focus on game logic

### ✅ Engine Freedom
Switch engines without rewriting gameplay code - avoid vendor lock-in

### ✅ Multi-Language Support
Write in C#, GDScript, or Lua - same API across all languages

## Technical Details

### Change Frequency by Layer

| Layer | Change Frequency | Why |
|-------|-----------------|-----|
| **Luny** | Low | Core abstractions rarely change once established |
| **LunyScript** | Medium | Grows with new features, core logic stable |
| **EAL** | Low-Medium | Engine interfaces evolve as LunyScript features expand |
| **Adapters** | High | Evolves with engine API changes |

### Performance Overhead

**Target:** <5% overhead compared to native engine code
**Strategy:** Static graph analysis, minimal runtime reflection, efficient event dispatching

### Supported Languages

- **C#** (Primary) - Full API support
- **GDScript** (Godot) - Via code generator
- **Lua** (Godot/other) - Via code generator

## Example: The Same Code, Multiple Engines

```csharp
// This exact code works in Unity and Godot
protected override void OnReady()
{
    var score = Variables.Set("Score", 0);
    HUD.BindVariable(score);

    When.Collision.With("Coin").Begins(
        IncrementVariable(score),
        Audio.Play("coin_pickup")
    );
}
```

**Unity:** Runs in MonoBehaviour
**Godot:** Runs in Node script

Same code, multiple engines, zero changes. 🎉

## Learn More

- [Architecture Details](Architecture.md)
- [Code Comparison](CodeComparison.md)
- [Philosophy](Philosophy.md)
- [Proof of Concept](../PoC_2025-10/)
