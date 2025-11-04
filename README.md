# LunyScript

## Same code, same outcome! In Unity, Godot, Unreal ...

    When.Collision.With("ball")
        .Begins(Audio.Play("ball_tagged_loop"))
        .Ends(Spawn("sparkles").At(Other).Run(Wait.Seconds(2.5), Despawn()))

High-level game logic that runs at near-native performance. Any engine, same behaviour.

## This can't possibly work !!

It does! Here's the proof: same code, same game, runs in Unreal, Unity, and Godot.

[![LunyScript](media/ProofOfConceptVideoPlayer.png)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")

Built from scratch in under 20 days. Started with Unity, then ported to Godot and Unreal in 3 days each.

## But why?

Visual tools like PlayMaker (60€, 3.4k reviews, 20k favorites) prove there's massive demand for simplifying game logic — even among professionals. But visual tools create vendor lock-in, debugging headaches, and users still need to know structured programming concepts.

LunyScript gives you **high-level game logic as code** — readable, customizable, and runs across engines.

**For learners:** Your hard-earned skills and code transfer when you switch engines — no more restarting from scratch.

**For multi-engine studios:** Teams don't fragment along engine-specific roles and your code works across projects.

**For everyone:** Less boilerplate, more intent. Write behavior, not plumbing. Build your own reusable or native library.

## Use Cases

- Learn to code in complex engines faster, with less lock-in.
- Teach gameplay programming - same curriculum, multiple engines.
- Ideal for game jams and prototyping - be faster and write reusable code.
- Projects in unfamiliar engines pose less programming risk.
 
## Benefits

Lunyscript: Learn more with less! 

Declarative API with expressive semantics in multiple engines and multiple languages. Initially targets C#, Lua, and GDScript.

Impress with results: less code and fewer errors than with conventional imperative programming.

Don't worry about the right choice: Increased portability decreases engine lock-in. Take your assets **and your code** to the other engine.

As tutor you can speak to a larger audience for free: you still only prepare a single code curriculum / tutorial.

As framework developer you can earn more targeting multiple ecosystems while spending less time integrating in multiple engines.

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

---
---

# Background: Engines Of Uncertainty

Unreal Editor for Fortnite is a Roblox-like game creation platform, now funneling young talents straight into Unreal Engine.

Meanwhile, Tech Giant Amazon is pushing 'their' FOSS Open3D Engine. Ironic: CryEngine competing against itself!

Godot is growing strong but faces challenges convincing a risk averse industry of their unique design model. 

Market leader Unity has recovered from its 2023 runtime fee debacle. But continues to lose 1-2% market share year over year. 

Flax, Stride, Cocos, Unigine - competitive alternatives few even know. 
No surprise: our specializations _evolved_ from "Game Programmer" to "Unreal Programmer" and "Unity Programmer".

Engine fragmentation is growing, the landscape shifting. Career opportunities everywhere, but where to place your bets? 

# They Became The Problem They Solved!

## 2000s
**Problem:** "We can't port our game from Windows to Mac or Playstation - the APIs are completely different!"

**Solution:** Game engines! Write once, deploy cross-platform.

## 2020s

**Problem:** "We can't port our project from Unity to Godot — the APIs are completely different!"

**Solution:** ???

---

We solved platform lock-in and API fragmentation, only to create **engine API lock-in**. With year over year growth in engine complexity, this works against learners. For them, switching engines feels like moving to a foreign country.

The solution: a portable gameplay programming API that works across engines, across languages, is easy to learn, and won't chase carrots. You get faster results and get to keep both knowledge and code if you switch. It makes the initial choice less important, encouraging experimentation.

Porting game logic should really be no different than porting assets: import, setup, done. 

## Boo, UnrealScript, UnityScript

Programming onramp? Add a scripting language!

- Unity Boo    - RIP 2014 - Died age 9
- UnrealScript - RIP 2014 - Died age 16
- UnityScript  - RIP 2017 - Died age 12
 
They were custom DSLs to program the engine's complete API. This didn't really affect the onramp. Ultimately, their maintenance became a burden. Their native languages were always far more popular anyway. 

Godot's GDScript is much better integrated and positioned. It also targets the engine's complete API which **continues to accumulate complexity**. Godot is deemed beginner-friendly now. But so was Unity 10 years ago.

**The Problem:** It's primarily the complex engine API that hurts the programming onramp.

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
The language is entirely secondary.

# Frequently Asked Questions (FAQ)

## Isn't LunyScript just another custom API?

Here's the real problem: Engine API semantics are needlessly disparate: `BeginPlay`, `OnEnable`, `_enter_tree`. Yet they function practically identical.

That's **lock-in** with the first line of code. LunyScript loosens the grip of engines over our code!

LunyScript is stickier: **the uniform API** to program in any engine! 

## It's going to be a maintenance nightmare!

The shared engine features have settled. 
They are so fundamental to every project that they resist change.

LunyScript will not chase fancy new features.
Anyone can add whatever they want however.

The engine adapters and observers are in separate, engine-specific repositories.
I needn't manage and maintain every engine integration myself.

The engine-native code is just 30% - mostly automatable glue. 
70% of LunyScript is fully portable, providing the behavioral guarantees.

## Any abstraction adds overhead! Games need performance!

We're long past the days when we needed to count bytes and CPU cycles. Our games are already full of layers of abstractions.

Code we write in C# crosses the language boundary to C++ - this is rather costly.
It still worked wonderfully for Unity.

Same with Blueprints: we know it's between 100x to 1,000x slower than C++ yet we use it extensively.

## Results won't replicate precisely!

They needn't. Close enough is good enough.

Even if you have to tweak every physics value once more, the logic itself is already running in the new engine, unchanged!

That's a lot more productive than having to start with _no code_, or worse: having to _fix and verify_ automatically converted code in a foreign environment.
