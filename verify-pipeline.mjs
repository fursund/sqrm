#!/usr/bin/env node

/**
 * verify-pipeline.mjs -- Health check for pipeline integrity
 *
 * Validates:
 * - applications.md format
 * - Report files referenced exist
 * - Statuses are canonical
 * - No duplicate entries
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { parse } from "path";

const root = process.cwd();
const trackerPath = resolve(root, "data/applications.md");
const statesPath = resolve(root, "templates/states.yml");

if (!existsSync(trackerPath)) {
  console.log("No tracker found at data/applications.md -- nothing to verify.");
  process.exit(0);
}

const tracker = readFileSync(trackerPath, "utf-8");
const statesRaw = readFileSync(statesPath, "utf-8");

// Extract canonical states
const canonicalStates = [];
for (const match of statesRaw.matchAll(/label:\s*(\w+)/g)) {
  canonicalStates.push(match[1].toLowerCase());
}

const lines = tracker.split("\n").filter((l) => l.startsWith("|") && !l.startsWith("| #") && !l.startsWith("|--"));
const errors = [];
const seen = new Set();

for (const line of lines) {
  const cols = line.split("|").map((c) => c.trim()).filter(Boolean);
  if (cols.length < 6) continue;

  const [num, date, company, role, score, status] = cols;
  const key = `${company.toLowerCase()}::${role.toLowerCase()}`;

  // Check duplicates
  if (seen.has(key)) {
    errors.push(`Duplicate: ${company} -- ${role}`);
  }
  seen.add(key);

  // Check status is canonical
  if (status && !canonicalStates.includes(status.toLowerCase())) {
    errors.push(`Non-canonical status "${status}" for ${company} -- ${role}`);
  }

  // Check report link exists
  const reportMatch = line.match(/\[.*?\]\((reports\/[^)]+)\)/);
  if (reportMatch) {
    const reportPath = resolve(root, reportMatch[1]);
    if (!existsSync(reportPath)) {
      errors.push(`Missing report: ${reportMatch[1]} for ${company} -- ${role}`);
    }
  }
}

console.log(`\nPipeline verification: ${lines.length} entries checked`);
if (errors.length === 0) {
  console.log("All clear -- no issues found.");
} else {
  console.log(`Found ${errors.length} issue(s):`);
  for (const e of errors) {
    console.log(`  - ${e}`);
  }
  process.exit(1);
}
