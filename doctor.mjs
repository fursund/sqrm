#!/usr/bin/env node

/**
 * doctor.mjs -- Validate career-ops setup
 *
 * Checks that all required files and dependencies are in place.
 */

import { existsSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";

const root = process.cwd();
const checks = [];
let hasErrors = false;

function check(name, condition, fix) {
  if (condition) {
    checks.push({ name, status: "ok" });
  } else {
    checks.push({ name, status: "MISSING", fix });
    hasErrors = true;
  }
}

// Required files
check("cv.md", existsSync(resolve(root, "cv.md")), "Create cv.md with your resume in markdown");
check("config/profile.yml", existsSync(resolve(root, "config/profile.yml")), "Copy config/profile.example.yml to config/profile.yml");
check("modes/_profile.md", existsSync(resolve(root, "modes/_profile.md")), "Copy modes/_profile.template.md to modes/_profile.md");
check("modes/_shared.md", existsSync(resolve(root, "modes/_shared.md")), "System file -- should exist from install");
check("portals.yml", existsSync(resolve(root, "portals.yml")), "Copy templates/portals.example.yml to portals.yml");
check("templates/cv-template.html", existsSync(resolve(root, "templates/cv-template.html")), "System file -- should exist from install");
check("templates/states.yml", existsSync(resolve(root, "templates/states.yml")), "System file -- should exist from install");
check("package.json", existsSync(resolve(root, "package.json")), "Run npm init or reinstall");

// Data directories
check("data/", existsSync(resolve(root, "data")), "mkdir data");
check("reports/", existsSync(resolve(root, "reports")), "mkdir reports");
check("output/", existsSync(resolve(root, "output")), "mkdir output");

// Node modules
check("node_modules/", existsSync(resolve(root, "node_modules")), "Run: npm install");

// Playwright
let playwrightOk = false;
try {
  execSync("npx playwright --version", { stdio: "pipe" });
  playwrightOk = true;
} catch {}
check("Playwright", playwrightOk, "Run: npx playwright install chromium");

// Print results
console.log("\ncareer-ops doctor\n" + "=".repeat(40));
for (const c of checks) {
  const icon = c.status === "ok" ? "  OK" : "FAIL";
  console.log(`[${icon}] ${c.name}${c.fix ? ` -- ${c.fix}` : ""}`);
}

console.log("\n" + "=".repeat(40));
if (hasErrors) {
  console.log("Some checks failed. Fix the issues above and run again.");
  process.exit(1);
} else {
  console.log("All checks passed. career-ops is ready.");
}
