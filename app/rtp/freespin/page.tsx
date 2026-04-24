import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TaggedRTPSubpage from '@/components/TaggedRTPSubpage';
import { allRtp, rtpLive } from '@/lib/data';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: '918Kiss Free Spin RTP — Best Free Spin Games Today',
  description:
    'Mega888, 918Kiss, Pussy888 free spin trigger rates. Find which slots have the highest free spin trigger rate right now — live data, 2-hour refresh.',
  alternates: { canonical: '/rtp/freespin/' },
  keywords: ['mega888 free spin rtp', '918kiss free spin', 'pussy888 free spin', 'free spin slot malaysia', 'mega888 free spin rate'],
  openGraph: {
    title: '918Kiss Free Spin RTP — Best Free Spin Games',
    description: 'Live free spin trigger rates for Mega888, 918Kiss, Pussy888.',
    url: `${SITE.url}/rtp/freespin/`,
  },
};

const FAQ = [
  {
    q: 'What does "free spin rate" mean?',
    a: 'Free spin rate is how often a slot triggers its free-spin bonus round (typically 3+ scatter symbols). Higher rate = more frequent bonus triggers = more wins during the session.',
  },
  {
    q: 'How often do Mega888 free spins trigger?',
    a: 'Varies dramatically per game. Dolphin Reef triggers around 1-in-85 base spins (high frequency). Great Blue triggers closer to 1-in-200 but pays much bigger. The tracker shows current hotness.',
  },
  {
    q: 'Can I buy free spins on 918Kiss slots?',
    a: 'Some newer slots offer buy-bonus features where you pay 80-100x bet to trigger free spins instantly. Most classic 918Kiss slots do not — you wait for organic triggers.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'RTP Tracker', item: `${SITE.url}/rtp/` },
    { '@type': 'ListItem', position: 3, name: 'Free Spin', item: `${SITE.url}/rtp/freespin/` },
  ],
};

export default function RTPFreespinPage() {
  const rows = allRtp();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <nav className="mb-4 text-xs text-[color:var(--text-dim)]">
          <a href="/" className="hover:text-white">Home</a> / <a href="/rtp/" className="hover:text-white">RTP Tracker</a> / Free Spin
        </nav>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-600/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-300">
            <span>RTP</span>
            <span className="rounded-md bg-purple-600 px-2 py-0.5 text-white">Free Spins</span>
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
            <span className="gold-text">918Kiss Free Spin RTP</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[color:var(--text-dim)]">
            Live free-spin trigger rates. The higher the rate, the more often the bonus round is
            firing on that game right now.
          </p>
        </div>

        <TaggedRTPSubpage
          entries={rows}
          tag="free-spin"
          currentTab="freespin"
          updatedAt={rtpLive.updated_at}
          nextUpdate={rtpLive.next_update}
          minRate={3}
          maxRate={25}
          warmThreshold={10}
          hotThreshold={18}
        />

        <section className="mt-16">
          <h2 className="section-title">Free Spin FAQ</h2>
          <div className="mt-6 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="card p-5">
                <summary className="cursor-pointer font-semibold text-white">{f.q}</summary>
                <p className="mt-3 text-[color:var(--text-dim)]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
