# Project Guidelines

## Core Architecture Principles

### Layer Structure
- **Luny** - Pure abstractions, zero dependencies
- **LunyScript** - Execution engine consuming Luny abstractions
- **LunyScript.{Engine}** - Engine-specific adapters (Unity, Godot, Unreal)

## Documentation Standards

### Writing Style
- **Concise and direct** - no unnecessary preamble or summary
- **Bullet points** for architecture requirements and lists
- **Concrete examples** over abstract descriptions
- **Actionable** - clear next steps, not just theory

### Terminology
- Use "**Change frequency**" (Low/Medium/High) when describing layers
- Use "**Changes: Rare/Moderate/Frequent**" in visual diagrams

### Decision Recording
- Record architectural decisions in `/decisions/NNN-title.md`
- Format: Date, Status, Decision, Reasoning, Implications, Rejected alternatives
- Purpose: "Why didn't I do X? Oh yeah, right..." - future reference
- Update `/decisions/README.md` index when adding new decisions

### Repository Index
- **REPOSITORY-INDEX.md** provides a comprehensive overview of all repository contents
- **Keep REPOSITORY-INDEX.md up to date** when adding/removing/reorganizing files
- Update REPOSITORY-INDEX.md when creating new documentation, decisions, or major changes

### Documentation Index
- **docs/index.md** provides an organized entry point to all design documentation
- **Keep docs/index.md up to date** when adding new documentation files to the docs/ directory
- Update docs/index.md when adding new design documents, architecture analysis, or reference materials

### Table of Contents for Multi-Page Documents
- **Multi-page documents (>3 sections) must include a Table of Contents** at the top
- TOC should list all heading levels 1-4 with anchor links
- **Keep TOC up to date** when adding, removing, or renaming sections
- Use markdown anchor link syntax: `[Section Name](#section-name)`
- Place TOC immediately after document header and before first section
- Example format:
  ```markdown
  # Document Title

  ## Table of Contents
  - [Section 1](#section-1)
    - [Subsection 1.1](#subsection-11)
  - [Section 2](#section-2)
  ```

### Limitations Documentation
- **LIMITATIONS.md** documents scope and boundaries of LunyScript
- **Keep LIMITATIONS.md up to date** when encountering or solving known limitations
- Update LIMITATIONS.md when design decisions create new boundaries or lift existing constraints

### AI Usage Transparency
- **AI-USAGE.md** documents how AI tools are used in this project
- Maintains transparency with contributors and users about AI assistance
- Update AI-USAGE.md when adopting new AI tools or changing usage policies

## File Organization

### Where Things Go
- **README.md** - Public-facing project overview
- **CONTRIBUTING.md** - Contribution guidelines and setup instructions
- **TODO.md** - Current phase tasks, next steps
- **CHANGELOG.md** - Completed work, design changes, decisions made
- **QUESTIONS.md** - Centralized design questions (move to decisions/ when resolved)
- **Guidelines.md** - Project conventions (this file)
- **AI-USAGE.md** - AI tool policies and contributor requirements
- **LIMITATIONS.md** - Project scope and boundaries
- **MAINTENANCE.md** - Long-term sustainability and adapter maintenance strategy
- **docs/Architecture.md** - Layer definitions, architectural concerns
- **docs/NamespaceStructure.md** - Namespace tree, usage patterns, repository structure
- **decisions/** - Architectural decision records
- **scripts/** - Contributor setup and utility scripts

## Naming Conventions

### Why "LunyScript" not "Luny.Script"?
User-facing API should be concise. Follows Unity convention: `UnityEngine` not `Unity.Engine`.

## Architecture Design Checklist

When designing new abstractions:
1. Design contracts first - think through boundaries before coding
3. Balance granularity - too fine = verbose, too coarse = inflexible
4. Think about testability
5. Keep engine-agnostic (belongs in Luny or LunyScript?)
2. Consider dependency injection needs
6. Consider Luny framework user concerns
7. Consider engine API evolution - potential maintenance burdens

## Open Questions

When encountering design questions:
- Add to **QUESTIONS.md** with clear statement, why it matters, potential approaches
- Don't leave unresolved questions scattered in comments
- When resolved, move to `/decisions/` as a formal decision record

## TODO and CHANGELOG Flow

- **TODO.md** tracks current work and next steps
- When TODO items are completed, summarize changes in **CHANGELOG.md**
- CHANGELOG captures design evolution, decisions made, features added
- Keep both files updated to maintain project history

---

## Cross-Cutting Concerns Assessment

### Scoring Criteria

When evaluating architectural concerns that span multiple layers, use these criteria:

#### 1. Correctness Impact (1-10)
**Definition:** How severely does poor design break system guarantees?
- **10** - Non-determinism, race conditions, data corruption
- **7-9** - Logic errors, inconsistent state, wrong results
- **4-6** - Edge case failures, degraded functionality
- **1-3** - Cosmetic issues, minor inconveniences

#### 2. Complexity (1-10)
**Definition:** How difficult is the design space to reason about?
- **10** - Multi-threaded, distributed, or order-dependent systems
- **7-9** - State machines with many transitions, lifecycle management
- **4-6** - Multiple interacting components, moderate state
- **1-3** - Simple algorithms, stateless functions

#### 3. Cross-Layer Penetration (1-10)
**Definition:** How many architectural layers does this concern affect?
- **10** - Affects Luny abstractions, LunyScript core, all engine adapters
- **7-9** - Affects LunyScript core and multiple adapters
- **4-6** - Affects single layer but with broad surface area
- **1-3** - Localized to single component or subsystem

#### 4. Performance Impact (1-10)
**Definition:** How much does this concern affect runtime performance?
- **10** - Hot path executed every frame (registration, queries, event dispatch)
- **7-9** - Frequent operations (state transitions, memory allocation)
- **4-6** - Periodic operations (serialization, garbage collection)
- **1-3** - Rare operations (initialization, error handling)

#### 5. Developer Experience (1-10)
**Definition:** How much does this affect debugging, iteration speed, and usability?
- **10** - Profiling, tracing, hot reload, clear error messages
- **7-9** - Good documentation, intuitive APIs, helpful warnings
- **4-6** - Basic error reporting, adequate tooling
- **1-3** - Minimal impact on day-to-day development

### Risk Levels

Use star ratings to communicate overall priority:

- ⭐⭐⭐⭐⭐ **Critical (90-100%)** - System inoperable without correct design
- ⭐⭐⭐⭐ **High (70-89%)** - Major refactoring required if designed poorly
- ⭐⭐⭐ **Medium (50-69%)** - Can be fixed with moderate effort
- ⭐⭐ **Low (30-49%)** - Localized changes sufficient
- ⭐ **Minimal (<30%)** - Trivial to change

**Overall Score Calculation:**
```
Priority % = (Correctness × 0.3) + (Complexity × 0.2) + (Cross-Layer × 0.2) +
             (Performance × 0.15) + (DevEx × 0.15)
```

Weight rationale:
- **Correctness** weighted highest (30%) - wrong behavior breaks trust
- **Complexity** and **Cross-Layer** tied (20% each) - indicates refactoring difficulty
- **Performance** and **DevEx** tied (15% each) - important but less fundamental

### Design Timing Decision

**Design Now (Before Implementation):**
- Changing later requires major refactoring
- Affects public API contracts
- Creates permanent performance bottlenecks
- Cannot be retrofitted without invasive changes

**Design Later (Incremental Addition):**
- Can be added without breaking existing code
- Isolated to single layer or component
- Optional feature not required for MVP
- Better to iterate after gaining real-world experience

### Document Location

Cross-cutting concerns analysis lives in **docs/CrossCuttingConcerns.md**.
