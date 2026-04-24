import { todayBukti, allGames } from '@/lib/data';
import { BRAND_LABEL, SITE } from '@/lib/site';

function fmtRM(n: number) {
  return `RM ${n.toLocaleString('en-MY')}`;
}

export default function BuktiCuci() {
  const entries = todayBukti(3);
  const gamesIndex: Record<string, ReturnType<typeof allGames>[number]> = {};
  for (const g of allGames()) gamesIndex[g.id] = g;

  return (
    <section id="bukti-cuci" className="mx-auto max-w-6xl px-4 py-12 md:py-16 scroll-mt-20">
      <div className="mb-8 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-black/40 px-3 py-1 text-xs uppercase tracking-wider text-[color:var(--gold)]">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Verified wins today
        </div>
        <h2 className="section-title">
          <span className="gold-text">Bukti Cuci</span> — Proof of Winning
        </h2>
        <p className="mt-2 text-sm text-[color:var(--text-dim)]">
          Real member wins, real withdrawals. Updated daily, 3 featured testimonials.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {entries.map((e, i) => {
          const g = gamesIndex[e.game_id];
          const profit = e.withdrawal - e.deposit;
          const multiplier = (e.withdrawal / e.deposit).toFixed(1);
          return (
            <article key={i} className="card flex flex-col overflow-hidden">
              <div className="flex items-center gap-3 bg-gradient-to-r from-green-500/15 to-transparent p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-black">
                  {e.member.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-mono text-sm font-semibold">{e.member}</div>
                  <div className="text-[10px] text-[color:var(--text-dim)]">
                    Verified member · {BRAND_LABEL[e.brand] ?? e.brand}
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-300">
                  ✓ PAID
                </span>
              </div>

              <div className="flex items-center gap-3 border-b border-[color:var(--border)] px-4 py-3">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-[color:var(--bg-3)]">
                  {g?.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={g.image} alt={g?.name_en ?? e.game_id} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold">{g?.name_en ?? e.game_id}</div>
                  <div className="text-[10px] text-[color:var(--text-dim)]">&ldquo;{e.note}&rdquo;</div>
                </div>
              </div>

              <dl className="grid grid-cols-3 border-b border-[color:var(--border)] divide-x divide-[color:var(--border)]">
                <div className="p-3 text-center">
                  <dt className="text-[10px] uppercase tracking-wider text-[color:var(--text-dim)]">Turnover</dt>
                  <dd className="mt-1 font-mono text-sm font-semibold">{fmtRM(e.turnover)}</dd>
                </div>
                <div className="p-3 text-center">
                  <dt className="text-[10px] uppercase tracking-wider text-[color:var(--text-dim)]">Deposit</dt>
                  <dd className="mt-1 font-mono text-sm font-semibold">{fmtRM(e.deposit)}</dd>
                </div>
                <div className="p-3 text-center">
                  <dt className="text-[10px] uppercase tracking-wider text-[color:var(--text-dim)]">Withdrawal</dt>
                  <dd className="mt-1 font-mono text-sm font-bold text-green-300">{fmtRM(e.withdrawal)}</dd>
                </div>
              </dl>

              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[color:var(--text-dim)]">Profit</div>
                  <div className="font-mono text-base font-bold text-[color:var(--gold)]">
                    +{fmtRM(profit)}{' '}
                    <span className="text-xs text-[color:var(--text-dim)]">({multiplier}x)</span>
                  </div>
                </div>
                <a
                  href={SITE.ocs8SignupUrl}
                  className="inline-flex items-center rounded-md bg-gradient-to-b from-yellow-300 to-yellow-500 px-3 py-1.5 text-xs font-bold text-black transition hover:brightness-110"
                >
                  Try {g?.name_en?.split(' ')[0] ?? 'This'} →
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
