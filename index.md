---
layout: default
title: LunyScript - Cross-Engine Gameplay Scripting
---

# **🎮 LunyScript 🎮**
The powerful and user-friendly alternative to Unity & Godot visual scripting.

## **Code That Speaks To You!**

```csharp
When.Collision.With("ball")
    .Begins(Audio.Play("energy_buildup"))
    .Ends(Spawn("sparkles"), Audio.Play("kick"));
```

It's Game Over For Tutorial Hell! 🤗

---

## **✨ Same Code - Any Engine ✨** 

LunyScript unifies high level gameplay programming across pro-tier game engines.

Coming soon: For **Unity**<sup> Q2/2026</sup> and **Godot**<sup> Q4/2026</sup> and ..

## **🤨 Any Engine?? Das Crazy! 🤯** 

These game engines only diverge in high-end features. The basics created _Megabonk_.

[![LunyScript Demo](media/LunyScript_Demo.gif)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")



## 🙌 Benefits 🎉

- <font size="3px">Code without the tech talk gibberish. 🗑️</font>
- <font size="3px">Learn like a scientist: through experimentation. 🧪</font>
- <font size="3px">Visible placeholders instead of _NullReference_ crashes. 🧘‍♂️</font>
- <font size="3px">Extensible with 'real' code - bite-sized. When you're ready. 😎</font>
- <font size="3px">Try another engine? Keep your assets and your code! 🧳</font>
- <font size="3px">Vibe coding generates relatable results to learn from. 💡</font>
- <font size="3px">The best? LunyScript is fast with 66% less boilerplate. 🤏</font>

---

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
### .. all game engines shared the same programming interface?

LunyScript uniformly maps high-level gameplay features all engines have in common.

🕹️ Input
<br/>💥 Physics
<br/>🎨 Assets
<br/>🎧 Audio
<br/>🌳 Scenes
<br/>And more ...

### And code behaved the same across engines?

Assets transfer. 🚀
<br/>Code transfers. ✂️
<br/>Engine anxiety? Cured! 💊

### And it were free, and open source?

It is! -- Ready to cross-develop? -- [Join the Discussions 💬](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/)

---

# **🧐This can't possibly work!!🤥**

It does! Made in 20 days. **[=> Watch the full video on YouTube (1:20)](https://youtu.be/Vn38VLNDsuw)**

> 🚧 **Status: Proof of Concept**<br/>
> 📸 [View detailed PoC documentation, screenshots, and source code →](PoC_2025-10/)

**→ [How LunyScript unifies different engine architectures](docs/EngineDifferences.md)**<br/>
**→ [API design philosophy and principles](docs/Philosophy.md)**<br/>
**→ [FOSS-compliant AI-assisted development](AI-USAGE.md)**<br/>
_Physics behaviour will deviate between physics engines._

LunyScript can adapt to: [Stride](https://stride3d.net/), [Flax](https://flaxengine.com/), [UnrealSharp](https://www.unrealsharp.com/), [CryEngine](https://www.cryengine.com/), [Unigine](https://unigine.com/), [Evergine](https://evergine.com/)


---

# **Who This Is For**

**🎓 Self-Learners & Hobbyists**<br/>Easier than Roblox scripting. Publish anywhere. [Learn more →](docs/TargetAudience.md#self-learners--hobbyists-primary-audience)

**📹 Learnfluencers**<br/>Less coding, more teaching. Pit engines head-to-head. [Learn more →](docs/TargetAudience.md#tutorial-creators--learnfluencers-high-impact)

**🏫 Educators**<br/>One curriculum, many engines. Teach concepts, not semantics. [Learn more →](docs/TargetAudience.md#formal-educators--institutions)

**🎮 Prototypers**<br/>Jam fast and still write reusable code. [Learn more →](docs/PrototypersAndGameJammers.md)

**🔧 Framework Developers**<br/>Code for mankind, not engines. [Learn more →](docs/TargetAudience.md#framework--tool-developers)

**→ [See full audience breakdown](docs/TargetAudience.md)**

---

# **Roadmap**

- **Phase 1:**<br/>Unity (C#); API Design; Portable Layer; Demos and Docs (Q2 2026)
- **Phase 2:**<br/>Godot (C#); Cross-Engine Tests; Improve onboarding (Q4 2026)
- **Phase 3:**<br/>Demos & Docs; Promote; Stabilize; (Q2 2027)

_Under Consideration_
- Lua/GDScript Bindings: For even easier scripting.<br/>
- 2D Support: Initial focus is on 3D games.

**→ [Maintenance strategy](MAINTENANCE.md)**

---

# **Join the Discussion!**

**Share your thoughts, ask questions, propose ideas!**

[💬 Join the Discussions](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/) • [📖 Documentation](https://codesmile-0000011110110111.github.io/LunyScript-RFC/docs/) • [❓ FAQ](FAQ.md)

Help shape the future of cross-engine, uniform game programming!

---
