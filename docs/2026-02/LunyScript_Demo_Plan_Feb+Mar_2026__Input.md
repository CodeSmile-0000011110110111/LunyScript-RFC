# input.md

let's refine the Input action API first

generally, as much as possible I prefer blocks not to return values but rather internalize the standard behaviour at least
I'd also like to look ahead and consider local multiplayer before deciding on the actual API

if we can set up input action maps in both engines on a per-object level, the input events should be:
On.Input("Fire").Do(blocks);
this would send the event only when the scripted object is bound to the device that emits "Jump"

for global input not directed at the current object:
When.Input("Pause").Do(blocks);

Question is: how do we pass the input value to blocks inside the Do()? We can use the ScriptRuntimeContext but we'd also need to tell those blocks that they run within the input context so that a Move() uses the input value rather than a literal or variable.

I wonder if this is good design though. It may not scale well. What do you think?

Note: event handling within a block would generally work this way: register/unregister with the engine event handler, store the values it receives in fields, provide/use those values when the block executes and reset those values at the end of the frame or before the next frame begins.
Whereas the On.* and When.* blocks execute exactly when that event occurs.

----


Excellent question. This is a critical design decision that affects LunyScript's ergonomics and scalability. Let me think through the implications.

## The Core Problem

**Input values need to flow into blocks, but:**
- Blocks shouldn't return values (your design principle)
- Context needs to be implicit (beginner-friendly)
- Must support both per-object (local multiplayer) and global input
- Should scale to other event-driven APIs (collision data, mouse position, etc.)

---

## Analysis of Your Proposal

**Your approach:**
```csharp
On.Input("Fire").Do(blocks);  // per-object, player-bound
When.Input("Pause").Do(blocks); // global

// Inside Do(), blocks magically know about input context?
On.Input("Move").Do(
    Transform.Move(???)  // How does Move know about input value?
);
```


**Problem:** How do blocks access the input value without explicit parameters?

**Your instinct is correct:** This won't scale well because:
1. Blocks become context-dependent (breaks composability)
2. Hard to debug (where did this value come from?)
3. Collision with other contexts (what if `Move()` is called in non-input context?)

---

## Alternative Approaches

### **Option 1: Implicit Context Variable (Your Runtime Context Idea)**

```csharp
On.Input("Move").Do(
    Transform.Move(Input.Value())  // reads from current input context
);

On.Input("Fire").Do(
    Prefab.Instantiate("Projectile")
        .At(Object.Position())
        .Facing(Input.Direction()) // Direction = normalized Value
);
```


**How it works:**
- `On.Input()` sets `ScriptRuntimeContext.CurrentInputValue`
- `Input.Value()` block reads from context
- Context resets after event completes

**Pros:**
- Explicit data source (`Input.Value()`)
- Composable (works in any context)
- Scales to other events: `Collision.Other()`, `Trigger.Point()`, `Mouse.Position()`

**Cons:**
- Beginners need to understand "Input.Value() only works inside On.Input()"
- Could be misused (calling Input.Value() outside input context → error or zero?)

---

### **Option 2: Event Data Parameter**

```csharp
On.Input("Move").Do(Transform.Move(Event.Data()));

On.Collision().Do(
    Debug.LogInfo(Event.Other()),  // Other = collided object
    Object.Destroy(Event.Other())
);
```


**How it works:**
- Generic `Event.Data()` returns current event's payload
- Type depends on event (Vector2 for input, ILunyObject for collision)

**Pros:**
- Unified pattern across all events
- Clear that data comes from event

**Cons:**
- `Event.Data()` is too generic (what type is it?)
- Less readable than domain-specific accessors

---

### **Option 3: Named Context Variables**

```csharp
On.Input("Move").As("moveInput").Do(
    Transform.Move(Var["moveInput"])
);

On.Collision().As("hit").Do(
    Object.Destroy(Var["hit"].Other)
);
```


**How it works:**
- `.As(name)` creates a temporary local variable
- Blocks access it like any variable
- Variable is cleared after event

**Pros:**
- Explicit naming (self-documenting)
- Variables are familiar to beginners

**Cons:**
- Verbose (extra `.As()` step)
- Name collision risk with real variables

---

### **Option 4: Specialized Event Blocks** (My Recommendation)

```csharp
// Input API provides specialized context accessors
On.Input("Move").Do(
    Transform.Move(Input.Value())  // Input.Value() is InputValueBlock
);

On.Input("Fire").IsPressed().Do(  // condition: only when pressed, not held
    Prefab.Instantiate("Projectile").Facing(Input.Direction())
);

// Collision API provides collision-specific accessors
On.Collision().With("Enemy").Do(
    Var["health"].Subtract(Collision.Damage()),  // reads from collision data
    Object.Destroy(Collision.Other())
);

// Mouse API provides mouse-specific accessors
On.Mouse("Click").Do(
    Prefab.Instantiate("Effect").At(Mouse.WorldPosition())
);
```


**How it works:**
- Each event type provides domain-specific accessor blocks
- `Input.Value()`, `Collision.Other()`, `Mouse.Position()` are blocks
- They read from `ScriptRuntimeContext.CurrentEventData`
- Context is strongly-typed per event

**Pros:**
- Domain-specific (readable, discoverable via IntelliSense)
- Explicit data source
- Scales to all event types
- Type-safe (Input.Value() returns Vector2, Collision.Other() returns ILunyObject)

**Cons:**
- More API surface (but minimal: 2-3 accessors per event type)

---

## Scaling to Other Events

**This pattern extends cleanly:**

```csharp
// Physics events
On.Collision().With("Wall").Do(
    Var["speed"].Set(0),
    VFX.Play("Dust").At(Collision.Point())
);

On.TriggerEnter().Do(
    Debug.LogInfo("Entered: ", Trigger.Other().Name()),
    Var["itemsCollected"].Increment()
);

// UI events
On.UI("Button_Start").Clicked().Do(
    Scene.Load("Gameplay")
);

// Animation events
On.Animation("Walk").Frame(5).Do(
    Audio.Play("Footstep")
);

// Lifecycle events with parameters (e.g., damage taken)
On.DamageTaken().Do(
    Var["health"].Subtract(Event.Amount()),
    VFX.Play("Blood").At(Event.HitPoint())
);
```


---

## Local Multiplayer Consideration

**Your `On.Input()` vs `When.Input()` distinction is good:**

```csharp
// Per-player (this script's bound input device)
On.Input("Jump").Do(
    Physics.AddImpulse(0, 10, 0)
);

// Global (any device, typically for pause/menu)
When.Input("Pause").Do(
    Time.Pause(),
    Menu.Open("Pause")
);
```


**Engine binding:**
- Unity: `PlayerInput` component per player, action callbacks
- Godot: `MultiplayerInput` or manual device ID mapping

**Alternative naming (if you want symmetry):**
- `On.PlayerInput("Jump")` vs `On.GlobalInput("Pause")`
- But your `When.*` for global events is cleaner

---

## My Recommendation: Option 4 + Explicit Errors

**API Design:**

```csharp
// InputApi.cs
public readonly struct InputApi
{
    // Returns the current input event's value (Vector2 for axis, float for trigger)
    // Only valid inside On.Input() or When.Input() blocks
    public VariableBlock Value() => InputValueBlock.Create(_script);
    
    // Returns normalized direction (Vector2.normalized)
    public VariableBlock Direction() => InputDirectionBlock.Create(_script);
    
    // Returns magnitude (useful for analog stick pressure)
    public VariableBlock Magnitude() => InputMagnitudeBlock.Create(_script);
    
    // Condition: is button currently pressed? (not held)
    public ScriptConditionBlock IsPressed() => InputIsPressedBlock.Create(_script);
    
    // Condition: is button currently held?
    public ScriptConditionBlock IsHeld() => InputIsHeldBlock.Create(_script);
}

// Usage
On.Input("Move").Do(
    Transform.Move(Input.Direction(), 5.0)  // direction * speed
);

On.Input("Fire").IsPressed().Do(  // only trigger once, not continuous
    Prefab.Instantiate("Projectile")
);

// Global input
When.Input("Pause").IsPressed().Do(
    Time.TogglePause(),
    Menu.Toggle("Pause")
);
```


**Implementation pattern:**

```csharp
// InputValueBlock.cs
internal sealed class InputValueBlock : VariableBlock
{
    internal static InputValueBlock Create(IScript script) => new(script);
    
    private InputValueBlock(IScript script) : base(script) {}
    
    public override Variable Execute(IScriptExecutionContext context)
    {
        var inputData = context.CurrentEventData as InputEventData;
        if (inputData == null)
        {
            LunyLogger.LogError($"Input.Value() called outside On.Input() context");
            return Variable.Zero; // graceful degradation
        }
        
        return Variable.FromVector2(inputData.Value);
    }
}
```


**ScriptRuntimeContext changes:**

```csharp
public interface IScriptExecutionContext
{
    object CurrentEventData { get; } // set by event handlers
}

public class InputEventData
{
    public Vector2 Value;
    public string ActionName;
    public int PlayerIndex; // for local multiplayer
}
```


---

## Edge Cases & Safety

**Q: What if `Input.Value()` is called outside `On.Input()`?**

**Option A: Runtime error (strict)**
- Throw exception or log error
- Helps catch mistakes

**Option B: Return zero (forgiving, my preference)**
- Log warning in editor
- Return zero/empty value
- Better for beginners (no crashes)

**Documentation must be clear:**
> ⚠️ `Input.Value()` only returns valid data inside `On.Input()` or `When.Input()` blocks. Outside this context, it returns zero.

---

## Transform.Move() Design

**With this approach, Transform.Move() becomes:**

```csharp
Transform.Move(direction, speed)
```


Where `direction` can be:
- `Input.Direction()` (inside input event)
- `Var["movementDir"]` (variable)
- `Transform.DirectionTo("Enemy")` (computed)
- Literal vector (for testing)

**This is composable and scales:**

```csharp
// Complex movement combining input and AI
On.Input("Move").Do(
    Var["inputDir"].Set(Input.Direction()),
    Var["finalDir"].Set(Var["inputDir"].Add(Var["knockbackDir"])),
    Transform.Move(Var["finalDir"], 5.0)
);
```


---

## Summary & Recommendation

**Use Option 4: Specialized Event Blocks**

**API structure:**
- `On.Input("action").Do(blocks)` - per-object
- `When.Input("action").Do(blocks)` - global
- `Input.Value()`, `Input.Direction()`, `Input.Magnitude()` - context accessors
- `Input.IsPressed()`, `Input.IsHeld()` - condition blocks

**Benefits:**
- ✅ Explicit data source (readable)
- ✅ Scales to all event types (Collision, Trigger, Mouse, etc.)
- ✅ Type-safe
- ✅ Composable (works with variables, conditions, etc.)
- ✅ Graceful degradation (returns zero if misused)

**Next steps:**
1. Confirm this design
2. I'll draft the full InputApi + blocks implementation
3. We'll apply the same pattern to CollisionApi, TriggerApi, etc.

**Does this approach feel right? Any concerns about the `.Value()` pattern or local multiplayer binding?**


-----


yes let's try that design but I have some concerns

the Execute method currently returns void
VariableBlock is a ScriptConditionBlock which only has Evaluate so far

For this code, Transform.Move would have to take a VariableBlock as first parameter (I think that's okay unless this also creates a block when you pass a literal value):
On.Input("Move").Do(
Transform.Move(Input.Direction(), 5.0)  // direction * speed
);

Then Move needs to "get" that variable's value in its Execute() method. VariableBlock should have to call a GetValue() or Value property. Which should be on VariableBlock.

The Variable struct currently doesn't handle Vector types. I noted that this needs design. Assume the Variable struct is "Variable<T> : IVariable where T : struct"


How does On.Input know what value to store in CurrentEventData? Say we hook up "Move" event, in Unity the InputValue doesn't have a specific type, it's generic. So we need to ensure that both engines tell us what the primitive type of their InputValue is. Or we make an assumption: axis are Vector2, buttons are bool or float in the range 0-1.

Since CurrentEventData is an object, we should instantiate an event reference at build time to avoid runtime allocations, including boxing.


-----

Perfect, now I understand your architecture fully. Let me address your concerns:

## Refined Input API Design

### 1. **Variable<T> and Vector Support**

**Agree completely.** Variable needs generic support without boxing:

```csharp
// Variable<T> where T : struct
public readonly struct Variable<T> : IVariable where T : struct
{
    private readonly T _value;
    public T Value => _value;
    
    // Implicit conversions
    public static implicit operator Variable<T>(T value) => new(value);
    public static implicit operator T(Variable<T> v) => v._value;
}

// Concrete types
public readonly struct Vector2Variable : IVariable { /* wraps Vector2 */ }
public readonly struct Vector3Variable : IVariable { /* wraps Vector3 */ }
```


**For demo:** You can defer full generics, just add Vector2/Vector3 cases to existing Variable struct as immediate workaround.

---

### 2. **VariableBlock.GetValue() Already Exists**

Good news: `VariableBlock.GetValue(IScriptRuntimeContext)` already exists (line 96). So blocks can call it:

```csharp
// TransformMoveBlock.cs
internal sealed class TransformMoveBlock : ScriptActionBlock
{
    private readonly VariableBlock _direction;
    private readonly VariableBlock _speed;
    
    public override void Execute(IScriptRuntimeContext runtimeContext)
    {
        var dir = _direction.GetValue(runtimeContext); // calls GetValue
        var speed = _speed.GetValue(runtimeContext);
        
        // Convert Variable to Vector3 (assumes Variable supports Vector types)
        var dirVector = dir.AsVector3(); // or dir.As<Vector3>()
        var speedFloat = speed.AsDouble();
        
        // Move the object
        var transform = runtimeContext.LunyObject.Transform;
        transform.Position += dirVector * speedFloat * Time.DeltaTime;
    }
}
```


---

### 3. **Transform.Move() Parameter Design**

**Transform.Move() should accept VariableBlock:**

```csharp
// TransformApi.cs
public ScriptActionBlock Move(VariableBlock direction, VariableBlock speed) =>
    TransformMoveBlock.Create(direction, speed);

// Implicit conversions handle literals
public ScriptActionBlock Move(VariableBlock direction, Double speed) =>
    TransformMoveBlock.Create(direction, speed); // speed auto-converts to ConstantVariableBlock
```


**Usage:**
```csharp
// All of these work thanks to implicit conversions:
Transform.Move(Input.Direction(), 5.0)           // VariableBlock, literal
Transform.Move(Var["moveDir"], Var["speed"])     // VariableBlock, VariableBlock
Transform.Move(Vector3.forward, 5.0)             // literal vector, literal speed
```


**This already works** via your existing `implicit operator VariableBlock(T value)` operators (lines 17-22).

---

### 4. **Input Event Data Flow**

**Q: How does On.Input() populate CurrentEventData?**

**Answer: OnApi registers event handlers at build time, captures values at runtime.**

**Implementation:**

```csharp
// OnApi.cs
public SequenceBlock Input(String actionName) => 
    Scheduler?.ScheduleInputSequence(actionName, LunyObjectEvent.OnInput);

// ScriptEventScheduler.cs (inside LunyScript)
public SequenceBlock ScheduleInputSequence(String actionName, LunyObjectEvent eventType)
{
    var sequence = new SequenceBlock();
    
    // Create an input event handler (allocated once at build time)
    var handler = new InputEventHandler
    {
        ActionName = actionName,
        Sequence = sequence,
        EventData = new InputEventData() // pre-allocated, reused
    };
    
    _inputHandlers.Add(handler);
    return sequence;
}

// InputEventHandler.cs (internal to LunyScript runtime)
internal class InputEventHandler
{
    public String ActionName;
    public SequenceBlock Sequence;
    public InputEventData EventData; // reused, no per-frame allocation
    
    // Called by engine adapter when input occurs
    public void OnInputReceived(Vector2 value)
    {
        EventData.Value = value; // store value
        EventData.IsActive = true;
        
        // Execute sequence with event data in context
        var context = GetRuntimeContext();
        context.PushEventData(EventData); // sets CurrentEventData
        
        Sequence.Execute(context);
        
        context.PopEventData(); // clears CurrentEventData
        EventData.IsActive = false; // reset for next frame
    }
}

// InputEventData.cs (pre-allocated struct, no boxing)
internal struct InputEventData
{
    public Vector2 Value;
    public String ActionName;
    public Boolean IsActive;
}
```


**Key points:**
- Handler allocated once at **build time**
- EventData struct allocated once per handler (no per-frame allocation)
- Vector2 is struct (no boxing)
- Context push/pop manages EventData stack (for nested events)

---

### 5. **Engine Input Type Detection**

**Q: How do we know if input is Vector2 (axis) or bool/float (button)?**

**Option A: Convention-based (my recommendation for MVP)**
```csharp
// Unity InputAction configuration dictates type:
// - "Move" action configured as Value<Vector2> → Vector2
// - "Fire" action configured as Button → bool/float

// LunyEngine adapter reads Unity's InputAction.type:
public void OnInputAction(InputAction action, InputValue value)
{
    switch (action.type)
    {
        case InputActionType.Value:
            var vec2 = value.Get<Vector2>();
            NotifyInputHandlers(action.name, vec2);
            break;
            
        case InputActionType.Button:
            var pressed = value.isPressed;
            NotifyInputHandlers(action.name, pressed);
            break;
    }
}
```


**Option B: Explicit type registration (defer until post-demo)**
```csharp
// User declares expected type (too much ceremony for beginners)
Input.DeclareAxis("Move");
Input.DeclareButton("Fire");
```


**For demo: Use Option A (convention-based).** Unity's InputSystem already distinguishes action types, just read it.

---

### 6. **Zero-Allocation Event Data**

**Your concern about boxing is critical.** Here's the allocation-free approach:

```csharp
// IScriptRuntimeContext (interface for execution context)
public interface IScriptRuntimeContext
{
    // Event data accessor (returns struct, no boxing)
    T GetEventData<T>() where T : struct;
    Boolean TryGetEventData<T>(out T data) where T : struct;
}

// ScriptRuntimeContext (implementation)
public class ScriptRuntimeContext : IScriptRuntimeContext
{
    // Pre-allocated event data (struct, on stack or in class field)
    private InputEventData _currentInputData;
    private CollisionEventData _currentCollisionData;
    // ... other event types
    
    private EventDataType _currentEventType;
    
    public void PushInputEventData(in InputEventData data)
    {
        _currentInputData = data;
        _currentEventType = EventDataType.Input;
    }
    
    public T GetEventData<T>() where T : struct
    {
        if (typeof(T) == typeof(InputEventData) && _currentEventType == EventDataType.Input)
            return Unsafe.As<InputEventData, T>(ref _currentInputData);
        
        // ... other types
        
        throw new InvalidOperationException($"No event data of type {typeof(T).Name} available");
    }
}

// InputValueBlock.cs (reads from context, zero-allocation)
internal sealed class InputValueBlock : VariableBlock
{
    public override Variable GetValue(IScriptRuntimeContext runtimeContext)
    {
        if (!runtimeContext.TryGetEventData<InputEventData>(out var inputData))
        {
            LunyLogger.LogWarning("Input.Value() called outside On.Input() context");
            return Variable.Zero; // or Vector2.zero if Variable supports it
        }
        
        return Variable.FromVector2(inputData.Value); // assumes Variable<Vector2> exists
    }
}
```


**Zero allocations:**
- EventData is struct (stack or class field)
- No boxing (uses `Unsafe.As` or type checks)
- Context stores data directly, not as `object`

---

### 7. **Full API Example**

**Putting it all together:**

```csharp
// User script
public class PlayerController : Script
{
    public override void Build(ScriptContext context)
    {
        // Per-player input (local multiplayer)
        On.Input("Move").Do(
            Transform.Move(Input.Direction(), 5.0),
            Animation.Play("Walk")
        );
        
        On.Input("Fire").Do(
            Prefab.Instantiate("Projectile")
                .At(Transform.Position())
                .Facing(Transform.Forward())
        );
        
        // Global input
        When.Input("Pause").Do(
            Time.Pause(),
            UI.Show("PauseMenu")
        );
    }
}
```


**Behind the scenes (LunyScript runtime):**

1. **Build phase:**
    - `On.Input("Move")` registers InputEventHandler with ActionName="Move"
    - Handler stores pre-allocated InputEventData struct

2. **Runtime (every frame Unity calls input callbacks):**
    - Unity: `OnMove(InputValue value)` → adapter extracts Vector2
    - Adapter: finds handler for "Move", calls `handler.OnInputReceived(vector2)`
    - Handler: sets EventData.Value, pushes to context, executes sequence
    - Blocks: call `Input.Direction()` → reads from context's InputEventData
    - Handler: pops EventData from context, resets for next frame

**Zero allocations per frame** (all structs/pre-allocated handlers).

---

## Summary & Decisions

**Design decisions:**
1. ✅ `VariableBlock.GetValue()` already exists (use it)
2. ✅ Transform.Move() accepts VariableBlock (implicit conversions handle literals)
3. ✅ Variable needs Vector2/Vector3 support (defer generics, add cases to existing struct for demo)
4. ✅ Input.Direction() returns VariableBlock (reads from context.CurrentEventData)
5. ✅ EventData is pre-allocated struct (zero per-frame allocations)
6. ✅ Context uses typed storage (no boxing via `object`)
7. ✅ Convention-based input types (read from Unity InputAction.type)

**Next steps:**
1. Extend Variable struct to support Vector2/Vector3 (quick workaround) OR design Variable<T> (proper solution)
2. Implement InputApi with Input.Direction(), Input.Value() blocks
3. Implement OnApi.Input() with event handler registration
4. Implement ScriptRuntimeContext event data storage
5. Implement Unity adapter's input callback → handler notification

**Should I start with Variable Vector2/Vector3 support, or proceed with Input API assuming Variable will support vectors?**

----

Continues in:
[LunyScript_Demo_Plan_Feb+Mar_2026__Input_IMPLEMENTATION.md](/docs/2026-02/LunyScript_Demo_Plan_Feb%2BMar_2026__Input_IMPLEMENTATION.md)
