#!/usr/bin/env node
// Imports user-downloaded game thumbnails into public/images/games/<brand>/<slug>.png
// and regenerates data/games.json with the full game catalog.
//
// Sources:
//   - "Mega888 Game/"   (171 UUID-named PNGs)
//   - "918Kiss Game/"   (83 UUID-named PNGs)
//   - "Pussy888 Game/"  (195 imgi_XXX_YYYY.png files)
//
// Mappings live in scripts/{mega888,kiss918,pussy888}-mapping.mjs.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { MEGA888_MAPPING } from './mega888-mapping.mjs';
import { KISS918_MAPPING } from './kiss918-mapping.mjs';
import { PUSSY888_MAPPING } from './pussy888-mapping.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const BRANDS = [
  { key: 'mega888', sourceDir: 'Mega888 Game', targetDir: 'public/images/games/mega888', mapping: MEGA888_MAPPING },
  { key: 'kiss918', sourceDir: '918Kiss Game', targetDir: 'public/images/games/918kiss', mapping: KISS918_MAPPING },
  { key: 'pussy888', sourceDir: 'Pussy888 Game', targetDir: 'public/images/games/pussy888', mapping: PUSSY888_MAPPING },
];

const DEFAULT_RTP = 96.5;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function processeBrand(brand) {
  const sourcePath = path.join(ROOT, brand.sourceDir);
  const targetPath = path.join(ROOT, brand.targetDir);
  ensureDir(targetPath);

  const sourceFiles = new Set(fs.readdirSync(sourcePath));
  const gamesOut = [];
  const copied = [];
  const missing = [];
  const slugsSeen = new Set();

  for (const entry of brand.mapping) {
    if (!sourceFiles.has(entry.src)) {
      missing.push(entry.src);
      continue;
    }
    let slug = entry.slug;
    let n = 2;
    while (slugsSeen.has(slug)) slug = `${entry.slug}-${n++}`;
    slugsSeen.add(slug);

    const dstName = `${slug}.png`;
    fs.copyFileSync(path.join(sourcePath, entry.src), path.join(targetPath, dstName));
    copied.push(entry.src);

    const imgBrand = brand.key === 'kiss918' ? '918kiss' : brand.key;
    gamesOut.push({
      id: slug,
      name_en: entry.title,
      original_id: entry.src.replace(/\.png$/i, ''),
      image: `/images/games/${imgBrand}/${dstName}`,
      category: entry.category,
      tags: entry.tags ?? [],
      rtp_base: entry.rtp ?? DEFAULT_RTP,
    });
  }

  const unused = [...sourceFiles].filter((f) => !copied.includes(f) && /\.png$/i.test(f));

  return { games: gamesOut, copied: copied.length, missing, unused };
}

console.log('Importing game thumbnails...\n');

const newGames = {};
const reports = {};
for (const b of BRANDS) {
  const r = processeBrand(b);
  newGames[b.key] = r.games;
  reports[b.key] = r;
  console.log(`[${b.key}]`);
  console.log(`  mapped + copied : ${r.copied}`);
  console.log(`  missing sources : ${r.missing.length}${r.missing.length ? ' -> ' + r.missing.slice(0, 3).join(', ') + (r.missing.length > 3 ? '...' : '') : ''}`);
  console.log(`  unused images   : ${r.unused.length} (in source folder but no mapping)`);
  console.log(`  final games     : ${r.games.length}\n`);
}

// Backup old games.json
const gamesPath = path.join(ROOT, 'data', 'games.json');
const backupPath = path.join(ROOT, 'data', 'games.json.bak');
if (fs.existsSync(gamesPath)) {
  fs.copyFileSync(gamesPath, backupPath);
  console.log(`Backed up old games.json -> data/games.json.bak`);
}

fs.writeFileSync(gamesPath, JSON.stringify(newGames, null, 2) + '\n');
console.log(`Wrote ${gamesPath}`);

const unusedReport = {};
for (const key of Object.keys(reports)) unusedReport[key] = reports[key].unused;
const reportPath = path.join(ROOT, 'data', 'unused-images.json');
fs.writeFileSync(reportPath, JSON.stringify(unusedReport, null, 2) + '\n');
console.log(`Wrote ${reportPath} (review these for additional mappings)`);
