#!/usr/bin/env node
// Rename + copy Megajom's Pussy888 source images (UUIDs) into
// public/images/games/pussy888/<slug>.png and rebuild the pussy888
// entries in data/games.json.
//
// Keeps existing mega888 + kiss918 entries untouched (user will replace
// those with Megajom-specific images later).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MEGAJOM_PUSSY888_MAPPING } from './megajom-pussy888-mapping.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'Pussy888 Game');
const TARGET_DIR = path.join(ROOT, 'public', 'images', 'games', 'pussy888');
const GAMES_PATH = path.join(ROOT, 'data', 'games.json');

const DEFAULT_RTP = 96.5;

fs.mkdirSync(TARGET_DIR, { recursive: true });

// Wipe the pussy888 target folder first so old MEGAJOM images are removed
for (const f of fs.readdirSync(TARGET_DIR)) {
  if (/\.png$/i.test(f)) fs.unlinkSync(path.join(TARGET_DIR, f));
}

const sourceFiles = new Set(fs.readdirSync(SOURCE_DIR));
const gamesOut = [];
const copied = [];
const missing = [];
const slugsSeen = new Set();

function fuzzyFind(src) {
  if (sourceFiles.has(src)) return src;
  const prefix = src.slice(0, 8);
  const candidates = [...sourceFiles].filter((f) => f.startsWith(prefix));
  return candidates.length === 1 ? candidates[0] : null;
}

for (const entry of MEGAJOM_PUSSY888_MAPPING) {
  const actualSrc = fuzzyFind(entry.src);
  if (!actualSrc) {
    missing.push(entry.src);
    continue;
  }

  let slug = entry.slug;
  let n = 2;
  while (slugsSeen.has(slug)) slug = `${entry.slug}-${n++}`;
  slugsSeen.add(slug);

  const dstName = `${slug}.png`;
  fs.copyFileSync(path.join(SOURCE_DIR, actualSrc), path.join(TARGET_DIR, dstName));
  copied.push(actualSrc);

  gamesOut.push({
    id: slug,
    name_en: entry.title,
    original_id: actualSrc.replace(/\.png$/i, ''),
    image: `/images/games/pussy888/${dstName}`,
    category: entry.category,
    tags: entry.tags ?? [],
    rtp_base: entry.rtp ?? DEFAULT_RTP,
  });
}

const unused = [...sourceFiles].filter((f) => !copied.includes(f) && /\.png$/i.test(f));

console.log(`\n[pussy888] mapped + copied : ${copied.length}`);
console.log(`[pussy888] missing sources : ${missing.length}${missing.length ? ' -> ' + missing.slice(0, 3).join(', ') + '...' : ''}`);
console.log(`[pussy888] unused images   : ${unused.length}`);
console.log(`[pussy888] final games     : ${gamesOut.length}`);

// Update games.json
const games = JSON.parse(fs.readFileSync(GAMES_PATH, 'utf8'));
games.pussy888 = gamesOut;
fs.writeFileSync(GAMES_PATH, JSON.stringify(games, null, 2) + '\n');
console.log(`\nRewrote data/games.json pussy888 section with ${gamesOut.length} games`);
console.log(`(mega888 and kiss918 sections unchanged — replace those later if needed)`);
