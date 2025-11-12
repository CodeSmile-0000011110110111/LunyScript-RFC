---
layout: default
title: LunyScript - Cross-Engine Gameplay Scripting
---

# **LunyScript 🎮** Makes Making Games Fun!

<sup>Coming soon for **Unity** (Q2/2026) and **Godot** (Q4/2026) ...</sup>

LunyScript is the powerful and user-friendly alternative to visual scripting.

---

## **Game Over For _Tutorial Hell_ !** 🤗

```csharp
public MyPlayer()
{
    When.Collision.With("ball")
        .Begins(Audio.Play("energy_buildup"))
        .Ends(Spawn("sparkles"), Event.Send("kick").To("ball"));
}
```
<sup>[More Code Samples, compared with Godot/Unity scripts](docs/CodeComparison.md)</sup>

## **✨ Same Code - Any Engine ✨** 

LunyScript is beginner-friendly, high-level gameplay programming that **works uniformly across C# game engines**.

Something missing? Extend its bite-sized blocks by writing C# extension methods. Learn the engine as you go.

## **🤨 Any Engine?? Das Crazy! 🤯** 

Game engines all share the same fundamental features needed to create a _Megabonk_.

[![LunyScript Demo](media/LunyScript_Demo.gif)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")

> 🚧 **Status: Proof of Concept**<br/>
> 📸 [View detailed PoC documentation, screenshots, and source code →](PoC_2025-10/)

---

# **🥴 LunyScript Cures Cognitive Overwhelm 💊**

LunyScript is 3-5 times less verbose than GDScript!
[![Chart_Lines_of_Code.png](media/Chart_Lines_of_Code.png)](docs/CodeComparison)
<sup>[View Interactive Chart](https://docs.google.com/spreadsheets/d/e/2PACX-1vQYteK-tn0qLcvssVP5sLEcTg7adjtRbbE56Usj-BUmtx033RVY9lLt0aPpL_Ef4uEp8DNvRpBgWLTh/pubchart?oid=2073524744&format=interactive)</sup>

# **But .. Why?**

I **know** that the amalgamation of "design as code" works and provides huge benefits to all creative thinkers. 
I can't expect you to trust my judgement, but it requires a few more words: **→ [The Problem Statement](docs/ProblemStatement)**

# **Who This Is For**

**🎓 Self-Learners & Hobbyists**<br/>Easier than Roblox scripting. Publish anywhere. [Learn more →](docs/TargetAudience.md#-self-learners--hobbyists-primary-audience)

**📹 Learnfluencers**<br/>Less coding, more teaching. Pit engines head-to-head. [Learn more →](docs/TargetAudience.md#-tutorial-creators--learnfluencers-high-impact)

**🏫 Educators**<br/>One curriculum, many engines. Teach concepts, not semantics. [Learn more →](docs/TargetAudience.md#-formal-educators--institutions)

**🎮 Prototypers**<br/>Jam fast and still write reusable code. [Learn more →](docs/TargetAudience.md#-prototypers--game-jammers)

**🎨 Visual Scripters**<br/>Tired of dragging noodly nodes? Text is 'visual' too. ;) [Learn more →](docs/TargetAudience.md#-visual-scripters)

**🔧 Framework Developers**<br/>Code for mankind, not engines. [Learn more →](docs/TargetAudience.md#-framework--tool-developers)

---

# **Roadmap**

- **Phase 1:**<br/>Unity (C#); API Design; Portable Layer; Demos and Docs (Q2 2026)
- **Phase 2:**<br/>Godot (C#); Cross-Engine Tests; Improve onboarding (Q4 2026)
- **Phase 3:**<br/>Lua bindings; Demos & Docs; Promote; Stabilize API (Q2 2027)

**→ [Maintenance strategy](MAINTENANCE.md)**

---

# **Join the Discussion!**

**Share your thoughts, ask questions, propose ideas!**

[💬 Join the Discussions](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/) • [📖 Documentation](https://codesmile-0000011110110111.github.io/LunyScript-RFC/docs/) • [❓ FAQ](FAQ.md)

Help shape the future of cross-engine, uniform game programming!

---

# **AI Usage Info**

Since LunyScript is an open source project, certain rules regarding AI usage needed to be established. You can find them here:
**→ [FOSS-compliant AI-assisted development](AI-USAGE.md)**
