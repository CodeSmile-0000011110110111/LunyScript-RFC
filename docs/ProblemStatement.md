# Problem Statement

## The Core Problem

**Learning game programming requires mastering complex, engine-specific APIs** before one can begin to understand game development concepts. 

The learning curve for programming is extremely steep, but without programming all efforts are in vain. This creates artificial barriers for talented, creative people.

Engines create a strong lock-in effect due to their highly unique APIs - which essentially perform the same high-level tasks. They diverge only in concepts and features that hardly matter to the great majority of games and their developers!

## The Road To A Solution

With Godot on the rise, now is the time to start unifying gameplay programming on a high level, declarative, with patterns: for beginners and designers alike. 

Unity and Godot first, then more C# engines. Eventually a C++ port, using Lua as the truly cross-engine programming interface.

---

## What We Know

### 1. API Fragmentation: The Root Problem

- Unity, Godot, Unreal solve identical problems with completely different APIs
- Very different code`GetComponent()`vs`get_node()`but same concepts!
- Switching engines means relearning implementation patterns = zero benefit
- Engine switching costs are **high**, and exponentially so for beginners+

### 2. The Lock-In Effect

**Beginners:**
- Must learn programming concepts **and** engine-specific APIs simultaneously => exponential cognitive load, _tutorial hell_ is widespread
- Premature commitment to one engine before understanding the choice
- Alternative mid-tier tools are heavily fragmented, and commercialized (sunk cost)

**Experienced Developers:**
- Still significant time investment to switch engines for routine tasks
- Switching engines is a career risk, not an opportunity!
- Forced paradigm shifts cause frustration, loss of motivation, reverse switch
- Switch job & engine together: highly unlikely (req. 2+ years with specific engine)

**Ecosystem:**
- Knowledge and tutorials don't transfer
- Communities fragment by engine choice, even language preference
- Game code frameworks are either engine-locked or require significant integration effort

### 3. Visual Scripting Isn't The Catch-All Solution

**What Works:**
- High-level visual tools (PlayMaker, Game Creator) are popular paid assets because they provide declarative, intent-revealing patterns at a high level
- Success comes from hiding complexity and the promise of being simpler

**What Doesn't Work:**
- Visual tools that copy imperative programming 1:1 have abysmal adoption rates (Godot: 0.5%)
- Unreal Blueprints succeeds because it provides high-level functional nodes — but partly because the only alternative is C++ (UnrealScript was removed in 2014)

**The Fatal Flaws:**
- Visual scripting is verbose and extremely space-inefficient compared to code
- Arranging nodes is unproductive, but necessitated to avoid "node spaghetti"
- Hard to debug, refactor, review, document, version, and establish guidelines 
- Engine scripting languages (UnityScript/Boo, UnrealScript) were dropped; they copied the engine's API 1:1 and its imperative programming model
  - UnrealScript historically had a substantial user base: Epic was forced to provide a decent visual alternative => Blueprints
  - UnityScript/Boo were barely adopted (<5%): proving that the engine API was the barrier to entry, not the language => Visual Scripting came several years later through acquisition of existing asset (Bolt)

**‼️The Missing Middle:‼️**

- **There is no middle ground:** beginners/designers must jump from visual scripting and/or creation tools with small APIs directly to full engine programming
- Simple declarative programming patterns are largely absent in game engines, only some visual tools persist

### 4. Learning Support Is Inadequate

**Observable Patterns:**
- Game dev forums show high numbers of one-post beginner accounts
- Beginners' code is often chaotic, showing lack of conceptual understanding
- "Read the docs" responses assume foundational knowledge beginners lack

**Fragmented Ecosystem:**
- Abundance of learning material but inconsistent in quality, and target audience
- Common beginner question: "Which tutorials/tutors should I follow?"
- Every tutorial creator teaches their own style, compounding confusion
- Tutorials strongly focus on the how (quick wins), rarely explain the why 
- ‼️Tutorial Hell: beginners follow excessively but unable to work independently

### 5. Constraints Enable Creativity

**Evidence:**
- Successful constrained tools (GameBoy, GameMaker, RPG Maker, Ren'Py) prove restrictions foster creativity, and can find commercial success
- Developers' belief that "games need full flexibility" contradicts reality of what restrictive creative tools accomplish
- Limiting, failure-safe systems are a blessing in disguise for learners — they reduce decision paralysis and encourage experimentation (Scratch)

---

## The Gap to a Better Outcome

### Current State
- Beginners must learn engine-specific APIs before implementing actual game-play!
- Knowledge doesn't transfer between engines—switching means starting over
- Visual scripting is the only "simple" option (with major drawbacks)
- No middle-ground between high-level visual programming and HLL programming
- Fear of "wrong choice" causes early lock-in or prevents advancement

### Desired State
- Learn game concepts through simple, declarative API that reveals intent
- Knowledge transfers well between engines—try Unity, Godot, or both
- Text-based from day one: debuggable, refactorable, version-controllable, etc.
- Gradual progression from high-level patterns toward engine-native programming
- Engine exploration carries no penalty—build confidence through working code

---

## Why This Matters

**1. Wasted Creative Potential**
- Talented people give up due to artificial barriers, not lack of ability
- The industry loses diverse voices and perspectives
- Mid-tier tools lack the platform reach of professional engines

**2. Inefficient Learning Ecosystem**
- Educators repeat the same concepts in different engine-specific APIs
- Learners consume tutorials without building independent problem-solving skills
- Communities fragment by engine rather than uniting around shared knowledge
- No 'safe space' sandbox toy to experiment with - like Scratch allows

**3. Artificial Career Limitations**
- Engine loyalty limits job opportunities and creative freedom
- The "gameplay coding designer" role has disappeared: the choice is either 'visual only' workflows (mostly Unreal) or learn native engine programming

---

## How LunyScript Addresses This

**Core Insight:** Game engines share 90% of their fundamental concepts equally well but expose them through 100% different APIs.

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

- **Not a replacement** for engine-native programming—it's a scaffold toward mastery (but has similar uses than visual scripting)
- **Not targeting** high-end AAA development or bleeding-edge features
- **Not hiding** engine concepts—it teaches transferable patterns

**Goal:** Provide a gentle, productive entry point that transfers completely between engines, fills the missing middle ground, and builds confidence through working prototypes.

---

## Secondary Benefits

While self-learners are the primary focus, LunyScript creates value for:

- **Tutorial Creators**: One tutorial reaches Unity + Godot audiences; multiply reach, reduce workload
- **Educators**: One curriculum deploys to multiple engines; teach concepts, not API specifics
- **Prototypers**: Faster iteration while creating reusable code
- **Framework Developers**: Cross-engine tools without compromising on engine integration

These are *consequences* of solving the core beginner problem and cross-engine functionality, but have the potential to become additional design drivers in the future.

---

[← Back to Main Documentation](../index.md)
