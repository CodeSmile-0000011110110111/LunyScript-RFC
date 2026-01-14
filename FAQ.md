# Frequently Asked Questions (FAQ)

## Table of Contents

- [Why not just learn the engine API properly?](#why-not-just-learn-the-engine-api-properly)
- [We only use one engine - why portable code?](#we-only-use-one-engine---why-portable-code)
- [Coding isn't that hard anymore - everyone just uses AI anyway?](#coding-isnt-that-hard-anymore---everyone-just-uses-ai-anyway)
- [Isn't LunyScript just adding another standard?](#isnt-lunyscript-just-adding-another-standard-xkcd-927)
- [Why not a general purpose framework, like Rx.NET?](#why-not-a-general-purpose-framework-like-rxnet)
- [Why not write your own game engine (perhaps with SDL)?](#why-not-write-your-own-game-engine-perhaps-with-sdl)
- [Why not just use visual scripting?](#why-not-just-use-visual-scripting)
- [It's going to be a maintenance nightmare!](#its-going-to-be-a-maintenance-nightmare)
- [Results won't replicate precisely!](#results-wont-replicate-precisely)
- [Like, how? Reflection? Source Generation?](#like-how-reflection-source-generation)
- [Any abstraction adds overhead! Games need performance!](#any-abstraction-adds-overhead-games-need-performance)
- [Questions not answered?](#more-questions)

## Why not just learn the engine API properly?

Game development is hard. Especially so for beginners. 

Game programming consistently ranks among the most challenging domains due to **realtime** requirements, many **multi-domain, cross-cutting concerns**, and the sheer number of systems that interact. Engine APIs are accordingly complex, with roughly between 15k (Godot) and 120k (Unreal) user-facing endpoints (types, methods, properties).

**LunyScript reduces that complexity** with high-level, declarative patterns because follow-along copy-paste tutorials aren't enabling real growth. In fact, we have a name for this pervasive problem: **tutorial hell**. 

Furthermore, gameplay programming at large is inherently engine-agnostic, yet we continue to implement it using engine-native code. Reinventing gameplay wheels across engines is commonplace. Game developers are prone to NIH (Not Invented Here) - a culture that has served as an accessory to game engines' strong lock-in.
---

## We only use one engine - why portable code?

We use one engine for one project at a time. But hardly anybody sticks to just one engine forever.

Especially beginners struggle to 'make the right choice' as they need to make a pick before they truly understand why.
The time investment quickly locks them into that one engine. Portable code allows them to trial multiple engines more easily, with less 'sunk cost'.

For more experienced users, switching engines is still a time-consuming task, and requires fighting muscle memory. Being able to quickly be productive elsewhere helps both the developer and lesser known engines.

Lastly, agencies around the world often use multiple engines serving diverse clients. For them, creating a shared framework poses many challenges. Copy/paste cherry-picking between projects is rather commonplace. LunyScript's block-based programming concept provides exactly the cross-engine framework they need for 3d realtime applications typically low in interactivity, but high in fidelity.

Finally, even within one engine being able to do simple things with simple code can be a huge productivity boost.

---

## Coding isn't that hard anymore - everyone just uses AI anyway?

AI coding assistants can be powerful learning tools, but only with understanding what gets generated. 
Just like us humans, AIs work better with clear and consistent APIs.

When a learner asks AI for help with Unity's `GetComponent<AudioSource>().PlayOneShot()` vs Godot's `$AudioStreamPlayer.play()` vs Unreal's audio system, the AI might suggest outdated methods, wrong engine conventions, or code that doesn't match what the learner sees in their editor.

With LunyScript's simple, fluent API, AI assistants give **reliable, working code that learners can actually understand and reason about.**

---

## Isn't LunyScript just adding another standard? ([xkcd #927](https://xkcd.com/927/))

LunyScript is not another _re-inventing wheels_ framework that already exists in another engine. It sits atop of engines. Tt's **the only framework** that has any chance of **becoming a standard**. 

Engine API semantics are needlessly disparate: `BeginPlay`, `OnEnable`, `_enter_tree`. Every engine has the same lifecycle and gameplay events/APIs. Their semantics differ, their purpose is uniform.

LunyScript starts as **the uniform API** to help beginners get started and transition between engines. The Scratch for game engines. But it's also a Developer SDK which can give us more power than we ever imagined we could have.

---

## Why not a general purpose framework, like Rx.NET?

General purpose frameworks are too abstract for beginners. Many frameworks are often loaded with CS jargon and concepts, too. 
LunyScript provides **high-level, fluent gameplay APIs** that read like game design intent.

Let's compare with general-purpose (but Unity-only) UniRx:

```csharp
this.OnCollisionEnterAsObservable()
    .Where(c => c.gameObject.CompareTag("ball"))
    .Do(_ => audioSource.Play())
    .Subscribe();

this.OnCollisionExitAsObservable()
    .Where(c => c.gameObject.CompareTag("ball"))
    .SelectMany(_ => Observable.Timer(TimeSpan.FromSeconds(2.5)))
    .Do(_ => Instantiate(sparkles, other.position))
    .Subscribe(_ => sparkles.Despawn());
```

The same code in LunyScript:

```csharp
When.CollisionWith("ball")
    .Begins(Audio.Play("ball_tagged_loop"))
    .Ends(Spawn("sparkles").At(Other).Run(Wait.Seconds(2.5), Despawn()));
```

LunyScript code is **66% less verbose** than UniRx and reads like intent.

CS jargon is loading semantics with assumptions, raising questions:

> "Hmm .. select many an observable timer?"

If you read it out loud it just makes no sense!
That's where beginners and designers walk away!

---

## Why not just use visual scripting?

Visual scripting tools (PlayMaker, Blueprints, etc.) are a popular choice for many non-programmers. But they are currently the **ONLY** choice for users intimidated by conventional programming.

Visual tools are rightfully criticized for being:
- verbose and space inefficient
- heavy on unproductive UI interactions
- hard to refactor
- painful to version control
- difficult to code review
- challenging to document

LunyScript provides the same **high-level expressiveness and simplicity** with all the benefits of text-based code — a **viable alternative** for beginners & designers.

---

## It's going to be a maintenance nightmare!

The shared engine features and behaviors have settled. They are so fundamental to every project that engines resist changing them. 

LunyScript will not chase fancy features. Anyone can add whatever they want however.

The engine adapters and observers are in separate, engine-specific repositories. I needn't manage and maintain every engine integration myself for all eternity.

**Upwards of 70% of LunyEngine is fully portable**. The engine-native code is mostly automatable glue, simple API mappings and a couple utility methods.

---

## Results won't replicate precisely!

They needn't. **Close enough is good enough.** The behavior contract is most important!

Even if you have to tweak every physics value once more, the logic itself is already running in the new engine, unchanged! 

That's a lot more productive than having to start with _no code_, or worse: having to _verify and fix_ automatically converted code in a foreign environment.

And it's really just physics that will cause gameplay to differ. Perhaps in the future LunyEngine may even provide its own physics simulation.

---

## Like, how? Reflection? Source Generation?

Neither.

LunyScript is processing static graphs (FSMs, BTs) on engine heartbeat events via a central script runner.

Infrequent native events are observed and trapped for a single frame by handlers like `Collision.Begins`.

LunyScript handles 'structural changes' (eg destroy object) gracefully by activating associated events (ie `When.Self.Disables`, `When.Self.Destroys`) while deferring native execution to the 'end of frame' event.

In the future, a source generator may be used to create the API's static language bindings (C# to Lua).

---

## Any abstraction adds overhead! Games need performance!

We're long past the days when we needed to count bytes and CPU cycles. Our games are already full of layers of abstractions.

Code we write in C# crosses the language boundary to C++ — this is rather costly. It still worked wonderfully for Unity. Same with Blueprints: we know it's between **100x to 1,000x slower** than C++ yet we use it extensively.

LunyScript, through its central processing concept and internal caching, may even prove to be faster when compared to ubiquitous uses of `GameObject.Find("")` or the commonplace copy-pasta trainwrecks:

```csharp
if (gameObject.transform.GetComponent<Rigidbody>() != null)
{
    gameObject.transform.GetComponent<Rigidbody>().linearVelocity = 0;
    gameObject.transform.GetComponent<Rigidbody>().angularVelocity = 0;
    gameObject.transform.GetComponent<Rigidbody>().Sleep();
}
```

As seen on a worryingly regular basis.

**For LunyScript's target audience** (simple games, learning projects, prototypes, details), performance is not a limiting factor.

---

## Why not write your own game engine (perhaps with SDL)?

LunyScript is for ease of entry and productivity in pro-tier game engines, and perhaps contributes to popularizing emerging engines. Creating a custom "Luny" game engine would defeat those purposes.

Currently, roughly **95% of Steam games published are made with Unity, Unreal, Godot, and a few AAA proprietary engines.** Among the first three is where the learning pains are felt most.

Building a custom engine means rebuilding:
- Asset pipelines and importers
- Visual editors and workflows
- Cross-platform renderers
- Years of tooling and community support

---

## Questions not answered?

**[Join Discord](https://discord.gg/EkwNb4rB7W)** to ask questions, share feedback, or propose ideas!
**[Join Patreon](https://www.patreon.com/CodeSmile) for news and updates.
