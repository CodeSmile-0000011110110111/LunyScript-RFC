# LunyScript Is A DSL

.. not an API.

## API vs DSL: Key Differences

| Factor | API (Application Programming Interface) | DSL (Domain-Specific Language) | LunyScript Position | Score |
|--------|----------------------------------------|--------------------------------|---------------------|-------|
| **Purpose** | Provides functions/methods to interact with external systems | Provides specialized syntax/constructs for a specific domain | Gameplay programming abstractions (Coroutines, StateMachines, BehaviorTrees) | **70% DSL** |
| **Syntax** | Uses host language syntax | Has its own syntax/grammar | "Declarative, syntax-reduced, block-based C# DSL" | **90% DSL** |
| **Abstraction Level** | Low-level, imperative calls | High-level, domain-focused expressions | "High-level processing" with 3-5x less code than GDScript | **85% DSL** |
| **Learning Curve** | Learn function signatures | Learn domain concepts + syntax | "Accessible programming seated between visual and native code" | **60% DSL** |
| **Extensibility** | Call additional functions | Extend grammar/add constructs | "Easy to extend. Expected to be extended." | **50/50** |
| **Integration** | Library/SDK that calls engine code | Language that compiles/translates to engine code | Block-based C# that executes cross-engine | **75% DSL** |
| **Flexibility** | Limited to provided functions | Domain-constrained but expressive within scope | Scoped to gameplay (Input/Motion/Physics/Audio, NOT shaders/networking) | **80% DSL** |

## Overall Classification

**LunyScript: 73% DSL / 27% API**

**Reasoning:** LunyScript is primarily a **DSL** because it:
- Has declarative, syntax-reduced grammar distinct from standard C#
- Provides domain-specific abstractions (StateMachines, BehaviorTrees)
- Focuses on expressing gameplay logic concisely
- "Block-based C# DSL" explicitly stated in the document

However, it retains **API characteristics** through:
- Cross-engine execution requiring API-like integration layer (Luny)
- Extensibility model suggesting programmable interfaces (yes, for framework developers)
- Builds on C# (host language) rather than being fully standalone (yes, and can be bound to other languages)
