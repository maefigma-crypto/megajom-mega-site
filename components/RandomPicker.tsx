'use client';

import { useMemo, useState } from 'react';
import type { Game } from '@/lib/data';
import { BRAND_LABEL, SITE } from '@/lib/site';

type PoolGame = Game & { brand: string };

function pickThree(pool: PoolGame[]): PoolGame[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export default function RandomPicker({ games }: { games: PoolGame[] }) {
  const initialThree = useMemo(() => pickThree(games), [games]);
  const [picks, setPicks] = useState<PoolGame[]>(initialThree);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning || games.length === 0) return;
    setSpinning(true);
    let ticks = 0;
    const interval = setInterval(() => {
      setPicks(pickThree(games));
      ticks++;
      if (ticks >= 8) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 120);
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <div className="relative">
        {/* Decorative side accents */}
        <div className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 text-4xl opacity-70 md:-left-6 md:text-5xl" aria-hidden>🪙</div>
        <div className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 text-4xl opacity-70 md:-right-6 md:text-5xl" aria-hidden>🎁</div>

        <div
          className="relative rounded-[40px] border-2 border-[color:var(--gold)] bg-black/70 p-6 md:p-8"
          style={{
            boxShadow: '0 0 0 2px rgba(245,197,66,0.2), inset 0 0 40px rgba(0,0,0,0.6)',
            backgroundImage:
              'radial-gradient(circle at 50% 0%, rgba(245,197,66,0.15), transparent 60%)',
          }}
        >
          {/* Marquee dot border */}
          <div className="pointer-events-none absolute inset-3 rounded-[32px] border border-dashed border-[color:var(--gold)]/40" />

          {/* Header pill */}
          <div className="relative z-10 flex justify-center">
            <div
              className="inline-flex items-center rounded-full border-2 border-[color:var(--gold)] bg-black px-6 py-2.5"
              style={{ boxShadow: '0 0 30px rgba(245,197,66,0.4)' }}
            >
              <h2 className="text-lg md:text-xl font-black text-white tracking-tight">
                Need help choosing a game?
              </h2>
            </div>
          </div>

          {/* 3 game cards */}
          <div className="mt-6 grid grid-cols-3 gap-3 md:gap-4">
            {picks.map((g, i) => (
              <a
                key={`${g.id}-${i}-${g.brand}`}
                href={`/games/${g.id}/`}
                className={`group relative block overflow-hidden rounded-2xl border-2 border-[color:var(--gold)]/60 bg-gradient-to-b from-[color:var(--bg-3)] to-black transition ${
                  spinning ? 'animate-pulse' : 'hover:border-[color:var(--gold)] hover:-translate-y-1'
                }`}
              >
                <div className={`${g.brand === 'pussy888' ? 'aspect-[229/457]' : 'aspect-square'} overflow-hidden`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.image}
                    alt={g.name_en}
                    loading="eager"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                    }}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-2 pt-6">
                  <div className="truncate text-[10px] md:text-xs font-bold text-[color:var(--gold)] uppercase tracking-wider text-center">
                    {BRAND_LABEL[g.brand] ?? g.brand}
                  </div>
                  <div className="truncate text-[11px] md:text-sm font-bold text-white text-center">
                    {g.name_en}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Spin button */}
          <div className="relative z-10 mt-6 flex justify-center">
            <button
              onClick={spin}
              disabled={spinning || games.length === 0}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-red-500 to-red-700 px-10 py-3 text-lg font-black text-white shadow-lg transition hover:brightness-110 disabled:opacity-70 md:px-14 md:py-4 md:text-xl"
              style={{ boxShadow: '0 4px 20px rgba(239,68,68,0.5)' }}
            >
              <span className={`inline-block ${spinning ? 'animate-spin' : ''}`}>🔄</span>
              {spinning ? 'SPINNING...' : 'Spin'}
            </button>
          </div>
        </div>

        {/* Play button below the capsule */}
        <div className="mt-5 text-center">
          <a href={SITE.ocs8SignupUrl} className="btn-primary">
            Play Now → MEGAJOM
          </a>
        </div>
      </div>
    </section>
  );
}
