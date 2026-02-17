# Input System Implementation Plan

**Date:** 2026-02-17
**Status:** Design Phase - Implementation Deferred to Tomorrow
**Context:** 2-week survivor demo for Epic Megagrant application (March 20 deadline)

---

## Overview

This document captures the design decisions and implementation strategy for LunyScript's Input API, which is the first critical-path feature for the survivor demo (Days 1-2 of 2-week plan).

**Goal:** Enable player movement via input actions in a cross-engine manner (Unity/Godot).

---

## API Design (Agreed)

### User-Facing API

```csharp
public class PlayerController : Script
{
    public override void Build(ScriptContext context)
    {
        // Per-object input (local multiplayer support)
        On.Input("Move").Do(
            Transform.Move(Input.Direction(), 5.0)
        );

        On.Input("Fire").Do(
            Prefab.Instantiate("Projectile")
        );

        // Global input (any device, typically pause/menu)
        When.Input("Pause").Do(
            Time.Pause(),
            UI.Show("PauseMenu")
        );
    }
}
```

### Input Context Accessors

**InputApi provides specialized blocks that read from current event context:**

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

    // Condition: is button pressed this frame? (not held)
    public ScriptConditionBlock IsPressed() => InputIsPressedBlock.Create(_script);

    // Condition: is button currently held?
    public ScriptConditionBlock IsHeld() => InputIsHeldBlock.Create(_script);
}
```

**Design principle:** Domain-specific accessor blocks read from runtime context, rather than returning values directly.

---

## Key Design Challenges & Solutions

### Challenge 1: VariableBlock References Table Variables Only

**Problem:**
`VariableBlock` currently only has `Table.VarHandle`, meaning it references variables in Global/LocalVariables tables. But `Input.Direction()` needs to return a runtime-computed value from event context, not a table entry.

**Current Architecture:**
```csharp
public abstract class VariableBlock : ScriptConditionBlock
{
    internal virtual Table.VarHandle TargetHandle => null;
    public abstract Variable GetValue(IScriptRuntimeContext runtimeContext);
}
```

**Solution Options:**

#### Option A: Special VariableBlock Subclass (Recommended for MVP)
```csharp
// InputDirectionBlock doesn't reference a table variable
internal sealed class InputDirectionBlock : VariableBlock
{
    internal override Table.VarHandle TargetHandle => null; // no table reference

    public override Variable GetValue(IScriptRuntimeContext runtimeContext)
    {
        if (!runtimeContext.TryGetEventData<InputEventData>(out var data))
        {
            LunyLogger.LogWarning("Input.Direction() called outside On.Input()");
            return Variable.Zero; // or Vector2.zero
        }

        return Variable.FromVector2(data.Value.normalized); // runtime computation
    }
}
```

**Pros:**
- Minimal architecture change
- Existing VariableBlock pattern works
- `GetValue()` computes on-the-fly

**Cons:**
- VariableBlock becomes more abstract (not just table references)
- `TargetHandle` is null for these blocks (affects Set/Add/etc methods)

---

#### Option B: Store in Hidden Global Variable (Workaround)
```csharp
// At event time, write to global variable with static key
const string INPUT_VALUE_KEY = "__internal_input_value";

// Event handler writes to global table
void OnInputReceived(Vector2 value)
{
    runtimeContext.GlobalVariables[INPUT_VALUE_KEY] = Variable.FromVector2(value);
    ExecuteSequence();
    runtimeContext.GlobalVariables.Remove(INPUT_VALUE_KEY);
}

// Input.Value() reads from global table
internal sealed class InputValueBlock : VariableBlock
{
    public override Variable GetValue(IScriptRuntimeContext runtimeContext)
    {
        return runtimeContext.GlobalVariables[INPUT_VALUE_KEY];
    }
}
```

**Pros:**
- No architecture change
- VariableBlock still references table variables

**Cons:**
- Pollutes global namespace (name collision risk)
- Cleanup complexity (remove after event)
- Feels hacky

---

#### Option C: Extend VariableBlock with EventData Accessor (Future-Proof)
```csharp
public abstract class VariableBlock : ScriptConditionBlock
{
    internal virtual Table.VarHandle TargetHandle => null;

    // New: blocks can declare they read from event context
    protected virtual Boolean UsesEventContext => false;

    public abstract Variable GetValue(IScriptRuntimeContext runtimeContext);
}

// Input blocks override UsesEventContext
internal sealed class InputValueBlock : VariableBlock
{
    protected override Boolean UsesEventContext => true;

    public override Variable GetValue(IScriptRuntimeContext runtimeContext)
    {
        var data = runtimeContext.GetEventData<InputEventData>();
        return Variable.FromVector2(data.Value);
    }
}
```

**Pros:**
- Clear separation: table-backed vs event-backed variables
- Self-documenting (UsesEventContext flag)
- Enables future optimizations/validations

**Cons:**
- More architecture change
- Flag might not be needed (no consumer uses it yet)

---

**Decision: Use Option A for MVP** (special VariableBlock subclass with null TargetHandle). Option C can be added later if needed.

---

### Challenge 2: Accessing Event Data Later in Frame

**Problem:**
`On.Input()` runs when input occurs, but we might want to access the value later (e.g., in `On.FrameUpdate()` for follow-up logic, or store "other" object from collision for processing in update).

**Example:**
```csharp
// Want to use input value in multiple places
On.Input("Move").Do(
    Var["lastMoveDir"].Set(Input.Direction()) // store for later
);

On.FrameUpdate().Do(
    Transform.Move(Var["lastMoveDir"], 5.0) // use stored value
);
```

**Solution Options:**

#### Option A: User Explicitly Stores in Variable (Recommended)
```csharp
// User pattern: store event data in variable if needed later
On.Input("Move").Do(
    Var["moveDir"].Set(Input.Direction())
);

On.FrameUpdate().Do(
    Transform.Move(Var["moveDir"], 5.0)
);
```

**Pros:**
- Explicit (user sees data flow)
- No magic
- Works with existing Variable system

**Cons:**
- Verbose (extra Set() call)
- Requires understanding of event timing

---

#### Option B: Auto-Store in Named Variable via .As() (Sugar)
```csharp
On.Input("Move").As("moveInput").Do(
    Transform.Move(Input.Value()) // reads from event
);

On.FrameUpdate().Do(
    Transform.Move(Var["moveInput"], 5.0) // reads from stored variable
);
```

**How it works:**
- `.As(name)` creates local variable and auto-stores event data
- Variable persists until next event or end of frame

**Pros:**
- Less verbose
- Named context (self-documenting)

**Cons:**
- Magic behavior (variable lifetime unclear)
- Implementation complexity

---

#### Option C: Pre/Post-Frame Callbacks on Blocks (General Solution)
```csharp
public abstract class ScriptActionBlock : ScriptBlock
{
    // New lifecycle hooks
    public virtual void PreFrame(IScriptRuntimeContext context) {}
    public virtual void Execute(IScriptRuntimeContext context);
    public virtual void PostFrame(IScriptRuntimeContext context) {}
}

// InputValueBlock stores data in PreFrame, clears in PostFrame
internal sealed class InputHandlerBlock : SequenceBlock
{
    private InputEventData _capturedData;

    public override void PreFrame(IScriptRuntimeContext context)
    {
        // Prepare: reset captured data
        _capturedData = default;
    }

    public void OnInputReceived(InputEventData data)
    {
        _capturedData = data; // store for frame
        Execute(context);
    }

    public override void PostFrame(IScriptRuntimeContext context)
    {
        // Cleanup: clear captured data
        _capturedData = default;
    }
}
```

**Pros:**
- General solution for all event types (collision, triggers, etc.)
- Clean lifecycle management
- Blocks control their own data

**Cons:**
- Architecture change (add lifecycle hooks)
- Overhead (pre/post callbacks every frame)

---

**Decision: Use Option A for MVP** (user explicitly stores). Pre/post-frame callbacks (Option C) can be added post-demo if pattern emerges across multiple event types.

---

### Challenge 3: Button "Pressed This Frame" Flag

**Problem:**
Button inputs need to distinguish:
- **IsPressed:** True only on the frame the button was pressed (one-shot)
- **IsHeld:** True for all frames while button is held

**Solution:**

Store both states in `InputEventData`:

```csharp
internal struct InputEventData
{
    public Vector2 AxisValue;      // for axis inputs (Move, Look)
    public Boolean ButtonPressed;  // true only on press frame
    public Boolean ButtonHeld;     // true while held
    public String ActionName;
}
```

**Unity adapter tracks state:**
```csharp
private Dictionary<string, bool> _buttonStates = new();

void OnInputAction(InputAction action, InputValue value)
{
    var actionName = action.name;
    var pressed = value.isPressed;
    var wasHeld = _buttonStates.TryGetValue(actionName, out var held) && held;

    var data = new InputEventData
    {
        ActionName = actionName,
        ButtonPressed = pressed && !wasHeld, // only true on transition
        ButtonHeld = pressed
    };

    _buttonStates[actionName] = pressed;
    NotifyInputHandlers(actionName, data);
}
```

**LunyScript blocks:**
```csharp
Input.IsPressed() // reads ButtonPressed
Input.IsHeld()    // reads ButtonHeld
```

---

## Variable<T> Refactoring Decision

**Problem:**
Current `Variable` struct doesn't support Vector2/Vector3 types. Options:

1. **Quick workaround:** Add Vector2/Vector3 cases to existing Variable struct
2. **Proper solution:** Refactor to generic `Variable<T>` system

**Considerations:**

**If we refactor to Variable<T> now:**
- ✅ Cleaner design (no boxing, type-safe)
- ✅ Future-proof (all vector types supported)
- ❌ Rippling effect across codebase (VariableBlock, Table, all existing code)
- ❌ Time cost (2-3 days minimum)

**If we defer Variable<T>:**
- ✅ Faster to MVP (add Vector2 case to existing struct)
- ✅ No codebase disruption
- ❌ Technical debt (will need refactor eventually)
- ❌ Boxing for vector types (performance hit, but acceptable for demo)

**Decision: Defer Variable<T> refactoring until post-demo.**

**Rationale:**
- Demo deadline is 4 weeks away
- Variable<T> is large architectural change (affects everything)
- Workaround is acceptable for demo performance
- Can refactor after Epic submission

**Workaround for demo:**
```csharp
// Add to Variable struct
public enum ValueType
{
    Null,
    Number,
    Boolean,
    String,
    Vector2,  // new
    Vector3,  // new
}

// Add cases to existing methods
public Vector2 AsVector2() => _type == ValueType.Vector2 ? (Vector2)_refValue : Vector2.Zero;
public Vector3 AsVector3() => _type == ValueType.Vector3 ? (Vector3)_refValue : Vector3.Zero;

public static Variable FromVector2(Vector2 v) => new(v, ValueType.Vector2);
public static Variable FromVector3(Vector3 v) => new(v, ValueType.Vector3);
```

**Note:** This introduces boxing for vectors (stored in `_refValue`), but acceptable for demo.

---

## Implementation Order (Tomorrow)

**Bottom-up approach to minimize integration issues:**

### Step 1: LunyEngine Input Service (No LunyScript yet)

**Goal:** Define cross-engine input abstraction at Luny layer.

**Files to create:**
1. `Luny/Engine/Services/LunyInputServiceBase.cs`
2. `Luny/Engine/Bridge/LunyInputValue.cs` (struct, holds Vector2/bool/float)
3. `Luny/Engine/Bridge/LunyInputActionType.cs` (enum: Axis, Button)

**LunyInputServiceBase API:**
```csharp
public abstract class LunyInputServiceBase : LunyEngineServiceBase
{
    // Query input state (for polling)
    public abstract LunyInputValue GetActionValue(String actionName);
    public abstract Boolean IsActionPressed(String actionName);
    public abstract Boolean IsActionHeld(String actionName);

    // Event-based (for On.Input callbacks)
    public event Action<String, LunyInputValue> OnInputAction;
}
```

**LunyInputValue struct:**
```csharp
public struct LunyInputValue
{
    public LunyInputActionType Type;
    public Vector2 AxisValue;
    public Boolean ButtonPressed;
    public Boolean ButtonHeld;
}
```

---

### Step 2: Unity/Godot Mock Implementations

**Goal:** Implement input service for both engines' mocks.

**Files to create:**
1. `Luny.Unity-Mock/Input/UnityInputServiceMock.cs`
2. `Luny.Godot-Mock/Input/GodotInputServiceMock.cs`

**UnityInputServiceMock (simplified for testing):**
```csharp
public class UnityInputServiceMock : LunyInputServiceBase
{
    private Dictionary<string, LunyInputValue> _mockInputs = new();

    // For tests: simulate input
    public void SimulateInput(String actionName, Vector2 axisValue)
    {
        var value = new LunyInputValue
        {
            Type = LunyInputActionType.Axis,
            AxisValue = axisValue
        };
        _mockInputs[actionName] = value;
        OnInputAction?.Invoke(actionName, value);
    }

    public override LunyInputValue GetActionValue(String actionName)
    {
        return _mockInputs.TryGetValue(actionName, out var value) ? value : default;
    }
}
```

**Goal:** Verify this compiles and mocks work in unit tests before touching LunyScript.

---

### Step 3: Variable Vector2/Vector3 Support (Workaround)

**Goal:** Extend existing Variable struct to handle vectors (defer generic refactor).

**Files to modify:**
1. `Luny/Variables/Variable.cs` - add Vector2/Vector3 cases

**Changes:**
- Add ValueType.Vector2, ValueType.Vector3 enum cases
- Add AsVector2(), AsVector3() methods
- Add FromVector2(), FromVector3() factory methods
- Store vectors in _refValue (boxing acceptable for demo)

---

### Step 4: LunyScript Input API & Blocks

**Goal:** Implement InputApi and accessor blocks.

**Files to create:**
1. `LunyScript/Api/InputApi.cs`
2. `LunyScript/Blocks/Input/InputValueBlock.cs`
3. `LunyScript/Blocks/Input/InputDirectionBlock.cs`
4. `LunyScript/Blocks/Input/InputIsPressedBlock.cs`
5. `LunyScript/Blocks/Input/InputIsHeldBlock.cs`

**Key design:**
- Blocks read from `IScriptRuntimeContext.GetEventData<InputEventData>()`
- Graceful degradation if called outside event context (return zero, log warning)

---

### Step 5: ScriptRuntimeContext Event Data Storage

**Goal:** Zero-allocation event data storage in runtime context.

**Files to modify:**
1. `LunyScript/Runtime/ScriptRuntimeContext.cs`

**Add:**
```csharp
public interface IScriptRuntimeContext
{
    T GetEventData<T>() where T : struct;
    Boolean TryGetEventData<T>(out T data) where T : struct;
}

public class ScriptRuntimeContext : IScriptRuntimeContext
{
    private InputEventData _currentInputData;
    private EventDataType _currentEventType;

    public void PushInputEventData(in InputEventData data)
    {
        _currentInputData = data;
        _currentEventType = EventDataType.Input;
    }

    public void PopEventData()
    {
        _currentEventType = EventDataType.None;
    }

    public Boolean TryGetEventData<InputEventData>(out InputEventData data)
    {
        if (typeof(T) == typeof(InputEventData) && _currentEventType == EventDataType.Input)
        {
            data = _currentInputData;
            return true;
        }
        data = default;
        return false;
    }
}
```

---

### Step 6: OnApi.Input() Event Registration

**Goal:** Register input handlers at build time, wire to engine events at runtime.

**Files to modify:**
1. `LunyScript/Api/OnApi.cs` - add Input() method
2. `LunyScript/Runtime/Events/ScriptEventScheduler.cs` - add input handler registration

**Implementation:**
```csharp
// OnApi.cs
public SequenceBlock Input(String actionName) =>
    Scheduler?.ScheduleInputSequence(actionName);

// ScriptEventScheduler.cs
public SequenceBlock ScheduleInputSequence(String actionName)
{
    var sequence = new SequenceBlock();
    var handler = new InputEventHandler
    {
        ActionName = actionName,
        Sequence = sequence,
        EventData = new InputEventData()
    };
    _inputHandlers.Add(handler);

    // Subscribe to LunyEngine input events
    LunyEngine.Instance.Input.OnInputAction += OnEngineInputAction;

    return sequence;
}

private void OnEngineInputAction(String actionName, LunyInputValue value)
{
    // Find handlers for this action, execute them
    foreach (var handler in _inputHandlers.Where(h => h.ActionName == actionName))
    {
        handler.OnInputReceived(value);
    }
}
```

---

### Step 7: Integration Testing

**Goal:** Write smoke test verifying On.Input() → Input.Direction() flow.

**Test:**
```csharp
[Test]
public void Input_Direction_ReturnsValueFromContext()
{
    var script = new TestInputScript();
    var context = CreateTestContext();
    script.Build(context);

    // Simulate input
    var inputService = LunyEngine.Instance.Input as UnityInputServiceMock;
    inputService.SimulateInput("Move", new Vector2(1, 0));

    // Verify Transform.Move was called with correct direction
    Assert.That(script.MoveDirection, Is.EqualTo(new Vector2(1, 0)));
}

class TestInputScript : Script
{
    public Vector2 MoveDirection;

    public override void Build(ScriptContext context)
    {
        On.Input("Move").Do(
            Method.Execute(() => MoveDirection = Input.Direction().GetValue(context).AsVector2())
        );
    }
}
```

---

## Open Questions

1. **When.Input() vs On.Input() implementation difference?**
   - On.Input(): per-object (reads from object's bound InputDevice)
   - When.Input(): global (any device triggers it)
   - How does engine know which device is bound to which object? (Local multiplayer concern)
   - **Decision:** Defer local multiplayer binding to post-demo. For MVP, treat both as global.

2. **Input action name validation?**
   - What if user references "Mov" instead of "Move" (typo)?
   - Should we validate action names at build time?
   - **Decision:** Log warning at runtime if action doesn't exist. Build-time validation is future work.

3. **Multiple On.Input() handlers for same action?**
   - If two objects both have On.Input("Fire"), do both execute?
   - **Decision:** Yes, both execute. This is correct behavior (multiple players can fire).

---

## Next Steps (Tomorrow)

1. **Morning:** Implement Step 1-2 (LunyEngine input service + mocks)
2. **Afternoon:** Implement Step 3-4 (Variable vectors + LunyScript blocks)
3. **Evening:** Implement Step 5-6 (Context storage + event registration)
4. **End of day:** Integration test (Step 7)

**Success criteria:** Player can move in Unity using On.Input("Move") + Transform.Move(Input.Direction(), speed).

---

## References

- Main demo plan: `LunyScript_Demo_Plan_Feb+Mar_2026.md`
- Input API design: `LunyScript_Demo_Plan_Feb+Mar_2026__Input.md`
- Current task list: `.junie/tasks.md`
