'use client';

import { useMemo, useState } from 'react';
import type { Game } from '@/lib/data';
import { BRAND_LABEL, SITE } from '@/lib/site';

type PoolGame = Game & { brand: string };

type WheelDef = {
  key: 'slot' | 'live' | 'fish';
  title: string;
  emoji: string;
  subtitle: string;
  gradient: string;
  ring: string;
};

const WHEELS: WheelDef[] = [
  {
    key: 'slot',
    title: 'Slot Game Picker',
    emoji: '🎰',
    subtitle: 'All slot games across 3 providers',
    gradient: 'from-yellow-400 via-amber-500 to-orange-600',
    ring: 'ring-yellow-400',
  },
  {
    key: 'live',
    title: 'Live Casino Picker',
    emoji: '🎲',
    subtitle: 'Baccarat, Roulette, Sic Bo & more',
    gradient: 'from-red-500 via-rose-600 to-pink-700',
    ring: 'ring-red-400',
  },
  {
    key: 'fish',
    title: 'Fish Shooter Picker',
    emoji: '🐟',
    subtitle: 'Fish hunting & shooter games',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    ring: 'ring-emerald-400',
  },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function Wheel({
  def,
  pool,
}: {
  def: WheelDef;
  pool: PoolGame[];
}) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<PoolGame | null>(null);

  const brandCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const g of pool) c[g.brand] = (c[g.brand] ?? 0) + 1;
    return c;
  }, [pool]);

  const spin = () => {
    if (spinning || pool.length === 0) return;
    setSpinning(true);
    setResult(null);
    setTimeout(() => {
      setResult(pick(pool));
      setSpinning(false);
    }, 2200);
  };

  return (
    <div className="card overflow-hidden">
      <div className={`bg-gradient-to-br ${def.gradient} px-5 py-4 text-center`}>
        <div className="text-4xl drop-shadow">{def.emoji}</div>
        <h3 className="mt-1 text-base font-black uppercase tracking-wide text-white drop-shadow">
          {def.title}
        </h3>
        <p className="mt-0.5 text-[11px] text-white/80">{def.subtitle}</p>
      </div>

      <div className="p-5">
        <div className="relative mx-auto my-2 flex h-48 w-48 items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full ring-4 ${def.ring} ${spinning ? 'wheel-spin' : ''}`}
            style={{
              background: `conic-gradient(from 0deg,
                #f5c542 0% 12.5%,
                #1c1030 12.5% 25%,
                #e22a3a 25% 37.5%,
                #1c1030 37.5% 50%,
                #23c45e 50% 62.5%,
                #1c1030 62.5% 75%,
                #7b2ff7 75% 87.5%,
                #1c1030 87.5% 100%
              )`,
            }}
          />
          <div className="absolute inset-8 flex items-center justify-center rounded-full border-2 border-white/10 bg-black/80 shadow-2xl">
            <div className="text-5xl">{spinning ? '🎲' : def.emoji}</div>
          </div>
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 text-2xl drop-shadow-lg"
            aria-hidden
          >
            ▼
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-1 text-[10px] text-[color:var(--text-dim)]">
          {Object.entries(brandCounts).map(([brand, count]) => (
            <span key={brand} className="rounded-full bg-black/40 px-2 py-0.5">
              {BRAND_LABEL[brand] ?? brand}: {count}
            </span>
          ))}
          <span className="rounded-full bg-black/40 px-2 py-0.5 font-bold text-[color:var(--gold)]">
            {pool.length} total
          </span>
        </div>

        <button
          onClick={spin}
          disabled={spinning || pool.length === 0}
          className="btn-primary mt-5 w-full text-lg disabled:opacity-70"
        >
          {spinning ? 'SPINNING...' : 'SPIN NOW'}
        </button>

        {result && !spinning && (
          <div className="mt-5 rounded-lg border border-[color:var(--border)] bg-black/50 p-4 text-left">
            <div className="mb-2 text-[10px] uppercase tracking-widest text-[color:var(--gold)]">
              Your pick
            </div>
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 overflow-hidden rounded-md bg-[color:var(--bg-3)] flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.image}
                  alt={result.name_en}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-base font-bold">{result.name_en}</div>
                <div className="text-xs text-[color:var(--text-dim)]">
                  {BRAND_LABEL[result.brand]} • {result.category}
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <a
                href={`/games/${result.id}/`}
                className="btn-secondary flex-1 !py-2 text-xs"
              >
                Read More
              </a>
              <a href={SITE.ocs8SignupUrl} className="btn-primary flex-1 !py-2 text-xs">
                Play Now →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RandomPicker({ games }: { games: PoolGame[] }) {
  const totalsByCategory = useMemo(() => {
    const out = { slot: [] as PoolGame[], live: [] as PoolGame[], fish: [] as PoolGame[] };
    for (const g of games) {
      if (g.category === 'slot') out.slot.push(g);
      else if (g.category === 'live') out.live.push(g);
      else if (g.category === 'fish') out.fish.push(g);
    }
    return out;
  }, [games]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-6 text-center">
        <h2 className="section-title">
          Can&apos;t Decide? <span className="gold-text">Let the Spin Choose</span>
        </h2>
        <p className="mt-2 text-sm text-[color:var(--text-dim)]">
          Three spin wheels. {games.length} games across Mega888, 918Kiss, Pussy888.
          One click finds your next game.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <Wheel def={WHEELS[0]} pool={totalsByCategory.slot} />
        <Wheel def={WHEELS[1]} pool={totalsByCategory.live} />
        <Wheel def={WHEELS[2]} pool={totalsByCategory.fish} />
      </div>
    </section>
  );
}
