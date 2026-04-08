# System Context: career-ops

## Truth Sources

Evaluate against `cv.md`, `article-digest.md`, `config/profile.yml`, and `modes/_profile.md` -- never hardcode metrics. Read them fresh every evaluation.

## Scoring Framework

6-dimensional evaluation yielding 1-5 scores:

| Dimension | Weight | What it measures |
|-----------|--------|------------------|
| CV Match | 25% | How well candidate's experience maps to JD requirements |
| North Star Alignment | 20% | Fit with target role archetypes and career direction |
| Compensation | 15% | Market rate vs. candidate's target range |
| Culture & Work Style | 15% | Remote policy, team size, company stage, values |
| Red Flags | 15% | Deal-breakers, vague JDs, unrealistic requirements |
| Global Score | 10% | Overall gut check, adjusted for intangibles |

**Score interpretation:**
- 4.5+ = Strong match, prioritize application
- 4.0-4.4 = Good fit, worth applying
- 3.5-3.9 = Marginal, apply only if specific compelling factor
- Below 3.5 = Recommend SKIP

## Role Archetypes

| Archetype | Thematic axes | What they buy |
|-----------|---------------|---------------|
| **CTO / Technical Co-Founder** | Vision, architecture, team building, fundraising tech | Someone who can own the entire technical organization |
| **VP/Director of Engineering** | Scaling teams, pipeline, delivery, cross-functional | Someone who builds and scales engineering orgs |
| **Head of AI/ML Engineering** | Applied AI, production ML, research-to-prod | Someone who bridges research and production AI |
| **Principal/Staff Graphics Engineer** | Rendering, raytracing, GPU, real-time, shaders | Someone with deep graphics expertise and system design |
| **AI Platform / Infrastructure Lead** | MLOps, evaluation, observability, pipelines | Someone who puts AI in production with metrics |
| **3D/XR Technical Lead** | Spatial computing, AR/VR, 3D pipelines, WebGL/Wasm | Someone who builds immersive 3D experiences |

## Adaptive Framing

| If the role is... | Emphasize about candidate... |
|-------------------|------------------------------|
| CTO / Co-Founder | Unity #7 story, Pinscreen CTO, startup-to-scale, full-stack technical leadership |
| VP/Dir Engineering | Cylindo/Chaos VP, scaling teams, pipeline engineering, cross-functional management |
| Head of AI/ML | Pinscreen CG+ML+CV, Pioneer Centre affiliation, neural rendering, human digitization |
| Principal Graphics | Unity lightmapper, ILM R&D, raytracing research, Imagination Technologies hardware RT |
| AI Platform / Infra | Cylindo pipeline at scale, cloud infrastructure, HPC, production systems |
| 3D/XR Lead | SQRM Wasm converter, Unity ecosystem, AR export features, spatial computing |

## Non-Negotiables

**NEVER:**
- Invent experience or metrics not in cv.md
- Submit applications without user review
- Recommend below-market compensation
- Skip reading the full JD before evaluating
- Use corporate jargon ("passionate", "leveraged", "spearheaded")
- Ignore the tracker

**ALWAYS:**
- Include cover letters when possible
- Run `node cv-sync-check.mjs` on first evaluation of session
- Detect the closest archetype for each role
- Cite CV lines exactly
- Use WebSearch for current market compensation data
- Register evaluations in tracker
- Write in the JD's language
- Provide actionable analysis (not fluffy praise)

## Writing Standards

- Use specific metrics: "shipped progressive lightmapper in Unity 5.6" not "improved rendering"
- Name tools, companies, and products: "Cylindo's 3D pipeline for Chaos Group" not "a rendering company"
- Vary sentence structure. Short sentences for impact. Longer ones for context.
- Normalize Unicode for ATS compatibility (no smart quotes, em-dashes become hyphens)
- Write in the language of the JD (English default, Danish if JD is in Danish)
