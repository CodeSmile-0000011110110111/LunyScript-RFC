# API Description Format

This document defines the Lua descriptor format for LunyEngine API code generation.

## Design Goals

1. **Separation of Concerns**: Service definitions (Luny layer) separate from block definitions (LunyScript layer)
2. **Extensibility**: Third parties can add new services or block groups
3. **Clear Dependencies**: Blocks depend on services, never the reverse
4. **Engine Abstraction**: Service interfaces are engine-agnostic
5. **Versioning**: Services and blocks can version independently
6. **Self-Contained**: Descriptors specify their own output locations

## Project Structure

### Folder Convention

**CodeGen~ folder** - Excluded from Unity (automatic via `~`) and Godot (via `.gdignore`)

```
Luny/
├── [runtime code]
└── CodeGen~/
    ├── .gdignore                 # Empty file for Godot exclusion
    ├── README.md                 # How to run generator
    ├── Descriptors/
    │   └── Services/
    │       ├── vehicle_service.lua
    │       └── Unity/
    │           └── vehicle_service_unity.lua
    └── Generators/               # Custom generator implementations
        ├── ServiceInterfaceGenerator.cs
        ├── UnityServiceGenerator.cs
        └── BlockGenerator.cs

LunyScript/
├── [runtime code]
└── CodeGen~/
    ├── .gdignore
    ├── README.md
    ├── Descriptors/
    │   └── Blocks/
    │       └── vehicle_blocks.lua
    └── Generators/               # Optional: custom generators
```

**Benefits:**
- ✅ Unity auto-ignores (via `~` suffix)
- ✅ Godot ignores (via `.gdignore`)
- ✅ No .csproj modifications needed
- ✅ Descriptors co-located with code they describe
- ✅ Generators act as reference implementations

## Architecture Overview

### Two-Layer Descriptor System

```
┌─────────────────────────────────────┐
│ Block Descriptors (LunyScript)      │
│ - User-facing block API             │
│ - References service interfaces     │
│ - Engine-agnostic                   │
└─────────────┬───────────────────────┘
              │ depends on
              ↓
┌─────────────────────────────────────┐
│ Service Descriptors (Luny)          │
│ - Engine service interfaces         │
│ - Engine-specific implementations   │
│ - Native engine calls               │
└─────────────────────────────────────┘
```

**Dependency Flow:**
- Blocks → Services (✓ Valid)
- Services → Blocks (✗ Invalid)
- Third parties can extend either layer independently

## Service Descriptor Format

**Location:** `CodeGen~/Descriptors/Services/{domain}_service.lua`

**Purpose:** Define engine service interface contract and implementations

### Structure

```lua
-- vehicle_service.lua
return {
  -- Metadata
  service_name = "Vehicle",  -- Generates IVehicleEngineService
  version = "1.0",
  description = "Vehicle control operations",

  -- Output paths (relative to descriptor file location)
  output = {
    interface = "../../Generated/IVehicleEngineService.cs",
    unity = "../../Unity/Generated/UnityVehicleEngineService.cs",
    godot = "../../Godot/Generated/GodotVehicleEngineService.cs"
  },

  -- Service interface contract (engine-agnostic)
  methods = {
    SetSpeed = {
      description = "Set forward velocity magnitude",
      params = {
        {name="speed", type="number", min=0, max=100, required=true}
      },
      returns = "void"
    },

    Steer = {
      description = "Set steering direction",
      params = {
        {name="direction", type="number", min=-1, max=1, required=true}
      },
      returns = "void"
    },

    Honk = {
      description = "Play horn sound",
      params = {},
      returns = "void"
    }
  },

  -- Engine-specific implementations
  engines = {
    Unity = dofile("Services/Unity/vehicle_service_unity.lua"),
    Godot = dofile("Services/Godot/vehicle_service_godot.lua")
  }
}
```

### Engine Implementation Descriptor

**Location:** `Descriptors/Services/{Engine}/{domain}_service_{engine}.lua`

**Purpose:** Define engine-specific implementation details

```lua
-- Services/Unity/vehicle_service_unity.lua
return {
  SetSpeed = {
    namespace = "UnityEngine",
    target = "Rigidbody.velocity",
    transformation = "ToVector3Forward",
    version_overrides = {
      default = "Rigidbody.velocity",
      ["6000.3.4"] = "Rigidbody.linearVelocity"  -- Unity 6.3.4+
    }
  },

  Steer = {
    namespace = "UnityEngine",
    target = "CarController.steerAngle",
    transformation = {name="Scale", factor=45.0}
  },

  Honk = {
    namespace = "UnityEngine",
    target = "AudioSource.PlayOneShot",
    signature = {"AudioClip", "float"},  -- For overload resolution
    params = {
      {name="clip", type="object", transformation="LookupAsset", default="HornSound"}
    }
  }
}
```

### Service Method Parameter Spec

```lua
params = {
  {
    name = "speed",           -- Parameter name
    type = "number",          -- Lua type: "number", "bool", "string", "object"
    min = 0,                  -- Optional: numeric range validation
    max = 100,
    required = true,          -- Optional: is parameter required?
    default = nil,            -- Optional: default value if not provided
    description = "Speed value in units/sec"
  }
}
```

## Block Descriptor Format

**Location:** `CodeGen~/Descriptors/Blocks/{domain}_blocks.lua`

**Purpose:** Define user-facing block API that uses services

### Structure

```lua
-- vehicle_blocks.lua
return {
  -- Metadata
  block_group = "Vehicle",  -- Generates static class Vehicle
  service_dependency = "IVehicleEngineService",  -- Which service interface to use
  version = "1.0",
  description = "User-facing vehicle control blocks",

  -- Output path (relative to descriptor file location)
  output = {
    blocks = "../../../Generated/VehicleAPI.cs"
  },

  -- User-facing blocks
  blocks = {
    SetSpeed = {
      description = "Set vehicle forward speed",
      user_params = {
        {name="speed", type="number"}  -- What user provides to block
      },
      service_method = "SetSpeed",  -- Which service method to call
      service_args = {
        "speed"  -- Map user param → service param (can transform here)
      }
    },

    Steer = {
      description = "Steer vehicle left/right",
      user_params = {
        {name="direction", type="number"}
      },
      service_method = "Steer",
      service_args = {"direction"}
    },

    Honk = {
      description = "Play horn sound",
      user_params = {},  -- No user parameters
      service_method = "Honk",
      service_args = {}
    }
  }
}
```

### Block Parameter Spec

```lua
user_params = {
  {
    name = "speed",           -- Parameter name
    type = "number",          -- C# type at user API level
    validation = {            -- Optional: validation at block construction
      min = 0,
      max = 100
    },
    description = "Forward speed"
  }
}
```

### Service Argument Mapping

```lua
service_args = {
  "speed",              -- Simple: pass through user param directly

  -- OR complex mapping (future):
  {param="speed", transformation="Scale", factor=0.5}
}
```

## Type System

### Lua Types (Service Level)

Used in service method parameters:

- `"number"` - double precision (maps to C# `double`)
- `"bool"` - boolean (maps to C# `bool`)
- `"string"` - string (maps to C# `string`)
- `"object"` - generic object reference (maps to C# `object` or specific type)

### C# Types (Block Level)

Used in block user parameters - same as Lua types for MVP.

Future: May add strongly-typed variants (`"int"`, `"float"`, etc.)

## Transformation Specification

Transformations convert semantic parameters to engine-native types.

### Simple String Reference

```lua
transformation = "ToVector3Forward"
```

References a registered C# transformation by name.

### Parameterized Transformation

```lua
transformation = {
  name = "Scale",
  factor = 45.0
}
```

Table format allows passing configuration to transformation.

### Common Transformations (MVP)

**Numeric:**
- `Scale` - multiply by factor: `{name="Scale", factor=N}`
- `Normalize` - clamp to range: `{name="Normalize", min=0, max=1}`
- `Clamp` - clamp to range: `{name="Clamp", min=N, max=M}`

**Vector:**
- `ToVector3Forward` - double → Vector3(0, 0, value)
- `ToVector3Up` - double → Vector3(0, value, 0)
- `ToVector3` - (x,y,z) → Vector3(x, y, z)

**Lookup:**
- `LookupAsset` - string → engine asset reference
- `LookupObject` - string → scene object reference

## Version Handling

### Engine Version Overrides

```lua
version_overrides = {
  default = "Rigidbody.velocity",
  ["6000.3.4"] = "Rigidbody.linearVelocity",  -- Unity 6.3.4+
  ["6000.7.0"] = "Rigidbody.linearVelocityNew"  -- Unity 6.7.0+
}
```

**Resolution rules:**
- Version strings use semantic versioning: `major.minor.patch`
- Numbers only, no suffixes (no "f1", "rc1", etc.)
- Generator selects highest version ≤ current engine version
- Example: Unity 6.5.0 → uses `"6000.3.4"` target

### Descriptor Versioning

```lua
version = "1.0"  -- Descriptor format version
```

Allows tracking breaking changes to descriptor format itself.

## Namespace Grouping

For cleaner target specifications:

```lua
namespace = "UnityEngine"
target = "Rigidbody.velocity"
-- Generates: UnityEngine.Rigidbody
```

Benefits:
- Shorter target strings
- Avoids ambiguity (user types vs engine types)
- Groups related APIs

## Method Overload Resolution

For engine methods with multiple overloads:

```lua
signature = {"AudioClip", "float"}
```

Specifies parameter types to select correct overload at generation time.

**When needed:**
- `AudioSource.PlayOneShot(AudioClip)` vs `PlayOneShot(AudioClip, float)`
- `Instantiate(GameObject)` vs `Instantiate(GameObject, Transform)` vs `Instantiate(GameObject, Vector3, Quaternion)`

**Default:** If omitted, assumes single implementation or no ambiguity.

## Extensibility Points

### Third-Party Services

Create new service descriptor:

```lua
-- Descriptors/Services/ThirdParty/custom_service.lua
return {
  service_name = "CustomFeature",
  methods = { ... },
  engines = {
    Unity = dofile("Services/ThirdParty/Unity/custom_service_unity.lua")
  }
}
```

Generator produces `ICustomFeatureEngineService` in custom namespace.

### Third-Party Blocks

Create new block group using existing or custom service:

```lua
-- CodeGen~/Descriptors/Blocks/ThirdParty/custom_blocks.lua
return {
  block_group = "CustomAPI",
  service_dependency = "ICustomFeatureEngineService",
  output = {
    blocks = "../../../../MyFramework/Generated/CustomAPI.cs"
  },
  blocks = { ... }
}
```

Generator produces `CustomAPI` static class with blocks.

### Custom Output Locations

Output paths are specified in descriptors (relative to descriptor file):

```lua
output = {
  interface = "../../../Generated/ICustomService.cs",
  unity = "../../../Unity/Generated/UnityCustomService.cs",
  blocks = "../../../Generated/CustomAPI.cs"
}
```

No CLI output path arguments needed - descriptors are self-contained.

## Open Design Questions

### Service Return Values

Currently all methods return `void`. Future:

```lua
methods = {
  GetSpeed = {
    params = {},
    returns = "number"  -- How to handle return values in blocks?
  }
}
```

**Options:**
- Store in context variables?
- Return from block Execute()?
- Separate query blocks vs setter blocks?

**Decision:** Deferred for MVP (all blocks are setters)

### Multi-Parameter Transformations

Current: Transformations operate on single parameters.

Future: Some operations need multiple inputs:

```lua
transformation = {
  name = "ToVector3",
  params = {"x", "y", "z"}  -- Combine three user params
}
```

**Decision:** Deferred for MVP (use service-level transformation)

### Error Handling Strategy

How to handle failures?

```lua
error_behavior = "throw"  -- Options: "throw", "log", "silent"
```

**Options:**
- Missing component: throw vs skip?
- Type mismatch: fail at startup vs runtime?
- Asset not found: exception vs default?

**Decision:** TBD, likely throw for MVP (fail loudly)

## Summary

**Two-descriptor system:**
1. **Service descriptors** - Define engine service contracts (Luny layer)
2. **Block descriptors** - Define user-facing blocks (LunyScript layer)

**Clear separation:**
- Services own engine-specific implementation details
- Blocks reference services via interface contracts
- Third parties can extend independently

**Self-contained:**
- Descriptors specify their own output paths
- No CLI output arguments needed
- Relative paths from descriptor location

**Folder convention:**
- `CodeGen~/` - Excluded from Unity/Godot
- Generators live alongside descriptors as reference implementations

**Next:** Define generator tool architecture and code emission strategy.
