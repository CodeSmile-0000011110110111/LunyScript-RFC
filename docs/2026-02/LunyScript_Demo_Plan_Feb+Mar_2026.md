# LunyScript_Demo_Plan_Feb+Mar_2026.md

codebase gaps are pretty clear: almost everything. For gameplay I only have Create/Destroy/Enable/Disable object blocks and variable blocks, and reload scene. The rest is debugging and foundation. LunyScript supports For/If/While blocks, global and local variables, and coroutines, next to engine events (Update, Heartbeat).
LunyScript execute for objects with matching names upon scene load and on instantiate. I want to allow for pattern matching so we can have numbered enemies.
A Unity project with many Kenney assets already integrated exists.

question is whether we'll need a statemachine if not behaviour tree implementations for the demo?
otherwise it's mainly the basics: input (action maps, not direct input), ui label + data binding (via variables), audio and vfx (could simply instantiate auto-play/auto-destroy prefabs for these, at first), ... what else?

if it still makes sense for you to look at the codebase to understand the architecture and LunyScript builder patterns, go ahead and read it

i'd like a prioritized 2-week implementation plan

---


Let me examine the codebase to understand your architecture and builder patterns, then create the implementation plan.Perfect. Now I understand your architecture. Let me create a prioritized 2-week implementation plan focused on the survivor demo.## Architecture Understanding

Your LunyScript builder pattern is elegant:
- Fluent builders (`Timer`, `Counter`, `On`, `Object`)
- Internal blocks execute actions/conditions
- Event scheduler handles lifecycle (Ready, Created, Enabled, etc.)
- Variables via `Var`/`GVar` accessors
- Coroutines for time-based/count-based execution

**Gaps for survivor demo (as you noted):**
- Input (action mapping)
- Transform (position, rotation, look-at)
- Physics (raycasts for aiming, collision detection)
- Audio/VFX (can start with prefab instantiation)
- UI (minimal: text labels with variable binding)
- Random (for spawning, drops, variations)

**Re: StateMachine/BehaviorTree:**
For a survivor demo, you **don't need** FSM or BT initially. Enemy AI can be:
- Coroutine-based: spawn, move toward player, die
- Script per enemy type with simple logic
- BT would be nice for "smarter" enemies but not MVP

You could add FSM for player states (idle/moving/attacking/dead) but even that's overkill for MVP.

---

## 2-Week Prioritized Implementation Plan

**Philosophy:** Implement minimum viable blocks to make gameplay functional, defer polish/debugging tools.

### **Week 1: Core Gameplay Foundation** (Feb 17-23)

#### **Days 1-2: Input System** (Critical Path)
**Goal:** Player can move with WASD/arrows

**Implementation:**
1. **Input API design** (LunyScript/Api/InputApi.cs)
```csharp
Input.Action("Move").Do(blocks)
   Input.Action("Move").Value() // returns Vector2
```


2. **LunyEngine input abstraction** (Luny/Engine/Services/LunyInputServiceBase.cs)
    - Abstract methods: `GetActionValue(string actionName)`, `IsActionPressed(string actionName)`
    - Unity/Godot adapters: map to InputSystem/Input singleton

3. **LunyScript blocks**
    - `InputActionBlock` (condition): checks if action is active
    - `InputActionValueBlock` (variable): returns Vector2/float value

**Deliverable:** Script moves player via `On.FrameUpdate(Object.Move(Input.Action("Move").Value()))`

---

#### **Days 3-4: Transform & Movement** (Critical Path)
**Goal:** Objects can move, rotate, face direction

**Implementation:**
1. **Transform API** (LunyScript/Api/TransformApi.cs)
```csharp
Transform.Move(direction, speed)
   Transform.LookAt(target) // or LookDirection(vector)
   Transform.Position() // returns Vector3 variable
```


2. **LunyEngine transform abstraction**
    - `ILunyTransform` interface with Position, Rotation, LocalScale
    - Unity/Godot adapters wrap Transform/Transform3D

3. **LunyScript blocks**
    - `TransformMoveBlock`: translates object by direction * speed * deltaTime
    - `TransformLookAtBlock`: rotates to face target/direction
    - `TransformPositionBlock`: returns position as Variable

**Deliverable:** Player moves in 8 directions, enemies move toward player

---

#### **Days 5-6: Object Spawning & Randomness** (Critical Path)
**Goal:** Enemies spawn at random positions, waves increase

**Implementation:**
1. **Random API** (LunyScript/Api/RandomApi.cs)
```csharp
Random.Int(min, max) // returns variable
   Random.Float(min, max)
   Random.Vector3(minX, maxX, minY, maxY, minZ, maxZ) // for spawn positions
   Random.Choice(options) // for enemy types
```


2. **Enhanced Object.Create**
    - Already exists but needs position parameter:
```csharp
Object.Create("Enemy").From("Prefabs/Enemy").At(position).Do()
```


3. **LunyEngine random service** (Luny/Engine/Services/LunyRandomServiceBase.cs)
    - Wraps System.Random or engine's RNG

**Deliverable:** Enemies spawn in random positions around arena edge

---

#### **Day 7: Variable Operations & Wave Logic**
**Goal:** Track score, wave number, enemy count

**Implementation:**
1. **Variable arithmetic enhancement** (already exists, verify it works)
    - `Var["score"].Add(10)`, `Var["wave"].Increment()`

2. **Wave spawner script:**
```csharp
Timer("WaveSpawner").Every(30).Seconds().Do(
       GVar["wave"].Increment(),
       Counter("SpawnEnemies").Every(1).Seconds()
           .For(GVar["wave"].Multiply(5)) // 5 enemies per wave, scaled
           .Do(Prefab.Instantiate("Enemy").At(Random.Vector3(...)))
   )
```


**Deliverable:** Wave-based enemy spawning with difficulty curve

---

### **Week 2: Combat & Polish** (Feb 24-Mar 3)

#### **Days 8-9: Combat System** (Critical Path)
**Goal:** Player shoots projectiles, enemies take damage and die

**Implementation:**
1. **Physics API** (LunyScript/Api/PhysicsApi.cs)
```csharp
Physics.OnCollision(Object.Destroy()) // when this object collides
   Physics.OnTriggerEnter(blocks) // for projectile hits
```


2. **Object tagging/identification**
    - `Object.HasTag("Enemy")` condition block
    - Unity/Godot: use Tags/Groups

3. **Health/Damage via variables**
```csharp
On.Created(Var["health"].Set(100))
   On.TriggerEnter(
       Var["health"].Subtract(10),
       If(Var["health"].LessThan(0)).Then(Object.Destroy())
   )
```


**Deliverable:** Projectiles damage enemies, enemies die

---

#### **Days 10-11: Audio/VFX & UI**
**Goal:** Basic juice (particles, sounds, score display)

**Implementation:**
1. **Audio/VFX via prefabs** (deferred full API)
```csharp
// Prefabs auto-play and self-destruct
   Prefab.Instantiate("VFX/Explosion").At(Object.Position())
   Prefab.Instantiate("Audio/Hit") // instantiate at origin
```


2. **UI Text binding** (LunyScript/Api/UIApi.cs)
```csharp
UI.Text("ScoreLabel").Bind(GVar["score"]) // updates text every frame
   UI.Text("WaveLabel").Bind("Wave: ", GVar["wave"]) // with prefix
```


3. **LunyEngine UI service**
    - `UpdateText(string labelName, string value)`
    - Unity/Godot: find UI element by name, update text

**Deliverable:** Score/wave display, hit effects with particles/audio

---

#### **Days 12-13: Enemy AI & Projectiles**
**Goal:** Enemies chase player, player auto-fires

**Implementation:**
1. **Target tracking** (Transform API extension)
```csharp
Transform.MoveToward(targetName, speed) // moves toward named object
   Transform.DirectionTo(targetName) // returns normalized vector
```


2. **Enemy script:**
```csharp
On.FrameUpdate(Transform.MoveToward("Player", 2.0))
```


3. **Player projectile spawning:**
```csharp
Counter("AutoFire").Every(10).Frames().Do(
       Prefab.Instantiate("Projectile")
           .At(Object.Position())
           .WithRotation(Transform.Rotation())
   )
```


4. **Projectile script:**
```csharp
On.Ready(Transform.Move(Transform.Forward(), 10)) // move in forward direction
   Timer("Lifetime").In(3).Seconds().Do(Object.Destroy())
```


**Deliverable:** Functional combat loop

---

#### **Day 14: Integration & Testing**
**Goal:** Playable demo in Unity

1. **Scene setup:** Arena, spawn points, UI canvas
2. **Prefab creation:** Player, Enemy, Projectile, VFX, Audio
3. **Balance tuning:** Enemy speed, spawn rate, damage
4. **Bug fixes & polish**

**Deliverable:** 2-minute gameplay video ready

---

## API Priority Summary

**Must-have (Week 1):**
1. ✅ Input (action mapping, value reading)
2. ✅ Transform (move, rotate, position)
3. ✅ Random (spawn positions, variety)
4. ✅ Variables (score, wave, health)

**Must-have (Week 2):**
5. ✅ Physics (collision/trigger events)
6. ✅ UI (text binding)
7. ✅ Object tagging (identify enemies/player)

**Nice-to-have (defer if time):**
- Audio/VFX APIs (use prefab workaround)
- Camera follow (manually position camera for now)
- Pooling (instantiate/destroy is fine for demo)

---

## Implementation Notes

**Pattern matching for numbered enemies:**
- Defer this. For demo, use generic "Enemy" name
- Post-demo: implement wildcard matching (`Enemy*` matches `Enemy_0`, `Enemy_1`)

**StateMachine/BehaviorTree:**
- **Skip for demo.** Coroutines + If statements are sufficient
- Highlight in Epic application as "planned features"

**Unity project with Kenney assets:**
- Use this as your demo project immediately
- Implement APIs in parallel with demo development
- Test each API as you build it

---

## Risk Mitigation

**If running behind:**
1. **Cut enemy variety:** Single enemy type, no waves (endless spawn)
2. **Cut projectiles:** Player kills on touch (melee)
3. **Cut UI:** Just gameplay, no score display
4. **Cut audio/VFX:** Silent, functional combat only

**Core MVP:** Player moves, enemies spawn and chase, player kills enemies. That's your Epic submission minimum.

---## Summary

**2-Week Plan:**
- **Week 1:** Input, Transform, Random, Variables → Player movement + enemy spawning
- **Week 2:** Physics, UI, AI → Combat loop + juice

**Day-by-day breakdown** ensures you hit milestones without scope creep.

**Your questions answered:**
- **No FSM/BT needed** for demo (coroutines + If statements sufficient)
- **Start Unity-only** (fastest, best tooling, Epic respects it)
- **Audio/VFX via prefabs initially** (defer full API, use editor-configured prefabs)
- **UI minimal:** Text labels with variable binding only

**Next steps:**
1. Confirm this plan aligns with your vision
2. I'll help you architect the Input API (Day 1 task)
3. We'll work day-by-day, tracking progress with TodoWrite

Does this plan work for you? Should I proceed with **Day 1: Input API architecture**?


----

Continued in => [LunyScript_Demo_Plan_Feb+Mar_2026__Input.md](/docs/2026-02/LunyScript_Demo_Plan_Feb+Mar_2026__Input.md)
