#!/usr/bin/env node
// Megajom Mega888: auto-rename imgi_NNN_gamename.jpg into public/images/games/mega888/<slug>.jpg
// and rebuild data/games.json mega888 section.
//
// Filenames already encode the game name after the 2nd underscore, so we parse
// it directly + apply a small corrections dictionary for typos.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'Mega888 Game');
const TARGET_DIR = path.join(ROOT, 'public', 'images', 'games', 'mega888');
const GAMES_PATH = path.join(ROOT, 'data', 'games.json');

const DEFAULT_RTP = 96.5;

// Typo corrections + camelCase splits for the raw filename fragment.
const CORRECTIONS = {
  '5dragons': { slug: '5-dragons', title: '5 Dragons' },
  '5fortune': { slug: '5-fortune', title: '5 Fortune' },
  'rally': { slug: 'rally', title: 'Rally' },
  'rangingrex': { slug: 'raging-rex', title: 'Raging Rex' },
  'razorshark': { slug: 'razor-shark', title: 'Razor Shark' },
  'robinofshewood': { slug: 'robin-of-sherwood', title: 'Robin of Sherwood' },
  'royalmasquerade': { slug: 'royal-masquerade', title: 'Royal Masquerade' },
  'safariheat': { slug: 'safari-heat', title: 'Safari Heat' },
  'santa': { slug: 'santa', title: 'Santa' },
  'seaworld': { slug: 'sea-world', title: 'Sea World' },
  'shinibgstars': { slug: 'shining-stars', title: 'Shining Stars' },
  'silentrun': { slug: 'silent-run', title: 'Silent Run' },
  'siverbulletslots': { slug: 'silver-bullet', title: 'Silver Bullet' },
  'sizzlingspins': { slug: 'sizzling-spins', title: 'Sizzling Spins' },
  'sparta': { slug: 'sparta', title: 'Sparta' },
  'spartan': { slug: 'spartan', title: 'Spartan' },
  'steamtower': { slug: 'steam-tower', title: 'Steam Tower' },
  'stickybandits': { slug: 'sticky-bandits', title: 'Sticky Bandits' },
  'stripernight': { slug: 'striper-night', title: 'Striper Night' },
  'sunwukong': { slug: 'sun-wukong', title: 'Sun Wukong' },
  'superace': { slug: 'super-ace', title: 'Super Ace' },
  'sushioishi': { slug: 'sushi-oishi', title: 'Sushi Oishi' },
  'swordofkhans': { slug: 'sword-of-khans', title: 'Sword of Khans' },
  'tallyho': { slug: 'tally-ho', title: 'Tally Ho' },
  'templeofwealth': { slug: 'temple-of-wealth', title: 'Temple of Wealth' },
  'templequest': { slug: 'temple-quest', title: 'Temple Quest' },
  'thaiparadise': { slug: 'thai-paradise', title: 'Thai Paradise' },
  'threekingdoms': { slug: 'three-kingdoms', title: 'Three Kingdoms' },
  'tigerfortune': { slug: 'tiger-fortune', title: 'Tiger Fortune' },
  'tigersclory': { slug: 'tigers-glory', title: 'Tigers Glory' },
  'tripletwister': { slug: 'triple-twister', title: 'Triple Twister' },
  'vegasnightlife': { slug: 'vegas-nightlife', title: 'Vegas Nightlife' },
  'wangchai': { slug: 'wang-chai', title: 'Wang Chai' },
  'watermargin': { slug: 'water-margin', title: 'Water Margin' },
  'wildfireworks': { slug: 'wild-fireworks', title: 'Wild Fireworks' },
  'wolfhunters': { slug: 'wolf-hunters', title: 'Wolf Hunters' },
  'xmasmagic': { slug: 'xmas-magic', title: 'Xmas Magic' },
  'yinyang': { slug: 'yin-yang', title: 'Yin Yang' },
  'zhaocaijinbao': { slug: 'zhao-cai-jin-bao', title: 'Zhao Cai Jin Bao' },
  'zombiecarnival': { slug: 'zombie-carnival', title: 'Zombie Carnival' },
};

// Common word dictionary for auto-splitting unknown compound names.
const WORDS = [
  'of','the','and','for','new','old','big','best','lucky','fortune','wild','gold','golden',
  'king','kings','queen','queens','bank','cash','money','mega','super','fire','ice','dark',
  'light','red','blue','green','pink','black','white','mystery','fairy','dragon','dragons',
  'tiger','tigers','lion','lions','fox','panda','monkey','ninja','samurai','warrior','pirate',
  'thai','japan','asian','egypt','chinese','irish','aztec','night','day','sun','moon',
  'heat','dance','fever','fight','fights','play','slots','slot','spin','spins','rush','gift',
  'party','bonus','club','jungle','safari','ranch','western','farm','sea','ocean','beach',
  'paradise','garden','lotus','temple','tower','valley','palace','treasure','riches','wealth',
  'crown','hero','star','stars','magic','magical','fantasy','legend','epic','story',
  'ball','bet','race','car','boy','girl','girls','kiss','love','dance','rex','stone',
  'age','halloween','cookie','carnival','vacation','holiday','season','sparta','spartan',
  'god','gods','emperor','dynasty','zen','bliss','rose','heart','adventure',
  'bears','bear','bull','buffalo','horse','cat','dog','fish','shark','dolphin','whale',
  'aladdin','wukong','rama','krishna','genie','ghost','vampire','zombie','witch','neko',
];

function splitCompound(raw) {
  // Try to split by longest matching words from the start
  let remain = raw.toLowerCase();
  const parts = [];
  while (remain.length) {
    let matched = null;
    for (const w of WORDS.slice().sort((a, b) => b.length - a.length)) {
      if (remain.startsWith(w)) {
        matched = w;
        break;
      }
    }
    if (matched) {
      parts.push(matched);
      remain = remain.slice(matched.length);
    } else {
      // No match — take the rest as one chunk
      parts.push(remain);
      break;
    }
  }
  return parts;
}

function slugify(raw) {
  if (CORRECTIONS[raw]) return CORRECTIONS[raw];
  const parts = splitCompound(raw);
  if (parts.length > 1) {
    const slug = parts.join('-').toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const title = parts.map((p) => p[0].toUpperCase() + p.slice(1)).join(' ');
    return { slug, title };
  }
  // Fallback: keep raw, title-case
  return { slug: raw, title: raw.charAt(0).toUpperCase() + raw.slice(1) };
}

fs.mkdirSync(TARGET_DIR, { recursive: true });

// Wipe existing mega888 images
for (const f of fs.readdirSync(TARGET_DIR)) {
  const abs = path.join(TARGET_DIR, f);
  if (/\.(png|jpe?g|webp)$/i.test(f)) fs.unlinkSync(abs);
}

const sourceFiles = fs.readdirSync(SOURCE_DIR).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
const gamesOut = [];
const slugsSeen = new Set();
const flagged = [];

for (const file of sourceFiles) {
  const match = file.match(/^imgi_\d+_(.+)\.(png|jpe?g|webp)$/i);
  if (!match) continue;
  const raw = match[1].toLowerCase();
  const { slug, title } = slugify(raw);

  let finalSlug = slug;
  let n = 2;
  while (slugsSeen.has(finalSlug)) finalSlug = `${slug}-${n++}`;
  slugsSeen.add(finalSlug);

  const ext = match[2].toLowerCase() === 'jpeg' ? 'jpg' : match[2].toLowerCase();
  const dstName = `${finalSlug}.${ext}`;
  fs.copyFileSync(path.join(SOURCE_DIR, file), path.join(TARGET_DIR, dstName));

  if (!CORRECTIONS[raw]) flagged.push({ file, raw, slug: finalSlug });

  gamesOut.push({
    id: finalSlug,
    name_en: title,
    original_id: file.replace(/\.(png|jpe?g|webp)$/i, ''),
    image: `/images/games/mega888/${dstName}`,
    category: 'slot',
    tags: [],
    rtp_base: DEFAULT_RTP,
  });
}

const games = JSON.parse(fs.readFileSync(GAMES_PATH, 'utf8'));
games.mega888 = gamesOut;
fs.writeFileSync(GAMES_PATH, JSON.stringify(games, null, 2) + '\n');

console.log(`[mega888] copied: ${gamesOut.length}`);
console.log(`[mega888] flagged (auto-split, review): ${flagged.length}`);
if (flagged.length) {
  console.log('\nAuto-split entries (review titles for typos):');
  for (const f of flagged.slice(0, 15)) {
    console.log(`  ${f.raw} -> ${f.slug}`);
  }
  if (flagged.length > 15) console.log(`  ... and ${flagged.length - 15} more`);
}
console.log(`\nRewrote data/games.json mega888 section with ${gamesOut.length} games`);
