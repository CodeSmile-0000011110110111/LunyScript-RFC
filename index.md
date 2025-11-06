---
layout: default
title: LunyScript - Cross-Engine Gameplay Scripting
---

# LunyScript - Cross-Engine Gameplay Scripting

> 🚧 **Status: Proof of Concept - Not Production Ready**
> LunyScript is currently in early research and design phase. The proof of concept demonstrates feasibility, but this is not yet ready for real projects.
> See [Roadmap](#roadmap) for development timeline and [LIMITATIONS.md](LIMITATIONS.md) for current scope and boundaries.

---

## Works the same in Unity, Godot, Unreal, ...

    When.Collision.With("ball")
        .Begins(Audio.Play("ball_tagged_loop"))
        .Ends(Spawn("sparkles").At(Other).Run(Wait.Seconds(2.5), Despawn()))

Different Engine: Same Behaviour<br/>
Different Language: Same Semantics

---

## This can't possibly work !!

It does! Here's the proof: same code, same game, runs in Unreal, Unity, and Godot.

[![LunyScript](media/LunyScript_Demo.gif)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")<br/>
**[Watch the full video on Youtube (1:20)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")**

A vertical slice from scratch in under 20 days. Started with Unity, then ported to Godot and Unreal in 3 days each.

### What's Currently Implemented (Proof of Concept)

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

**Scope:** High-level gameplay scripting - orchestrating game logic, behaviors, and interactions.

**Limitations:** See [LIMITATIONS.md](LIMITATIONS.md) for detailed scope boundaries. LunyScript is not a game engine API replacement.

## Screenshots

| Godot | Unity | Unreal |
|-------|-------|--------|
| ![PlayMode_Godot_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot_Editor.png) | ![PlayMode_Unity_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity_Editor.png) | ![PlayMode_Unreal_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal_Editor.png) |
| ![PlayMode_Godot.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot.png) | ![PlayMode_Unity.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity.png) | ![PlayMode_Unreal.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal.png) |

---

## But why?

**Visual tools like PlayMaker** ($65, >3.4k reviews, 20k favorites) prove there's massive demand for simplifying game logic — even among professionals.

But visual programming is verbose, painful to debug, refactor, version control, document. Yet it still requires imperative programming skills.

LunyScript gives you **high-level game logic as code** — readable, customizable, and runs across engines.

## Use Cases

**For Learners & Educators (PRIMARY AUDIENCE)**
- Your skills and code transfer if you switch engines - feel at ease; can switch without starting from scratch
- Teach one curriculum across multiple engines - focus on game design patterns and tooling, not API memorization
- Lower barrier to entry: less boilerplate than native APIs, more productive than visual scripting, eases into imperative programming

**For Framework & Tool Developers** ([Share your pains/needs](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions))
- Build integrated cross-engine solutions, instead of engine-locked or engine-agnostic
- Leverage LunyScript's engine-agnostic abstractions to reach wider audiences, lower costs of distributed plugins

**For Multi-Engine Studios** ([Share your pains/needs](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions))
- Share gameplay code across projects built with different engines
- Staff and planning become more flexible, with faster onboarding

**For Everyone**
- Write behavior, not plumbing - less boilerplate, more intent
- Insurance against engine ecosystem lock-in, easier to jump ship

## Roadmap

- **Phase 1:** Unity Implementation; API Design; Portable Layer; Demos and Docs (6 months => Q1/Q2 2026)
- **Phase 2:** Port to Godot w/ Demos; Cross-Engine Verification Tests; Polish Onboarding (6 months => Q3/Q4 2026)
- **Phase 3:** Promote to Learners/Educators; Stabilize Architecture & Behaviour Contracts (4 months = Q1 2027)

### **Long-Term**

- Foster contributions, invite FOSS engines
- Encourage autonomous maintainers of Engine Adapter (they know 'their' engine best)
- Support Cross-Engine Framework (CEF) developers adopting _Luny_ (cross-engine abstraction layer)

**Maintenance:** See [MAINTENANCE.md](MAINTENANCE.md) for the long-term sustainability strategy and how engine adapters are maintained.

---

## Why Not Just...?

**Q: Why not just learn the engine API properly?**
A: LunyScript doesn't replace engine knowledge - it's for **gameplay scripting**, makes code read with intent, and significantly reduces boilerplate. You still need to understand engine fundamentals, but your gameplay code and skills become portable. Perfect for learners who might switch engines, educators teaching multiple platforms, or teams working across engines.

**Q: Why not a general purpose framework, like Rx.NET?**
A: General purpose frameworks are too abstract for beginners. They are loaded with CS jargon and concepts. LunyScript provides **high-level, fluent gameplay APIs** that read like game design intent. See the [FAQ](FAQ.md) for direct code comparison.

**Q: Why not write your own game engine (perhaps based on SDL)?**
A: LunyScript is for ease of entry and productivity in pro-tier game engines. Creating a custom "Luny" game engine would defeat the purpose and only add to engine fragmentation. 

**Q: Why not just use visual scripting?**
A: Visual scripting tools (PlayMaker, Blueprints, etc.) are a great choice for many non-programmers. But they are currently the ONLY choice they have! Visual tools are verbose and space inefficient, even simple logic requires a high degree of UI interaction. They are painful to version control, code review, refactor, and document. LunyScript provides the same **high-level expressiveness** with all the benefits of text-based code and supporting IDEs.

---

# Join the Discussion!

**Share your thoughts, ask questions, propose ideas!**

[Join the Discussions](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/)
to help shape the future of cross-engine software development!

Luny: Adding value to multiple engines on an equal footing.

---

# Proof of Concept

## Repositories

| Godot | Unity | Unreal |
|-------|-------|--------|
| [Godot PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Godot) | [Unity PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Unity) | [Unreal PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Unreal) |

### PoC Example Source Code

Note: API in Proof of Concept represents an early first draft. Final API will differ in key aspects.

- [PoliceCarScratch.cs](2025-10_Proof_Of_Concept_Demo/PoliceCarScratch.cs)
- [CompanionCubeScratch.cs](2025-10_Proof_Of_Concept_Demo/CompanionCubeScratch.cs)
- [HitEffectScratch.cs](2025-10_Proof_Of_Concept_Demo/HitEffectScratch.cs)

---

## Questions?

**Check out the [Frequently Asked Questions (FAQ)](FAQ.md)**

Then [koin the discussion!](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/)
