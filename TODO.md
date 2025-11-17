# TODO

## Notes

## URGENT

- Video (30s): Nullref vs In-Scene notes
- Video (30-60s): How does Luny work (very high level)


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

### findings

- challenge: type differences - string, int, array?
- beginners have issues working with collections (array or dictionary, how to use)
	- could leverage the Table concept for variables

- manuals often too technical (Godot)
> Strings are reference-counted and use a copy-on-write approach, so passing them around is cheap in resources. 
> Constructs a new String from the given int. 
(note: was from 5 years ago)


facebook https://www.facebook.com/groups/IndieGameDevs/posts/10158096682296573/
Mutee Ur Rahman
Godot is cool, but I now think beginners should start with something easier. For years I struggled to learn engines like Unity, Godot, Gamemaker, but due to my learning disability I couldn't get far. That changed when I started with Gdevelop. It is advertised as a codeless engine, it is open source and feature rich. If you want to finish the learning process faster, this is the way to go. I now don't have to worry about syntax and baggage that comes with coding and can get to game logic immediately. Gdevelop is still like programming but with a lot less boilerplate and a lot less fuss.


## High-Level

- bebilderte (hypothetische) codebeispiele einfügen für gesamteindruck, diskussion
- add document: learner benefits summary (put on website)
    - semantics, consistency, portability => standardization, patterns, no null, event driven, no outside references, sequential thinking => statemachines - bt

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
