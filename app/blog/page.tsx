import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE, BRAND_LABEL } from '@/lib/site';
import blogPosts from '@/data/blog-posts.json';

type BlogPost = {
  slug: string;
  title: string;
  brand: string;
  date: string;
  excerpt: string;
  tag: string;
  reading_time: number;
};

const posts = blogPosts as BlogPost[];

export const metadata: Metadata = {
  title: 'MEGAJOM Blog — Mega888, 918Kiss & Pussy888 Strategy Insights',
  description:
    'Weekly articles covering RTP analysis, bonus strategy, withdrawal walkthroughs, and promo guides across Mega888, 918Kiss, and Pussy888.',
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: 'MEGAJOM Blog — Malaysia Slot Strategy Insights',
    description: 'Weekly articles on Mega888, 918Kiss, Pussy888 strategy and promos.',
    url: `${SITE.url}/blog/`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog/` },
  ],
};

const TAG_COLORS: Record<string, string> = {
  'rtp-review': 'bg-yellow-500 text-black',
  'promo-guide': 'bg-green-600 text-white',
  walkthrough: 'bg-blue-600 text-white',
  strategy: 'bg-red-600 text-white',
  analysis: 'bg-purple-600 text-white',
  'install-guide': 'bg-cyan-600 text-white',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-MY', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export default function BlogPage() {
  const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <nav className="mb-4 text-xs text-[color:var(--text-dim)]">
          <a href="/" className="hover:text-white">Home</a> / Blog
        </nav>

        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="gold-text">MEGAJOM Blog</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-[color:var(--text-dim)]">
            RTP deep-dives, promo teardowns, and strategy tests across Mega888, 918Kiss, and Pussy888.
            Updated regularly with data-backed analysis.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((p) => (
            <article
              key={p.slug}
              className="card group flex flex-col overflow-hidden p-6 transition hover:-translate-y-1 hover:border-[color:var(--gold)]"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                    TAG_COLORS[p.tag] ?? 'bg-slate-700 text-white'
                  }`}
                >
                  {p.tag}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[color:var(--gold)]">
                  {BRAND_LABEL[p.brand] ?? p.brand}
                </span>
              </div>
              <h2 className="text-lg font-bold leading-tight">{p.title}</h2>
              <p className="mt-3 flex-1 text-sm text-[color:var(--text-dim)]">{p.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-[color:var(--text-dim)]">
                <span>{formatDate(p.date)}</span>
                <span>{p.reading_time} min read</span>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-16 rounded-xl border border-[color:var(--border)] bg-gradient-to-br from-yellow-500/10 to-transparent p-8 text-center">
          <h2 className="text-2xl font-bold">More content coming weekly</h2>
          <p className="mt-2 text-sm text-[color:var(--text-dim)]">
            New posts published every few days. Meanwhile, browse our 30 daily game tips or live RTP tracker.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href="/tips/" className="btn-primary">Game Tips Library →</a>
            <a href="/rtp/" className="btn-secondary">Live RTP Tracker</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
