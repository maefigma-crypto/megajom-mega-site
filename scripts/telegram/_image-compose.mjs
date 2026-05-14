// Image composition for game-tips posts.
// Layout (800x420): black bg → brand logo (left) → game image (right) → gold frame on top.
// Gold frame: uses public/images/templates/gold-frame.png if present, else a generated SVG.

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './_helpers.mjs';

const W = 800;
const H = 420;
const PADDING = 40;
const ASSET_BOX = 260;

function generateGoldFrameSvg(w, h) {
  const inset = 18;
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5d77f"/>
        <stop offset="40%" stop-color="#caa137"/>
        <stop offset="60%" stop-color="#caa137"/>
        <stop offset="100%" stop-color="#f5d77f"/>
      </linearGradient>
    </defs>
    <rect x="${inset}" y="${inset}" width="${w - inset * 2}" height="${h - inset * 2}"
      fill="none" stroke="url(#gold)" stroke-width="6" rx="14" ry="14"/>
    <rect x="${inset + 9}" y="${inset + 9}" width="${w - inset * 2 - 18}" height="${h - inset * 2 - 18}"
      fill="none" stroke="url(#gold)" stroke-width="2" rx="8" ry="8"/>
  </svg>`;
}

export async function composeGameTipsImage({ brand, gameImagePath }) {
  const bg = await sharp({
    create: {
      width: W,
      height: H,
      channels: 3,
      background: { r: 8, g: 6, b: 12 },
    },
  })
    .png()
    .toBuffer();

  const logoPath = path.resolve(ROOT, 'public', 'images', 'brands', `${brand}.png`);
  const logo = await sharp(logoPath)
    .resize({ width: ASSET_BOX, height: ASSET_BOX, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const gameAbs = path.resolve(ROOT, 'public', gameImagePath.replace(/^\//, ''));
  const game = await sharp(gameAbs)
    .resize({ width: ASSET_BOX, height: ASSET_BOX, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const customFramePath = path.resolve(ROOT, 'public', 'images', 'templates', 'gold-frame.png');
  const frame = fs.existsSync(customFramePath)
    ? await sharp(customFramePath).resize({ width: W, height: H, fit: 'fill' }).png().toBuffer()
    : Buffer.from(generateGoldFrameSvg(W, H));

  const top = Math.round((H - ASSET_BOX) / 2);
  const composed = await sharp(bg)
    .composite([
      { input: logo, left: PADDING, top },
      { input: game, left: W - ASSET_BOX - PADDING, top },
      { input: frame, left: 0, top: 0 },
    ])
    .jpeg({ quality: 86 })
    .toBuffer();

  return composed;
}
