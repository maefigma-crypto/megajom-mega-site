import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RTPFullTable from '@/components/RTPFullTable';
import { allRtp, rtpLive } from '@/lib/data';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Mega888 RTP Live Today | 918Kiss RTP Rates | Pussy888 Hot Games',
  description:
    'Live RTP rates for every Mega888, 918Kiss, and Pussy888 game — updated every 2 hours. Spot the hot-zone games before you bet.',
  alternates: { canonical: '/rtp/' },
  openGraph: {
    title: 'Mega888 RTP Today — Live Rates for All Games',
    description: 'Live RTP rates for every Mega888, 918Kiss, and Pussy888 game.',
    url: `${SITE.url}/rtp/`,
  },
};

const FAQ = [
  {
    q: 'What is RTP and how is it calculated?',
    a: 'RTP (Return To Player) is the theoretical percentage of wagered money a slot game returns to players over a very large sample of spins. MEGAJOM tracks the short-term realized RTP window, which fluctuates around the game\'s base RTP and can reveal temporary hot zones.',
  },
  {
    q: 'How often does MEGAJOM update Mega888 RTP?',
    a: 'Every 2 hours. The last-updated and next-update timestamps are shown at the top of the RTP table so you always know when fresh data is live.',
  },
  {
    q: 'Is a higher RTP guaranteed to pay out more?',
    a: 'No. RTP is a long-run expectation, not a guarantee for any single session. Hot-zone games show elevated short-term RTP but individual results remain random. Always play within a set bankroll.',
  },
  {
    q: 'Which Mega888 game has the highest RTP today?',
    a: 'Sort the table by "Current RTP" to see the current leader. Games in the HOT zone (green, 50%+) are the current session leaders and change every 2 hours.',
  },
  {
    q: 'Does Pussy888 have higher RTP than Mega888?',
    a: 'Base RTPs are broadly similar across all three platforms (93-97% range). Session-level variance matters more than platform choice — use our tracker to find the hot game on any brand.',
  },
  {
    q: 'Are these RTP values official from the game provider?',
    a: 'Base RTP values reflect published provider specifications. Current RTP is computed from MEGAJOM session tracking and is indicative; the operator does not control or guarantee short-term outcomes.',
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
  ],
};

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function RTPPage() {
  const rows = allRtp();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <nav className="mb-4 text-xs text-[color:var(--text-dim)]">
          <a href="/" className="hover:text-white">Home</a> / RTP Tracker
        </nav>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="gold-text">Mega888 RTP Today</span> — Live Rates for All Games
        </h1>

        <p className="mt-4 max-w-3xl text-[color:var(--text-dim)]">
          MEGAJOM tracks live RTP (Return To Player) for every game across Mega888, 918Kiss, and
          Pussy888. Values are refreshed every 2 hours — sort, filter, or search to find the
          current hot-zone games. Green-status games are in elevated short-term RTP windows;
          yellow and red indicate average and cool games respectively. Use this data to time
          your sessions for maximum variance advantage across Malaysia&apos;s most popular slot
          platforms.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[color:var(--text-dim)]">
          <span>
            Last updated: <span className="text-white">{formatTime(rtpLive.updated_at)}</span>
          </span>
          <span>
            Next update: <span className="text-white">{formatTime(rtpLive.next_update)}</span>
          </span>
          <span>{rows.length} games tracked</span>
        </div>

        <div className="mt-8">
          <RTPFullTable entries={rows} />
        </div>

        <section className="mt-16">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="card p-5">
                <summary className="cursor-pointer font-semibold text-white">
                  {f.q}
                </summary>
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
