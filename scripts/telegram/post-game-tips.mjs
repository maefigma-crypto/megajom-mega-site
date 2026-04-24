#!/usr/bin/env node
// Game Tips — 6 random slot games (2 per brand) fresh every post.
// One of the 6 is picked as the image "spotlight" and named at the top of the
// caption so the photo always matches a listed game.

import { loadJson, sendMarkdownPhotoPost, md } from './_helpers.mjs';

const BRAND_LABEL = {
  mega888: 'Mega888',
  kiss918: '918Kiss',
  pussy888: 'Pussy888',
};

const KEYCAPS = { mega888: '1️⃣', kiss918: '2️⃣', pussy888: '3️⃣' };

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

function buildCaption(picks, spotlight) {
  const spotlightBrand = BRAND_LABEL[spotlight.brand] ?? spotlight.brand;
  const spotlightRtp = md(spotlight.rtp_base.toFixed(1));

  const lines = [
    `*MEGAJOM\\.COM*`,
    ``,
    `🔥 *GAME TIPS — HOT PICKS HARI INI*`,
    ``,
    `🎯 *Top pick hari ini:* ${md(spotlight.name_en)} \\(${md(spotlightBrand)}\\) — RTP ${spotlightRtp}%`,
    ``,
    `🧩 *Mega888 · 918Kiss · Pussy888 Tips*`,
    ``,
    `6 permainan terkini:`,
    ``,
  ];

  for (const brand of ['mega888', 'kiss918', 'pussy888']) {
    lines.push(`${KEYCAPS[brand]} *${BRAND_LABEL[brand]}*`);
    for (const g of picks[brand]) {
      const rtp = md(g.rtp_base.toFixed(1));
      const star = g.id === spotlight.id && g.brand === spotlight.brand ? '⭐ ' : '🔥 ';
      lines.push(`${star}${md(g.name_en)} — RTP ${rtp}%`);
    }
    lines.push('');
  }

  lines.push(
    `🏆 Pilih RTP tinggi \\+ strategi betul untuk maksimumkan cuci harian anda\\.`,
    ``,
    `🚨 Klik butang di bawah untuk strategi penuh setiap permainan\\.`,
  );
  return lines.join('\n');
}

async function main() {
  const picks = pickRandomGames();
  // Inject brand label into each picked game so we can identify spotlight cleanly
  for (const brand of Object.keys(picks)) {
    for (const g of picks[brand]) g.brand = brand;
  }
  const featured = [...picks.mega888, ...picks.kiss918, ...picks.pussy888];
  if (featured.length === 0) throw new Error('No slot games found');

  // Pick one of the 6 at random as the spotlight (image + top-of-caption mention)
  const spotlight = featured[Math.floor(Math.random() * featured.length)];

  const caption = buildCaption(picks, spotlight);
  const result = await sendMarkdownPhotoPost({
    imagePath: spotlight.image,
    caption,
  });
  console.log(`✅ Posted game-tips #${result.message_id} spotlight=${spotlight.name_en} (${spotlight.brand})`);
}

main().catch((err) => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
