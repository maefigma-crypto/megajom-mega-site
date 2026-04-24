#!/usr/bin/env node
// Withdrawal Proof — posts a "payout approved" card showing amount,
// bank, submit→approval timing. Unique to MEGAJOM (not on OCS8 site).

import { loadJson, sendMarkdownPhotoPost, md } from './_helpers.mjs';

const BRAND_LABEL = {
  mega888: 'Mega888',
  kiss918: '918Kiss',
  pussy888: 'Pussy888',
};

function pickEntry() {
  const entries = loadJson('data/withdrawal-proof.json');
  const d = new Date();
  const slot = Math.floor(d.getUTCHours() / 6);
  const idx = (d.getUTCDate() * 4 + slot) % entries.length;
  return entries[idx];
}

function fmtRM(n) {
  return `RM ${n.toLocaleString('en-MY')}`;
}

function fmtDuration(s) {
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return mins > 0 ? `${mins} min ${secs}s` : `${secs}s`;
}

function pickHeaderImage() {
  const games = loadJson('data/games.json');
  const pool = (games.pussy888 ?? []).filter((g) => g.category === 'slot');
  if (!pool.length) return '/images/games/mega888/great-blue.png';
  return pool[Math.floor(Math.random() * pool.length)].image;
}

function buildCaption(entry) {
  const brand = BRAND_LABEL[entry.brand] ?? entry.brand;

  return [
    `*MEGAJOM\\.NET*`,
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
    `⚡ *Processing Time:* ${md(fmtDuration(entry.duration_seconds))}`,
    ``,
    `🚀 *Cuci laju guaranteed* — MEGAJOM pays out in under 5 minutes\\.`,
    ``,
    `🚨 Daftar sekarang, deposit sama laju\\.`,
  ].join('\n');
}

async function main() {
  const entry = pickEntry();
  const imagePath = pickHeaderImage();
  const caption = buildCaption(entry);
  const result = await sendMarkdownPhotoPost({ imagePath, caption });
  console.log(`✅ Posted withdrawal-proof #${result.message_id} — ${entry.member} ${fmtRM(entry.amount)} in ${fmtDuration(entry.duration_seconds)}`);
}

main().catch((err) => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
