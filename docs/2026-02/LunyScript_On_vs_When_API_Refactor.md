# LunyScript `On.*` vs `When.*` API Refactor

> **Date**: 2026-02-05  
> **Status**: Design Complete - Ready for Technical Specification  
> **Related**: [Coroutine & Timer Design](./LunyScript_CoroutineAndTimer_Design.md)

## Overview

This document defines the semantic distinction between `On.*` and `When.*` event APIs in LunyScript. This refactor replaces the current `When.Self.*` pattern with a clearer, more intuitive model for beginners and designers.

## Core Distinction

| Prefix | Meaning | Scope |
|--------|---------|-------|
| **`On.*`** | Events about **this object's own lifecycle/state** | Local to context object |
| **`When.*`** | Events from **external sources** this object listens to | External/broadcast events |

### Mental Model
- **`On.*`** = "When **I** do something" (object's own events)
- **`When.*`** = "When **something happens** in the world" (external events)

## `On.*` API (Object Lifecycle Events)

Events concerning the object itself. Uses **singular form** (matches engine convention, reads naturally: "On enable, do...").

### Lifecycle Events

```csharp
On.Created(blocks);     // once when object instantiated
On.Enabled(blocks);     // each time object becomes enabled
On.Ready(blocks);       // once before first frame/step processing
On.Disabled(blocks);    // each time object becomes disabled
On.Destroyed(blocks);   // once when object is destroyed
```

### Update Events (Proposed Naming)

| Current | Proposed | Rationale |
|---------|----------|-----------|
| `When.Self.Updates()` | `On.Frame()` | Clearer, matches "every frame" mental model |
| `When.Self.LateUpdates()` | `On.EndOfFrame()` | Much clearer than Unity's "LateUpdate" jargon |
| `When.Self.Steps()` | `On.Heartbeat()` | Evocative of steady, rhythmic, predictable timing |

```csharp
On.Frame(blocks);        // every render frame (variable rate)
On.EndOfFrame(blocks);   // after frame processing complete
On.Heartbeat(blocks);    // fixed interval (physics/logic rate)
```

### Why `On.Heartbeat()`?

| Name | Issue                                                         |
|------|---------------------------------------------------------------|
| `On.Step()` | Step of what? Too vague                                       |
| `On.FixedStep()` | "Fixed" begs explanation                                      |
| `On.LogicStep()` | Implies only 'logic' runs here (physics too! but not input!!) |
| `On.Tick()` | Often associated with frame-based updates, generic            |
| **`On.Heartbeat()`** | ✅ Clear, evocative, universal metaphor for steady rhythm      |

## `When.*` API (External Events)

Events from external sources that the object listens to. The object doesn't cause these events; it reacts to them.

### Scene Events
```csharp
When.Scene.Loads(blocks);              // any scene loaded
When.Scene.Loads("Level1", blocks);    // specific scene loaded
When.Scene.Unloads(blocks);            // any scene unloaded
When.Scene.Unloads("Level1", blocks);  // specific scene unloaded
```

### Input Events (Future)
```csharp
When.Input.KeyPressed("space", blocks);
When.Input.KeyReleased("space", blocks);
When.Input.MouseClicked(blocks);
```

### Collision Events (Future)
API naming tbd ...

```csharp
When.ContactWith("x").Begins(blocks);
When.ContactWith("x").Stays(blocks);
When.ContactWith("x").Ends(blocks);
```

### UI Events (Future)
```csharp
When.Button("Start").Clicked(blocks);
When.Slider("Volume").Changes(blocks);
```

## Global Scope

**PRELIMINARY**: For events that should run even when the object is disabled, use explicit `Global` scope:

```csharp
// Runs even when object disabled
On.Global.Frame(blocks);
On.Global.Heartbeat(blocks);

// Or via When for external events
When.Global.Scene.Loads(blocks);
```

**Note**: Global scope is explicit. Default `On.*` events only fire while the object is enabled.

## Migration from Current API

| Current (to deprecate) | New |
|------------------------|-----|
| `When.Self.Created()` | `On.Created()` |
| `When.Self.Enabled()` | `On.Enabled()` |
| `When.Self.Ready()` | `On.Ready()` |
| `When.Self.Disabled()` | `On.Disabled()` |
| `When.Self.Destroyed()` | `On.Destroyed()` |
| `When.Self.Updates()` | `On.Frame()` |
| `When.Self.LateUpdates()` | `On.EndOfFrame()` |
| `When.Self.Steps()` | `On.Heartbeat()` |
| `When.Scene.Loads()` | `When.Scene.Loads()` (unchanged) |
| `When.Scene.Unloads()` | `When.Scene.Unloads()` (unchanged) |

## Integration with Timers & Coroutines

Timers and coroutines (see [Coroutine & Timer Design](./LunyScript_CoroutineAndTimer_Design.md)) integrate naturally with lifecycle events:

```csharp
var countdown = Coroutine("countdown").Duration(5).Seconds()
    .OnTick(Debug.Log("..."))
    .OnElapsed(Debug.Log("done"));

On.Enabled(countdown.Start());
On.Disabled(countdown.Stop());
```

## Implementation Notes

### `OnApi` Structure

```csharp
public readonly struct OnApi
{
    private readonly ILunyScript _script;
    internal OnApi(ILunyScript script) => _script = script;
    
    // Lifecycle
    public IScriptSequenceBlock Created(params IScriptActionBlock[] blocks) => ...
    public IScriptSequenceBlock Enabled(params IScriptActionBlock[] blocks) => ...
    public IScriptSequenceBlock Ready(params IScriptActionBlock[] blocks) => ...
    public IScriptSequenceBlock Disabled(params IScriptActionBlock[] blocks) => ...
    public IScriptSequenceBlock Destroyed(params IScriptActionBlock[] blocks) => ...
    
    // Update (proposed names)
    public IScriptSequenceBlock Frame(params IScriptActionBlock[] blocks) => ...
    public IScriptSequenceBlock EndOfFrame(params IScriptActionBlock[] blocks) => ...
    public IScriptSequenceBlock Heartbeat(params IScriptActionBlock[] blocks) => ...
    
    // Global scope accessor
    public OnGlobalApi Global => new(_script);
}
```

### `LunyScript` Base Class Addition

```csharp
public abstract class LunyScript : ILunyScript, ILunyScriptInternal
{
    // New
    public OnApi On => new(this);
    
    // Keep for external events
    public WhenApi When => new(this);
    
    // ...existing members...
}
```

## Event Mapping

| API Method | LunyObjectEvent Enum |
|------------|---------------------|
| `On.Created()` | `LunyObjectEvent.OnCreate` |
| `On.Enabled()` | `LunyObjectEvent.OnEnable` |
| `On.Ready()` | `LunyObjectEvent.OnReady` |
| `On.Disabled()` | `LunyObjectEvent.OnDisable` |
| `On.Destroyed()` | `LunyObjectEvent.OnDestroy` |
| `On.Frame()` | `LunyObjectEvent.OnUpdate` |
| `On.EndOfFrame()` | `LunyObjectEvent.OnLateUpdate` |
| `On.Heartbeat()` | `LunyObjectEvent.OnFixedStep` |

## Summary

| Category | API | Examples |
|----------|-----|----------|
| **Object lifecycle** | `On.*` | `On.Created()`, `On.Enabled()`, `On.Destroyed()` |
| **Update loops** | `On.*` | `On.Frame()`, `On.EndOfFrame()`, `On.Heartbeat()` |
| **Scene events** | `When.Scene.*` | `When.Scene.Loads()`, `When.Scene.Unloads()` |
| **Input events** | `When.Input.*` | `When.Input.KeyPressed()` (future) |
| **Collision events** | `When.Collision.*` | `When.Collision.Entered()` (future) |
| **Global scope** | `On.Global.*` | `On.Global.Frame()` |

This design provides:
- **Intuitive mental model**: "On" for self, "When" for world
- **Beginner-friendly naming**: `Heartbeat`, `Frame`, `EndOfFrame`
- **Engine-agnostic terminology**: Avoids Unity/Godot jargon
- **Clear scoping**: Local vs Global explicitly separated
