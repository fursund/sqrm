# Mode: auto-pipeline -- Full Automatic Pipeline

When the user pastes a JD (text or URL) without an explicit sub-command, execute the FULL pipeline in sequence:

## Step 0 -- Extract JD

If the input is a **URL** (not pasted JD text), follow this strategy:

**Priority order:**

1. **Playwright (preferred):** Most job portals (Lever, Ashby, Greenhouse, Workday) are SPAs. Use `browser_navigate` + `browser_snapshot` to render and read the JD.
2. **WebFetch (fallback):** For static pages (ZipRecruiter, company career pages).
3. **WebSearch (last resort):** Search for role title + company on secondary portals that index the JD in static HTML.

**If no method works:** Ask the candidate to paste the JD manually or share a screenshot.

**If the input is pasted JD text** (not URL): use directly, no fetch needed.

## Step 1 -- Evaluation A-F
Execute exactly as the `oferta` mode (read `modes/oferta.md` for all blocks A-F).

## Step 2 -- Save Report .md
Save the complete evaluation to `reports/{###}-{company-slug}-{YYYY-MM-DD}.md` (see format in `modes/oferta.md`).

## Step 3 -- Generate PDF
Execute the full `pdf` pipeline (read `modes/pdf.md`).

## Step 4 -- Draft Application Answers (only if score >= 4.5)

If the final score is >= 4.5, generate draft answers for the application form:

1. **Extract form questions**: Use Playwright to navigate to the form and snapshot. If not extractable, use generic questions.
2. **Generate answers** following the tone below.
3. **Save in the report** as section `## G) Draft Application Answers`.

### Generic questions (use if form questions can't be extracted)

- Why are you interested in this role?
- Why do you want to work at [Company]?
- Tell us about a relevant project or achievement
- What makes you a good fit for this position?
- How did you hear about this role?

### Tone for Form Answers

**Position: "I'm choosing you."** The candidate has options and is choosing this company for concrete reasons.

**Tone rules:**
- **Confident without arrogance**: "I've spent 19 years building production graphics and AI systems -- your role is where I want to apply that next"
- **Selective without hubris**: "I've been intentional about finding a team where my CG x AI crossover creates outsized impact"
- **Specific and concrete**: Always reference something REAL from the JD and something REAL from the candidate's experience
- **Direct, no fluff**: 2-4 sentences per answer. No "I'm passionate about..." or "I would love the opportunity to..."
- **The hook is proof, not assertion**: Instead of "I'm great at X", say "I built X that does Y"

**Language**: Always in the JD's language (EN default).

## Step 5 -- Update Tracker
Register in `data/applications.md` with all columns including Report and PDF.

**If any step fails**, continue with the rest and mark the failed step as pending in the tracker.
