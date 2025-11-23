# IDEAS.md

Far fetched thoughts that may eventually have an impact on direction.

## Kid's Toybox Mode

A very simplistic, playable 3d world for multiple participants.
Users can find, select, and create objects like in Minecraft.
Objects have predefined interaction patterns which are implemented as LunyScript code.

Those who want to learn how to modify actual professional-use (!) code can simply edit these files. They would still encounter syntax errors but they should be limited to a missing or excess comma or bracket. 

They would mostly start by copy-pasting things - and that is okay!

They will likely break everything, intentionally or because of the cat - spawning ten gazillion objects for instance. LunyScript safeguards against such extreme scenarios (object count).

## Code-Kaleidoscope

Program simple patterns.
A particle system but CPU controlled using regular objects, not particles.
This allows full interaction with the physics simulation the player takes part in.

Could make for psychedelic experiences, for effectful explosions, avalanches, splashes of water. Perhaps influenced by music to create one's own (how are these hifi spectrum led lights called? damn i loved them when i was younger but they were so limited back then).

Can also be used to programmatically generate content through algorithms. Easiest of course being a grid layout but any patterns (voronoi etc) could be applied with simple declarative syntax controlling their configuration and algorithmic behaviour.

This could also help to use AI to generate well-known pattern algorithms for us. We don't understand how they work but we see what they do so we get interested to learn more. Especially when seeing how the patterns can be controlled in realtime through simple code.


## Luny Central

Acts like an authoritative central source code repository for Luny. Instead of complicated GitHub cloning users download an engine plugin installer.
 
When run, it just asks which project to install into, verifies target actually is a valid project, and then does the copying into or updating existing version (user can select which in installer and/or editor).

When users sign in to the website, they can share their creations: code libraries which fulfill a certain purpose, and which continue to run for years because they execute within the version of LunyScript they were built for. [NOTE: need to verify if technically feasible - IDEAS.md remember? - in any case, my stomach feeling whispers an abbreviation: veee-emmm .. VM .. virtual machine. Oh. Wait. Would that make LunyScript a programming language implemented as an API??]

.....

**Review of Luny Central idea:**

## Overall concept: ✅ Strong
Plugin installer + community repository addressing real pain points (GitHub friction, tutorial obsolescence).

---

## Last paragraph analysis:

### **[Is it technically feasible?]**

**Yes, but with significant architecture implications.**

You have three implementation paths:

**Option 1: Versioned API shims (simplest)**
- Each user creation declares its LunyScript version
- Runtime loads appropriate API compatibility layer
- Similar to: Unity's scripting API updater, Python's `__future__` imports
- **Feasibility:** High. No VM needed.

**Option 2: Embedded interpreter/VM (complex)**
- LunyScript becomes a bytecode-compiled language
- Each creation runs in isolated version context
- Similar to: Lua in game engines, JVM versioning
- **Feasibility:** High effort, but proven (Godot does this with GDScript versions)

**Option 3: Source-level compatibility mode (hybrid)**
- Generate version-specific C# that compiles against current engine
- Translation layer maps old API calls → current equivalents
- Similar to: Roslyn analyzers, C++ modules
- **Feasibility:** Medium. Requires robust AST manipulation.

---

### **[Would that make LunyScript a programming language implemented as an API?]**

**No—it would make it a *DSL (Domain-Specific Language)* with versioned runtime semantics.**

**Current state:** LunyScript is a **library/framework** (C# API that generates engine code)

**If you add VM/versioning:** It becomes a **platform** (runtime + stdlib + backward compatibility guarantees)

**Precedents that did this:**
- **Roblox Luau:** Started as Lua library → became custom VM with versioning
- **GDScript:** Language with engine-coupled versioning
- **Unity's Visual Scripting:** Graph → IL → .NET execution (versioned nodes)

---

### **Key question you should answer first:**

**Do user creations need to run *indefinitely* or just *predictably*?**

- **Indefinitely** → Requires VM/isolation (heavy)
- **Predictably** → Requires versioned shims + migration tools (lighter)

**From your social issue doc (line 12):**
> "engine updates make tutorials obsolete within 1-2 years"

Your **actual problem** is tutorial *obsolescence*, not execution permanence.

**Lighter solution that still solves the problem:**
- Version-tagged creations
- Auto-migration tool when APIs change
- Clear deprecation warnings (not silent breakage)

This gives users **"it still works OR tells me how to fix it"** without needing a full VM.

---

### **Recommendation:**

Start with **Option 1** (versioned API shims):
1. User shares "MegabonkController v1.2.3" (declares LunyScript 0.8.0)
2. Runtime detects version mismatch
3. Either: loads compatibility layer OR shows migration guide
4. No VM needed, solves 80% of obsolescence problem

**Only build VM if** you need true sandboxing (untrusted code execution, modding support, etc.)

---

**Does this answer your questions? Want me to dig deeper into any implementation path?**

.....
## Option 2 with Lua + C# bindings

### **Architecture:**

```
User's C# code
    ↓
LunyScript API calls
    ↓
Compiled to Lua bytecode
    ↓
C# Lua VM (NLua, MoonSharp, KeraLua)
    ↓
C# bindings to Unity/Godot
```


### **How this changes things:**

**✅ Advantages:**

1. **True version isolation**
    - Each shared creation bundles its Lua bytecode + LunyScript version
    - VM sandboxes execution → old code never breaks
    - Zero maintenance for shared creations

2. **Lighter runtime**
    - Lua VMs are tiny (~200KB) vs full .NET IL
    - Fast startup, low memory
    - Battle-tested (WoW, Roblox, Defold use this exact pattern)

3. **Security/modding**
    - Untrusted user code can't crash engine
    - Natural modding platform emerges (users share Lua scripts)
    - API surface you expose is controlled

4. **Cross-engine becomes trivial**
    - Lua bytecode is engine-agnostic
    - Only C# bindings differ per engine
    - Same `.luny` file runs in Unity + Godot

**❌ Disadvantages:**

1. **Performance hit**
    - Lua VM overhead (though JIT options exist: LuaJIT)
    - C# ↔ Lua marshalling cost on every call
    - Hot paths (physics, rendering) must stay in C#

2. **Debugging nightmare**
    - Stack traces cross C#/Lua boundary
    - IDE integration weak (no IntelliSense in Lua layer)
    - Users debugging generated Lua code they didn't write

3. **C# ecosystem loss**
    - Users can't directly use .NET libraries
    - NuGet packages unusable
    - Feels like "toy language" to C# developers

4. **You're building a language**
    - Need parser, compiler, standard library
    - Documentation for 2 layers (C# API + Lua semantics)
    - Syntax errors in 2 places

---

## **"So LunyScript = GDScript, but cross-engine?"**

### **Similarity:**

| Aspect | GDScript | LunyScript+Lua |
|--------|----------|----------------|
| **Purpose** | High-level engine scripting | High-level game logic |
| **Runtime** | Custom VM in engine | Lua VM in C# plugin |
| **Binding** | Godot's C++ core | Unity/Godot C# APIs |
| **Versioning** | Godot 3 vs 4 breaks code | VM isolation prevents breaks |

### **Key difference:**

**GDScript is engine-native** → Deep integration, but locked-in

**LunyScript+Lua is engine-agnostic** → Portable, but always "outside" the engine

---

## **Opportunities this creates:**

### **1. The "Universal Game Scripting Language" position**

**What it unlocks:**
- **"Write once, run in Unity + Godot"** becomes your tagline
- Attract educators frustrated by engine lock-in
- Become the *de facto* teaching language for multi-engine curricula

**Precedent:**
- **Defold** (Lua for 2D games, engine-agnostic philosophy)
- **LÖVE** (Lua framework, not engine-locked)
- Both have loyal education communities

**Risk:**
If Unity/Godot see you as threat, they could add features making LunyScript redundant.

---

### **2. The "User-Generated Content Platform" pivot**

**What it unlocks:**
- Modding becomes first-class (Lua = industry standard for mods)
- "Steam Workshop for game logic" business model
- Users share `.luny` files that run in anyone's game

**Precedent:**
- **Roblox** (Lua scripts = their entire platform)
- **Core** (visual scripting → Lua)
- **Tabletop Simulator** (Lua for custom game rules)

**Market:**
Modding tools for indie devs is underserved. Unity Asset Store has weak modding solutions.

---

### **3. The "Educational Versioning Guarantee"**

**What it unlocks:**
- **"Tutorials that never expire"** marketing angle
- Directly addresses your social issue (line 12: "tutorials obsolete in 1-2 years")
- Educators pay/donate for stability guarantee

**Precedent:**
- **Processing** (creative coding, backward compatibility obsession)
- **Scratch** (projects from 2007 still run)

**This is your strongest angle** because it solves the core problem in your social issue doc.

---

## **How it can weaken LunyScript:**

### **1. Identity crisis**

**Problem:**
- You pitch C# as "industry-relevant skill" (line 366)
- But users write C#-flavored API calls that compile to Lua
- They're not *really* learning C# → weakens your "transferable skills" claim

**Your doc says (line 22):**
> "building transferable skills across Unity and Godot"

If the skill is "LunyScript's Lua dialect," how transferable is that?

---

### **2. Performance ceiling perception**

**Problem:**
- "It's just Lua" = perception of toy/slow
- C# devs may avoid it ("why not use real C#?")
- Lua's type system is weak → TypeScript for Lua (Teal) exists but adds complexity

**Your doc says (line 299):**
> "potential to become a standard tool for both entry-level and professional production"

Lua VM → harder to credibly claim "professional production" scale.

---

### **3. Maintenance burden explosion**

**Problem:**
You now maintain:
1. C# API surface (Unity + Godot variants)
2. C# → Lua compiler
3. Lua VM integration + C# bindings
4. Versioning/migration tools
5. Two documentation sets

**As a solo/small team**, this could sink the project.

---

## **My take:**

### **Lua VM makes sense IF:**

✅ Your primary goal is **tutorial permanence** (solves lines 12, 34 directly)  
✅ You accept becoming a **platform** (not just a library)  
✅ You can sell the modding/UGC angle to get funding/users

### **Lua VM is risky IF:**

❌ You want users learning "real C#" (they won't be)  
❌ You lack resources to maintain compiler + VM + bindings  
❌ Performance matters for your target game types

---

## **Hybrid alternative:**

**Keep C# as primary, Lua as optional execution mode:**

```csharp
// User writes C#
var player = new LunyPlayer();
player.MoveTo(position);

// Runs as:
// 1. Normal C# (fast, debuggable)
// 2. OR compiled to Lua (portable, versioned)
```


**User chooses:**
- Prototyping/sharing → Lua mode (version-locked)
- Production → C# mode (native performance)

**This gives you:**
- Tutorial permanence (Lua for shared examples)
- C# learning path (they graduate to native mode)
- Escape hatch from VM limitations

**Precedent:** Unity's Visual Scripting does this (graph → IL or graph → interpreted).

---

**Does this clarify the Lua VM tradeoffs? Want me to explore the hybrid approach deeper?**

.....
You're absolutely right—**I misspoke about Defold**.

**Defold IS an engine** (like Unity/Godot), not a cross-engine library. It uses Lua for scripting, but you can't take Defold Lua code and run it in Unity. My mistake.

**What I meant to say:**
Defold popularized Lua as a *game engine scripting language* in the indie/education space, showing Lua can work for complete games—but it's **engine-locked**, just like GDScript.

**Actual cross-engine Lua examples:**
- **LÖVE framework** (2D, but not full engine—you still need to build editor tooling)
- **Corona SDK** (mobile-focused, now Solar2D—but also engine-locked)

**Reality check:** There isn't a successful "Lua library that works in Unity + Godot" precedent. You'd be pioneering this.

---

## **Re: Your decisions**

### **#2 UGC - Long-term potential**
Agreed. Park this for post-funding. Could be Phase 2 after proving core education value.

### **#3 Tutorial permanence - Hard solo**
**Smart recognition.** Even *documenting* breaking changes is easier than *preventing* them via VM.

### **Sticking to C# + better error documentation**

**This is the pragmatic move.** Here's why it's strong:

---

## **"Searchable error patterns + visual cues" as differentiator**

### **This addresses REAL pain points from your social issue:**

**Line 100 (from doc):**
> "Poor debugging & problem-solving skills: passive watching builds recognition but not troubleshooting skill"

**Line 96:**
> "Shallow / brittle knowledge: learners reproduce recipes but lack transferable understanding"

**Solution:** Error documentation that *teaches* debugging, not just "here's the fix."

---

### **Implementation idea:**

**Error message structure:**
```
LunyScript Error LS0042: Missing comma in entity chain

  player.MoveTo(10, 20)
         .Rotate(45)  // ← Expected comma before .Rotate
         
Common cause: Chaining methods requires comma between calls
Learn more: lunyscript.dev/errors/LS0042

Quick fix:
  player.MoveTo(10, 20),
         .Rotate(45)
```


**Why this works:**
1. ✅ **Searchable** (error codes)
2. ✅ **Visual** (highlights exact issue)
3. ✅ **Educational** (explains *why*, not just *what*)
4. ✅ **Actionable** (shows fix)

---

### **This solves your social issue (#1 gap):**

**Your doc mentions (line 153):**
> "No mention of why current approaches (existing tutorials, other teaching tools, GDScript) are inadequate"

**Your answer:**
> "Existing tools throw cryptic engine errors. LunyScript catches common mistakes *before* they hit the engine, with errors that teach debugging patterns."

**Example pain points you solve:**

| Engine Error | LunyScript Error |
|-------------|------------------|
| `NullReferenceException at line 47` | `LS0008: Entity 'player' not found. Did you mean 'Player'? (case-sensitive)` |
| `CS1061: 'Transform' does not contain a definition for 'position'` | `LS0103: Use Position (capital P) for entity positions. Unity's transform.position is lowercase.` |
| `Unexpected symbol ')' in expression` | `LS0042: Missing comma in entity chain. See: [visual example]` |

---

### **This is VERY achievable solo:**

**Phase 1 (MVP):**
- Curate top 20 errors from your own Unity experience
- Write error code + pattern + fix for each
- Add to docs site (static, searchable)

**Phase 2 (Tooling):**
- Roslyn analyzer that emits LS#### codes
- Visual Studio / Rider integration (squiggly lines)
- Link to docs from IDE

**Phase 3 (Community):**
- Users submit confusing errors
- Crowdsource pattern library
- You curate/approve additions

**Effort:**
- Phase 1: 1-2 weeks (totally feasible)
- Phase 2: 2-3 weeks (still reasonable)
- Phase 3: Ongoing, scales with users

---

### **How this strengthens your Prototype Fund pitch:**

**Currently missing from your social issue (line 153):**
> "Why current approaches are inadequate"

**Add this:**
> "Engine error messages assume programming expertise learners lack. Unity's `CS1061` or Godot's `Invalid call. Nonexistent function` don't teach—they frustrate. LunyScript translates these into pedagogical moments, catching common mistakes with pattern-based guidance that builds debugging literacy."

**This addresses:**
- ✅ Gap (line 153): Why existing tools fail
- ✅ Consequence (line 89): What happens when learners get stuck
- ✅ Outcome (line 218): "Fulfilling tutorial promises"

---

## **Bonus: Error docs = content marketing**

**SEO gold:**
- "unity cs1061 fix" → LunyScript error guide ranks
- Tutorial creators link to your error docs
- Educators bookmark your patterns page

**Similar precedent:**
- **Elm's error messages** (famous for being teaching-focused)
- **Rust's error codes** (searchable, with examples)
- **TypeScript's error explanations** (improved over time)

All became *marketing assets* for their languages.

---

**Does "C# + exceptional error documentation" feel like the right pivot? Want me to help draft the "current gap" addition to your social issue doc?**
