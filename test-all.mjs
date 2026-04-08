#!/usr/bin/env node

/**
 * test-all.mjs -- Run all validation checks
 */

import { execSync } from "child_process";

const tests = [
  { name: "Doctor", cmd: "node doctor.mjs" },
  { name: "CV Sync", cmd: "node cv-sync-check.mjs" },
  { name: "Pipeline Verify", cmd: "node verify-pipeline.mjs" },
  { name: "Liveness", cmd: "node check-liveness.mjs" },
];

let failures = 0;

for (const test of tests) {
  console.log(`\n--- ${test.name} ---`);
  try {
    const output = execSync(test.cmd, { encoding: "utf-8", stdio: "pipe" });
    console.log(output);
  } catch (err) {
    console.log(err.stdout || "");
    console.error(err.stderr || "");
    failures++;
  }
}

console.log(`\n${"=".repeat(40)}`);
console.log(`Results: ${tests.length - failures}/${tests.length} passed`);
if (failures > 0) process.exit(1);
