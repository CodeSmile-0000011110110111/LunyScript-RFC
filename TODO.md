# TODO

## Notes

- ✅ COMPLETED: Reframed primary audience from "Educators" to "Self-Learners & Tutorial Creators (Learnfluencers)" in index.md and README.md (2025-11-07)

- Consider adding group think (tribalism) as problem. It's considered "normal" to code against engine APIs - we don't see how we have to do the same things differently in each engine. Nobody considers this to be a problem. But it leads to reinventing the wheel everywhere. Software libraries like pathfinding are either abstract, agnostic, or are directly integrated in and locked to Unity, Godot, Unreal.


## URGENT

### Evidence Gathering - Support "APIs as Barrier" Claim

We currently lack hard evidence for claims about API complexity being a major barrier. Need to gather:

1. **Quantitative Data:**
   - Survey Reddit r/gamedev, r/godot, r/Unity3D for beginner pain points (search posts with "hard", "difficult", "struggling", "learning")
   - Analyze PlayMaker/GameCreator review sentiment: what problems do buyers say these solve?
   - Count tutorial videos: "Unity for beginners" vs "Godot for beginners" vs "switching from Unity to Godot" - how many focus on API differences?
   - Engine switching pain: search "migrating from Unity to Godot" posts and extract common complaints

2. **Qualitative Evidence:**
   - Find 5-10 direct quotes from learners about API confusion/switching pain
   - Screenshot Reddit responses showing confusion about engine differences (we already have these!)
   - Find testimonials from educators about multi-engine teaching challenges

3. **Honest Reframing (if evidence is thin):**
   - Instead of "#1 barrier", say: "Programming game logic is hard enough. Learning three ways to do it makes it harder."
   - Focus on duplication/inefficiency rather than absolute difficulty
   - Lead with observable fact: "Visual tools like PlayMaker exist specifically to simplify game logic"

**Priority:** HIGH - Needed before outreach to tutorial creators
**Deadline:** Before Phase 3 promotion begins
**Owner:** TBD


## High-Level


## Documentation Review

- Review docs/PrototypersAndGameJammers.md - preliminary content needs validation and refinement
- **Review docs/EngineDifferences.md** - technical accuracy verification needed (especially Godot destruction handling, Unreal component hierarchy mapping, and API philosophy section)


## Design

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
- Design execution tracing/profiling hooks (zero-overhead when disabled)
- Design error handling and recovery strategy
- Resolve open questions (coroutine implementation, FSM/BT ownership, variable scope, asset references)
- Design code generator for language bindings (GDScript) - enable users to extend API themselves, not just core maintainers
- Document LunyScript advantages over native GDScript: declarative vs imperative, fluent API vs full syntax, gameplay-focused vs general-purpose, portability

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

## Promotion
- Short promo video (30s?) - generate storyboard
- Post to social media, invite feedback

## Roadmap

- Define the goals for each roadmap phase, define what "success" means

## README / INDEX - Landing Pages

### Nice to Have

- Add concrete code comparisons to README (Unity vs Godot vs LunyScript)
- Add statistics/examples showing engine-switching is a real problem
- Create visual diagram showing scope boundaries

## Language Bindings

- Consider binding to Lua (low priority - Phase 2+)

## Research Tasks

### Reddit Response Analysis (COMPLETED 2025-11-07)
- ✅ Extracted and categorized all Reddit criticisms from 3 posts
- ✅ Assessed validity of each argument
- ✅ Identified what's already addressed in index.md vs what needs work
- ✅ Created prioritized list (see: private/reddit-responses/analysis.md - if created)

**Key findings:**
- Most objections stem from wrong audience assumptions (professionals vs learners)
- "Just another standard" concern needs addressing
- Need stronger framing around tutorial creators/learnfluencers
- Evidence for "APIs as barrier" claim is weak (anecdotal only)

### GDScript Verbosity vs UI Complexity
- GDScript is a lot less verbose than any other engine language / API. I have a hunch that the extra workload may be offset onto the UI. I recalled how much more clicking & dragging I had to do in Godot vs Unity. => Confirm by comparing code of 2+ simple tasks, and the editor click count to accomplish them.

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
