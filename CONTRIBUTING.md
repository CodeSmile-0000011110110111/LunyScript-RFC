# Contributing to LunyScript

Thank you for your interest in contributing to LunyScript! This document provides guidelines and setup instructions for contributors.

## Before You Start

1. **Read [AI-USAGE.md](AI-USAGE.md)** - Understand our AI usage policies and restrictions
2. **Review [Guidelines.md](Guidelines.md)** - Learn our coding and documentation standards
3. **Check [TODO.md](TODO.md)** - See current priorities and open tasks

## Required: Developer Certificate of Origin (DCO)

All commits must include a `Signed-off-by` line certifying you agree to the [Developer Certificate of Origin](https://developercertificate.org/).

### Quick Setup

Run our setup script to automatically configure your local repository:

```bash
./scripts/setup-contributor.sh
```

Or manually configure git to always sign-off commits:

```bash
git config commit.gpgsign false
git config format.signoff true
```

Then commit as usual:

```bash
git commit -m "Your commit message"
```

The `Signed-off-by: Your Name <your.email@example.com>` line will be added automatically.

### Manual Sign-off

If you prefer not to auto-sign, use the `-s` flag:

```bash
git commit -s -m "Your commit message"
```

## AI-Assisted Contributions

If you use AI tools to help with your contributions:

1. **Only use approved AI tools** - See [AI-USAGE.md](AI-USAGE.md#ai-tools-approved-for-use)
2. **Never use prohibited tools** - Especially GitHub Copilot (see [AI-USAGE.md](AI-USAGE.md#-prohibited-ai-tools))
3. **Declare AI usage** - Include this in your first AI-assisted commit:

```
I am using AI to co-author my contributions and will comply with AI-USAGE.md as updated.

AI tool(s): [e.g., Claude, JetBrains AI]

Signed-off-by: Your Name <your.email@example.com>
```

4. **Want to use an unlisted AI tool?** - Open a discussion first

## Contribution Workflow

1. **Fork the repository**
2. **Create a feature branch** - `git checkout -b feature/your-feature-name`
3. **Make your changes** - Follow [Guidelines.md](Guidelines.md)
4. **Test your changes** - Ensure everything works
5. **Commit with DCO** - Use `git commit -s` or auto-signoff
6. **Push to your fork** - `git push origin feature/your-feature-name`
7. **Open a Pull Request** - Describe your changes clearly

## Documentation Standards

When contributing documentation:

- **Be concise and direct** - No unnecessary preamble
- **Use bullet points** for lists and requirements
- **Provide concrete examples** over abstract descriptions
- **Keep REPOSITORY-INDEX.md updated** when adding/removing files

## Code Standards

When contributing code (future phases):

- **Review and understand** all code before submitting (especially AI-assisted code)
- **Test thoroughly** - Include tests where appropriate
- **Follow existing patterns** - Maintain consistency with the codebase
- **Document your rationale** - Explain "why" in comments, not just "what"

## Pull Request Review Process

All contributions are reviewed for:

- ✅ DCO sign-off present on all commits
- ✅ Compliance with AI-USAGE.md (if AI-assisted)
- ✅ Code quality and understanding
- ✅ Documentation standards
- ✅ Test coverage (when applicable)

We may:

- Request explanation of implementation details
- Ask for changes or improvements
- Reject contributions that violate policies

## Contributor Responsibilities

By contributing, you certify that:

1. You have the legal right to submit your contributions
2. Your contributions don't infringe third-party intellectual property rights
3. You comply with all project policies (AI-USAGE.md, Guidelines.md, etc.)
4. You agree to indemnify project maintainers from claims arising from your contributions

See [AI-USAGE.md - Contributor Responsibilities](AI-USAGE.md#contributor-responsibilities-and-indemnification) for full details.

## Questions or Issues?

- **General questions**: [Open a discussion](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/discussions/)
- **Bug reports**: Open an issue
- **Policy questions**: Ask in discussions or refer to documentation

## Thank You!

Your contributions help make cross-engine game development more accessible and powerful. We appreciate your time and effort!
