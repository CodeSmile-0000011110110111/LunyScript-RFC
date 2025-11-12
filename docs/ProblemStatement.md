# Problem Statement

## The Problem

**Most beginners who start learning game development struggle with programming.**

This isn't because they lack talent or dedication — it's because the learning experience is not fostering new talent.

---

## What We Know

### Evidence (High Confidence)

**1. Compounding Cognitive Load**
- Game development requires learning 5-7 domains simultaneously: editor UI, programming, engine APIs, external tools (3D/2D software), asset pipelines, game concepts, debugging, profiling
- Unlike web development (HTML → CSS → JavaScript sequentially), game dev skills are interdependent and must be learned in parallel
- Time to first meaningful result: Web = minutes, Games = days to weeks

**2. API Fragmentation Creates Lock-In**
- Unity, Godot, Unreal solve identical problems with completely different APIs
- Switching engines means relearning everything from scratch
- Tutorial knowledge doesn't transfer between engines (e.g., `GetComponent<>()` vs `get_node()`)

**3. Tutorial Hell is Pervasive**
- Beginners can follow tutorials but freeze when building independently
- Tutorials teach engine-specific steps, not transferable concepts
- Engine version updates break tutorial code, making learned patterns obsolete

### Evidence (Strong Circumstantial)

**4. Mixed Results of Visual Scripting Tools**
- Visual Scripting tools exist because programming is seen as a major barrier, but are not adopted (Godot: 0.5%, Unity: likely <5%) when they merely imitate imperative programming
- Unreal Blueprint Graphs are successful because they provides high-level, fully functional nodes - but also because the only alternative is programming in C++
- Beginner-friendly visual tools (PlayMaker, Game Creator) are highly popular commercial plugins
- Visual tools have pervasive issues, they are verbose and hard to debug, refactor, document, and version control

**5. Community Support Structures Are Inadequate**
- Game dev forums have high numbers of once-only beginner posts
- High skill-level spaces create judgment and intimidation towards beginners
- "Read the docs" et al responses assume knowledge beginners don't have

---

## The Core Problem

Learning game development requires juggling multiple complex, interdependent domains simultaneously, with no safe environment to build confidence gradually and through experimentation. 

Engine-specific APIs fragment knowledge and create fear of choosing wrong, while tutorial-based learning creates dependency without fostering independent problem-solving.

---

## The Gap to a Better Outcome

### Current State
- Beginners learn engine-specific APIs before understanding gameplay concepts
- Programming knowledge is siloed by engine choice
- Overwhelmed learners quit or remain trapped in tutorial hell
- Fear of "wrong choice" prevents switching engines, moving forward

### Desired State
- Beginners learn gameplay **concepts** first, engine specifics later
- Programming knowledge transfers easily between engines
- Confidence builds through working prototypes and experimentation
- Try the same code in another engine, focus on learning the UI

---

## Why This Matters

**1. Wasted Creative Potential**
- Talented, creative people quit due to artificial barriers, not lack of ability
- The industry loses diverse voices and perspectives

**2. Inefficient Learning Ecosystem**
- Educators repeat the same concepts in different APIs
- Learners consume content without building real skills
- Communities fragment by engine rather than uniting around shared knowledge

**3. Artificial Career Limitations**
- Engine loyalty limits job opportunities and creative freedom
- Developers become programmer or designer, requiring one another - instead of "programming designer"

---

## How LunyScript Addresses This

**Core Insight:** Game engines share 90% of their fundamental concepts but expose them through 100% different APIs.

**LunyScript Solution:** A unified, beginner-friendly API that works identically across engines.

### Direct Problem → Solution Mapping

| Problem | How LunyScript Helps |
|---------|---------------------|
| Compounding cognitive load | Simpler API = one less domain to juggle; focus on game concepts, not API memorization |
| API fragmentation | Same code works in Unity, Godot, future engines—knowledge transfers completely |
| Tutorial hell dependency | Readable, intent-revealing syntax encourages experimentation and understanding |
| Fear of wrong engine choice | Try any engine without penalty; switch freely as projects evolve |
| Lack of safe learning space | Unified community around one API; no engine tribalism |
| AI learning difficulties | Simple, consistent patterns make AI-generated code understandable |

### What LunyScript Is NOT

- **Not a replacement** for engine-native programming
- **Not targeting** high-end AAA development or bleeding-edge features
- **Not hiding** engine concepts—it scaffolds learners toward native APIs

**Goal:** Provide a gentle, productive entry point that transfers completely between engines and builds confidence through working prototypes.

---

## Secondary Benefits

While self-learners are the primary focus, LunyScript creates value for:

- **Tutorial Creators**: One tutorial reaches Unity + Godot audiences
- **Educators**: One curriculum deploys to multiple engines
- **Prototypers**: Faster iteration without technical debt
- **Framework Developers**: Cross-engine tools without compromising engine features

These are *consequences* of solving the core beginner problem, not design drivers

---

[← Back to Main Documentation](../index.md)
