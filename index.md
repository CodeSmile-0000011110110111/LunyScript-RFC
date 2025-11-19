---
layout: default
title: LunyScript - The Game Programming Gateway
---

# **LunyScript 🎮** The Game Programming Gateway

You have a great game idea? But game engine programming is complex, confusing, and completely different everywhere?

LunyScript is your **entry ticket** to Godot and Unity:


```csharp
public MyPlayer()
{
    When.Collision.With("ball")
        .Begins(Audio.Play("energy_buildup"))
        .Ends(Spawn("sparkles"), Event.Send("kick").To("ball"));
}
```

- **Godot and Unity**: Easier than Roblox and GameMaker! <sup>Coming soon: **Unity** (Q2/2026), **Godot** (Q4/2026), ...</sup> 
- **Skip dead-ends**: Learn the **career language C#** - the easy way!
- **Escape lock-in**: Same code, works everywhere! Not satisfied? Switch engines! 
- **Ready for more?**: LunyScript extends easily. Transition to engine APIs, line by line.  
- **No errors**: Mistakes happen! See them in-game. Stay in the flow of creating.
- **Powerful**: Learn proven concepts that drive entire games. Enough for a _Megabonk_!

<iframe width="648" height="365" src="https://www.youtube.com/embed/PfZ4VBui_Wo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## **Game Over For _Tutorial Hell_ !** 🤗

---

## **✨ Same Code - Any Engine ✨** 

LunyScript is the beginner-friendly, high-level gameplay programming API. It works **uniformly across C# game engines** with built-in Variable, Statemachines, and Behaviour Trees.

Control everything needed to implement gameplay: Input, Camera, Physics, Animation, Audio, UI, Scenes and Objects.

Something missing? Extend its bite-sized blocks by writing C# extension methods. Learn the engine as you go. Build your own functional, reusable, portable code library.

**Core Principles:**
- **Write Once, Run Anywhere** - Uniform API across C# game engines
- **Convention Over Configuration** - Smart defaults, minimal boilerplate
- **Extensibility First** - Extend via C# extension methods
- **Progressive Disclosure** - Learn the engine as you go
- **Composability** - Build functional, reusable, portable code libraries
- **Declarative Design** - Express intent, not implementation
- **Built-in Patterns** - Statemachines and Behaviour Trees included

**In Plain English:** LunyScript lets you write game code once and use it in different engines. It keeps things simple with sensible defaults, so you write less code. When you need something special, just add it yourself. You learn at your own pace while building a collection of code you can reuse forever.



---

## **🤨 Any Engine?? Das Crazy! 🤯** 

Game engines all share the same fundamental features needed to create a [_Megabonk_](https://store.steampowered.com/app/3405340/Megabonk/){:target="_blank"}. Here's the proof: three engines, same code, made in 20 days.

[![LunyScript Demo](media/LunyScript_Demo.gif)](PoC_2025-10/)

🚧 **Status: Proof of Concept** 🚧<br/>
📸 → [**View detailed PoC documentation, screenshots, and source code**](PoC_2025-10/)

---

# **🥴 LunyScript Cures Cognitive Overwhelm 💊**

LunyScript is 3-5 times less verbose than GDScript! See **→ [Code Comparison](docs/CodeComparison.md)**

[![Chart_Lines_of_Code.png](media/Chart_Lines_of_Code.png)](docs/CodeComparison)

---

# **But .. Why?**

I **know** that the amalgamation of **design as code** works and provides huge benefits to all creative thinkers and tinkerers. 
I can't expect you to trust my judgement, but it requires a few more words. **→ [The Problem Statement](docs/ProblemStatement)**

---

# **Who This Is For**

**🎓 Self-Learners & Hobbyists**<br/>Easier than Roblox scripting. Publish anywhere. [Learn more →](docs/TargetAudience.md#-self-learners--hobbyists-primary-audience)

**📹 Learnfluencers**<br/>Pit engines head-to-head. Expand your audience. [Learn more →](docs/TargetAudience.md#-learnfluencers-online-tutors-high-impact-multipliers)

**🎨 Visual Scripters**<br/>Tired of dragging noodly nodes? Design as code! [Learn more →](docs/TargetAudience.md#-visual-scripters-early-adopters)

**🏫 Educators**<br/>One curriculum, many engines. Teach concepts, not semantics. [Learn more →](docs/TargetAudience.md#-formal-educators--institutions)

**🎮 Prototypers**<br/>Jam fast and still write reusable code. [Learn more →](docs/TargetAudience.md#-prototypers--game-jammers)

**🔧 Framework Developers**<br/>Code for mankind, not "your" engine. [Learn more →](docs/TargetAudience.md#-framework--tool-developers)

---

# **Roadmap**

- **Phase 1:** **Unity** (C#)<br/>API Design; Portable Layer; Demos & Docs (Q2 2026)
- **Phase 2:** **Godot** (C#)<br/>Cross-Engine Tests; Improve Onboarding (Q4 2026)
- **Phase 3:** **Lua (Unity, Godot)**<br/>Bindings Generator; Stabilize API; More Engines PoC (Q2 2027)

**→ [Maintenance strategy](MAINTENANCE.md)**

---

# **Join the Discussion!**

**Share your thoughts, ask questions, propose ideas!**

[💬 Join the Discussions](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/){:target="_blank"} • [📖 Design](https://codesmile-0000011110110111.github.io/LunyScript-RFC/docs/) • [❓ FAQ](FAQ.md)

Help shape the future of cross-engine, uniform game programming!

<iframe src="https://ghbtns.com/github-btn.html?user=CodeSmile-0000011110110111&repo=LunyScript-RFC&type=star&count=true" frameborder="0" scrolling="1" width="72" height="22"></iframe>
<font size=6>👈️👍️</font>
Please **star** the [LunyScript-RFC GitHub repository](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC){:target="_blank"} to show your support!

---

##### **AI Usage Info**

<sub>Since LunyScript is an open source project, certain rules regarding AI usage needed to be established. You can find them here:
**→ [FOSS-compliant AI-assisted development](AI-USAGE.md)**</sub>
