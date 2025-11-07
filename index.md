---
layout: default
title: LunyScript - Cross-Engine Gameplay Scripting
---

# LunyScript - Training Wheels for Game Engines 

## It works the same in Unity, Godot, Unreal, ...

    When.Collision.With("ball")
        .Begins(Audio.Play("ball_tagged_loop"))
        .Ends(Spawn("sparkles").At(Other).Run(Wait.Seconds(2.5), Despawn()))

Different Engine: Same Behaviour -- Different Language: Same Semantics

For Learners and Designers. A viable alternative for Visual Scripting.

---

## This can't possibly work !!

It does! Here's the proof: same code, same game, runs in Unreal, Unity, and Godot.

[![LunyScript](media/LunyScript_Demo.gif)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")<br/>
**[Watch the full video on Youtube (1:20)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")**

A vertical slice from scratch in under 20 days. Started with Unity, then ported to Godot and Unreal in 3 days each.

### What's Currently Implemented

> 🚧 **Status: Proof of Concept - Not Production Ready**
> LunyScript is currently in early research and design phase. The proof of concept demonstrates feasibility, but this is not ready for education / real projects.
> See [Roadmap](#roadmap) for development timeline and [LIMITATIONS.md](LIMITATIONS.md) for current scope and boundaries.

The PoC demonstrates LunyScript orchestrating essential gameplay systems across all three engines:

| System | Features Demonstrated |
|--------|---------------------|
| **Input** | Keyboard input detection |
| **Physics** | Rigidbody movement, forces, velocity control |
| **Collision** | Collision detection events, collision filtering |
| **Assets** | prefab addressing, instantiation |
| **Scene Graph** | Object create/destroy, find children by name, transform |
| **UI** | Text display, Variable binding, Button press events |
| **Variables** | game state and progression, timer & score |
| **Audio** | Sound effect playback |

**Scope:** High-level gameplay scripting - orchestrating game logic, behaviors, and interactions. LunyScript is **not** a game engine API replacement.

## Screenshots

| Godot | Unity | Unreal |
|-------|-------|--------|
| ![PlayMode_Godot_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot_Editor.png) | ![PlayMode_Unity_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity_Editor.png) | ![PlayMode_Unreal_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal_Editor.png) |
| ![PlayMode_Godot.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot.png) | ![PlayMode_Unity.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity.png) | ![PlayMode_Unreal.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal.png) |

---

## But why?

**Visual tools like PlayMaker** ($65, >3.4k reviews, 20k favorites) and Blueprints prove there's massive demand for simplifying game logic — even among professionals.

But visual programming is verbose, painful to debug, refactor, version control, document. Yet it still requires imperative programming skills.

LunyScript gives you **high-level game logic** — readable, customizable, and runs across engines. With all benefits of text-based editing and powerful IDEs.

## Who This Is For

### 🎓 Self-Learners & Hobbyists (PRIMARY AUDIENCE)

Want to explore game engines without the frustration of learning completely different APIs? Anxious about betting on the wrong horse?

**With LunyScript:**
- **Try all engines** - Your programming skills and code transfer completely
- **Fast results** - Less boilerplate, more game-making
- **Your own pace** - Start simple, grow into native APIs when ready
- **No regrets** - Switch engines without losing your hard-earned code knowledge
- **AI learning** - AI output you can actually understand and learn from

Perfect for Roblox creators wanting to "graduate" to pro engines, and anyone exploring which engine is the best fit.

### 📹 Tutorial Creators & "Learnfluencers" (HIGH IMPACT)

Stop making essentially the same tutorial and video three times. **Teach ONE API that works everywhere.** Teach gameplay patterns and have fun creating!

**With LunyScript:**
- **Reach all learners** - Unity **and** Godot audiences in one tutorial
- **Comparisons** - Show workflows side-by-side, help users decide and transition
- **AI-friendly teaching** - Fewer engine-specific and engine-version gotchas
- **Future-proof** - Your code curriculum doesn't break when engines update

If you teach game development on YouTube et al, LunyScript multiplies your reach while cutting your workload.

### 🏫 Formal Educators & Institutions

Teach **engine concepts** and **game design patterns**, not API memorization.

**With LunyScript:**
- One code curriculum across multiple engines
- Students compare editor workflows and choose tools, not languages
- Focus learning on design and workflows instead of API semantics
- Less confusion when switching engines mid-curriculum or with specializations
- Students graduate with transferable skills, not vendor lock-in

### 🔧 Framework & Tool Developers

([Share your needs](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions))

Build **cross-engine solutions** instead of maintaining three separate plugins or compromising with fully engine-agnostic frameworks that can't leverage engine features.

**The Problem Today:**
- Systems for Dialogue, Quest, Inventory, Stats, Behaviour Trees, Statemachines: re-invented everywhere
- Portable frameworks lack engine integration, are challenging to set up: limiting their application 
- Cross-Engine tools forced to write custom engine abstractions: [Articy](https://www.articy.com/en/articydraft/integration/), [Yarn Spinner](https://www.yarnspinner.dev/)

**With LunyScript:**
- Build once using LunyScript abstractions, deploy to Unity, Godot, ..
- Reach wider audiences with lower maintenance costs
- Leverage engine features through unified abstractions (audio, UI, animation, etc.)
- Simple API surface makes documentation clearer and AI code generation more reliable

### 🏢 Multi-Engine Studios

([Share your needs](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions))

**With LunyScript:**
- Share gameplay code across projects using different engines
- More flexible staffing - developers aren't siloed by engine expertise
- Faster onboarding when switching between engine-specific projects

---

## Who This Is NOT For

**❌ You DON'T need LunyScript if:**
- You're already productive in your chosen engine and don't plan to switch
- You work on the high-end (AAA titles, competitive multiplayer, complex simulations)
- You require bleeding-edge engine features from day 1

**LunyScript is a teaching tool and productivity layer for gameplay scripting, not a replacement for engine-native programming.**

## Roadmap

- **Phase 1:** **Unity** (C#/Lua); API Design; Portable Layer; Demos and Docs (6 months => Q1/Q2 2026)
- **Phase 2:** **Godot** (C#/GDS/Lua); Cross-Engine Verification Tests; Improve onboarding (6 months => Q3/Q4 2026)
- **Phase 3:** Promote to Self-Learners & Tutorial Creators; Stabilize Architecture & Behaviour Contracts (4 months = Q1 2027)

Implementation language is C# since it is most widely usable: Unity, Godot, Stride, Flax, Unigine, Evergine, CryEngine and Unreal (via UnrealSharp). Primarily C++ engines are less common: O3DE (has Lua), Unreal.  

### **Long-Term**

- Foster contributions, invite FOSS engines
- Encourage autonomous maintainers of Engine Adapter (they know 'their' engine best)
- Support Cross-Engine Framework (CEF) developers adopting _Luny_ (cross-engine abstraction layer)

**Maintenance:** See [MAINTENANCE.md](MAINTENANCE.md) for the long-term sustainability strategy and how engine adapters are maintained.

---

## Why Not Just...?

**Why not just learn the engine API properly?**

Programming game logic is hard enough. Learning three different ways to do the same thing in Unity, Godot, and Unreal makes it harder. **LunyScript removes that duplication.**

For learners, **gameplay scripting** is their immediate interest — fast results motivate learning. LunyScript helps ease into imperative programming and native engine APIs at their own pace. Early in the learning process, users can't assess which engine fits their goals best. LunyScript gives them flexibility to explore without costly restarts.

For tutorial creators, remaking content for each engine triples workload with no pedagogical benefit. LunyScript lets you teach **one** clear API that works everywhere.

**Why not a general purpose framework, like Rx.NET?**

General purpose frameworks are too abstract for beginners. They are loaded with CS jargon and concepts. LunyScript provides **high-level, fluent gameplay APIs** that read like game design intent. See the [FAQ](FAQ.md) for direct code comparison.

**Why not write your own game engine (perhaps based on SDL)?**

LunyScript is for ease of entry and productivity in pro-tier game engines, and perhaps contributes to popularizing emerging engines. Creating a custom "Luny" game engine would defeat those purposes. Currently, roughly 95% of Steam games published are made with Unity, Unreal, Godot, and proprietary engines. This is where the learning pains are felt most.

**Why not just use visual scripting?**

Visual scripting tools (PlayMaker, Blueprints, etc.) are a popular choice for many non-programmers. But they are currently the ONLY choice for users intimidated by conventional programming. Visual tools are criticized for being verbose and space inefficient, and require a high degree of UI interactions. They are painful to version control, code review, refactor, and document. LunyScript provides the same **high-level expressiveness and simplicity** with all the benefits of text-based code - a **viable alternative** for beginners & designers based on my own experience.

More Questions? See the [FAQ](FAQ.md) or:

# Join the Discussion!

**Share your thoughts, ask questions, propose ideas!**

[Join the Discussions](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/)
to help shape the future of cross-engine gameplay code and framework development!

---

# Proof of Concept

## Repositories

| Godot | Unity | Unreal |
|-------|-------|--------|
| [Godot PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Godot) | [Unity PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Unity) | [Unreal PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Unreal) |

## PoC Example Source Code

This is the script for the "Police Car" which acts as both player controller and overall game state.

⚠️ API in Proof of Concept represents an early first draft. Final API will differ in key aspects. And it isn't supposed to leak engine details. ⚠️

    using Godot;
    using LunyScratch;
    using System;
    using static LunyScratch.Blocks;
    using Key = LunyScratch.Key;
    
    public sealed partial class PoliceCarScratch : ScratchRigidbody3D
    {
        [Export] private Single _turnSpeed = 70f;
        [Export] private Single _moveSpeed = 16f;
        [Export] private Single _deceleration = 0.85f;
        [Export] private Int32 _startTimeInSeconds = 5;
    
        protected override void OnScratchReady()
        {
            var progressVar = GlobalVariables["Progress"];
            var scoreVariable = Variables.Set("Score", 0);
            var timeVariable = Variables.Set("Time", _startTimeInSeconds);
    
            // Handle UI State
            HUD.BindVariable(scoreVariable);
            HUD.BindVariable(timeVariable);
    
            Run(HideMenu(), ShowHUD());
            RepeatForever(If(IsKeyJustPressed(Key.Escape), ShowMenu()));
    
            // must run globally because we Disable() the car and thus all object sequences will stop updating
            Scratch.When(ButtonClicked("TryAgain"), ReloadCurrentScene());
            Scratch.When(ButtonClicked("Quit"), QuitApplication());
    
            // tick down time, and eventually game over
            RepeatForever(Wait(1), DecrementVariable("Time"),
                If(IsVariableLessOrEqual(timeVariable, 0),
                    ShowMenu(), SetCameraTrackingTarget(null), Wait(0.5), DisableComponent()));
    
            // Use RepeatForeverPhysics for physics-based movement
            var enableBrakeLights = Sequence(Enable("BrakeLight1"), Enable("BrakeLight2"));
            var disableBrakeLights = Sequence(Disable("BrakeLight1"), Disable("BrakeLight2"));
            RepeatForeverPhysics(
                // Forward/Backward movement
                If(IsKeyPressed(Key.W),
                        MoveForward(_moveSpeed), disableBrakeLights)
                    .Else(If(IsKeyPressed(Key.S),
                            MoveBackward(_moveSpeed), enableBrakeLights)
                        .Else(SlowDownMoving(_deceleration), disableBrakeLights)
                    ),
    
                // Steering
                If(IsCurrentSpeedGreater(0.1),
                    If(IsKeyPressed(Key.A), TurnLeft(_turnSpeed)),
                    If(IsKeyPressed(Key.D), TurnRight(_turnSpeed)))
            );
    
            // add score and time on ball collision
            When(CollisionEnter(tag: "CompanionCube"),
                IncrementVariable("Time"),
                // add 'power of three' times the progress to score
                SetVariable(Variables["temp"], progressVar),
                MultiplyVariable(Variables["temp"], progressVar),
                MultiplyVariable(Variables["temp"], progressVar),
                AddVariable(scoreVariable, Variables["temp"]));
    
            // blinking signal lights
            RepeatForever(
                Enable("RedLight"),
                Wait(0.16),
                Disable("RedLight"),
                Wait(0.12)
            );
            RepeatForever(
                Disable("BlueLight"),
                Wait(0.13),
                Enable("BlueLight"),
                Wait(0.17)
            );
    
            // Helpers
            // don't play minicube sound too often
            RepeatForever(DecrementVariable(GlobalVariables["MiniCubeSoundTimeout"]));
            // increment progress (score increment) every so often
            RepeatForever(IncrementVariable(progressVar), Wait(15), PlaySound());
        }
    }
