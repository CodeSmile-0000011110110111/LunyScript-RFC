---
layout: default
title: LunyScript - Cross-Engine Gameplay Scripting
---

# LunyScript - Training Wheels for Game Engines

---

## **Code That Reads Out Loud:**
```csharp
When.Collision.With("ball")
    .Begins(Audio.Play("ball_tagged_loop"))
    .Ends(Spawn("sparkles").At(Other).Run(Wait.Seconds(2.5), Despawn()));
```

## **Works The Same Across Engines:**

[![LunyScript Demo](media/LunyScript_Demo.gif)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")

## **🎮 LunyScript 🎮**
The powerful and production-friendly alternative to visual scripting.

---

## What if .. 
### .. programming Unity and Godot were easier than Roblox?

Code reads like intent. Simple to extend: one method at a time. No event registration. No coroutine yielding. No async await anything. Just plain script, but in C#.

### And it were powerful enough to create _Megabonk_?

With accessible Statemachines and Behaviour Trees, but without the CS jargon: `Run.Together` instead of `Parallel`. You won't even miss a visual editor.

## What if ..
### .. all game engines shared the same programming interface?

LunyScript uniformly maps the high-level gameplay features all game engines have in common: Input, Physics, Assets, Audio, Scene Graph, and many more. One API to rule them all.

### And code behaved the same in Unity and Godot?

Assets already transfer, now code has wider reach, too.  Already Pro? Create more value: cross-engine libraries, coding tutorials, comparisons, ...

## What if ..
### .. it were free, and open source?

It is.

---

## This can't possibly work!!

It does! Here's proof: same code, same game, runs in Unreal, Unity, and Godot - in less than 20 days. **[=> Watch the full video on YouTube (1:20)](https://youtu.be/Vn38VLNDsuw)**

> 🚧 **Status: Proof of Concept**<br/>
> 📸 [View detailed PoC documentation, screenshots, and source code →](PoC_2025-10/)

**→ [How LunyScript unifies different engine architectures](docs/EngineDifferences.md)**<br/>
**→ [API design philosophy and principles](docs/Philosophy.md)**<br/>
**→ [FOSS-compliant AI-assisted development](AI-USAGE.md)**<br/>

---

## Who This Is For

**🎓 Self-Learners & Hobbyists** - Easier than Roblox scripting. Publish anywhere. [Learn more →](docs/TargetAudience.md#self-learners--hobbyists-primary-audience)

**📹 Learnfluencers** - Less coding, more teaching. Pit engines head-to-head. [Learn more →](docs/TargetAudience.md#tutorial-creators--learnfluencers-high-impact)

**🏫 Educators** - One curriculum, many engines. Focus on workflows, not semantics. [Learn more →](docs/TargetAudience.md#formal-educators--institutions)

**🎮 Prototypers** - Jam fast while writing reusable code. [Learn more →](docs/PrototypersAndGameJammers.md)

**🔧 Framework Developers** - Code for mankind, not engines. [Learn more →](docs/TargetAudience.md#framework--tool-developers)

**→ [See full audience breakdown](docs/TargetAudience.md)**

---

## Roadmap

- **Phase 1:** Unity (C#); API Design; Portable Layer; Demos and Docs (6 months → Q1/Q2 2026)
- **Phase 2:** Godot (C#); Cross-Engine Tests; Improve onboarding (6 months → Q3/Q4 2026)
- **Phase 3:** Promote to Self-Learners & Tutorial Creators; Stabilize (4 months → Q1 2027)

LunyScipt would also port easily to Stride, Flax, Unigine, Evergine, CryEngine, and UnrealSharp. Lua and GDScript support under consideration.

**→ [Maintenance strategy](MAINTENANCE.md)**

---

## Join the Discussion!

**Share your thoughts, ask questions, propose ideas!**

[💬 Join the Discussions](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/) • [📖 Documentation](https://codesmile-0000011110110111.github.io/LunyScript-RFC/docs/) • [❓ FAQ](FAQ.md)

Help shape the future of cross-engine, uniform game programming!

---
