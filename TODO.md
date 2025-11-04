# TODO: README Improvements for RFC


## High Priority

- Ensure positioning as learning tool initially, with far reaching long term benefits for everyone
- **Add concrete code comparison** - Show Unity vs Godot vs LunyScript side-by-side for same feature (e.g., collision handling). Currently placeholders at lines 32, 144, 186
  - Quantify claim via examples
  - Analyse "same task, multiple engines" status quo (boilerplate, semantics)
  - Hunch: GDScript is very short, but is this offset by more UI clicks?

## Medium Priority

- **Clarify target audience** - Bounces between **beginners**, designers, indies, **educators**. Pick 1-2 primary audiences
- **Reduce opinion pieces** - Lines 149-176 "My Story" section is too long and subjective. Cut 70% or move to separate doc
- **Organize sections logically** - Current flow: pitch → philosophy → vision → solution → story → summary → description. Restructure to: pitch → solution (with code) → use cases → proof → vision/philosophy
- **Update roadmap** - Proof of concept is done (2024). What's the actual current status and next milestones?

## Low Priority

- **Fix formatting inconsistencies** - Mix of dashes, section dividers, emphasis styles throughout

## Questions to Address

- What's the actual ask? (feedback, collaborators, funding, users?)
- How can people try it? (demo, playground, install instructions)

## Thoughts, Ideas

- Pro-Tier Engines can be powerful Game Creation Tools (like GameMaker) by reducing cognitive load of coding. Have integrated escape hatches to professional workflows. Beginner-level visual statemachine/sequencing assets are popular (GameCreator, PlayMaker)
  - Consider reframe: Pro Game Engines become (are) Next-Gen Game Creation Tools
  - Goal: simplify code first, tutorials will follow with focus on explaining UI / workflows to corresponding target audiences' levels of confidence (Roblox Creator vs GameMaker/Construct User vs Scratcher)

### Pro-Tier Game Engines => Next-Gen Game Creation Tool

Game Engines are made for and concerned only with professional use-cases.

They nevertheless have the power to embrace game creation by providing more direct game logic programming with less boilerplate.

Visual tools (PlayMaker, GameCreator) proved there's massive demand for high-level game logic APIs, for beginners and professionals alike.

LunyScript is the missing middle layer: declarative game logic that reads like design intent, writes like code, and compiles to engine-native performance. A purpose-built scripting language for game behavior.

Beginners get Scratch-level clarity. Professionals get native escape hatches. Everyone enjoys less boilerplate, and the ability to run the same code in a different engine.
