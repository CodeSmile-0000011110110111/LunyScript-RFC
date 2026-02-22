# 22-02-2026_remove_engine_abstractions


since i go full Unity now ... should I remove all the engine agnostic abstractions?
or just bypass them for the new blocks (avoids creating engine-agnostic types)

------

## Engine Abstraction Decision

**Keep the abstraction layer, but make it pragmatic.**

Here's why:

### **Don't Remove It:**

1. **Sunk cost is minimal** - abstraction already exists, works
2. **Future optionality** - if Unity Asset Store fails, Godot pivot is still possible (Month 10-12 decision point)
3. **Marketing angle** - "Cross-engine DSL" is unique, even if you only sell Unity version initially
4. **Code isolation** - keeps Unity-specific messiness out of your core API design
5. **Testing** - can unit test blocks without Unity runtime

### **But Bypass Strategically:**

**For new blocks in Weeks 1-2, use this decision tree:**

```
Is this block wrapping Unity-specific API? (Rigidbody, NavMesh, specific UI Toolkit)
├─ YES → Direct Unity types, no abstraction
│   Examples: 
│   - Rigidbody.AddForce (Unity physics-specific)
│   - UI.BindVariable (Unity UI Toolkit specific)
│   - NavMesh.SetDestination (Unity NavMesh)
│
└─ NO → Use abstraction (Transform, Vector3, Collider concepts exist everywhere)
    Examples:
    - Transform.SetPosition (universal concept)
    - Collision.OnEnter (universal concept)
    - Audio.PlaySFX (universal concept)
```


### **Practical Implementation:**

**Week 1-2 blocks - Keep abstracted:**
```csharp
// These concepts are universal
Transform.SetPosition(IVector3 position)
Collision.OnEnter(ICollider collider)
Health.TakeDamage(float amount)
Audio.PlaySFX(string clipName)
Spatial.FindClosest(string tag)
```


**Week 3+ blocks - Direct Unity (if needed):**
```csharp
// Unity-specific, no Godot equivalent
Rigidbody.AddForce(Vector3 force, ForceMode mode)
UI.SetUIDocument(UIDocument doc)
NavMesh.SetDestination(Vector3 target)
```


### **Hybrid API Pattern:**

You can expose both:

```csharp
// In Transform API
public TransformBlock SetPosition(IVector3 pos) => ... // abstracted
public TransformBlock SetPosition(Vector3 pos) => SetPosition(pos.ToIVector3()); // convenience overload

// In Collision API
public CollisionBlock OnEnter(ICollider collider) => ... // abstracted
public CollisionBlock OnEnter(Collider collider) => ... // Unity direct (optional)
```


Users get IntelliSense for Unity types, but your core uses abstractions.

### **Migration Path:**

**Now (Weeks 1-2):**
- Keep existing abstraction for core blocks (Transform, Object, Collision, Health)
- These 40-50 blocks work with current system

**Weeks 3-5 (Advanced features):**
- Add Unity-specific blocks without abstraction overhead
- Label them clearly: `UnityPhysics.AddForce()`, `UnityUI.BindToUIToolkit()`

**Post-launch (if Godot pivot needed):**
- Core blocks already work
- Unity-specific blocks stay Unity-only
- Add `GodotPhysics.*` equivalents

### **What This Looks Like:**

```csharp
// Your API surface (Script.cs)
public TransformApi Transform => new(this); // abstracted
public ObjectApi Object => new(this); // abstracted
public HealthApi Health => new(this); // abstracted
public CollisionApi Collision => new(this); // abstracted

// Unity-specific APIs
public UnityPhysicsApi UnityPhysics => new(this); // direct Unity types
public UnityUIApi UnityUI => new(this); // direct Unity types
public UnityNavMeshApi UnityNavMesh => new(this); // direct Unity types

// Future: GodotPhysicsApi, GodotUIApi, etc.
```


### **Revenue Impact:**

**If you keep abstraction:**
- Launch Unity Asset Store (Month 7)
- If revenue is $800-1,200 by Month 12 (close but short), you can:
    - Pivot to Godot as second revenue stream (Month 13-15)
    - Sell on Godot Asset Library (smaller, but something)
    - Market as "only cross-engine scripting DSL"

**If you remove abstraction:**
- Locked into Unity permanently
- If Asset Store algorithm buries you, no Plan B
- 3 months of abstraction work wasted

### **My Recommendation:**

**Keep the abstraction for blocks you're building in Weeks 1-2** (the ~100 high-priority blocks). They're:
- Universal concepts (Transform, Health, Collision, Audio, etc.)
- Your core value proposition
- Already fit your existing architecture

**Skip abstraction for Unity-specific features** (NavMesh, specific physics modes, UI Toolkit bindings, Animator, etc.).

**Rationale:**
- Minimizes rework (existing system works)
- Preserves pivot option (safety net for Month 12-15)
- Week 1-2 blocks are 70% of your value anyway
- Unity-specific stuff can be "Pro" features (Unity users expect Unity integration)

**Estimated time saved by removing abstraction entirely: 20-30 hours over 8 weeks**
**Risk if Asset Store fails and you need Godot pivot: 200+ hours of rework**

The optionality is worth keeping. You're solo with 12-18 month runway - preserve flexibility.
