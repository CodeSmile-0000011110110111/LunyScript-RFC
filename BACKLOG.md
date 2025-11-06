# Prioritized Design & Development Backlog

**Purpose:** Tracks all design and implementation tasks in priority order.

**Status:** Active planning phase - architectural design in progress

**Last Updated:** 2025-11-06

---

## Priority Legend

- **P0 - Critical:** Blocking all other work, must be done first
- **P1 - High:** Required for MVP, design needed before implementation
- **P2 - Medium:** Important for quality, can be done incrementally
- **P3 - Low:** Nice-to-have, defer until core is stable
- **P4 - Future:** Long-term enhancements, may never be needed

---

## Current Phase: Architectural Design

**Goal:** Complete cross-cutting concern designs before implementation begins.

**Success Criteria:** All P0 and P1 design tasks resolved, documented, and reviewed.

---

## P0 - Critical Design Tasks (Must Do Now)

### Cross-Cutting Concerns - Core Foundations

#### CC-001: Event Ordering Contract Design
**Category:** Cross-Cutting Concern
**Effort:** High (2-3 days)
**Dependencies:** None
**Blocks:** Object registration, error handling, all runtime behavior

**Tasks:**
- [ ] Define frame-phase execution model (native events → user logic → deferred ops → late update)
- [ ] Specify lifecycle ordering (parent-first vs child-first)
- [ ] Design event priority system within phases
- [ ] Define atomicity guarantees (world state consistency)
- [ ] Specify recursive event trigger handling
- [ ] Document edge cases (mid-frame spawns, event re-entrancy)
- [ ] Create decision record in `/decisions/`

**Deliverables:**
- Formal specification document
- Pseudo-code execution model
- Test scenarios for edge cases

**Related:** `docs/Architecture.md` section 2, `docs/CrossCuttingConcerns.md` #1

---

#### CC-002: Object Registration System Design
**Category:** Cross-Cutting Concern
**Effort:** High (2-3 days)
**Dependencies:** CC-001 (event ordering)
**Blocks:** Event dispatch, queries, serialization

**Tasks:**
- [ ] Define registration timing contracts (when objects register/deregister)
- [ ] Design stable ID system (survives reparenting, engine operations)
- [ ] Specify query APIs (by tag, type, parent, spatial proximity)
- [ ] Design deferred deregistration mechanism (end-of-frame)
- [ ] Define native spawn integration strategy (auto-detect vs explicit)
- [ ] Plan thread-safety requirements (if any)
- [ ] Benchmark data structure candidates (hash tables, spatial partitioning)

**Deliverables:**
- Registration API specification
- ID management strategy document
- Performance requirements and benchmarks

**Related:** `docs/Architecture.md` section 1, `docs/CrossCuttingConcerns.md` #2

---

#### CC-003: Memory Management Strategy Design
**Category:** Cross-Cutting Concern
**Effort:** Medium (1-2 days)
**Dependencies:** CC-002 (object registration)
**Blocks:** Performance optimization, runtime stability

**Tasks:**
- [ ] Define pooling strategy (what gets pooled, pool sizing)
- [ ] Specify ownership rules (who owns what, who cleans up)
- [ ] Design cleanup guarantees (no dangling references)
- [ ] Plan cache-friendly data layout (hot paths)
- [ ] Per-engine GC interaction strategies (Unity vs Godot vs Unreal)
- [ ] Define allocation budgets (per-frame limits)

**Deliverables:**
- Memory management policy document
- Pooling architecture specification
- Ownership diagram

**Related:** `docs/CrossCuttingConcerns.md` #3

---

#### CC-004: Execution Tracing & Profiling Hooks Design
**Category:** Cross-Cutting Concern
**Effort:** Medium (1-2 days)
**Dependencies:** CC-001 (event ordering), CC-002 (object registration)
**Blocks:** Debugging tools, performance analysis

**Tasks:**
- [ ] Design zero-overhead tracing mechanism (compile-time toggles)
- [ ] Define hook points (function entry/exit, state transitions, events)
- [ ] Specify pluggable backend interface
- [ ] Plan trace data format (call graphs, timing, allocations)
- [ ] Design filtering and sampling mechanisms
- [ ] Create example profiler integration

**Deliverables:**
- Tracing API specification
- Backend integration guide
- Performance overhead benchmarks (enabled vs disabled)

**Related:** `docs/CrossCuttingConcerns.md` #4

---

#### CC-005: Error Handling & Recovery Strategy Design
**Category:** Cross-Cutting Concern
**Effort:** Medium (1-2 days)
**Dependencies:** CC-001 (event ordering)
**Blocks:** Usability, script isolation

**Tasks:**
- [ ] Define error boundary model (per-script vs per-event vs global)
- [ ] Specify error propagation rules
- [ ] Design graceful degradation strategy (continue other scripts)
- [ ] Plan debug vs release modes (verbosity, stack traces)
- [ ] Define user-facing error message format
- [ ] Create error recovery test scenarios

**Deliverables:**
- Error handling specification
- Error message format guidelines
- Recovery strategy decision record

**Related:** `docs/CrossCuttingConcerns.md` #5

---

### Core Abstractions Design

#### ABS-001: Core Interface Definitions (Luny layer)
**Category:** Abstraction Layer
**Effort:** Medium (1-2 days)
**Dependencies:** CC-001, CC-002, CC-003
**Blocks:** LunyScript implementation

**Tasks:**
- [ ] Define `ICoroutineScheduler` interface
- [ ] Define `IStateMachine` interface
- [ ] Define `IBehaviorTree` interface
- [ ] Define `IEventDispatcher` interface
- [ ] Define `IObjectRegistry` interface
- [ ] Specify behavioral contracts and guarantees
- [ ] Document extension points for custom implementations

**Deliverables:**
- Interface definitions (C# syntax)
- Contract specification document
- Extension guide for implementers

**Related:** `docs/Architecture.md` Luny layer, `TODO.md` line 25

---

#### ABS-002: Luny/LunyScript Boundary Definition
**Category:** Architecture
**Effort:** Low (half day)
**Dependencies:** ABS-001
**Blocks:** Implementation organization

**Tasks:**
- [ ] Define what belongs in Luny (pure abstractions)
- [ ] Define what belongs in LunyScript (logic, fluent API)
- [ ] Specify dependency rules (LunyScript consumes Luny, not reverse)
- [ ] Create namespace organization diagram
- [ ] Document boundary rationale in decision record

**Deliverables:**
- Layer boundary specification
- Namespace responsibility matrix
- Decision record

**Related:** `docs/Architecture.md` layers 1 & 2, `TODO.md` line 26

---

## P1 - High Priority Design Tasks (Before Implementation)

### Architecture Documentation

#### DOC-001: Technical Architecture Overview
**Category:** Documentation
**Effort:** Medium (1 day)
**Dependencies:** All P0 tasks complete
**Blocks:** Implementation kickoff

**Tasks:**
- [ ] Create intro to architecture document
- [ ] Produce architectural overview diagram
- [ ] Document layer interactions with sequence diagrams
- [ ] Explain execution model with examples

**Deliverables:**
- `docs/TechnicalArchitecture.md`
- Architecture diagrams (layer, sequence, component)

**Related:** `TODO.md` line 35

---

#### DOC-002: Feature Coverage Matrix
**Category:** Planning
**Effort:** Medium (1 day)
**Dependencies:** None
**Blocks:** Engine adapter design

**Tasks:**
- [ ] Define high-level feature categories (Camera, Input, Animation, Terrain, Navigation, etc.)
- [ ] Map features to engine support (Unity, Godot, Unreal)
- [ ] Identify shared functionality (include in LunyScript)
- [ ] Identify engine-specific features (exclude or flag as optional)
- [ ] Define optional/future features (raycasts, terrain, etc.)

**Deliverables:**
- Feature coverage matrix (table format)
- Shared functionality decision criteria

**Related:** `TODO.md` lines 22-23

---

#### DOC-003: Type Abstraction Inventory
**Category:** Planning
**Effort:** Medium (1 day)
**Dependencies:** DOC-002
**Blocks:** API design

**Tasks:**
- [ ] List all types to abstract (Vector3, Quaternion, RaycastHit, etc.)
- [ ] Categorize: map directly, wrap, or use .NET/standard library
- [ ] Define abstraction strategy per category
- [ ] Document tradeoffs (performance vs portability)

**Deliverables:**
- Type abstraction strategy document
- Type mapping table

**Related:** `TODO.md` line 24

---

### Unresolved Questions

#### QST-001: Resolve Open Design Questions
**Category:** Design Decisions
**Effort:** High (2-3 days)
**Dependencies:** Context-dependent per question
**Blocks:** Various implementation tasks

**Tasks:**
- [ ] Coroutine implementation strategy (Unity vs custom)
- [ ] FSM/BT ownership model (who creates, who manages)
- [ ] Variable scope rules (global, per-object, per-script)
- [ ] Asset reference handling (string paths vs typed handles)
- [ ] Native code interop boundaries
- [ ] Move resolved questions to `/decisions/` as ADRs

**Deliverables:**
- Decision records for each question
- Updated `QUESTIONS.md` (remove resolved)

**Related:** `QUESTIONS.md`, `TODO.md` line 31

---

## P2 - Medium Priority (Post-MVP)

### Debugging & Tooling

#### TOOL-001: Debugging Capabilities Specification
**Category:** Tooling
**Effort:** Medium
**Dependencies:** CC-004 (tracing hooks)

**Tasks:**
- [ ] Define debugging features (breakpoints, watches, step-through)
- [ ] Design runtime inspection APIs
- [ ] Plan integration with engine debuggers

**Related:** `TODO.md` line 37

---

### Integration & Extension

#### INT-001: Native Escape Hatches Design
**Category:** Integration
**Effort:** Medium
**Dependencies:** Core abstractions complete

**Tasks:**
- [ ] Define how to mix native code with LunyScript
- [ ] Design condition/action extension APIs
- [ ] Document native type usage in scripts
- [ ] Create extension method workflow

**Related:** `TODO.md` lines 38-40

---

#### INT-002: Native Object Lifecycle Integration
**Category:** Integration
**Effort:** High
**Dependencies:** CC-002 (registration system)

**Tasks:**
- [ ] Define how native spawns/despawns are detected
- [ ] Design auto-registration hooks
- [ ] Specify limitations and workarounds

**Related:** `TODO.md` line 39

---

## P3 - Low Priority (Quality of Life)

### Advanced Features

#### FT-001: Serialization & Hot Reload
**Category:** Developer Experience
**Effort:** High
**Dependencies:** Core runtime stable

**Tasks:**
- [ ] Design state serialization format
- [ ] Plan hot reload without state loss
- [ ] Handle schema versioning

**Related:** `docs/CrossCuttingConcerns.md` #7

---

#### FT-002: Concurrency Support
**Category:** Performance
**Effort:** High
**Dependencies:** Single-threaded runtime working

**Tasks:**
- [ ] Design async abstractions
- [ ] Plan Unity Jobs integration
- [ ] Plan UE TaskGraph integration

**Related:** `docs/CrossCuttingConcerns.md` #6

---

### Documentation & Comparison

#### DOC-004: Comparison with Existing Tools
**Category:** Documentation
**Effort:** Medium

**Tasks:**
- [ ] Create comparison table (PlayMaker, GameCreator, Visual Scripting, BlockCoding)
- [ ] Highlight differentiators
- [ ] Document migration paths

**Related:** `TODO.md` line 42

---

#### DOC-005: Unit Testing Strategy
**Category:** Quality Assurance
**Effort:** Low

**Tasks:**
- [ ] Define where tests live
- [ ] Choose testing framework per layer
- [ ] Create test template/examples

**Related:** `TODO.md` line 41

---

## P4 - Future / Deferred

### Performance & Optimization

#### PERF-001: Early Performance Testbed
**Category:** Research
**Effort:** Medium
**Dependencies:** MVP implementation complete

**Tasks:**
- [ ] Create performance comparison scenarios
- [ ] Measure native vs LunyScript overhead
- [ ] Identify optimization opportunities

**Related:** `TODO.md` line 46

---

#### PERF-002: API Versioning & Compatibility
**Category:** Maintenance
**Effort:** Low
**Dependencies:** API stabilized

**Tasks:**
- [ ] Establish semantic versioning policy
- [ ] Design deprecation workflow
- [ ] Plan multi-version support (if feasible)

**Related:** `docs/CrossCuttingConcerns.md` #8

---

### Goals & Vision

#### PLAN-001: Goals and Non-Goals Definition
**Category:** Planning
**Effort:** Low

**Tasks:**
- [ ] Formalize project goals
- [ ] Define explicit non-goals (scope boundaries)
- [ ] Document in vision/goals document

**Related:** `TODO.md` line 20

---

#### PLAN-002: Implementation Language & Bindings
**Category:** Planning
**Effort:** Low

**Tasks:**
- [ ] Document implementation language (C#)
- [ ] Document binding languages (Lua, GDScript)
- [ ] Define binding strategy

**Related:** `TODO.md` line 21

---

### Research

#### RSH-001: GDScript Verbosity Analysis
**Category:** Research
**Effort:** Low
**Priority:** Optional

**Tasks:**
- [ ] Compare code verbosity (Unity, Godot, LunyScript)
- [ ] Compare editor interaction overhead (clicks, drags)
- [ ] Validate hypothesis about UI workload offset

**Related:** `TODO.md` lines 62-63

---

## Completed Tasks

*(Move tasks here when completed, with completion date)*

---

## Notes

### Task Naming Convention
- **CC-NNN:** Cross-Cutting Concern
- **ABS-NNN:** Abstraction design
- **DOC-NNN:** Documentation
- **QST-NNN:** Design question resolution
- **TOOL-NNN:** Tooling and debugging
- **INT-NNN:** Integration and extension
- **FT-NNN:** Feature implementation
- **PERF-NNN:** Performance and optimization
- **PLAN-NNN:** Planning and vision
- **RSH-NNN:** Research

### Updating This Document
- Move tasks to "Completed" section when done
- Add completion date
- Update `CHANGELOG.md` with summary of completed work
- Keep priorities up to date as new information emerges
