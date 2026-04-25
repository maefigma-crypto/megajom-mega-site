#!/usr/bin/env node
// Writes the current date+slot into data/build-date.json so the commit triggers
// a Cloudflare Pages rebuild. Bukti Cuci / Withdrawal Proof rotate by 6h slot,
// so this runs 4× per day (2am/8am/2pm/8pm MYT) and produces a different value
// each run — guaranteeing the commit isn't a no-op.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const now = new Date();
const myt = new Date(now.getTime() + 8 * 60 * 60 * 1000);
const date = myt.toISOString().slice(0, 10);
const slot = Math.floor(myt.getUTCHours() / 6); // 0..3 — 0=midnight,1=6am,2=noon,3=6pm MYT

const outPath = path.join(ROOT, 'data', 'build-date.json');
fs.writeFileSync(
  outPath,
  JSON.stringify({ build_date_myt: date, slot, built_at: now.toISOString() }, null, 2) + '\n',
);
console.log(`[rebuild] wrote build_date_myt=${date} slot=${slot}`);
