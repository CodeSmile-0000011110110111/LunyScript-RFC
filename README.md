# LunyScript - Request for Comments
## Code gameplay once. Same outcome in Unity, Godot, Unreal ...

Game Engines solved platform API fragmentation.

LunyScript solves game engine API fragmentation.

Our assets are portable. Why not our gameplay code?

## This can't possibly work !!

I took this idea in under 20 days from scratch to proof of concept in Unreal, Unity, and Godot.

[![LunyScript](media/ProofOfConceptVideoPlayer.png)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")

The engine-native code is just 30% - mostly automatable glue. 70% of LunyScript is fully portable, providing behavioural guarantees.

## Screenshots
| Godot                                                                                             | Unity                                                                                             | Unreal                                                                                              |
|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| ![PlayMode_Godot_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot_Editor.png) | ![PlayMode_Unity_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity_Editor.png) | ![PlayMode_Unreal_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal_Editor.png) |
| ![PlayMode_Godot.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot.png)               | ![PlayMode_Unity.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity.png)               | ![PlayMode_Unreal.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal.png)               |

Of course they LOOK different. May even feel a little different. 

To straighten up Physics behaviour I merely needed to scale some numbers.
It's _close enough_ to be considered equal.

Porting twice to engines I hadn't previously worked with took around 3 days each.
Including asset integration and writing engine adapters!


## Repositories & Source Code
CAUTION: Proof of Concept only. API is not representative!

| [Godot PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Godot)            | [Unity PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Unity)  | [Unreal PoC Repository](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Unreal)|
|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|

### Godot Sources
- [PoliceCarScratch.cs](2025-10_Proof_Of_Concept_Demo/PoliceCarScratch.cs)
- [CompanionCubeScratch.cs](2025-10_Proof_Of_Concept_Demo/CompanionCubeScratch.cs)
- [HitEffectScratch.cs](2025-10_Proof_Of_Concept_Demo/HitEffectScratch.cs)

Note: Final LunyScript will not inherit from engine types!

## Proposed API - Examples

TBD ...

## LunyScript Benefits

- Increased portability, decreased vendor lock-in.
- Learn once, apply anywhere. Declarative, with natural language.
- Reach more audiences with tutorials and frameworks.
- Less verbose than visual scripting and imperative programming.
- Minimal (5%) performance overhead, can even be faster.

## What's it for?

- For learning to code in highly complex engines.
- For simple 3D games or individual features.
- For short game jams or fast prototyping.
- For low interactivity experiences or tight schedules.
- For lucrative projects mandating unfamiliar engines.
- For writing simple code to do simple things.

## Roadmap

- **Phase 1:** API Design, Unity Implementation, Portable Core, RFC Draft (6 months)
- **Phase 2:** Port to Godot, with Lua and GDScript, Demos & Docs, +2 engine PoCs (6 months)
- **Phase 3:** Port to more engines, best candidates: Stride, Flax, Unreal, CryEngine

---

---

# Background: A Market Of Uncertainties

Unreal Editor for Fortnite is a Roblox-like game creation platform, funneling young talents into Unreal Engine.

Meanwhile, Amazon is pushing 'their' FOSS Open3D Engine. The irony: CryEngine is competing against itself!

Godot is growing, but needs to convince a risk averse industry. While Unity is recovering from its runtime fee debacle.

Few heard of Flax, Stride, Unigine, Cocos - competitive alternatives. 
No surprise, since our professional roles changed from "Game Programmer" to ie "Unreal Programmer".

Career opportunities and uncertainties everywhere. Engine fragmentation is growing, the landscape changing.

# The Engine Irony: From Solution to Problem!

**2000s:** "I can't port my game from Windows to Mac, Playstation to N64 - the APIs are completely different!"

**Solution:** Game engines! Write once, deploy cross-platform.

**2020:** "I can't port my project from Unity to Godot — the APIs are completely different!"

**Solution:** ???

We solved platform lock-in and API fragmentation, only to create **engine lock-in**.

The solution: a portable gameplay programming API that works across engines. 

# The Scripting Irony: DSLs don't stick 

Programming onramp? Add a scripting language! 

Unfortunately, I too fell for that notion. 
Scripting is a lot less useful if the API remains the same.

## UnrealScript & UnityScript

UnrealScript (2014, 16 yrs) and UnityScript (2017, 12 yrs) both got removed from their engines.

Both:
- were custom engine DSLs
- were derived from popular languages, but differed in key aspects
- continuously grew in complexity
- used to program the engine's native API
- ultimately, both were an impediment to further engine development

## Enter Godot's GDScript

GDScript is:
- a custom engine DSL
- derived from Python, but differs in key aspects
- continously growing in complexity
- used to program Godot's native API
- ultimately, it .. (standby: _divining answer_)

Signs of GDScript being a problem:
3. It alienates C# users who don't get the same level of integration.
4. It adds friction for Python users through divergent keywords and features.
6. It is a side-stepping stone for careers: game languages are all C-based
5. It is exclusive to Godot: 'vendor' lock-in

History speaks loud and clear: custom engine DSLs eventually become liabilities.

# The Vision

We need to re-think Game Engine scripting! A sustainable solution MUST be:

** Portable & Open:**
- Works across all engines, not just one
- Same logic -> same outcome, different engine
- Is an API, not a language - applied in C#, Lua, GDScript, ..
- Free and Open Source

**Beginner-Friendly:**
- Declarative, with natural language instead of CS jargon
- Fault-tolerant, supplies placeholders for missing references
- On-screen instrumentation over debugger deep-dives

**Production-Ready:**
- Provides proven design patterns, not language features
- <5% performance overhead (or faster than imperative boilerplate)
- Adaptable to user needs (direct-to-native API escape hatch)

We can't change game engine's unique workflows and user interfaces.
But we CAN change game engine's disparate APIs and languages.
And we CAN add entry-level, text-based scripting to game engines.

## The Results

Pro-tier game engines could become supreme mid-tier game creation tools. 
They only lack a streamlined programming interface for entry-level users.

I see every day that beginners can deal with complex editor UIs fairly well.
It's the programming and API complexities they struggle with.

LunyScript would encourage users to step up from mid-tier creation tools (Construct, GameMaker, Roblox).
Perhaps even straight from Scratch to Godot or Unity.

Developers at odds with both visual and conventional programming will find LunyScript just the right middle ground.

Perhaps over time we may even come to standardize visual programming itself?
But definitely other code-based, cross-engine frameworks. 
LunyCore provides the necessary abstractions.

I hope for an open ecosystem where we share patterns and plug'n'play recipes which just work, regardless of engine.

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

We're long past the days when we needed to count bytes and CPU cycles.

Our games are already full of layers of abstractions. 
Code we write in C# crosses the language boundary to C++ - this is rather costly. 
Yet it has proven to be extremely effective and efficient.

## It's going to be a maintenance nightmare!

The shared engine features have settled. 
They are so fundamental to every project that they resist change.

LunyScript will not chase fancy new features.
Anyone can add whatever they want however.

The engine adapters and observers are in separate, engine-specific repositories.
I needn't necessarily maintain every engine integration myself.


-----------------------------------

-----------------------------------
-----------------------------------
-----------------------------------
-----------------------------------




-----------
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


------
# The Solution

## The Code 

(insert code comparison here)

--------
CUT OR IMPROVE BELOW

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



## Developer Track Record

TBD my history
**2002-2009:** Shipped 3 major titles + 2 expansions using this approach
- Designer onboarding: days instead of weeks
- Code reuse: extensive shared logic libraries
- Maintainability: declarative code easier to debug and extend


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

You may notice hints of tried and true patterns such as Coroutines, Behaviour Trees, Statemachines. 
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
