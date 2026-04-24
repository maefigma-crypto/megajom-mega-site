'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { RTPEntry } from '@/lib/data';
import { BRAND_LABEL, SITE } from '@/lib/site';

type Brand = 'all' | 'mega888' | 'kiss918' | 'pussy888';

const CATEGORY_TABS = [
  { key: 'all', label: 'All Games', href: '/rtp/', emoji: '🎯' },
  { key: 'angpao', label: 'Angpao', href: '/rtp/angpao/', emoji: '🧧' },
  { key: 'freespin', label: 'Free Spins', href: '/rtp/freespin/', emoji: '🎰' },
  { key: 'jackpot', label: 'Jackpot', href: '/rtp/jackpot/', emoji: '💥' },
];

// Stable per-game hit-rate based on (game.id + tag + updated_at day).
// Changes every 2h when updated_at rolls and between tags so each page looks different.
function hitRate(id: string, tag: string, seed: string, min: number, max: number) {
  const key = id + tag + seed;
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  const span = Math.round((max - min) * 10);
  return Math.round((min + ((h % (span + 1)) / 10)) * 10) / 10;
}

function rateColor(r: number, warmThreshold: number, hotThreshold: number) {
  if (r >= hotThreshold) return 'green';
  if (r >= warmThreshold) return 'amber';
  return 'slate';
}

const PILL_CLASSES = {
  green: 'bg-emerald-500 text-white',
  amber: 'bg-amber-500 text-white',
  slate: 'bg-slate-700 text-white',
};

const BAR_CLASSES = {
  green: 'bg-emerald-500',
  amber: 'bg-amber-500',
  slate: 'bg-slate-500',
};

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short', year: 'numeric',
    });
  } catch { return iso; }
}

export default function TaggedRTPSubpage({
  entries,
  tag,
  currentTab,
  updatedAt,
  nextUpdate,
  minRate,
  maxRate,
  warmThreshold,
  hotThreshold,
}: {
  entries: RTPEntry[];
  tag: string;
  currentTab: 'angpao' | 'freespin' | 'jackpot';
  updatedAt: string;
  nextUpdate: string;
  minRate: number;
  maxRate: number;
  warmThreshold: number;
  hotThreshold: number;
}) {
  const [brand, setBrand] = useState<Brand>('all');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    let out = entries.filter((e) => e.tags.includes(tag));
    if (brand !== 'all') out = out.filter((e) => e.brand === brand);
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((e) => e.name_en.toLowerCase().includes(q));
    }
    const withRate = out.map((e) => ({
      ...e,
      rate: hitRate(e.id, tag, updatedAt, minRate, maxRate),
    }));
    withRate.sort((a, b) => b.rate - a.rate);
    return withRate;
  }, [entries, brand, query, tag, updatedAt, minRate, maxRate]);

  return (
    <div>
      {/* Category tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {CATEGORY_TABS.map((t) => {
          const active = t.key === currentTab;
          return (
            <Link
              key={t.key}
              href={t.href}
              className={`inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-bold transition ${
                active
                  ? 'border-[color:var(--gold)] bg-[color:var(--gold)] text-black shadow-lg'
                  : 'border-[color:var(--border)] bg-black/40 text-[color:var(--text-dim)] hover:border-[color:var(--gold)] hover:text-white'
              }`}
            >
              <span className="text-xl">{t.emoji}</span>
              {t.label}
            </Link>
          );
        })}
      </div>

      {/* Search + brand filter + update status */}
      <div className="card mb-6 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <label className="mb-1 block text-xs uppercase tracking-wider text-[color:var(--text-dim)]">
              Search
            </label>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type game name"
              className="w-full rounded-md border border-[color:var(--border)] bg-black/40 px-3 py-2 text-sm placeholder:text-[color:var(--text-dim)] focus:border-[color:var(--gold)] focus:outline-none"
            />
          </div>
          <div className="text-sm text-[color:var(--text-dim)] md:text-right">
            <div>Rates update every 2 hours</div>
            <div>
              Next Update: <span className="text-white font-mono">{formatTime(nextUpdate)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
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
              {b === 'all' ? 'All Brands' : BRAND_LABEL[b]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-black/50 text-xs uppercase tracking-wider text-[color:var(--text-dim)]">
            <tr>
              <th className="px-4 py-3 text-center">#</th>
              <th className="px-4 py-3">Game</th>
              <th className="px-4 py-3 hidden md:table-cell">Brand</th>
              <th className="px-4 py-3 text-center">Rate</th>
              <th className="px-4 py-3 w-[40%]">Progress</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const color = rateColor(r.rate, warmThreshold, hotThreshold);
              const pct = Math.min(100, Math.max(2, (r.rate / maxRate) * 100));
              return (
                <tr
                  key={r.id + r.brand}
                  className="border-t border-[color:var(--border)] hover:bg-white/5"
                >
                  <td className="px-4 py-3 text-center text-[color:var(--text-dim)] font-mono">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 overflow-hidden rounded-md bg-[color:var(--bg-3)] flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={r.image}
                          alt={r.name_en}
                          loading="lazy"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{r.name_en}</div>
                        <div className="text-[10px] md:hidden text-[color:var(--text-dim)]">
                          {BRAND_LABEL[r.brand] ?? r.brand}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-[color:var(--text-dim)]">
                    {BRAND_LABEL[r.brand] ?? r.brand}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-bold ${PILL_CLASSES[color]}`}
                    >
                      {r.rate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full ${BAR_CLASSES[color]} transition-all`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-[color:var(--text-dim)]">
                  No games match your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <a href={SITE.ocs8SignupUrl} className="btn-primary">
          Daftar & Play Now →
        </a>
      </div>
    </div>
  );
}
