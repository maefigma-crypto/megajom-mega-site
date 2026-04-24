import Link from 'next/link';
import { SITE } from '@/lib/site';

const LINKS = [
  {
    title: 'Games',
    items: [
      { label: 'RTP Tracker', href: '/rtp/' },
      { label: 'Angpao Rate', href: '/rtp/angpao/' },
      { label: 'Free Spin', href: '/rtp/freespin/' },
      { label: 'Jackpot', href: '/rtp/jackpot/' },
    ],
  },
  {
    title: 'Downloads',
    items: [
      { label: 'Mega888', href: '/download/mega888/' },
      { label: '918Kiss', href: '/download/918kiss/' },
      { label: 'Pussy888', href: '/download/pussy888/' },
      { label: 'iOS Install Guide', href: '/download/ios/' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about/' },
      { label: 'Game Tips', href: '/tips/' },
      { label: 'Blog', href: '/blog/' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[color:var(--border)] bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="text-2xl font-black">
              <span className="gold-text">MEGAJOM</span>
            </div>
            <p className="mt-2 text-sm text-[color:var(--text-dim)]">{SITE.tagline}</p>
            <div className="mt-4 flex gap-2">
              <a href={SITE.telegram} className="btn-secondary !px-3 !py-2 text-sm">
                Telegram
              </a>
              <a href={SITE.whatsapp} className="btn-secondary !px-3 !py-2 text-sm">
                WhatsApp
              </a>
            </div>
          </div>
          {LINKS.map((group) => (
            <div key={group.title}>
              <div className="mb-3 text-sm font-bold uppercase tracking-wider text-[color:var(--gold)]">
                {group.title}
              </div>
              <ul className="space-y-2 text-sm">
                {group.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="text-[color:var(--text-dim)] hover:text-white">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--border)] pt-6 text-xs text-[color:var(--text-dim)]">
          <div>
            <span className="mr-2 inline-flex items-center rounded bg-red-600 px-2 py-0.5 font-bold text-white">
              18+
            </span>
            Gambling can be addictive. Play responsibly. For Malaysian players only.
          </div>
          <div>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
