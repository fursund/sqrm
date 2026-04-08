# Mode: Application Assistant

Guide the user through filling out a job application form in real-time.

## Pre-flight

1. Read the evaluation report for this role
2. Read `cv.md` and `config/profile.yml`
3. Read `modes/_profile.md` for tone and framing

## Process

1. **Navigate** to the application form using Playwright
2. **Snapshot** the form to identify fields
3. For each field:
   - **Draft** the answer following the tone guidelines from `auto-pipeline.md`
   - **Show** the draft to the user
   - **Wait** for approval before filling
4. **STOP before Submit** -- NEVER click Submit/Send/Apply without explicit user confirmation

## Rules

- Fill in contact info from `config/profile.yml`
- Upload the generated PDF if upload field exists
- Draft cover letter answers using the evaluation report insights
- Use the JD's language
- Always pause before final submission
