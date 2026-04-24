'use client';

import { useMemo, useState } from 'react';
import type { Game } from '@/lib/data';
import { BRAND_LABEL, SITE } from '@/lib/site';

type Brand = 'all' | 'mega888' | 'kiss918' | 'pussy888';
type PoolGame = Game & { brand: string };

export default function GameGallery({ games }: { games: PoolGame[] }) {
  const [brand, setBrand] = useState<Brand>('all');
  const filtered = useMemo(
    () => (brand === 'all' ? games : games.filter((g) => g.brand === brand)),
    [brand, games],
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-5 text-center">
        <h2 className="section-title">
          All <span className="gold-text">Games Library</span>
        </h2>
        <p className="mt-2 text-sm text-[color:var(--text-dim)]">
          {games.length} total games across Mega888, 918Kiss, and Pussy888.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap justify-center gap-2">
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

      <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {filtered.map((g) => (
          <div
            key={g.id + g.brand}
            className="group relative overflow-hidden rounded-lg border border-[color:var(--border)] bg-black/30 transition hover:-translate-y-1 hover:border-[color:var(--gold)]"
          >
            <a href={SITE.ocs8SignupUrl} className="block">
              <div className="aspect-square overflow-hidden bg-[color:var(--bg-3)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.image}
                  alt={g.name_en}
                  loading="lazy"
                  className="h-full w-full object-cover transition group-hover:scale-110"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                  }}
                />
              </div>
              <div className="px-2 py-2 text-center">
                <div className="truncate text-xs font-semibold">{g.name_en}</div>
                <div className="text-[10px] text-[color:var(--text-dim)]">
                  {BRAND_LABEL[g.brand]}
                </div>
              </div>
            </a>

            <a
              href={`/games/${g.id}/`}
              aria-label={`Read more about ${g.name_en}`}
              title="Read game story"
              className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--gold)] bg-black/70 text-[color:var(--gold)] opacity-0 shadow-lg transition hover:bg-[color:var(--gold)] hover:text-black group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5V4.5a2 2 0 0 1 2-2h11l5 5v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
                <polyline points="17 2 17 8 23 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="14" y2="17" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
