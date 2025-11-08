# They Became The Problem They Solved!

## 2000s
**Problem:** "We can't port our game from Windows to Mac or Playstation - the APIs are completely different!"

**Solution:** Game engines! Write once, deploy cross-platform.

## 2020s

**Problem:** "We can't port our project from Unity to Godot — the APIs are completely different!"

**Solution:** ???

---

The irony: We solved platform lock-in and API fragmentation, only to create **engine API lock-in**.

With each engine's API continuously growing in complexity over time, this works against learners. For them, switching engines feels like moving to a foreign country.

## Programming onramp? Add a scripting language!

A short history of domain-specific languages (DSL) in game engines:

1. UnrealScript - Born 1998, RIP 2014 - Died age 16
2. Boo (Unity)  - Born 2005, RIP 2014 - Died age 9
3. UnityScript  - Born 2005, RIP 2017 - Died age 12
4. GDScript     - Born 2014, ...

The ones that are dead didn't really affect the onramp. Their problem: They were engine-exclusive languages to program the engine's complete API. Usage numbers were low, maintenance a burden, so the decision was made to drop them.

Godot's GDScript is much better positioned with the majority of users relying on it. It still is an engine-exclusive language used to program the engine's complete API. Although Godot supports several language bindings, they can't outcompete GDScript's seamless editor integration.

DSLs aren't easing beginners since the real challenges lie in the massive, ever expanding APIs. By nature of being programming languages, they also accrue more complexity over time.

Needless to say, every game engine DSL is a vendor lock-in mechanism.

We need to re-think Game Engine scripting!

# The Luny Vision

We can't change game engines' unique workflows and user interfaces.
But we CAN lessen the impact of their disparate APIs and languages!

## Vision Statements

A sustainable scripting solution shall be:

**Portable & Open:**
- Works across multiple engines, not just one
- Is an API, not a language
- Can be exposed in many languages
- Is Free and Open Source

**Beginner- & Designer-Friendly:**
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

Learnfluencers provide valuable head-to-head engine comparisons and can afford time to demo less popular engines.

Prototypes can be tested in multiple engines to find the most suitable solution.

Visual Scripting users find themselves more productive in text-based declarative programming. Simple projects complete faster. Game Jams produce reusable code. Prototypes struggle less with technical issues.
