# Frequently Asked Questions (FAQ)

## Isn't LunyScript just adding one more custom engine API?

LunyScript is stickier: It's **the uniform API** to bind them all!

Engine API semantics are needlessly disparate: `BeginPlay`, `OnEnable`, `_enter_tree`.
Every engine has the same lifecycle events. Their semantics differ, their purpose is uniform.

And their behaviour? There's no contract. In which order children receive lifecycle events varies.

Recall how we used to put up with browser-specific code paths only to render content the same across browsers? 
Game engines are the same right now. The fragmented API landscape is entirely to their benefit, not ours. 

## Isn't this just xyz Reactive?

It is reactive.

Let's compare it with general-purpose (but Unity-only) UniRx:

    this.OnCollisionEnterAsObservable()
        .Where(c => c.gameObject.CompareTag("ball"))
        .Do(_ => audioSource.Play())
        .Subscribe();

    this.OnCollisionExitAsObservable()
        .Where(c => c.gameObject.CompareTag("ball"))
        .SelectMany(_ => Observable.Timer(TimeSpan.FromSeconds(2.5)))
        .Do(_ => Instantiate(sparkles, other.position))
        .Subscribe(_ => sparkles.Despawn());

The same code in LunyScript:

    When.Collision.With("ball")
        .Begins(Audio.Play("ball_tagged_loop"))
        .Ends(Spawn("sparkles").At(Other).Run(Wait.Seconds(2.5), Despawn()));

LunyScript code is 66% less verbose than UniRx and reads like intent.

CS jargon is loading semantics with assumptions, raising questions:

> "Hmm .. select many an observable timer?"

If you read it out loud it just makes no sense!<br/>
That's where beginners and designers walk away!

## It's going to be a maintenance nightmare!

The shared engine features and behaviours have settled. They are so fundamental to every project that they resist change.

LunyScript will not chase fancy features. Anyone can add whatever they want however.

The engine adapters and observers are in separate, engine-specific repositories. I needn't manage and maintain every engine integration myself.

70% of LunyScript is fully portable, providing the behavioral guarantees. The engine-native code is just 30% - mostly automatable glue.

## Results won't replicate precisely!

They needn't. Close enough is good enough. The behaviour contract is most important!

Even if you have to tweak every physics value once more, the logic itself is already running in the new engine, unchanged!

That's a lot more productive than having to start with _no code_, or worse: having to _verify and fix_ automatically converted code in a foreign environment.

## Like, how? Reflection? Source Generation?

Neither.

It's processing static graphs (FSMs, BTs) on engine heartbeat events via a central script runner.

Infrequent native events are observed and trapped for a single frame by handlers like `Collision.Begins`.

LunyScript handles 'structural changes' (eg destroy object) gracefully by activating associated events (ie `When.Self.Disables`, `When.Self.Destroys`) while deferring native execution to the 'end of frame' event.

A simple source generator will be used to create the API's static language bindings (C# to Lua, C# to GDScript).

## Any abstraction adds overhead! Games need performance!

We're long past the days when we needed to count bytes and CPU cycles. Our games are already full of layers of abstractions.

Code we write in C# crosses the language boundary to C++ - this is rather costly. It still worked wonderfully for Unity. Same with Blueprints: we know it's between 100x to 1,000x slower than C++ yet we use it extensively.

LunyScript, through its central processing concept and internal caching, may even prove to be faster when compared to ubiquitous uses of `GameObject.Find("")` or the commonplace trainwrecks:

    if (gameObject.transform.GetComponent<Rigidbody>() != null)
    {
        gameObject.transform.GetComponent<Rigidbody>().linearVelocity = 0;
        gameObject.transform.GetComponent<Rigidbody>().angularVelocity = 0;
        gameObject.transform.GetComponent<Rigidbody>().Sleep();
    }

As seen on a worryingly regular basis.
