# Design Documentation

Welcome to the LunyScript design documentation. This section covers the architecture, technical decisions, and implementation details.

## 📐 Architecture & Design

<iframe width="648" height="365" src="https://www.youtube.com/embed/0Wlz7obQwOY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### A Diagram Says More Than a Thousand UMLs

Plain and simple. Keep those native adapters as minimal mappings:
![LunyScript-Architecture-Simple.png](../media/LunyScript-Architecture-Simple.png)

Luny engine is an engine-agnostic Developer SDK that opens engine ecosystems. We need to stop re-inventing gameplay wheels in every engine separately!
![LunyScript-Architecture-Complete.png](../media/LunyScript-Architecture-Complete.png)

### Design & Philosophy

- [Problem Statement](ProblemStatement.md) - Why LunyScript exists and what problems it solves
- [Vision](../VISION.md) - Long-term vision and desired outcomes
- [Author](../AUTHOR.md) - About the author and personal experience
- [Philosophy](Philosophy.md) - API design philosophy and principles

## Technical Documentation

⚠️ These documents need an update ⚠️ 

- [Engine Differences](EngineDifferences.md) - How engines differ and how LunyScript unifies them
- [Architecture](Architecture.md) - System architecture and layer structure
- [Architecture Diagram](Architecture-Diagram.md) - Visual architecture overview
- [Namespace Structure](NamespaceStructure.md) - API organization and usage patterns
- [Code Comparison](CodeComparison.md) - Side-by-side comparison: LunyScript vs traditional approaches
- [LunyScript: DSL or API?](LunyScript_Is_A_DSL.md) - It's a DSL with API-like qualities

### Design Risk Assessment
- [Cross-Cutting Concerns](CrossCuttingConcerns.md) - Architectural concerns requiring upfront design
- [Cross-Engine Concerns](CrossEngineConcerns.md) - Feature requirements and portability risks

## 🔗 Quick Links
- [FAQ](../FAQ.md) - Frequently asked questions
- [← Back to Home](../)

---

##### **AI Usage Info**

<sup>AI-assisted development. AI usage is adheres to FOSS principles: **→ [FOSS-compliant AI-Usage](../AI-USAGE.md)**</sup>
