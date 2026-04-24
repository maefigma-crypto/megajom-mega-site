'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { RTPEntry } from '@/lib/data';
import { BRAND_LABEL, SITE } from '@/lib/site';

type Brand = 'all' | 'mega888' | 'kiss918' | 'pussy888';

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
    });
  } catch {
    return iso;
  }
}

export default function RTPTracker({
  entries,
  updatedAt,
  nextUpdate,
  limit = 10,
}: {
  entries: RTPEntry[];
  updatedAt: string;
  nextUpdate: string;
  limit?: number;
}) {
  const [brand, setBrand] = useState<Brand>('all');

  const rows = useMemo(() => {
    const filtered = brand === 'all' ? entries : entries.filter((e) => e.brand === brand);
    return [...filtered].sort((a, b) => b.rtp_current - a.rtp_current).slice(0, limit);
  }, [brand, entries, limit]);

  return (
    <section id="rtp" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="section-title">
            <span className="gold-text">Top RTP Games</span> Right Now
          </h2>
          <p className="mt-1 text-sm text-[color:var(--text-dim)]">
            Last updated <span className="text-white">{formatTime(updatedAt)}</span> •
            Next refresh <span className="text-white">{formatTime(nextUpdate)}</span>
          </p>
        </div>
        <Link href="/rtp/" className="text-sm text-[color:var(--gold)] hover:underline">
          View all RTP rates →
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
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
            {b === 'all' ? 'All Games' : BRAND_LABEL[b]}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-black/40 text-xs uppercase tracking-wider text-[color:var(--text-dim)]">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Game</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3 text-right">Current RTP</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id + r.brand} className="border-t border-[color:var(--border)] hover:bg-white/5">
                <td className="px-4 py-3 text-[color:var(--text-dim)]">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-md bg-[color:var(--bg-3)] flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.image} alt={r.name_en} loading="lazy" className="h-full w-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }} />
                    </div>
                    <div>
                      <div className="font-semibold">{r.name_en}</div>
                      <div className="text-xs text-[color:var(--text-dim)]">{r.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[color:var(--text-dim)]">{BRAND_LABEL[r.brand] ?? r.brand}</td>
                <td className="px-4 py-3 text-right">
                  <span className="font-mono text-lg font-bold text-[color:var(--gold)]">
                    {r.rtp_current.toFixed(1)}%
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <a
                    href={SITE.ocs8SignupUrl}
                    className="inline-flex items-center rounded-md bg-gradient-to-b from-yellow-300 to-yellow-500 px-3 py-1.5 text-xs font-bold text-black transition hover:brightness-110"
                  >
                    Play Now
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
