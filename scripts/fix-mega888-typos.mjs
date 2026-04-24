#!/usr/bin/env node
// Auto-fix typos in mega888-mapping.mjs by matching first 8 chars of UUID against actual filenames.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MEGA888_MAPPING } from './mega888-mapping.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const actualFiles = fs.readdirSync(path.join(ROOT, 'Mega888 Game'));
const mappingPath = path.join(__dirname, 'mega888-mapping.mjs');
let content = fs.readFileSync(mappingPath, 'utf8');

let fixes = 0;
const actualByPrefix = new Map();
for (const f of actualFiles) {
  const prefix = f.slice(0, 8);
  if (!actualByPrefix.has(prefix)) actualByPrefix.set(prefix, []);
  actualByPrefix.get(prefix).push(f);
}

for (const entry of MEGA888_MAPPING) {
  if (actualFiles.includes(entry.src)) continue;

  const clean = entry.src.replace(/\s+/g, '');
  if (actualFiles.includes(clean)) {
    content = content.replace(entry.src, clean);
    fixes++;
    continue;
  }

  const prefix = entry.src.slice(0, 8);
  const candidates = actualByPrefix.get(prefix);
  if (candidates && candidates.length === 1) {
    content = content.replace(entry.src, candidates[0]);
    fixes++;
  }
}

fs.writeFileSync(mappingPath, content);
console.log(`Applied ${fixes} fixes`);
