---
layout: default
title: LunyScript - Cross-Engine Gameplay Scripting
---

# **LunyScript 🎮** Makes Making Games Fun!

<sup>Coming soon for **Unity** (Q2/2026) and **Godot** (Q4/2026) ...</sup>

LunyScript is the powerful and user-friendly alternative to visual scripting.

---

## **Game Over For Tutorial Hell!** 🤗

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

LunyScript is beginner-friendly, high-level gameplay programming that **works uniformly across game engines**.

Something missing? Extend its bite-sized blocks by writing C# extension methods. Learn the engine as you go.

## **🤨 Any Engine?? Das Crazy! 🤯** 

Game engines all share the same fundamental features needed to create a _Megabonk_.

[![LunyScript Demo](media/LunyScript_Demo.gif)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")

> 🚧 **Status: Proof of Concept**<br/>
> 📸 [View detailed PoC documentation, screenshots, and source code →](PoC_2025-10/)

## 🧐This can't possibly work!!🤥

It does! It's not rocket science. Engines aren't that different. They all make games using the same basic set of high-level features. LunyScript aims to standardize them.
<br/>**=>[ Watch the full video on YouTube (1:20) - PoC in 20 days](https://youtu.be/Vn38VLNDsuw)**

**→ [How LunyScript unifies slightly different engine architectures](docs/EngineDifferences.md)**<br/>
**→ [API design philosophy and principles](docs/Philosophy.md)**<br/>
**→ [Code comparison: LunyScript vs Engine scrips](docs/CodeComparison.md)**<br/>
**→ [FOSS-compliant AI-assisted development](AI-USAGE.md)**<br/>
_Note: Physics behaviour will deviate between physics engines, requires scaling values._

---

# **Who This Is For**

**🎓 Self-Learners & Hobbyists**<br/>Easier than Roblox scripting. Publish anywhere. [Learn more →](docs/TargetAudience.md#self-learners--hobbyists-primary-audience)

**📹 Learnfluencers**<br/>Less coding, more teaching. Pit engines head-to-head. [Learn more →](docs/TargetAudience.md#tutorial-creators--learnfluencers-high-impact)

**🏫 Educators**<br/>One curriculum, many engines. Teach concepts, not semantics. [Learn more →](docs/TargetAudience.md#formal-educators--institutions)

**🎮 Prototypers**<br/>Jam fast and still write reusable code. [Learn more →](docs/PrototypersAndGameJammers.md)

**🎮 Visual Scripters**<br/>Tired of dragging noodly nodes? Text is 'visual' too. ;)

**🔧 Framework Developers**<br/>Code for mankind, not engines. [Learn more →](docs/TargetAudience.md#framework--tool-developers)

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
