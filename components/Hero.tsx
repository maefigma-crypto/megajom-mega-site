import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border)]">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute -top-20 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(79,195,247,0.2),transparent_60%)]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-black/40 px-3 py-1 text-xs uppercase tracking-wider text-[color:var(--orange)]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Cuci Laju · Bonus Harian · 24/7 Support
        </div>
        <h1 className="section-title text-4xl md:text-6xl leading-tight text-balance">
          <span className="gold-text">MEGAJOM</span> — <span className="cyan-text">Mega888</span>
          {' · '}<span className="cyan-text">918Kiss</span>{' · '}
          <span className="cyan-text">Pussy888</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[color:var(--text-dim)] text-balance">
          Trusted Malaysia portal — live game tips, verified win proofs, 5-30 minute withdrawals,
          and the strategies Malaysian slot players use to cuci laju-laju.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/download/" className="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 3v14m0 0l-5-5m5 5l5-5M5 21h14" />
            </svg>
            Download
          </Link>
          <Link href="/tips/" className="btn-cyan">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l2.5 5.5L20 9l-4 3.9.9 5.6L12 16l-4.9 2.5.9-5.6L4 9l5.5-1.5L12 2z" />
            </svg>
            Tips
          </Link>
          <a href="#bukti-cuci" className="btn-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            Bukti Cuci
          </a>
        </div>

        <p className="mt-4 text-xs text-[color:var(--text-dim)]">
          For Malaysian players 18+ only. Play responsibly.
        </p>
      </div>
    </section>
  );
}
