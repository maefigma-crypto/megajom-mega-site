export default function AboutSection() {
  const trust = [
    { icon: '✓', title: 'Licensed', text: 'Regulated gaming operator' },
    { icon: '⟳', title: '24/7 Support', text: 'Telegram + WhatsApp agents' },
    { icon: '🛡', title: 'Secure Payment', text: 'FPX, e-wallet, bank-grade SSL' },
    { icon: '⚡', title: 'Fast Payout', text: 'Withdrawals within 5 minutes' },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="section-title">
            Why Choose <span className="gold-text">MEGAJOM</span>
          </h2>
          <div className="mt-4 space-y-4 text-[color:var(--text-dim)]">
            <p>
              MEGAJOM is Malaysia&apos;s trusted portal for <strong className="text-white">Mega888 Malaysia</strong>,{' '}
              <strong className="text-white">918Kiss download</strong> and{' '}
              <strong className="text-white">Pussy888 APK</strong> — the three most-played slot platforms
              in the MY market. We aggregate the{' '}
              <strong className="text-white">highest RTP</strong> games from each catalog,
              monitor jackpot pools in real time, and publish the weekly hot-zone reports that
              serious players use to maximize expected value.
            </p>
            <p>
              Every game on our platform is connected to the official H5 game servers. Deposits
              run through licensed Malaysian payment gateways (FPX, Touch &apos;n Go, Boost, bank
              transfer) so your <strong className="text-white">safe deposit</strong> clears within
              minutes. Withdrawals are processed 24/7 with a{' '}
              <strong className="text-white">fast withdrawal</strong> SLA of 5 minutes for
              verified accounts. No hidden rollover, no fine-print traps.
            </p>
            <p>
              Whether you&apos;re hunting the Great Blue free-spin whale bonus on Mega888, grinding
              Ocean King on 918Kiss, or chasing the Fortune Gods jackpot on Pussy888 — MEGAJOM is the
              Malaysia portal that gives you the data, downloads, and direct access. Sign up in
              under 30 seconds.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 content-start">
          {trust.map((t) => (
            <div key={t.title} className="card p-5">
              <div className="mb-2 text-3xl">{t.icon}</div>
              <div className="font-bold">{t.title}</div>
              <div className="text-sm text-[color:var(--text-dim)]">{t.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
