# Mode: Pipeline Processing

Process pending URLs from the pipeline inbox.

## Pre-flight

1. Read `data/pipeline.md` for pending URLs
2. Read `data/applications.md` to check for duplicates

## Process

For each pending URL in the pipeline:
1. Check if already evaluated (dedup against applications.md)
2. If new: run the full auto-pipeline (evaluate + report + PDF + tracker)
3. Update pipeline status to "processed"

## Rules

- Process in order (oldest first)
- Skip duplicates silently
- If a URL is broken/expired, mark as "Discarded" with note
- Batch mode: process up to 10 at a time, then pause for user review
