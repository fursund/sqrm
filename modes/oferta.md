# Mode: Offer Evaluation (A-F)

When triggered, execute a complete evaluation of a job offer against the candidate's profile.

## Pre-flight

1. Read `cv.md` for candidate experience
2. Read `config/profile.yml` for targets and preferences
3. Read `modes/_profile.md` for adaptive framing
4. Read `article-digest.md` if it exists (proof points)

## Block A -- Role Classification

Identify the role archetype from `_shared.md`:
- Map to: CTO/Co-Founder, VP/Dir Eng, Head AI/ML, Principal Graphics, AI Platform, 3D/XR Lead
- Extract: domain, function, seniority, work arrangement (remote/hybrid/onsite)
- Note the company stage (startup, scale-up, enterprise, public)

## Block B -- CV Cross-Reference

For EACH requirement in the JD:
1. Find the matching experience in `cv.md`
2. Prioritize proof points by archetype (from `_profile.md`)
3. For gaps: propose mitigation strategy (adjacent experience, transferable skills)
4. Score CV match dimension (1-5)

## Block C -- Level Assessment

1. Assess seniority alignment: is the candidate over/under-qualified?
2. Develop positioning strategy for the target level
3. If potentially downleveled: contingency strategy
4. Score North Star alignment dimension (1-5)

## Block D -- Compensation Research

1. Use WebSearch for current market data (Glassdoor, Levels.fyi, LinkedIn Salary)
2. Research company-specific comp data if available
3. Compare with candidate's target range from `profile.yml`
4. Score compensation dimension (1-5)

## Block E -- Top 5 CV Modifications

Propose the top 5 modifications to CV and LinkedIn that would maximize fit:
1. Summary rewrite for this specific role
2. Experience bullet reordering/emphasis
3. Skills section adjustments
4. Project highlights to feature
5. Keywords to add for ATS

## Block F -- Interview Preparation

Build 6-10 STAR+R interview stories (STAR + Reflection to signal seniority):
- Aligned to JD requirements
- Using proof points from `cv.md` and `article-digest.md`
- Include case study recommendations
- Red-flag question strategies (gaps, short tenures, etc.)

## Post-Evaluation

1. **Save report** to `reports/{###}-{company-slug}-{YYYY-MM-DD}.md`
   - Format: sequential 3-digit zero-padded number
   - Include all blocks A-F
   - Include `**URL:**` in header
   - Include final score and recommendation
2. **Register in tracker** via TSV in `batch/tracker-additions/`
3. **If score >= 4.5:** Offer to generate PDF and draft application answers
4. **If score < 3.5:** Recommend SKIP with clear reasoning

## Report Header Format

```markdown
# {Company} -- {Role Title}

**Date:** {YYYY-MM-DD}
**Score:** {X.X}/5
**URL:** {job_url}
**PDF:** {yes/no}
**Archetype:** {matched archetype}
**Recommendation:** {Apply / Consider / SKIP}

---
```
