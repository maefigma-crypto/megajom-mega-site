'use client';

import { useEffect, useState } from 'react';

type Winner = {
  user: string;
  game: string;
  brand: string;
  amount: number;
  minutesAgo: number;
};

function weightedAmount(): number {
  const r = Math.random();
  if (r < 0.6) return Math.floor(200 + Math.random() * 300);
  if (r < 0.85) return Math.floor(500 + Math.random() * 1000);
  if (r < 0.95) return Math.floor(1500 + Math.random() * 1500);
  return Math.floor(3000 + Math.random() * 5000);
}

function fmt(n: number) {
  return n.toLocaleString('en-MY');
}

function makeBatch(
  names: string[],
  games: { name_en: string; brand: string }[],
  size: number,
): Winner[] {
  const out: Winner[] = [];
  for (let i = 0; i < size; i++) {
    const g = games[Math.floor(Math.random() * games.length)];
    out.push({
      user: names[Math.floor(Math.random() * names.length)],
      game: g.name_en,
      brand: g.brand,
      amount: weightedAmount(),
      minutesAgo: Math.floor(Math.random() * 15) + 1,
    });
  }
  return out;
}

export default function WinnerFeed({
  names,
  games,
}: {
  names: string[];
  games: { name_en: string; brand: string }[];
}) {
  const [batch, setBatch] = useState<Winner[]>([]);

  useEffect(() => {
    setBatch(makeBatch(names, games, 25));
    const id = setInterval(() => {
      setBatch((prev) => {
        const next: Winner = makeBatch(names, games, 1)[0];
        return [next, ...prev].slice(0, 25);
      });
    }, 25000 + Math.random() * 10000);
    return () => clearInterval(id);
  }, [names, games]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="section-title">
          <span className="gold-text">Recent</span> Big Wins
        </h2>
        <span className="inline-flex items-center gap-2 text-xs text-[color:var(--text-dim)]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" /> LIVE
        </span>
      </div>

      <div className="card relative h-[420px] overflow-hidden">
        <div className="winner-scroll">
          <div>
            {[...batch, ...batch].map((w, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-[color:var(--border)] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-black">
                    {w.user.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{w.user}</div>
                    <div className="text-xs text-[color:var(--text-dim)]">
                      on {w.game} • {w.minutesAgo}m ago
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg font-bold text-green-300">
                    RM {fmt(w.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[color:var(--bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[color:var(--bg)] to-transparent" />
      </div>
    </section>
  );
}
