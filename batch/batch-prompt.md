# Batch Worker Prompt

You are evaluating a job offer for a candidate. Produce two outputs:

1. A markdown evaluation report
2. A TSV tracker addition line

## Context

Read the candidate's `cv.md` and `config/profile.yml` for their background and targets.

## Scoring

Use the 6-dimension framework from `modes/_shared.md`:
- CV Match (25%)
- North Star Alignment (20%)
- Compensation (15%)
- Culture & Work Style (15%)
- Red Flags (15%)
- Global Score (10%)

## Output Format

### Report (`reports/{###}-{company-slug}-{YYYY-MM-DD}.md`)

```markdown
# {Company} -- {Role}

**Date:** {YYYY-MM-DD}
**Score:** {X.X}/5
**URL:** {url}
**Verification:** unconfirmed (batch mode)
**Archetype:** {matched archetype}
**Recommendation:** {Apply / Consider / SKIP}

## A) Role Classification
...

## B) CV Cross-Reference
...

## C) Level Assessment
...

## D) Compensation Research
...

## E) Top 5 CV Modifications
...

## F) Interview Preparation
...
```

### TSV (`batch/tracker-additions/{###}-{company-slug}.tsv`)

```
{num}\t{date}\t{company}\t{role}\t{status}\t{score}/5\t{pdf}\t[{num}](reports/{num}-{slug}-{date}.md)\t{note}
```
