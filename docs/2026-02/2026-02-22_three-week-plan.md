# 2026-02-22_three-week-plan

I'd like another list. This time it should be about the high-level tasks that lead me to the proposed Brotato3D clone.

Basically I need a high-level todo list that details what the goal is for the end of the day or a given task (ie definition of done) which includes details of what should happen with each individual step. These task goals should include both programming and design aspects, like camera setup, asset import and prep, or design itself (should it be a or b?) etc.

For a start, this might be day 1:
goal: player moves across screen, followed by topdown camera (cinemachine)
- create a scene, add some visual background to ensure scrolling is visible (not a flat plane)
- setup top-down cinemachine follow camera
- create player object (capsule)
- create player script which moves player along x/z via "Move" input

and then day 2:
goal: enemies appear and move towards player, enemies die on contact with player
- define the map borders
- timer-based spawn of enemy prefab (capsule, different color than player)
- enemies spawn at random position within map bounds
- make enemies rotate towards (lerped), and move towards player in straight line
- note: rigidbody + collider prevent enemy overlap

day 3:
goal: shoot enemies (dead) with projectiles
- locate closest enemy
- rotate player towards closest
- create projectile moving in that direction
- projectile colliding with enemy kills enemy
- remove enemy kill on player touch

and so forth ...

it would suffice to map this out for the first 3 weeks: core loop, and wave spawn

-----

Name Mashups:
Bro3D
Brothreeto
Brorito / Brorrito
Sistato / Sweet Sistato
Girtato
Soritato

-----

## Brotato3D Development Schedule - Weeks 1-3

Decisions:
- create Unity-specific blocks in LunyScript.Unity but using the LunyScript namespace
- may need array/list variables
- test script extensibility/modularity:
  - LunyScript inheritance, Build() calls base.Build()
  - static helper methods returning combo blocks
  - lambda actions
- How are "Stats" different from variables?
- Repurpose variable ingame inspecting UI when not seeing variables becomes painful (1-2 days)

### **Week 1: Core Movement & Combat Loop**

**Day 1: Player Movement & Camera**
Goal: Player moves across screen, followed by top-down camera (Cinemachine)
- [X] Create new scene "Sistato Demo"
- [X] Add ground plane (10x10 scale) with checker texture to visualize movement
- [X] Add 4-5 scattered cube obstacles (different heights) to ensure camera parallax visible
- [X] Setup Cinemachine Camera: top-down angle (60-70° from horizontal), orthographic or perspective?
- [X] Set Follow target to Player (decide: tight follow or dampened?)
- [X] Create Player object (capsule, scale 1x2x1, green material)
- [X] Create PlayerMovement_LunyScript: `On.FrameUpdate(Transform.MoveBy(Input.Direction("Move"), speed: 5))`
- [X] Test: keyboard WASD + gamepad left stick both work

**Day 2: Enemy Spawning & AI**
Goal: Enemies appear and move towards player, enemies die on contact with player
- [X] Define map bounds: Create "SpawnArea" empty GameObject with BoxCollider (10x10, isTrigger)
- [X] Create Enemy prefab: capsule (scale 0.8x1.5x0.8, red material, Rigidbody + SphereCollider)
- [X] Rigidbody settings: freeze rotation XYZ, drag 0, mass 1
- [X] Create EnemySpawner_LunyScript:
    - `Timer("Spawn").Every(2).Seconds().Do(Object.Create(enemyPrefab).At(Spatial.RandomInBounds(spawnArea)))`
    - [X] spawn enemy prefab with path
    - [X] spawn to a parent object
    - [ ] take spawn position from spawn area or just random in range
- [X] Create EnemyAI_LunyScript: `On.FrameUpdate(AI.ChaseTarget(Object.Named("Player"), speed: 3))`
  - Uses transform move, not physics
- Create PlayerHealth_LunyScript:
    - `Health.Set(100)`
    - `On.Collision.WithTag("Enemy").Do(Health.TakeDamage(10), Object.Destroy(Collision.GetObject()))`
- Test: enemies spawn, chase, damage player on touch, then die
- Status: 
  - faked death (time based)
  - spent extra time on googly eyes
- Deferred:
  - collision handling: no collision event handling yet
  - spawn position

**Day 3 (prep): Collision API**
- [X] add googly eyes to enemies (spent too much time on this but it's fun)
- [X] implementing collision/trigger event callbacks (Unity only)

**Day 4: Bug Report **
- [X] Identified and reported a "Console double-click opens wrong line" issue caused by calling a method with a UnityEngine.Object parameter
- [X] Removed the necessity of trailing .Do() calls to finalize builders

**Day 3: Weapon & Projectile System**
Goal: Shoot enemies (dead) with projectiles
- Create Projectile prefab: sphere (scale 0.3, yellow material, Rigidbody kinematic, SphereCollider trigger)
- Create ProjectileMovement_LunyScript:
    - `On.FrameUpdate(Transform.MoveBy(Transform.GetForward(), speed: 10))`
    - `Timer("Lifetime").In(3).Seconds().Do(Object.Destroy(Object.This))`
- Create ProjectileHit_LunyScript:
    - `On.Collision.WithTag("Enemy").Do(Object.Destroy(Collision.GetObject()), Object.Destroy(Object.This))`
- Create PlayerWeapon_LunyScript:
    - `Var.Set("FireRate", 0.5)`
    - `On.FrameUpdate(Transform.LookAt(Spatial.FindClosest("Enemy")))`
    - `Every(Var.Get("FireRate")).Seconds().Do(Weapon.Fire(projectilePrefab, Transform.GetForward()))`
- Remove player damage on enemy touch (comment out collision damage)
- Add Enemy tag to Enemy prefab
- Setup Physics collision matrix
- Test: player rotates toward closest enemy, shoots projectiles, enemies die on hit
- Decision: 
  - Should weapon fire only when enemies present and in range, or always? (prefer always for simplicity)
  - Should we have melee weapons (returns back to player) right now?

**Day 5: Health System & UI**
Goal: Player health visible, death triggers game over
- Create Canvas with UI Toolkit
- Add HealthBar (ProgressBar) at top-left
- Add HealthText (Label) showing "HP: 100/100" (within bar)
- Create PlayerHealthUI_LunyScript:
    - `UI.BindVariable("HealthBar.value", Health.GetPercent())`
    - `UI.UpdateLabel("HealthText", "HP: " + Health.Get() + "/" + Health.GetMax())`
- Create GameOver_LunyScript:
    - `On.Health.Death().Do(Game.Pause(), UI.Show("GameOverPanel"), UI.Show("RestartButton"))`
- Add GameOver panel (hidden by default) with "GAME OVER" text + "Restart" button
- Add RestartButton: `UI.Button.OnClick().Do(Scene.Reload())`
- Test: take damage, health bar updates, die at 0 HP, game over appears, restart works
- Decision: 
  - Should health bar be percentage or segments (hearts)? (prefer percentage for now)

**Day 5: Audio & Polish**
Goal: Add audio feedback for actions
- Import 5-6 free SFX (shoot, hit, enemy_death, player_hit, game_over)
- Find CC0 assets from: freesound.org, Kenney.nl, itch.io
- Add Audio.PlaySFX() to:
    - PlayerWeapon: shoot sound on fire
    - ProjectileHit: hit + enemy_death on kill
    - PlayerHealth: player_hit on damage
    - GameOver: game_over sound on death
    - Note: could skip API by spawning "audio playback" prefab (play on awake)
- Add background music loop (simple 8-bit arcade track)
- Create AudioManager_LunyScript: `On.Ready(Audio.PlayMusic("bgm_brotato", loop: true, volume: 0.3))`
  - Idea: ignore trailing whitespace (+ underscore, dash) and "LunyScript"/"Script" at end of object/script names
- Test: all actions have audio feedback, music loops
- Decision: Mute button needed? (defer to UI pass later)
- Polish: Adjust volumes, ensure not overwhelming

---

### **Week 2: XP, Weapons, Polish**

**Day 6: XP & Level Up**
Goal: Killing enemies drops XP gems, collecting levels you up
- Create XPGem prefab: small octahedron (scale 0.5, green material, SphereCollider trigger)
- Create XPGem_LunyScript:
    - `On.FrameUpdate(Transform.MoveToward(Object.Named("Player"), speed: 8))` (magnetism)
    - `On.Collision.WithTag("Player").Do(XP.Add(10), Object.Destroy(Object.This), Audio.PlaySFX("xp_collect"))`
    - needs a scaling trigger collider (collector) on player which "picks up" items
    - optimal: make gems fly towards player, scale down & destroy when close
- Update ProjectileHit_LunyScript:
    - Add `Loot.Drop(xpGemPrefab, Collision.GetPoint())` before destroying enemy
- Create PlayerXP_LunyScript:
    - `XP.SetLevelThreshold(100)` (100 XP per level)
    - `XP.OnLevelUp().Do(Audio.PlaySFX("levelup"), VFX.Spawn("levelup_flash"), UI.Show("LevelUpPanel"))`
- Add XP UI: Label showing "Level: 1 | XP: 0/100"
- Test: kill enemy → XP gem drops → moves to player → collect → XP increases → level up at 100
- Decision: 
  - Should XP requirement scale per level (100, 150, 200...) or stay flat? (prefer scaling: `100 + (level * 50)`)

**Day 7: Multiple Weapons**
Goal: Player fires 2-3 weapons simultaneously at different angles
- Create WeaponSlot system:
    - Var.Set("WeaponCount", 3)
    - Var.Set("WeaponAngles", [-15, 0, 15]) (degrees offset from forward)
- Update PlayerWeapon_LunyScript:
    - `For(Var.Get("WeaponCount")).Do(i => Weapon.Fire(projectilePrefab, Transform.GetForward().RotateBy(WeaponAngles[i])))`
- Test: player shoots 3 projectiles in fan pattern
- Decision: Should weapons auto-unlock at specific levels? (yes: 1 weapon at L1, 2 at L3, 3 at L5)
- Create WeaponUnlock_LunyScript:
    - `XP.OnLevelUp().Do(If(XP.GetLevel() == 3).Then(Var.Set("WeaponCount", 2)))`
    - `XP.OnLevelUp().Do(If(XP.GetLevel() == 5).Then(Var.Set("WeaponCount", 3)))`
- Test: start with 1 weapon, unlock 2 at L3, unlock 3 at L5
- Polish: Add VFX flash when weapon unlocks

**Day 8: Enemy Variety**
Goal: 2-3 enemy types with different stats
- Create FastEnemy prefab: smaller (0.6 scale), yellow, speed 5, HP 50
- Create TankEnemy prefab: larger (1.2 scale), purple, speed 2, HP 150
- Update Enemy prefabs with Health component:
    - BasicEnemy: Health.SetMax(100)
    - FastEnemy: Health.SetMax(50)
    - TankEnemy: Health.SetMax(150)
- Update ProjectileHit to use Health.TakeDamage(25) instead of instant kill
- Create EnemyDeath_LunyScript:
    - `Health.OnDeath().Do(Loot.Drop(xpGemPrefab), VFX.Spawn("death_particles"), Audio.PlaySFX("enemy_death"), Object.Destroy(Object.This))`
- Update EnemySpawner to randomly pick enemy type:
    - `Timer("Spawn").Every(2).Seconds().Do(Object.Create(List.Random(enemyPrefabs)).At(Spatial.RandomInBounds(spawnArea)))`
- Test: 3 enemy types spawn, different behaviors, die after taking enough damage
- Decision: 
  - Should tank enemies have knockback resistance? (defer to combat polish)
- Polish:
  - add charging enemies (stop, orient towards player, rush)
  - add enemy spawning bullets on death

**Day 9: Stats & Upgrades (System)**
Goal: Player stats (speed, damage, fire rate) can be modified (preset based on character, no ingame interruption)
- Create PlayerStats_LunyScript:
    - `Stats.Set("MoveSpeed", 5)`
    - `Stats.Set("Damage", 25)`
    - `Stats.Set("FireRate", 0.5)`
    - `Stats.Set("MaxHealth", 100)`
- Update PlayerMovement to use `Stats.Get("MoveSpeed")`
- Update PlayerWeapon to use `Stats.Get("FireRate")` and `Stats.Get("Damage")`
- Update PlayerHealth to use `Stats.Get("MaxHealth")`
- Create simple level-up upgrade UI:
    - Panel with 2 upgrade choices (buttons)
    - "Increase Damage +10" → `Stats.Add("Damage", 10)`
    - "Increase Speed +1" → `Stats.Add("MoveSpeed", 1)`
- Test: level up → stat increases -> noticable change
- Decision: Fixed or random upgrades per level?
- Decision: Should upgrades stack infinitely or cap? (prefer infinite for now, roguelike feel)

**Day 10: Object Pooling (move up/down depending on performance)**
Goal: Replace Instantiate/Destroy with pooling to prevent lag spikes
- Implement Pool.Create, Pool.Get, Pool.Return blocks
- Create PoolManager_LunyScript:
    - `On.Ready(Pool.Create("BasicEnemy", basicEnemyPrefab, 50))`
    - `On.Ready(Pool.Create("FastEnemy", fastEnemyPrefab, 30))`
    - `On.Ready(Pool.Create("TankEnemy", tankEnemyPrefab, 20))`
    - `On.Ready(Pool.Create("Projectile", projectilePrefab, 100))`
    - `On.Ready(Pool.Create("XPGem", xpGemPrefab, 200))`
- Replace all Object.Create() with Pool.Get()
- Replace all Object.Destroy() with Pool.Return()
- Add enemy/projectile reset logic on return to pool:
    - Health.Set(Health.GetMax())
    - Transform.SetPosition(Vector3.zero)
    - Object.Disable() (happens in Pool.Return)
- Test: spawn 100+ enemies, no lag spikes, object count stays stable in hierarchy
- Decision: Pool warmup on Ready or lazy spawn? (prefer warmup to avoid first-frame hitch)

---

### **Week 3: Wave System & Core Loop Polish**

**Day 11: Wave Timer & Progression**
Goal: Waves with countdown timer, difficulty increases each wave
- Add Wave UI: "Wave: 1 | Time: 0:20" (increments by +0:05 every wave until 1:00 reached)
  - Time variables use "seconds" as unit
  - Standardized display of "timer" variables in format as "0:00" (configurable)
- Create WaveManager_LunyScript:
    - `Var.Set("CurrentWave", 1)`
    - `Var.Set("WaveDuration", 20)` (seconds)
    - `Var.Set("WaveTimer", 20)`
    - `On.Ready(UI.UpdateLabel("WaveLabel", "Wave: " + Var.Get("CurrentWave")))`
    - `Every(1).Second().Do(Var.Decrement("WaveTimer"), UI.UpdateLabel("TimerLabel", "Time: " + Var.Get("WaveTimer")))`
    - `On.Var("WaveTimer").Equals(0).Do(StartNextWave())`
- Create StartNextWave method:
    - `Var.Increment("CurrentWave")`
    - `Var.Set("WaveTimer", Var.Get("WaveDuration"))`
    - `Stats.Multiply("EnemyHealth", 1.2)` (enemies 20% tankier each wave)
    - `Stats.Add("EnemySpeed", 0.2)` (enemies slightly faster)
    - `Audio.PlaySFX("wave_complete")`
    - `UI.ShowTemporary("Wave 2!", duration: 2)`
- Test: wave timer counts down, wave 2 starts, enemies harder
- Decision: 
  - Should wave duration increase or stay fixed? (prefer fixed 30s for arcade feel)

**Day 12: Sectored Spawn System**
Goal: Enemies spawn in clusters across map sectors, not randomly scattered
- Create Map.DivideSectors block (divides bounds into grid, arbitrary ie 5x5 or 19x10)
- Create SectorSpawner_LunyScript:
    - `Var.Set("SectorsPerSide", 4)` (4x4 = 16 sectors)
    - `Var.Set("EnemiesPerSector", 3)`
    - `On.WaveStart().Do(SpawnWaveInSectors())`
- Create SpawnWaveInSectors method:
    - `var sectors = Map.DivideSectors(spawnArea, Var.Get("SectorsPerSide"))`
    - `For(sectors.Count).Do(i => SpawnCluster(sectors[i]))`
- Create SpawnCluster method:
    - `var center = sectors[i].RandomPoint().AvoidRadius(playerPos, 5)`
    - `For(Var.Get("EnemiesPerSector")).Do(Pool.Get(RandomEnemyType()).Enable().At(center.AddRandomOffset(2)))`
- Test: enemies spawn in clusters per sector, not on top of player, evenly distributed
- Decision: 
  - All sectors spawn simultaneously or staggered? (prefer staggered with small delay between sectors for visual clarity)

**Day 13: Spawn Markers & Anticipation**
Goal: Show spawn markers 2 seconds before enemies appear
- Create SpawnMarker prefab: red circle decal (Unity Projector or quad), scale 2, pulses
- Create SpawnMarker_LunyScript:
    - `On.Ready(VFX.Pulse(scale: 1.0 to 1.5, duration: 2), Audio.PlaySFX("spawn_warning"))`
    - `Timer("Despawn").In(2).Seconds().Do(Object.Destroy(Object.This))`
- Update SpawnCluster:
    - `VFX.SpawnMarker(spawnPos, duration: 2)`
    - `Coroutine("DelayedSpawn").Wait(2).Seconds().Then(Pool.Get(enemyType).Enable().At(spawnPos))`
- Test: red circles appear → pulse for 2s → enemies spawn at those locations
- Decision: 
  - Should marker show enemy type (color-coded)? (defer to polish, use generic red for now)
- Polish: 
  - Add sound effect that builds tension during 2s delay
  - Prevent spawning into player (instead: spawn with random offset, don't skip)

**Day 14: Enemy Cap & Performance**
Goal: Max 100 active enemies, excess enemies queue or don't spawn
- Create EnemyCounter_LunyScript:
    - `Var.Set("MaxEnemies", 100)`
    - `Var.Set("ActiveEnemies", 0)`
    - `On.Event("EnemySpawned").Do(Var.Increment("ActiveEnemies"))`
    - `On.Event("EnemyDied").Do(Var.Decrement("ActiveEnemies"))`
- Update SpawnCluster:
    - `If(Var.Get("ActiveEnemies") < Var.Get("MaxEnemies")).Then(/* spawn logic */)`
    - After spawn: `Event.Trigger("EnemySpawned")`
- Update EnemyDeath:
    - Add `Event.Trigger("EnemyDied")` before Pool.Return
- Add debug UI: "Enemies: 47/100"
- Test: spawn many enemies fast, count never exceeds 100, UI updates correctly
- Decision: 
  - What happens to excess spawns? (prefer: silently skip, no queuing for simplicity)
- Profile: Confirm 100 enemies + 200 projectiles runs at 60 FPS (what system? web build?)

**Day 15: Victory Condition & Loop**
Goal: Survive 10 waves = victory, show win screen, restart option
- Update WaveManager:
    - `Var.Set("TotalWaves", 10)`
    - `On.Var("CurrentWave").Equals(Var.Get("TotalWaves") + 1).Do(Victory())`
- Create Victory method:
    - `Game.Pause()`
    - `UI.Show("VictoryPanel")` ("YOU WIN! Survived 10 waves")
    - `UI.Show("RestartButton")`
    - `Audio.PlayMusic("victory_theme")`
    - `VFX.Confetti()` (particle effect)
- Add VictoryPanel UI (hidden by default)
- Test: reach wave 10 → countdown → wave 11 triggers victory → can restart
- Decision: 
  - Should there be endless mode after wave 10? (defer to post-launch feature)
- Polish: 
  - Add final score calculation (kills * XP * wave reached)
  - Add a bullet sponge, bullet hell boss mob 
  - Final wave duration is 90s, not the default 60s

---

## Week 3 Summary - Definition of Done

**By end of Week 3, you should have:**

✅ **Core Loop:**
- Player moves, camera follows
- Player auto-aims and shoots closest enemy
- Enemies spawn, chase, take damage, die
- XP drops, magnetizes to player, levels you up

✅ **Wave System:**
- 10 waves with countdown timer (30s each)
- Enemies spawn in sectored clusters
- 2-second spawn markers with anticipation
- Difficulty scales (enemy health/speed)
- 100 enemy cap enforced
- Victory condition after wave 10

✅ **Progression:**
- Level up system with stat upgrades
- Multiple weapons unlock (1→2→3)
- Player stats (speed, damage, fire rate, health)
- 3 enemy types (basic, fast, tank)

✅ **Polish:**
- Health bar, XP bar, wave timer UI
- Game over + victory screens
- Audio (SFX for all actions + BGM)
- Object pooling (no performance issues)

✅ **Technical:**
- All using LunyScript blocks (dogfooding your API)
- ~40-50 blocks implemented and tested
- Scene playable start-to-finish

**Remaining for Weeks 4-5:**
- Upgrade selection UI (polished)
- More enemy types + behaviors
- More weapon types (melee, area damage, etc.)
- Visual polish (Kenney/Synty assets)
- Juice (screen shake, hit pause, damage numbers)
- Balance tuning

This gets you to a **fully playable vertical slice** by Week 3 end, ready for internal playtesting and friend's feedback.

Target Date: April 6th, 2026 (6 weeks from now)
