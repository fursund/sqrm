# Data Contract -- career-ops

Two layers of files. This contract ensures system updates never overwrite your data.

## User Layer (YOUR data -- NEVER auto-updated)

These files contain your personal data and customizations. The system will NEVER modify these during updates:

| File | Purpose |
|------|---------|
| `cv.md` | Your canonical resume |
| `config/profile.yml` | Your personal details, targets, preferences |
| `modes/_profile.md` | Your archetype overrides, narrative, comp targets |
| `article-digest.md` | Your proof points and case studies |
| `portals.yml` | Your portal configuration and company list |
| `data/*` | Your tracker, pipeline, scan history |
| `reports/*` | Your evaluation reports |
| `output/*` | Your generated PDFs and HTML |
| `interview-prep/*` | Your interview stories and company intel |
| `jds/*` | Your saved job descriptions |

## System Layer (auto-updatable)

These files can be updated via `node update-system.mjs apply`:

| File | Purpose |
|------|---------|
| `CLAUDE.md` | System instructions |
| `modes/_shared.md` | System scoring framework and defaults |
| `modes/oferta.md` | Evaluation mode |
| `modes/auto-pipeline.md` | Pipeline mode |
| `modes/pdf.md` | PDF generation mode |
| `modes/scan.md` | Scanner mode |
| All other `modes/*.md` | System modes |
| `*.mjs` | System scripts |
| `templates/*` | System templates |
| `batch/batch-prompt.md` | Batch worker prompt |
| `dashboard/*` | Dashboard app |

## The Rule

**When customizing: always write to User Layer files.** This guarantees your changes survive updates.
