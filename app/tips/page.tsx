import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TipsSearch from '@/components/TipsSearch';
import { dailyTips, allGames } from '@/lib/data';
import { SITE } from '@/lib/site';

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
          multipliers, angpao drop timing, and bet-sizing advice. Search by game name, brand,
          or strategy keyword (e.g. <em>&quot;free spin&quot;</em>, <em>&quot;jackpot&quot;</em>,
          <em>&quot;angpao&quot;</em>).
        </p>

        <div className="mt-8">
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
