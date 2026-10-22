#!/usr/bin/env node
/**
 * Validates every fleekdash.json in the package against the JSON Schema
 * each manifest's own `$schema` pointer references. Resolving through the
 * pointer makes this work identically in the monorepo
 * (`../extension-contracts/schema/...`) and in the synced public repo
 * (`./contracts/schema/...`).
 *
 * Usage: pnpm validate:manifest
 */

import Ajv from "ajv";
import addFormats from "ajv-formats";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, resolve } from "node:path";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));
const SKIP_DIRS = new Set(["node_modules", "dist", "contracts", ".git"]);

/** All fleekdash.json manifests under the package root, repo-relative. */
function findManifests(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const abs = join(dir, entry);
    if (statSync(abs).isDirectory()) {
      found.push(...findManifests(abs));
    } else if (entry === "fleekdash.json") {
      found.push(abs);
    }
  }
  return found;
}

const ajv = addFormats(new Ajv({ allErrors: true, strict: false }));
const schemaCache = new Map();
let failures = 0;

for (const manifestPath of findManifests(packageRoot)) {
  const rel = relative(packageRoot, manifestPath);
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (!manifest.$schema) {
    console.error(`${rel}: no $schema pointer - cannot validate`);
    failures++;
    continue;
  }
  const schemaPath = resolve(dirname(manifestPath), manifest.$schema);
  if (!schemaCache.has(schemaPath)) {
    schemaCache.set(
      schemaPath,
      ajv.compile(JSON.parse(readFileSync(schemaPath, "utf8"))),
    );
  }
  if (schemaCache.get(schemaPath)(manifest)) {
    console.log(`${rel} is valid against ${manifest.$schema}`);
  } else {
    console.error(`${rel} validation failed:`);
    console.error(
      ajv.errorsText(schemaCache.get(schemaPath).errors, { separator: "\n" }),
    );
    failures++;
  }
}

if (failures > 0) process.exit(1);
