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
Timer("think").Every(5).Heartbeats().Do(Debug.Log("hmmm?"));
```

### Coroutine API

Timers are in fact coroutines:

```csharp
// Coroutine with just OnElapsed is equivalent to a Timer
// Timer.In(..) is an alias for this coroutine pattern:
Coroutine("Timer.In(2).Seconds().Do(blocks)")
    .Duration(2).Seconds()
    .Elapsed(blocks);     // runs once after duration

// Timer.Every(..) is an alias for this coroutine pattern:
Coroutine("Timer.Every(100).Hearbeats().Do(blocks)")
    .Duration(100).Heartbeats()
    .Heartbeat(blocks);   // runs for duration every heartbeat
```

Coroutines can run blocks conditionally, either on frame updates or fixed steps, or both:

```csharp
// Coroutines run while condition is true
Coroutine("conditional")
    .While(conditions)                       
    .Update(Debug.Log("processing..."))   // only while true
    .Heartbeat(Debug.Log("stepping...")); // only while true
```

Coroutine duration and conditions can be combined. Conditions only affect the "every" aspect of the Coroutine, while the OnElapsed() event executes unconditionally. 

```csharp
// Coroutine with tick and elapsed handlers, indentation for emphasis
Coroutine("countdown")
    .Duration(3).Seconds()      // run for 3s total
    .Elapsed(blocks)            // runs unconditionally after 3s
    .While(conditions)          // conditions
        .Update(blocks)         // only while conditions true
        .Heartbeat(blocks);     // only while conditions true
```

Coroutines can also execute unconditionally, which is similar to `On.Update(..)` but coroutines can be paused or stopped at any time (see next paragraph).

```csharp
// Coroutine with tick and elapsed handlers, unconditional
Coroutine("unconditional")
    .Update(blocks)       // runs on frame update
    .Heartbeat(blocks);   // runs on fixed step

    // elsewhere, in some other block
    If(conditions).Then(Coroutine("unconditional").Stop())
```

### Time-Sliced Execution

Coroutine execution can also be time-sliced with staggered execution (phase shifted) to perform load balancing:

```csharp
// Time-sliced coroutines adjust frequency of condition evaluation
// Processes the same conditions/blocks but in alternating frames
Coroutine("group 1")
    .While(sameConditions)
    .Every(2)               // every 2nd (heartbeat or update)
    .Frames(sameBlocks);    // runs in frames 0, 2, 4, 6, ..

Coroutine("group 2")
    .While(sameConditions)
    .Every(2)               // every 2nd (heartbeat or update)
    .DelayBy(1)             // start with +1 delay (offset) 
    .Frames(sameBlocks);    // runs in frames +1, 3, 5, 7, ..
```

Situation when to use this: Group consumes **12 ms** frame time total (conditions: 2 ms; blocks: 10 ms) => too much!

After change:
- Conditions still evaluate every frame => 2 ms
- 50% of blocks every frame => 5 ms
- Result: From 12 ms down to **7 ms**

If spread over 4 frames:
- Conditions: 2 ms
- 25% of blocks every frame => 2.5 ms
- Result: From 12 ms down to **4.5 ms** 

Drawback: Response time goes up. Quite commonly not an issue. For example: 100 units starting to move instantly in the same frame vs only 25% starting to move instantly, while the remaining three quarters each start to move delayed by 1, 2 and 3 frames.

Delayed reaction time may even be desirable for gameplay as it "simulates" a group's response time variability. For instance a large group of characters would no longer exhibit perfectly synchronized animations. In individual combat, an enemy would exhibit minimal variation of their attack/defense response times. This makes such situations feel more "human-like", less "robotic".

### Reference-Based Coroutine Control

```csharp
// Store reference for later control
var countdown = Coroutine("countdown")
    .Duration(007).Seconds()
    .Heartbeat(Debug.Log("tic-tic"))
    .Elapsed(Debug.Log("BOOM!"));

// Lifecycle control
On.Enabled(countdown.Start());
On.Disabled(countdown.Stop());

// Runtime control methods
countdown.Start();      // (re-)start the coroutine
countdown.Stop();       // stop and reset state
countdown.Pause();      // freeze at current time
countdown.Resume();     // continue from paused state

// Control Events
var countdown = Coroutine("countdown")
    .Duration(5).Seconds()
    .Started(startBlocks)       // runs right away
    .Paused(pauseBlocks)        // runs when paused (if running)
    .Resumed(resumeBlocks)      // runs when resumed (if paused)
    .Stopped(stopBlocks)        // runs when stopped (not on elapsed)
    .OnElapsed(elapsedBlocks);  // runs when elapsed (not on stop)

// Speed control affects when the OnElapsed event runs
// Note: Pause() is same as TimeScale(0)
countdown.TimeScale(0.5f);  // runs twice as long
countdown.TimeScale(0f);    // effectively paused
countdown.TimeScale(2f);    // ends in half the time

// Sorry, no going back in time: it would end the universe ...
countdown.TimeScale(-1f);   // Clamped to 0
```

#### Start/Stop/Pause/Resume Coroutine Behaviour

When a coroutine is **stopped**:
- Start => starts coroutine
- Stop => no effect
- Pause => no effect
- Resume => no effect

When a coroutine is **running**:
- Start => restart: stops and starts coroutine
- Stop => stops coroutine
- Pause => freezes coroutine updates, preserves state
- Resume => no effect

When a coroutine is **paused**:
- Start => restart: stops and starts coroutine (not paused)
- Stop => stops coroutine (resets paused state)
- Pause => no effect
- Resume => continues coroutine updates with last state 

The 'no effect' usages will be logged as warning when a corresponding debug flag is active. They may indicate flawed logic and order of operations issues.

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
Every(3).Frames(blocks);          // every 3rd frame
Every(Even).Frames(blocks);       // frames 2, 4, 6...

// fixed timesteps
Every(3).Heartbeats(blocks);      // every 3rd step
Every(Even).Heartbeats(blocks);   // steps 2, 4, 6, 8...
Every(Odd).Heartbeats(blocks);    // steps 1, 3, 5, 7...
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

| Feature | API                                                          |
|---------|--------------------------------------------------------------|
| One-shot timer | `Timer("x").In(n).Seconds().Do(blocks)`                      |
| Repeating timer | `Timer("x").Every(n).Seconds().Do(blocks)`                   |
| Coroutine with ticks | `Coroutine("x").Duration(n).Seconds().OnTick().OnElapsed()`  |
| Control | `.Start()`, `.Stop()`, `.Pause()`, `.Resume()`, `.Restart()` |
| Speed | `.TimeScale(factor)`                                         |
| Throttling | `Every(n).Heartbeats()`, `Every(Even).Frames()`         |
