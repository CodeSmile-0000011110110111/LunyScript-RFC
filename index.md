---
layout: default
title: LunyScript - The Game Programming Gateway
---

# **LunyScript 🎮** The Game Programming Gateway

## You want to make games? Great! 😃

But game engine code is complex, confusing, and completely different everywhere. 🫨

Worry not! LunyScript is your **catch-all entry ticket** to Godot and Unity:

```csharp
public MyPlayer()
{
    When.Collision.With("ball")
        .Begins(Audio.Play("energy_buildup"))
        .Ends(Spawn("sparkles"), Event.Send("kick").To("ball"));
}
```

I used LunyScript to create a game in three engines simultaneously:

![LunyScript Demo](media/LunyScript_Demo.gif)

## **✨ Same Code - Many Engines ✨**

LunyScript is the beginner-friendly, high-level game programming API that works **uniformly across game engines**. It's free and open source (MIT License).

- **Godot and Unity**: Easier code as Roblox & GameMaker 😏🤗<br/><sup>**Unity:** Q2/2026, **Godot:** Q4/2026 [⏰ Join Patreon newsletter! 🔔](https://www.patreon.com/CodeSmile){:target="_blank"}</sup> 
- **Skip dead-ends**: Learn the **career language C#** 🧑‍🎓🧑‍💻<br/><sup>Defer the scary syntax but work like a Pro.</sup>
- **Concise**: 3-5 times less code 🤫🧘<br/><sup>Compared to GDScript. Code that's clear and consistent!</sup>
- **No errors**: Stay in the flow of creating 🎨🎧<br/><sup>Mi<ins>ts</ins>akes happen! See and inspect issues in-game.</sup>
- **Powerful**: Enough to create a _Megabonk_ 👑💎<br/><sup>Learn proven concepts: Statemachines, Behaviour Trees, Coroutines.</sup>
- **Experiment**: Trial and error is encouraged 🧪🥼<br/><sup>Pure creative joy! Avoid getting sucked into **Tutorial Hell**!</sup>
- **Ready for more?**: LunyScript extends easily 🛝🚀<br/><sup>Transition to engine APIs, line by line, at your own pace.️️</sup>
- **Escape lock-in**: Same code, works everywhere 🔑🔓<br/><sup>Dislike the editor? Community unhelpful? Switch engines!️</sup>

LunyScript let's you program everything game engines have in common: Input🕹️, Camera👁️, Physics⚽, Animation🏃, Audio🎸, UI️📱, Scenes🎭, Objects🪜, and more! 

Powerful in-engine editing tools combined with LunyScript makes making games easy!

Why learn pointless differences like`_init`,`Awake`,`BeginPlay`when you just want to make your dream game come true? 😄

---

<iframe src="https://ghbtns.com/github-btn.html?user=CodeSmile-0000011110110111&repo=LunyScript-RFC&type=star&count=true" frameborder="0" scrolling="1" width="100" height="22"></iframe>
<font size=6>👈️👍️</font>
Please **star** the [LunyScript-RFC GitHub repository](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC){:target="_blank"} to show your interest!

---

## **🤨 Any Engine?? Das Crazy! 🤯** 

Game engines make games. They share the same essential features for a [_Megabonk_](https://store.steampowered.com/app/3405340/Megabonk/){:target="_blank"}. 
Most games don't need much more. Why bother programming them differently?

API standardization has escaped game engines for all the wrong reasons: competition, pride, control, evolution. _Games are different_ so engine APIs must be too. **Wrong!**

Proof: three engines, same code, made in 20 days. **They said it's impossible!**🤔🫡
[![LunyScript Demo](media/LunyScript_Demo.gif)](PoC_2025-10/)

🚧 **Status: Proof of Concept** 🚧<br/>
📸 → [**View detailed PoC documentation, screenshots, and source code**](PoC_2025-10/)

---

# **🥴 LunyScript Cures Cognitive Overwhelm 💊**

LunyScript is 3-5 times less verbose than GDScript! See **→ [Code Comparison](docs/CodeComparison.md)**

[![Chart_Lines_of_Code.png](media/Chart_Lines_of_Code.png)](docs/CodeComparison)

---

# **It's just a toy ..**

The core concepts behind LunyScript have been **proven in production** over several titles. Designers loved the consistency and extensibility. 
Onboarding and documentation was easy. Need another button? One line of code.

I **know** that the amalgamation of **design as code** works and provides **huge benefits** to all **creative thinkers and tinkerers**, not just beginners.

**→ [The Problem Statement](docs/ProblemStatement)** that lead to LunyScript.

---

# **Who This Is For**

**🎓 Self-Learners & Hobbyists**<br/>Easier than Roblox scripting. Publish anywhere. [Learn more →](docs/TargetAudience.md#-self-learners--hobbyists-primary-audience)

**📹 _Learnfluencers_**<br/>Pit engines head-to-head. Expand your audience. [Learn more →](docs/TargetAudience.md#-learnfluencers-online-tutors-high-impact-multipliers)

**🎨 Visual Scripters**<br/>Tired of dragging noodly nodes? Design as code! [Learn more →](docs/TargetAudience.md#-visual-scripters-early-adopters)

With potential for: 🏫 [Educators](docs/TargetAudience.md#-formal-educators--institutions) 🎮[Prototypers](docs/TargetAudience.md#-prototypers--game-jammers) 🔧[Framework Developers](docs/TargetAudience.md#-framework--tool-developers)

---

# **Roadmap**

- **Phase 1:** **Unity** (C#)<br/>API Design; Portable Layer; Demos & Docs (Q2 2026)
- **Phase 2:** **Godot** (C#)<br/>Cross-Engine Tests; Improve Onboarding (Q4 2026)
- **Phase 3:** **Lua & Modding**<br/>Bindings Generator; Stabilize API; More Engines PoC (Q2 2027)

**→ [Maintenance strategy](MAINTENANCE.md)**

---

# **Join the Discussion!**

**Share your thoughts, ask questions, propose ideas!**

[💬 Join the Discussions](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/){:target="_blank"} • [📖 Design](https://codesmile-0000011110110111.github.io/LunyScript-RFC/docs/) • [❓ FAQ](FAQ.md)

Help shape the future of cross-engine, uniform game programming!

---

<iframe src="https://ghbtns.com/github-btn.html?user=CodeSmile-0000011110110111&repo=LunyScript-RFC&type=star&count=true" frameborder="0" scrolling="1" width="100" height="22"></iframe>
<font size=6>👈️👍️</font>
Please **star** the [LunyScript-RFC GitHub repository](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC){:target="_blank"} to show your support!

---

##### **AI Usage Info**

<sub>Since LunyScript is an open source project, certain rules regarding AI usage needed to be established. You can find them here:
**→ [FOSS-compliant AI-assisted development](AI-USAGE.md)**</sub>
