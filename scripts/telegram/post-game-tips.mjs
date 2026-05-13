#!/usr/bin/env node
// Game Tips — dynamic MEGAJOM post with no RTP shown in Telegram captions.
// Picks 6 random slot games (2 per brand). First picked game = spotlight image.

import { loadJson, sendMarkdownPhotoPost, md } from './_helpers.mjs';

const BRAND_LABEL = {
  mega888: 'Mega888',
  kiss918: '918Kiss',
  pussy888: 'Pussy888',
};

const KEYCAPS = { mega888: '1️⃣', kiss918: '2️⃣', pussy888: '3️⃣' };

const BRAND_TIPS = {
  mega888: [
    'Mula kecil dulu, tunggu bonus masuk baru naik step',
    'Kalau line belum ngam, tukar game sebelum modal panas',
    'Ambil win kecil pun cantik kalau target sudah sampai',
  ],
  kiss918: [
    'Cari game yang anda biasa main supaya keputusan lebih terkawal',
    'Jangan spam bet besar, naik perlahan bila flow mula jalan',
    'Rehat sekejap kalau sudah beberapa spin kosong',
  ],
  pussy888: [
    'Main ikut bajet, bukan ikut emosi',
    'Lock profit awal kalau sudah kena bonus cantik',
    'Pilih game yang ringan dulu sebelum masuk sesi panjang',
  ],
};

const CLOSING_TIPS = [
  'Target sampai, terus simpan profit dulu',
  'Sesi pendek pun boleh jadi cantik bila timing tepat',
  'Main tenang, jaga modal, baru senang cari peluang seterusnya',
  'Kalau flow belum masuk, pause dulu dan sambung bila kepala steady',
];

function pickRandomGames() {
  const games = loadJson('data/games.json');
  const out = {};
  for (const brand of ['mega888', 'kiss918', 'pussy888']) {
    const pool = (games[brand] ?? []).filter((g) => g.category === 'slot');
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    out[brand] = shuffled.slice(0, 2);
  }
  return out;
}

function pickOne(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function buildCaption(picks, topGame, topBrand) {
  const lines = [
    `🤖 *MEGAJOM*`,
    ``,
    `🎯 *GAME TIPS HARI INI*`,
    ``,
    `🔥 *Top pick:* ${md(BRAND_LABEL[topBrand])}`,
    `⭐️ *${md(topGame.name_en)}*`,
    `💡 ${md(pickOne(BRAND_TIPS[topBrand]))}`,
    ``,
    `🎮 *Pilihan game untuk sesi sekarang*`,
    ``,
  ];

  for (const brand of ['mega888', 'kiss918', 'pussy888']) {
    lines.push(`${KEYCAPS[brand]} *${BRAND_LABEL[brand]}*`);
    for (const g of picks[brand]) {
      lines.push(`🔥 ${md(g.name_en)}`);
    }
    lines.push(`💡 ${md(pickOne(BRAND_TIPS[brand]))}`);
    lines.push('');
  }

  lines.push(
    `✅ ${md(pickOne(CLOSING_TIPS))}`,
    ``,
    `🚀 *Jom main dengan plan, bukan main hentam*`,
  );

  return lines.join('\n');
}

async function main() {
  const picks = pickRandomGames();
  const featured = [...picks.mega888, ...picks.kiss918, ...picks.pussy888];
  if (featured.length === 0) throw new Error('No slot games found');

  const top = featured[Math.floor(Math.random() * featured.length)];
  const topBrand = ['mega888', 'kiss918', 'pussy888'].find((b) =>
    picks[b].some((g) => g.id === top.id),
  );

  const caption = buildCaption(picks, top, topBrand);
  const result = await sendMarkdownPhotoPost({
    imagePath: top.image,
    caption,
  });
  console.log(`✅ Posted game-tips #${result.message_id} — top pick: ${top.name_en} (${topBrand})`);
}

main().catch((err) => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
