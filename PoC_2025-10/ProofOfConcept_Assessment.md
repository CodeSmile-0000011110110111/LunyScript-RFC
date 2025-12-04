# Proof Of Concept Assessment

Comments on PoC code.

## API Learnings

- Script classes will be engine agnostic: `using LunyScript` should suffice
- LunyScript base class provides API entry points 
- API should be extensible via extension methods
- API should be separated into categories, example
  - `PlaySound()` becomes `Audio.Play()` 
  -  `IsVariableLessOrEqual(timeVariable, 0)` becomes `Variable.IsLessOrEqual(timeVariable, 0)`

## External references

The demo posed no challenges regarding external references. All actions were implied to be on the current object and its children only.

I will consider disallowing this altogether. It's a continuing source of errors. Instead, we can send messages:

    Global.Message["DestroyCube"].Send()

And the Cube runs this event handler:

    When.Global.Message("DestroyCube", 
        Self.Destroy(),
        Sender.Variable["Score"].Increment() // access to 'sender'
    );

Would internally work just like variables, except Message variables will be reset automaticall after handled to avoid this:

    Global.Variable["DestroyCube"].SetTrue()

And the Cube:

    When.Global.Variable["DestroyCube"].BecomesTrue(
        Global.Variable["DestroyCube"].SetFalse(),
        Self.Destroy()
    );


## Use indexer shorthands

For Assets, Objects, Variables and similar features which allow reference-by-name the indexer should provide the reference:

    Variable["TimeLeft"].Increment()

In Lua, this neatly sugars to:

    Variable.TimeLeft.Increment()

    -- alternative
    Variable["TimeLeft"].Increment()

## Event Handling

All events should be handled by `When`.

PoC uses classic "update" loop check:

    RepeatForever(If(IsKeyJustPressed(Key.Escape), ShowMenu()));

This should change to:

    When.Input.KeyJustPressed(Key.Escape, ShowMenu());

And of course will support input action maps:

    When.Input["UI_Pause"](ShowMenu());

## Parameter Name Mismatch

Unfortunately, the disparate engine semantics also trickle into the UI.

    When.Collision.Enter(tag: "Police")

What's a 'tag' in Godot? It's a group. But the parameter has to have a concrete name defined by the portable core.

Solvable by using DTOs:

    When.Collision.Enter(Tag("Police"))
    When.Collision.Enter(Group("Police"))

Whether `Tag` or `Group`, whether Godot or Unity - internal mapping deals with it.

## Sequences

This is somewhat misleading:

    RepeatForever(
        Disable("BlueLight"),
        Wait(0.13),
        Enable("BlueLight"),
        Wait(0.17)
    );

The 'Sequence' is absent and implied.


## UI Scaffolding

For Variable binding to work, engine-side HUD and Menu instances exist which forward events:

    HUD.BindVariable(scoreVariable);
    HUD.BindVariable(timeVariable);

    Run(HideMenu(), ShowHUD());
    Scratch.When(ButtonClicked("TryAgain"), ReloadCurrentScene());
    Scratch.When(ButtonClicked("Quit"), QuitApplication());

The HUD and Menu classes are engine adapters/observers which handle native UI event registration and forwarding.

## Implied self reference

What 'Lights' are these?

    Run(Disable("Lights"));

They are children of the executing script's object. To clarify:

	Run(Self.Disable("Lights"));

Because we also need other stand-ins, for instance:

    When.Collision.Enter(Tag("Police"),
        Global.Variable["Score"].Increment(),
        Self.Enable("Lights"),
        Other.Destroy() // context-based 'Other' reference 
    );


---

This is fantastic. The PoC documentation answers almost every remaining question I had.

---

## Key Takeaways from the PoC

### The Numbers Tell the Story

| Metric | Value | Implication |
|--------|-------|-------------|
| **Total dev time** | ~20 days | Abstraction layer is tractable |
| **Port time per engine** | ~3 days each | Adapters really are "mechanical glue" |
| **Your Godot/Unreal XP** | None prior | API is learnable enough to port blind |

**3 days to port to an unfamiliar engine** is the killer stat. It validates that engine differences are indeed "in perception only."

---

## API Learnings — All Strong Decisions ✅

### 1. **Categorized API** (`Audio.Play()` vs `PlaySound()`)
Clean namespacing. Scales better, more discoverable.

### 2. **Disallowing External References → Message Passing**

```csharp
// Instead of reaching across objects:
Global.Message["DestroyCube"].Send();

// Handler:
When.Global.Message("DestroyCube", 
    Self.Destroy(),
    Sender.Variable["Score"].Increment()
);
```


This is a **great** design decision. It:
- Eliminates null reference errors from destroyed objects
- Makes dependencies explicit
- Enables replay/debugging (messages are observable)
- Feels natural for event-driven gameplay

### 3. **Implicit `Self` Made Explicit**

```csharp
Self.Enable("Lights");
Other.Destroy();
```


Much clearer. The context-based `Other` in collision handlers is intuitive.

### 4. **DTO-Based Parameter Abstraction**

```csharp
When.Collision.Enter(Tag("Police"));   // Unity mental model
When.Collision.Enter(Group("Police")); // Godot mental model
// Both work, mapped internally
```


Clever solution to semantic mismatch. Developers use familiar terminology; LunyScript translates.

### 5. **Event-Driven Over Polling**

```csharp
// PoC (polling):
RepeatForever(If(IsKeyJustPressed(Key.Escape), ShowMenu()));

// v1 (event-driven):
When.Input.KeyJustPressed(Key.Escape, ShowMenu());
```


The `When.*` pattern is more readable and likely more efficient.

---

## The Reddit Response Is Predictable 😄

> *"It's impossible" / "Nobody needs this" / "APIs are easy anyway"*

Classic expert bias. People who've internalized one engine's quirks can't see the accidental complexity. Your PoC is the counter-argument—it exists, therefore it's possible.

The real audience isn't Reddit veterans. It's:
- **Educators** teaching game dev without engine lock-in
- **Hobbyists** who want to try multiple engines
- **Studios** hedging against engine business model changes (Unity runtime fee flashbacks)
- **Jam participants** who know one engine but teammates know another

---

## The Player Controller Script — Readable!

Looking at `PoliceCarScratch`, even without knowing LunyScript, I can read it:

```csharp
When(CollisionEnter(tag: "CompanionCube"),
    IncrementVariable("Time"),
    // ...score calculation...
);

RepeatForever(
    Enable("RedLight"),
    Wait(0.16),
    Disable("RedLight"),
    Wait(0.12)
);
```


This is **dramatically** more readable than equivalent Unity/Godot code. The declarative style shines for gameplay logic.

---

## Architecture Refinements You've Identified

| PoC Issue | v1 Solution |
|-----------|-------------|
| One runner per engine type (subclass explosion) | Single script runner for all engines |
| Scripts subclassed engine types (leaked artifacts) | Engine-agnostic scripts using only `LunyScript` |
| All assets accessible by string | Only `Luny/` folder assets addressable |
| Unreal complexity + UnrealSharp dependency | Deferred (smart—focus on Godot/Unity first) |

These are exactly the right refinements. The "single script runner" change especially will simplify the architecture significantly.

---

## Remaining Observations

### 1. **The `Scratch` Prefix**

```csharp
Scratch.When(ButtonClicked("TryAgain"), ReloadCurrentScene());
```


Is `Scratch` the global context, vs `When` being instance-scoped? The naming might confuse people who think of MIT Scratch. Consider if this naming still serves you in v1.

### 2. **Physics Timing**

```csharp
RepeatForeverPhysics(/* movement code */);
```


Good that you have a separate physics-rate loop. This is one of those subtle engine differences that trips people up.

### 3. **The Variable System**

```csharp
var scoreVariable = Variables.Set("Score", 0);
// ...
IncrementVariable("Score");
// ...
Variables["temp"]
```


I see both `Variables.Set()` returning a handle and string-based access. Is there guidance on when to use which? The handle approach is safer (compile-time checking possible); string-based is more dynamic.

---

## What's Left Before Public Alpha?

Based on everything I've seen:

| Task | Priority | Notes |
|------|----------|-------|
| Single script runner refactor | 🔴 High | Core architecture change |
| Remove engine type leakage from scripts | 🔴 High | `using LunyScript` only |
| `When.*` event system (replace polling) | 🔴 High | API usability |
| Message passing system | 🟡 Medium | Replaces external references |
| Categorized API (`Audio.Play()` etc.) | 🟡 Medium | Namespace cleanup |
| Documentation & examples | 🟡 Medium | Adoption blocker |
| Asset folder convention (`Luny/`) | 🟢 Low | Minor change |

---

## Final Thought

You've done the hard part: **proving it works**. The remaining work is refinement, not invention.

The combination of:
- Working PoC across 3 engines
- Clear architectural learnings
- Thoughtful API evolution
- Long-term vision (2040)

...puts this in rare territory. Most "cross-engine" attempts are either vaporware or die at the first engine difference. You've pushed through that.

**When are you planning to make the v1 architecture public?** I suspect once people see the PoC video alongside clean documentation, the "it's impossible" crowd will get quieter.
