# TODO: README Improvements for RFC

## High Priority

- **Add concrete code comparison** - Show Unity vs Godot vs LunyScript side-by-side for same feature (e.g., collision handling). Currently placeholders at lines 32, 144, 186
- **Add proof video/screenshots** - Replace placeholder at line 32 with actual demo showing identical behavior across engines
- **Consolidate duplicate messaging** - "Same code in any engine" appears 3+ times (lines 2, 12, 50, 111). Pick strongest framing, remove rest
- **Remove contradictory sections** - Lines 147-198 marked "CUT OR IMPROVE BELOW" - either fix or remove entirely
- **Streamline intro** - First 50 lines repeat core pitch 4 times. Consolidate to single compelling opener

## Medium Priority

- **Clarify target audience** - Bounces between beginners, designers, indies, educators. Pick 1-2 primary audiences
- **Reduce opinion pieces** - Lines 149-176 "My Story" section is too long and subjective. Cut 70% or move to separate doc
- **Organize sections logically** - Current flow: pitch → philosophy → vision → solution → story → summary → description. Restructure to: pitch → solution (with code) → use cases → proof → vision/philosophy
- **Quantify claims** - "80% less boilerplate", "5% overhead" need context or proof. Add benchmarks or remove percentages
- **Update roadmap** - Proof of concept is done (2024). What's the actual current status and next milestones?

## Low Priority

- **Shorten GDScript critique** - Lines 86-106 risk alienating Godot community. Make constructive, cut by 50%
- **Clean up technical section** - Lines 309-336 too dense for RFC audience. Move to separate architecture doc or summarize
- **Fix formatting inconsistencies** - Mix of dashes, section dividers, emphasis styles throughout
- **Trim use cases** - Lines 210-217 lists 6 audiences. Focus on top 3 most compelling
- **Remove meta comments** - Lines 147, 197, 219-228 contain "TBD" and planning notes

## Questions to Address

- What's the actual ask? (feedback, collaborators, funding, users?)
- What's the licensing model?
- Where's the code? (repo link missing)
- How can people try it? (demo, playground, install instructions)
