# Cross-Engine Functionality Matrix

**Purpose:** Documents core functionality needed to create 3D games like Megabonk with LunyScript, assessing priority and portability across Unity and Godot.

**Document Type:** Feature Requirements & Portability Risk Assessment

**Last Updated:** 2025-11-09

---

## Priority & Portability Legend

**Priority Levels:**
- 🔴 **Critical** - Required for Megabonk MVP
- 🟡 **High** - Important for production-ready games
- 🟢 **Medium** - Quality-of-life/advanced features

**Portability Risk:**
- ✅ **Low** - Engines behave similarly, minimal abstraction needed
- ⚠️ **Medium** - Notable differences, needs careful abstraction
- ❌ **High** - Significant behavioral/capability gaps

---

## 1. Input System 🔴 ⚠️

**Priority:** Critical - Core gameplay interaction for Megabonk

**Portability Risk:** Medium

**Differences:**
- Unity: Input System package (modern) vs legacy Input Manager; action-based events; rebinding API
- Godot: Built-in InputMap; action/axis model; different device polling approach

**Challenges:**
- Dead zones and sensitivity curves differ by default
- Touch/multitouch handling inconsistencies
- Gamepad button mapping (Xbox vs PlayStation layouts)
- Mouse capture/lock behavior varies

**Impact:** Players experience different control feel between engines

**Mitigation:**
- Normalize input values through Luny abstraction
- Provide tunable dead zones/curves
- Map to virtual buttons/axes, not physical hardware
- Document behavioral quirks that can't be normalized

---

## 2. Physics & Collision 🔴 ❌

**Priority:** Critical - Character movement, collision detection

**Portability Risk:** High

**Differences:**
- Unity: PhysX (Nvidia); continuous collision detection; layer-based collision matrix
- Godot: Custom 3D physics; different CCD approach; per-object collision masks

**Challenges:**
- Collision resolution order differs
- Raycasts may hit different objects on same frame (precision/order)
- Sleeping/wake behavior diverges
- Trigger event timing (OnTriggerEnter vs area_entered)
- Velocity inheritance from moving platforms

**Impact:** Core gameplay mechanics behave differently (jumping, collision responses)

**Mitigation:**
- Define deterministic collision query semantics (sort results by distance)
- Document non-deterministic scenarios (simultaneous collisions)
- Provide simplified collision shapes to minimize edge cases
- Consider fixed timestep physics wrapper
- Extensive cross-engine testing for critical mechanics

---

## 3. Object Lifecycle & Scene Management 🔴 ⚠️

**Priority:** Critical - Spawning, destroying, parenting objects

**Portability Risk:** Medium

**Differences:**
- Unity: GameObject/Component; Instantiate/Destroy; deferred destruction
- Godot: Node tree; instance/queue_free; immediate vs deferred free

**Challenges:**
- Destruction timing (end-of-frame vs immediate)
- Callback order on destroy (OnDestroy vs _exit_tree)
- Parent/child order of lifecycle events
- Prefab/Scene instantiation differences

**Impact:** Scripts may run on destroyed objects or miss cleanup

**Mitigation:**
- Force consistent deferred destruction model
- Define strict lifecycle event order (covered in CrossCuttingConcerns.md)
- Validate object existence before access
- Clear parent/child event propagation rules

---

## 4. Transform & Hierarchy 🔴 ✅

**Priority:** Critical - Positioning, rotation, scaling, parenting

**Portability Risk:** Low

**Differences:**
- Unity: Transform component; local/world space
- Godot: Node3D with transform property; similar local/global API

**Challenges:**
- Minimal - both use similar matrix math
- Rotation representation (Quaternion vs Basis) but convertible
- Slight precision differences in deeply nested hierarchies

**Impact:** Negligible for typical game scenarios

**Mitigation:**
- Abstract as Luny Transform type
- Use quaternions internally
- Document potential floating-point divergence at extreme scales

---

## 5. Rendering & Materials 🟡 ❌

**Priority:** High - Visual appearance, shaders, lighting

**Portability Risk:** High

**Differences:**
- Unity: HDRP/URP/Built-in pipelines; ShaderGraph/HLSL
- Godot: Forward+/Mobile/Compatibility renderers; Visual Shader/GLSL

**Challenges:**
- Shader language incompatibility (HLSL vs GLSL)
- Material properties differ significantly
- Lighting models diverge
- Post-processing pipelines are engine-specific
- Render order/queue differences

**Impact:** Games look visually different between engines

**Mitigation:**
- **Do NOT abstract shaders** - too complex, accept engine-specific assets
- Provide Luny API for runtime material property tweaks (color, texture, basic params)
- Document that visual appearance requires per-engine artist work
- Focus on functional rendering (visibility, layering) not visual parity

---

## 6. Audio 🔴 ✅

**Priority:** Critical - Sound effects, music

**Portability Risk:** Low

**Differences:**
- Unity: AudioSource/AudioListener; mixer groups
- Godot: AudioStreamPlayer3D; bus system

**Challenges:**
- 3D spatial audio parameters (rolloff curves) differ slightly
- Bus/mixer routing models are different
- Compression format support varies

**Impact:** Minor volume/spatial differences

**Mitigation:**
- Simple Luny audio API: play(sound, volume, position, loop)
- Abstract volume/pitch/spatial settings
- Let engines handle advanced mixing internally
- Use portable formats (OGG, WAV)

---

## 7. Animation 🟡 ⚠️

**Priority:** High - Character animation, transitions

**Portability Risk:** Medium

**Differences:**
- Unity: Animator with Mecanim; AnimationClip; blend trees
- Godot: AnimationPlayer/AnimationTree; keyframe system

**Challenges:**
- State machine models differ
- Blend tree capabilities not equivalent
- IK systems are engine-specific
- Root motion handling varies

**Impact:** Animation transitions may feel different

**Mitigation:**
- Provide simple Luny animation API (play, blend, stop)
- Support basic state machines in script
- Complex animation graphs remain engine-specific
- Focus on functional triggers, not replicating full state systems

---

## 8. Asset Loading 🔴 ⚠️

**Priority:** Critical - Load models, textures, sounds at runtime

**Portability Risk:** Medium

**Differences:**
- Unity: Resources.Load, AssetBundles, Addressables
- Godot: ResourceLoader, preload(), load()

**Challenges:**
- Path conventions differ (res:// vs Assets/)
- Async loading APIs differ
- Asset reference serialization incompatible
- Dependency handling varies

**Impact:** Can't share asset bundles/packages between engines

**Mitigation:**
- Define Luny asset path convention (logical IDs)
- Async loading abstraction with callbacks/promises
- Per-engine asset packaging (accept incompatibility)
- Clear documentation on asset organization

---

## 9. Camera Control 🔴 ✅

**Priority:** Critical - Player perspective, camera following

**Portability Risk:** Low

**Differences:**
- Unity: Camera component with projection settings
- Godot: Camera3D with similar properties

**Challenges:**
- Projection matrix conventions (minor)
- Viewport/culling mask differences
- Multi-camera rendering differs slightly

**Impact:** Minimal for basic camera control

**Mitigation:**
- Luny Camera abstraction (position, FOV, near/far planes)
- Normalize projection parameters
- Simple API for switching active camera

---

## 10. UI System 🟡 ❌

**Priority:** High - HUD, menus, health bars

**Portability Risk:** High

**Differences:**
- Unity: UGUI (Canvas/RectTransform) or UI Toolkit (UXML/USS)
- Godot: Control nodes (anchors/margins)

**Challenges:**
- Layout systems fundamentally different
- Event handling models diverge
- Canvas rendering differs (screen space vs world space)
- Styling/theming incompatible

**Impact:** UI cannot be shared between engines

**Mitigation:**
- **Minimal abstraction** - accept engine-specific UI
- Provide Luny API for updating UI from scripts (set text, show/hide, progress bars)
- Focus on data binding, not layout/styling
- Consider HTML/CSS-based UI layer (future)

---

## 11. Particle Systems 🟢 ❌

**Priority:** Medium - VFX, explosions, trails

**Portability Risk:** High

**Differences:**
- Unity: Shuriken/VFX Graph
- Godot: CPUParticles3D/GPUParticles3D

**Challenges:**
- Parameter models completely different
- GPU particles incompatible
- Emission shapes/curves diverge
- Collision/attraction systems differ

**Impact:** VFX must be recreated per-engine

**Mitigation:**
- **No abstraction** - too complex
- Luny API for triggering/stopping particles only
- Accept that particle systems are engine-specific assets
- Script can position/orient emitters

---

## 12. Pathfinding & Navigation 🟡 ⚠️

**Priority:** High - AI movement, NavMesh

**Portability Risk:** Medium

**Differences:**
- Unity: NavMesh/NavMeshAgent; baked navigation
- Godot: NavigationServer3D; runtime navigation mesh

**Challenges:**
- Baking process differs (offline vs runtime)
- Agent parameters not equivalent
- Dynamic obstacles handling varies
- Query APIs differ

**Impact:** AI pathing may differ slightly

**Mitigation:**
- Luny navigation API (request path, follow path)
- Abstract agent parameters (radius, height, speed)
- Accept that baking is engine-specific
- Provide path waypoint approach for manual control

---

## 13. Raycasting & Spatial Queries 🔴 ⚠️

**Priority:** Critical - Line-of-sight, hit detection, object queries

**Portability Risk:** Medium

**Differences:**
- Unity: Physics.Raycast/SphereCast; layer masks
- Godot: PhysicsDirectSpaceState queries; collision masks

**Challenges:**
- Hit result ordering may differ
- Maximum hits differs
- Layer mask semantics slightly different

**Impact:** Gameplay queries may return different results

**Mitigation:**
- Luny query API with deterministic result ordering (by distance)
- Normalize layer/mask system
- Document multi-hit behavior
- Return sorted, validated results

---

## 14. Coroutines & Async 🔴 ✅

**Priority:** Critical - Time-based logic, sequences

**Portability Risk:** Low

**Differences:**
- Unity: IEnumerator coroutines; yield return
- Godot: await/signals; async methods

**Challenges:**
- Syntax differs but semantics similar
- Timing resolution may vary slightly
- Cancellation models differ

**Impact:** Minimal - both support time-based delays

**Mitigation:**
- LunyScript provides its own coroutine syntax
- Abstract yield points (wait seconds, wait frames)
- Handle cancellation uniformly

---

## 15. Time & Frame Rate 🔴 ⚠️

**Priority:** Critical - Delta time, frame counting

**Portability Risk:** Medium

**Differences:**
- Unity: Time.deltaTime/fixedDeltaTime; Update/FixedUpdate
- Godot: get_process_delta_time(); _process/_physics_process

**Challenges:**
- Fixed timestep values differ by default
- Frame update order differs slightly
- Time scale affects systems differently

**Impact:** Frame-dependent logic may diverge

**Mitigation:**
- Luny abstracts deltaTime and fixedDeltaTime
- Enforce consistent fixed timestep (60Hz default)
- Clearly separate frame update vs physics update
- Scale time uniformly

---

## 16. Triggers & Events 🔴 ⚠️

**Priority:** Critical - Collision triggers, overlaps

**Portability Risk:** Medium

**Differences:**
- Unity: OnTriggerEnter/Exit callbacks
- Godot: area_entered/exited signals

**Challenges:**
- Event timing relative to physics differs
- Multiple triggers on same frame may fire in different order
- Enter/exit pairing guarantees differ

**Impact:** Trigger-based gameplay logic may differ

**Mitigation:**
- Buffer and sort trigger events within frame
- Guarantee enter/exit pairing
- Define Luny trigger lifecycle
- Document race conditions that can't be eliminated

---

## 17. Tags & Layers 🔴 ✅

**Priority:** Critical - Object classification, filtering

**Portability Risk:** Low

**Differences:**
- Unity: String tags + integer layers (0-31)
- Godot: Groups (string-based) + physics layers

**Challenges:**
- Unity has 32 layer limit, Godot has 32 per collision/render
- Tag vs group model slightly different
- Layer collision matrix representation differs

**Impact:** Minimal - both support classification

**Mitigation:**
- Luny tag system (string-based, unlimited)
- Luny layer system (up to 32, collision matrix)
- Map to engine-specific systems at runtime
- Document layer limits

---

## 18. Scripting Lifecycle Hooks 🔴 ⚠️

**Priority:** Critical - Initialization, update loops, cleanup

**Portability Risk:** Medium

**Differences:**
- Unity: Awake/Start/Update/FixedUpdate/LateUpdate/OnDestroy
- Godot: _init/_ready/_process/_physics_process/_exit_tree

**Challenges:**
- Callback names differ
- Ordering between objects differs
- Awake vs _ready semantics not identical
- Scene loading callbacks differ

**Impact:** Initialization order bugs

**Mitigation:**
- **Covered in Event Ordering Contract (CrossCuttingConcerns.md)**
- Define Luny lifecycle phases clearly
- Map to engine callbacks consistently
- Document guaranteed order

---

## 19. Serialization & Save Games 🟡 ❌

**Priority:** High - Game state persistence

**Portability Risk:** High

**Differences:**
- Unity: JsonUtility, ScriptableObjects, custom serializers
- Godot: JSON, ConfigFile, Resource serialization

**Challenges:**
- Object reference serialization incompatible
- Type systems differ
- Scene format incompatible

**Impact:** Save files not portable between engines

**Mitigation:**
- **Accept save file incompatibility**
- Provide Luny serialization API for game state
- Use JSON or custom format
- Serialize logical data, not engine objects
- Per-engine mapping layer

---

## 20. Network & Multiplayer 🟢 ❌

**Priority:** Medium - Future feature

**Portability Risk:** High

**Differences:**
- Unity: Netcode for GameObjects, Mirror, custom
- Godot: High-level multiplayer API, ENet

**Challenges:**
- Network models completely different
- Replication systems incompatible
- Authority/ownership models diverge
- RPC systems differ

**Impact:** Multiplayer code cannot be shared

**Mitigation:**
- **Out of scope for MVP**
- Design network abstraction in future iteration
- Consider engine-agnostic server with thin clients

---

## Summary: Critical Path for Megabonk

**Must Have (MVP):**
1. Input System (⚠️ Medium risk)
2. Physics & Collision (❌ High risk - **biggest challenge**)
3. Object Lifecycle (⚠️ Medium risk)
4. Transform & Hierarchy (✅ Low risk)
5. Audio (✅ Low risk)
6. Asset Loading (⚠️ Medium risk)
7. Camera Control (✅ Low risk)
8. Raycasting & Queries (⚠️ Medium risk)
9. Coroutines (✅ Low risk)
10. Time & Frame Rate (⚠️ Medium risk)
11. Triggers & Events (⚠️ Medium risk)
12. Tags & Layers (✅ Low risk)
13. Scripting Lifecycle (⚠️ Medium risk)

**Important but Not MVP:**
- Rendering/Materials (❌ High risk - accept engine-specific)
- Animation (⚠️ Medium risk)
- UI System (❌ High risk - accept engine-specific)
- Navigation (⚠️ Medium risk)
- Serialization (❌ High risk - defer)

**Future:**
- Particle Systems (❌ accept engine-specific)
- Networking (❌ future design)

---

## Key Portability Insights

**Low-Hanging Fruit (✅):**
- Transform, Camera, Audio, Tags, Coroutines - straightforward abstractions

**Core Challenges (⚠️):**
- Physics determinism is **the biggest technical risk**
- Input normalization requires careful tuning
- Lifecycle/event ordering needs rigorous specification

**Accept Incompatibility (❌):**
- Rendering, UI, Particles are too complex to abstract
- Let artists create engine-specific assets
- Focus scripting API on functionality, not visuals

---

## Related Documents

- **CrossCuttingConcerns.md** - Architectural design priorities
- **Architecture.md** - Full system architecture
- **QUESTIONS.md** - Unresolved design questions
