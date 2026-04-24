import { todayWithdrawals } from '@/lib/data';
import { BRAND_LABEL, SITE } from '@/lib/site';

function fmtRM(n: number) {
  return `RM ${n.toLocaleString('en-MY')}`;
}

function fmtDuration(s: number) {
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return mins > 0 ? `${mins} min ${secs}s` : `${secs}s`;
}

export default function WithdrawalProof() {
  const entries = todayWithdrawals(3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-8 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-black/40 px-3 py-1 text-xs uppercase tracking-wider text-[color:var(--gold)]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Cuci laju · approved payouts
        </div>
        <h2 className="section-title">
          <span className="gold-text">Withdrawal Proof</span> — Bukti Bayar
        </h2>
        <p className="mt-2 text-sm text-[color:var(--text-dim)]">
          Real withdrawals, real bank transfers, real approval times. Average payout speed today: under 4 minutes.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {entries.map((e, i) => {
          const brand = BRAND_LABEL[e.brand] ?? e.brand;
          return (
            <article key={i} className="card flex flex-col overflow-hidden">
              <div className="flex items-center justify-between bg-gradient-to-r from-emerald-500/20 to-transparent p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-black font-black">
                    {e.member.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-mono text-sm font-semibold">{e.member}</div>
                    <div className="text-[10px] text-[color:var(--text-dim)]">
                      Verified · {brand}
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  <span>🟢</span> APPROVED
                </span>
              </div>

              <div className="px-4 py-5 text-center">
                <div className="text-[10px] uppercase tracking-wider text-[color:var(--text-dim)]">
                  Withdrawn to {e.bank}
                </div>
                <div className="mt-1 font-mono text-3xl font-black text-emerald-300">
                  {fmtRM(e.amount)}
                </div>
              </div>

              <dl className="grid grid-cols-2 border-t border-[color:var(--border)] divide-x divide-[color:var(--border)]">
                <div className="p-3 text-center">
                  <dt className="text-[10px] uppercase tracking-wider text-[color:var(--text-dim)]">
                    Submit
                  </dt>
                  <dd className="mt-1 font-mono text-sm">{e.submit_time}</dd>
                </div>
                <div className="p-3 text-center">
                  <dt className="text-[10px] uppercase tracking-wider text-[color:var(--text-dim)]">
                    Approved
                  </dt>
                  <dd className="mt-1 font-mono text-sm text-emerald-300">{e.approval_time}</dd>
                </div>
              </dl>

              <div className="flex items-center justify-between border-t border-[color:var(--border)] px-4 py-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[color:var(--text-dim)]">
                    Processing
                  </div>
                  <div className="font-mono text-base font-bold text-[color:var(--gold)]">
                    ⚡ {fmtDuration(e.duration_seconds)}
                  </div>
                </div>
                <a
                  href={SITE.ocs8SignupUrl}
                  className="inline-flex items-center rounded-md bg-gradient-to-b from-yellow-300 to-yellow-500 px-3 py-1.5 text-xs font-bold text-black transition hover:brightness-110"
                >
                  Daftar →
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
