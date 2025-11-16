## Table of Contents

- [The "Why?" Behind LunyScript - A Personal Story](#the-why-behind-lunyscript---a-personal-story)
- [Engine Scripting: Failed](#engine-scripting-failed)
  - [GDScript Is Different](#gdscript-is-different)
  - [GDScript Is Still More Of The Same](#gdscript-is-still-more-of-the-same)
- [We need to re-think game engine scripting!](#we-need-to-re-think-game-engine-scripting)
- [The Luny Vision](#the-luny-vision)
  - [Vision Statements](#vision-statements)
  - [The Outcome](#the-outcome)


---

# Game Engine Market Overview

As of 2025, only three publicly available game engines dominate the market: Unity, Unreal, and Godot. 

Their overal market shares are roughly 50%/20%/10% with the remaining 20% roughly split between proprietary engines and several mid-tier game creation tools.

# Learning Game Development

Institutionalized education is mainly preparing developers for AAA studios which typically require formal degrees.

But self-learning significantly dominates today, and keeps growing thanks to the accessibility of tools, engines, and online learning materials.

This however causes learning to be highly fragmented, disorganized, and thus confusing. Learnfluencers (learning influencers) are naturally inclined to focus on quick wins. Together with the overwhelming complexity of the subject, many aspiring developers get stuck in passive consumption: **tutorial hell**.

# We need to re-think game engine programming!

We are tempted to view Godot as the beginner-friendly revolution. Its GDScript language clearly highlights the **desire for less boilerplate** even among experienced developers.

But GDScript is also a **complete outlier** in an ecosystem where C-like languages dominate. It still **exposes the engine's entire API surface** on one hand, while creating a **comfortable trap** for beginners, teaching no transferable skills. It creates lock-in.

Historically, the only engine-exclusive scripting languages that did not become obsolescent are found in closed-source engines, as the only option to write code.  

I began asking heretic questions ...

## **<font color="#ee2255">What if ..</font>❓**
### .. programming Unity and Godot in C# were easier than Roblox?

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

It is!

---

# The Luny Vision

We can't change game engines' unique workflows and user interfaces.
But we **can** lessen the impact of their disparate APIs and languages!

## Vision Statements

A sustainable scripting solution shall be:

**Portable & Open:**
- Works in multiple engines, not just one
- Works in any language, not just one
- Is an API, not a language
- Code is portable between engines
- Is free and open source

**Beginner- & Designer-Friendly:**
- Declarative, expressing intent
- Fault-tolerant, using placeholders instead of crashing
- On-screen instrumentation over debugger deep-dives
- Bite-sized code extensions teach modular thinking & engine API
- Unlocks engines: portable code libraries

**Production-Ready:**
- Powerful: Built-In Statemachine and Behaviour Trees
- Supplements existing code and tools
- Promises <5% performance overhead
- Is easy to extend and bypass

## The Outcome

Pro-tier engines across the board will be more approachable and conducive to beginners. They learn valuable concepts and patterns before diving into imperative programming - rather than vice versa.

Learnfluencers provide valuable head-to-head engine comparisons and can afford time to demo less popular engines. This could help niche engines to gain popularity.

Education adopts a single entry-level game programming curriculum. Easier to encourage non-programmers to code.

Visual Scripting users find themselves more productive in text-based declarative programming. Simple projects complete faster. Game Jams produce reusable code. Prototypes are less concerned with technical issues. Trying a different engine is easier.
