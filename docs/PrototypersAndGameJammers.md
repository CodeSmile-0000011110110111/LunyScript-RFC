# Prototypers & Game Jammers

## 🎮 Fast Prototyping, Reusable Code

Build playable prototypes quickly without accumulating technical debt. Test ideas across multiple engines without rewriting logic.

---

## Why LunyScript for Prototyping?

### ⚡ Rapid Iteration
- **Less boilerplate** - No component setup, event registration, or coroutine management
- **Declarative patterns** - State machines and behavior trees without visual editors
- **Fault-tolerant** - Missing assets? Placeholder instead of crash. Keep iterating.
- **Readable code** - Understand what you wrote three weeks ago at 3 AM

### 🔄 Engine Flexibility
- **Test in multiple engines** - Is this better in Unity or Godot? Find out without rewriting
- **Hedge your bets** - Start in one engine, switch if it doesn't fit
- **Learn engine strengths** - Compare workflows while code stays the same

### 📦 Reusable Systems
- **Port to production** - Prototype code that's clean enough to ship
- **Build libraries** - Create reusable gameplay systems that work everywhere
- **Share with team** - Clear, engine-agnostic code is easier to hand off

---

## Perfect for Game Jams

### Speed Without Sacrifice
Game jams demand fast results. LunyScript removes the friction between idea and implementation:

```csharp
// Enemy AI in minutes, not hours
When.Player.InRange(10)
    .Do(Try.Any(
        Attack.If(() => HasLineOfSight()),
        MoveTo(Player).Then(Attack())
    ));
```

No visual editor setup. No state management boilerplate. Just behavior.

### Jam-Friendly Features
- **Quick state machines** - Player states, game modes, UI flows
- **Simple behavior trees** - Enemy AI without spaghetti code
- **Concise event handling** - `When.Collision.With("player")` done
- **Readable debug** - When you're sleep-deprived, clear code matters

### Post-Jam Value
Unlike typical jam code:
- **Actually maintainable** - Extend your jam game into a full project
- **Portfolio-worthy** - Code that demonstrates design patterns, not hacks
- **Cross-engine** - Reuse your best jam systems in future projects

---

## Use Cases

### Prototyping Game Mechanics
Test core gameplay loops across engines before committing to production:
- Try physics-heavy mechanics in both Unity and Godot
- Compare editor workflows for your specific game type
- Validate technical feasibility before full production

### Testing Engine Fit
**You can't know which engine fits your project until you try it:**
- 2D pixel art game? Test Godot's pixel-perfect workflow vs Unity's
- Physics-based puzzle? Compare physics engines with same code
- Narrative-heavy? Test UI/dialogue workflows across engines

### Building Reusable Libraries
Create cross-engine gameplay systems:
- Dialogue/quest systems
- Inventory and crafting
- Character controllers
- Camera systems
- AI behaviors

Ship as packages that work in multiple engines.

---

## Example: 48-Hour Jam Workflow

### Hour 0-2: Setup
```csharp
// Basic player movement - 5 minutes
When.Input.Down("left")
    .Do(Move.Left());

// Camera follow - 2 minutes
Camera.Follow(Player).Smooth();
```

### Hour 2-12: Core Loop
```csharp
// Enemy spawner
Repeat.Every(Seconds(5))
    .Do(Spawn("enemy").At(RandomPoint()));

// Simple AI
When.Player.InRange(8)
    .Do(Chase(Player).Then(Attack()));
```

### Hour 12-36: Polish & Content
- Add juice: particles, audio, screen shake
- Tune gameplay: tweak numbers in one place
- Build levels: focus on design, not debugging

### Hour 36-48: Ship It
- Code is already clean
- No "TODO: refactor this mess"
- Ready to extend post-jam

---

## Real Talk: Limitations

LunyScript won't help with:
- **Asset creation** - You still need art, audio, and design skills
- **Engine-specific features** - Custom shaders, advanced physics, etc.
- **Performance optimization** - Profile and optimize in native code when needed

**But it will** get your gameplay logic up and running faster, cleaner, and more portably than raw engine APIs.

---

## Getting Started

1. **Start simple** - Basic movement and collision
2. **Add structure** - State machines for player/enemies
3. **Extend as needed** - Drop to native code for special cases
4. **Prototype faster** - Focus on design, not API wrestling

---

## Questions?

**[Join the Discussions](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/)** - Share your prototyping workflows and jam stories!

---

[← Back to Main Documentation](../index.md)
