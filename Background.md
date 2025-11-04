# Background: Engines Of Uncertainty

Unreal Editor for Fortnite (2023) is a Roblox-like game creation platform, now funneling young talents straight into Unreal Engine.

Meanwhile, Tech Giant Amazon is pushing 'their' FOSS Open3D Engine (2021). Ironic: Crytek competing against its own tech!

Godot is growing strong but faces challenges convincing a risk averse industry of their unique design model.

Market leader Unity has recovered from its 2023 runtime fee debacle. But continues to lose 1-2% market share year over year.

Flax, Stride, Cocos, Unigine - competitive alternatives few even know.
No surprise: our specializations _evolved_ from "Game Programmer" to "Unreal Programmer" and "Unity Programmer".

Engine fragmentation is growing, the landscape shifting. Career opportunities everywhere.

**Where to place your bets?**

# They Became The Problem They Solved!

## 2000s
**Problem:** "We can't port our game from Windows to Mac or Playstation - the APIs are completely different!"

**Solution:** Game engines! Write once, deploy cross-platform.

## 2020s

**Problem:** "We can't port our project from Unity to Godot — the APIs are completely different!"

**Solution:** ???

---

The irony: We solved platform lock-in and API fragmentation, only to create **engine API lock-in**. With each engine's API significantly growing in complexity over time, this works against learners. For them, switching engines feels like moving to a foreign country.

The solution: a portable gameplay programming API that works across engines, across languages, is easy to learn, and won't chase carrots. You get faster results and get to keep both knowledge and code if you switch. It makes the initial choice less important, encouraging experimentation.

Porting game logic should really be no different than porting assets: import, setup, done.

# Programming onramp? Add a scripting language!

A short history of custom, engine-integrated scripting languages:

1. UnrealScript - Born 1998, RIP 2014 - Died age 16
2. Unity Boo    - Born 2005, RIP 2014 - Died age 9
3. UnityScript  - Born 2005, RIP 2017 - Died age 12
4. GDScript     - Born 2014

The ones that are dead didn't really affect the onramp. Their problem: They were used to program the engine's complete API.
Ultimately, their maintenance became a burden. Their native languages were always far more popular anyway.

Godot's GDScript is much better integrated and positioned, and can be considered the native language. 
But it also targets the engine's complete API which **continues to accumulate complexity**. 
Godot scripting is deemed beginner-friendly now. But so was UnityScript around 2014.

**The Problem:** The language itself is only a small concern. It's primarily the complex engine APIs that hurt the programming onramp.

We need to re-think Game Engine scripting!

# The Vision

We can't change game engines' unique workflows and user interfaces.
But we CAN lessen the impact of their disparate APIs and languages!

A sustainable scripting solution shall be:

**Portable & Open:**
- Works across multiple engines, not just one
- Is an API, not a language
- Is Free and Open Source

**Beginner-Friendly:**
- Declarative, using expressive language
- Bite-sized code teaches modular thinking
- Fault-tolerant, using placeholders instead of crashing
- On-screen instrumentation over debugger deep-dives

**Production-Ready:**
- Provides proven design patterns
- Supplements existing code and tools
- Promises <5% performance overhead
- Is easy to extend or bypass

## The Outcome

Pro-tier engines across the board will be more approachable to beginners. They learn valuable concepts and patterns before diving into imperative programming.

Education adopts a single entry-level game programming curriculum.

Learnfluencers provide valuable head-to-head comparisons and can afford time to demo less popular engines.

Simple projects complete faster. Game Jams produce reusable code. Prototypes struggle less with technical issues. Visual Scripting users enjoy clarity of text-based declarative programming.

# My Personal Experience

- 1999 I used visual statemachines in my first game designer job (8+ GameBoy titles)
- 2002 I created a declarative, statemachine-based Lua script API (SpellForce, BattleForge)
- 2009 We had shipped three main titles, three add-ons, all heavily scripted. Onboarding was easy.
    - Script logic was 1-3% runtime CPU usage. The key? Lua transforms to native C++ on map load.
- 2010 I worked freelance, wrote several game engine books. (Learn cocos2d, Learn SpriteBuilder)
- 2015 I began working on digital marketing projects. Unity only.
- 2022 I began creating FOSS projects. For fun. With an estranged feeling that _something is missing_.
- 2025 I spent half a year integrating Lua in Unity ...

I made the same mistake as GDScript, UnityScript, UnrealScript!
I thought: first the entire API. Then I can add a simple layer.

Now I'm convinced: we need the simple API first and foremost.
