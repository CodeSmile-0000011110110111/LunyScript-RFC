# LunyScript `On.*` vs `When.*` API Refactor

> **Date**: 2026-02-05  
> **Status**: Design Complete - Ready for Technical Specification  
> **Related**: [Coroutine & Timer Design](./LunyScript_CoroutineAndTimer_Design.md)

## Overview

This document defines the semantic distinction between `On.*` and `When.*` event APIs in LunyScript. This refactor replaces the current `When.Self.*` pattern with a clearer, more intuitive model for beginners and designers.

## Core Distinction

| Prefix | Meaning | Scope |
|--------|---------|-------|
| **`On.*`** | Events about **object's own state** | Local to context object |
| **`When.*`** | Events from **external sources** | External/broadcast events |

### Mental Model
- **`On.*`** = "When **something about me** changes" (object's own events)
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

| Previous                  | NOW               | Rationale |
|---------------------------|-------------------|-----------|
| `When.Self.Updates()`     | ✅`On.FrameUpdate()`      | Clearer, matches "every frame" mental model |
| `When.Self.LateUpdates()` | ✅`On.FrameEnd()` | Much clearer than Unity's "LateUpdate" jargon |
| `When.Self.Steps()`       | ✅`On.Heartbeat()`  | Evocative of steady, rhythmic, predictable timing |


```csharp
// On.* scheme but Every.* would work nicely for these too
On.FrameUpdate(blocks); // every render frame (variable rate)
On.FrameEnd(blocks);    // after frame processing complete
On.Heartbeat(blocks);   // fixed interval (physics/logic rate)
```

### Why `On.Heartbeat()`?

| Name | Issue                                                         |
|------|---------------------------------------------------------------|
| `Step` | Step of what? Too vague                                       |
| `FixedStep` | "Fixed" begs explanation                                      |
| `LogicStep` | Implies only 'logic' runs here (physics too, but not input!!) |
| `Tick` | Often associated with frame-based updates, generic            |
| **`Heartbeat`** | ✅ Clear, evocative, universal metaphor for steady rhythm      |

## `When.*` API (External Events)

Events from external sources that the object listens to. The object doesn't cause these events; it reacts to them.

### Scene Events
```csharp
When.Scene().Loads(blocks);             // any scene loaded
When.Scene("Level1").Loads(blocks);     // specific scene loaded
When.Scene().Unloads(blocks);           // any scene unloaded
When.Scene("Level1").Unloads(blocks);   // specific scene unloaded
```

### Input Events (Future)
```csharp
When.Input("jump").Pressed(blocks);
When.Input("fire").Released(blocks);
When.Input(AnyKey).Pressed(blocks);     // where's the 'Any' key?
When.Input(AnyMouse).Pressed(blocks);
When.Input(LeftMouse).Pressed(blocks);  // alias: LMB
```

### Collision Events (Future)

```csharp
When.ContactWith("x")
    .Begins(blocks)
    .Stays(blocks)
    .Ends(blocks);
```

### UI Events (Future)
```csharp
When.Button("Start").Clicked(blocks);
When.Slider("Volume").Changes(blocks);
```

## Execution in Global Scope

LunyScript does not allow running events on a "global" scope from an object's script. This avoids many problems:

- Should global events run for a disabled object?
- Script instantiates multiple times => global behaviour runs multiple times
- Any object could affect global behaviour => potential source of confusion / bugs

The solution is simple and straightforward: User creates a separate object and script (perhaps named "Global") with controlled lifetime.

Alternatively, a singleton script can be created by overriding the `Singleton` property and returning true:
```
public class ManagersManagerManagingManagers : LunyScript
{
    // Return true to mark script as Singleton: 
    public override bool Singleton => true;
}
```

A singleton script:
- Instantiates on launch unconditionally
- Creates corresponding object/node automatically
- Object/Script instance become non-destroyable (attempt throws)

A singleton object is treated as follows in engines:
- **Godot**: added to tree root: `GetTree().Root.AddChild(scriptNode);`
- **Unity**: added to DDOL: `gameObject.DontDestroyOnLoad();`

## Migration from Current API

| Current (to deprecate) | New                        |
|------------------------|----------------------------|
| `When.Self.Created()` | `On.Created()`             |
| `When.Self.Enabled()` | `On.Enabled()`             |
| `When.Self.Ready()` | `On.Ready()`               |
| `When.Self.Disabled()` | `On.Disabled()`            |
| `When.Self.Destroyed()` | `On.Destroyed()`           |
| `When.Self.Updates()` | `On.FrameUpdate()`               |
| `When.Self.LateUpdates()` | `On.FrameEnd()`      |
| `When.Self.Steps()` | `On.Heartbeat()`           |
| `When.Scene.Loads()` | `When.Scene("").Loads()`   |
| `When.Scene.Unloads()` | `When.Scene("").Unloads()` |

## Integration with Timers & Coroutines

Timers and coroutines (see [Coroutine & Timer Design](./LunyScript_CoroutineAndTimer_Design.md)) integrate naturally with lifecycle events:

```csharp
var countdown = Coroutine("countdown").Duration(5).Seconds()
    .OnUpdate(Debug.Log("..."))
    .Elapsed(Debug.Log("done"));

On.Enabled(countdown.Start()); // restarts, instead of resume
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
    
    // Update
    public IScriptSequenceBlock FrameUpdate(params IScriptActionBlock[] blocks) => ...
    public IScriptSequenceBlock FrameEnd(params IScriptActionBlock[] blocks) => ...
    public IScriptSequenceBlock Heartbeat(params IScriptActionBlock[] blocks) => ...
}
```

## Summary

| Category | API | Examples                                              |
|----------|-----|-------------------------------------------------------|
| **Object lifecycle** | `On.*` | `On.Created()`, `On.Enabled()`, `On.Destroyed()`      |
| **Update loops** | `On.*` | `On.FrameUpdate()`, `On.FrameEnd()`, `On.Heartbeat()` |
| **Scene events** | `When.Scene.*` | `When.Scene.Loads()`, `When.Scene.Unloads()`          |
| **Input events** | `When.Input.*` | `When.Input.KeyPressed()` (future)                    |
| **Collision events** | `When.Collision.*` | `When.Collision.Entered()` (future)                   |
| **Global scope** | `On.Global.*` | `On.Global.FrameUpdate()`                                   |

This design provides:
- **Intuitive mental model**: "On" for self, "When" for world
- **Beginner-friendly naming**: `Heartbeat`, `FrameUpdate`, `FrameEnd`
- **Engine-agnostic terminology**: Avoids Unity/Godot jargon
- **Clear scoping**: Local vs Global explicitly separated
