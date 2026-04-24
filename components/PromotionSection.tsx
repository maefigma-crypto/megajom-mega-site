import { SITE } from '@/lib/site';

const PROMOS = [
  {
    image: '/promotions/Welcome Bonus.jpg',
    title: 'Welcome Bonus',
    tagline: 'Daftar dan dapat bonus besar',
    body: 'Pertama kali deposit dapat 110% — naik level terus.',
  },
  {
    image: '/promotions/Free Kredit No Deposit.jpg',
    title: 'Free Kredit — No Deposit',
    tagline: 'Main tanpa deposit',
    body: 'Dapat kredit percuma tiap akaun baru — tiada deposit diperlukan.',
  },
  {
    image: '/promotions/Jom Coin RM38.jpg',
    title: 'Jom Coin RM38',
    tagline: 'Deposit sikit, main banyak',
    body: 'Top-up RM38 tukar Jom Coin — spin extra + bonus dihantar automatik.',
  },
  {
    image: '/promotions/Weekly Rebate.jpg',
    title: 'Weekly Rebate',
    tagline: 'Kalah pun ada balik',
    body: 'Cashback mingguan unlimited — dihantar terus ke wallet tiap Isnin.',
  },
  {
    image: '/promotions/Attendance Rewards.jpg',
    title: 'Attendance Rewards',
    tagline: 'Login setiap hari dapat hadiah',
    body: 'Check-in harian, kumpul points, tukar bonus + free spins.',
  },
  {
    image: '/promotions/Free Angpao Party.jpg',
    title: 'Free Angpao Party',
    tagline: 'Angpao percuma setiap minggu',
    body: 'Event khas — buka angpao untuk bonus random RM5-RM888.',
  },
  {
    image: '/promotions/Kombo Resit Harian.jpg',
    title: 'Kombo Resit Harian',
    tagline: 'Main harian, rebate harian',
    body: 'Deposit + main slot mana-mana hari dapat kombo resit harian.',
  },
  {
    image: '/promotions/Kombo Resit Mingguan.jpg',
    title: 'Kombo Resit Mingguan',
    tagline: 'Akumulasi mingguan',
    body: 'Kumpul turnover seminggu, dapat bonus tambahan besar.',
  },
];

export default function PromotionSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-8 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-black/40 px-3 py-1 text-xs uppercase tracking-wider text-[color:var(--orange)]">
          <span className="h-2 w-2 rounded-full bg-[color:var(--orange)] animate-pulse" />
          Promotions Ongoing
        </div>
        <h2 className="section-title">
          <span className="gold-text">MEGAJOM Promo</span> — Bonus Harian &amp; Mingguan
        </h2>
        <p className="mt-2 text-sm text-[color:var(--text-dim)]">
          8 promosi aktif sekarang. Daftar satu akaun, claim semua — tiada konflik antara promo.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROMOS.map((p) => (
          <a
            key={p.title}
            href={SITE.ocs8SignupUrl}
            className="card group relative overflow-hidden transition hover:-translate-y-1 hover:border-[color:var(--orange)]"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[color:var(--bg-3)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="text-[10px] uppercase tracking-widest text-[color:var(--cyan)]">
                {p.tagline}
              </div>
              <div className="mt-1 text-base font-bold text-white leading-tight">{p.title}</div>
              <p className="mt-2 text-xs text-[color:var(--text-dim)]">{p.body}</p>
              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[color:var(--orange)]/20 px-2.5 py-1 text-[10px] font-bold text-[color:var(--orange-2)]">
                🤖 Claim via MEGAJOM →
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
