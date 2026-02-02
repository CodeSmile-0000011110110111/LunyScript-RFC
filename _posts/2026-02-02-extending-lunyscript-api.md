---
layout: post
title: "LunyScript API: User Extensions"
date: 2026-02-02
categories: [design]
tags: [development, architecture]
#featured_image: ../media/LunyTestingSolution.png
---

# LunyScript API: User Extensions

I have published a design article about [how to extend the LunyScript API](/docs/ExtendingLunyScriptApi). I'll provide a brief summary here.

## A Basic LunyScript

First, an up-to-date example of the current LunyScript API. 

This script logs a string every update. It's complete as is, nothing missing. To make it work, the user merely has to have an object of the same name `LogUpdate` in the active scene and it will start logging every update.

    public class LogUpdate : LunyScript.LunyScript
    {
        public override void Build()
        {
            When.Self.Updates(Debug.Log("updating"));
        }
    }

There are generally three ways to add your own API to LunyScript in such a way that it feels "native".

## Static Factory Class (easiest)

To share scripts with others frictionless, you can write a static class with API methods without a namespace:

    public static class MyExtension
    {
       public static IScriptActionBlock DoSomething(string str) => DoSomethingBlock.Create(str);
    }

This API is automatically usable in any LunyScript-derived class in the same project:

    // Usage in a script
    public class DoSomething : LunyScript.LunyScript
    {
        public override void Build()
        {
            When.Self.Updates(MyExtension.DoSomething("Hello, Engine!"));
        }
    }

To avoid global visibility, move the API implementation to a namespace, for instance `namespace MyLunyScript;`. Then you'd either have to add a `using MyLunyScript;` statement to scripts, or write the fully qualified name:

    When.Self.Updates(MyLunyScript.MyExtension.DoSomething("Hello, Engine!"));

Static factories are very beginner-friendly and share easily. 

However they do appear everywhere in autocompletion suggestions (Intellisense). In fact, users can call the static method even outside of LunyScript instances.

## Common Base Class (avoid)

For a frightening large number of developers, subclassing is the first (and only) thing they can think of. Please [learn about composition](https://en.wikipedia.org/wiki/Composition_over_inheritance) if you inherit-by-default. ;)

The subclassing approach follows the same fluent API pattern LunyScript uses via properties and stack-allocated API implementations: 

    public class MyLunyScript : LunyScript.LunyScript
    {
        // this is the name of your Api
        public MyExtensionApi MyExtension => new();
    }

The implementation of the API is in a `readonly struct` (no garbage) and ideally in the same file if not a nested type of `MyLunyScript`:

    // MyExtension API implementation
    public readonly struct MyExtensionApi
    {
        // an extension method, they have to return an interface derived from IScriptBlock
        public IScriptActionBlock DoSomething(string str) => DoSomethingBlock.Create(str);
    }

You can then subclass from MyLunyScript and use your own API:

    // Usage in a script
    public class DoSomething : MyLunyScript
    {
        public override void Build()
        {
            When.Self.Updates(MyExtension.DoSomething("Hello, Engine!"));
        }
    }

The subclassing solution is **not sharing-friendly** and requires all extension code to route through a single base type. 

Its a workable solution for a studio or faculty at most, but forcing other users to inherit from **your** base class is intrusive and locks them in. 

Please don't share base-class API extensions with the public! 

## Interface Mixins (recommended)

This is the preferred, professional way to extend LunyScript. Instead of a subclass defining the API property you now write an equally straightforward interface:

    public interface IMyExtensionApi
    {
        MyExtensionApi MyExtension => new MyExtensionApi();
    }

The API implementation remains the same, and again it should be in the same file as the interface, and it can even be nested inside the interface type. Same implementation as before, for reference:

    // same as above: MyExtension API implementation
    public readonly struct MyExtensionApi
    {
        public IScriptActionBlock DoSomething(string str) => DoSomethingBlock.Create(str);
    }

You can then granularly make this API available by implementing the extension interface in a LunyScript. API usage is identical to the first two examples:

    // Usage in a script
    public class MyScript : LunyScript, IMyExtensionApi // <== added extension interface
    {
        public override void Build()
        {
            When.Self.Updates(MyExtension.DoSomething("Hello, Engine!")); // same as earlier!
        }
    }

In scripts without the extension interface, that part of the API will not appear in autocompletion suggestions.

The interface and API implementation scripts can easily be shared with others, and they can choose per script which parts of the API to use. Highly recommended for sharing and instrumental in teaching users pick their extension APIs by adding interfaces to LunyScripts. 

## Conclusion

I could have just mentioned the preferred solution but I wanted to get across the value of teaching LunyScript provides even outside the scope of its API. With just these examples you can cover a wide range of software engineering topics:

- fluent API design
- composition vs inheritance
- static classes
- abstract base classes (and their coupling effects)
- namespaces
- type discovery via autocompletion suggestions

And specific to C#:
- C# static extension methods
- struct vs class / stack vs heap allocations
- nested types

I'm looking forward to those instructive lessons. :)
