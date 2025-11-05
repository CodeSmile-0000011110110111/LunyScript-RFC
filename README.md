# LunyScript - Cross-Engine Gameplay Scripting

## Works the same in Unity, Godot, Unreal, ...

    When.Collision.With("ball")
        .Begins(Audio.Play("ball_tagged_loop"))
        .Ends(Spawn("sparkles").At(Other).Run(Wait.Seconds(2.5), Despawn()))

Different engine, different language - same behaviour, same semantics!

## Proof: Same Code, Three Engines

[![LunyScript Demo](media/LunyScript_Demo.gif)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")<br/>
**[Watch the full video on Youtube (1:20)](https://youtu.be/Vn38VLNDsuw "LunyScript: Same Code, Three Engines - Proof of Concept Demo")**

**✅ Same code, 3 engines, 20 days** | Unity → Godot: 3 days | Godot → Unreal: 3 days

## Why LunyScript?

**For learners:** Simple, fun! Skills and code transfer across engines. No more starting from scratch!

**For studios:** Teams don't fragment along engine-specific roles. Code works across projects.

**For everyone:** Less boilerplate, more intent. Write behavior, not plumbing. Build reusable libraries.

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

## 🎮 Proof of Concept Repositories

| [Godot PoC](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Godot) | [Unity PoC](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Unity) | [Unreal PoC](https://github.com/CodeSmile-0000011110110111/LunyScratch_Examples_Unreal) |
|-------|-------|--------|

---

## 📋 Repository Contents

- [REPOSITORY-INDEX.md](REPOSITORY-INDEX.md) - Complete file and folder index
- [Guidelines.md](Guidelines.md) - Contribution and documentation guidelines
- [CHANGELOG.md](CHANGELOG.md) - Version history and completed work
- [TODO.md](TODO.md) - Current tasks and roadmap
