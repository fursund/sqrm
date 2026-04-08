#!/usr/bin/env node

/**
 * update-system.mjs -- Check for and apply system updates
 *
 * Commands:
 *   check    - Check if an update is available
 *   apply    - Apply the update
 *   rollback - Rollback to previous version
 *   dismiss  - Dismiss the current update notification
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";

const root = process.cwd();
const command = process.argv[2] || "check";
const versionPath = resolve(root, "VERSION");
const dismissPath = resolve(root, ".update-dismissed");

const localVersion = existsSync(versionPath)
  ? readFileSync(versionPath, "utf-8").trim()
  : "1.0.0";

async function checkUpdate() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/santifer/career-ops/main/VERSION"
    );
    if (!response.ok) {
      console.log(JSON.stringify({ status: "offline" }));
      return;
    }
    const remoteVersion = (await response.text()).trim();

    if (existsSync(dismissPath)) {
      const dismissed = readFileSync(dismissPath, "utf-8").trim();
      if (dismissed === remoteVersion) {
        console.log(JSON.stringify({ status: "dismissed" }));
        return;
      }
    }

    if (remoteVersion !== localVersion) {
      console.log(
        JSON.stringify({
          status: "update-available",
          local: localVersion,
          remote: remoteVersion,
        })
      );
    } else {
      console.log(JSON.stringify({ status: "up-to-date" }));
    }
  } catch {
    console.log(JSON.stringify({ status: "offline" }));
  }
}

function dismiss() {
  try {
    const response = execSync(
      "curl -sf https://raw.githubusercontent.com/santifer/career-ops/main/VERSION",
      { encoding: "utf-8" }
    ).trim();
    writeFileSync(dismissPath, response);
    console.log(JSON.stringify({ status: "dismissed", version: response }));
  } catch {
    console.log(JSON.stringify({ status: "error", message: "Could not fetch version" }));
  }
}

switch (command) {
  case "check":
    await checkUpdate();
    break;
  case "dismiss":
    dismiss();
    break;
  case "apply":
    console.log(JSON.stringify({ status: "error", message: "Manual update: git pull from santifer/career-ops" }));
    break;
  case "rollback":
    console.log(JSON.stringify({ status: "error", message: "Rollback: use git to revert system files" }));
    break;
  default:
    console.error(`Unknown command: ${command}`);
    process.exit(1);
}
