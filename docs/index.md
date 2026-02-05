# Design Documentation

Welcome to the LunyScript design documentation. This section covers the architecture, technical decisions, and implementation details.

## Design & Vision

- [Problem Statement](ProblemStatement.md) - Why LunyScript exists and what problems it solves
- [Vision](../VISION.md) - Long-term vision and desired outcomes
- [Author](../AUTHOR.md) - About the author and personal experience
- [FAQ](../FAQ.md) - Frequently asked questions

### API Design

- [Script Runner Singleton Pattern](2025-12/ScriptRunnerSingletonPattern.md) - Lazy-init singleton and lifecycle dispatcher architecture
- [Coroutine & Timer Design](2026-02/LunyScript_CoroutineAndTimer_Design.md) - Timer, Coroutine, and throttling API design
- [On vs When API Refactor](2026-02/LunyScript_On_vs_When_API_Refactor.md) - Semantic distinction between lifecycle and external events

## 📐 Architecture

<iframe width="648" height="365" src="https://www.youtube.com/embed/0Wlz7obQwOY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### A Diagram Says More Than a Thousand UMLs

LunyEngine is an engine-agnostic Developer SDK that opens engine ecosystems. We need to stop re-inventing gameplay wheels in every engine separately!
![LunyScript-Architecture-Complete.png](../media/LunyScript-Architecture-Complete.png)
<sup>The native service adapters are (ultra-)thin API mappings.</sup>

## Technical Documentation

- [Philosophy](Philosophy.md) - API design philosophy and principles
- [Engine Differences](EngineDifferences.md) - How engines differ and how LunyScript unifies them
- [Architecture](Architecture.md) - System architecture and layer structure
- [Code Comparison](CodeComparison.md) - Side-by-side comparison: LunyScript vs traditional approaches
- [Repository Structure](Repositories.md) - How LunyEngine/LunyScript are divided into repositories. 
- [Extending LunyScript API](ExtendingLunyScriptApi.md) - How LunyScript API supports shareable extensions.

### Design Risk Assessment
- [Cross-Cutting Concerns](CrossCuttingConcerns.md) - Architectural concerns requiring upfront design
- [Cross-Engine Concerns](CrossEngineConcerns.md) - Feature requirements and portability risks

## 🔗 Quick Links
- [← Back to Home](../)

---

##### **AI Usage Info**

<sup>AI-assisted development. AI usage is adheres to FOSS principles: **→ [FOSS-compliant AI-Usage](../AI-USAGE.md)**</sup>
