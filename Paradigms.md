# Paradigms

LunyScratch applies the following programming paradigms, in order of prominence:

1. **Declarative Programming** - The code declares *what* should happen using high-level abstractions (`Repeat.Forever`, `When.Input`, `Run.AtOnce`) rather than explicit loops and conditionals.

2. **Event-Driven Programming** - Event handling similar to Scratch but more powerful: `When.Collision.Enter()`, `When.Button.Clicked()`, `Input.Key.IsJustPressed()`.

3. **Functional Programming** - Functions as first-class values, composition of sequences (`Run(HideMenu(), ShowHUD())`), and chaining operations without side effects being explicit (`Prefab["GoldCube"].Spawn().At(Other).Amount(3)`).

4. **Visual/Block Programming** (conceptual) - The API mimics block-based programming paradigms (like Scratch), using named blocks as building blocks rather than traditional control structures.
