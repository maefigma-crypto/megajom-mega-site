// Shared helpers for Telegram auto-posting.
// Strategy: bot builds dynamic posts from data files and sends via sendPhoto with
// MarkdownV2 captions. Posts look clean (no "Forwarded from" label) with standard
// emoji rendering. Content changes every post — different member/game/amounts.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT = path.resolve(__dirname, '..', '..');

export const TG = {
  token: process.env.TELEGRAM_BOT_TOKEN,
  chatId: process.env.TELEGRAM_CHANNEL_ID,
};

function getChannelIds() {
  const list = process.env.TELEGRAM_CHANNEL_IDS ?? process.env.TELEGRAM_CHANNEL_ID ?? '';
  return list.split(',').map((s) => s.trim()).filter(Boolean);
}

export const CTA = {
  moneySite: process.env.MONEY_SITE_URL ?? 'https://megajom.net',
  gameTips: process.env.GAME_TIPS_URL ?? 'https://megajom-mega-site.pages.dev/tips/',
};

// MarkdownV2 escape: _ * [ ] ( ) ~ ` > # + - = | { } . !
const MD_ESCAPE = /[_*\[\]()~`>#+\-=|{}.!]/g;
export function md(text) {
  return String(text).replace(MD_ESCAPE, '\\$&');
}

function standardButtons() {
  return {
    inline_keyboard: [
      [
        { text: '🤖 MEGAJOM', url: CTA.moneySite },
      ],
    ],
  };
}

function resolveImage(imagePath) {
  const rel = imagePath.replace(/^\//, '');
  const candidates = [
    path.resolve(ROOT, 'public', rel),
    path.resolve(ROOT, rel),
  ];
  return candidates.find((p) => fs.existsSync(p));
}

export async function sendMarkdownPhotoPost({ imagePath, caption }) {
  if (!TG.token) throw new Error('TELEGRAM_BOT_TOKEN not set');
  const channelIds = getChannelIds();
  if (!channelIds.length) throw new Error('TELEGRAM_CHANNEL_ID(S) not set');

  const abs = resolveImage(imagePath);
  if (!abs) throw new Error(`Image not found: ${imagePath}`);

  const buf = fs.readFileSync(abs);
  const replyMarkup = JSON.stringify(standardButtons());

  let firstResult = null;
  const failures = [];
  for (const chatId of channelIds) {
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('caption', caption);
    form.append('parse_mode', 'MarkdownV2');
    form.append('reply_markup', replyMarkup);
    form.append('photo', new Blob([buf], { type: 'image/png' }), path.basename(abs));

    const res = await fetch(`https://api.telegram.org/bot${TG.token}/sendPhoto`, {
      method: 'POST',
      body: form,
    });
    const json = await res.json();
    if (!json.ok) {
      failures.push(`${chatId}: ${json.description}`);
      console.error(`❌ sendPhoto to ${chatId} failed: ${json.description}`);
      continue;
    }
    if (!firstResult) firstResult = json.result;
    console.log(`  → sent to ${chatId} (msg #${json.result.message_id})`);
  }

  if (!firstResult) throw new Error(`All channels failed: ${failures.join('; ')}`);
  return firstResult;
}

export function fmtRM(n) {
  return `RM ${n.toLocaleString('en-MY')}`;
}

const BANK_SHORT = {
  'Maybank': 'MBB',
  'CIMB': 'CIMB',
  'Hong Leong Bank': 'HLB',
  'Hong Leong': 'HLB',
  'Public Bank': 'PBB',
  'Affin Bank': 'AFFIN',
  'Affin': 'AFFIN',
  "Touch 'n Go": 'TnG',
  'Touch n Go': 'TnG',
  'TnG': 'TnG',
  'Boost': 'Boost',
  'RHB': 'RHB',
  'AmBank': 'AmBank',
  'Bank Islam': 'BIMB',
  'BIMB': 'BIMB',
  'BSN': 'BSN',
  'Agrobank': 'Agro',
  'Agro': 'Agro',
  'Citibank': 'Citi',
  'Citi': 'Citi',
  'HSBC': 'HSBC',
  'OCBC': 'OCBC',
  'Bank Rakyat': 'Rakyat',
  'Rakyat': 'Rakyat',
  'UOB': 'UOB',
};

export function shortBank(name) {
  return BANK_SHORT[name] ?? name;
}

export function loadJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}

// Persistent rotating counter to prevent duplicate posts when cron fires
// twice within the same time window. Each call advances by 1 (mod size).
// Counter file lives in <ROOT>/state/<name>.json — survives across runs as long
// as the runner's working tree persists (droplet ✓, ephemeral CI ✗).
export function nextIndex(name, size) {
  const stateDir = path.join(ROOT, 'state');
  fs.mkdirSync(stateDir, { recursive: true });
  const file = path.join(stateDir, `${name}.json`);
  let prev = -1;
  try {
    prev = JSON.parse(fs.readFileSync(file, 'utf8')).idx;
    if (typeof prev !== 'number' || !Number.isFinite(prev)) prev = -1;
  } catch {}
  const next = ((prev + 1) % size + size) % size;
  fs.writeFileSync(file, JSON.stringify({ idx: next, ts: new Date().toISOString() }));
  return next;
}
