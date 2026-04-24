#!/usr/bin/env node
// Game Tips — matches user's MEGAJOM template format.
// 6 random slot games (2 per brand). First picked game = Top Pick (image + spotlight).

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

function buildCaption(picks, topGame, topBrand) {
  const lines = [
    `🤖 *MEGAJOM*`,
    ``,
    `🔥 *GAME TIPS — HOT PICKS HARI INI*`,
    ``,
    `🎯 *Top pick hari ini:* 🔥${md(BRAND_LABEL[topBrand])}`,
    `⭐️ *${md(topGame.name_en)}* — RTP ${md(topGame.rtp_base.toFixed(1))}%`,
    ``,
    `💡 *Mega888 · 918Kiss · Pussy888 Tips*`,
    ``,
    `6 permainan terkini:`,
    ``,
  ];

  for (const brand of ['mega888', 'kiss918', 'pussy888']) {
    lines.push(`${KEYCAPS[brand]} *${BRAND_LABEL[brand]}*`);
    for (const g of picks[brand]) {
      const rtp = md(g.rtp_base.toFixed(1));
      lines.push(`🔥 ${md(g.name_en)} — RTP ${rtp}%`);
    }
    lines.push('');
  }

  lines.push(
    `🏆 Pilih RTP tinggi \\+ strategi betul untuk maksimumkan cuci harian anda\\.`,
  );

  return lines.join('\n');
}

async function main() {
  const picks = pickRandomGames();
  const featured = [...picks.mega888, ...picks.kiss918, ...picks.pussy888];
  if (featured.length === 0) throw new Error('No slot games found');

  // Top pick = highest RTP among the 6
  const top = [...featured].sort((a, b) => b.rtp_base - a.rtp_base)[0];
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
