import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'How to Install Mega888 on iPhone (iOS Guide 2026)',
  description:
    'Step-by-step iPhone install guide for Mega888, 918Kiss, and Pussy888 — Apple doesn\'t allow these apps on the App Store, but this 2026 workaround takes under 2 minutes. Safe, tested.',
  alternates: { canonical: '/download/ios/' },
  keywords: [
    'mega888 ios',
    'mega888 iphone download',
    'mega888 ios install',
    '918kiss ios download',
    'pussy888 iphone',
    'install mega888 on iphone',
    'mega888 apple download 2026',
  ],
  openGraph: {
    title: 'Install Mega888 on iPhone — 2026 Guide',
    description: 'Step-by-step iOS install for Mega888, 918Kiss, Pussy888. 2-minute setup.',
    url: `${SITE.url}/download/ios/`,
  },
};

const FAQ = [
  {
    q: 'Why isn\'t Mega888 on the App Store?',
    a: 'Apple prohibits real-money gambling apps in its Malaysian App Store to comply with local regulatory requirements. This means Mega888, 918Kiss, and Pussy888 are distributed via enterprise certificate signing — a legitimate Apple mechanism that lets approved organizations distribute apps outside the App Store. The install is safe when you get the file from an official source like MEGAJOM.',
  },
  {
    q: 'Is it safe to install Mega888 on iPhone?',
    a: 'Yes, when you download from MEGAJOM\'s official mirror. We verify every build against the publisher checksum before hosting. Avoid third-party Telegram groups or random Google results — malicious repackaged versions exist and can steal credentials. Bookmark this page for future updates.',
  },
  {
    q: 'Do I need to jailbreak my iPhone?',
    a: 'No. The install uses Apple\'s built-in enterprise profile system — no jailbreak required. Your device warranty and iOS updates remain fully intact.',
  },
  {
    q: 'Will Apple revoke the certificate?',
    a: 'Occasionally Apple revokes enterprise certificates in bulk sweeps. If your app suddenly stops opening and shows "Untrusted Enterprise Developer", re-visit this page — we publish a new signed build within 24 hours of any revocation. Your saved MEGAJOM account is unaffected; you just need to reinstall.',
  },
  {
    q: 'Does it work on iPhone 15 / 16? iOS 17 / 18?',
    a: 'Yes, the 2026 build is compatible with iPhone 8 through iPhone 16 Pro Max, running iOS 14 through iOS 18. iPad and iPad Pro also supported in landscape mode.',
  },
  {
    q: 'Can I deposit money through the iOS app?',
    a: 'Yes. Deposits are processed through the MEGAJOM web wallet, not directly through the iOS app. Once logged in, tap the Deposit button inside the app — it opens the in-app browser to the FPX / Touch \'n Go / Boost / bank transfer gateway. Funds arrive in your wallet within 1-3 minutes.',
  },
  {
    q: 'What if the app won\'t open after install?',
    a: 'You need to trust the enterprise developer certificate first. Go to iPhone Settings → General → VPN & Device Management → find the MEGAJOM profile → tap Trust. After that, launch the app from the home screen. This one-time step is explained in step 4 below.',
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
    { '@type': 'ListItem', position: 2, name: 'Download', item: `${SITE.url}/download/mega888/` },
    { '@type': 'ListItem', position: 3, name: 'iOS Install', item: `${SITE.url}/download/ios/` },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Install Mega888 on iPhone',
  description: 'Install Mega888, 918Kiss, or Pussy888 on iPhone/iPad using enterprise profile distribution. No jailbreak required.',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'iPhone with iOS 14+' }],
  step: [
    { '@type': 'HowToStep', name: 'Tap Install on iPhone Safari', text: 'Open this page in Safari (not Chrome) and tap the Install Mega888 iOS button below. Safari is required for enterprise profile install.' },
    { '@type': 'HowToStep', name: 'Allow configuration profile', text: 'When Safari prompts "This website is trying to open Settings", tap Allow. The profile downloads automatically.' },
    { '@type': 'HowToStep', name: 'Open Settings and install profile', text: 'Open iPhone Settings app, tap the MEGAJOM Profile banner at the top, then tap Install in the top-right corner. Enter your passcode.' },
    { '@type': 'HowToStep', name: 'Trust the enterprise developer', text: 'Go to Settings > General > VPN & Device Management, tap the MEGAJOM entry, and tap Trust.' },
    { '@type': 'HowToStep', name: 'Launch Mega888 from home screen', text: 'Return to home screen, find the Mega888 icon, and tap to launch. Login with your MEGAJOM account.' },
  ],
};

const STEPS = [
  {
    num: 1,
    title: 'Tap the iOS Install button in Safari',
    body: 'Open this page in Safari on your iPhone — not Chrome, not Brave, not any third-party browser. Apple only allows enterprise profile installs from Safari. Scroll down to the blue Install button and tap it.',
    note: 'If you\'re reading this on Android or desktop, text this page\'s URL to yourself and open on iPhone.',
  },
  {
    num: 2,
    title: 'Allow the configuration profile',
    body: 'Safari will pop up a dialog: "This website is trying to show a configuration profile. Do you want to allow this?" Tap Allow. The download completes in about 5 seconds.',
    note: 'If you see "Profile download failed", your VPN may be blocking — switch it off temporarily.',
  },
  {
    num: 3,
    title: 'Install the profile in Settings',
    body: 'Close Safari. Open your iPhone Settings app. At the very top (above your Apple ID), you\'ll see "Profile Downloaded". Tap it. Then tap Install (top-right corner), enter your iPhone passcode, and confirm Install again.',
    note: 'On some iOS versions, the Profile entry appears under Settings > General > VPN & Device Management.',
  },
  {
    num: 4,
    title: 'Trust the MEGAJOM enterprise developer',
    body: 'This is the step that trips most people. Go to Settings > General > VPN & Device Management. Tap the MEGAJOM entry (it will say "Not Trusted" in red). Tap "Trust MEGAJOM", then confirm Trust in the pop-up.',
    note: 'Skip this step and the app icon will appear but refuse to open.',
  },
  {
    num: 5,
    title: 'Launch Mega888 and log in',
    body: 'Return to your home screen. The Mega888 icon appears alongside your other apps. Tap it — the app launches, you log in with your MEGAJOM account (or sign up if new), and you\'re playing within 30 seconds.',
    note: 'Android users: use the APK download at /download/android-apk/ instead.',
  },
];

export default function IOSDownloadPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <nav className="mb-4 text-xs text-[color:var(--text-dim)]">
          <a href="/" className="hover:text-white">Home</a> / Download / iOS Install Guide
        </nav>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
          How to Install <span className="gold-text">Mega888 on iPhone</span> — iOS Guide 2026
        </h1>

        <p className="mt-5 text-lg text-[color:var(--text-dim)]">
          Apple removed Mega888, 918Kiss, and Pussy888 from the Malaysian App Store. But Malaysian
          players install them on iPhone every day — using Apple&apos;s built-in enterprise profile
          system. This guide walks you through the install in under 2 minutes. No jailbreak. Updated
          for iOS 18 and iPhone 16.
        </p>

        <div className="mt-8 rounded-xl border-2 border-[color:var(--gold)] bg-gradient-to-br from-yellow-500/10 to-transparent p-6 text-center">
          <p className="text-sm text-[color:var(--text-dim)]">Open this page in Safari, then tap:</p>
          <a href={SITE.downloads.ios} className="btn-primary mt-3 w-full text-lg md:w-auto md:px-10">
            Install Mega888 iOS →
          </a>
          <p className="mt-3 text-xs text-[color:var(--text-dim)]">
            Version 2026.4 • Apple enterprise certificate • 47 MB
          </p>
        </div>

        <section className="mt-12">
          <h2 className="section-title">5 Steps to Install</h2>
          <ol className="mt-6 space-y-5">
            {STEPS.map((s) => (
              <li key={s.num} className="card flex gap-5 p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-lg font-black text-black">
                  {s.num}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-[color:var(--text-dim)]">{s.body}</p>
                  {s.note && (
                    <p className="mt-3 rounded-md border-l-2 border-[color:var(--gold)] bg-black/30 p-3 text-xs text-[color:var(--text-dim)]">
                      <span className="font-bold text-[color:var(--gold)]">Tip:</span> {s.note}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12">
          <div className="card bg-gradient-to-br from-yellow-500/10 to-transparent p-6">
            <h2 className="text-xl font-bold">Prefer no install? Play the Web Version.</h2>
            <p className="mt-2 text-sm text-[color:var(--text-dim)]">
              If you don&apos;t want to go through the enterprise profile install, every Mega888,
              918Kiss, and Pussy888 game also runs in the iPhone Safari browser directly — no
              download, no profile. Performance is slightly lower but it works on any iOS version.
            </p>
            <a href={SITE.downloads.web} className="btn-secondary mt-4">
              Play in Safari (No Install) →
            </a>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="section-title">iOS Install FAQ</h2>
          <div className="mt-6 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="card p-5">
                <summary className="cursor-pointer font-semibold text-white">{f.q}</summary>
                <p className="mt-3 text-[color:var(--text-dim)]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="section-title">Still stuck? Get human help.</h2>
          <p className="mt-2 text-sm text-[color:var(--text-dim)]">
            MEGAJOM support agents run a 24/7 Telegram helpdesk for iOS install issues. Message
            us with your iPhone model + iOS version and we&apos;ll walk you through live.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={SITE.telegram} className="btn-primary">Telegram Support</a>
            <a href={SITE.whatsapp} className="btn-secondary">WhatsApp Support</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
