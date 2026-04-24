import { SITE } from '@/lib/site';

const PROMOS = [
  {
    title: 'Welcome Bonus',
    badge: '110%',
    tagline: 'First deposit — doubled.',
    body: 'Deposit minimum RM 30, dapat 110% bonus — max RM 888 extra. Rollover rendah, withdraw laju.',
    highlight: 'from-yellow-400 via-orange-500 to-red-600',
    button: 'Claim Welcome 110% →',
  },
  {
    title: 'Daily Reload',
    badge: '30%',
    tagline: 'Reload anytime, get extra.',
    body: 'Setiap hari deposit, dapat 30% reload bonus unlimited. Main lagi, cuci lagi.',
    highlight: 'from-emerald-400 via-teal-500 to-cyan-600',
    button: 'Claim Daily Reload →',
  },
  {
    title: 'Cuci Rebate',
    badge: '1%',
    tagline: 'Kalah pun ada balik.',
    body: '1% unlimited cashback on weekly turnover. Tiap minggu credit balik ke wallet automatik.',
    highlight: 'from-purple-500 via-fuchsia-600 to-pink-600',
    button: 'Enable Cashback →',
  },
];

export default function PromotionSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-8 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-black/40 px-3 py-1 text-xs uppercase tracking-wider text-[color:var(--gold)]">
          <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
          Promotions Ongoing
        </div>
        <h2 className="section-title">
          <span className="gold-text">MEGAJOM Promo</span> — Bonus & Rebate Harian
        </h2>
        <p className="mt-2 text-sm text-[color:var(--text-dim)]">
          Ambil semua 3 bonus bila daftar — ia bertindan, tidak berkonflik.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {PROMOS.map((p) => (
          <article
            key={p.title}
            className="card group relative overflow-hidden transition hover:-translate-y-1"
          >
            <div className={`bg-gradient-to-br ${p.highlight} p-6 text-center`}>
              <div className="text-xs font-bold uppercase tracking-widest text-white/90">
                {p.title}
              </div>
              <div className="mt-2 text-6xl md:text-7xl font-black leading-none text-white drop-shadow-lg">
                {p.badge}
              </div>
              <p className="mt-3 text-sm font-semibold text-white/95">{p.tagline}</p>
            </div>
            <div className="p-5">
              <p className="text-sm text-[color:var(--text-dim)]">{p.body}</p>
              <a
                href={SITE.ocs8SignupUrl}
                className="btn-primary mt-5 w-full !py-2.5 text-sm"
              >
                {p.button}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
