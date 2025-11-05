# TODO

## Architecture Design (Current Phase)

- [ ] Define core abstractions (ICoroutineScheduler, IStateMachine, IBehaviorTree, IEventDispatcher)
- [ ] Design object registration system and identity management
- [ ] Specify event ordering contract (parent-first vs child-first, frame phases)
- [ ] Design execution tracing/profiling hooks (zero-overhead when disabled)
- [ ] Design error handling and recovery strategy
- [ ] Resolve open questions (coroutine implementation, FSM/BT ownership, variable scope, asset references)

## Documentation

- [ ] Document remaining architectural decisions as they're made (in `/decisions/`)
- [ ] Add concrete code comparisons to README (Unity vs Godot vs LunyScript)
- [ ] Update roadmap - PoC is done, define Phase 1 milestones

## README Improvements (Lower Priority)

- [ ] add call to action (invite feedback), link to GitHub Disc./Issues, maybe Discord?
- [ ] Reorganize sections: pitch → solution → use cases → proof → vision
- [ ] Clarify the ask (feedback, collaborators, funding, users?)
- [ ] Add how to try it (demo, playground, install instructions)
