# LunyScript
## Code gameplay once. Same outcome in Unity, Godot ..

Game Engines solved platform API fragmentation.

LunyScript solves game engine API fragmentation.

Our assets are portable. Why not our gameplay code?

## This can't possibly work !!

I took this idea in 20 days from scratch to proof of concept in Unreal, Unity, and Godot.

[![LunyScript](media/ProofOfConceptVideoPlayer.png)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")

| Godot| Unity| Unreal|
|---|---|---|
| ![PlayMode_Godot_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot_Editor.png) | ![PlayMode_Unity_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity_Editor.png) | ![PlayMode_Unreal_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal_Editor.png) |
| ![PlayMode_Godot.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot.png)| ![PlayMode_Unity.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity.png)| ![PlayMode_Unreal.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal.png)|

The engine-native code is just 30% - mostly automatable glue.

The remaining 70% of LunyScript is fully portable, providing behavioural guarantees.

## Same code? In any Engine??

Yes.

LunyScript is:

- Easier to learn than imperative or visual programming.  
- For 3D games, game jams, prototypes, digital experiences, tight schedules.
- Write once, runs in any engine. Proven for Unity, Godot, Unreal. More soon ...
- Minimal (5%) performance overhead, faster than unoptimized code.

## But engines are very different!!

Yes. 

But these don't matter to gameplay code!

It's the semantics that are needlessly disparate: `BeginPlay`, `OnEnable`, `_enter_tree`.



## But .. what for??

check again
------------
Unreal Editor for Fortnite is a Roblox-like game creation platform with close ties to Unreal Engine. 

Amazon is pushing Open3D Engine. Godot is growing. Unity is restructuring.

For developers there's opportunities everywhere. And uncertainties.  

Many will have reasons to switch engines in the coming decades.
We should enable them to take their code with them.
-------------

# The Game Engine Irony: The Solution became The Problem!

**2000s:** "I can't port my game from Windows to Mac, from Playstation to N64 - the APIs are completely different!"
**Solution:** Use a game engine! Write once, deploy everywhere.

**2020:** "I can't take my project from Unity to Godot — the APIs are completely different!"
**Solution:** ???

We solved platform lock-in by creating **engine lock-in**.

We need to sideline this pattern: a portable game logic layer that works across engines,
just like engines work across platforms. Our assets are already portable, why not our logic?

## Past Game Engine Scripting 

In 2014 UnrealScript, in 2017 UnityScript got removed.

Both:
- were custom engine DSLs
- were based on a popular programming language, but differed in key aspects
- grew to rival the engine's native language in complexity
- exposed the engine's native API unchanged
- ultimately, they impeded further engine development

## Enter Godot's GDScript

It is:
- a custom engine DSL
- based on Python, but differs in key aspects
- continuously accruing imperative  language complexity
- exposing the engine's native API unchanged
- ultimately, it .. (_divining answer_)

I know one thing for sure: 

For the time being, it's a VALUABLE entry-level scripting language.
But history speaks loud and clear: custom engine DSLs eventually become liabilities.
DSLs only work for closed-source engines: it's the only choice they offer (GameMaker GML, Roblox Luau).

As the 2023 Unity exodus proved: 
1. Developers WANT engine alternatives, but their code is 100% incompatible.
2. An onramp scripting language attracts users. GDScript is applauded as entry-level, however ..
3. GDScript alienates C# users who don't get the same level of integration.
4. GDScript alienates Python users through divergent keywords and functionality.

# The Vision

We need to re-think Game Engine scripting. A sustainable solution MUST be:

** Portable & Open:**
- Works across all engines, not just one
- Same logic -> same outcome, different engine
- Is an API, not a language (same in C#, Lua, ..)

**Beginner-Friendly:**
- Declarative, using natural language over CS jargon
- Fault-tolerant, uses placeholders for missing references
- On-screen instrumentation over debugger deep-dives

**Production-Ready:**
- Applies proven design patterns, not language features
- <5% performance overhead (or faster than imperative boilerplate)
- Adaptable to user needs (direct-to-native API escape hatch)

We can't change game engine's unique workflows and user interfaces.
But we CAN change game engine's disparate APIs and languages.


---

# The Solution

[Current "Description" section, trimmed to 2 paragraphs max]

LunyScript provides a uniform API for ubiquitous game engine features.
Its declarative syntax reduces boilerplate by 80% while teaching proven
patterns: behavior trees, state machines, reactive events.

Think jQuery for game engines—simplify common tasks, work with any engine.

## The Code 

(insert code comparison here)

--------
CUT OR IMPROVE BELOW
## My "Story"

- 1999 I worked with visual statemachines as a designer (8+ GameBoy titles)
- 2002 I implemented statemachines in Lua, creating a declarative script API for SpellForce, BattleForge
- 2009 We shipped three main titles and two add-ons, all heavily scripted. Onboarding was easy. Runtime script logic was just 1-3% CPU time. 
- 2010 Indie games and engine market exploded during this decade.
- 2020 Tribal communities formed around just two top-tier engines, despite 10+ competitive alternatives. 
- 2023 Unity's "runtime fee" debacle forced many to reconsider. Few actually did jump ship. 
- 2025 Godot proved: simple scripting is key. But: still imperative, and growing in complexity. History repeating...

Engines share the same ubiquitous features, but code is highly unique. 
As if car manufacturers each provided their unique or subtly different controls and instrumentation.
In one word: it's complicating entry, beginners have to CHOOSE BEFORE THEY DRIVE!
Most popular videos are about comparing engines, about decision making, often subjective and misleading.
This forces vendor lock-in and fosters tribal communities.

- Why are game engines APIs so diverse? It's a hassle and a liability for everyone.
- Why is beginner's code so verbose? Cargo cult programming and reinventing the wheel are commonplace.
- Why do learners struggle so much? Realtime imparative programming, complex APIs, elaborate editor tools are extremely challenging.
- Why are designers using only visual graph tools? It's regarded as the only thing designers would want to work with. General purpose declarative programming is a lost art.
- Why is FOSS viewed as immune to business risks? FOSS code is still a liability! Teams, let alone individuals, don't have the time, skill, or budget to maintain an engine they didn't write.

As a book author (Learn Cocod2d, Learn SpriteBuilder) I see the learning issues are not for the lack of great material. 
Tackling the complexities of game programming has everyone teach bad practices to cope with engine code complexities.
First and foremost the engine providers themselves, since within a decade learners transform not into
"Game Feature Specialists" but into "Xyz Game Engine Specialists". While Learnfluencers simply follow viewer's interests.

Instead, we should provide EASIER TOOLING all across the board to onramp learners and to empower designers!


# Summary

A functional reactive event system drives coroutines, behavior trees, statemachines - standard game programming patterns proven in production for decades. 
It favors beginner and designer friendly natural language: Run.InOrder, IfMany, Asset["my mesh"].
Code completion friendly, it is intuitive to pick up, provides immediate results, causes less friction compared to visual scripting, let alone imperative text code.

LunyScript aims to be 'React/jQuery for Logic Programming' by making unique Game Engine APIs uniform, accessible, with less boilerplate.

# !!!! (tbd: insert code comparison here)

# Description
LunyScript provides a uniform API to program C# game engines' ubiquitous features, whose editor design tools do the heavy lifting. 

Its portable **LunyCore** bridges engines' already similar Scene Graphs, Object Lifecycles, Asset Types to a single, unified interface. This enables developing cross-engine frameworks.

Its declarative **LunyScript** API is suitable for making small games, minimal interactive experiences, and prototypes. It is easy to extend even by beginners. Available in C# and Lua.

Together, both drive a wedge into game engine ecosystems. Entire categories like 'Vampire Survivors' or '3D Product Configurators' are entirely programmable in LunyScript. Which engine hardly matters.

CUT ABOVE
-----


## Key Benefits
- **Learn once, apply anywhere:** Learnings and language transfer. As onramp and for comparative analysis.
- **Empowers Designers:** More efficient than visual scripting. Easy to extend. VCS friendly.
- **Ecosystem risk mitigation:** Prep for next "runtime fee" debacle. Logic as portable as assets!
- **Cost efficient:** Reusable code libraries emerge naturally, even on tight schedules without senior staff.
- **Minimal overhead:** Marginal (5%), with potential for gains via internalized caching.
- **Add-in solution:** Add at any time, use selectively.

# Use Cases

Works great for:
- **Education:** One curriculum to teach them all. Avoid overwhelming non-coders.
- **Indies:** Create 'recipe games' faster, more opportunities to add 'your charm'
- **Game Jam / Prototyping:** Be fast, have fun, AND walk away with more reusable code blocks
- **Digital Marketing:** Low interactivity == simple code. Engine mandated? Reduce 'unknown API' risk. 
- **Learnfluencers:** "Head to Head" comparisons are demanding but cater to larger audiences.
- **Research:** Defer API evaluation. Trial UI, Workflows, Platforms first. 

## Proven in Three Engines

TBD rewrite
**2024:** Proof-of-concept built in modern C#
- Unity: 13 days
- Godot port: 3 days
- Unreal port: 4 days
- **70% of code shared across engines**
- AI successfully ported engine adapters without human intervention


## Roadmap

**Phase 1:** API Design, Portable Core, Unity Implementation (6 months)
**Phase 2:** Port to Godot, add Lua and GDScript, Demos & Docs, +1-2 engine quickports (6 months)
**Phase 3:** Port to more engines, best candidates: Unreal, CryEngine, Stride, Flax


## Developer Track Record

TBD my history
**2002-2009:** Shipped 3 major titles + 2 expansions using this approach
- Designer onboarding: days instead of weeks
- Code reuse: extensive shared logic libraries
- Maintainability: declarative code easier to debug and extend


## Implementation Targets
- **Unity** initially, due to weight
- **Godot** port next, for education
- Later, one or more of: Unreal (via UnrealSharp), CryEngine, Stride, Flax, Unigine, Evergine 
- _Possibly_: Unreal (native), Open3D Engine, Cocos Creator, GDevelop
- With vendor buy-in: Limitless ...


-----------------------------------------------

-----------------------------------------------
-----------------------------------------------
-----------------------------------------------
-----------------------------------------------

## Proven to Work!
A proof of concept demo game was made in 20 days. 13 days in Unity, 3 days Godot port, 4 days Unreal port. 70% of the code is in the portable layer. Engine adapters are tiny, AI ported them flawlessly.

The game testdrives a complete vertical slice: object lifecycle and properties, event handling (input, ui, collision, ..), asset indexing, variables, UI binding, visual & audio effects, and porting adapters.

I have 30 years experience in game dev, 10 years working in Unity, had no prior experience in Godot and Unreal.
Within that time I wrote a portable C# framework with 3x engine adapters, let intuition drive the game design, and had to perform asset integration, scene setup, visual tweaks three times.


## LunyScript Examples

LunyScript C# code shall look something like this, and will be available in Lua too:

    public class Police : LunyScript
    {
        public Police()
        {
            When(Collision.Enter("ball"), Run.InOrder(
                Audio.Play(),
                Prefab.Spawn("GoldCube").Times(3),
                Variable.Global.Increment("Score"),
                Collision.Other.SendMessage("EnableGlow"),
                Wait.Seconds(1),
                Collision.Other.SendMessage("DisableGlow"),
            );
        
            // user enters menu
            When.Input(Key.Escape, ShowMenu());
            When(Menu.Button.Pressed("Restart"), Run.InParallel(
                Audio.Play(button_click),
                Variable.Global.Set("Score", 0),
                Stage.Reload()
            );
        
            // police car signal lights
            var police = SceneGraph["PoliceCar"]; // "Find" operation internally cached
            Forever(Run.InOrder(
                police.Enable("RedLight"), police.Disable("BlueLight"), Wait.Seconds(0.1),
                police.Disable("RedLight"), police.Enable("BlueLight"), Wait.Seconds(0.12)
            );
        }
    }

You may notice hints of tried and true patterns such as Coroutines, Behaviour Trees, Statemachines. Perhaps even hints of SCUMM. 
This is not coincidence. 

Neither is discarding the CS terminology in favor of natural language semantics.

## Technical Mumbo-Jumbo

The core frameworks makes the reasonable assumption that:

- there is a scene graph of "things" with "more things" in them
    - the expectation is that there are "objects" that have a list of "components"
    - Unity has a graph of GameObjects each with a list of components
    - Godot's pure Node graph maps easily: Graph of GameObject nodes, each with a list of Component nodes (its children)
    - Unreal's nested component graph maps in similar fashion
- you don't need to care what these "things" actually are:
    - The figurative "GetComponent<T>()" works like this:
    - Unity: returns Component<T> on GameObject
    - Godot: returns child Node matching T
    - Unreal: returns child UComponent matching T in AActor's component graph
- engine objects' lifecycle events are intercepted, queued, and forwarded in deterministic fashion
    - levels minor inconsistencies between engines' order of events
    - removes any non-deterministic behaviours in some events of some engines
- users will want to bypass the bridge and write direct-to-engine calls for best efficiency: simply pass the native reference, method overloading does the rest.
- users will want to configure runtime behaviour, ie disable No-Null design if exceptions are preferred
- users want to hot-reload script changes at runtime, even in builds (modding!)
- users will NOT want to feel forced into using a particular language.
    - Script API is expressly designed to adapt almost identically to any common game engine language
    - Default is engine's native language. Lua is for learners and designers.
- users will need to instrument and debug the adapters and core abstractions easily:
    - Minimal pure C# 9 code, unit tested core. No emit, reflection or compiler magic.
- Portable behaviour contracts are possible, precise outcomes aren't (physics!):
    - Throw object in direction: check. Comes to rest at precise location in same time: non-goal.
