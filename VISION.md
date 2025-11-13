## Table of Contents

- [The "Why?" Behind LunyScript - A Personal Story](#the-why-behind-lunyscript---a-personal-story)
- [Engine Scripting History](#engine-scripting-history)
  - [GDScript Is Different](#gdscript-is-different)
  - [GDScript Is Still More Of The Same](#gdscript-is-still-more-of-the-same)
- [We need to re-think game engine scripting!](#we-need-to-re-think-game-engine-scripting)
- [The Luny Vision](#the-luny-vision)
  - [Vision Statements](#vision-statements)
  - [The Outcome](#the-outcome)

# The "Why?" Behind LunyScript - A Personal Story

**High-level, text-based programming is efficient and designer-friendly.** It eases beginners into complex programming tasks and introduces them to valuable patterns, as I've learned myself. 

Unfortunately, it's also a lost art.

Well into the 2000s many game studios had the highly valuable role of the **designing-coder** and the **coding-designer**. Both were using the same tool, a scripting language or parsed data descriptions or both. It was simple and intuitive, but also very powerful. 

Because without code, a design is worthless. And without design, code is ineffective.

![spellforce2-dragonstorm.jpg](media/history/spellforce2-dragonstorm.jpg)
<sup>SpellForce 2 - Dragon Storm (2007)</sup>

The race towards "higher efficiency" forced the team I worked with to split up into separate entities with specialized roles: the ones who created the flow of gameplay, and the ones who made the environment look consistently good.

From then on, **at the very core of gameplay was a disconnect.**

Two factions viewing each other as foreigners. The artists break the logic. The designers messed up the art. We changed creation from an amalgamation of personal creative choices towards building a bland product on an assembly line.

![battleforge.jpg](media/history/battleforge.jpg)
<sup>BattleForge (2009)</sup>

This is the state of the game industry at large today. 

Only small teams can afford to break out of assembly productions split by roles. In fact, it's their most important angle to find success. 

But those creative artists, solopreneurs, visionaries, and beginners all struggle to cope with the immense complexity of powerful tools we have at our disposal - just to create very basic gameplay features. 

They work with the powerhouse engines who naturally align their features to requirements of corporate productions, bolstering the separation of developer roles.

I **know** that the amalgamation of "design as code" works and provides huge benefits. Even absolute non-programmers were able to implement designs within days.

That's all **I** need to know. Of course **you** want to know more:

---

# Engine Scripting History

Programming onramp? Add a scripting language! A short history of domain-specific languages (DSL) in game engines:

1. UnrealScript - Born 1998, RIP 2014 - Died age 16
2. Boo (Unity)  - Born 2005, RIP 2014 - Died age 9
3. UnityScript  - Born 2005, RIP 2017 - Died age 12
4. GDScript     - Born 2014, ...

The ones that are dead didn't really affect the onramp. 

**Their problem**: They were **engine-exclusive languages exposing the engine's entire API surface**. Maintenance was a growing burden, ultimately the decision was made to drop them. 

For Unity, **C# was considered accessible enough**. While Epic was **forced to invent Blueprints** since the only alternative was and is C++.

DSLs mimicking the native language aren't easing beginners since the real challenges lie in the massive, ever expanding APIs - not syntactical convenience.

## GDScript Is Different

Godot's GDScript is much better positioned with three of four users relying on it. 

It's the tight editor integration that makes GDScript beginner-friendly. Even debugging and profiling. Simpler syntax and duck-typing are merely secondary factors. 

GDScript also highlights the desire for programming with less boilerplate.

## GDScript Is Still More Of The Same

GDScript is an **engine-exclusive language exposing the engine's entire API surface**. Both API and language continue to grow in complexity. 

It's also a complete outlier in an ecosystem where C-like languages dominate. It adds significant friction when there is need to integrate a C++/C# framework.

Although Godot officially supports C#, it is at a competitive disadvantage: it lacks the same tight editor integration, and web platform support.

For learners, GDScript skills don't transfer. Learning supporting skills like refactoring requires the use of an IDE. The upramp to C#/C++ still remains significant.

Needless to say - like every other DSL - **GDScript is a vendor lock-in mechanism**.

---

# We need to re-think game engine scripting!

It bothered me for a long time that we need to write so much boilerplate code for trivial tasks. **Simple tasks should be simple!**

For the longest time, I thought it's a great thing to have so many entry-level tutorials for self-learners.
But then I realized how rampant **tutorial hell** is among self-learners!

And how **some influencers are damaging coding skills**, favoring quick wins through teaching bad practices. Even spreading FUD when it serves their interests (clicks).

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
- Declarative, with informal language
- Fault-tolerant, using placeholders instead of crashing
- Built-In Statemachine and Behaviour Trees
- On-screen instrumentation over debugger deep-dives
- Bite-sized code extensions teach modular thinking

**Production-Ready:**
- Supports common gameplay design needs
- Supplements existing code and tools
- Promises <5% performance overhead
- Is easy to extend or bypass

## The Outcome

Pro-tier engines across the board will be more approachable and conducive to beginners. They learn valuable concepts and patterns before diving into imperative programming - rather than vice versa.

Learnfluencers provide valuable head-to-head engine comparisons and can afford time to demo less popular engines. This could help niche engines to gain popularity.

Education adopts a single entry-level game programming curriculum. Easier to encourage non-programmers to code.

Visual Scripting users find themselves more productive in text-based declarative programming. Simple projects complete faster. Game Jams produce reusable code. Prototypes struggle less with technical issues.
