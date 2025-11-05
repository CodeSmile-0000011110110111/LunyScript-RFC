# Changelog

All notable changes to this project's design and architecture.

## 2025-11-05

### Added
- **Architecture.md** - Core layer definitions (Luny, LunyScript, Engine Adapters)
- **NamespaceStructure.md** - Namespace tree and usage patterns
- **Guidelines.md** - Project conventions and documentation standards
- **OPEN_QUESTIONS.md** - Centralized design questions tracking
- **/decisions/** folder - Architectural decision records
  - 001-naming-scheme.md - Luny, LunyScript, LunyScript.{Engine} rationale

### Architecture Decisions
- Decouple low-level abstractions from implementations (coroutines, FSMs, BTs)
- Three-tier naming: Luny (abstractions), LunyScript (core), LunyScript.{Engine} (adapters)
- Use "Change frequency" terminology instead of "Stability" to avoid confusion
- Avoid percentage-based layer descriptions (misleading for cumulative adapters)

### Defined
- Object registration system requirements
- Event ordering contract requirements
- Execution tracing/profiling hooks design approaches
- Memory management, error handling, serialization considerations
- Concurrency model and API versioning requirements

### Open Questions
- Coroutine implementation approach (stackful vs stackless)
- FSM/BT ownership model (per-object vs shared)
- Variable scope and serialization strategy
- Physics determinism guarantees
- Asset reference portability mechanism
