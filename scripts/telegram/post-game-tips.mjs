#!/usr/bin/env node
// Game Tips — simple MEGAJOM template: header + date + 2 random RTP96+ games per brand.

import { loadJson, sendMarkdownPhotoPost, md } from './_helpers.mjs';
import { composeGameTipsImage } from './_image-compose.mjs';

const BRAND_LABEL = {
  mega888: 'MEGA888',
  pussy888: 'PUSYS888',
  kiss918: '918KSS',
};

const BRAND_ORDER = ['mega888', 'pussy888', 'kiss918'];

function pickRandomGames() {
  const games = loadJson('data/games.json');
  const out = {};
  for (const brand of BRAND_ORDER) {
    const slots = (games[brand] ?? []).filter((g) => g.category === 'slot');
    const highRtp = slots.filter((g) => g.rtp_base >= 96);
    const pool = highRtp.length >= 2 ? highRtp : slots;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    out[brand] = shuffled.slice(0, 2);
  }
  return out;
}

function todayDateMYT() {
  return new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Kuala_Lumpur',
  });
}

function buildCaption(picks) {
  const lines = [
    `🇲🇾 *Megajom* 🤖`,
    ``,
    `🎁 *TARIKH :* ${md(todayDateMYT())} 🧧`,
    ``,
    `🎰 *GAME TIPS CUCI TERKINI*`,
    ``,
  ];

  for (const brand of BRAND_ORDER) {
    lines.push(`🚀 *Tips Game ${BRAND_LABEL[brand]}*`);
    for (const g of picks[brand]) {
      lines.push(`🔥 ${md(g.name_en)}`);
    }
    lines.push('');
  }

  lines.push(`➖➖➖➖➖➖➖➖`);
  lines.push(``);
  lines.push(`💎 *Game RTP 96% keatas \\!*`);

  return lines.join('\n');
}

async function main() {
  const picks = pickRandomGames();
  const featured = BRAND_ORDER.flatMap((b) => picks[b]);
  if (featured.length === 0) throw new Error('No slot games found');

  const headerGame = featured[Math.floor(Math.random() * featured.length)];
  const headerBrand = BRAND_ORDER.find((b) => picks[b].some((g) => g.id === headerGame.id));
  const caption = buildCaption(picks);

  const imageBuffer = await composeGameTipsImage({
    brand: headerBrand,
    gameImagePath: headerGame.image,
  });

  const result = await sendMarkdownPhotoPost({
    imageBuffer,
    filename: `game-tips-${headerBrand}-${headerGame.id}.jpg`,
    caption,
  });
  console.log(`✅ Posted game-tips #${result.message_id} — featured: ${headerGame.name_en} (${headerBrand})`);
}

main().catch((err) => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
