
# **<font color="#ee2255">What if ..</font>❓**
## .. programming Unity and Godot in C# were easier than Roblox?

C# code that reads like intent, extends one method at a time. Build building blocks.

```csharp
public TryAgainButton()
{
    When(ButtonClicked("TryAgain"), ReloadCurrentScene());
}
```

## And it were powerful enough to create _Megabonk_?

With Statemachines and Behaviour Trees, but without the CS jargon.

```csharp
Behavior.For("Enemy", 
    If(HealthBelow(30), Flee()),
    If(InRange(5).To("Player"), Attack()),
    Else(Patrol()) 
);
```

# **<font color="#ee2255">What if ..</font>❓**
## .. all game engines shared that same programming interface?

LunyScript uniformly maps high-level gameplay features all engines have in common.

🕹️ Input
<br/>💥 Physics
<br/>🎨 Assets
<br/>🎧 Audio
<br/>🌳 Scenes
<br/>And more ...

## And code behaved the same across engines?

Assets already transfer. 🚀
<br/>Now code transfers too. ✂️
<br/>Engine anxiety? Cured! 💊

## And it were free, and open source?

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
- Unlocks engines: portable code frameworks

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

## Long Term

Today's powerful game engines are tomorrow's powerful game creation tools.
Portable code libraries enable developers to integrate common game features with ease.

Games are moddable by default through LunyScript's Lua bindings.
Gamers get exposed to how gameplay is programmed, thus find it easier to learn game engines. 

LunyScript is a common feature in niche engines since it helps them gain popularity. 
The job market is less fixated on specific engine programming experience. 

The 'code designer' role is becoming more commonplace, connecting design with programming.

Most importantly, more diverse talents produce more uniquely creative experiences.
