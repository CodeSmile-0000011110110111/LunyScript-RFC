---
layout: default
title: LunyScript - Cross-Engine Gameplay Scripting
---

# **🎮 LunyScript 🎮** for Unity<sup> Q2/26</sup> and Godot<sup> Q4/26</sup>

Restoring joy to game development: LunyScript is the powerful and user-friendly alternative to visual scripting.

---

## **Code That You Can Navigate**

```csharp
public MyPlayer()
{
    When.Collision.With("ball")
        .Begins(Audio.Play("energy_buildup"))
        .Ends(Spawn("sparkles"), Event.Send("kick").To("ball"));
}
```

Something missing? Extend these bite-sized blocks by writing C# extension methods.

**Game Over For Tutorial Hell!** 🤗

## **✨ Same Code - Any Engine ✨** 

LunyScript is beginner-friendly, high-level gameplay programming that **works uniformly across game engines**.

## **🤨 Any Engine?? Das Crazy! 🤯** 

Game engines all share the same fundamental features needed to create _Megabonk_.

[![LunyScript Demo](media/LunyScript_Demo.gif)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")

## 🧐This can't possibly work!!🤥

It does! It's not rocket science, just applied software design patterns. Made in 20 days.
**[=> Watch the full video on YouTube (1:20)](https://youtu.be/Vn38VLNDsuw)**

> 🚧 **Status: Proof of Concept**<br/>
> 📸 [View detailed PoC documentation, screenshots, and source code →](PoC_2025-10/)

**→ [How LunyScript unifies different engine architectures](docs/EngineDifferences.md)**<br/>
**→ [API design philosophy and principles](docs/Philosophy.md)**<br/>
**→ [Code comparison: LunyScript vs traditional approaches](docs/CodeComparison.md)**<br/>
**→ [FOSS-compliant AI-assisted development](AI-USAGE.md)**<br/>
_Note: Physics behaviour will deviate between physics engines, requires scaling values._

---

# But .. Why ??

It bothered me for a long time that we need to write so much boilerplate code for trivial tasks. Simple tasks should be simple! 

I thought it's a great thing to have so many entry-level tutorials for self-learners.
But then I realized how rampant tutorial hell is among self-learners. 
And how influencers are damaging coding skills, favoring quick wins through teaching bad practices.

I began asking heretic questions ...

## **<font color="#ee2255">What if ..</font>❓**
### .. programming Unity and Godot were easier than Roblox?

C# code that reads like intent, extends one method at a time. Build building blocks.

```csharp
public TryAgainButton()
{
    When(ButtonClicked("TryAgain"), ReloadCurrentScene());
}
```

### And it were powerful enough to create _Megabonk_?

With Statemachines and Behaviour Trees, but without the CS jargon. 

```csharp
Behavior.For("Enemy", 
    If(HealthBelow(30), Flee()),
    If(InRange(5).To("Player"), Attack()),
    Else(Patrol()) 
);
```

## **<font color="#ee2255">What if ..</font>❓**
### .. all game engines shared that same programming interface?

LunyScript uniformly maps high-level gameplay features all engines have in common.

🕹️ Input
<br/>💥 Physics
<br/>🎨 Assets
<br/>🎧 Audio
<br/>🌳 Scenes
<br/>And more ...

### And code behaved the same across engines?

Assets already transfer. 🚀
<br/>Now code transfers too. ✂️
<br/>Engine anxiety? Cured! 💊

### And it were free, and open source?

It is! -- Ready to cross-develop? -- [Join the Discussions 💬](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/)


---

# **Who This Is For**

**🎓 Self-Learners & Hobbyists**<br/>Easier than Roblox scripting. Publish anywhere. [Learn more →](docs/TargetAudience.md#self-learners--hobbyists-primary-audience)

**📹 Learnfluencers**<br/>Less coding, more teaching. Pit engines head-to-head. [Learn more →](docs/TargetAudience.md#tutorial-creators--learnfluencers-high-impact)

**🏫 Educators**<br/>One curriculum, many engines. Teach concepts, not semantics. [Learn more →](docs/TargetAudience.md#formal-educators--institutions)

**🎮 Prototypers**<br/>Jam fast and still write reusable code. [Learn more →](docs/PrototypersAndGameJammers.md)

**🎮 Visual Scripters**<br/>Tired of dragging noodly nodes? Text is 'visual' too. ;)

**🔧 Framework Developers**<br/>Code for mankind, not engines. [Learn more →](docs/TargetAudience.md#framework--tool-developers)

**→ [See full audience breakdown](docs/TargetAudience.md)**

---

# **Roadmap**

- **Phase 1:**<br/>Unity (C#); API Design; Portable Layer; Demos and Docs (Q2 2026)
- **Phase 2:**<br/>Godot (C#); Cross-Engine Tests; Improve onboarding (Q4 2026)
- **Phase 3:**<br/>Demos & Docs; Promote; Stabilize API (Q2 2027)

_Under Consideration_
- Lua and/or GDScript Bindings<br/>
- 2D Support: Initial focus is on 3D games

**→ [Maintenance strategy](MAINTENANCE.md)**

---

# **Join the Discussion!**

**Share your thoughts, ask questions, propose ideas!**

[💬 Join the Discussions](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/) • [📖 Documentation](https://codesmile-0000011110110111.github.io/LunyScript-RFC/docs/) • [❓ FAQ](FAQ.md)

Help shape the future of cross-engine, uniform game programming!

---
