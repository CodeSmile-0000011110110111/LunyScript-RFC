# LunyScript

## Code gameplay once. Same outcome in Unity, Godot, Unreal ...

Game Engines solved platform API fragmentation.

LunyScript solves game engine API fragmentation.

Our assets are portable. Why not our gameplay code?

## This can't possibly work !!

I took this idea in under 20 days from scratch to proof of concept in Unreal, Unity, and Godot.

[![LunyScript](media/ProofOfConceptVideoPlayer.png)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")

## LunyScript Benefits

- Learn once, apply anywhere. Declarative, with expressive semantics.
- Increased portability, decreased vendor lock-in.
- Reach more audiences with tutorials and frameworks.
- Less verbose than visual scripting and imperative programming.

The engine-native code is just 30% - mostly automatable glue. 70% of LunyScript is fully portable, providing behavioral guarantees.

## What's it used for?

- Learn to code complex engines faster.
- Teach gameplay programming patterns first.
- Ideal for game jams, prototyping, onboarding.
- Projects requiring unfamiliar engines.

## Screenshots
| Godot                                                                                           | Unity                                                                                             | Unreal                                                                                              |
|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| ![PlayMode_Godot_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot_Editor.png) | ![PlayMode_Unity_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity_Editor.png) | ![PlayMode_Unreal_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal_Editor.png) |
| ![PlayMode_Godot.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot.png)               | ![PlayMode_Unity.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity.png)               | ![PlayMode_Unreal.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal.png)               |

Porting twice to engines I hadn't previously worked with (Godot, Unreal) took 3 days each. Including asset integration and writing engine adapters. Physics behaviour tuning merely required adjusting value scales.

It was also a very uplifting experience. I didn't intend to make a playable game - it evolved naturally!

## Repositories & Source Code

Note: API in Proof of Concept represents an early first draft. Final API will differ in key aspects.

| [Godot PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Godot)            | [Unity PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Unity)  | [Unreal PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Unreal)|
|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|

### PoC Source Code Examples
- [PoliceCarScratch.cs](2025-10_Proof_Of_Concept_Demo/PoliceCarScratch.cs)
- [CompanionCubeScratch.cs](2025-10_Proof_Of_Concept_Demo/CompanionCubeScratch.cs)
- [HitEffectScratch.cs](2025-10_Proof_Of_Concept_Demo/HitEffectScratch.cs)


## Roadmap

- **Phase 1:** API Design, Unity Implementation, Portable Core (6 months)
- **Phase 2:** Port to Godot, with Lua and GDScript, Demos & Docs, +2 engine PoCs (6 months)
- **Phase 3:** Port to more engines, best candidates: Stride, Flax, Unreal, CryEngine

---
---

# Background: Engines Of Uncertainties

Unreal Editor for Fortnite is a Roblox-like game creation platform, funneling young talents into Unreal Engine.

Meanwhile, Tech Giant Amazon is pushing 'their' FOSS Open3D Engine. Ironic: CryEngine competing against itself!

Godot is growing, but needs to convince a risk averse industry. Unity is recovering from its runtime fee debacle.

Flax, Stride, Unigine, Cocos - competitive alternatives few use. 
No surprise: our specializations _evolved_ from "Game Programmer" to "Unreal/Unity Programmer".

Engine fragmentation is growing, the landscape changing. Career opportunities everywhere. Where to place your bets?

# They Became The Problem They Solved!

## 2000s
**Problem:** "We can't port our game from Windows to Mac or Playstation - the APIs are completely different!"

**Solution:** Game engines! Write once, deploy cross-platform.

## 2020s

**Problem:** "We can't port our project from Unity to Godot — the APIs are completely different!"

**Solution:** ???

---

We solved platform lock-in and API fragmentation, only to create **engine API lock-in**. This works against learners. Switching engines feels like throwing away everything you did and learned. But how can you make the right engine choice before you know how to drive?

The solution: a portable gameplay programming API that works across engines, across languages, and is easy to learn. You get faster results and get to keep both knowledge and code if you switch. It makes the initial choice less important, encourages experimentation.

Porting logic should be no different than porting assets: import, setup, done. 

## Boo, UnrealScript, UnityScript

Programming onramp? Add a scripting language!

- Unity Boo    - RIP 2014 - Died age 9
- UnrealScript - RIP 2014 - Died age 16
- UnityScript  - RIP 2017 - Died age 12
 
They were custom DSLs to program the engine's complete API. This didn't really affect the onramp. Ultimately, their maintenance became a burden. Their native languages were always far more popular anyway. 

Godot's GDScript is much better integrated and positioned. It also targets the engine's complete API. Godot is deemed beginner-friendly, yet even its API continues to accumulate complexity.

**The Problem:** It's complex engine APIs that hurt the programming onramp, not the language.

We need to re-think Game Engine scripting!

# The Vision

We can't change game engines' unique workflows and user interfaces.
But we CAN change their disparate APIs and languages!

A sustainable scripting solution MUST be:

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
- Target: <5% performance overhead
- Direct-to-Native escape hatch

## The Outcome

Pro-tier engines across the board will be more approachable to beginners. They learn valuable concepts and patterns before diving into imperative programming.

Education adopts a single entry-level game programming curriculum.

Learnfluencers provide valuable head-to-head comparisons and can afford time to demo less popular engines.

Simple projects complete faster. Game Jams produce reusable code. Prototypes struggle less with technical issues. Visual Scripting aficionados enjoy text-based declarative programming as more productive.

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
The language is entirely secondary.

# Frequently Asked Questions (FAQ)

## Isn't LunyScript just another custom API?

Here's the real problem: Engine API semantics are needlessly disparate: `BeginPlay`, `OnEnable`, `_enter_tree`. Yet they function practically identical.

That's **lock-in** with the first line of code. LunyScript loosens the grip of engines over our code!

LunyScript is stickier: **the uniform API** to program in any engine! 

## Any abstraction adds overhead! Games need performance!

We're long past the days when we needed to count bytes and CPU cycles. Our games are already full of layers of abstractions. 

Code we write in C# crosses the language boundary to C++ - this is rather costly. 
It still worked wonderfully for Unity.

Same with Blueprints: we know it's between 100x to 1,000x slower than C++ yet we use it extensively.

## It's going to be a maintenance nightmare!

The shared engine features have settled. 
They are so fundamental to every project that they resist change.

LunyScript will not chase fancy new features.
Anyone can add whatever they want however.

The engine adapters and observers are in separate, engine-specific repositories.
I needn't manage and maintain every engine integration myself.

## Results won't replicate precisely!

They needn't. Close enough is good enough.

Even if you have to tweak every physics value once more, the logic itself is already running in the new engine, unchanged!

That's a lot more productive than having to start with _no code_, or worse: having to _fix and verify_ automatically converted code in a foreign environment.
