import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TaggedRTPSubpage from '@/components/TaggedRTPSubpage';
import { allRtp, rtpLive } from '@/lib/data';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Mega888 Jackpot Rate — Progressive Jackpot Games Today',
  description:
    'Live jackpot hit rates for Mega888, 918Kiss, and Pussy888 progressive slots. Find which jackpot games are paying out now — updated every 2 hours.',
  alternates: { canonical: '/rtp/jackpot/' },
  keywords: ['mega888 jackpot', 'mega888 jackpot rate', '918kiss jackpot', 'pussy888 jackpot', 'progressive jackpot slot malaysia'],
  openGraph: {
    title: 'Mega888 Jackpot Rate Today',
    description: 'Live jackpot hit rates for Mega888, 918Kiss, Pussy888 progressive slots.',
    url: `${SITE.url}/rtp/jackpot/`,
  },
};

const FAQ = [
  {
    q: 'What is a Mega888 jackpot rate?',
    a: 'Jackpot rate is the probability a progressive jackpot triggers on any given spin. Progressives accumulate across all players on the network until one lucky spin unlocks the full pool.',
  },
  {
    q: 'Why does the jackpot keep resetting without me hitting?',
    a: 'Progressives reset the moment any player in the global pool triggers them. With thousands of concurrent Mega888 players, jackpots typically hit within 48-72 hours of seeding.',
  },
  {
    q: 'Do I need to bet max to qualify for the jackpot?',
    a: 'On most Mega888 progressives, yes — max coins-per-line is required for jackpot eligibility. Playing below max means you cannot trigger it.',
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
    { '@type': 'ListItem', position: 3, name: 'Jackpot', item: `${SITE.url}/rtp/jackpot/` },
  ],
};

export default function RTPJackpotPage() {
  const rows = allRtp();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <nav className="mb-4 text-xs text-[color:var(--text-dim)]">
          <a href="/" className="hover:text-white">Home</a> / <a href="/rtp/" className="hover:text-white">RTP Tracker</a> / Jackpot
        </nav>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-yellow-300">
            <span>RTP</span>
            <span className="rounded-md bg-yellow-500 px-2 py-0.5 text-black">Jackpot</span>
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
            <span className="gold-text">Mega888 Jackpot Rate</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[color:var(--text-dim)]">
            Live progressive jackpot hit rates. Higher percentage = jackpot more likely to trigger
            in the current 2-hour window.
          </p>
        </div>

        <TaggedRTPSubpage
          entries={rows}
          tag="jackpot"
          currentTab="jackpot"
          updatedAt={rtpLive.updated_at}
          nextUpdate={rtpLive.next_update}
          minRate={0.5}
          maxRate={8}
          warmThreshold={3}
          hotThreshold={5.5}
        />

        <section className="mt-16">
          <h2 className="section-title">Jackpot FAQ</h2>
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
