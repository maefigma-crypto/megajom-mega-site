'use client';

import { useMemo, useState } from 'react';
import type { RTPEntry } from '@/lib/data';
import { BRAND_LABEL, SITE } from '@/lib/site';

type SortKey = 'rtp_current' | 'name_en' | 'brand' | 'rtp_base';
type Brand = 'all' | 'mega888' | 'kiss918' | 'pussy888';

export default function RTPFullTable({ entries }: { entries: RTPEntry[] }) {
  const [brand, setBrand] = useState<Brand>('all');
  const [sortKey, setSortKey] = useState<SortKey>('rtp_current');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    let out = entries;
    if (brand !== 'all') out = out.filter((e) => e.brand === brand);
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((e) => e.name_en.toLowerCase().includes(q));
    }
    out = [...out].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return out;
  }, [entries, brand, sortKey, sortDir, query]);

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(k);
      setSortDir('desc');
    }
  };

  const arrow = (k: SortKey) => (sortKey === k ? (sortDir === 'asc' ? ' ▲' : ' ▼') : '');

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
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
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search game..."
          className="w-56 rounded-md border border-[color:var(--border)] bg-black/40 px-3 py-2 text-sm placeholder:text-[color:var(--text-dim)] focus:border-[color:var(--gold)] focus:outline-none"
        />
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-black/40 text-xs uppercase tracking-wider text-[color:var(--text-dim)]">
            <tr>
              <th className="px-4 py-3">#</th>
              <th
                className="cursor-pointer px-4 py-3 hover:text-white"
                onClick={() => toggleSort('name_en')}
              >
                Game{arrow('name_en')}
              </th>
              <th
                className="cursor-pointer px-4 py-3 hover:text-white"
                onClick={() => toggleSort('brand')}
              >
                Brand{arrow('brand')}
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-right hover:text-white"
                onClick={() => toggleSort('rtp_base')}
              >
                Base RTP{arrow('rtp_base')}
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-right hover:text-white"
                onClick={() => toggleSort('rtp_current')}
              >
                Current RTP{arrow('rtp_current')}
              </th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id + r.brand} className="border-t border-[color:var(--border)] hover:bg-white/5">
                <td className="px-4 py-3 text-[color:var(--text-dim)]">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 overflow-hidden rounded-md bg-[color:var(--bg-3)] flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.image} alt={r.name_en} loading="lazy" className="h-full w-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }} />
                    </div>
                    <span className="font-semibold">{r.name_en}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[color:var(--text-dim)]">{BRAND_LABEL[r.brand] ?? r.brand}</td>
                <td className="px-4 py-3 text-right font-mono text-[color:var(--text-dim)]">
                  {r.rtp_base.toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-right font-mono font-bold text-[color:var(--gold)]">
                  {r.rtp_current.toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-right">
                  <a
                    href={SITE.ocs8SignupUrl}
                    className="inline-flex items-center rounded-md bg-gradient-to-b from-yellow-300 to-yellow-500 px-3 py-1.5 text-xs font-bold text-black transition hover:brightness-110"
                  >
                    Play
                  </a>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-[color:var(--text-dim)]">
                  No games match your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
