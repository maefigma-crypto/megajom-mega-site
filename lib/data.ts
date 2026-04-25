import gamesJson from '@/data/games.json';
import rtpJson from '@/data/rtp-live.json';
import tipsJson from '@/data/daily-tips.json';
import namesJson from '@/data/winner-names.json';
import buktiJson from '@/data/bukti-cuci.json';
import withdrawalJson from '@/data/withdrawal-proof.json';

export type Game = {
  id: string;
  name_en: string;
  original_id: string;
  image: string;
  category: 'slot' | 'live' | 'fish';
  tags: string[];
  rtp_base: number;
};

export type RTPEntry = {
  id: string;
  brand: string;
  name_en: string;
  image: string;
  category: string;
  tags: string[];
  rtp_base: number;
  rtp_current: number;
};

export type DailyTip = {
  day: number;
  game: string;
  brand: string;
  tip_short: string;
  tip_full: string;
};

export type BuktiEntry = {
  member: string;
  game_id: string;
  brand: string;
  turnover: number;
  deposit: number;
  withdrawal: number;
  note: string;
};

export const games = gamesJson as Record<string, Game[]>;
export const rtpLive = rtpJson as {
  updated_at: string;
  next_update: string;
  brands: Record<string, RTPEntry[]>;
};
export const dailyTips = tipsJson as DailyTip[];
export const winnerNames = namesJson as string[];
export const buktiCuci = buktiJson as BuktiEntry[];

export type WithdrawalProof = {
  member: string;
  amount: number;
  bank: string;
  submit_time: string;
  approval_time: string;
  duration_seconds: number;
  brand: string;
};

export const withdrawals = withdrawalJson as WithdrawalProof[];

// Rotates 4× per day (every 6h MYT) so a daily site rebuild at 2/8/14/20 MYT
// shows fresh cards. Uses build-time `Date.now()`; cards are static between rebuilds.
function sixHourSlotIndex(): number {
  const d = new Date();
  const day = d.getUTCDate();
  const slot = Math.floor(d.getUTCHours() / 6);
  return day * 4 + slot;
}

export function todayBukti(count = 3): BuktiEntry[] {
  const start = (sixHourSlotIndex() * count) % buktiCuci.length;
  const out: BuktiEntry[] = [];
  for (let i = 0; i < count; i++) {
    out.push(buktiCuci[(start + i) % buktiCuci.length]);
  }
  return out;
}

export function todayWithdrawals(count = 3): WithdrawalProof[] {
  const start = (sixHourSlotIndex() * count) % withdrawals.length;
  const out: WithdrawalProof[] = [];
  for (let i = 0; i < count; i++) {
    out.push(withdrawals[(start + i) % withdrawals.length]);
  }
  return out;
}

export function allGames(): Array<Game & { brand: string }> {
  const out: Array<Game & { brand: string }> = [];
  for (const brand of Object.keys(games)) {
    for (const g of games[brand]) out.push({ ...g, brand });
  }
  return out;
}

export function allRtp(): RTPEntry[] {
  const out: RTPEntry[] = [];
  for (const brand of Object.keys(rtpLive.brands)) {
    for (const r of rtpLive.brands[brand]) out.push(r);
  }
  return out;
}

export function gamesByCategory(cat: Game['category']): Array<Game & { brand: string }> {
  return allGames().filter((g) => g.category === cat);
}

export function todayTip(): DailyTip {
  const day = new Date().getDate();
  return dailyTips.find((t) => t.day === day) ?? dailyTips[0];
}
