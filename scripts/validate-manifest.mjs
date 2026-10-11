#!/usr/bin/env node
/**
 * Validates fleekdash.json against the JSON Schema the manifest's own
 * `$schema` pointer references. Resolving through the pointer makes this
 * work identically in the monorepo (`../extension-contracts/schema/...`)
 * and in the synced public repo (`./contracts/schema/...`).
 *
 * Usage: pnpm validate:manifest
 */

import Ajv from "ajv";
import addFormats from "ajv-formats";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const manifestPath = fileURLToPath(
  new URL("../fleekdash.json", import.meta.url),
);
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const schemaPath = manifest.$schema
  ? resolve(dirname(manifestPath), manifest.$schema)
  : null;
if (!schemaPath) {
  console.error("fleekdash.json has no $schema pointer — cannot validate");
  process.exit(1);
}

const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
const ajv = addFormats(new Ajv({ allErrors: true, strict: false }));

if (ajv.validate(schema, manifest)) {
  console.log("fleekdash.json is valid against", manifest.$schema);
} else {
  console.error("fleekdash.json validation failed:");
  console.error(ajv.errorsText(ajv.errors, { separator: "\n" }));
  process.exit(1);
}
