#!/usr/bin/env node

/**
 * normalize-statuses.mjs -- Normalize statuses in applications.md to canonical values
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const root = process.cwd();
const trackerPath = resolve(root, "data/applications.md");
const statesPath = resolve(root, "templates/states.yml");

if (!existsSync(trackerPath)) {
  console.log("No tracker found. Nothing to normalize.");
  process.exit(0);
}

const statesRaw = readFileSync(statesPath, "utf-8");
const aliasMap = new Map();

// Build alias -> canonical label map
for (const block of statesRaw.split("- id:")) {
  const labelMatch = block.match(/label:\s*(\w+)/);
  const aliasMatch = block.match(/aliases:\s*\[([^\]]*)\]/);
  if (labelMatch) {
    const label = labelMatch[1];
    aliasMap.set(label.toLowerCase(), label);
    if (aliasMatch) {
      for (const alias of aliasMatch[1].split(",").map((a) => a.trim().replace(/['"]/g, ""))) {
        if (alias) aliasMap.set(alias.toLowerCase(), label);
      }
    }
  }
}

let tracker = readFileSync(trackerPath, "utf-8");
let changes = 0;

const lines = tracker.split("\n");
const result = lines.map((line) => {
  if (!line.startsWith("|") || line.startsWith("| #") || line.startsWith("|--")) return line;
  const cols = line.split("|");
  // Status column (index 6 in the split, which is column 5 in the table)
  for (let i = 1; i < cols.length - 1; i++) {
    const trimmed = cols[i].trim().toLowerCase().replace(/\*\*/g, "");
    if (aliasMap.has(trimmed)) {
      const canonical = aliasMap.get(trimmed);
      if (cols[i].trim() !== canonical) {
        cols[i] = ` ${canonical} `;
        changes++;
      }
    }
  }
  return cols.join("|");
});

if (changes > 0) {
  writeFileSync(trackerPath, result.join("\n"));
  console.log(`Normalized ${changes} status(es) in applications.md`);
} else {
  console.log("All statuses are already canonical.");
}
