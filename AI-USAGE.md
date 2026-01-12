# AI Usage in LunyScript Development

> **Transparency statement** about artificial intelligence assistance in this project

## Intro

A uniform high-level API layer across engines doesn't exist partly due to the tedious, boring work writing engine adapters and abstractions. Nobody likes doing that. But we can (and should!) outsource this to AI. It will accurately map one API to another. 

Since AI usage is often met with skepticism, I'm absolutely with Dmitry and his dividing line (3:44):
<iframe width="648" height="365" src="https://www.youtube.com/embed/AlQRkOgpi_A?start=224" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

And of course [his summary of what AI does (really) well](https://youtu.be/2Z-ng6g_mbU?si=vnhEXYo2WdEjd5fN&t=91):

1. Boilerplate Code
2. Explaining Code
3. Troubleshooting
4. Writing Tests
5. Writing Documentation

Since LunyScript is an open source project, certain rules and guidelines for using AI needed to be established.

So, allow me to let the AI do the detailed, boring legal/regulatory text for me. If reading this bores you, feed that text into your AI to provide you with a quick summary. 😉

## FOSS Compliance

**This project's use of AI complies with Free and Open Source Software (FOSS) principles.** We ensure FOSS compatibility through:

- **License-safe AI tools**: Only using AI assistants with clear terms allowing FOSS contributions (avoiding tools trained on GPL code without proper licensing)
- **Human authorship**: All AI outputs are reviewed, understood, and substantially modified by human developers who take full responsibility
- **Transparent provenance**: Declaring AI usage via Developer Certificate of Origin (DCO) to maintain clear contribution lineage
- **MIT License compatibility**: Ensuring all AI-assisted contributions comply with our permissive MIT license

This approach protects the project from license contamination while maintaining the transparency and legal clarity expected in FOSS development.

## Purpose

This document records how AI tools are used in the design, documentation, and implementation of LunyScript to maintain transparency with contributors and users.

---
## ⚠️ Critical Policy: Legally Disputed AI Models ⚠️

**AI models currently involved in relevant legal disputes MUST NOT be used for contributions to this project!**

References:

- [Lawsuits in the US related to AI & Copyright](https://www.bakerlaw.com/services/artificial-intelligence-ai/case-tracker-artificial-intelligence-copyrights-and-class-actions/) (not exhaustive) 

### 🚫 List of Prohibited AI Tools 🚫

🚫 **GitHub Copilot** - **FORBIDDEN** for contributions to this project 🚫
- **Reason**: Active lawsuit regarding training on GPL-licensed source code without proper attribution
- **Risk**: Potential license contamination and legal liability
- **Status**: Until legal disputes are resolved and training data provenance is clarified, Copilot-assisted contributions will not be accepted

🚫 **OpenAI GPT Models (ChatGPT, GPT-4, etc.)** - **FORBIDDEN** for contributions to this project 🚫
- **Reason**: Precaution due to high probability of public code repositories containing GPL code being used for training models; multiple ongoing copyright lawsuits against OpenAL
- **Risk**: High probability of GPL code reproduction; unclear license provenance; potential legal liability
- **Status**: Until training data provenance is clarified and legal disputes are resolved, GPT-assisted contributions will not be accepted
- **Source**: Public repositories used in training data contain vast amounts of GPL-licensed code (ZDNet, Medium)

**If other AI models become subject to similar legal disputes, they will be added to this prohibited list.**

---

## AI Tools Approved for Use

**Co-authoring with AI is restricted to the models listed in this section.**

### Claude (Anthropic)
- **Primary use**: Design discussions, architecture planning, documentation drafting, code review
- **License compatibility**: Anthropic's terms allow commercial and FOSS use of outputs
- **Legal status**: No known licensing disputes
- **How we use it**:
  - Exploring architectural alternatives
  - Drafting and refining documentation
  - Code generation and review
  - Problem-solving and design validation

### JetBrains AI (including Junie)
- **Primary use**: Code completion, refactoring suggestions, inline code generation
- **License compatibility**: JetBrains AI terms allow use in personal and commercial projects
- **Legal status**: No known licensing disputes
- **How we use it**:
  - Code completion during implementation
  - Refactoring suggestions
  - Code pattern recommendations

## Our AI Usage Policy

### What We Use AI For
- ✅ Architecture and design exploration
- ✅ Documentation drafting and editing
- ✅ Code generation and boilerplate reduction
- ✅ Code review and quality suggestions
- ✅ Research and comparative analysis
- ✅ Problem-solving and debugging assistance

### Human Oversight
- **All AI-generated content is reviewed and modified** by human developers
- **Design decisions are human-driven** - AI assists but doesn't decide
- **Code is understood before integration** - no blind copy-paste
- **Documentation reflects human intent** - AI helps articulate, not dictate

### Quality Standards
1. **Review every suggestion** - AI output is a draft, not final
2. **Understand the code** - if AI generates it, we must comprehend it
3. **Test thoroughly** - AI-assisted code receives same testing as hand-written code
4. **Document rationale** - explain *why*, not just *what* AI suggested

## License Compatibility

### MIT License and AI
- **LunyScript is MIT-licensed** - permissive for all uses
- **AI-generated content is compatible** with MIT License
- **No restrictions on AI usage** in MIT-licensed projects
- **Output ownership** - We claim authorship of AI-assisted work through our prompts, selections, and modifications

### Why This Matters
Transparency about AI usage:
- Builds trust with contributors and users
- Demonstrates thoughtful tool usage
- Shows human oversight and responsibility
- Clarifies licensing and ownership

## For Contributors

### Contributor Responsibilities and Indemnification

**By contributing to this project, you represent and warrant that:**

1. **Legal Right**: You have the legal right to submit your contributions
2. **No Infringement**: Your contributions do not infringe any third-party intellectual property rights
3. **Compliance**: You comply with this AI-USAGE.md policy for all AI-assisted contributions
4. **Indemnification**: You agree to indemnify and hold harmless the project maintainers from any claims, damages, or legal costs arising from your contributions

**Consequences of policy violations:**
- Contributions may be rejected without review
- Merged contributions may be reverted if issues are discovered
- Repeated violations may result in removal of contributor access

### Developer Certificate of Origin (DCO)

All commits must include a `Signed-off-by` line certifying you agree to the [Developer Certificate of Origin](https://developercertificate.org/).

**See [CONTRIBUTING.md](CONTRIBUTING.md) for easy setup instructions** - we provide scripts to automate this.

Manual sign-off:
```bash
git commit -s -m "Your commit message"
```

This certifies that you have the right to submit the work under the project's license.

### Required: First AI-Assisted Contribution

**Your first AI-assisted commit MUST include this declaration:**

```
I am using AI to co-author my contributions and will comply with AI-USAGE.md as updated.

AI tool(s): [e.g., Claude, JetBrains AI]

Signed-off-by: Your Name <your.email@example.com>
```

### If You Use AI Tools
- ✅ **Only use approved AI tools** listed under "AI Tools Approved for Use"
- ✅ **Declare AI usage** in your **first** AI-assisted commit (see boilerplate above)
- ✅ **Use DCO on all commits** (`git commit -s`)
- ✅ **Review and understand** all AI-generated code before submitting
- ✅ **Substantially modify** AI suggestions - don't just copy-paste
- ✅ **Test thoroughly** - AI-assisted code needs human validation
- 🚫 **Never use prohibited AI tools** listed under "Prohibited AI Tools"

### Want to Use an Unlisted AI Tool?
- **Open a discussion first** before using an AI model not listed under "AI Tools Approved for Use"
- Provide information about:
  - Training data sources and licensing
  - Terms of service regarding output ownership
  - Any known legal disputes or licensing concerns
- Wait for approval before submitting AI-assisted contributions using that tool

### If You Don't Use AI Tools
- **Equally welcome!** AI is a tool, not a requirement
- **Still use DCO** (`git commit -s`) for all contributions
- **No disadvantage** - human-written contributions are valued
- **Your choice** - use whatever tools work best for you

## General Caution Guidelines

⚠️ **Exercise caution with any AI model that:**
- Is trained on GPL/AGPL codebases without clear licensing
- Does not disclose training data sources
- Claims ownership of generated outputs
- Is currently involved in legal disputes regarding licensing or training data
- Has unclear terms regarding commercial or FOSS use

**When in doubt:**
1. Open a discussion before using the tool
2. Do not submit contributions until the tool is approved

*Note: This is project policy based on risk assessment, not legal advice.*

## Code Review and Verification

**All contributions undergo review to verify:**
- Compliance with AI-USAGE.md policies
- No obvious signs of prohibited AI tool usage
- Code quality and understanding by contributor
- Appropriate licensing and attribution

**We reserve the right to:**
- Request explanation of implementation details
- Reject contributions that appear to violate policies
- Revert merged contributions if policy violations are discovered
- Use AI detection tools as part of review process

This review process demonstrates due diligence in maintaining license compliance and code quality.

## Attribution

While not required by our license or AI terms of service:
- We acknowledge AI assistance in our development process
- We take full responsibility for all code and documentation in this repository
- Final decisions and implementations are human-made
- All contributors certify their legal right to contribute via DCO

## Questions?

If you have questions about AI usage in this project, please:
- Open a discussion on GitHub 
- Ask in contribution-related issues
- Refer to this document for our current policy

---

**Last Updated**: 2025-11-12

**Status**: Living document - will be updated as AI tools and practices evolve
