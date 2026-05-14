#!/usr/bin/env node
// Bukti Cuci — uses withdrawal-proof data + same simple template as withdrawal-proof.
// Separate rotation counter so it iterates the data pool independently.

import { loadJson, sendMarkdownPhotoPost, fmtRM, md, nextIndex } from './_helpers.mjs';

const BRAND_LABEL = {
  mega888: 'Mega888',
  kiss918: '918Kiss',
  pussy888: 'Pussy888',
};

function pickEntry() {
  const entries = loadJson('data/withdrawal-proof.json');
  return entries[nextIndex('bukti-cuci', entries.length)];
}

function fmtDuration(s) {
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return mins > 0 ? `${mins} min ${secs}s` : `${secs}s`;
}

function pickHeaderImage(brand) {
  const games = loadJson('data/games.json');
  const pool = (games[brand] ?? []).filter((g) => g.category === 'slot');
  if (!pool.length) return '/images/games/mega888/great-blue.png';
  return pool[Math.floor(Math.random() * pool.length)].image;
}

function buildCaption(entry) {
  const brand = BRAND_LABEL[entry.brand] ?? entry.brand;

  return [
    `🤖 *MEGAJOM*`,
    ``,
    `✅ *CUCI tanpa RAGU*`,
    ``,
    `🏦 *Bank:* ${md(entry.bank)}`,
    `💎 *Game:* ${md(brand)}`,
    ``,
    `💰 *Amount:* ${md(fmtRM(entry.amount))}`,
    ``,
    `⏱️ *Submit:* ${md(entry.submit_time)}`,
    `✅ *Approved:* ${md(entry.approval_time)}`,
    `⚡️ *Processing Time:* ${md(fmtDuration(entry.duration_seconds))}`,
    ``,
    `🚨 *Jom Menang, Jom Mega \\!*`,
  ].join('\n');
}

async function main() {
  const entry = pickEntry();
  const imagePath = pickHeaderImage(entry.brand);
  const caption = buildCaption(entry);
  const result = await sendMarkdownPhotoPost({ imagePath, caption });
  console.log(`✅ Posted bukti-cuci #${result.message_id} — ${fmtRM(entry.amount)} via ${entry.bank}`);
}

main().catch((err) => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
