import { SITE } from '@/lib/site';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border)]">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute -top-20 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,197,66,0.22),transparent_60%)]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-black/40 px-3 py-1 text-xs uppercase tracking-wider text-[color:var(--gold)]">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Live RTP updated every 2 hours
        </div>
        <h1 className="section-title text-4xl md:text-6xl leading-tight text-balance">
          <span className="gold-text">MEGAJOM</span> — Official{' '}
          <span className="text-white">Mega888, 918Kiss, Pussy888</span>{' '}
          Malaysia Portal
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[color:var(--text-dim)] text-balance">
          Live RTP tracker, verified APK downloads, iOS install guides, and the winning
          strategies Malaysian slot players use to beat the house. Play smart.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={SITE.downloads.androidApk} className="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 3v14m0 0l-5-5m5 5l5-5M5 21h14" />
            </svg>
            Android APK
          </a>
          <a href={SITE.downloads.ios} className="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.564 13.02c-.03-3.01 2.46-4.45 2.57-4.52-1.4-2.05-3.58-2.33-4.35-2.36-1.85-.19-3.61 1.09-4.55 1.09-.94 0-2.39-1.07-3.93-1.04-2.02.03-3.88 1.17-4.92 2.97-2.1 3.63-.53 9.01 1.5 11.96.99 1.44 2.18 3.06 3.72 3 1.49-.06 2.05-.97 3.86-.97 1.8 0 2.31.97 3.87.94 1.6-.03 2.61-1.46 3.58-2.91 1.13-1.67 1.6-3.29 1.62-3.37-.04-.02-3.11-1.19-3.15-4.79zM14.34 3.98c.82-1 1.37-2.38 1.22-3.76-1.18.05-2.6.79-3.45 1.78-.76.87-1.42 2.26-1.24 3.62 1.32.1 2.66-.67 3.47-1.64z" />
            </svg>
            iOS Install
          </a>
          <a href={SITE.downloads.web} className="btn-secondary">
            Web Version
          </a>
        </div>

        <p className="mt-4 text-xs text-[color:var(--text-dim)]">
          For Malaysian players 18+ only. Play responsibly.
        </p>
      </div>
    </section>
  );
}
