import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TaggedRTPSubpage from '@/components/TaggedRTPSubpage';
import { allRtp, rtpLive } from '@/lib/data';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Mega888 Angpao Rate Today — Free Credit Win Chance',
  description:
    'Live Mega888 angpao rate tracker. Find which 918Kiss and Pussy888 angpao slots are hitting right now — free credit drops updated every 2 hours.',
  alternates: { canonical: '/rtp/angpao/' },
  keywords: ['mega888 angpao', 'mega888 angpao rate', '918kiss angpao', 'pussy888 angpao', 'angpao slot malaysia', 'free credit slot'],
  openGraph: {
    title: 'Mega888 Angpao Rate Today',
    description: 'Live angpao hit rates across Mega888, 918Kiss, Pussy888.',
    url: `${SITE.url}/rtp/angpao/`,
  },
};

const FAQ = [
  {
    q: 'What is an angpao in Mega888?',
    a: 'Angpao is a random mid-game bonus on Chinese-themed slots — a floating red packet that lands during a spin and awards an instant multiplier (2x-50x current win) or a free credit drop. It is most common on Fortune Panda, Zhao Cai Jin Bao, Wong Choy, and similar angpao-themed games.',
  },
  {
    q: 'How often does the angpao drop?',
    a: 'Angpao frequency varies per game. Our tracker shows realized rate over the current 2-hour window — look for the highest-rate game and play that one.',
  },
  {
    q: 'Is angpao the same as a jackpot?',
    a: 'No. Angpao is a small-to-medium instant bonus (RM 5-500 typical). Jackpots are progressive pools that can reach RM 10,000+ and trigger rarely.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'RTP Tracker', item: `${SITE.url}/rtp/` },
    { '@type': 'ListItem', position: 3, name: 'Angpao', item: `${SITE.url}/rtp/angpao/` },
  ],
};

export default function RTPAngpaoPage() {
  const rows = allRtp();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <nav className="mb-4 text-xs text-[color:var(--text-dim)]">
          <a href="/" className="hover:text-white">Home</a> / <a href="/rtp/" className="hover:text-white">RTP Tracker</a> / Angpao
        </nav>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-300">
            <span>RTP</span>
            <span className="rounded-md bg-red-600 px-2 py-0.5 text-white">Angpao</span>
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
            <span className="gold-text">Mega888 Angpao Rate Today</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[color:var(--text-dim)]">
            Live angpao drop rates across Mega888, 918Kiss, and Pussy888. The higher the rate,
            the hotter the angpao is dropping right now.
          </p>
        </div>

        <TaggedRTPSubpage
          entries={rows}
          tag="angpao"
          currentTab="angpao"
          updatedAt={rtpLive.updated_at}
          nextUpdate={rtpLive.next_update}
          minRate={1}
          maxRate={15}
          warmThreshold={7}
          hotThreshold={11}
        />

        <section className="mt-16">
          <h2 className="section-title">Angpao FAQ</h2>
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
