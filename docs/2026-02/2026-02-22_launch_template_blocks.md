# launch_template_blocks_22_02_2026

For the Brotato3D game I want to get a clear overview of the required blocks. I wrote down what I see, please add any missing blocks/features. Give me a prioritized list.

And give me an extrapolation of what a script would look like that does the wave spawning (spawn in clusters within evenly divided "square sectors" of the map (one cluster per sector), mark spawn locations 2s ahead of time, avoid spawning into player, capped at 100 active enemies, using active/inactive object with reset state instead of create/destroy but needs initial instantiation) and what parts should be integrated into blocks: With the goal of primarily creating re-usable, not specific-purpose blocks - though "systems" like spawn waves can be an exception but where the blocks would still be tailored to be general purpose within the feature.

Brotato3D - Required Blocks

SETUP:
These things behave well enough out of the box without scripting once set up in the editor:
- Cinemachine => target tracking, zoom
- Particles => spawns a prefab
- Avoidance => rigidbody + colliders keeps enemies apart
- Input => using Action maps, works with keyboard/mouse + gamepad
- UI styling => utilizing UI Toolkit builder

HAVE Blocks:
- Input
- Transform.Move
- Object/Prefab.Create
- Object Enable/Disable
- Global + Local variables with arithmetic/comparison blocks
- Scene reload

NEED Blocks:
- pause gameplay (for live inspection)
- UI:
    - Label update with variable binding (score, countdown, healthbar)
    - Game over/won labels
    - simple button menu: restart, quit (pauses game)
- Transform.SetPosition
- Transform.SetRotation, RotateToTarget (aim)
- Transform.SetScale (for a "breathing" look like Brotato)
- Find Closest X (in children of object specified by name)
- Perform actions on the result
- Collision detection events, using tags for differentiation
- Play Audio FX
- Play Music track
- Wave Spawn System (configurable, driven by blocks)
- Random
- Find/determine spawn location for individual objects (show spawn marker)
- distance check on spawn (don't spawn into player)
- wave or game over: stop game (disable player input, stop enemy motion or destroy them), may require stopping timers, coroutines to avoid spamming If()

NEED Editor Features:
- Inspector editor for LunyScripts (provides user supplied fields to scripts), could be SOs
- Onscreen inspection tools (tbd, eg click on object, see its variables, block execution trace, profiling stats, asset load issues)

NICE TO HAVE Blocks:
- Local Couch Input ie split Input by device/user
- Rigidbody.AddForce (nicer physics motion)
- Object Pooling (if object instantiation creates lag spikes)
- Easing (for rotation, scale)
- specialized attack behaviours (ie damage arc, swing weapon, dash forward, spawn projectiles 360° with optional time delay)

NICE TO HAVE game features:
- damage numbers
- simple character select (different weapon loadout)


------------


## Missing Critical Blocks

You're missing several **essential** blocks for a functional Brotato clone:

**CRITICAL (must have for basic gameplay):**
- **Health/Damage system** - take damage, die, deal damage
- **Timer/Counter display** (wave countdown, survival timer)
- **Weapon firing** - auto-aim closest enemy, shoot projectile/raycast
- **Enemy AI** - move toward player, attack on proximity
- **XP/Progression** - collect drops, level up trigger
- **Object.Destroy** or Object.Recycle (for pooling)
- **Math operations** - clamp, min/max, lerp (for health bars, movement)
- **List/Array operations** - for managing active enemies, spawn points

**HIGH PRIORITY (needed for polish):**
- **Invulnerability frames** (i-frames after hit)
- **Screen shake** (on damage/kill)
- **Time.DeltaTime scaling** (for frame-independent movement)
- **Projectile behavior** - move direction, lifetime, collision
- **Loot drops** - spawn on death, move to player

**MEDIUM (gameplay depth):**
- **Stat modifiers** - speed, damage, fire rate upgrades
- **Multiple weapon handling** - fire 2-6 weapons simultaneously
- **Knockback** - push enemies on hit

---

## Prioritized Block Development List

### **Phase 1: Core Gameplay Loop (Weeks 1-2)**
1. Health/Damage blocks (player + enemy)
2. Collision detection + tags
3. Enemy AI (MoveToward player)
4. Weapon firing (auto-aim + shoot)
5. Object pooling/recycling system
6. Timer countdown (wave timer)
7. Find closest target
8. Transform.SetPosition/Rotation
9. Audio FX trigger

### **Phase 2: Wave System (Week 3)**
10. Wave spawn manager (your complex system)
11. Random position in bounds
12. Distance checks
13. Object enable/disable (already have)
14. Enemy cap enforcement

### **Phase 3: Progression (Week 4)**
15. XP collection + level up
16. Stat modifiers system
17. UI Label binding (score, health, timer)
18. Game over/win conditions
19. Pause system

### **Phase 4: Polish (Week 5-6)**
20. Screen shake
21. I-frames
22. Transform.SetScale + breathing animation
23. Damage numbers
24. Loot drops + magnetism
25. Easing functions

### **Phase 5: Nice-to-Have (Post-launch)**
26. Multiple weapons
27. Character select
28. Local multiplayer
29. Advanced attacks
30. Rigidbody physics

---

## Wave Spawning Script Example

Here's what a LunyScript wave spawner might look like, with **block abstraction analysis**:

```csharp
public class WaveSpawner : Script
{
    public override void Build(ScriptContext context)
    {
        // Configuration
        Define("MaxEnemies", 100);
        Define("SpawnDelay", 2.0f);
        Define("WaveInterval", 30.0f);
        Define("SectorsPerSide", 4); // 4x4 = 16 sectors
        Define("EnemiesPerCluster", 5);
        
        // Wave timer
        Var.Set("CurrentWave", 1);
        Var.Set("EnemiesAlive", 0);
        
        // Initialize enemy pool
        On.Ready(
            Pool.Create("Enemy", "Prefabs/Enemy", GVar.Get("MaxEnemies"))
        );
        
        // Wave loop
        Timer("WaveTimer").Every(GVar.Get("WaveInterval")).Seconds().Do(
            Var.Increment("CurrentWave"),
            Coroutine("SpawnWave").Start()
        );
        
        // Spawn wave coroutine
        Coroutine("SpawnWave").Define(co =>
        {
            var sectorsToSpawn = Map.DivideSectors(
                Transform.Get("SpawnArea"), 
                GVar.Get("SectorsPerSide")
            );
            
            For(sectorsToSpawn.Count).Do(i =>
            {
                // Get random point in sector, avoid player
                var spawnPos = sectorsToSpawn[i].GetRandomPoint()
                    .AvoidRadius(Transform.Get("Player").Position, 5.0f);
                
                // Show spawn marker
                VFX.SpawnMarker(spawnPos, GVar.Get("SpawnDelay"));
                
                // Wait for delay
                co.Wait(GVar.Get("SpawnDelay")).Seconds();
                
                // Spawn cluster if under cap
                If(Var.Get("EnemiesAlive") < GVar.Get("MaxEnemies")).Then(
                    For(GVar.Get("EnemiesPerCluster")).Do(
                        Pool.GetInactive("Enemy").Enable().At(
                            spawnPos.AddRandomOffset(2.0f)
                        ),
                        Var.Increment("EnemiesAlive")
                    )
                );
            });
        });
        
        // Enemy death handling
        On.Event("EnemyDied").Do(
            Var.Decrement("EnemiesAlive")
        );
    }
}
```


---

## Block Abstraction Analysis

**What should be general-purpose blocks:**

### ✅ **Make These Reusable Blocks:**

1. **Pool.Create(name, prefab, size)** - generic object pooling
2. **Pool.GetInactive(name)** - returns disabled object from pool
3. **Pool.Return(object)** - recycle object
4. **Transform.GetRandomInBounds(bounds)** - random position in area
5. **Transform.AvoidRadius(position, radius)** - get position avoiding area
6. **VFX.SpawnMarker(position, duration)** - visual indicator
7. **Map.DivideSectors(bounds, divisions)** - grid division
8. **Sector.GetRandomPoint()** - random point in sector
9. **Position.AddRandomOffset(radius)** - scatter positioning
10. **Var.Increment/Decrement(name)** - counter operations
11. **Coroutine.Wait(duration).Seconds()** - yield time
12. **On.Event(name)** - custom event listener

### ⚠️ **System-Specific (but configurable):**

13. **WaveManager component** - handles timing, progression
    - Exposed params: interval, enemies per wave, sector count
    - Uses general blocks internally
    - Could be a pre-built script user modifies

### ❌ **Don't Make These Blocks (too specific):**

- "SpawnBrotatoWave" - too game-specific
- "SpawnInSquareGrid" - combine Map.DivideSectors + Random
- "EnemyCounterIncrement" - use generic Var.Increment

---

## Recommended Block Design

**Core principle:** Blocks should compose, not prescribe.

### **Good Block Design:**
```csharp
// General-purpose, composable
var enemyPool = Pool.Create("Enemies", enemyPrefab, 100);
var spawnPoint = Map.GetRandomPoint(spawnArea)
    .AvoidRadius(player.Position, 5f);
var enemy = enemyPool.GetInactive().Enable().At(spawnPoint);
```


### **Bad Block Design:**
```csharp
// Too specific, not reusable
SpawnWave.InSquareGrid(enemyPrefab, 16, avoidPlayer: true);
```


---

## What Code Should Be in Blocks vs Scripts

### **In Blocks (engine/common patterns):**
- Object pooling
- Spatial queries (closest, random position, grid division)
- VFX spawning (markers, explosions)
- Audio triggers
- Health/damage arithmetic
- Timer/coroutine control
- UI data binding

### **In User Scripts (game-specific logic):**
- Wave progression rules (enemies scale with wave number)
- Spawn patterns (sector strategy)
- Enemy behavior variations
- Weapon loadout logic
- Upgrade trees

---

## Revised Wave Spawner (More Idiomatic)

```csharp
public class WaveSpawner : Script
{
    public override void Build(ScriptContext context)
    {
        // Pool setup
        On.Ready(
            Pool.Create("Enemy", "Prefabs/Enemy", capacity: 100)
        );
        
        // Spawn wave every 30s
        Every(30).Seconds().Do(
            SpawnWave()
        );
    }
    
    ScriptBlock SpawnWave()
    {
        var sectors = Map.DivideSectors(
            Object.Named("SpawnArea"), 
            gridSize: 4 // 4x4 = 16 sectors
        );
        
        var spawnSequence = Sequence();
        
        For(sectors.Count).Do(i =>
        {
            var spawnPos = sectors[i].RandomPoint()
                .AvoidRadius(Transform.Player.Position, 5f);
            
            spawnSequence.Add(
                VFX.Marker(spawnPos).Duration(2).Seconds(),
                Wait(2).Seconds(),
                If(Pool.ActiveCount("Enemy") < 100).Then(
                    SpawnCluster(spawnPos, count: 5)
                )
            );
        });
        
        return spawnSequence;
    }
    
    ScriptBlock SpawnCluster(Vector3 center, int count)
    {
        return For(count).Do(
            Pool.Get("Enemy")
                .Enable()
                .At(center.AddRandomOffset(2f))
        );
    }
}
```


---

## Key Takeaways for Development

1. **Build spatial/utility blocks first** - Random, Bounds, Distance, Closest
2. **Object pooling is mandatory** - Don't ship without it (GC spikes = bad reviews)
3. **Wave system can be example script** - Users modify, not a rigid block
4. **Health/Damage before spawning** - Can't test spawning without combat
5. **Your friend needs these 15 blocks minimum** for his game:
    - Health, Damage, Collision
    - MoveToward, FindClosest
    - Pool.Create/Get/Return
    - Timer, Random
    - Audio.Play, VFX.Spawn
    - UI.UpdateLabel, UI.Show/Hide
    - Transform.SetPosition/Rotation/Scale
    - On.Collision

6. **Debug tools become essential fast** - Tracking "EnemiesAlive" variable live = huge QoL

---

## Estimated Development Time

- **Phase 1 (Core blocks):** 2 weeks
- **Phase 2 (Wave system):** 1 week
- **Phase 3 (Progression):** 1 week
- **Brotato template game:** 2 weeks (parallel with Phase 4-5)
- **Phase 4 (Polish blocks):** 1.5 weeks
- **Debug tools:** 1.5 weeks (can overlap)

**Total: 7-8 weeks** to launch-ready Brotato3D template + required blocks.

This aligns with your Month 1-2 timeline. Start with Phase 1, test with simplified wave spawning (manual placement), then build Phase 2 once core combat feels good.


--------------

give me the complete list of blocks to create, grouped by high-level categories, and within each category split into 1-3 sections: must have, should have, nice to have

write the list in the the style where the block's category is prefixed on every line eg "Pool.Create\nPool.Return" so that i can more easily move them, rename them, etc

conclude this with another list of the high priority blocks to create in weeks 1+2, with block creation assigned to individual days (5 days each week)


------------------


## Complete Block List by Category

### **Object Management**
```
Object.Create
Object.Destroy
Object.Enable
Object.Disable
Object.IsActive
Object.Named
Object.WithTag
Object.FindAll
Object.FindInChildren
Object.FindInParent
```


**Should Have:**
```
Object.Clone
Object.SetParent
Object.GetParent
Object.GetChild
Object.GetChildren
Object.ChildCount
Object.SetActive
```


**Nice to Have:**
```
Object.SetLayer
Object.GetLayer
Object.SendMessage
Object.BroadcastMessage
```


---

### **Pool**
```
Pool.Create
Pool.Get
Pool.GetInactive
Pool.Return
Pool.ActiveCount
Pool.InactiveCount
Pool.Clear
```


**Should Have:**
```
Pool.Warmup
Pool.Expand
Pool.Shrink
Pool.GetAll
Pool.ReturnAll
```


**Nice to Have:**
```
Pool.GetOrCreate
Pool.SetCapacity
Pool.GetCapacity
```


---

### **Transform**
```
Transform.Move
Transform.MoveBy
Transform.MoveToward
Transform.SetPosition
Transform.GetPosition
Transform.SetRotation
Transform.GetRotation
Transform.RotateToward
Transform.LookAt
Transform.SetScale
Transform.GetScale
Transform.GetForward
Transform.GetRight
Transform.GetUp
```


**Should Have:**
```
Transform.LocalPosition
Transform.LocalRotation
Transform.LocalScale
Transform.WorldPosition
Transform.WorldRotation
Transform.WorldScale
Transform.Translate
Transform.Rotate
Transform.RotateAround
Transform.Distance
```


**Nice to Have:**
```
Transform.MoveSmooth
Transform.RotateSmooth
Transform.ScaleSmooth
Transform.Orbit
Transform.Follow
```


---

### **Spatial**
```
Spatial.FindClosest
Spatial.FindInRadius
Spatial.Distance
Spatial.Direction
Spatial.RandomInBounds
Spatial.RandomInRadius
Spatial.AvoidRadius
```


**Should Have:**
```
Spatial.FindFarthest
Spatial.FindInCone
Spatial.FindInBox
Spatial.IsInRange
Spatial.IsInView
Spatial.Clamp
```


**Nice to Have:**
```
Spatial.FindPath
Spatial.HasLineOfSight
Spatial.GetNearestSurface
Spatial.ProjectOnPlane
```


---

### **Map**
```
Map.GetBounds
Map.DivideSectors
Map.RandomPoint
Map.IsInBounds
```


**Should Have:**
```
Map.GetCenter
Map.GetCorners
Map.GetEdgePoint
Map.GridPoints
```


**Nice to Have:**
```
Map.GetSpawnPoints
Map.GetPatrolPoints
Map.GetNavMesh
```


---

### **Collision**
```
Collision.OnEnter
Collision.OnStay
Collision.OnExit
Collision.HasTag
Collision.GetObject
Collision.GetPoint
Collision.GetNormal
```


**Should Have:**
```
Collision.GetForce
Collision.GetVelocity
Collision.GetContacts
Trigger.OnEnter
Trigger.OnStay
Trigger.OnExit
```


**Nice to Have:**
```
Collision.IgnorePair
Collision.RestorePair
Raycast.Cast
Raycast.CastAll
```


---

### **Health**
```
Health.Set
Health.Get
Health.TakeDamage
Health.Heal
Health.GetMax
Health.SetMax
Health.IsDead
Health.IsAlive
Health.GetPercent
```


**Should Have:**
```
Health.OnDamage
Health.OnDeath
Health.OnHeal
Health.SetInvulnerable
Health.IsInvulnerable
Health.Kill
```


**Nice to Have:**
```
Health.AddShield
Health.GetShield
Health.AddArmor
Health.GetArmor
Health.Regenerate
```


---

### **Combat**
```
Combat.DealDamage
Combat.GetDamageSource
Combat.SetDamage
Combat.GetDamage
```


**Should Have:**
```
Combat.Knockback
Combat.CriticalHit
Combat.ApplyStatusEffect
Combat.RemoveStatusEffect
Combat.HasStatusEffect
```


**Nice to Have:**
```
Combat.DamageInRadius
Combat.DamageInCone
Combat.DamageInLine
Combat.ApplyDOT
Combat.Stun
```


---

### **Weapon**
```
Weapon.Fire
Weapon.GetClosestTarget
Weapon.AutoAim
Weapon.SetCooldown
Weapon.IsReady
```


**Should Have:**
```
Weapon.Reload
Weapon.GetAmmo
Weapon.SetAmmo
Weapon.AddAmmo
Weapon.SetFireRate
Weapon.SetRange
```


**Nice to Have:**
```
Weapon.Burst
Weapon.Spread
Weapon.Pierce
Weapon.Bounce
Weapon.Chain
```


---

### **Projectile**
```
Projectile.Spawn
Projectile.SetDirection
Projectile.SetSpeed
Projectile.SetLifetime
Projectile.OnHit
```


**Should Have:**
```
Projectile.SetHoming
Projectile.SetPiercing
Projectile.SetBounce
Projectile.Destroy
```


**Nice to Have:**
```
Projectile.SetGravity
Projectile.SetTrail
Projectile.Split
Projectile.Explode
```


---

### **AI**
```
AI.MoveToward
AI.MoveToPosition
AI.ChaseTarget
AI.StopMovement
AI.SetSpeed
AI.GetSpeed
```


**Should Have:**
```
AI.FleeFrom
AI.Wander
AI.Patrol
AI.Orbit
AI.KeepDistance
AI.AvoidObstacles
```


**Nice to Have:**
```
AI.FormationMove
AI.Swarm
AI.Flocking
AI.StateMachine
```


---

### **Variable**
```
Var.Set
Var.Get
Var.Add
Var.Subtract
Var.Multiply
Var.Divide
Var.Increment
Var.Decrement
Var.Exists
Var.Delete
```


**Should Have:**
```
Var.Toggle
Var.Clamp
Var.Min
Var.Max
Var.Lerp
Var.Compare
```


**Nice to Have:**
```
Var.Serialize
Var.Deserialize
Var.Watch
Var.Bind
```


---

### **Math**
```
Math.Add
Math.Subtract
Math.Multiply
Math.Divide
Math.Random
Math.RandomRange
Math.Clamp
Math.Min
Math.Max
Math.Abs
```


**Should Have:**
```
Math.Lerp
Math.InverseLerp
Math.Round
Math.Floor
Math.Ceil
Math.Sign
Math.Pow
Math.Sqrt
```


**Nice to Have:**
```
Math.Sin
Math.Cos
Math.Tan
Math.Atan2
Math.Remap
Math.SmoothStep
Math.PingPong
```


---

### **List**
```
List.Create
List.Add
List.Remove
List.Get
List.Set
List.Count
List.Clear
List.Contains
```


**Should Have:**
```
List.RemoveAt
List.Insert
List.IndexOf
List.First
List.Last
List.Random
List.Shuffle
```


**Nice to Have:**
```
List.Sort
List.Filter
List.Map
List.ForEach
List.Find
List.FindAll
```


---

### **Timer**
```
Timer.Create
Timer.Start
Timer.Stop
Timer.Pause
Timer.Resume
Timer.Reset
Timer.IsRunning
Timer.GetElapsed
Timer.GetRemaining
```


**Should Have:**
```
Timer.SetDuration
Timer.OnComplete
Timer.OnTick
Timer.AddTime
Timer.Loop
```


**Nice to Have:**
```
Timer.Accelerate
Timer.Decelerate
Timer.PulseOnBeat
```


---

### **Coroutine**
```
Coroutine.Start
Coroutine.Stop
Coroutine.Pause
Coroutine.Resume
Coroutine.Wait
Coroutine.WaitFrames
Coroutine.WaitUntil
```


**Should Have:**
```
Coroutine.IsRunning
Coroutine.StopAll
Coroutine.Chain
Coroutine.Parallel
```


**Nice to Have:**
```
Coroutine.Repeat
Coroutine.RepeatUntil
Coroutine.Sequence
```


---

### **Input**
```
Input.Button
Input.ButtonDown
Input.ButtonUp
Input.Direction
Input.Axis
Input.Mouse
Input.MouseDelta
Input.IsGamepad
Input.IsKeyboard
```


**Should Have:**
```
Input.GetDevice
Input.Vibrate
Input.AnyButton
Input.SetSensitivity
Input.GetActionMap
Input.SetActionMap
```


**Nice to Have:**
```
Input.GetPlayer
Input.AssignDevice
Input.UnassignDevice
Input.Rebind
Input.SaveBindings
Input.LoadBindings
```


---

### **UI**
```
UI.SetText
UI.GetText
UI.Show
UI.Hide
UI.Toggle
UI.IsVisible
UI.BindVariable
UI.UpdateLabel
```


**Should Have:**
```
UI.SetImage
UI.SetColor
UI.SetAlpha
UI.FadeIn
UI.FadeOut
UI.SetProgress
UI.Button.OnClick
UI.SetActive
```


**Nice to Have:**
```
UI.Shake
UI.Pulse
UI.Tween
UI.Notify
UI.Dialog
UI.Menu
```


---

### **Audio**
```
Audio.PlaySFX
Audio.PlayMusic
Audio.StopSFX
Audio.StopMusic
Audio.SetVolume
Audio.GetVolume
```


**Should Have:**
```
Audio.PauseMusic
Audio.ResumeMusic
Audio.FadeIn
Audio.FadeOut
Audio.SetPitch
Audio.PlayAtPosition
```


**Nice to Have:**
```
Audio.Crossfade
Audio.PlayRandomSFX
Audio.SetMusicLoop
Audio.StopAllSFX
Audio.DuckMusic
```


---

### **VFX**
```
VFX.Spawn
VFX.SpawnMarker
VFX.Despawn
VFX.SetDuration
```


**Should Have:**
```
VFX.SpawnAtPosition
VFX.AttachTo
VFX.Detach
VFX.SetColor
VFX.SetScale
```


**Nice to Have:**
```
VFX.Trail
VFX.ScreenShake
VFX.FlashScreen
VFX.SlowMotion
VFX.FreezeFrame
```


---

### **Camera**
```
Camera.SetTarget
Camera.GetTarget
Camera.Shake
Camera.SetZoom
Camera.GetZoom
```


**Should Have:**
```
Camera.SmoothFollow
Camera.LookAt
Camera.SetBounds
Camera.Impulse
Camera.ZoomTo
```


**Nice to Have:**
```
Camera.Cutscene
Camera.SplitScreen
Camera.SetPerspective
Camera.SetOrthographic
```


---

### **Scene**
```
Scene.Load
Scene.Reload
Scene.GetCurrent
Scene.Unload
```


**Should Have:**
```
Scene.LoadAsync
Scene.LoadAdditive
Scene.SetActive
Scene.GetLoaded
```


**Nice to Have:**
```
Scene.Preload
Scene.GetProgress
Scene.OnLoaded
Scene.OnUnloaded
```


---

### **Game**
```
Game.Pause
Game.Resume
Game.IsPaused
Game.Quit
Game.TimeScale
Game.GetTimeScale
```


**Should Have:**
```
Game.Restart
Game.GameOver
Game.Victory
Game.SetState
Game.GetState
```


**Nice to Have:**
```
Game.Save
Game.Load
Game.Checkpoint
Game.ResetToCheckpoint
```


---

### **XP**
```
XP.Add
XP.Get
XP.GetLevel
XP.GetProgress
XP.SetLevelThreshold
XP.OnLevelUp
```


**Should Have:**
```
XP.GetTotal
XP.GetForNextLevel
XP.SetMultiplier
XP.Reset
```


**Nice to Have:**
```
XP.AddBonus
XP.SetCurve
XP.GetRank
```


---

### **Stats**
```
Stats.Set
Stats.Get
Stats.Add
Stats.Multiply
Stats.GetBase
Stats.GetModified
Stats.AddModifier
Stats.RemoveModifier
```


**Should Have:**
```
Stats.GetAll
Stats.Reset
Stats.SaveSnapshot
Stats.LoadSnapshot
```


**Nice to Have:**
```
Stats.Clamp
Stats.Scale
Stats.Decay
```


---

### **Loot**
```
Loot.Drop
Loot.Collect
Loot.SetMagnetism
Loot.OnCollect
```


**Should Have:**
```
Loot.DropRandom
Loot.DropTable
Loot.SetVelocity
Loot.Despawn
```


**Nice to Have:**
```
Loot.SetRarity
Loot.SpawnEffect
Loot.Stack
```


---

### **Debug**
```
Debug.Log
Debug.LogWarning
Debug.LogError
Debug.DrawLine
Debug.DrawSphere
Debug.DrawBox
Debug.ToggleInspector
Debug.WatchVariable
```


**Should Have:**
```
Debug.DrawRay
Debug.DrawPath
Debug.ToggleProfiler
Debug.ShowBlockTrace
Debug.BreakPoint
Debug.Assert
```


**Nice to Have:**
```
Debug.Screenshot
Debug.RecordVideo
Debug.Teleport
Debug.GodMode
```


---

## Week 1-2 Development Schedule (High Priority Blocks)

### **Week 1: Core Gameplay Foundation**

**Day 1 (Monday) - Object & Transform Basics:**
```
Object.Create
Object.Destroy
Object.Enable
Object.Disable
Object.Named
Transform.SetPosition
Transform.GetPosition
Transform.SetRotation
Transform.GetRotation
Transform.Move
Transform.MoveBy
```


**Day 2 (Tuesday) - Health & Damage:**
```
Health.Set
Health.Get
Health.TakeDamage
Health.Heal
Health.GetMax
Health.SetMax
Health.IsDead
Health.GetPercent
Health.OnDamage
Health.OnDeath
Combat.DealDamage
Combat.GetDamageSource
```


**Day 3 (Wednesday) - Collision & Tags:**
```
Collision.OnEnter
Collision.OnStay
Collision.OnExit
Collision.HasTag
Collision.GetObject
Collision.GetPoint
Object.WithTag
Object.FindAll
```


**Day 4 (Thursday) - Spatial Queries:**
```
Spatial.FindClosest
Spatial.FindInRadius
Spatial.Distance
Spatial.Direction
Spatial.RandomInBounds
Spatial.RandomInRadius
Spatial.AvoidRadius
Transform.MoveToward
Transform.LookAt
Transform.Distance
```


**Day 5 (Friday) - AI & Movement:**
```
AI.MoveToward
AI.MoveToPosition
AI.ChaseTarget
AI.StopMovement
AI.SetSpeed
AI.GetSpeed
Transform.RotateToward
Transform.SetScale
Transform.GetScale
```


---

### **Week 2: Combat & Systems**

**Day 6 (Monday) - Weapon & Projectile:**
```
Weapon.Fire
Weapon.GetClosestTarget
Weapon.AutoAim
Weapon.IsReady
Weapon.SetCooldown
Projectile.Spawn
Projectile.SetDirection
Projectile.SetSpeed
Projectile.SetLifetime
Projectile.OnHit
```


**Day 7 (Tuesday) - Object Pooling:**
```
Pool.Create
Pool.Get
Pool.GetInactive
Pool.Return
Pool.ActiveCount
Pool.InactiveCount
Pool.Clear
Pool.Warmup
```


**Day 8 (Wednesday) - Variables & Math:**
```
Var.Increment
Var.Decrement
Var.Add
Var.Subtract
Var.Multiply
Var.Clamp
Math.Random
Math.RandomRange
Math.Min
Math.Max
Math.Lerp
List.Create
List.Add
List.Get
List.Count
List.Random
```


**Day 9 (Thursday) - UI & Audio:**
```
UI.SetText
UI.BindVariable
UI.UpdateLabel
UI.Show
UI.Hide
UI.SetProgress
Audio.PlaySFX
Audio.PlayMusic
Audio.StopSFX
Audio.StopMusic
Audio.SetVolume
```


**Day 10 (Friday) - Game State & Timers:**
```
Game.Pause
Game.Resume
Game.IsPaused
Game.TimeScale
Timer.OnComplete
Coroutine.WaitUntil
XP.Add
XP.Get
XP.GetLevel
XP.OnLevelUp
Scene.Reload
Game.Quit
```


---

**Total Blocks Created in Weeks 1-2: ~100 blocks**

**Remaining for Weeks 3-5:**
- Map/Sector system (Day 11-12)
- VFX & Screen effects (Day 13)
- Loot & drops (Day 14)
- Stats & modifiers (Day 15)
- Polish blocks (Days 16-20)
- Debug tools (Days 21-25)

This schedule gets you to a **playable Brotato3D prototype by end of Week 2**, with polishing in Weeks 3-5.


----------------
