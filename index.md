---
layout: default
title: LunyScript - Cross-Engine Gameplay Scripting
---

# LunyScript - Training Wheels for Game Engines

## **Code That Reads Out Loud:**
```csharp
When.Collision.With("ball")
    .Begins(Audio.Play("ball_tagged_loop"))
    .Ends(Spawn("sparkles").At(Other).Run(Wait.Seconds(2.5), Despawn()));
```

The fluent and powerful alternative to visual scripting. 

## What if .. 
### .. programming Unity and Godot were easier than Roblox?

Code reads like intent. Simple to extend: one method at a time. No event registration. No coroutine yielding. No async await anything. Just plain script, but in C#.

### And it were powerful enough to create _Megabonk_?

With accessible Statemachines and Behaviour Trees, but without the CS jargon: `Run.Together` instead of `Parallel`. You won't even miss a visual editor.

## What if ..
### .. all game engines shared the same programming interface?

LunyScript uniformly maps the high-level gameplay features all game engines have in common: Input, Physics, Assets, Audio, Scene Graph, and many more. One API to rule them all.

### And code did the same in Unity and Godot?

Assets already transfer, now code has wider reach, too.  Already Pro? Build more valuable cross-engine logic libraries and coding tutorials.

## What if ..
### .. it were free, and open source?

It is.

---

## This can't possibly work!!

It does! Here's the proof: same code, same game, runs in Unreal, Unity, and Godot.

[![LunyScript Demo](media/LunyScript_Demo.gif)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")

**[Watch the full video on YouTube (1:20)](https://youtu.be/Vn38VLNDsuw)**

Vertical slice from scratch in under 20 days.

> 🚧 **Status: Proof of Concept** - Not production ready. See [Roadmap](#roadmap) for timeline.
> 📸 [View detailed PoC documentation, screenshots, and source code →](PoC_2025-10/)

---

## Who This Is For

**🎓 Self-Learners & Hobbyists** - Explore all engines without learning three APIs. Your skills transfer. Perfect for Roblox creators wanting to "graduate" to pro engines. [Learn more →](docs/TargetAudience.md#self-learners--hobbyists-primary-audience)

**📹 Tutorial Creators** - Teach ONE API that works everywhere. 3x the reach, 1/3 the work. Create side-by-side engine comparison content while your code examples work in both. [Learn more →](docs/TargetAudience.md#tutorial-creators--learnfluencers-high-impact)

**🏫 Educators** - One code curriculum across multiple engines. Students focus on design and workflows, not API memorization. [Learn more →](docs/TargetAudience.md#formal-educators--institutions)

**🔧 Framework Developers** - Build cross-engine dialogue/quest/inventory systems once, deploy everywhere. [Learn more →](docs/TargetAudience.md#framework--tool-developers)

**→ [See full audience breakdown](docs/TargetAudience.md)**

---

## Roadmap

- **Phase 1:** Unity (C#); API Design; Portable Layer; Demos and Docs (6 months → Q1/Q2 2026)
- **Phase 2:** Godot (C#/GDScript); Cross-Engine Tests; Improve onboarding (6 months → Q3/Q4 2026)
- **Phase 3:** Promote to Self-Learners & Tutorial Creators; Stabilize (4 months → Q1 2027)

Implementation language is **C#** (most widely usable: Unity, Godot, Stride, Flax, Unigine, Evergine, CryEngine, Unreal via UnrealSharp).

**Long-term:** Foster contributions, invite FOSS engines, support cross-engine framework developers.

**→ [Maintenance strategy](MAINTENANCE.md)**

---

## Join the Discussion!

**Share your thoughts, ask questions, propose ideas!**

[💬 Join the Discussions](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/) • [📖 Documentation](https://codesmile-0000011110110111.github.io/LunyScript-RFC/docs/) • [❓ FAQ](FAQ.md)

Help shape the future of cross-engine, uniform game programming!

---
