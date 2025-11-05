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

## File Organization

### Where Things Go
- **README.md** - Public-facing project overview
- **TODO.md** - Current phase tasks, next steps
- **CHANGELOG.md** - Completed work, design changes, decisions made
- **QUESTIONS.md** - Centralized design questions (move to decisions/ when resolved)
- **Guidelines.md** - Project conventions (this file)
- **docs/Architecture.md** - Layer definitions, architectural concerns
- **docs/NamespaceStructure.md** - Namespace tree, usage patterns, repository structure
- **decisions/** - Architectural decision records

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
