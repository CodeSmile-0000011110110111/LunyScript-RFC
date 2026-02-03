---
layout: post
title: "Breaking: 100 Stars Milestone! :)"
date: 2026-02-03
categories: [milestones]
tags: [community]
featured_image: ../media/posts/2026-02/one-hundred-stars.png
---

# Breaking: 100 Stars Milestone! :)

Happy to see this today:

![one-hundred-stars.png](/media/posts/2026-02/one-hundred-stars.png)

Just as happy as when [LunyScript reached 50 stars](/milestones/2025/12/15/milestone-50-stars.html):

![I react to 50 stars! Short.gif](/media/I%20react%20to%2050%20stars%21%20Short.gif)

Admittedly, I have since adjusted the 100+ stars milestone dates. I pushed this milestone from Jan 15th up to Feb 02 due to the post-Xmas slump. And because I didn't further promote the project on social media - I'm afraid of hyping it up before I even got any funding secured.

Nevertheless, it's going straight up compared to my other public repositories:

![one-hundred-star-history.png](/media/posts/2026-02/one-hundred-star-history.png)

## Quick Progress Update

I mostly focus on workflow and development infrastructure right now. I want to start running once the project gets greenlit.

### Single Solution, All Engines

I now work in a single solution containing both engine-agnostic and engine-native (Godot, Unity) code. It compiles and runs tests!

![LunyUnitTestSolution.png](/media/posts/2026-02/LunyUnitTestSolution.png)

I'm mocking all the engine APIs LunyEngine uses, with contract tests verifying engine behaviour (eg order of events). The native layers are ultra-thin anyway, so AI is quick to generate mocks for them even when flying blind: AI just knows engine core behaviours and APIs. 

This warrants a separate post -> coming soon.

### Duck-Typing Types

LunyEngine now has variant `Variable` and `Number` structs representing _duck-typed_ values. 

The sizeless `Number` struct is internally a `double`. `Variable` can hold either a number, a boolean, or a string. Both perform comparisons, arithmetics, implicit conversions just as you would expect from duck-typed values. 

This is modeled after Lua's behaviour, and to complete this there's also a `Table` collection type holding variables. 

I included the [Lua-CSharp](https://github.com/nuskey8/Lua-CSharp){:target="_blank"} project (Lua implemented entirely in C#, faster than MoonSharp) and prepared a Code Generator project to create the Lua bindings. Luny's `Number`/`Variable` types aren't using Lua - the intention is to make them convert from Lua's types (`LuaValue`, `LuaTable`). 

This also warrants another post.

### LunyScript: Variable, Flow and Logic Blocks

Variables can now be scripted:

    Var.Set("name", Vars["other"])
    Var.Inc("name")
    Var.Dec("name")
    Var.Add("name", Vars["other"])
    Var.Sub("name", Vars["other"])
    Var.Mul("name", Vars["other"])
    Var.Div("name", Vars["other"])
    
    Var.Is("name").EqualTo(Vars["other"])
    Var.Is("name").GreaterThan(Vars["other"])

You can work with variables in blocks quite naturally:

    var regen = Vars["regen-rate"];
    var hitpoints = Vars["hp"];

    When.Self.Updates(hp.Add(regen)); // regenerate hitpoints

I added essential flow constructs to LunyScript block execution:

    If(conditions).Then(actions)
    .ElseIf(conditions).Then(actions)
    .Else(actions)

    For(n).Do(actions)     // runs Do() n times: from 1 to n
    For(-n).Do(actions)    // runs Do() n times: from n to 1
    For(n, 2).Do(actions)  // runs Do() with n = 1, 3, 5, 7, ..
    For(-n, 2).Do(actions) // runs Do() with n = .., 8, 6, 4, 2

    While(conditions).Do(actions)

While loops won't 'freeze' the editor or game because they have a configurable "max iterations" - which throws an exception if the max is hit (default: one million iterations).

And there are also logical operators now:

    AND(conditions)
    OR(conditions)
    NOT(condition)

    // example:
    OR(c1, AND(c2, NOT(c3)))

### GDSharp - GDScript for C# developers

I kept losing track looking at all the _snake_case and SHOUTING_CONSTANTS in my plugin.gd. It felt like an awful lot of noise to me.

So I started an experiment, had AI wrap this up for me and provide me with GDScript wrappers that follow C# guidelines.

The result is [GDSharp (GD#)](https://github.com/CodeSmile-0000011110110111/GDSharp){:target="_blank"}, here's a contrived example:

    @tool
    extends EditorPlugin
    
    # usings
    const File = Gds.File

    const SomePath = "scenes/main.tscn"

    func DoSomethingWithFile() -> void:
        var file = File.OpenReadable(SomePath)
        if not file:
            return
    
        var content = File.ReadAllText(file)
        File.Close(file)
        
        file = File.OpenWritable(path)
        if file:
            File.WriteAllText(file, newContent)
            File.Close(file)

It wraps just what I needed but I hope GDSharp can become an 'alternative fact' for Godot developers. I'm sure developers with C# experience who will be inclined, if not forced, to use GDScript will find GDSharp more relatable when it follows 'sane' (known) style guides. 

Might also warrant a separate post.

### Misc Updates

A minimal asset loader also exists for both engines which currently loads "prefab" types by path. This fills the last gap required to build out the actual LunyScript API and make it functional.

I've also added a Roslyn Analyzer project. This will be instrumental for [custom extensions to the LunyScript API](/design/2026/02/02/extending-lunyscript-api.html). 

For "project management" I experimented with **logseq** but ultimately went back to a simple text-based tasklist. AI helps to keep this organized.

Lastly, I renamed the example projects before anyone starts cloning them. "LunyScratch" is now "LunyScript". The Godot and Unity example project repositories can be found here:

- [LunyScript_Examples_Godot](https://github.com/CodeSmile-0000011110110111/LunyScript_Examples_Godot){:target="_blank"}
- [LunyScript_Examples_Unity](https://github.com/CodeSmile-0000011110110111/LunyScript_Examples_Unity){:target="_blank"}
