# TODO

## Notes

## URGENT

- !! make many small how-to videos
  - as teasers for LunyScript and always invite users to "star" the repo!
  - topics: button does something, collision does something, input does something, timer, spawner, char motion
- Video (30s): Nullref vs In-Scene notes
- Video (2-3 min): "What is LunyScript", benefits, goals, how does it work (very high level)
  - "I write code (first three letters printed on screen as i say them, then cut) .. for Godot (add logo left) .. and Unity (add logo right) .. together (what to show here? squeeze them together, with hearts?). -- I write LunyScript! (show code example) It's easier than GDScript and works in both engines the same. Yes. Portable code. (cut) -- (show various examples, code and effect.) "
  - Mext one shows how to spawn something and how changing code changes what happens on screen. Maybe they all should do that.

- add browser tab fav-icon 
-  PIMP THE GIF!!! show engine logos, show editor then focus onto game view, code: label "Same" 3x successively  

### Community Findings

facebook https://www.facebook.com/groups/IndieGameDevs/posts/10158096682296573/
Mutee Ur Rahman
Godot is cool, but I now think beginners should start with something easier. [..] Gdevelop is still like programming but with a lot less boilerplate and a lot less fuss.

## High-Level

- bebilderte (hypothetische) codebeispiele einfügen für gesamteindruck, diskussion
- add document: learner benefits summary (put on website)
    - semantics, consistency, portability => standardization, patterns, no null, event driven, no outside references, sequential thinking => statemachines - bt

- !!! start a "CRM" categorizing and prioritizing engines, social channels, etc. and keeping track of context

## Documentation Review


## Design

- Design goal: LunyScript provides key debugging insights: name resolution, event propagation and receivers (count, names), execution trace, ..
- Design goal: all sequences are created up-front, and are re-usable (templates). What changes is the context (running object). It should help avoid creating instances when spawning a prefab with associated LunyScript.
- Design goal: avoid external references. Use "SendEvent" only to make things happen on other objects. Caution: order of operations! Ideally a "same-frame" guarantee of SendEvent and event handling would be great, ie move event handlers to end of processing list (events sent by event handlers are delayed which would be an okay compromise).
- Add section or document with list of foreseeable challenges, risks, and alternatives to pursue if risk materializes
- Make note of design process: implement Unity, for each feature analyze other engine's API surface and feature limitations to avoid implementing non-shared functionality
- Define goals and non-goals
- Note implementation language (C#), and binding languages (GDScript)
- Define feature coverage matrix (per engine) on high level (ie Camera, Input, Animation, Terrain, Navigation, ..)
- Define optional / future features (without matrix) which may require logic within the core (eg Raycasts) or dependencies on extensions (eg Terrain)
- Compile complete list of types to abstract, map, or use from .NET or other frameworks (eg RaycastHit, Math)
- Define core abstractions (ICoroutineScheduler, IStateMachine, IBehaviorTree, IEventDispatcher)
- Define precise boundaries between Luny (cross-engine abstraction layer) and LunyScript (logic implementation, fluent API)
- Design object registration system and identity management - assess portability and setup steps (goal: 100% automatable), assess user workflow (goal: least friction)
- Specify event ordering contract (parent-first vs child-first, frame phases)
- **Finalize lifecycle event semantics** - clarify distinction between Step vs Update (physics timestep vs per-frame), consider renaming for clarity
- Design execution tracing/profiling hooks (zero-overhead when disabled)
- Design error handling and recovery strategy
- Resolve open questions (coroutine implementation, FSM/BT ownership, variable scope, asset references)
- Design code generator for language bindings (GDScript) - enable users to extend API themselves, not just core maintainers
- Document LunyScript advantages over native GDScript: declarative vs imperative, fluent API vs full syntax, gameplay-focused vs general-purpose, portability

## Documentation - Technical Deep-Dive

- Create technical architecture overview document (intro to architecture)
- Document debugging and tooling capabilities
- Create integration guide: native escape hatches (conditions/actions), using native types, interaction with native code
- Document native code interaction and limitations (e.g., native code creates/destroys objects - will LunyScript be aware?)
- Document extension/customization capabilities and workflows (e.g., add C# extension method)
- Define how and where unit tests are done
- Create comparison table: PlayMaker, GameCreator, Visual Scripting/Blueprints, BlockCoding (Godot extension), etc.

## Implementation

- Early Performance Testbed: same tasks, measuring performance of native vs LunyScript implementation (Update vs Repeat.Forever loop incrementing a variable / stack of boxes, each handling collision enter/exit which makes them "light up" during contact)

## Promotion
- Post to social media, invite feedback

## Roadmap

- Define the goals for each roadmap phase, define what "success" means

## Research Tasks

### Tutorial Creator Market Research
- **Survey YouTube game dev educators:**
  - How many teach multiple engines?
  - Pain points when creating multi-engine content?
  - Would unified API reduce their workload?
  - What would convince them to try LunyScript?
- **Identify potential early adopters:**
  - Tutorial creators who already teach Unity AND Godot
  - Educators frustrated with engine switching overhead
  - Bootcamps/courses teaching engine-agnostic game design
- **Competition analysis:**
  - What alternatives exist for tutorial creators? (none?)
  - How do current educators handle multi-engine content?
