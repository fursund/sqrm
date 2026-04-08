# Mode: Portal Scanning

Scan configured job portals for new opportunities matching the candidate's target roles.

## Pre-flight

1. Read `portals.yml` for portal configurations
2. Read `config/profile.yml` for target roles and keywords
3. Read `data/scan-history.tsv` for dedup (avoid re-scanning same URLs)

## Scanning Process

For each portal in `portals.yml`:

1. **Navigate** to the portal URL using Playwright
2. **Search** using configured keywords and filters
3. **Extract** job listings: title, company, URL, location, date posted
4. **Filter** using `title_filter.positive` and `title_filter.negative` from portals.yml
5. **Dedup** against `data/scan-history.tsv`
6. **Add new URLs** to `data/pipeline.md` for later evaluation

## Output

1. Report summary: X portals scanned, Y new offers found, Z duplicates skipped
2. New offers added to `data/pipeline.md` with source and date
3. Update `data/scan-history.tsv` with scanned URLs

## Scan History Format (TSV)

```
date\tportal\turl\ttitle\tstatus
```

## Pipeline Format

```markdown
## Pipeline -- Pending Evaluation

| # | Date Added | Source | Company | Role | URL | Status |
|---|-----------|--------|---------|------|-----|--------|
```
