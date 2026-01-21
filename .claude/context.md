# Claude Session Context

## Project
- Unit-testing project for a cross-engine "engine in engines" (LunyEngine)
- Cross-Engine: Luny/LunyScript execute in Unity, Godot
  - possibly other C# engines in the future
  - possibly all engines with C++ backend and Lua API
- Folders:
    - 'Luny/' contains general-purpose (not just LunyScript) engine-agnostic types
    - 'Luny-Test/' contains unit tests for Luny
    - 'LunyLua/' contains Lua-CSharp framework
    - 'LunyLua-Test/' contains unit tests for Lua framework integration
    - 'LunyScript/' contains engine-agnostic scripting types, utilizing Luny library
    - 'LunyScript-Test/' contains unit tests for LunyScript
    - not in this project, the engine-native implementations:
    - 'Luny.Unity/' contains Unity-specific implementations/bindings
    - 'Luny.Godot/' contains Godot-specific implementations/bindings
    - 'LunyScript.Unity/' contains Unity-specific bindings for LunyScript
    - 'LunyScript.Godot/' contains Godot-specific bindings for LunyScript
- Code restricted to C# 9 for compatibility with Unity 6
- LunyEngine receives startup-updates-shutdown lifecycle callbacks from native engine
- ILunyEngineService implementations provide API and event handling, object and asset management
- LunyScriptRunner runs ILunyScriptRunnable instances (sequences, statemachines, behavior trees) which then execute (or query) ILunyScriptBlock instances

## Implementation Notes
- for logging, prefer LunyLogger methods (it redirects to engine-native logging, or in absence logs via Console.WriteLine)

## Preferences
- Concise, direct responses
- Ask if a new preference from prompts should be added to context.md
- End all responses with: `#Credits spent in chat: ~$X.XX (+$X.XX), Context: XX% budget` (credits = high estimate, accumulative for entire chat; in brackets: by how much value changed since last prompt)
- **Step-by-Step Mode**: Always operate in a strict planning-first mode.
- **Explicit Confirmation**: Do not modify any files or start implementation until the user has explicitly confirmed the plan.
- **No "Running Ahead"**: Wait for confirmation after each major phase (Planning -> Implementation -> Verification).

## Code Style
- don't write if or else statements on a single line
- don't add braces around single-line statements (if, else, for, ..) except for do/while and using
- properties and methods whenever possible should be written on a single line using "expression" syntax - use a ternary if needed but avoid multiple (nested) ternaries
- interfaces for only one type should be added to the same file as the type implementing it. Place the interface above the type.
