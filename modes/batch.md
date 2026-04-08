# Mode: Batch Processing

Process multiple offers in parallel using Claude workers.

## Pre-flight

1. Read `data/pipeline.md` for pending URLs
2. Read `batch/batch-prompt.md` for the worker prompt template

## Process

1. Select offers to process (from pipeline or user-provided list)
2. For each offer, create a batch worker with the prompt from `batch/batch-prompt.md`
3. Workers produce:
   - Evaluation report in `reports/`
   - Tracker addition TSV in `batch/tracker-additions/`
4. After all workers complete: run `node merge-tracker.mjs`

## Batch Prompt Template

The worker prompt in `batch/batch-prompt.md` includes:
- Candidate CV and profile context
- Scoring framework from `_shared.md`
- Instructions to produce report + TSV output

## Rules

- Max 10 parallel workers
- Each worker is independent (no shared state)
- After batch: always run merge-tracker
- Verify: `node verify-pipeline.mjs`
