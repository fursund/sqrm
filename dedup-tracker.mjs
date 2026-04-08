#!/usr/bin/env node

/**
 * dedup-tracker.mjs -- Remove duplicate entries from applications.md
 * Keeps the entry with the most recent date for each company+role pair.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const root = process.cwd();
const trackerPath = resolve(root, "data/applications.md");

if (!existsSync(trackerPath)) {
  console.log("No tracker found. Nothing to dedup.");
  process.exit(0);
}

const content = readFileSync(trackerPath, "utf-8");
const lines = content.split("\n");
const header = [];
const dataLines = [];

for (const line of lines) {
  if (line.startsWith("| #") || line.startsWith("|--") || line.startsWith("# ")) {
    header.push(line);
  } else if (line.startsWith("|") && line.trim().length > 1) {
    dataLines.push(line);
  } else {
    header.push(line);
  }
}

// Dedup by company+role, keeping most recent
const seen = new Map();
let removed = 0;

for (const line of dataLines) {
  const cols = line.split("|").map((c) => c.trim()).filter(Boolean);
  if (cols.length < 4) continue;

  const [num, date, company, role] = cols;
  const key = `${company.toLowerCase()}::${role.toLowerCase()}`;

  if (seen.has(key)) {
    const existing = seen.get(key);
    const existingCols = existing.split("|").map((c) => c.trim()).filter(Boolean);
    // Keep the one with the more recent date
    if (date > existingCols[1]) {
      seen.set(key, line);
    }
    removed++;
  } else {
    seen.set(key, line);
  }
}

if (removed > 0) {
  const result = [...header.filter((l) => l.trim()), "", ...seen.values(), ""].join("\n");
  writeFileSync(trackerPath, result);
  console.log(`Removed ${removed} duplicate(s) from applications.md`);
} else {
  console.log("No duplicates found.");
}
