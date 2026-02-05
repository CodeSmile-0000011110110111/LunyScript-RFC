# LunyScript Coroutine & Timer Design

> **Date**: 2026-02-05  
> **Status**: Design Complete - Ready for Technical Specification  
> **Related**: [On vs When API Refactor](./LunyScript_On_vs_When_API_Refactor.md)

## Overview

This document defines the API design for time-based execution in LunyScript: **Timers** (fire-once/repeating triggers) and **Coroutines** (duration-based execution with tick/elapsed events). These replace Unity's coroutine `yield return new WaitForSeconds()` pattern with a more beginner-friendly, declarative API.

## Core Concepts

### Timer vs Coroutine

| Concept | Purpose | Has Duration | Ticks While Running | Elapsed Event |
|---------|---------|--------------|---------------------|---------------|
| **Timer** | Fire-and-forget time trigger | ✅ | ❌ | ✅ |
| **Coroutine** | Duration with running state | ✅ | ✅ | ✅ |

A Timer is effectively syntactic sugar for a Coroutine without tick handlers.

### Naming Implies Behavior

```csharp
Timer("once").In(3).Seconds();       // one-shot implied by "In"
Timer("repeat").Every(3).Seconds();  // repeating implied by "Every"
```

## API Design

### Timer API

```csharp
// One-shot timer (fires once after delay)
Timer("alarm").In(5).Seconds().Do(Debug.Log("Time's up!"));
Timer("quick").In(500).Milliseconds().Do(blocks);
Timer("slow").In(2).Minutes().Do(blocks);

// Repeating timer
Timer("clock").Every(1).Seconds().Do(Debug.Log("tick"));
Timer("pulse").Every(100).Milliseconds().Do(blocks);
```

### Coroutine API

```csharp
// Coroutine with tick and elapsed handlers
Coroutine("countdown").Duration(3).Seconds()
    .OnTick(Debug.Log("counting..."))    // runs each step while active
    .OnElapsed(Debug.Log("GO!"));        // runs when duration completes

// Coroutine without OnTick (equivalent to Timer)
Coroutine("delayed").Duration(2).Seconds()
    .OnElapsed(Debug.Log("done"));
```

### Reference-Based Control

```csharp
// Store reference for later control
var countdown = Coroutine("countdown").Duration(5).Seconds()
    .OnTick(Debug.Log("..."))
    .OnElapsed(Debug.Log("done"));

// Lifecycle control
On.Enabled(countdown.Start());
On.Disabled(countdown.Stop());

// Runtime control methods
countdown.Start();      // begin/restart the coroutine
countdown.Stop();       // stop and reset
countdown.Pause();      // freeze at current elapsed time
countdown.Resume();     // continue from paused state
countdown.Restart();    // equivalent to Stop() + Start()

// Speed control (also enables pause via TimeScale(0))
countdown.TimeScale(0.5f);  // half speed
countdown.TimeScale(0f);    // effectively paused
countdown.TimeScale(2f);    // double speed
```

## Design Rules

### All Timers/Coroutines Must Be Named
```csharp
// ✅ Required
Timer("myTimer").In(3).Seconds().Do(blocks);

// ❌ Not allowed (no unnamed timers)
Timer().In(3).Seconds().Do(blocks);
```

**Rationale**: Names enable debugging, logging, and runtime lookup. Avoids backend complexity of generating unique names.

### Duplicate Names Are Errors
```csharp
Timer("x").In(3).Seconds().Do(blocks);
Timer("x").In(5).Seconds().Do(blocks);  // ❌ throws at Build() time
```

### Same Name = Same Instance (No Parallel Execution)
Calling `.Start()` on an already-running timer/coroutine **restarts** it from the beginning. This is predictable and prevents accidental parallel instances.

```csharp
// If user needs parallel timers, use unique names:
Timer($"spawn_{spawnId}").In(2).Seconds().Do(blocks);
```

### Method Order Is Enforced
Builder pattern with typed returns enforces logical order via IntelliSense:

```csharp
// ✅ Correct order
Timer("x").In(3).Seconds().Do(blocks);

// ❌ Won't compile (wrong order)
Timer("x").Seconds().In(3).Do(blocks);
```

### `.Do()` / `.OnTick()` / `.OnElapsed()` Are Terminal
These methods finalize the builder and register the timer/coroutine. They return the reference for optional storage.

```csharp
// Self-contained (no reference needed)
Timer("fire").In(3).Seconds().Do(blocks);

// Store reference for control
var t = Timer("control").In(3).Seconds().Do(blocks);
t.Stop();
```

## Step-Based Throttling

For executing logic every N fixed steps (aka heartbeat):

```csharp
Every(3).Steps(blocks);           // every 3rd step
Every(Even).Steps(blocks);        // steps 2, 4, 6, 8...
Every(Odd).Steps(blocks);         // steps 1, 3, 5, 7...

Every(3).Frames(blocks);          // every 3rd frame
Every(Even).Frames(blocks);       // frames 2, 4, 6...

// alternative Steps wording, under consideration..
Every(3).Heartbeats(blocks);      // every 3rd heartbeat
```

**Implementation**: `Even` and `Odd` are constants on `LunyScript` base class:
```csharp
protected const Int32 Odd = -1;
protected const Int32 Even = -2;
```

## Return Types

```csharp
interface IScriptTimerBlock : IScriptActionBlock
{
    void Start();
    void Stop();
    void Restart();
    void Pause();
    void Resume();
    void TimeScale(Single scale);
}

interface IScriptCoroutineBlock : IScriptTimerBlock
{
    // Inherits all timer control
    // Coroutine has tick capability
}
```

## No `When.Timer()` / `When.Coroutine()` API

The self-contained API (`.Do()`, `.OnTick()`, `.OnElapsed()`) covers all use cases. The separate `When.Timer("x").Elapsed()` pattern is **deferred** - can be added later if real need emerges.

## Future Considerations

### TimeScale for Tweening
The `TimeScale()` API could potentially support tweening:
```csharp
// Future expansion
countdown.TimeScale(Tween.EaseIn(0, 1, 2)); // accelerate over 2s
```

### Integration with On/When API
Timers and coroutines integrate with the refactored event API (see [On vs When API Refactor](./LunyScript_On_vs_When_API_Refactor.md)):
```csharp
On.Enabled(timer.Start());
On.Disabled(timer.Stop());
```

## Summary

| Feature | API |
|---------|-----|
| One-shot timer | `Timer("x").In(n).Seconds().Do(blocks)` |
| Repeating timer | `Timer("x").Every(n).Seconds().Do(blocks)` |
| Coroutine with ticks | `Coroutine("x").Duration(n).Seconds().OnTick().OnElapsed()` |
| Control | `.Start()`, `.Stop()`, `.Pause()`, `.Resume()`, `.Restart()` |
| Speed | `.TimeScale(factor)` |
| Throttling | `Every(n).Steps()`, `Every(Even).Frames()` |
