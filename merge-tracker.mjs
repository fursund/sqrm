#!/usr/bin/env node

/**
 * merge-tracker.mjs -- Merge TSV additions into applications.md
 *
 * Reads all .tsv files from batch/tracker-additions/
 * Merges into data/applications.md with dedup
 * Handles column swap: TSV has status before score, applications.md has score before status
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, unlinkSync } from "fs";
import { resolve, join } from "path";

const root = process.cwd();
const additionsDir = resolve(root, "batch/tracker-additions");
const trackerPath = resolve(root, "data/applications.md");

// Ensure tracker exists
if (!existsSync(trackerPath)) {
  writeFileSync(trackerPath, `# Applications Tracker\n\n| # | Date | Company | Role | Score | Status | PDF | Report | Notes |\n|---|------|---------|------|-------|--------|-----|--------|-------|\n`);
}

// Read existing entries
const tracker = readFileSync(trackerPath, "utf-8");
const existingKeys = new Set();
for (const line of tracker.split("\n")) {
  if (!line.startsWith("|") || line.startsWith("| #") || line.startsWith("|--")) continue;
  const cols = line.split("|").map((c) => c.trim()).filter(Boolean);
  if (cols.length >= 4) {
    existingKeys.add(`${cols[2].toLowerCase()}::${cols[3].toLowerCase()}`);
  }
}

// Read TSV additions
if (!existsSync(additionsDir)) {
  console.log("No additions directory found.");
  process.exit(0);
}

const tsvFiles = readdirSync(additionsDir).filter((f) => f.endsWith(".tsv"));
if (tsvFiles.length === 0) {
  console.log("No TSV additions to merge.");
  process.exit(0);
}

let added = 0;
let skipped = 0;
const newLines = [];

for (const file of tsvFiles.sort()) {
  const content = readFileSync(join(additionsDir, file), "utf-8").trim();
  if (!content) continue;

  const cols = content.split("\t");
  if (cols.length < 9) {
    console.warn(`Skipping malformed TSV: ${file} (${cols.length} columns)`);
    continue;
  }

  // TSV format: num, date, company, role, status, score, pdf, report, notes
  // applications.md: num, date, company, role, score, status, pdf, report, notes
  const [num, date, company, role, status, score, pdf, report, notes] = cols;
  const key = `${company.toLowerCase()}::${role.toLowerCase()}`;

  if (existingKeys.has(key)) {
    skipped++;
    continue;
  }

  // Swap status and score for applications.md format
  newLines.push(`| ${num} | ${date} | ${company} | ${role} | ${score} | ${status} | ${pdf} | ${report} | ${notes} |`);
  existingKeys.add(key);
  added++;
}

if (newLines.length > 0) {
  const updatedTracker = tracker.trimEnd() + "\n" + newLines.join("\n") + "\n";
  writeFileSync(trackerPath, updatedTracker);
}

// Clean up processed TSV files
for (const file of tsvFiles) {
  unlinkSync(join(additionsDir, file));
}

console.log(`Merged: ${added} added, ${skipped} duplicates skipped, ${tsvFiles.length} TSV files processed.`);
