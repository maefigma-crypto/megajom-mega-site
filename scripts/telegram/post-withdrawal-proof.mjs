#!/usr/bin/env node
// Withdrawal Proof — matches user's MEGAJOM template format.

import { loadJson, sendMarkdownPhotoPost, md, nextIndex } from './_helpers.mjs';

const BRAND_LABEL = {
  mega888: 'Mega888',
  kiss918: '918Kiss',
  pussy888: 'Pussy888',
};

function pickEntry() {
  const entries = loadJson('data/withdrawal-proof.json');
  return entries[nextIndex('withdrawal-proof', entries.length)];
}

function fmtRM(n) {
  return `RM ${n.toLocaleString('en-MY')}`;
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
    `🟢 *WITHDRAWAL PROOF — APPROVED* ✅`,
    ``,
    `👑 *Member:* \`${md(entry.member)}\``,
    `🏦 *Bank:* ${md(entry.bank)}`,
    `💎 *Game:* ${md(brand)}`,
    ``,
    `💰 *Amount:* ${md(fmtRM(entry.amount))}`,
    ``,
    `⏱️ *Submit:* ${md(entry.submit_time)}`,
    `✅ *Approved:* ${md(entry.approval_time)}`,
    `⚡️ *Processing Time:* ${md(fmtDuration(entry.duration_seconds))}`,
    ``,
    `🚨 Jom Menang, Jom Mega \\!`,
  ].join('\n');
}

async function main() {
  const entry = pickEntry();
  const imagePath = pickHeaderImage(entry.brand);
  const caption = buildCaption(entry);
  const result = await sendMarkdownPhotoPost({ imagePath, caption });
  console.log(`✅ Posted withdrawal-proof #${result.message_id} — ${entry.member} ${fmtRM(entry.amount)} via ${entry.bank}`);
}

main().catch((err) => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
