# LunyScript - Cross-Engine Gameplay Scripting

## Works the same in Unity, Godot, Unreal, ...

    When.Collision.With("ball")
        .Begins(Audio.Play("ball_tagged_loop"))
        .Ends(Spawn("sparkles").At(Other).Run(Wait.Seconds(2.5), Despawn()))

Different engine, different language - same behaviour, same semantics!

---

## 📖 Documentation & Resources

### [🌐 Project Website](https://codesmile-0000011110110111.github.io/LunyScript-RFC/)
Complete overview with examples, use cases, benefits, and proof of concept

### [🎨 Design Documentation](https://codesmile-0000011110110111.github.io/LunyScript-RFC/docs/)
Architecture, technical decisions, API design, and implementation details

### [💬 Discussions](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/)
Join the conversation! Share ideas, ask questions, and help shape LunyScript's future

### [❓ Frequently Asked Questions](FAQ.md)
Common questions about LunyScript's approach, performance, maintenance, and technical implementation

---

## 🎮 Proof of Concept

Same code, same game, runs in three engines. Built in under 20 days.

| Godot | Unity | Unreal |
|-------|-------|--------|
| ![PlayMode_Godot_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot_Editor.png) | ![PlayMode_Unity_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity_Editor.png) | ![PlayMode_Unreal_Editor.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal_Editor.png) |
| ![PlayMode_Godot.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Godot.png) | ![PlayMode_Unity.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unity.png) | ![PlayMode_Unreal.png](2025-10_Proof_Of_Concept_Demo/screenshots/PlayMode_Unreal.png) |

## 📋 Repository Contents

- [REPOSITORY-INDEX.md](REPOSITORY-INDEX.md) - Complete file and folder index
- [Guidelines.md](Guidelines.md) - Contribution and documentation guidelines
- [CHANGELOG.md](CHANGELOG.md) - Version history and completed work
- [TODO.md](TODO.md) - Current tasks, next steps
