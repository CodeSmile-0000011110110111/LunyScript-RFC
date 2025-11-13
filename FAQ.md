# Frequently Asked Questions (FAQ)

## Why not just learn one engine API properly?

Game programming is hard. It consistently ranks among the most challenging domains due to realtime programming, many cross-cutting concerns, and the sheer number of systems that interact. 

**LunyScript reduces that complexity** with high-level, declarative patterns. State machines and behavior trees instead of cargo cult coroutines. Fault-tolerant execution instead of null-references.

And then you also learned to program in two or more engines. That makes it all the more exciting!

---

## Coding isn't that hard anymore - everyone just uses AI anyway?

True, AI coding assistants are powerful learning tools. But they work best with simple, consistent APIs.

When a learner asks AI for help with Unity's `GetComponent<AudioSource>().PlayOneShot()` vs Godot's `$AudioStreamPlayer.play()` vs Unreal's audio system, the AI might suggest outdated methods, wrong engine conventions, or code that doesn't match what the learner sees in their editor.

With LunyScript's simple, fluent API, AI assistants give **reliable, working code that learners can actually understand and reason about.** `Audio.Play("sound")` reads like natural language, works in all engines, and helps beginners learn patterns instead of fighting syntax. AI becomes a learning amplifier instead of a source of confusion.

---

## Isn't LunyScript just adding another standard? (xkcd #927)

LunyScript is **training wheels**, not a competitor.

Engine API semantics are needlessly disparate: `BeginPlay`, `OnEnable`, `_enter_tree`. Every engine has the same lifecycle events. Their semantics differ, their purpose is uniform.

And their behavior? There's no contract. In which order children receive lifecycle events varies.

Recall how we used to put up with browser-specific code paths only to render content the same across browsers? Game engines are the same right now. The fragmented API landscape is entirely to their benefit, not ours.

LunyScript is **the uniform API** to help beginners get started and transition between engines — not replace them.

---

## Why not a general purpose framework, like Rx.NET?

General purpose frameworks are too abstract for beginners. They are loaded with CS jargon and concepts. LunyScript provides **high-level, fluent gameplay APIs** that read like game design intent.

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
When.Collision.With("ball")
    .Begins(Audio.Play("ball_tagged_loop"))
    .Ends(Spawn("sparkles").At(Other).Run(Wait.Seconds(2.5), Despawn()));
```

LunyScript code is **66% less verbose** than UniRx and reads like intent.

CS jargon is loading semantics with assumptions, raising questions:

> "Hmm .. select many an observable timer?"

If you read it out loud it just makes no sense!
That's where beginners and designers walk away!

---

## Why not write your own game engine (perhaps with SDL)?

LunyScript is for ease of entry and productivity in pro-tier game engines, and perhaps contributes to popularizing emerging engines. Creating a custom "Luny" game engine would defeat those purposes.

Currently, roughly **95% of Steam games published are made with Unity, Unreal, Godot, and proprietary engines.** This is where the learning pains are felt most.

Building a custom engine means rebuilding:
- Asset pipelines and importers
- Visual editors and workflows
- Cross-platform renderers
- Years of tooling and community support

LunyScript leverages all that existing infrastructure. Screw on those training wheels and start rolling with ease!

---

## Why not just use visual scripting?

Visual scripting tools (PlayMaker, Blueprints, etc.) are a popular choice for many non-programmers. But they are currently the **ONLY** choice for users intimidated by conventional programming.

Visual tools are criticized for being:
- Verbose and space inefficient
- Requiring high degree of UI interactions
- Painful to version control
- Difficult to code review
- Hard to refactor
- Challenging to document

LunyScript provides the same **high-level expressiveness and simplicity** with all the benefits of text-based code — a **viable alternative** for beginners & designers.

---

## It's going to be a maintenance nightmare!

The shared engine features and behaviors have settled. They are so fundamental to every project that they resist change.

LunyScript will not chase fancy features. Anyone can add whatever they want however.

The engine adapters and observers are in separate, engine-specific repositories. I needn't manage and maintain every engine integration myself.

**70% of LunyScript is fully portable**, providing the behavioral guarantees. The engine-native code is just 30% — mostly automatable glue.

**→ [Read the full maintenance strategy](MAINTENANCE.md)**

---

## Results won't replicate precisely!

They needn't. **Close enough is good enough.** The behavior contract is most important!

Even if you have to tweak every physics value once more, the logic itself is already running in the new engine, unchanged!

That's a lot more productive than having to start with _no code_, or worse: having to _verify and fix_ automatically converted code in a foreign environment.

---

## Like, how? Reflection? Source Generation?

Neither.

It's processing static graphs (FSMs, BTs) on engine heartbeat events via a central script runner.

Infrequent native events are observed and trapped for a single frame by handlers like `Collision.Begins`.

LunyScript handles 'structural changes' (eg destroy object) gracefully by activating associated events (ie `When.Self.Disables`, `When.Self.Destroys`) while deferring native execution to the 'end of frame' event.

A simple source generator will be used to create the API's static language bindings (C# to Lua).

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

**For LunyScript's target audience** (simple games, learning projects, prototypes), performance is not a limiting factor.

---

## More Questions?

**[Join the Discussions](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/)** to ask questions, share feedback, or propose ideas!
