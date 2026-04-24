import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About MEGAJOM — Malaysia Mega888 / 918Kiss / Pussy888 Portal',
  description:
    'MEGAJOM is Malaysia\'s trusted casino affiliate portal for Mega888, 918Kiss, and Pussy888 — live RTP tracker, verified big-win proof, game strategies, and 24/7 player support.',
  alternates: { canonical: '/about/' },
  openGraph: {
    title: 'About MEGAJOM — Trusted Malaysia Slot Portal',
    description: 'Live RTP tracker, 428 games, 30-day game tip library, verified winners.',
    url: `${SITE.url}/about/`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE.url}/about/` },
  ],
};

const STATS = [
  { value: '428+', label: 'Live games tracked' },
  { value: '3', label: 'Top Malaysia brands' },
  { value: '2 hrs', label: 'RTP refresh cycle' },
  { value: '24/7', label: 'Support response' },
];

const VALUES = [
  {
    icon: '🔍',
    title: 'Data-first',
    body: 'Every game has its own RTP profile, bonus trigger rate, and strategy page. No guessing — we track it.',
  },
  {
    icon: '🇲🇾',
    title: 'Malaysia-focused',
    body: 'Built for Malaysian players: Ringgit deposits via FPX / Touch \'n Go / Boost / bank transfer, plus local-language tips.',
  },
  {
    icon: '⚡',
    title: 'Fast payouts',
    body: '5-minute withdrawals once verified. No hidden rollover, no fine-print traps.',
  },
  {
    icon: '🛡️',
    title: 'Safe & anonymous',
    body: 'Bank-grade SSL, masked member IDs on public wins, no data sharing with third parties.',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main>
        <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <nav className="mb-4 text-xs text-[color:var(--text-dim)]">
            <a href="/" className="hover:text-white">Home</a> / About
          </nav>

          <div className="text-center">
            <div className="mb-3 inline-flex items-center rounded-full bg-[color:var(--gold)] px-3 py-1 text-xs font-bold uppercase text-black">
              About MEGAJOM
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Malaysia&apos;s <span className="gold-text">trusted slot portal</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[color:var(--text-dim)]">
              MEGAJOM is the Malaysia-first affiliate portal for Mega888, 918Kiss, and Pussy888 —
              the three most-played slot platforms in the local market. We aggregate the highest
              RTP games, track jackpot pools live, and publish the strategies serious players use
              to maximize expected value.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="card p-5 text-center">
                <div className="text-3xl md:text-4xl font-black">
                  <span className="gold-text">{s.value}</span>
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-[color:var(--text-dim)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-8">
          <h2 className="section-title text-center">What we stand for</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="card p-6">
                <div className="mb-2 text-3xl">{v.icon}</div>
                <div className="text-lg font-bold">{v.title}</div>
                <p className="mt-2 text-sm text-[color:var(--text-dim)]">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        <AboutSection />

        <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="card p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold">
              Ready to <span className="gold-text">cuci laju-laju</span>?
            </h2>
            <p className="mt-2 text-[color:var(--text-dim)]">
              Daftar sekarang — deposit cepat, withdrawal 5 minit.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a href={SITE.ocs8SignupUrl} className="btn-primary">Sign Up Now</a>
              <a href="/tips/" className="btn-secondary">Game Strategies →</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
