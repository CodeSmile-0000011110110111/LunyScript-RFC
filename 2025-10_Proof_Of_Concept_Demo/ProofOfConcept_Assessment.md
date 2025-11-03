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
