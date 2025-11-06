# TODO

## Notes

Why?

The definitive answer to the ultimate question:
 Because .. if you make a creation tool more accessible, it widens appeal, and more people will create. As proven by programming languages and game engines. 
 
 Empowering creators is what drives software technology forward.


## High-Level


## Design

- Add section or document with list of foreseeable challenges, risks, and alternatives to pursue if risk materializes
- Make note of design process: implement Unity, for each feature analyze other engine's API surface and feature limitations to avoid implementing non-shared functionality
- Define goals and non-goals
- Note implementation language (C#), and binding languages (Lua, GDScript)
- Define feature coverage matrix (per engine) on high level (ie Camera, Input, Animation, Terrain, Navigation, ..)
- Define optional / future features (without matrix) which may require logic within the core (eg Raycasts) or dependencies on extensions (eg Terrain)
- Compile complete list of types to abstract, map, or use from .NET or other frameworks (eg RaycastHit, Math)
- Define core abstractions (ICoroutineScheduler, IStateMachine, IBehaviorTree, IEventDispatcher)
- Define precise boundaries between Luny (cross-engine abstraction layer) and LunyScript (logic implementation, fluent API)
- Design object registration system and identity management - assess portability and setup steps (goal: 100% automatable), assess user workflow (goal: least friction)
- Specify event ordering contract (parent-first vs child-first, frame phases)
- Design execution tracing/profiling hooks (zero-overhead when disabled)
- Design error handling and recovery strategy
- Resolve open questions (coroutine implementation, FSM/BT ownership, variable scope, asset references)

## Documentation - Technical Deep-Dive

- Create technical architecture overview document (intro to architecture)
- Create architectural overview diagram
- Document debugging and tooling capabilities
- Create integration guide: native escape hatches (conditions/actions), using native types, interaction with native code
- Document native code interaction and limitations (e.g., native code creates/destroys objects - will LunyScript be aware?)
- Document extension/customization capabilities and workflows (e.g., add C# extension method)
- Define how and where unit tests are done
- Create comparison table: PlayMaker, GameCreator, Visual Scripting/Blueprints, BlockCoding (Godot extension), etc.

## Implementation

- Early Performance Testbed: same tasks, measuring performance of native vs LunyScript implementation (Update vs Repeat.Forever loop incrementing a variable / stack of boxes, each handling collision enter/exit which makes them "light up" during contact)


## Roadmap

- Define the goals for each roadmap phase, define what "success" means

## README / INDEX - Landing Pages

### Nice to Have

- Add concrete code comparisons to README (Unity vs Godot vs LunyScript)
- Add statistics/examples showing engine-switching is a real problem
- Create visual diagram showing scope boundaries

## Research Tasks

- GDScript is a lot less verbose than any other engine language / API. I have a hunch that the extra workload may be offset onto the UI. I recalled how much more clicking & dragging I had to do in Godot vs Unity. => Confirm by comparing code of 2+ simple tasks, and the editor click count to accomplish them.
