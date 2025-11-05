# Background: Engines Of Uncertainty

*For the author's personal experience with cross-engine scripting, see [AUTHOR.md](../AUTHOR.md)*

---

Unreal Editor for Fortnite (2023) is a Roblox-like game creation platform, now funneling young talents straight into Unreal Engine.

Meanwhile, Tech Giant Amazon is pushing 'their' FOSS Open3D Engine (2021) with AWS integration. Ironic: Crytek competing against its own tech!

Market leader Unity has recovered from its 2023 runtime fee debacle. It is also strengthening its cloud service integration.

Godot is growing strong but faces challenges convincing a risk averse industry of their unique design model.

Flax, Stride, Cocos, Unigine - competitive alternatives few even know.
No surprise: our specializations _evolved_ from "Game Programmer" to "Unreal Programmer" and "Unity Programmer".

Engine fragmentation is growing while Engines themselves create ever more lock-in effects. 

# They Became The Problem They Solved!

## 2000s
**Problem:** "We can't port our game from Windows to Mac or Playstation - the APIs are completely different!"

**Solution:** Game engines! Write once, deploy cross-platform.

## 2020s

**Problem:** "We can't port our project from Unity to Godot — the APIs are completely different!"

**Solution:** ???

---

The irony: We solved platform lock-in and API fragmentation, only to create **engine API lock-in**. 

With each engine's API continuously growing in complexity over time, this works against learners. For them, switching engines feels like moving to a foreign country.

# Programming onramp? Add a scripting language!

A short history of domain-specific languages (DSL) in game engines:

1. UnrealScript - Born 1998, RIP 2014 - Died age 16
2. Boo (Unity)  - Born 2005, RIP 2014 - Died age 9
3. UnityScript  - Born 2005, RIP 2017 - Died age 12
4. GDScript     - Born 2014, ...

The ones that are dead didn't really affect the onramp. Their problem: They were engine-exclusive languages to program the engine's complete API. Usage numbers were low, maintenance a burden, so the decision was made to drop them.

Godot's GDScript is much better positioned with the majority of users relying on it. It still is an engine-exclusive language used to program the engine's complete API. Although Godot supports several language bindings, they can't outcompete GDScript's seamless editor integration. 

DSLs aren't easing beginners since the real challenges lie in the massive, ever expanding APIs. By nature of being programming languages, they also accrue more complexity over time.

Needless to say, every game engine DSL is a vendor lock-in mechanism.

We need to re-think Game Engine scripting!

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
