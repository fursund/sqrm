# career-ops -- AI Job Search Command Center

## Activation

This skill activates when the user runs `/career-ops` with optional arguments.

## Routing

Parse user input and route to the appropriate mode:

| Input | Mode | Files to load |
|-------|------|---------------|
| (empty) | Discovery | Show command menu |
| URL or JD text | auto-pipeline | `modes/_shared.md` + `modes/_profile.md` + `modes/auto-pipeline.md` |
| `oferta` or `evaluate` | Evaluation | `modes/_shared.md` + `modes/_profile.md` + `modes/oferta.md` |
| `ofertas` or `compare` | Comparison | `modes/_shared.md` + `modes/_profile.md` + `modes/ofertas.md` |
| `contacto` or `contact` | Outreach | `modes/_shared.md` + `modes/_profile.md` + `modes/contacto.md` |
| `deep` or `research` | Deep Research | `modes/deep.md` |
| `interview-prep` or `interview` | Interview Prep | `modes/_shared.md` + `modes/_profile.md` + `modes/interview-prep.md` |
| `pdf` or `cv` | PDF Generation | `modes/_shared.md` + `modes/_profile.md` + `modes/pdf.md` |
| `training` | Training Eval | `modes/_shared.md` + `modes/_profile.md` + `modes/training.md` |
| `project` | Project Eval | `modes/_shared.md` + `modes/_profile.md` + `modes/project.md` |
| `tracker` or `status` | Tracker | `modes/tracker.md` |
| `apply` | Application | `modes/_shared.md` + `modes/_profile.md` + `modes/apply.md` |
| `scan` | Portal Scan | `modes/scan.md` |
| `pipeline` | Pipeline | `modes/pipeline.md` |
| `batch` | Batch Process | `modes/batch.md` |

## Auto-Detection

If the input looks like a job description (contains keywords like "responsibilities", "requirements", "qualifications", company names, or role titles), route to auto-pipeline mode automatically.

## Context Loading

For shared modes, always load in this order:
1. `modes/_shared.md` (system context)
2. `modes/_profile.md` (user overrides -- always wins)
3. The specific mode file

Also read:
- `cv.md` (candidate resume)
- `config/profile.yml` (personal details)
- `article-digest.md` (if exists, proof points)

## Discovery Menu

When called with no arguments, show:

```
career-ops -- Your AI job search pipeline

Commands:
  /career-ops {URL or JD}  Full pipeline (evaluate + PDF + track)
  /career-ops scan          Search configured portals
  /career-ops batch         Process multiple offers in parallel
  /career-ops pdf           Generate tailored CV
  /career-ops tracker       View application status
  /career-ops compare       Rank multiple offers side by side
  /career-ops deep {company}  Deep company research
  /career-ops interview {company}  Interview preparation
  /career-ops contact {company}  LinkedIn outreach
  /career-ops training {course}  Evaluate course/cert
  /career-ops project {idea}  Evaluate portfolio project

Tip: Just paste a job URL and I'll run the full pipeline.
```
