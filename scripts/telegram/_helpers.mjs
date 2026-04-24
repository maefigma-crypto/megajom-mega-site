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
  if (!TG.chatId) throw new Error('TELEGRAM_CHANNEL_ID not set');

  const abs = resolveImage(imagePath);
  if (!abs) throw new Error(`Image not found: ${imagePath}`);

  const form = new FormData();
  form.append('chat_id', String(TG.chatId));
  form.append('caption', caption);
  form.append('parse_mode', 'MarkdownV2');
  form.append('reply_markup', JSON.stringify(standardButtons()));

  const buf = fs.readFileSync(abs);
  form.append('photo', new Blob([buf], { type: 'image/png' }), path.basename(abs));

  const res = await fetch(`https://api.telegram.org/bot${TG.token}/sendPhoto`, {
    method: 'POST',
    body: form,
  });
  const json = await res.json();
  if (!json.ok) throw new Error(`sendPhoto failed: ${json.description}`);
  return json.result;
}

export function fmtRM(n) {
  return `RM ${n.toLocaleString('en-MY')}`;
}

export function loadJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}
