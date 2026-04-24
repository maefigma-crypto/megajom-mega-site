#!/usr/bin/env node
// Bukti Cuci — fresh dynamic post per run. Picks a different entry by hour-of-day
// so 4 daily slots show 4 different members/games/amounts.

import { loadJson, sendMarkdownPhotoPost, fmtRM, md } from './_helpers.mjs';

const BRAND_LABEL = {
  mega888: 'Mega888',
  kiss918: '918Kiss',
  pussy888: 'Pussy888',
};

function pickEntry() {
  const entries = loadJson('data/bukti-cuci.json');
  const d = new Date();
  const slot = Math.floor(d.getUTCHours() / 6);
  const idx = (d.getUTCDate() * 4 + slot) % entries.length;
  return entries[idx];
}

function buildCaption(entry, game) {
  const profit = entry.withdrawal - entry.deposit;
  const mult = (entry.withdrawal / entry.deposit).toFixed(1);
  const brand = BRAND_LABEL[entry.brand] ?? entry.brand;
  const gameName = game?.name_en ?? entry.game_id;

  return [
    `*MEGAJOM\\.COM*`,
    ``,
    `🔥 *BUKTI CUCI — VERIFIED WIN* 🏆`,
    ``,
    `👑 *Member:* \`${md(entry.member)}\``,
    `🧩 *Game:* ${md(gameName)} \\(${md(brand)}\\)`,
    ``,
    `💰 *Turnover:* ${md(fmtRM(entry.turnover))}`,
    `💰 *Deposit:* ${md(fmtRM(entry.deposit))}`,
    `💰 *Withdrawal:* ${md(fmtRM(entry.withdrawal))} ✅`,
    ``,
    `🚀 *Profit: \\+${md(fmtRM(profit))} \\(${md(mult)}x\\)*`,
    ``,
    `🚨 Daftar sekarang di MEGAJOM — deposit cepat, cuci laju\\.`,
  ].join('\n');
}

async function main() {
  const entry = pickEntry();
  const games = loadJson('data/games.json');
  const game = (games[entry.brand] ?? []).find((g) => g.id === entry.game_id);
  const imagePath = game?.image ?? '/images/games/mega888/great-blue.png';

  const caption = buildCaption(entry, game);
  const result = await sendMarkdownPhotoPost({ imagePath, caption });
  console.log(`✅ Posted bukti-cuci #${result.message_id} — ${entry.member} on ${game?.name_en ?? entry.game_id}`);
}

main().catch((err) => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
