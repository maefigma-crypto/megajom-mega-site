#!/usr/bin/env node
// Writes the current date into data/build-date.json so the commit triggers a
// Cloudflare Pages rebuild. During build, BuktiCuci picks its 3 entries based
// on the current date — so daily rebuild = daily Bukti Cuci refresh.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const now = new Date();
const myt = new Date(now.getTime() + 8 * 60 * 60 * 1000); // UTC+8
const date = myt.toISOString().slice(0, 10); // YYYY-MM-DD

const outPath = path.join(ROOT, 'data', 'build-date.json');
fs.writeFileSync(outPath, JSON.stringify({ build_date_myt: date, built_at: now.toISOString() }, null, 2) + '\n');
console.log(`[daily-rebuild] wrote build_date_myt=${date}`);
