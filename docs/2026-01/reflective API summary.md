# reflective API summary.md

Here's a summary focused on the aspects you requested:

## Strategic Value (Brief)
Creating a **semantic layer for cross-engine gameplay logic** that abstracts away engine-specific APIs, making game development portable and beginner-friendly while maintaining professional scalability. Positions LunyScript as a "portable grammar for play" across C# game engines.

## Design Goals

**Core Design Goal:**
- Separate **intent** (user-facing blocks) from **semantics** (Luny API) from **mechanics** (engine implementation)
- Enable cross-engine portability without locking users into low-level engine APIs
- Zero runtime overhead via code generation
- Single source of truth (Lua descriptors) for both C# API and Lua modding bindings

## Implementation Strategy: **Code Generation (NOT Reflection)**

### Architectural Decision

**Selected: Build-time code generation** (NOT runtime reflection)

**Rationale:**
- Zero runtime overhead (direct calls, no boxing, no dictionary lookups)
- Full IntelliSense and compile-time type safety
- Easier debugging (step into generated code)
- DRY via Lua descriptors (5 lines Lua → full block + service implementations)
- Avoids reflection complexity/fragility
- Enables both C# API generation AND Lua binding generation from same descriptor

**Rejected: Runtime reflection approach**
- Would require ~50+ APIs to justify infrastructure cost
- Runtime overhead (boxing, delegate calls, dictionary lookups)
- Harder debugging across reflection boundary
- Over-engineering for current needs

### Core Architecture (Code Generation)

```
Lua API Descriptor (lunyscript_api.lua)
  ↓
CLI Code Generator (LunyApiCodeGen tool - run manually when descriptors change)
  ↓ generates
┌─────────────────────────────────────┐
│ 1. Service Interface (IXxxEngineService)     │
│ 2. Unity Implementation (UnityXxxEngineService)  │
│ 3. Godot Implementation (GodotXxxEngineService)  │
│ 4. Block Classes (engine-agnostic)              │
│ 5. Lua Bindings (for modding - future)          │
└─────────────────────────────────────┘
  ↓
Generated code committed to repo (reviewable, diffable)
  ↓
User writes: OnUpdate(Vehicle.SetSpeed(50));
  ↓ compiles to
Block.Execute(context) → context.GetService<IVehicleEngineService>().SetSpeed(obj, 50)
  ↓ calls
Unity: rigidbody.velocity = new Vector3(0,0,value)
Godot: rigidBody.LinearVelocity = new Vector3(0,0,value)
```

**Key Benefits:**
- Generated blocks contain NO native engine artifacts (use service interfaces)
- Service layer provides clean engine abstraction
- Transformations baked into generated code (no runtime cost)
- Validation baked into generated code (min/max checks at construction)
- Can still hand-write custom blocks for complex edge cases

## Code Generator Tool Specification

### Project Structure

**LunyApiCodeGen** - Standalone CLI tool (framework-agnostic .NET)
- **Not** part of user projects
- **Not** MSBuild integrated (manual invocation only)
- Uses Lua-CSharp to load descriptors via `dofile()`
- Uses ScriptBuilder (ported framework-agnostic) for code emission

**Descriptor Files** - Part of generator project (NOT user projects)
- `Descriptors/lunyscript_api.lua` - Main semantic definitions
- `Descriptors/unity_bindings.lua` - Unity-specific implementations
- `Descriptors/godot_bindings.lua` - Godot-specific implementations
- Users do NOT include these in their projects
- Developers edit descriptors, run generator, commit generated code

**Generated Output** - Committed to respective repositories
- **Luny repository** (engine bridge layer):
  - `Luny.Unity/Generated/IVehicleEngineService.cs` - Interface
  - `Luny.Unity/Generated/UnityVehicleEngineService.cs` - Unity implementation
  - `Luny.Godot/Generated/IVehicleEngineService.cs` - Same interface
  - `Luny.Godot/Generated/GodotVehicleEngineService.cs` - Godot implementation

- **LunyScript repository** (user-facing API):
  - `LunyScript/Generated/VehicleAPI.cs` - Block classes (engine-agnostic)

### What the Generator Produces

**1. Service Interface** (one per domain, shared across engines)
```csharp
// IVehicleEngineService.cs (generated once, copied to Unity/Godot bridge projects)
namespace Luny.Engine.Services
{
    public interface IVehicleEngineService : ILunyEngineService
    {
        void SetSpeed(ILunyObject lunyObject, double speed);
        void Steer(ILunyObject lunyObject, double direction);
        void Honk(ILunyObject lunyObject);
    }
}
```

**2. Unity Implementation** (Luny.Unity project)
```csharp
// UnityVehicleEngineService.cs (generated)
using UnityEngine;

namespace Luny.Unity.Services
{
    public sealed class UnityVehicleEngineService : IVehicleEngineService
    {
        public void SetSpeed(ILunyObject lunyObject, double speed)
        {
            // Validation baked in from descriptor
            speed = Math.Clamp(speed, 0, 100);

            var go = lunyObject.GetNativeObject<GameObject>();
            var rb = go.GetComponent<Rigidbody>();

            // Transformation baked in
            rb.velocity = new Vector3(0, 0, (float)speed);
        }

        public void Steer(ILunyObject lunyObject, double direction)
        {
            var go = lunyObject.GetNativeObject<GameObject>();
            var controller = go.GetComponent<CarController>();

            // Transformation baked in (normalized to degrees)
            controller.steerAngle = (float)(direction * 45);
        }

        public void Honk(ILunyObject lunyObject)
        {
            var go = lunyObject.GetNativeObject<GameObject>();
            var audio = go.GetComponent<AudioSource>();
            var clip = /* LookupAsset baked in */ Resources.Load<AudioClip>("HornSound");
            audio.PlayOneShot(clip);
        }
    }
}
```

**3. Godot Implementation** (Luny.Godot project)
```csharp
// GodotVehicleEngineService.cs (generated)
using Godot;

namespace Luny.Godot.Services
{
    public sealed class GodotVehicleEngineService : IVehicleEngineService
    {
        public void SetSpeed(ILunyObject lunyObject, double speed)
        {
            speed = Math.Clamp(speed, 0, 100);

            var node = lunyObject.GetNativeObject<Node3D>();
            var rb = node.GetNode<RigidBody3D>(".");

            rb.LinearVelocity = new Vector3(0, 0, (float)speed);
        }

        public void Steer(ILunyObject lunyObject, double direction)
        {
            var node = lunyObject.GetNativeObject<Node3D>();
            var controller = node.GetNode<CarController>(".");

            controller.SteerAngle = (float)(direction * 45);
        }

        public void Honk(ILunyObject lunyObject)
        {
            var node = lunyObject.GetNativeObject<Node3D>();
            var audio = node.GetNode<AudioStreamPlayer>(".");
            var stream = /* LookupAsset */ GD.Load<AudioStream>("res://HornSound.wav");
            audio.Stream = stream;
            audio.Play();
        }
    }
}
```

**4. Block Classes** (LunyScript project, engine-agnostic)
```csharp
// VehicleAPI.cs (generated)
namespace LunyScript
{
    public static class Vehicle
    {
        public static ILunyScriptBlock SetSpeed(double speed)
            => new SetSpeedBlock(speed);

        public static ILunyScriptBlock Steer(double direction)
            => new SteerBlock(direction);

        public static ILunyScriptBlock Honk()
            => new HonkBlock();

        private sealed class SetSpeedBlock : ILunyScriptBlock
        {
            private readonly double _speed;

            public SetSpeedBlock(double speed)
            {
                // Validation baked in at construction
                _speed = Math.Clamp(speed, 0, 100);
            }

            public void Execute(ILunyScriptContext context)
            {
                var service = context.GetService<IVehicleEngineService>();
                service.SetSpeed(context.LunyObject, _speed);
            }
        }

        private sealed class SteerBlock : ILunyScriptBlock
        {
            private readonly double _direction;

            public SteerBlock(double direction)
            {
                _direction = direction;
            }

            public void Execute(ILunyScriptContext context)
            {
                var service = context.GetService<IVehicleEngineService>();
                service.Steer(context.LunyObject, _direction);
            }
        }

        private sealed class HonkBlock : ILunyScriptBlock
        {
            public void Execute(ILunyScriptContext context)
            {
                var service = context.GetService<IVehicleEngineService>();
                service.Honk(context.LunyObject);
            }
        }
    }
}
```

### Generator Tool Architecture

```csharp
// CLI entry point
class Program
{
    static void Main(string[] args)
    {
        // LunyApiCodeGen --descriptor Descriptors/lunyscript_api.lua --output-luny ../Luny --output-lunyscript ../LunyScript
        var descriptorPath = GetArg(args, "--descriptor");
        var lunyOutputPath = GetArg(args, "--output-luny");
        var lunyscriptOutputPath = GetArg(args, "--output-lunyscript");

        var generator = new ApiCodeGenerator();
        generator.Generate(descriptorPath, lunyOutputPath, lunyscriptOutputPath);
    }
}

// Core generator
class ApiCodeGenerator
{
    private readonly LuaCSharp _lua = new();

    public void Generate(string descriptorPath, string lunyOut, string lunyscriptOut)
    {
        // 1. Load descriptor via Lua-CSharp dofile()
        var descriptor = LoadDescriptor(descriptorPath);

        // 2. Generate service interface (shared)
        var interfaceCode = GenerateServiceInterface(descriptor);
        File.WriteAllText(Path.Combine(lunyOut, "Unity/Generated/IVehicleEngineService.cs"), interfaceCode);
        File.WriteAllText(Path.Combine(lunyOut, "Godot/Generated/IVehicleEngineService.cs"), interfaceCode);

        // 3. Generate engine implementations
        var unityCode = GenerateUnityService(descriptor);
        File.WriteAllText(Path.Combine(lunyOut, "Unity/Generated/UnityVehicleEngineService.cs"), unityCode);

        var godotCode = GenerateGodotService(descriptor);
        File.WriteAllText(Path.Combine(lunyOut, "Godot/Generated/GodotVehicleEngineService.cs"), godotCode);

        // 4. Generate blocks
        var blocksCode = GenerateBlocks(descriptor);
        File.WriteAllText(Path.Combine(lunyscriptOut, "Generated/VehicleAPI.cs"), blocksCode);
    }

    private string GenerateServiceInterface(Descriptor desc)
    {
        var builder = new ScriptBuilder();

        // Use nameof() for all type references
        builder.AppendLine("// Auto-generated - do not modify");
        builder.AppendLine();
        builder.Append(Keyword.Namespace, "Luny.Engine.Services");
        builder.OpenIndentBlock("{");
        builder.AppendIndent();
        builder.Append(Keyword.Public, Keyword.Interface);
        builder.Append($"I{desc.Domain}EngineService : ");
        builder.AppendLine(nameof(ILunyEngineService));
        builder.OpenIndentBlock("{");

        foreach (var api in desc.Semantics)
        {
            builder.AppendIndent(Keyword.Void);
            builder.Append(api.Name);
            builder.Append($"({nameof(ILunyObject)} lunyObject");

            foreach (var param in api.Params)
            {
                builder.Append($", {param.CSharpType} {param.Name}");
            }

            builder.AppendLine(");");
        }

        builder.CloseIndentBlock("}");
        builder.CloseIndentBlock("}");

        return builder.ToString();
    }
}
```

### Code Generation Notes

**Always use `nameof()` for type references:**
```csharp
// ✓ Correct
builder.Append(nameof(ILunyObject));
builder.Append($"{nameof(IVehicleEngineService)}.{nameof(IVehicleEngineService.SetSpeed)}");

// ✗ Incorrect
builder.Append("ILunyObject");  // String literals = refactoring hazards
```

**ScriptBuilder (framework-agnostic port):**
- Remove Unity dependencies (UnityEngine, UnityEditor)
- Replace `Mathf.Max` → `Math.Max`
- Replace `Debug.LogWarning` → `Console.WriteLine`
- Already in project: `P:\de.codesmile.luny\Editor\Core\CodeGen\ScriptBuilder.cs`
- Port time: ~5 minutes

**Lua-CSharp integration:**
- Already in project
- Use `dofile()` to load descriptors (supports nested dofile for split files)
- Parse Lua tables into C# descriptor model

### Time Estimate

**MVP Generator (working, tested):** 2-3 focused days
- Day 1: Core infrastructure (CLI, descriptor loading, service interface generation)
- Day 2: Unity/Godot implementations, handle transformations
- Day 3: Block generation, test end-to-end with Vehicle example

**Polish + Multi-domain:** +1-2 days
- Add version resolution logic
- Support multiple domains (Physics, Audio, UI)
- Error handling and validation

### Future: Lua Binding Generation (Phase 2)

Descriptor also drives Lua modding API:
```lua
-- descriptor flag
exposed_to_lua = true

-- generates Lua binding registration:
LuaState.RegisterFunction("Vehicle.SetSpeed", (obj, speed) => {
    var service = GetService<IVehicleEngineService>();
    service.SetSpeed(obj, speed);
});
```

Enables sandboxed Lua modding with same semantic API.

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

### Parameter Specification and Validation

User-facing API uses engine-agnostic types following Lua conventions:
- **Primitives:** `number` (double), `bool`, `string`
- **Luny proxies:** Objects implementing `INativeObjectProxy` (LunyObject, LunyScene, etc.)
- **Engine-native types:** Created by transformations (Vector3, AudioClip, etc.)

#### Descriptor Example with Signature Matching

```lua
-- In unity_bindings.lua
["UnityEngine"] = {
  Honk = {
    target = "AudioSource.PlayOneShot",
    signature = {"AudioClip", "float"},  -- Optional: for overload resolution
    params = {
      {name="clip", type="object", transform="LookupAudioClip"},
      {name="volume", type="number", default=1.0}
    }
  },

  SetSpeed = {
    target = "Rigidbody.velocity",
    params = {
      {name="speed", type="number", min=0, max=100, required=true}
    },
    transform = "ToVector3Forward"  -- Applied after param validation
  }
}
```

**Signature field:**
- Optional (most methods have single implementation)
- Specifies parameter types for overload resolution
- Validated at startup - fails fast if signature doesn't match any overload
- Handles edge cases like `Instantiate(GameObject)` vs `Instantiate(GameObject, Transform)`

#### ParamSpec Type Hierarchy

```csharp
public abstract class ParamSpec
{
    public string Name { get; }
    public string LuaTypeName { get; }  // "number", "bool", "string", "object"
    public bool Required { get; }

    public abstract Type NativeType { get; }
    public abstract object GetDefaultValue();
    public abstract object Validate(object value);

    /// <summary>
    /// Process parameter: apply defaults, validate, transform.
    /// </summary>
    public object Process(object value)
    {
        value ??= GetDefaultValue();
        return Validate(value);
    }
}

public sealed class NumberParamSpec : ParamSpec
{
    public double DefaultValue { get; }  // No boxing for value types
    public (double min, double max)? Range { get; }

    public override Type NativeType => typeof(double);
    public override object GetDefaultValue() => DefaultValue;
    public override object Validate(object value)
    {
        var num = (double)value;
        if (Range.HasValue)
            num = Math.Clamp(num, Range.Value.min, Range.Value.max);
        return num;
    }
}

public sealed class BoolParamSpec : ParamSpec
{
    public bool DefaultValue { get; }

    public override Type NativeType => typeof(bool);
    public override object GetDefaultValue() => DefaultValue;
    public override object Validate(object value) => (bool)value;
}

public sealed class StringParamSpec : ParamSpec
{
    public string DefaultValue { get; }
    public string[] AllowedValues { get; }  // Optional enum-like validation

    public override Type NativeType => typeof(string);
    public override object GetDefaultValue() => DefaultValue;
    public override object Validate(object value)
    {
        var str = (string)value;
        if (AllowedValues != null && !AllowedValues.Contains(str))
            throw new ArgumentException($"Invalid value '{str}' for {Name}");
        return str;
    }
}

public sealed class ObjectParamSpec : ParamSpec
{
    public string ExpectedTypeName { get; }  // "LunyObject", "AudioClip", etc.

    public override Type NativeType => null;  // Resolved at runtime
    public override object GetDefaultValue() => null;
    public override object Validate(object value)
    {
        // Unwrap proxy objects to native engine references
        if (value is INativeObjectProxy proxy)
            return proxy.GetNativeObject();
        return value;
    }
}
```

#### INativeObjectProxy Interface

```csharp
/// <summary>
/// Common interface for Luny proxy objects (LunyObject, LunyScene, etc.)
/// Provides access to underlying native engine object.
/// </summary>
public interface INativeObjectProxy
{
    /// <summary>
    /// Get native engine object for reflection invocation.
    /// Returns object type for compatibility with reflection.
    /// </summary>
    object GetNativeObject();
}
```

### Open Descriptor Design Concerns

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
    object Apply(object input);
}

// C# transformations (preferred for performance)
public sealed class ToVector3ForwardTransformation : ITransformation
{
    public object Apply(object input)
    {
        var value = (float)(double)input;  // Implicit type conversion
        return new Vector3(0, 0, value);
    }
}

public sealed class ScaleTransformation : ITransformation
{
    private readonly double _factor;
    public ScaleTransformation(double factor) => _factor = factor;
    public object Apply(object input) => (double)input * _factor;
}

public sealed class ClampTransformation : ITransformation
{
    private readonly double _min, _max;
    public ClampTransformation(double min, double max) { _min = min; _max = max; }
    public object Apply(object input) => Math.Clamp((double)input, _min, _max);
}

// Lua transformation wrapper
public sealed class LuaFunctionTransformation : ITransformation
{
    private readonly LuaFunction _func;
    public LuaFunctionTransformation(LuaFunction func) => _func = func;
    public object Apply(object input) => _func.Call(input);
}
```

#### **ApiTransformationRegistry**
**Responsibility:** Register and create transformations from Lua descriptors

```csharp
public sealed class ApiTransformationRegistry
{
    private readonly Dictionary<string, Func<LuaTable, ITransformation>> _factories = new();

    /// <summary>
    /// Register a transformation factory by name.
    /// Factory receives Lua table with configuration.
    /// </summary>
    public void Register(string name, Func<LuaTable, ITransformation> factory)
    {
        _factories[name] = factory;
    }

    /// <summary>
    /// Create transformation from Lua descriptor.
    /// Handles both string and table formats.
    /// </summary>
    public ITransformation Create(object luaValue)
    {
        // Simple string: "ToVector3Forward"
        if (luaValue is string name)
        {
            if (!_factories.TryGetValue(name, out var factory))
                throw new ArgumentException($"Unknown transformation: {name}");
            return factory(null);  // No config
        }

        // Table format: {name="Scale", factor=0.5}
        if (luaValue is LuaTable table)
        {
            var name = (string)table["name"];
            if (!_factories.TryGetValue(name, out var factory))
                throw new ArgumentException($"Unknown transformation: {name}");
            return factory(table);  // Pass config table
        }

        throw new ArgumentException("Transformation must be string or table");
    }

    /// <summary>
    /// Register all built-in transformations (called at startup).
    /// </summary>
    public void RegisterBuiltIns()
    {
        // Numeric transformations (require config)
        Register("Scale", config =>
        {
            var factor = (double)config["factor"];
            return new ScaleTransformation(factor);
        });

        Register("Normalize", config =>
        {
            var min = (double)(config["min"] ?? 0.0);
            var max = (double)(config["max"] ?? 1.0);
            return new NormalizeTransformation(min, max);
        });

        Register("Clamp", config =>
        {
            var min = (double)config["min"];
            var max = (double)config["max"];
            return new ClampTransformation(min, max);
        });

        // Vector construction (no config needed)
        Register("ToVector3Forward", _ => new ToVector3ForwardTransformation());
        Register("ToVector3Up", _ => new ToVector3UpTransformation());
        Register("ToVector3", _ => new ToVector3Transformation());

        // Resource lookup (type inferred from context)
        Register("LookupAsset", config =>
        {
            var assetType = config?["type"] as string;  // Optional type hint
            return new LookupAssetTransformation(assetType);
        });

        Register("LookupObject", _ => new LookupObjectTransformation());
    }
}
```

**Descriptor usage examples:**
```lua
-- Simple transformation (no config)
SetSpeed = {
  target = "Rigidbody.velocity",
  transformation = "ToVector3Forward"
}

-- Parameterized transformation (table with config)
Steer = {
  target = "CarController.steerAngle",
  transformation = {name="Scale", factor=45.0}  -- Normalized to degrees
}

-- Per-parameter transformations
Honk = {
  target = "AudioSource.PlayOneShot",
  params = {
    {name="clip", type="object", transformation="LookupAsset"},
    {name="volume", type="number", transformation={name="Clamp", min=0, max=1}}
  }
}
```

**MVP Transformations:**
- **Numeric:** Scale, Normalize, Clamp
- **Vector:** ToVector3Forward, ToVector3Up, ToVector3
- **Lookup:** LookupAsset (generic), LookupObject (scene)
- **Note:** Type conversions (double→float, double→int) handled implicitly by reflection

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

### Version Types

**ISemanticVersion interface** - Shared by both engine and Luny versions

```csharp
public interface ISemanticVersion
{
    string Version { get; }  // Full version string (e.g., "6.3.4" or "2024.1.0")
    int Major { get; }
    int Minor { get; }
    int Patch { get; }
}
```

**Added to ILunyApplicationService:**
```csharp
public interface ILunyApplicationService : ILunyEngineService
{
    // ... existing properties

    /// <summary>
    /// Native engine version (Unity, Godot, etc.)
    /// Used for version-specific API target resolution.
    /// </summary>
    ISemanticVersion EngineVersion { get; }
}
```

**Usage in LunyApiRegistry:**
```csharp
public void LoadDescriptor(
    string luaFilePath,
    string engineName,
    ISemanticVersion engineVersion,  // From ILunyApplicationService.EngineVersion
    ISemanticVersion lunyVersion)    // LunyEngine's own version
{
    // engineVersion used for version-specific target resolution
    // lunyVersion used for descriptor compatibility validation
}
```

**Version comparison for target resolution:**
```csharp
// In LunyApiRegistry when resolving version-specific targets
private string ResolveVersionedTarget(LuaTable targetTable, ISemanticVersion currentVersion)
{
    var defaultTarget = (string)targetTable["default"];
    string selectedTarget = defaultTarget;
    int highestMatchingVersion = 0;

    // Find highest version <= current that has an override
    foreach (var key in targetTable.Keys)
    {
        if (key == "default") continue;

        var versionKey = ParseVersionKey((string)key);
        var versionValue = CompareVersions(versionKey, currentVersion);

        if (versionValue <= 0 && versionValue > highestMatchingVersion)
        {
            selectedTarget = (string)targetTable[key];
            highestMatchingVersion = versionValue;
        }
    }

    return selectedTarget;
}
```

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
