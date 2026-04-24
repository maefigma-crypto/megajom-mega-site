import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TipsSearch from '@/components/TipsSearch';
import { dailyTips, allGames, allRtp } from '@/lib/data';
import { SITE, BRAND_LABEL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Mega888 Game Tips & Winning Strategies | 918Kiss & Pussy888 Guides',
  description:
    'Daily slot strategies for Mega888, 918Kiss, and Pussy888. Search 30+ game-specific winning tips — free spins, jackpots, angpao rates, and bonus triggers.',
  alternates: { canonical: '/tips/' },
  openGraph: {
    title: 'Mega888 Game Tips & Winning Strategies',
    description:
      'Search 30+ slot game winning tips for Mega888, 918Kiss, and Pussy888 — updated daily.',
    url: `${SITE.url}/tips/`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Game Tips', item: `${SITE.url}/tips/` },
  ],
};

export default function TipsPage() {
  const games = allGames();
  const gamesByKey: Record<string, (typeof games)[number]> = {};
  const gamesByBrand: Record<string, typeof games> = { mega888: [], kiss918: [], pussy888: [] };
  for (const g of games) {
    gamesByKey[g.id] = g;
    if (gamesByBrand[g.brand]) gamesByBrand[g.brand].push(g);
  }

  // Today's Top Pick = highest current RTP across all games, resolved back to a game entry for
  // image/brand metadata.
  const rtp = allRtp();
  const topRtp = [...rtp].sort((a, b) => b.rtp_current - a.rtp_current)[0];
  const topGame = topRtp ? gamesByKey[topRtp.id] : null;

  const todayNumber = new Date().getDate();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <nav className="mb-4 text-xs text-[color:var(--text-dim)]">
          <a href="/" className="hover:text-white">Home</a> / Game Tips
        </nav>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="gold-text">Mega888 Game Tips</span> — Daily Winning Strategies
        </h1>

        <p className="mt-4 max-w-3xl text-[color:var(--text-dim)]">
          A searchable library of 30 slot-specific winning strategies across Mega888, 918Kiss,
          and Pussy888. Each tip focuses on a single game — bonus trigger rates, free-spin
          multipliers, angpao drop timing, and bet-sizing advice.
        </p>

        {topRtp && topGame && (
          <section className="mt-8 overflow-hidden rounded-2xl border-2 border-[color:var(--orange)] bg-gradient-to-br from-orange-500/15 via-[color:var(--bg-2)] to-[color:var(--bg-2)]">
            <div className="grid md:grid-cols-[280px_1fr]">
              <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden bg-[color:var(--bg-3)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={topGame.image}
                  alt={topGame.name_en}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--orange)] px-3 py-1 text-[10px] font-black uppercase text-white">
                    🎯 Top Pick Hari Ini
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[color:var(--cyan)]">
                    {BRAND_LABEL[topGame.brand] ?? topGame.brand}
                  </span>
                </div>
                <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">
                  {topGame.name_en}
                </h2>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-mono text-4xl font-black text-emerald-300">
                    {topRtp.rtp_current.toFixed(1)}%
                  </span>
                  <span className="text-xs text-[color:var(--text-dim)]">
                    live RTP · updated every 2h
                  </span>
                </div>
                <p className="mt-3 max-w-xl text-sm text-[color:var(--text-dim)]">
                  Highest realized RTP in the current 2-hour window. Good candidate for your
                  next session if you&apos;re chasing {topGame.tags[0] ?? 'big wins'}.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={SITE.ocs8SignupUrl} className="btn-primary">
                    🤖 Play {topGame.name_en.split(' ')[0]} on MEGAJOM →
                  </a>
                  <a href={`/games/${topGame.id}/`} className="btn-secondary">
                    Read full strategy
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        <p className="mt-10 max-w-3xl text-sm text-[color:var(--text-dim)]">
          Search by game name, brand, or strategy keyword (e.g. <em>&quot;free spin&quot;</em>,
          <em>&quot;jackpot&quot;</em>, <em>&quot;angpao&quot;</em>).
        </p>

        <div className="mt-6">
          <TipsSearch
            tips={dailyTips}
            gamesByKey={gamesByKey}
            gamesByBrand={gamesByBrand}
            todayNumber={todayNumber}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
