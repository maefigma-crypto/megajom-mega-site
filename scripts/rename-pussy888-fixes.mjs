#!/usr/bin/env node
// Applies name corrections to Pussy888 games based on user-provided canonical names.
// Renames image files in public/images/games/pussy888/ AND updates games.json entries.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'public', 'images', 'games', 'pussy888');
const GAMES_PATH = path.join(ROOT, 'data', 'games.json');

// Each entry: old slug, new slug, new display name
const CORRECTIONS = [
  // Fish Shooting (1xxx series) — matched 1:1 with user's canonical list
  { oldSlug: 'lucky-monkey', newSlug: 'liu-kui-pi-yu', newName: 'Liu Kui Pi Yu' },
  { oldSlug: 'phoenix-fish', newSlug: 'hai-wang-2', newName: 'Hai Wang 2' },
  { oldSlug: 'wu-kong-fish', newSlug: 'da-wang-nao-hai', newName: 'Da Wang Nao Hai' },
  { oldSlug: 'ocean-fish', newSlug: 'jin-chan-bu-yu', newName: 'Jin Chan Bu Yu' },

  // Table Games (3xxx series) — Roulette variants corrected per screenshot 4
  { oldSlug: 'roulette-2', newSlug: 'roulette-72', newName: 'Roulette 72' },
  { oldSlug: 'roulette-3d', newSlug: 'roulette-36', newName: 'Roulette 36' },
  { oldSlug: 'roulette-4', newSlug: 'roulette-24', newName: 'Roulette 24' },
  { oldSlug: 'roulette-5', newSlug: 'roulette-12-table', newName: 'Roulette 12 (Table)' },

  // Dragon Tiger I/II/III (my original slugs were dragon-tiger, dragon-tiger-2, dragon-x)
  { oldSlug: 'dragon-tiger', newSlug: 'dragon-tiger-ii', newName: 'Dragon Tiger II' },
  { oldSlug: 'dragon-tiger-2', newSlug: 'dragon-tiger-i', newName: 'Dragon Tiger I' },
  { oldSlug: 'dragon-x', newSlug: 'dragon-tiger-iii', newName: 'Dragon Tiger III' },

  // Hi Lo was actually Hulu Cock (dice game with animal symbols)
  { oldSlug: 'hi-lo', newSlug: 'hulu-cock', newName: 'Hulu Cock' },
  // Bingo Real was actually Belangkai
  { oldSlug: 'bingo-real', newSlug: 'belangkai', newName: 'Belangkai' },

  // Online Games (2xxx series) — best-effort renames based on user's canonical list order
  { oldSlug: 'roulette-50', newSlug: 'roulette-36-online', newName: 'Roulette 36 (Online)' },
  { oldSlug: 'baccarat-2', newSlug: 'baccarat-online', newName: 'Baccarat (Online)' },
  { oldSlug: 'sicbo-2', newSlug: 'sicbo-online', newName: 'Sic Bo (Online)' },
  { oldSlug: 'dragon-slot', newSlug: 'dragon-tiger-online', newName: 'Dragon Tiger (Online)' },
  { oldSlug: 'super-speed-2', newSlug: 'jue-zhan-tian-xia', newName: 'Jue Zhan Tian Xia' },
  { oldSlug: 'chinese-festival', newSlug: 'super-speed-online', newName: 'Super Speed (Online)' },
  { oldSlug: 'fortune-monkey', newSlug: 'zhan-wu-bu-sheng', newName: 'Zhan Wu Bu Sheng' },
  { oldSlug: 'animal-band-2', newSlug: 'animal-band-online', newName: 'Animal Band (Online)' },
  { oldSlug: 'single-pick-2', newSlug: 'single-pick-online', newName: 'Single Pick (Online)' },

  // Arcade (middle 3xxx series) — correct names per screenshot 3
  { oldSlug: 'lion-dance', newSlug: 'zhan-wu-bu-sheng-arcade', newName: 'Zhan Wu Bu Sheng (Arcade)' },
  { oldSlug: 'coin-master', newSlug: 'super-speed-arcade', newName: 'Super Speed (Arcade)' },
  { oldSlug: 'monkey-pole', newSlug: 'hou-zi-pa-shu', newName: 'Hou Zi Pa Shu' },
];

const games = JSON.parse(fs.readFileSync(GAMES_PATH, 'utf8'));
const pussy888 = games.pussy888;

let renamed = 0;
let missing = 0;

for (const c of CORRECTIONS) {
  const idx = pussy888.findIndex((g) => g.id === c.oldSlug);
  if (idx === -1) {
    console.log(`  [skip] ${c.oldSlug} not found in games.json`);
    missing++;
    continue;
  }
  const game = pussy888[idx];
  const oldImgPath = path.join(IMG_DIR, `${c.oldSlug}.png`);
  const newImgPath = path.join(IMG_DIR, `${c.newSlug}.png`);

  if (fs.existsSync(oldImgPath)) {
    fs.renameSync(oldImgPath, newImgPath);
  } else {
    console.log(`  [warn] image file missing: ${c.oldSlug}.png`);
  }

  game.id = c.newSlug;
  game.name_en = c.newName;
  game.image = `/images/games/pussy888/${c.newSlug}.png`;
  renamed++;
  console.log(`  ✓ ${c.oldSlug} → ${c.newSlug} (${c.newName})`);
}

fs.writeFileSync(GAMES_PATH, JSON.stringify(games, null, 2) + '\n');

console.log(`\nDone. ${renamed} renamed, ${missing} not found.`);
