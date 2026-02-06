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

Coroutines can run blocks conditionally on frame updates or fixed steps, or both:

```csharp
// Coroutines run while condition is true
Coroutine("conditional")
    .While(conditions)                       
    .Update(Debug.Log("processing..."))   // only while true
    .Heartbeat(Debug.Log("stepping...")); // only while true
```

Coroutine duration and conditions can be combined. Conditions only affect the "every" aspect of the Coroutine, while the OnElapsed() event executes unconditionally. 

```csharp
// Coroutine with tick and elapsed handlers, indented for emphasis
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

#### **Drawback**: Response time goes up 

Quite commonly not an issue though. 

**Example**: 100 units start to move instantly in the same frame vs only 25% move instantly, while the remaining three quarters each move delayed by 1, 2 and 3 frames.

#### This may be desirable

Delayed response time easily "simulates" human-like variance in group behaviour and individual situations. 

**Example**: A large group of characters no longer exhibit perfectly synchronized animations. In individual combat, an enemy could exhibit minimal timing variation of attack/defense stances.

### Reference-Based Coroutine Control

```csharp
// Store reference for later control
var countdown = Coroutine("bomb")
    .Duration(007).Seconds()
    .Heartbeat(Debug.Log("tic-tic"))
    .Elapsed(Debug.Log("BOOM!"));

// Lifecycle control: Coroutines pause while object is disabled, 
// and resume when object is re-enabled.
// This overrides resume by restarting the coroutine:
On.Enabled(countdown.Start());

// Runtime control methods
countdown.Start();      // start or restart the coroutine
countdown.Stop();       // stop and reset state
countdown.Pause();      // freeze at current time
countdown.Resume();     // continue from paused state

// Control Events (also available on Timer)
var countdown = Coroutine("..").Duration(5).Seconds()
    .Started(startBlocks)    // runs when (re-)started
    .Paused(pauseBlocks)     // runs when paused (if running)
    .Resumed(resumeBlocks)   // runs when resumed (if paused)
    .Stopped(stopBlocks)     // runs when stopped (not: elapsed)
    .Elapsed(elapsedBlocks); // runs when elapsed (not: stopped)
```

Speed control affects when the OnElapsed event runs:

```csharp
var x = Coroutine("x").Duration(3).Seconds();
x.TimeScale(0.5f);   // runs twice as long
x.TimeScale(2f);     // ends in half the time

// Pause() is same as TimeScale(0)
x.TimeScale(0f);     // paused, can also Resume()

// Sorry, no going back in time: it would end the universe ...
x.TimeScale(-1f);   // Clamped to 0
```

The TimeScale is exposed through the script execution context and can be used to affect block execution.

#### Start/Stop/Pause/Resume Coroutine Behaviour

When a coroutine is **stopped**:
- Start => starts coroutine
- Stop, Pause, Resume => _no effect_

When a coroutine is **running**:
- Start => re-starts coroutine (stop is implicit)
- Stop => stops coroutine
- Pause => freezes coroutine, preserves current time
- Resume => _no effect_

When a coroutine is **paused**:
- Start => re-starts coroutine (stop is implicit)
- Stop => stops coroutine
- Pause => _no effect_
- Resume => unfreezes coroutine, runs for remaining time

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
for (int i = 0; i < 10; i++)
    Timer($"spawn_{i}").In(2+i).Seconds().Do(spawn[i]);
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
// later, in some other block:
t.Stop()
```

## Time-Slicing with `Every`

Simplified coroutine aliases for executing logic every N frames or heartbeats:

```csharp
Every(3).Frames(blocks);          // every 3rd frame
Every(Even).Frames(blocks);       // frames 12, 14, 16...

// fixed timesteps
Every(3).Heartbeats(blocks);      // every 3rd step
Every(Even).Heartbeats(blocks);   // steps 12, 14, 16, 18...
Every(Odd).Heartbeats(blocks);    // steps 11, 13, 15, 17...
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
    void Started();
    void Stopped();
    void Paused();
    void Resumed();
    void TimeScale(Single scale);
}

interface IScriptCoroutineBlock : IScriptTimerBlock
{
    // Inherits all timer control
    // Coroutine has tick capability
}
```

## No `When.Timer()` / `When.Coroutine()` API

The self-contained Timer/Coroutine APIs (`.Do()`, `.OnTick()`, `.OnElapsed()`) supercede the previously mentioned `When.Timer("x").Elapsed()` patterns.

## Future Considerations

### TimeScale for Tweening
The `TimeScale()` API could support built-in tweening:

```csharp
// Future expansion for Timer & Coroutines
// Timer runs for 2 seconds
// Time scale accelerates for initial 25% of duration (0.5 seconds)
Timer.In(2).Seconds().TimeScale(Tween.EaseIn(.25));
// Time scale decelerates during last 10% of duration (0.2 seconds)
Timer.In(2).Seconds().TimeScale(Tween.EaseOut(.1));
```

Tweening guarantees the tween value isn't unintentionally pausing the timer/coroutine (timescale == 0) by clamping the tweened value away from 0 (small epsilon, configurable).

## Summary

| Feature         | API                                                  |
|-----------------|------------------------------------------------------|
| One-shot timer  | `Timer("x").In(n).Seconds().Do(..)`                  |
| Repeating timer | `Timer("x").Every(n).Seconds().Do(..)`               |
| Frame Coroutine | `Coroutine("x").Duration(n).Seconds().Update(..)`    |
| Step Coroutine  | `Coroutine("x").Duration(n).Seconds().Heartbeat(..)` |
| Control         | `.Start()`, `.Stop()`, `.Pause()`, `.Resume()`       |
| Speed           | `.TimeScale(factor)`                                 |
| Time-Slicing    | `Every(n).Heartbeats()`, `Every(Even).Frames()`      |
