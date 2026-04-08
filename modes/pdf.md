# Mode: PDF Generation

Generate an ATS-optimized, tailored PDF resume for a specific job description.

## Pre-flight

1. Read `cv.md` for canonical CV content
2. Read `config/profile.yml` for contact details
3. Read `modes/_profile.md` for adaptive framing
4. Read the evaluation report (if exists) for role-specific insights
5. Read `templates/cv-template.html` for the HTML template

## Step 1 -- Tailor Content

Based on the JD and evaluation:
1. Rewrite the summary section to align with the specific role
2. Reorder and emphasize experience bullets that match JD requirements
3. Highlight relevant skills and competencies
4. Select the most relevant projects to feature
5. Ensure all metrics are pulled from `cv.md` (never invented)

## Step 2 -- Generate HTML

1. Read `templates/cv-template.html`
2. Replace template variables with tailored content:
   - `{{NAME}}` -> candidate name
   - `{{EMAIL}}` -> email
   - `{{PHONE}}` -> phone (if available)
   - `{{LINKEDIN}}` -> LinkedIn URL
   - `{{GITHUB}}` -> GitHub URL
   - `{{SECTION_SUMMARY}}` -> tailored summary
   - Other section placeholders as defined in template
3. Save HTML to `output/{company-slug}-{role-slug}.html`

## Step 3 -- Generate PDF

```bash
node generate-pdf.mjs output/{company-slug}-{role-slug}.html output/{company-slug}-{role-slug}.pdf
```

## Step 4 -- Verify

1. Check that PDF was generated successfully
2. Report page count and file size
3. Update tracker with PDF status

## ATS Guidelines

- No tables for layout (use divs)
- No images or graphics in content area
- Standard section headers (Experience, Education, Skills)
- Clean Unicode (no smart quotes, normalize dashes)
- Standard fonts
- Single-column layout preferred
