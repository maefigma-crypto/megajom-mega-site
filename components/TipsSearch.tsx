'use client';

import { useMemo, useState } from 'react';
import type { DailyTip, Game } from '@/lib/data';
import { BRAND_LABEL, SITE } from '@/lib/site';

type Brand = 'all' | 'mega888' | 'kiss918' | 'pussy888';

type Enriched = DailyTip & {
  game_name: string;
  game_image: string;
  game_category: string;
  tags: string[];
};

export default function TipsSearch({
  tips,
  gamesByKey,
  todayNumber,
}: {
  tips: DailyTip[];
  gamesByKey: Record<string, Game & { brand: string }>;
  todayNumber: number;
}) {
  const enriched: Enriched[] = useMemo(
    () =>
      tips.map((t) => {
        const g = gamesByKey[t.game];
        return {
          ...t,
          game_name: g?.name_en ?? t.game,
          game_image: g?.image ?? '',
          game_category: g?.category ?? 'slot',
          tags: g?.tags ?? [],
        };
      }),
    [tips, gamesByKey],
  );

  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState<Brand>('all');
  const [expanded, setExpanded] = useState<number | null>(todayNumber);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enriched.filter((t) => {
      if (brand !== 'all' && t.brand !== brand) return false;
      if (!q) return true;
      return (
        t.game_name.toLowerCase().includes(q) ||
        t.game.toLowerCase().includes(q) ||
        t.tip_short.toLowerCase().includes(q) ||
        t.tip_full.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [enriched, query, brand]);

  return (
    <div>
      <div className="card mb-6 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tips — game name, strategy, free-spin, angpao..."
            className="flex-1 rounded-md border border-[color:var(--border)] bg-black/40 px-4 py-3 text-sm placeholder:text-[color:var(--text-dim)] focus:border-[color:var(--gold)] focus:outline-none"
          />
          <div className="flex flex-wrap gap-2">
            {(['all', 'mega888', 'kiss918', 'pussy888'] as Brand[]).map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                  brand === b
                    ? 'border-[color:var(--gold)] bg-[color:var(--gold)] text-black'
                    : 'border-[color:var(--border)] bg-black/30 text-[color:var(--text-dim)] hover:text-white'
                }`}
              >
                {b === 'all' ? 'All' : BRAND_LABEL[b]}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 text-xs text-[color:var(--text-dim)]">
          Showing {filtered.length} of {enriched.length} tips.
          {todayNumber && (
            <>
              {' '}Today&apos;s featured tip is Day {todayNumber}.
            </>
          )}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="card p-10 text-center text-[color:var(--text-dim)]">
          No tips match that search. Try a different keyword.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((t) => {
          const isOpen = expanded === t.day;
          const isToday = t.day === todayNumber;
          return (
            <article
              key={t.day}
              className={`card overflow-hidden transition ${
                isToday ? 'ring-2 ring-[color:var(--gold)]' : ''
              }`}
            >
              <div className="flex items-start gap-4 p-5">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-yellow-600 to-red-700">
                  {t.game_image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={t.game_image}
                      alt={t.game_name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                      }}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {isToday && (
                      <span className="inline-flex items-center rounded-full bg-[color:var(--gold)] px-2 py-0.5 text-[10px] font-bold uppercase text-black">
                        Today&apos;s pick
                      </span>
                    )}
                    <span className="text-xs uppercase tracking-widest text-[color:var(--gold)]">
                      Day {t.day}
                    </span>
                  </div>
                  <h3 className="mt-1 text-lg font-bold">{t.game_name}</h3>
                  <div className="text-xs text-[color:var(--text-dim)]">
                    {BRAND_LABEL[t.brand] ?? t.brand} • {t.game_category}
                  </div>
                </div>
              </div>

              <div className="border-t border-[color:var(--border)] bg-black/20 p-5">
                <p className="text-sm text-[color:var(--text-dim)]">
                  {isOpen ? t.tip_full : t.tip_short}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setExpanded(isOpen ? null : t.day)}
                    className="text-xs font-semibold text-[color:var(--gold)] hover:underline"
                  >
                    {isOpen ? 'Show less' : 'Read full strategy →'}
                  </button>
                  <a
                    href={SITE.ocs8SignupUrl}
                    className="inline-flex items-center rounded-md bg-gradient-to-b from-yellow-300 to-yellow-500 px-4 py-2 text-xs font-bold text-black transition hover:brightness-110"
                  >
                    Play {t.game_name} →
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
