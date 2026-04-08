#!/usr/bin/env node

/**
 * check-liveness.mjs -- Quick health check for career-ops
 *
 * Returns JSON status for integration with other tools.
 */

import { existsSync } from "fs";
import { resolve } from "path";

const root = process.cwd();

const status = {
  alive: true,
  cv: existsSync(resolve(root, "cv.md")),
  profile: existsSync(resolve(root, "config/profile.yml")),
  tracker: existsSync(resolve(root, "data/applications.md")),
  portals: existsSync(resolve(root, "portals.yml")),
  nodeModules: existsSync(resolve(root, "node_modules")),
};

status.ready = status.cv && status.profile && status.nodeModules;

console.log(JSON.stringify(status, null, 2));
