# API Generator Design

This document defines the architecture and implementation strategy for the LunyCodeGen tool.

## Purpose

Generate C# code from Lua API descriptors to create:
1. Engine service interfaces (Luny layer)
2. Engine-specific service implementations (Luny.Unity, Luny.Godot, ..)
3. User-facing block classes (LunyScript layer)
4. Future: Lua modding API bindings

## Design Goals

1. **Framework-Agnostic**: Generator should not depend on Unity, Godot, or LunyEngine
2. **Extensible**: Third parties can add custom generators via Roslyn plugin system
3. **Maintainable**: Clean separation between parsing, validation, and code emission
4. **Manual Invocation**: CLI tool, NOT MSBuild integration
5. **Reviewable Output**: Generated code committed to repos (diffable, debuggable)
6. **Self-Contained Descriptors**: Descriptors specify their own output paths
7. **Reference Implementations**: Built-in generators live as `.cs` files alongside descriptors

## Current Concerns

- Plugin files are "detached" .cs scripts, which means IDEs will likely not properly do static analysis etc.
- 

## Tool Architecture

### High-Level Structure

```
LunyCodeGen (CLI Tool - Minimal Core)
├── Program.cs              # CLI entry point, plugin discovery
├── DescriptorLoader.cs     # Load Lua descriptors via Lua-CSharp
├── DescriptorModel.cs      # C# model of descriptor data
├── Validator.cs            # Validate descriptors, check consistency
├── PluginLoader.cs         # Load + compile generators via Roslyn
├── ICodeGenerator.cs       # Generator plugin interface
├── ScriptBuilder.cs        # Code emission helper (ported from Luny)
└── TransformationRegistry.cs  # Built-in transformation definitions

Generator Implementations (Live in Projects, NOT in LunyCodeGen)
Luny/CodeGen~/Generators/
├── ServiceInterfaceGenerator.cs    # Generate IXxxEngineService
├── UnityServiceGenerator.cs        # Generate UnityXxxEngineService
└── GodotServiceGenerator.cs        # Generate GodotXxxEngineService

LunyScript/CodeGen~/Generators/
└── BlockGenerator.cs               # Generate block classes
```

**Key Insight:** Built-in generators are NOT compiled into LunyCodeGen. They live as `.cs` files alongside descriptors and are loaded/compiled via Roslyn at runtime. This makes them:
- ✅ Editable reference implementations
- ✅ Discoverable (users see how generators work)
- ✅ Extensible (users can copy and modify)
- ✅ No different from custom generators (same loading mechanism)

### Dependencies

**Required:**
- .NET 8+ (framework-agnostic, console app)
- Lua-CSharp (for descriptor loading)
- ScriptBuilder (ported from Luny.Editor, framework-agnostic)
- **Microsoft.CodeAnalysis.CSharp.Scripting** (Roslyn, for compiling generators)

**No dependencies on:**
- Unity
- Godot
- LunyEngine runtime
- Any game engine

## CLI Interface

### Simplified Usage

**Descriptors specify their own output paths** - no CLI output arguments needed!

```bash
# Simple: scan current directory and subdirectories for descriptors
cd Luny/CodeGen~
LunyCodeGen

# Or specify input paths explicitly
LunyCodeGen --input Descriptors/Services --input Descriptors/Blocks

# Multiple projects
cd MyWorkspace
LunyCodeGen --input Luny/CodeGen~/Descriptors --input LunyScript/CodeGen~/Descriptors
```

### Arguments

**Optional:**
- `--input <path>` - Directory or file to scan for descriptors (repeatable). Default: current directory
- `--verbose` - Detailed logging
- `--dry-run` - Show what would be generated without writing files

### How It Works

1. **Discovery:** Scan `--input` paths (or current directory) for `.lua` files
2. **Load:** Parse each descriptor via Lua-CSharp `dofile()`
3. **Validate:** Check service/block consistency, parameter types, etc.
4. **Find Generators:** Discover `.cs` files in `CodeGen~/Generators/` folders
5. **Compile:** Use Roslyn to compile generator implementations
6. **Generate:** Run generators, write to paths specified in descriptors
7. **Report:** Summary of files generated/errors

### Example Invocations

**Default: scan current directory**
```bash
cd Luny
LunyCodeGen
# Scans Luny/CodeGen~/Descriptors/**, finds vehicle_service.lua, etc.
```

**Explicit input paths:**
```bash
LunyCodeGen \
  --input Luny/CodeGen~/Descriptors \
  --input LunyScript/CodeGen~/Descriptors
```

**Validate only:**
```bash
LunyCodeGen --input Luny/CodeGen~/Descriptors --validation-only
```

**Dry run:**
```bash
LunyCodeGen --dry-run --verbose
```

**Third-party framework:**
```bash
cd MyFramework
LunyCodeGen --input CodeGen~/Descriptors
# Descriptors contain output paths relative to their location
```

## Descriptor Loading

### Lua-CSharp Integration

```csharp
public class DescriptorLoader
{
    private readonly Lua _lua;

    public DescriptorLoader()
    {
        _lua = new Lua();
        // Setup Lua environment (sandboxed, no dangerous functions)
    }

    public ServiceDescriptor LoadServiceDescriptor(string filePath)
    {
        // Use Lua dofile() to load descriptor
        var result = _lua.DoFile(filePath);

        // Parse Lua table into C# model
        var table = result[0] as LuaTable;
        return ParseServiceDescriptor(table);
    }

    public CommandDescriptor LoadCommandDescriptor(string filePath)
    {
        var result = _lua.DoFile(filePath);
        var table = result[0] as LuaTable;
        return ParseCommandDescriptor(table);
    }

    private ServiceDescriptor ParseServiceDescriptor(LuaTable table)
    {
        return new ServiceDescriptor
        {
            ServiceName = (string)table["service_name"],
            Version = (string)table["version"],
            Methods = ParseMethods(table["methods"] as LuaTable),
            Engines = ParseEngineImplementations(table["engines"] as LuaTable)
        };
    }
}
```

**Benefits:**
- Native Lua parsing (no custom parser needed)
- Supports `dofile()` for split descriptors
- Lua expressions/functions work naturally

## Descriptor Model

C# classes representing parsed descriptor data:

```csharp
public class ServiceDescriptor
{
    public string ServiceName { get; set; }  // "Vehicle"
    public string Version { get; set; }
    public string Description { get; set; }
    public Dictionary<string, ServiceMethod> Methods { get; set; }
    public Dictionary<string, EngineImplementation> Engines { get; set; }
}

public class ServiceMethod
{
    public string Name { get; set; }
    public string Description { get; set; }
    public List<ParamSpec> Params { get; set; }
    public string Returns { get; set; }  // "void", "number", etc.
}

public class EngineImplementation
{
    public string EngineName { get; set; }  // "Unity", "Godot"
    public Dictionary<string, EngineMethodBinding> Methods { get; set; }
}

public class EngineMethodBinding
{
    public string Namespace { get; set; }
    public string Target { get; set; }
    public TransformationSpec Transformation { get; set; }
    public Dictionary<string, string> VersionOverrides { get; set; }
    public List<string> Signature { get; set; }  // For overload resolution
    public List<ParamSpec> Params { get; set; }
}

public class CommandDescriptor
{
    public string CommandGroup { get; set; }  // "Vehicle"
    public string ServiceDependency { get; set; }  // "IVehicleEngineService"
    public string Version { get; set; }
    public Dictionary<string, Command> Commands { get; set; }
}

public class Command
{
    public string Name { get; set; }
    public string Description { get; set; }
    public List<ParamSpec> UserParams { get; set; }
    public string ServiceMethod { get; set; }
    public List<string> ServiceArgs { get; set; }
}

public class ParamSpec
{
    public string Name { get; set; }
    public string Type { get; set; }  // "number", "bool", "string", "object"
    public double? Min { get; set; }
    public double? Max { get; set; }
    public bool Required { get; set; }
    public object Default { get; set; }
    public string Description { get; set; }
}

public abstract class TransformationSpec
{
    public string Name { get; set; }
}

public class SimpleTransformationSpec : TransformationSpec
{
    // Just a name, no config
}

public class ParameterizedTransformationSpec : TransformationSpec
{
    public Dictionary<string, object> Config { get; set; }
}
```

## Validation

### Validation Rules

```csharp
public class Validator
{
    public ValidationResult Validate(ServiceDescriptor service, CommandDescriptor command)
    {
        var errors = new List<string>();

        // 1. Service/Command consistency
        if (command.ServiceDependency != $"I{service.ServiceName}EngineService")
            errors.Add($"Command service dependency mismatch");

        // 2. Command → Service method mapping
        foreach (var cmd in command.Commands.Values)
        {
            if (!service.Methods.ContainsKey(cmd.ServiceMethod))
                errors.Add($"Command '{cmd.Name}' references unknown service method '{cmd.ServiceMethod}'");
        }

        // 3. Parameter type validation
        // 4. Transformation existence check
        // 5. Version override format validation
        // 6. Namespace/target format validation

        return new ValidationResult(errors);
    }
}
```

**Critical validations:**
- Command service dependency matches service interface name
- All referenced service methods exist
- Parameter types are valid
- Transformations are registered
- Version override keys are valid semantic versions
- Namespace + target strings parse correctly

## Roslyn Plugin System

### Generator Interface

All generators (built-in and custom) implement this interface:

```csharp
/// <summary>
/// Generator plugin interface.
/// Implementations can live anywhere - they're discovered and compiled via Roslyn.
/// </summary>
public interface ICodeGenerator
{
    /// <summary>
    /// Generator name (for logging/debugging)
    /// </summary>
    string Name { get; }

    /// <summary>
    /// Can this generator handle the given descriptor?
    /// </summary>
    bool CanGenerate(Descriptor descriptor);

    /// <summary>
    /// Generate code from descriptor.
    /// Returns null if generation should be skipped.
    /// </summary>
    string Generate(Descriptor descriptor, ScriptBuilder builder, TransformationRegistry transformations);
}
```

### Plugin Loading (Simplified Roslyn Approach)

```csharp
public class PluginLoader
{
    public async Task<List<ICodeGenerator>> LoadGenerators(string searchPath)
    {
        var generators = new List<ICodeGenerator>();

        // Find all .cs files in Generators/ folders
        var generatorFiles = Directory.GetFiles(searchPath, "*.cs", SearchOption.AllDirectories)
            .Where(f => f.Contains("Generators"));

        foreach (var file in generatorFiles)
        {
            var code = File.ReadAllText(file);

            // Add "return typeof(GeneratorClassName);" to end of code
            var modifiedCode = code + "\r\nreturn typeof(ServiceInterfaceGenerator);";  // Parse class name from code

            // Compile and get Type via Roslyn
            var options = ScriptOptions.Default
                .AddReferences(typeof(ICodeGenerator).Assembly)
                .AddReferences(typeof(ScriptBuilder).Assembly)
                .AddImports("System", "LunyCodeGen");

            var state = await CSharpScript.RunAsync(modifiedCode, options);
            var pluginType = (Type)state.ReturnValue;

            // Instantiate generator
            var instance = (ICodeGenerator)Activator.CreateInstance(pluginType);
            generators.Add(instance);
        }

        return generators;
    }
}
```

**How it works:**
1. Scan `CodeGen~/Generators/**/*.cs` for generator files
2. Read source code as string
3. Append `return typeof(ClassName);` to get the Type
4. Compile via `CSharpScript.RunAsync()` with references to ICodeGenerator, ScriptBuilder
5. Extract `Type` from script return value
6. Instantiate via `Activator.CreateInstance()`
7. Done - zero DLL compilation or file output needed

**Benefits:**
- ✅ Simple: just read `.cs` files and compile in-memory
- ✅ No DLL management
- ✅ Generators are editable reference implementations
- ✅ Users can copy/modify generators easily
- ✅ Same mechanism for built-in and custom generators

**Drawbacks:**
- no static analysis / code completion / etc

### Example Generator Implementation

```csharp
// Luny/CodeGen~/Generators/ServiceInterfaceGenerator.cs
using System;
using LunyCodeGen;

public class ServiceInterfaceGenerator : ICodeGenerator
{
    public string Name => "ServiceInterface";

    public bool CanGenerate(Descriptor descriptor)
        => descriptor.Type == DescriptorType.Service;

    public string Generate(Descriptor descriptor, ScriptBuilder builder, TransformationRegistry transformations)
    {
        builder.AppendLine("// Auto-generated - do not modify");
        builder.AppendLine();
        builder.Append(Keyword.Public, Keyword.Interface);
        builder.Append($"I{descriptor.ServiceName}EngineService");
        builder.OpenIndentBlock("{");

        foreach (var method in descriptor.Methods)
        {
            builder.AppendIndentLine($"void {method.Name}(ILunyObject obj, double param);");
        }

        builder.CloseIndentBlock("}");

        return builder.ToString();
    }
}
```

## Code Generation Strategy

### Generator Base Pattern (Optional)

Generators don't need a base class, but can use this pattern for convenience:

```csharp
public abstract class CodeGeneratorBase : ICodeGenerator
{
    public abstract string Name { get; }
    public abstract bool CanGenerate(Descriptor descriptor);

    public string Generate(Descriptor descriptor, ScriptBuilder builder, TransformationRegistry transformations)
    {
        EmitHeader(builder);
        EmitUsings(builder, GetRequiredUsings());
        return GenerateCore(descriptor, builder, transformations);
    }

    protected abstract string[] GetRequiredUsings();
    protected abstract string GenerateCore(Descriptor descriptor, ScriptBuilder builder, TransformationRegistry transformations);

    protected void EmitHeader()
    {
        Builder.AppendLine("// Auto-generated by LunyApiCodeGen - do not modify manually");
        Builder.AppendLine($"// Generated: {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC");
        Builder.AppendLine();
    }

    protected void EmitUsings(params string[] namespaces)
    {
        foreach (var ns in namespaces)
            Builder.AppendLine($"using {ns};");
        Builder.AppendLine();
    }
}
```

### Service Interface Generator

Generates `IXxxEngineService.cs`:

```csharp
public class ServiceInterfaceGenerator : CodeGenerator
{
    private readonly ServiceDescriptor _service;

    public override string Generate()
    {
        EmitHeader();
        EmitUsings("System", "Luny");

        Builder.Append(Keyword.Namespace, "Luny.Engine.Services");
        Builder.OpenIndentBlock("{");

        EmitInterface();

        Builder.CloseIndentBlock("}");
        return Builder.ToString();
    }

    private void EmitInterface()
    {
        // XML doc comments
        Builder.AppendIndentLine("/// <summary>");
        Builder.AppendIndentLine($"/// {_service.Description}");
        Builder.AppendIndentLine("/// </summary>");

        // Interface declaration
        Builder.AppendIndent();
        Builder.Append(Keyword.Public, Keyword.Interface);
        Builder.Append($"I{_service.ServiceName}EngineService : ");
        Builder.AppendLine(nameof(ILunyEngineService));
        Builder.OpenIndentBlock("{");

        // Methods
        foreach (var method in _service.Methods.Values)
        {
            EmitMethodSignature(method);
        }

        Builder.CloseIndentBlock("}");
    }

    private void EmitMethodSignature(ServiceMethod method)
    {
        Builder.AppendIndentLine("/// <summary>");
        Builder.AppendIndentLine($"/// {method.Description}");
        Builder.AppendIndentLine("/// </summary>");

        Builder.AppendIndent(Keyword.Void);
        Builder.Append($" {method.Name}(");
        Builder.Append(nameof(ILunyObject), " lunyObject");

        foreach (var param in method.Params)
        {
            var csharpType = MapLuaTypeToCSharp(param.Type);
            Builder.Append($", {csharpType} {param.Name}");
        }

        Builder.AppendLine(");");
        Builder.AppendLine();
    }

    private string MapLuaTypeToCSharp(string luaType)
    {
        return luaType switch
        {
            "number" => "double",
            "bool" => "bool",
            "string" => "string",
            "object" => "object",
            _ => throw new ArgumentException($"Unknown Lua type: {luaType}")
        };
    }
}
```

**Output example:**
```csharp
// Auto-generated by LunyApiCodeGen - do not modify manually
using System;
using Luny;

namespace Luny.Engine.Services
{
    /// <summary>
    /// Vehicle control operations
    /// </summary>
    public interface IVehicleEngineService : ILunyEngineService
    {
        /// <summary>
        /// Set forward velocity magnitude
        /// </summary>
        void SetSpeed(ILunyObject lunyObject, double speed);

        /// <summary>
        /// Set steering direction
        /// </summary>
        void Steer(ILunyObject lunyObject, double direction);
    }
}
```

### Unity Service Generator

Generates `UnityXxxEngineService.cs`:

```csharp
public class UnityServiceGenerator : CodeGenerator
{
    private readonly ServiceDescriptor _service;
    private readonly EngineImplementation _unityImpl;

    public override string Generate()
    {
        EmitHeader();
        EmitUsings("System", "UnityEngine", "Luny", "Luny.Unity");

        Builder.Append(Keyword.Namespace, "Luny.Unity.Services");
        Builder.OpenIndentBlock("{");

        EmitServiceClass();

        Builder.CloseIndentBlock("}");
        return Builder.ToString();
    }

    private void EmitServiceClass()
    {
        Builder.AppendIndent();
        Builder.Append(Keyword.Public, Keyword.Sealed, Keyword.Class);
        Builder.Append($"Unity{_service.ServiceName}EngineService : ");
        Builder.AppendLine($"I{_service.ServiceName}EngineService");
        Builder.OpenIndentBlock("{");

        // Generate each method implementation
        foreach (var method in _service.Methods.Values)
        {
            EmitMethodImplementation(method);
        }

        Builder.CloseIndentBlock("}");
    }

    private void EmitMethodImplementation(ServiceMethod method)
    {
        var binding = _unityImpl.Methods[method.Name];

        // Method signature
        Builder.AppendIndent(Keyword.Public, Keyword.Void);
        Builder.Append($"{method.Name}(");
        Builder.Append(nameof(ILunyObject), " lunyObject");

        foreach (var param in method.Params)
        {
            Builder.Append($", double {param.Name}");
        }

        Builder.AppendLine(")");
        Builder.OpenIndentBlock("{");

        // Validation (if min/max specified)
        EmitValidation(method.Params);

        // Get native object
        Builder.AppendIndentLine($"var nativeObj = lunyObject.GetNativeObject<GameObject>();");

        // Component lookup (if needed)
        var (componentType, memberName) = ParseTarget(binding.Target);
        if (!string.IsNullOrEmpty(componentType))
        {
            Builder.AppendIndentLine($"var component = nativeObj.GetComponent<{componentType}>();");
        }

        // Apply transformation and set value
        EmitTransformedAssignment(binding, method.Params[0]);

        Builder.CloseIndentBlock("}");
        Builder.AppendLine();
    }
}
```

**Key responsibilities:**
- Parse target strings (e.g., `"Rigidbody.velocity"`)
- Emit component lookup code
- Emit transformation code (bake into generated method)
- Handle version overrides (conditional compilation or runtime checks)

### Block Generator

Generates user-facing block classes:

```csharp
public class BlockGenerator : CodeGenerator
{
    private readonly CommandDescriptor _command;

    public override string Generate()
    {
        EmitHeader();
        EmitUsings("System", "LunyScript", "Luny");

        Builder.Append(Keyword.Namespace, "LunyScript");
        Builder.OpenIndentBlock("{");

        EmitCommandStaticClass();

        Builder.CloseIndentBlock("}");
        return Builder.ToString();
    }

    private void EmitCommandStaticClass()
    {
        Builder.AppendIndent();
        Builder.Append(Keyword.Public, Keyword.Static, Keyword.Class);
        Builder.AppendLine(_command.CommandGroup);
        Builder.OpenIndentBlock("{");

        // Factory methods
        foreach (var cmd in _command.Commands.Values)
        {
            EmitFactoryMethod(cmd);
        }

        // Block classes
        foreach (var cmd in _command.Commands.Values)
        {
            EmitBlockClass(cmd);
        }

        Builder.CloseIndentBlock("}");
    }

    private void EmitBlockClass(Command command)
    {
        var className = $"{command.Name}Block";

        Builder.AppendIndent();
        Builder.Append(Keyword.Private, Keyword.Sealed, Keyword.Class);
        Builder.Append($"{className} : ");
        Builder.AppendLine(nameof(ILunyScriptBlock));
        Builder.OpenIndentBlock("{");

        // Fields
        foreach (var param in command.UserParams)
        {
            Builder.AppendIndentLine($"private readonly double _{param.Name};");
        }
        Builder.AppendLine();

        // Constructor
        EmitBlockConstructor(command, className);

        // Execute method
        EmitExecuteMethod(command);

        Builder.CloseIndentBlock("}");
        Builder.AppendLine();
    }

    private void EmitExecuteMethod(Command command)
    {
        Builder.AppendIndent(Keyword.Public, Keyword.Void);
        Builder.Append($"Execute({nameof(ILunyScriptContext)} context)");
        Builder.OpenIndentBlock("{");

        // Get service
        Builder.AppendIndentLine($"var service = context.GetService<{_command.ServiceDependency}>();");

        // Call service method
        Builder.AppendIndent($"service.{command.ServiceMethod}(context.LunyObject");
        foreach (var arg in command.ServiceArgs)
        {
            Builder.Append($", _{arg}");
        }
        Builder.AppendLine(");");

        Builder.CloseIndentBlock("}");
    }
}
```

## Transformation Registry

```csharp
public class TransformationRegistry
{
    private readonly Dictionary<string, TransformationInfo> _transformations = new();

    public void RegisterBuiltIns()
    {
        Register("Scale", new TransformationInfo
        {
            RequiredConfig = new[] { "factor" },
            EmitCode = (builder, config) =>
            {
                var factor = (double)config["factor"];
                builder.Append($"value * {factor}");
            }
        });

        Register("ToVector3Forward", new TransformationInfo
        {
            EmitCode = (builder, _) =>
            {
                builder.Append("new Vector3(0, 0, (float)value)");
            }
        });

        // ... more transformations
    }

    public string EmitTransformationCode(TransformationSpec spec, string inputVar)
    {
        var info = _transformations[spec.Name];
        var builder = new ScriptBuilder();
        // Use inputVar as the value to transform
        info.EmitCode(builder, spec.Config);
        return builder.ToString();
    }
}

public class TransformationInfo
{
    public string[] RequiredConfig { get; set; }
    public Action<ScriptBuilder, Dictionary<string, object>> EmitCode { get; set; }
}
```

**Purpose:** Transform descriptive transformation specs into actual C# code.

## Output File Organization

### Service Files

```
Luny/
├── Unity/
│   └── Generated/
│       ├── IVehicleEngineService.cs
│       ├── UnityVehicleEngineService.cs
│       ├── IPhysicsEngineService.cs
│       └── UnityPhysicsEngineService.cs
└── Godot/
    └── Generated/
        ├── IVehicleEngineService.cs  (copy of Unity's)
        ├── GodotVehicleEngineService.cs
        ├── IPhysicsEngineService.cs  (copy of Unity's)
        └── GodotPhysicsEngineService.cs
```

### Block Files

```
LunyScript/
└── Generated/
    ├── VehicleAPI.cs
    ├── PhysicsAPI.cs
    └── AudioAPI.cs
```

## ScriptBuilder Port

**Changes needed** (framework-agnostic):

```csharp
// Remove
- using UnityEngine;
- using UnityEditor;

// Replace
- Mathf.Max(1, indentCharRepeat)
+ Math.Max(1, indentCharRepeat)

- Debug.LogWarning("decremented indentation too much");
+ Console.WriteLine("Warning: decremented indentation too much");
```

**Time:** ~5 minutes

## Timeline Estimate

**Phase 1: Core Infrastructure (Day 1)**
- CLI program structure
- Descriptor loader (Lua-CSharp integration)
- Descriptor model classes
- Basic validation
- ScriptBuilder port

**Phase 2: Service Generation (Day 2)**
- Service interface generator
- Unity service generator
- Test with 3 methods (SetSpeed, Steer, Honk)

**Phase 3: Block Generation (Day 3)**
- Block generator
- End-to-end test (descriptor → service + blocks → compile)

**Phase 4: Polish (Days 4-5)**
- Godot service generator
- Version override handling
- Transformation registry
- Error handling
- Documentation

**Total: 3-5 focused days for production-ready MVP**

## Open Design Decisions

### nameof() for Generated Code

Generated code should use `nameof()` for type references where possible:

```csharp
// ✓ Preferred
builder.Append(nameof(ILunyObject));

// ✗ Avoid
builder.Append("ILunyObject");
```

**Challenge:** Generator doesn't have compile-time access to these types.

**Options:**
1. Generate string literals (simple, but refactoring-fragile)
2. Use C# string interpolation with type names
3. Generate helper constants

**Decision:** TBD

### Version Override Implementation

**Option A: Conditional compilation**
```csharp
#if UNITY_6000_3_4_OR_NEWER
rb.linearVelocity = value;
#else
rb.velocity = value;
#endif
```

**Option B: Runtime version check**
```csharp
if (Application.unityVersion >= "6000.3.4")
    rb.linearVelocity = value;
else
    rb.velocity = value;
```

**Option C: Generate separate files per version**

**Decision:** TBD (likely Option A for compile-time optimization)

### Error Handling in Generated Code

Should generated service methods:
- Throw exceptions on null components?
- Log warnings?
- Silently fail?

**Decision:** TBD (likely throw for MVP)

## Future Enhancements

### Lua Binding Generation (Phase 2)

Generate Lua modding API bindings from same descriptors:

```csharp
public class LuaBindingGenerator : CodeGenerator
{
    public override string Generate()
    {
        // Generate registration code for Lua environment
        // Vehicle.SetSpeed → calls IVehicleEngineService.SetSpeed
    }
}
```

### Multi-Repository Support

Allow generating across multiple repositories:

```bash
LunyApiCodeGen \
  --service Descriptors/Services/vehicle_service.lua \
  --command Descriptors/Commands/vehicle_commands.lua \
  --output-service-unity ../Luny.Unity/Generated \
  --output-service-godot ../Luny.Godot/Generated \
  --output-blocks ../LunyScript/Generated
```

### Incremental Generation

Only regenerate files that changed:

```csharp
// Hash descriptor + template version
// Compare with previous hash
// Skip generation if unchanged
```

## Summary

**Generator design priorities:**
1. Framework-agnostic (no Unity/Godot dependencies)
2. Two-phase generation (services, then blocks)
3. Clean separation of concerns
4. Extensible for third parties
5. Manual CLI tool (not build-integrated)
6. Reviewable, diffable output

**Next:** Implementation plan and milestone definition.
