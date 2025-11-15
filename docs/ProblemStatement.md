# Problem Statement

## The Core Problem

**Learning game programming requires mastering complex, engine-specific APIs** before one can begin to understand game development concepts. 

The learning curve for **realtime event-driven, cross-domain programming** is extremely steep, but without programming all efforts are in vain. This creates **artificial barriers** for talented, creative people.

Professional-use engines create a strong lock-in effect due to their highly unique APIs - which essentially perform the same high-level tasks. These **APIs are inconsistent legacy artifacts** written in stone, and for maximum flexibility. 

But engines **diverge** only in concepts and features that **hardly matter** to the **great majority** of games and their developers, especially beginners! The choice is down to personal preference, promises, and identity. 

Game engines are **identity forming status symbols**: FOSS vs AAA vs Best-Bet or underdog vs bleeding-edge vs pragmatism.
They create **religious identity** due to the existential pain of switching (sunk cost bias) and their aspirational promise ("make AAA games"). 
This further **discourages cross-engine learning** and cross-engine abstractions.

Cross-Engine integrated APIs do not exist because experienced developers don't value them or seem far fetched (complexity bias), while beginners don't have the power and insight to demand them. Engines **intentionally encourage not to abstract**, not because of technical necessity.

**Beginners have no lobby.** They have to get started running, or else get locked in the **tutorial hell comfort zone**. There is no **safe 'learn game engines' sandbox** to grow up in! A gap filled by mid-tier tools, where commercial products (Roblox, GameMaker, Construct) dominate over FOSS alternatives (GDevelop, Armory3D).

There's a wider implication: **Games are the single strongest motivator** that brings young people **into programming**. Every other programmer **in non-game fields** will cite 'games' as having sparked their interest. Game engines are **gateways to programming literacy**.

## The Road To A Solution

With Godot on the rise, now is the time to start unifying gameplay programming on a high level. Declarative, with patterns: for beginners and designers alike. With code and skill transfer between engines.

Unity and Godot first, then more C# engines. Eventually a C++ port, using Lua as the truly cross-engine programming language.

---

## Table of Contents

- [What We Know](#what-we-know)
  - [1. API Fragmentation: The Root Problem](#1-api-fragmentation-the-root-problem)
  - [2. The Engine Lock-In Effect](#2-the-engine-lock-in-effect)
  - [3. Visual Scripting Isn't The Catch-All Solution](#3-visual-scripting-isnt-the-catch-all-solution)
  - [4. Learning Support Is Inadequate](#4-learning-support-is-inadequate)
  - [5. Constraints Enable Creativity](#5-constraints-enable-creativity)
- [The Gap to a Better Outcome](#the-gap-to-a-better-outcome)
- [Why This Matters](#why-this-matters)
- [How LunyScript Addresses This](#how-lunyscript-addresses-this)
- [Secondary Benefits](#secondary-benefits)

---

## What We Know

### 1. API Fragmentation: The Root Problem

- Unity, Godot, Unreal solve **identical problems** with **completely different** APIs
- Very **different code**`GetComponent()`vs`get_node()`but **same results**
- Switching engines means relearning implementation patterns => **wasted effort**
- Engine **switching costs** are **very high**, and exponentially so for beginners

The irony: Game engines became popular because they solved API/platform fragmentation. Now their fragmentation has become a problem in itself.

---

### 2. The Engine Lock-In Effect

**Beginners:**
- Must learn multiple domains simultaneously => **high cognitive demands** paired with **huge interest** leads to widespread **tutorial hell** ('learning' lock-in)
- Premature **commitment** to one engine **before understanding the choice**
- Choice overload: Heavily fragmented game engines / creation tools (100-200), but only 2-3 provide tangible career opportunities

**Experienced Developers:**
- Still **significant time investment** to switch engines
- Switching engines is a **career risk**, not an opportunity! Most job offers ask for 2+ years experience in **specific engine**
- Forced paradigm shifts cause sudden **loss of productivity** => developer goes back (or wishes to do so)

**Ecosystem:**
- Knowledge and tutorials **don't transfer**
- **Communities fragment** by engine choice, even language preference
- **Game code** is either **engine-locked** or requires **significant integration effort**

**Culture:**
- **Not-Invented-Here**: e.g. dozens of character controllers available, developers still write their own => **Reinventing gameplay wheels is commonplace!**

---

### 3. Visual Scripting Isn't The Catch-All Solution

**What Works:**
- **High-level visual tools** (PlayMaker, Game Creator) are **popular paid assets** because they provide declarative, intent-revealing patterns at a high level
- **Success** comes from **hiding complexity** and the **promise** of being simpler

**What Doesn't Work:**
- Unreal Blueprints succeeds because it **provides high-level functional nodes** — but partly because **the only alternative is C++**
- Other Visual Scripting tools have **abysmal adoption rates** => Godot: 0.5%, Unity: very few posts. Consequently:
  - Unity Visual Scripting has **laid dormant** since 2022 
  - **Godot removed** their VisualScript in 2022

**The Fatal Flaws:**
- Visual Scripting **fails** if it copies an **imperative programming language 1:1**
- Visual scripting is **verbose** and extremely **space-inefficient** compared to code
- Arranging nodes is **unproductive, but necessitated** to avoid "node spaghetti"
- Hard to **debug, refactor, review, document, version**, and establish guidelines

**Engine Scripting Languages:**
- Boo, UnityScript, UnrealScript: **removed** after 9-16 years due to maintenance cost
- They all exposed the **engine's API 1:1** => simpler syntax but same API complexity
- UnrealScript: **Epic was forced** to provide a C++ alternative => Blueprints
- UnityScript/Boo were **barely used** (<5%) => C# considered easy enough
- GDScript: **>75% user base** due to tight integration: no external editor necessary

**‼️The Missing Middle:‼️**

- **There is no middle ground:** beginners/designers must jump from visual scripting and/or creation tools with small APIs directly to full engine programming
- Simple **declarative programming** patterns are **absent** in game engines
- Visual tools **merely replace anxiety-inducing syntax** (semicolons, brackets) with boxes and lines - but one still has to have **imperative programming skills**

---

### 4. Learning Support Is Inadequate

**Observable Patterns:**
- Game dev forums show **high numbers of one-post** beginner accounts
- Beginners' code is often chaotic, showing **lack of conceptual understanding**
- "Read the docs" responses **assume foundational knowledge** beginners lack

**Fragmented Ecosystem:**
- Abundance of learning material but **inconsistent in quality**, and target audience
- Every tutorial creator **teaches their own style**, compounding confusion
- Tutorials **strongly focus on the how** (quick wins), rarely explain the why 
- ‼️**Tutorial Hell**: beginners follow excessively but unable to work independently

### 5. Constraints Enable Creativity

**Evidence:**
- Successful constrained tools (RPG Maker, Ren'Py) **encourage creativity**
- Developers' widely held belief that "game programming needs full flexibility" **contradicts reality** of what restrictive creative tools accomplish
- Limiting, failure-safe systems are a **blessing in disguise for learners** — they reduce decision paralysis and encourage experimentation => Scratch et al
- Heavily customizable **building block systems** have irresistible draw: Minecraft, Python

---

## The Gap to a Better Outcome

### ⚠️ Current State ⚠️
- Beginners must learn engine-specific APIs before implementing actual game-play!
- Knowledge doesn't transfer between engines—switching means starting over
- Visual scripting & GDScript are the only "simple" options (with major drawbacks)
- No middle-ground between high-level visual programming and HLL programming
- Fear of "wrong choice" causes early lock-in or prevents advancement

### ✅ Desired State ✅
- Learn game concepts through simple, declarative API that reveals intent
- Knowledge transfers well between engines—try Unity, Godot, or both
- Text-based from day one: debuggable, refactorable, version-controllable, etc.
- Gradual progression from high-level patterns toward engine-native programming
- Engine exploration carries no penalty—build confidence through working code

---

## Why This Matters

**1. Wasted Creative Potential**
- **Talented people give up** due to artificial barriers, not lack of ability
- The industry **loses diverse voices** and perspectives
- Creation tools **lack the platform reach** of professional engines

**2. Inefficient Learning Ecosystem**
- Educators **repeat the same trivial concepts** in different engine-specific APIs
- Learners **consume tutorials** without building independent problem-solving skills
- Communities **fragment by engine** rather than uniting around shared knowledge
- **Missing 'safe space'**, easy-to-use sandbox to experiment in

**3. Artificial Career Limitations**
- Engine **loyalty limits job opportunities** and creative freedom
- The **gameplay coding designer** role became **unattractive**: either **heavy UI interactions** or **intricate programming knowledge** - choose the lesser evil! 

---

## How LunyScript Addresses This

**Core Insight:** Game engines share 90% of their fundamental concepts equally well but expose them through 100% different APIs. Learning different UIs is comparatively easy.

**LunyScript Solution:** A unified, declarative API that works identically across engines—filling the missing middle ground between visual scripting and full programming.

### Direct Problem → Solution Mapping

| Problem | How LunyScript Helps                                                           |
|---------|--------------------------------------------------------------------------------|
| API is the barrier | Declarative, intent-revealing syntax—focus on game concepts, not API memorization |
| Exponential cognitive load for beginners | Simpler API = one less domain to juggle; reduces early lock-in fear            |
| API fragmentation | Same code works in Unity, Godot, future engines—knowledge transfers completely |
| No middle ground | Text-based declarative patterns bridge visual scripting → full programming     |
| Visual scripting drawbacks | Debuggable, refactorable, version-controllable text code from day one          |
| Tutorial hell dependency | Readable code encourages experimentation and understanding, and teaching patterns |
| Mid-tier tool lock-in | Scratch/Roblox users feel more welcome in pro-tier engines, find early successes |
| Lack of safe learning space | Unified community around entry-level API                                       |

### What LunyScript Is NOT

- **Not a replacement** for engine-native programming — it's a scaffold toward mastery but with similar long-term productive capability than visual scripting
- **Not targeting** high-end AAA development or bleeding-edge features
- **Not hiding** engine concepts — it teaches transferable patterns first

**Goal:** Provide a gentle, productive entry point that transfers completely between engines, fills the missing middle ground, and builds confidence through working code.

---

## Secondary Benefits

While self-learners are the primary focus, LunyScript creates value for:

- **Tutorial Creators**: One tutorial reaches Unity + Godot audiences; multiply reach, reduced workload; encourages comparisons
- **Educators**: One curriculum deploys to multiple engines; teach concepts, not API semantics
- **Prototypers**: Faster iteration while still creating reusable code
- **Framework Devs**: Cross-engine tools without compromising engine integration

These are **consequences** of solving the core beginner problem and cross-engine functionality, but have the potential to become additional design drivers in the future.

---

[← Back to Main Documentation](../index.md)
