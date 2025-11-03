# LunyScript

## Code gameplay once. Same outcome in Unity, Godot, Unreal ...

Game Engines solved platform API fragmentation.

LunyScript solves game engine API fragmentation.

Our assets are portable. Why not our gameplay code?

## This can't possibly work !!

I took this idea in under 20 days from scratch to proof of concept in Unreal, Unity, and Godot.

[![LunyScript](media/ProofOfConceptVideoPlayer.png)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")

## LunyScript Benefits

- Increased portability, decreased vendor lock-in.
- Learn once, apply anywhere. Declarative, with natural language.
- Reach more audiences with tutorials and frameworks.
- Less verbose than visual scripting and imperative programming.
- Minimal (5%) performance overhead, can even be faster.

The engine-native code is just 30% - mostly automatable glue. 70% of LunyScript is fully portable, providing behavioral guarantees.

## Screenshots
| Godot                                                                                             | Unity                                                                                             | Unreal                                                                                              |
|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| ![PlayMode_Godot_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot_Editor.png) | ![PlayMode_Unity_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity_Editor.png) | ![PlayMode_Unreal_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal_Editor.png) |
| ![PlayMode_Godot.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot.png)               | ![PlayMode_Unity.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity.png)               | ![PlayMode_Unreal.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal.png)               |

Physics behaviour tuning merely required adjusting value scales.

Porting twice to engines I hadn't previously worked with took around 3 days each. Including asset integration and writing engine adapters!


## Repositories & Source Code

Note: API in Proof of Concept represents an early first draft.

| [Godot PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Godot)            | [Unity PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Unity)  | [Unreal PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Unreal)|
|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|

### Godot Sources
- [PoliceCarScratch.cs](2025-10_Proof_Of_Concept_Demo/PoliceCarScratch.cs)
- [CompanionCubeScratch.cs](2025-10_Proof_Of_Concept_Demo/CompanionCubeScratch.cs)
- [HitEffectScratch.cs](2025-10_Proof_Of_Concept_Demo/HitEffectScratch.cs)

## Proposed API - Examples

TBD ...


## What's it for?

- Teach gameplay programming patterns.
- Learn to code complex engines faster.
- Ideal for game jams, prototyping, scaffolding.
- Projects requiring unfamiliar engines.

## Roadmap

- **Phase 1:** API Design, Unity Implementation, Portable Core (6 months)
- **Phase 2:** Port to Godot, with Lua and GDScript, Demos & Docs, +2 engine PoCs (6 months)
- **Phase 3:** Port to more engines, best candidates: Stride, Flax, Unreal, CryEngine

---

---

# Background: A Market Of Uncertainties

Unreal Editor for Fortnite is a Roblox-like game creation platform, funneling young talents into Unreal Engine.

Meanwhile, Amazon is pushing 'their' FOSS Open3D Engine. The irony: CryEngine is competing against itself!

Godot is growing, but needs to convince a risk averse industry. Unity is recovering from its runtime fee debacle.

Few heard of Flax, Stride, Unigine, Cocos - competitive alternatives. 
No surprise, since our professional roles specialized from "Game Programmer" to "Unreal/Unity Programmer".

Career opportunities and uncertainties everywhere. Engine fragmentation is growing, the landscape changing.

# The Engine Irony: Becoming the Problem they solved!

## 2000s
**Problem:** "We can't port our game from Windows to Mac or Playstation - the APIs are completely different!"

**Solution:** Game engines! Write once, deploy cross-platform.

## 2020s

**Problem:** "We can't port our project from Unity to Godot — the APIs are completely different!"

**Solution:** ???

We solved platform lock-in and API fragmentation, only to create **engine lock-in**.

The solution: a portable gameplay programming API that works across engines. Porting logic should be no different than porting assets: import, setup, done. 

# The Scripting Irony: DSLs don't stick 

Programming onramp? Add a scripting language! 

Scripting is a lot less useful if the API remains the same.

## UnrealScript & UnityScript

UnrealScript (2014, 16 yrs) and UnityScript (2017, 12 yrs) both got removed from their engines.

Both were custom DSLs to program the engine's API. They derived from popular languages but differed in key aspects. Ultimately, both were an impediment to further engine development and got cut.

## Enter Godot's GDScript

GDScript (2014, 11 yrs) is a custom DSL to program the engine's API. It derived from Python but differs in key aspects. Ultimately, it .. (_divining answer_) .. is still prone to become a liability.

# The Vision

We need to re-think Game Engine scripting! A sustainable solution MUST be:

** Portable & Open:**
- Works across all engines, not just one
- Is an API, not a language
- Is Free and Open Source

**Beginner-Friendly:**
- Declarative, using natural language
- Fault-tolerant, using placeholders instead of crashing
- On-screen instrumentation over debugger deep-dives

**Production-Ready:**
- Provides proven design patterns
- Supplements existing code and tools
- <5% performance overhead

We can't change game engine's unique workflows and user interfaces.
But we CAN change game engine's disparate APIs and languages.

# The Outcome

Pro-tier engines will become more approachable to beginners. They learn valuable concepts and patterns before diving into imperative programming. 



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
I needn't necessarily manage and maintain every engine integration myself.

## Results won't replicate precisely!

They needn't. Close enough is good enough.

Even if you have to tweak every physics value once more, the logic itself is already running in the new engine, unchanged!

That's a lot more productive than having to start with _no code_, or having to _fix and verify_ automatically converted code.
