# API Philosophy: Simplicity Through Editor Tooling

## Design Principle

LunyScript intentionally keeps runtime API complexity low by deferring detailed configuration to engine editors. Instead of exposing every parameter for runtime modification, LunyScript expects developers to:

1. **Design in the editor** (particle systems, audio sources, animation controllers)
2. **Trigger/control at runtime** via simple LunyScript commands
3. **Minimize runtime parameter tweaking** (emission rates, pitch randomization, blend weights)

## Examples

**Audio**

Engines provide complex audio APIs:
```csharp
// Unity - verbose runtime configuration
audioSource.pitch = Random.Range(0.9f, 1.1f);
audioSource.volume = 0.8f;
audioSource.spatialBlend = 1.0f;
audioSource.rolloffMode = AudioRolloffMode.Linear;
audioSource.Play();

// Godot - similar complexity
audio_player.pitch_scale = randf_range(0.9, 1.1)
audio_player.volume_db = -2.0
audio_player.attenuation_model = AudioStreamPlayer3D.ATTENUATION_INVERSE_DISTANCE
audio_player.play()
```

LunyScript approach:
```csharp
// Configure in editor: pitch randomization, volume, 3D settings, etc.
// Runtime: simple trigger
Audio.Play("footstep_sound");

// Limited runtime control available when needed, easy to extend
Audio.Play("footstep_sound").WithVolume(0.5f);
```

**Particles**

Particle systems provide hundreds of parameters:
```csharp
// Unity - granular control
var emission = particles.emission;
emission.rateOverTime = 50;
var shape = particles.shape;
shape.shapeType = ParticleSystemShapeType.Cone;
shape.angle = 25f;

// Godot - similar granularity
particles.amount = 50
particles.emission_shape = GPUParticles3D.EMIT_SHAPE_SPHERE
particles.emission_sphere_radius = 2.0
```

LunyScript approach:
```csharp
// Configure in editor: emission, shape, color curves, forces, etc.
// Runtime: simple control
Particles.Play("explosion_effect");
Particles.Stop("smoke_trail");

// Limited runtime modification
Particles.Play("fire").At(targetObject);
```

## Benefits

| Aspect | Traditional API | LunyScript Approach |
|--------|----------------|---------------------|
| **Learning Curve** | High (hundreds of parameters) | Low (simple verbs) |
| **API Surface** | Large (engine-specific) | Small (unified) |
| **Maintainability** | Complex (version-dependent) | Simple (stable) |
| **Iteration Speed** | Slow (code → compile → test) | Fast (editor → test) |
| **Cross-Engine** | Difficult (different APIs) | Trivial (same API) |

## Runtime Control Where It Matters

LunyScript provides runtime control for **frequently changing values**:

```csharp
// Position, rotation, scale - change often
Transform.Position = newPos;

// Physics forces - dynamic gameplay
Physics.AddForce(direction * strength);

// Animation triggers - gameplay-driven
Animation.Play("attack");

// Asset spawning - dynamic content
Spawn("enemy_prefab").At(spawnPoint);
```

But **NOT** for:
- Audio details → Design in editor, leverage "Random Containers" etc
- Particle emission properties → Design in editor, create prefab variants
- Complex blend tree weights → Design in editor

## Implementation Note

> **TO BE REVIEWED:** Should we provide "power user" APIs for advanced runtime modification, or maintain strict simplicity? Consider opt-in `Audio.Properties.*` namespace for best extensibility.
