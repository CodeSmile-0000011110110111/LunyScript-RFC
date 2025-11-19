---
layout: default
title: LunyScript - The Game Programming Gateway
---

# **LunyScript 🎮** The Game Programming Gateway

## You want to make games? Great! 😃

But game engine code is complex, confusing, and completely different everywhere. 🫨

LunyScript is your **catch-all entry ticket** to professional game engines:

```csharp
public MyPlayer()
{
    When.Collision.With("ball")
        .Begins(Audio.Play("energy_buildup"))
        .Ends(Spawn("sparkles"), Event.Send("kick").To("ball"));
}
```
Why learn pointless differences like`_init`,`Awake`,`BeginPlay`when you just want to make your dream game come true? 😄 Learn the editor first, engine code later. 🥳 
<br/><sub>I used LunyScript to create a game in three engines simultaneously:<sub>
![LunyScript Demo](media/LunyScript_Demo.gif)

## **✨ Same Code - Many Engines ✨**

LunyScript is the beginner-friendly, high-level game programming API that works **uniformly across game engines**. It's free and open source (MIT License).

- **Godot and Unity**: Easier to program than Roblox & GameMaker 😏🤗<br/><sup>**Unity:** Q2/2026, **Godot:** Q4/2026 [⏰ Join Patreon for updates! 🔔](https://www.patreon.com/CodeSmile){:target="_blank"}</sup> 
- **Skip dead-ends**: Learn the **career language C#** 🧑‍🎓🧑‍💻<br/><sup>Defer the scary syntax but work like a Pro with Rider, VS, VSCode.</sup>
- **No runtime errors**: Stay in the flow of creating 🎨🎧<br/><sup>Mi<ins>ts</ins>akes happen! See and inspect issues where they occur: in-game.</sup>
- **Powerful**: Enough to create a _Megabonk_ 👑💎<br/><sup>Learn proven concepts: Statemachines, Behaviour Trees, Coroutines.</sup>
- **Concise**: 3-5 times less code than GDScript 🤫🧘<br/><sup>Code is clear and consistent! No CS jargon. No visual node spaghetti.</sup>
- **Ready for more**: LunyScript extends easily 🛝🚀<br/><sup>Transition to engine APIs one small step at a time, at your own pace.️️</sup>
- **Experiment**: Trial and error is encouraged 🧪🥼<br/><sup>Pure creative joy! Avoid getting sucked into **Tutorial Hell**!</sup>
- **Escape lock-in**: Same code, works everywhere 🔑🔓<br/><sup>Dislike the editor? Community unhelpful? No jobs? Switch engines, keep the code!️</sup>

LunyScript let's you program everything game engines have in common: Input🕹️ Camera👁️ Physics⚽ Animation🏃 Audio🎸 UI️📱 Scenes🎭 Objects🪜 and more! 

---
### LunyScript ➕ Engine Editor 🟰 intuitive & rapid game-making! 🛠️

<iframe src="https://ghbtns.com/github-btn.html?user=CodeSmile-0000011110110111&repo=LunyScript-RFC&type=star&count=true" frameborder="0" scrolling="1" width="100" height="22"></iframe>
<font size=6>👈️👍️</font>
Please **star** the [LunyScript-RFC GitHub](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC){:target="_blank"} repository [⏰ Join Patreon for updates! 🔔](https://www.patreon.com/CodeSmile){:target="_blank"}

---

## **🤨 Any Engine?? Das Crazy! 🤯** 

Game engines make games. They share the same essential features for a [_Megabonk_](https://store.steampowered.com/app/3405340/Megabonk/){:target="_blank"}. 
Most games don't need much more. Why bother programming them differently?

API standardization has escaped game engines for all the wrong reasons: competition, pride, control, evolution. _Games are different_ so engine APIs must be too. **Wrong!**

**Proof**: Unreal, Unity, Godot: same game, same code.🫡 -- **They said it's impossible!**🤔

[![LunyScript Demo](media/LunyScript_Demo.gif)](PoC_2025-10/)

📸 → [**View detailed PoC documentation, screenshots, and source code**](PoC_2025-10/)

---

# **It's just a toy ..**

The core concepts behind LunyScript have been **proven in production** over several titles. Designers loved the consistency and extensibility. 
Onboarding and documentation was easy. Need another button? One line of code.

I **know** that the amalgamation of **design as code** works and provides **huge benefits** to all **creative thinkers and tinkerers**. Designers, not just beginners.

**→ [The Problem Statement](docs/ProblemStatement)** that lead to LunyScript.
<br/>**→ [About me and my experience](AUTHOR.md)** that formed LunyScript.
<br/>**→ [The vision](VISION.md)** for LunyScript.
<br/>**→ [The philosophy](docs/Philosophy.md)** of LunyScript.
<br/>**→ [Compare the code](docs/CodeComparison.md)** - LunyScript is clear and 3-5x less code.

---

# **Who This Is For**

**🎓 Self-Learners & Hobbyists**<br/>Easier than Roblox scripting. Publish anywhere! [Learn more →](docs/TargetAudience.md#-self-learners--hobbyists-primary-audience)

**📹 _Learnfluencers_**<br/>Grow your audience. Compare engines. Adopt early! [Learn more →](docs/TargetAudience.md#-learnfluencers-online-tutors-high-impact-multipliers)

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
