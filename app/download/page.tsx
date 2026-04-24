import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Download Mega888 / 918Kiss / Pussy888 — Android & iOS | MEGAJOM',
  description:
    'Download Mega888, 918Kiss, and Pussy888 on Android APK or iPhone iOS. Latest 2026 builds, safe install, 2-minute setup. MEGAJOM Malaysia portal.',
  alternates: { canonical: '/download/' },
  keywords: [
    'mega888 download',
    'mega888 apk',
    '918kiss download',
    '918kiss apk',
    'pussy888 download',
    'pussy888 apk',
    'mega888 ios',
    '918kiss ios',
    'pussy888 ios',
    'megajom download',
  ],
  openGraph: {
    title: 'Download Mega888, 918Kiss, Pussy888 — MEGAJOM Malaysia',
    description: 'Android APK + iOS install for all 3 brands. Safe, fast, 2026 latest.',
    url: `${SITE.url}/download/`,
  },
};

const BRANDS = [
  {
    key: 'mega888',
    label: 'Mega888',
    logo: '/logos/mega888.png',
    tagline: 'Malaysia\'s #1 slot platform',
    bg: 'from-sky-500/30 via-blue-600/20 to-transparent',
    accent: 'border-sky-500/60 hover:border-sky-400',
    badge: 'bg-sky-500 text-white',
    downloads: {
      android: 'https://t.me/jommega_bot?start=adlinkjomcuci',
      ios: '/download/ios/',
      web: 'https://mega888.mobi',
    },
  },
  {
    key: 'kiss918',
    label: '918Kiss',
    logo: '/logos/918kiss.png',
    tagline: 'Legendary slot brand since 2018',
    bg: 'from-red-500/30 via-rose-600/20 to-transparent',
    accent: 'border-red-500/60 hover:border-red-400',
    badge: 'bg-red-600 text-white',
    downloads: {
      android: 'https://t.me/jommega_bot?start=adlinkjomcuci',
      ios: '/download/ios/',
      web: 'https://918kiss.mobi',
    },
  },
  {
    key: 'pussy888',
    label: 'Pussy888',
    logo: '/logos/pussy888.png',
    tagline: 'Premium live & slot experience',
    bg: 'from-purple-500/30 via-fuchsia-600/20 to-transparent',
    accent: 'border-purple-500/60 hover:border-purple-400',
    badge: 'bg-purple-600 text-white',
    downloads: {
      android: 'https://t.me/jommega_bot?start=adlinkjomcuci',
      ios: '/download/ios/',
      web: 'https://pussy888.mobi',
    },
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Download', item: `${SITE.url}/download/` },
  ],
};

function AndroidIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.523 15.34c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m-11.046 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m11.405-6.03l1.997-3.46a.416.416 0 00-.152-.566.416.416 0 00-.566.152l-2.02 3.499c-1.548-.706-3.286-1.1-5.14-1.1s-3.592.394-5.14 1.1l-2.02-3.5a.416.416 0 00-.566-.15.416.416 0 00-.152.566l1.997 3.46C2.688 10.85.856 13.74.5 17h23c-.356-3.26-2.188-6.15-5.618-7.69z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.564 13.02c-.03-3.01 2.46-4.45 2.57-4.52-1.4-2.05-3.58-2.33-4.35-2.36-1.85-.19-3.61 1.09-4.55 1.09-.94 0-2.39-1.07-3.93-1.04-2.02.03-3.88 1.17-4.92 2.97-2.1 3.63-.53 9.01 1.5 11.96.99 1.44 2.18 3.06 3.72 3 1.49-.06 2.05-.97 3.86-.97 1.8 0 2.31.97 3.87.94 1.6-.03 2.61-1.46 3.58-2.91 1.13-1.67 1.6-3.29 1.62-3.37-.04-.02-3.11-1.19-3.15-4.79zM14.34 3.98c.82-1 1.37-2.38 1.22-3.76-1.18.05-2.6.79-3.45 1.78-.76.87-1.42 2.26-1.24 3.62 1.32.1 2.66-.67 3.47-1.64z" />
    </svg>
  );
}

export default function DownloadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <nav className="mb-4 text-xs text-[color:var(--text-dim)]">
          <a href="/" className="hover:text-white">Home</a> / Download
        </nav>

        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="gold-text">Download</span> — Pick Your Brand
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-[color:var(--text-dim)]">
            Latest 2026 APK + iOS builds for Mega888, 918Kiss, and Pussy888.
            Safe install via MEGAJOM, no jailbreak required on iPhone.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {BRANDS.map((b) => (
            <div
              key={b.key}
              className={`card overflow-hidden border-2 transition ${b.accent}`}
            >
              <div className={`bg-gradient-to-br ${b.bg} px-6 py-8 text-center`}>
                <div className="mx-auto flex h-28 items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.logo}
                    alt={`${b.label} logo`}
                    className="h-full w-auto max-w-full object-contain drop-shadow-xl"
                  />
                </div>
                <p className="mt-3 text-xs text-[color:var(--text-dim)]">{b.tagline}</p>
              </div>

              <div className="p-5 space-y-3">
                <a
                  href={b.downloads.android}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-emerald-500 to-emerald-700 py-3 font-bold text-white transition hover:brightness-110"
                >
                  <AndroidIcon />
                  Android APK
                </a>
                <a
                  href={b.downloads.ios}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-slate-200 to-slate-400 py-3 font-bold text-black transition hover:brightness-110"
                >
                  <AppleIcon />
                  iOS Install Guide
                </a>
                <a
                  href={b.downloads.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-orange-400 to-orange-600 py-3 font-bold text-white transition hover:brightness-110"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Main di Web
                </a>
                <div className="pt-2 text-center">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${b.badge}`}>
                    Version 2026.4
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-16 rounded-xl border border-[color:var(--border)] bg-gradient-to-br from-yellow-500/10 to-transparent p-6 md:p-8">
          <h2 className="text-2xl font-bold">Which brand should I pick?</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3 text-sm text-[color:var(--text-dim)]">
            <div>
              <div className="font-bold text-white">Mega888</div>
              <p className="mt-1">Largest game catalog — 150+ slot titles including Great Blue, Fortune Panda, Highway Kings. Best all-rounder for new players.</p>
            </div>
            <div>
              <div className="font-bold text-white">918Kiss</div>
              <p className="mt-1">Legacy brand with loyal following. Best for classic 3-reel slots, angpao games, and Fei Long Zai Tian jackpots.</p>
            </div>
            <div>
              <div className="font-bold text-white">Pussy888</div>
              <p className="mt-1">Premium live casino experience + 120+ slots. Picks: Sun Wukong, Dragon Maiden, Lucky Little Gods for biggest jackpots.</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a href={SITE.ocs8SignupUrl} className="btn-primary">
              Daftar MEGAJOM — Main Semua 3 →
            </a>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="section-title">FAQ</h2>
          <div className="mt-6 space-y-3">
            <details className="card p-5">
              <summary className="cursor-pointer font-semibold">Is the download safe?</summary>
              <p className="mt-3 text-sm text-[color:var(--text-dim)]">
                Yes. All MEGAJOM-linked builds are checksum-verified against the official publisher. Avoid random Telegram groups or third-party mirror sites — repackaged malware does exist. Bookmark this page.
              </p>
            </details>
            <details className="card p-5">
              <summary className="cursor-pointer font-semibold">Can I install on iPhone without jailbreak?</summary>
              <p className="mt-3 text-sm text-[color:var(--text-dim)]">
                Yes. Apple blocks these apps from the Malaysian App Store but you can install via enterprise profile — takes about 2 minutes. Full step-by-step on our <a href="/download/ios/" className="text-[color:var(--gold)] hover:underline">iOS Install Guide</a>.
              </p>
            </details>
            <details className="card p-5">
              <summary className="cursor-pointer font-semibold">Do I need separate accounts per brand?</summary>
              <p className="mt-3 text-sm text-[color:var(--text-dim)]">
                One MEGAJOM account gives you access to all three brands. Sign up once, log in across Mega888, 918Kiss, and Pussy888 with the same credentials.
              </p>
            </details>
            <details className="card p-5">
              <summary className="cursor-pointer font-semibold">Which brand pays out fastest?</summary>
              <p className="mt-3 text-sm text-[color:var(--text-dim)]">
                Same payout speed across all three — MEGAJOM processes withdrawals within 5 minutes regardless of which brand you played. See <a href="/" className="text-[color:var(--gold)] hover:underline">Withdrawal Proof</a> on the homepage for recent examples.
              </p>
            </details>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
