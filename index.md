---
layout: default
title: LunyScript - Cross-Engine Gameplay Scripting
---

# LunyScript - Training Wheels for Game Engines

## Works the same in Unity, Godot, Unreal, ...

```csharp
When.Collision.With("ball")
    .Begins(Audio.Play("ball_tagged_loop"))
    .Ends(Spawn("sparkles").At(Other).Run(Wait.Seconds(2.5), Despawn()))
```

**Different Engine: Same Behavior • Different Language: Same Semantics**

*For learners and designers. A viable alternative to visual scripting.*

---

## This can't possibly work!!

It does! Here's the proof: same code, same game, runs in Unreal, Unity, and Godot.

[![LunyScript Demo](media/LunyScript_Demo.gif)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")

**[Watch the full video on YouTube (1:20)](https://youtu.be/Vn38VLNDsuw)**

Vertical slice from scratch in under 20 days. Unity → Godot: 3 days. Godot → Unreal: 3 days.

> 🚧 **Status: Proof of Concept** - Not production ready. See [Roadmap](#roadmap) for timeline.
> 📸 [View detailed PoC documentation, screenshots, and source code →](PoC_2025-10/)

---

## Why LunyScript?

**Visual tools like PlayMaker** ($65, >3.4k reviews, 20k favorites) and Blueprints prove there's massive demand for simplifying game logic — even among professionals.

But visual programming is verbose, painful to debug, refactor, version control, document. Yet it still requires imperative programming skills.

**LunyScript gives you high-level game logic** — readable, customizable, runs across engines. With all benefits of text-based editing and powerful IDEs.

---

## Who This Is For

**🎓 Self-Learners & Hobbyists** - Explore all engines without learning three APIs. Your skills transfer. Perfect for Roblox creators wanting to "graduate" to pro engines. [Learn more →](docs/TargetAudience.md#self-learners--hobbyists-primary-audience)

**📹 Tutorial Creators** - Teach ONE API that works everywhere. 3x the reach, 1/3 the work. Create side-by-side engine comparison content while your code examples work in both. [Learn more →](docs/TargetAudience.md#tutorial-creators--learnfluencers-high-impact)

**🏫 Educators** - One code curriculum across multiple engines. Students focus on design and workflows, not API memorization. [Learn more →](docs/TargetAudience.md#formal-educators--institutions)

**🔧 Framework Developers** - Build cross-engine dialogue/quest/inventory systems once, deploy everywhere. [Learn more →](docs/TargetAudience.md#framework--tool-developers)

**→ [See full audience breakdown](docs/TargetAudience.md)**

---

## Quick Questions

**Why not just learn each engine properly?**
Programming game logic is hard enough. Learning three different ways to do the same thing makes it harder. LunyScript removes that duplication.

**Won't AI just solve this?**
AI works better with simple, consistent APIs. LunyScript gives learners reliable, understandable code instead of engine-specific gotchas.

**Isn't this just adding another standard?**
LunyScript is *training wheels* - it helps beginners get started and transition between engines. Not a competitor to native APIs.

**→ [Read full FAQ](FAQ.md)**

---

## Roadmap

- **Phase 1:** Unity (C#/Lua); API Design; Portable Layer; Demos and Docs (6 months → Q1/Q2 2026)
- **Phase 2:** Godot (C#/GDScript/Lua); Cross-Engine Tests; Improve onboarding (6 months → Q3/Q4 2026)
- **Phase 3:** Promote to Self-Learners & Tutorial Creators; Stabilize (4 months → Q1 2027)

Implementation language is **C#** (most widely usable: Unity, Godot, Stride, Flax, Unigine, Evergine, CryEngine, Unreal via UnrealSharp).

**Long-term:** Foster contributions, invite FOSS engines, support cross-engine framework developers.

**→ [Maintenance strategy](MAINTENANCE.md)**

---

## Join the Discussion!

**Share your thoughts, ask questions, propose ideas!**

[💬 Join the Discussions](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/) • [📖 Documentation](https://codesmile-0000011110110111.github.io/LunyScript-RFC/docs/) • [❓ FAQ](FAQ.md)

Help shape the future of cross-engine gameplay code and framework development!
