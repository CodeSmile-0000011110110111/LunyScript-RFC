# Maintenance Strategy

**Who maintains the engine adapters when engines update?**

LunyScript's long-term sustainability relies on:

- **Autonomous engine maintainers** - Engine experts who maintain "their" engine's adapter, especially for emerging engines. Adapters focus on stable feature sets (eg Input, Audio, Physics).
- **Community-driven model** - Following FOSS best practices with clear contribution guidelines
- **Stable abstraction layer** - Core "Luny" abstractions change rarely; adapters handle engine-specific updates
- **Version compatibility contracts** - Adapters track specific engine versions; updates are opt-in
- **Focused scope** - By limiting to high-level gameplay scripting, we minimize maintenance surface area

During Phases 1-3, adapters are maintained by the project lead. Phase 3+ focuses on building the contributor ecosystem and establishing autonomous maintainers for each engine.

## Maintenance Phases

### Phase 1-3: Core Development (2025-2027)
- Project lead likely maintains all engine adapters
- Focus on API stability and documentation
- Build foundation for community contributions

### Phase 3+: Community Ecosystem
- Recruit autonomous engine maintainers
- Establish clear adapter maintenance guidelines
- Create verification test suites for adapter updates
- Version pinning and compatibility documentation

## Adapter Maintenance Model

Each engine adapter is maintained by:
1. **Primary maintainer** - Engine expert responsible for updates
2. **Backup maintainers** - Community members familiar with the adapter
3. **Verification tests** - Automated tests ensuring adapter compatibility

## Engine Version Compatibility

- **Explicit version tracking** - Each adapter specifies supported engine versions
- **Opt-in updates** - Users choose when to upgrade adapters
- **LTS support strategy** - Focus on Long-Term Support engine versions
- **Breaking change policy** - Clear communication and migration guides

## Contribution Model

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on:
- How to become an engine adapter maintainer
- Adapter update guidelines
- Testing and verification requirements
- Review and approval process

## Risk Mitigation

**If an adapter becomes unmaintained:**
- Mark as "community-maintained" or "unmaintained" in documentation
- Pin to last known-good engine version
- Seek new maintainers from community
- Remove from official support if necessary

The focused scope and stable abstraction layer minimize the risk of maintenance burden becoming unsustainable.
