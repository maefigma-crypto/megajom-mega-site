#!/usr/bin/env node
// One-time: randomize rtp_base in data/games.json across all 428 games
// to a realistic spread (96.0 - 97.5%, 0.1 step) instead of the 96.5 default.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const games = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'games.json'), 'utf8'));

const MIN = 96.0;
const MAX = 97.5;

// Stable pseudo-random based on slug hash so each game keeps same RTP across runs
function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

let updated = 0;
for (const brand of Object.keys(games)) {
  for (const g of games[brand]) {
    const h = hash(g.id + brand);
    const range = Math.round((MAX - MIN) * 10) + 1;
    const offset = h % range;
    g.rtp_base = Math.round((MIN + offset / 10) * 10) / 10;
    updated++;
  }
}

fs.writeFileSync(path.join(ROOT, 'data', 'games.json'), JSON.stringify(games, null, 2) + '\n');
console.log(`Updated ${updated} games with rtp_base in [${MIN}, ${MAX}]`);

const sample = [];
for (const brand of Object.keys(games)) for (const g of games[brand].slice(0, 2)) sample.push(`${g.id} = ${g.rtp_base}%`);
console.log('Sample:', sample.slice(0, 6).join(', '));
