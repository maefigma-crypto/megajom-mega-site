import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { allGames } from '@/lib/data';
import { SITE, BRAND_LABEL } from '@/lib/site';
import { buildGameStory } from '@/lib/game-story';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allGames().map((g) => ({ slug: g.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const game = allGames().find((g) => g.id === params.slug);
  if (!game) return { title: 'Game not found' };
  const brand = BRAND_LABEL[game.brand] ?? game.brand;
  return {
    title: `${game.name_en} — ${brand} Slot Guide, RTP & Winning Strategy`,
    description: `Complete guide to ${game.name_en} on ${brand}: base RTP ${game.rtp_base.toFixed(1)}%, bonus features, winning strategy, and FAQs. Play on MEGAJOM — Malaysia's trusted portal.`,
    alternates: { canonical: `/games/${params.slug}/` },
    keywords: [
      game.name_en.toLowerCase(),
      `${game.name_en.toLowerCase()} slot`,
      `${game.name_en.toLowerCase()} rtp`,
      `${game.name_en.toLowerCase()} strategy`,
      `${brand.toLowerCase()} ${game.name_en.toLowerCase()}`,
      ...game.tags,
    ],
    openGraph: {
      title: `${game.name_en} — How to Win | ${brand}`,
      description: `RTP, strategy, and winning tips for ${game.name_en}.`,
      url: `${SITE.url}/games/${params.slug}/`,
      images: game.image ? [{ url: `${SITE.url}${game.image}` }] : [],
    },
  };
}

export default function GamePage({ params }: Props) {
  const game = allGames().find((g) => g.id === params.slug);
  if (!game) notFound();

  const brand = BRAND_LABEL[game.brand] ?? game.brand;
  const story = buildGameStory(game);

  const related = allGames()
    .filter(
      (g) =>
        g.id !== game.id &&
        (g.brand === game.brand || g.tags.some((t) => game.tags.includes(t))),
    )
    .slice(0, 8);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Games', item: `${SITE.url}/games/` },
      { '@type': 'ListItem', position: 3, name: game.name_en, item: `${SITE.url}/games/${params.slug}/` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: story.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const gameSchema = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: game.name_en,
    genre: game.category,
    publisher: { '@type': 'Organization', name: brand },
    gamePlatform: 'Web, iOS, Android',
    image: game.image ? `${SITE.url}${game.image}` : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }} />
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <nav className="mb-4 text-xs text-[color:var(--text-dim)]">
          <a href="/" className="hover:text-white">Home</a> / <a href="/" className="hover:text-white">Games</a> / {game.name_en}
        </nav>

        <div className="card overflow-hidden">
          <div className="grid md:grid-cols-[240px_1fr]">
            <div className={`${game.brand === 'pussy888' ? 'aspect-[229/457]' : 'aspect-square'} bg-gradient-to-br from-yellow-600 to-red-700 md:aspect-auto`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={game.image} alt={game.name_en} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-between p-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[color:var(--gold)] px-2 py-0.5 text-[10px] font-bold uppercase text-black">
                    {brand}
                  </span>
                  <span className="rounded-full border border-[color:var(--border)] px-2 py-0.5 text-[10px] uppercase text-[color:var(--text-dim)]">
                    {game.category}
                  </span>
                  {game.tags.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-[color:var(--text-dim)]">
                      #{t}
                    </span>
                  ))}
                </div>
                <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
                  {game.name_en}
                </h1>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-bold text-[color:var(--gold)]">
                    {game.rtp_base.toFixed(1)}%
                  </span>
                  <span className="text-xs text-[color:var(--text-dim)]">Base RTP</span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href={SITE.ocs8SignupUrl} className="btn-primary">
                  Play {game.name_en} →
                </a>
                <a href={SITE.downloads.androidApk} className="btn-secondary">
                  Android APK
                </a>
                <a href="/download/ios/" className="btn-secondary">
                  iOS Install
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="section-title">About {game.name_en}</h2>
          <p className="mt-3 text-[color:var(--text-dim)]">{story.intro}</p>
        </section>

        <section className="mt-10">
          <h2 className="section-title">Game Specifications</h2>
          <ul className="mt-4 grid gap-2 md:grid-cols-2">
            {story.features.map((f) => (
              <li
                key={f}
                className="card flex items-center gap-3 px-4 py-3 text-sm text-[color:var(--text-dim)]"
              >
                <span className="text-[color:var(--gold)]">▸</span>
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="section-title">RTP Analysis</h2>
          <p className="mt-3 text-[color:var(--text-dim)]">{story.rtpNote}</p>
        </section>

        <section className="mt-10">
          <h2 className="section-title">Winning Strategy</h2>
          <p className="mt-3 text-[color:var(--text-dim)]">{story.strategy}</p>
        </section>

        <section className="mt-10">
          <h2 className="section-title">FAQ</h2>
          <div className="mt-4 space-y-3">
            {story.faq.map((f) => (
              <details key={f.q} className="card p-5">
                <summary className="cursor-pointer font-semibold text-white">{f.q}</summary>
                <p className="mt-3 text-[color:var(--text-dim)]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="section-title">More Games You&apos;ll Like</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {related.map((r) => (
                <a
                  key={r.id + r.brand}
                  href={`/games/${r.id}/`}
                  className="group block overflow-hidden rounded-lg border border-[color:var(--border)] bg-black/30 transition hover:-translate-y-1 hover:border-[color:var(--gold)]"
                >
                  <div className={`${r.brand === 'pussy888' ? 'aspect-[229/457]' : 'aspect-square'} overflow-hidden bg-[color:var(--bg-3)]`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt={r.name_en}
                      loading="lazy"
                      className="h-full w-full object-cover transition group-hover:scale-110"
                    />
                  </div>
                  <div className="px-2 py-2 text-center">
                    <div className="truncate text-xs font-semibold">{r.name_en}</div>
                    <div className="text-[10px] text-[color:var(--text-dim)]">
                      {BRAND_LABEL[r.brand]}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 text-center">
          <div className="card inline-block px-8 py-6">
            <h3 className="text-xl font-bold">Ready to play {game.name_en}?</h3>
            <p className="mt-1 text-sm text-[color:var(--text-dim)]">
              Join MEGAJOM — Malaysia&apos;s trusted {brand} portal. Fast payout, secure deposit.
            </p>
            <a href={SITE.ocs8SignupUrl} className="btn-primary mt-4">
              Sign Up & Play →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
