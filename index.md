---
layout: default
title: LunyScript - Cross-Engine Gameplay Scripting
---

# LunyScript - Cross-Engine Gameplay Scripting

## Works the same in Unity, Godot, Unreal, ...

    When.Collision.With("ball")
        .Begins(Audio.Play("ball_tagged_loop"))
        .Ends(Spawn("sparkles").At(Other).Run(Wait.Seconds(2.5), Despawn()))

Different engine, different language - same behaviour, same semantics!

---

## This can't possibly work !!

It does! Here's the proof: same code, same game, runs in Unreal, Unity, and Godot.

[![LunyScript](media/LunyScript_Demo.gif)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")<br/>
**[Watch the full video on Youtube (1:20)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")**

A vertical slice from scratch in under 20 days. Started with Unity, then ported to Godot and Unreal in 3 days each.

The proof of concept shows that LunyScript can exercise all relevant game systems across engines:
- Input, Physics, Collision, Assets, Scene Graph, UI, Variables, Audio

## Screenshots

| Godot | Unity | Unreal |
|-------|-------|--------|
| ![PlayMode_Godot_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot_Editor.png) | ![PlayMode_Unity_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity_Editor.png) | ![PlayMode_Unreal_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal_Editor.png) |
| ![PlayMode_Godot.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot.png) | ![PlayMode_Unity.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity.png) | ![PlayMode_Unreal.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal.png) |

---

## But why?

**Visual tools like PlayMaker** ($65, >3.4k reviews, 20k favorites) prove there's massive demand for simplifying game logic — even among professionals.

But visual programming is painful to debug and refactor, hard to document and collaborate on - yet still requiring imperative programming skills.

LunyScript gives you **high-level game logic as code at near-native performance** — readable, customizable, and runs across engines.

## Use Cases

- **For learners:** Your hard-earned skills **AND** code transfer if you switch engines. No more restarting from scratch.
- **For multi-engine studios:** Teams don't fragment along engine-specific roles **AND** code works across projects.
- **For everyone:** Less boilerplate, more intent. Write behavior, not plumbing. Build reusable libraries.

## Benefits

- **Impress with results:** Less code and fewer errors than with conventional or visual programming.
- **Teach to larger audiences:** Teach horizontally across engines with a single code curriculum.
- **Decrease engine lock-in:** Take your assets **and your code** with you. Build long-lasting behaviour libraries.
- **Wider reach, lower costs:** Multi-engine frameworks and plugins can build on LunyScript's abstractions.

## Roadmap

- **Phase 1:** Unity Implementation; API Design; Portable Layer; Demos and Docs (6 months => Q1/Q2 2026)
- **Phase 2:** Port to Godot w/ Demos; Cross-Engine Verification Tests; Polish Onboarding (6 months => Q3/Q4 2026)
- **Phase 3:** Promote to Learners/Educators; Stabilize Architecture & Behaviour Contracts (4 months = Q1 2027)

### **Long-Term**

- Foster contributions, invite FOSS engines
- Encourage autonomous maintainers of Engine Adapter (they know 'their' engine best)
- Support Cross-Engine Framework (CEF) developers adopting _Luny_ (cross-engine abstraction layer)

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
