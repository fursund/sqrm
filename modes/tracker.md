# Mode: Application Tracker

Display and manage the application tracker.

## Commands

- **Status overview**: Show summary of all applications by status
- **Filter by status**: Show only applications with a specific status
- **Update status**: Change the status of an existing application
- **Search**: Find applications by company or role name

## Data Source

Read `data/applications.md` for the tracker table.

## Display Format

Show a summary table:
```
Total: X applications
- Evaluated: X
- Applied: X
- Interview: X
- Offer: X
- Rejected: X
- Discarded: X
- SKIP: X
```

Then show the detailed table, optionally filtered.

## Rules

- Use canonical states from `templates/states.yml`
- When updating: edit existing entries in `data/applications.md` directly
- When adding: write TSV to `batch/tracker-additions/` and run `node merge-tracker.mjs`
- Never duplicate entries (same company + role)
