#!/usr/bin/env node
// Regenerates data/rtp-live.json with realistic slot RTP values (96.0% - 97.9%, one decimal).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const games = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'games.json'), 'utf8'));

const MIN_RTP = 93.0;
const MAX_RTP = 97.9;

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function generate() {
  const byBrand = {};
  for (const brand of Object.keys(games)) {
    byBrand[brand] = games[brand].map((g) => {
      const current = Math.round(randomInRange(MIN_RTP, MAX_RTP) * 10) / 10;
      return {
        id: g.id,
        brand,
        name_en: g.name_en,
        image: g.image,
        category: g.category,
        tags: g.tags,
        rtp_base: g.rtp_base,
        rtp_current: current,
      };
    });
  }

  const now = new Date();
  const next = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  return {
    updated_at: now.toISOString(),
    next_update: next.toISOString(),
    brands: byBrand,
  };
}

const output = generate();
const outPath = path.join(ROOT, 'data', 'rtp-live.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n');
console.log(`[update-rtp] wrote ${outPath} at ${output.updated_at}`);
