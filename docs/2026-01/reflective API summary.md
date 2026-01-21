# reflective API summary.md

Here's a summary focused on the aspects you requested:

## Strategic Value (Brief)
Creating a **semantic layer for cross-engine gameplay logic** that abstracts away engine-specific APIs, making game development portable and beginner-friendly while maintaining professional scalability. Positions LunyScript as a "portable grammar for play" across C# game engines.

## Design Goals and Options

**Core Design Goal:**
- Separate **intent** (user-facing blocks) from **semantics** (Luny API) from **mechanics** (engine implementation)
- Enable cross-engine portability without locking users into low-level engine APIs

**Architectural Options:**
1. **One block class per operation** - Semantic blocks with custom logic, validation, and clear intent
2. **Reflective generic blocks** - Single block type that dispatches via string→delegate mapping
3. **Hybrid (Recommended)** - Semantic blocks that internally use reflection for engine binding

**Mapping Strategy:**
- **Double-mapping**: User API → Luny Semantic API (via string keys) → Native Engine API
- Lua-described transformation layer per engine/version handles type conversions, clamping, context-aware behavior
- Mappings can be user-editable configs (with validation)

## Technical Implementation Details (Most Current)

**Core Architecture:**
```
C# User API (compiled, type-safe)
  ↓
String→Delegate mapping (runtime dispatch)
  ↓
Lua transformation descriptors (per engine/version)
  ↓
Reflected engine calls (with boxing)
  ↓
[Gradually replace hot paths with direct block implementations]
```


**Key Components:**
1. **API Descriptor** - Lua files defining mappings per engine:
   - `lunyscript_api.lua` - main descriptor with semantic contracts and engine binding references
   - `unity_bindings.lua`, `godot_bindings.lua` - engine-specific bindings loaded via dofile()
   - Hybrid structure: centralized semantics, isolated engine implementations
2. **ReflectiveApiRegistry** - Loads Lua descriptors at startup, builds cached delegates (one-time reflection cost)
   - Validates: which semantics each engine implements
   - Logs: unmapped engine bindings (implementations without semantic definition)
3. **ReflectiveApiBlock** - Implements `ILunyScriptBlock.Execute(context)`, dispatches via registry
4. **ApiBinding** - Holds cached delegate, transform reference, parameter specs for validation
   - Most common and trivial transform methods should be implemented in C# (eg type conversion, scalar, clamp)
   - Lua transforms available for complex logic
5. **LunyScriptContext** - Provides registry access, engine object reference, script state

**Performance Characteristics:**
- Startup: 1-10ms per API for reflection
- Runtime: ~50ns per call (dictionary lookup + delegate + boxing)
- Acceptable for 60 FPS gameplay (thousands of calls/frame)
- Progressive optimization: replace high-frequency operations with direct implementations

**Implementation Phases:**
1. MVP: Load Lua descriptor, build cache for 3 APIs, test with hardcoded args
2. Validation: Parse param specs, add clamping/type checking, error handling
3. Transformations: Execute C#/Lua transform functions, handle type conversions
4. Multi-Engine: Load multiple descriptors, runtime engine detection, test portability

## API Descriptor Format (Detailed Specification)

### Main Descriptor: `lunyscript_api.lua`

```lua
-- lunyscript_api.lua
return {
  version = "1.0",

  -- Semantic contracts (engine-agnostic definitions)
  semantics = {
    SetSpeed = {
      params = {
        {name="speed", type="float", min=0, max=100}
      },
      category = "motion",
      idempotent = false,
      description = "Set forward velocity magnitude"
    },

    Steer = {
      params = {
        {name="direction", type="float", min=-1, max=1}
      },
      category = "motion",
      description = "Set steering direction (-1=left, +1=right)"
    },

    Honk = {
      params = {},
      category = "interaction",
      description = "Play horn sound"
    }
  },

  -- Engine-specific bindings (loaded via dofile)
  engines = {
    Unity = dofile("unity_bindings.lua"),
    Godot = dofile("godot_bindings.lua")
  }
}
```

### Engine Binding: `unity_bindings.lua`

```lua
-- unity_bindings.lua
return {
  -- Namespace grouping for ergonomics (all targets inherit namespace)
  ["UnityEngine"] = {
    SetSpeed = {
      -- Component member: Rigidbody is a Component, requires GetComponent lookup
      target = "Rigidbody.velocity",
      transform = "ToVector3Forward"
    },

    Steer = {
      -- Version-specific targets (semantic versioning: major.minor.patch)
      target = {
        default = "CarController.steerAngle",
        ["6000.3.4"] = "CarController.steeringAngle",  -- Unity 6.3.4+
        ["6000.7"] = "VehicleController.turnAngle"   -- Unity 6.7+ (".0" implied)
      },
      transform = function(direction)
        return direction * 45  -- Convert normalized to degrees
      end
    },

    Honk = {
      -- Method call on component
      target = "AudioSource.PlayOneShot",
      params = {
        {name="clip", type="AudioClip", default="HornSound"}
      }
    },

    DebugLog = {
      -- Static method: Debug is a static class
      target = "Debug.Log"
    }
  },

  -- Additional namespace example
  ["MyGame.Controllers"] = {
    CustomAction = {
      target = "CustomController.DoThing"
    }
  }
}
```

### Version-Specific Target Resolution

**Rules:**
- Version strings use semantic versioning format: `major.minor.patch` (numbers only, no suffix like "f1")
- If `target` is a **string**: applies to all engine versions
- If `target` is a **table**: must contain `default` key, plus optional version overrides
- Version resolution: find highest version key ≤ current engine version
- Example: Unity 6.5.0 running above descriptor → uses `"6000.3.4"` target (not `"6000.7.0"`)

### Object/Component Resolution

Target strings are resolved using qualified type names with namespace grouping:

**Resolution algorithm:**
1. Parse target: `"TypeName.memberName"`
2. Prepend namespace: `"UnityEngine.TypeName"`
3. Resolve type via reflection (fast lookup with qualified name)
4. Inspect type characteristics:
   - **Component type** (inherits from Component) → GetComponent lookup on LunyObject
   - **Static type** (abstract + sealed) → static member access, no object needed
   - **LunyObject member** → direct property/field access on LunyObject
5. Cache the resolution strategy + delegate

**Examples:**
```lua
["UnityEngine"] = {
  -- Component: GetComponent<Rigidbody>() on LunyObject
  SetSpeed = { target = "Rigidbody.velocity" },

  -- Static: UnityEngine.Debug.Log() - no object
  DebugLog = { target = "Debug.Log" },

  -- Direct LunyObject member (if Transform is exposed)
  GetPosition = { target = "Transform.position" }
}
```

**Benefits:**
- Qualified names eliminate ambiguity (user assemblies can define own types)
- Type inspection (Component vs static) determines resolution strategy automatically
- No prefix needed (e.g., "static:") - behavior derived from type metadata
- Faster reflection lookup with full type names

### Target Types

Supports two reflection patterns (property/field vs method call):
- **Property/Field access**: `"ClassName.memberName"` → getter/setter
- **Method call**: `"ClassName.MethodName"` → method invocation with parameters

**Deferred (not MVP):**
- Generics
- ref/out parameters
- Multiple return values

### Transform Specification

Transforms convert semantic parameters to engine-native types/ranges.

**Two options:**
1. **C# transform name** (string): References registered C# transform method
   - Example: `"ToVector3Forward"`, `"ClampNormalized"`, `"FloatToDouble"`
   - Preferred for common operations (performance, type safety)

2. **Lua function**: Inline transformation logic
   - Example: `function(x) return x * 45 end`
   - Used for engine-specific conversions

**Common C# transforms to implement:**
- Type conversion: `ToFloat`, `ToDouble`, `ToInt`
- Vector construction: `ToVector3Forward`, `ToVector3`
- Scaling: `Scale(factor)`, `Clamp(min, max)`
- Default values: `OrDefault(value)`

### Open Descriptor Design Concerns

**Parameter Passing:**
- How do semantic params map to engine method params?
- What about additional params needed by engine (e.g., AudioClip in Honk example)?
- How to handle default values, optional params?

**Return Values:**
- Most operations are setters (can ignore returns)
- What about getters/queries? Store in context? Variables?
- Deferred for MVP

**Error Behavior:**
- Throw exception vs log warning vs silent fallback?
- Missing component: fail loudly or skip?
- Type mismatch in transform: fail at startup or runtime?

**Capability Contracts:**
- How to validate semantic appropriateness? (e.g., "Honk" shouldn't map to "ApplyForce")
- Category-based validation? Type signature matching?
- Deferred for MVP

## C# Class Architecture

### Type Hierarchy and Responsibilities

```
LunyApiRegistry (startup: load descriptors, validate, cache)
    ↓ creates
LunyApiBinding (metadata + cached delegate)
    ↓ used by
GenericApiBlock : ILunyScriptBlock (runtime: lookup and invoke)
    ↓ executes via
ILunyScriptContext (provides LunyObject, ApiRegistry, variables, etc.)
```

### Core Types

#### **LunyApiRegistry**
**Responsibility:** Load Lua descriptors, build reflection cache at startup, validate mappings

```csharp
public sealed class LunyApiRegistry
{
    private readonly Dictionary<string, LunyApiBinding> _bindings = new();
    private readonly ILuaRuntime _lua;

    /// <summary>
    /// Load descriptor and build reflection cache.
    /// Validates all bindings and logs unmapped entries.
    /// </summary>
    public void LoadDescriptor(
        string luaFilePath,
        string engineName,
        NativeEngineVersion nativeEngineVersion,
        LunyVersion lunyVersion);

    /// <summary>
    /// Runtime lookup for semantic API name.
    /// </summary>
    public LunyApiBinding GetBinding(string semanticName);
}
```

**Notes:**
- Validation is implicit during `LoadDescriptor` (logs which semantics implemented, unmapped bindings)
- `NativeEngineVersion` = Unity/Godot version (for version-specific target resolution)
- `LunyVersion` = LunyEngine version (for descriptor compatibility)

#### **LunyApiBinding**
**Responsibility:** Hold cached delegate, transformation, param specs, resolution strategy

```csharp
public sealed class LunyApiBinding
{
    public string SemanticName { get; }
    public BindingStrategy Strategy { get; }
    public Type TargetType { get; }
    public MemberInfo Member { get; }
    public Delegate CachedDelegate { get; }  // Fastest invocation via cached delegate
    public ITransformation Transformation { get; }  // Transform semantic params to engine types
    public ParamSpec[] ParamSpecs { get; }

    /// <summary>
    /// Execute the binding with semantic arguments.
    /// </summary>
    public void Invoke(ILunyScriptContext context, params object[] args);
}
```

**Notes:**
- `Delegate` = cached reflection result for fast invocation (alternative: direct MethodInfo.Invoke, but slower)
- `ITransformation` renamed to avoid conflict with Transform component type

#### **BindingStrategy** (enum)
```csharp
public enum BindingStrategy
{
    Member,       // Direct property/field on LunyObject (default, most common)
    Component,    // GetComponent<T>() on LunyObject
    Static        // Static member, no object needed
}
```

#### **GenericApiBlock : ILunyScriptBlock**
**Responsibility:** Generic block that dispatches via registry

```csharp
public sealed class GenericApiBlock : ILunyScriptBlock
{
    private readonly string _semanticName;
    private readonly object[] _args;

    private GenericApiBlock(string semanticName, params object[] args)
    {
        _semanticName = semanticName;
        _args = args;
    }

    public void Execute(ILunyScriptContext context)
    {
        var registry = context.GetApiRegistry();
        var binding = registry.GetBinding(_semanticName);
        binding.Invoke(context, _args);
    }

    /// <summary>
    /// Factory called by user-facing API.
    /// CallerMemberName captures the calling method name automatically.
    /// </summary>
    public static ILunyScriptBlock Create(
        object arg = null,
        [CallerMemberName] string semanticName = null)
    {
        return new GenericApiBlock(semanticName, arg);
    }
}
```

#### **ITransformation** + implementations
```csharp
public interface ITransformation
{
    object Transform(object input);
}

// C# transformations (preferred for performance)
public class ToVector3ForwardTransformation : ITransformation { ... }
public class ScaleTransformation : ITransformation { ... }
public class ClampTransformation : ITransformation { ... }

// Lua transformation wrapper
public class LuaFunctionTransformation : ITransformation
{
    private readonly LuaFunction _func;
    public object Transform(object input) => _func.Call(input);
}
```

### User-Facing API Pattern with [CallerMemberName]

**Challenge:** How to capture the method name without exposing it to users?

**Solution:** `GenericApiBlock.Create` has `[CallerMemberName]` - captures caller automatically

```csharp
// LunyScript.Object.cs - User-facing API
public static class Object
{
    // Clean API - no CallerMemberName visible to users
    public static ILunyScriptBlock SetEnabled(String name = null)
        => GenericApiBlock.Create(name);

    public static ILunyScriptBlock SetDisabled(String name = null)
        => GenericApiBlock.Create(name);

    public static ILunyScriptBlock Destroy(String name = null)
        => GenericApiBlock.Create(name);
}
```

**How it works:**
1. User calls `Object.Destroy(null)` from their script
2. `Destroy()` calls `GenericApiBlock.Create(null)`
3. `GenericApiBlock.Create`'s `[CallerMemberName]` captures `"Destroy"` automatically
4. Block is created with correct semantic name
5. User cannot override or break the semantic name

**Result:** DRY, type-safe, foolproof API surface - no helper methods needed

## Next Steps, Open Questions, Clarifications Needed

**Stress Test Concerns to Address:**

1. **Semantic Drift Prevention**
    - Need semantic invariants (non-negotiable contracts)
    - Versioned intent definitions
    - Behavioral golden tests across engines
    - Clear authority: which layer owns what meaning

2. **Debuggability Across Layers**
    - Intent-level logging (not just engine logs)
    - Semantic trace mode: "why was this mapping chosen?"
    - Correlated execution IDs through the stack

3. **Performance Unpredictability**
    - Aggressive caching of resolved paths
    - Clear resolution vs execution phases
    - Optional ahead-of-time freezing ("lock this graph")

4. **Tooling Requirements** (lightweight approach valid)
    - Introspection hooks are essential (not polished UI)
    - PlantUML graph dumps, text-based profiling, variable overlays
    - Data model must be diff-friendly

5. **AI Boundaries**
    - AI should propose/explore/optimize mappings
    - Humans must approve/freeze/version semantic changes
    - Never allow AI to redefine core semantics without validation

**Key Design Decisions Needing Finalization:**

- **Semantic core definition** - Which primitives are "standard" and protected?
- **Capability contracts** - How to validate that mappings are semantically valid (e.g., "Honk" shouldn't map to "ApplyForce")
- **Versioning strategy** - How to handle engine API changes and descriptor compatibility
- **Escape hatches** - How to let power users bypass the system explicitly without fragmenting semantics

**Fragility Management:**
- System is "crystal-like" - clear but requires discipline to prevent semantic erosion
- Must actively refuse to let edge cases accumulate in the core
- Success depends on **stewardship** - protecting the small, boring semantic center while allowing wild experimentation at edges

#Credits spent in chat: ~$0.27 (+$0.14), Context: 26% budget
