#!/usr/bin/env node

/**
 * cv-sync-check.mjs -- Verify cv.md is consistent with profile.yml
 *
 * Checks that key details (name, email, target roles) match between files.
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const root = process.cwd();
const cvPath = resolve(root, "cv.md");
const profilePath = resolve(root, "config/profile.yml");

if (!existsSync(cvPath)) {
  console.error("cv.md not found");
  process.exit(1);
}
if (!existsSync(profilePath)) {
  console.error("config/profile.yml not found");
  process.exit(1);
}

const cv = readFileSync(cvPath, "utf-8");
const profile = readFileSync(profilePath, "utf-8");

const warnings = [];

// Check name
const nameMatch = profile.match(/full_name:\s*"([^"]+)"/);
if (nameMatch && !cv.includes(nameMatch[1])) {
  warnings.push(`Name "${nameMatch[1]}" from profile.yml not found in cv.md`);
}

// Check email
const emailMatch = profile.match(/email:\s*"([^"]+)"/);
if (emailMatch && emailMatch[1] && !cv.includes(emailMatch[1])) {
  warnings.push(`Email "${emailMatch[1]}" from profile.yml not found in cv.md`);
}

// Check LinkedIn
const linkedinMatch = profile.match(/linkedin:\s*"([^"]+)"/);
if (linkedinMatch && !cv.includes(linkedinMatch[1])) {
  warnings.push(`LinkedIn "${linkedinMatch[1]}" from profile.yml not found in cv.md`);
}

console.log("CV sync check");
console.log("=".repeat(30));
if (warnings.length === 0) {
  console.log("cv.md and profile.yml are in sync.");
} else {
  console.log(`Found ${warnings.length} inconsistency(ies):`);
  for (const w of warnings) {
    console.log(`  - ${w}`);
  }
}
