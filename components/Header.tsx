import Link from 'next/link';
import { SITE } from '@/lib/site';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/download/', label: 'Download' },
  { href: '/tips/', label: 'Game Tips' },
  { href: '/about/', label: 'About' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--bg)]/85 backdrop-blur">
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between px-4 md:h-28 lg:h-32">
        <Link href="/" className="flex items-center -my-2" aria-label="MEGAJOM Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/logo.png"
            alt="MEGAJOM"
            className="h-24 w-auto md:h-28 lg:h-36"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-[color:var(--text-dim)] hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>

        <a
          href={SITE.ocs8SignupUrl}
          className="btn-primary !px-5 !py-2 text-sm inline-flex items-center gap-1.5"
        >
          <span>🤖</span> Play Now
        </a>
      </div>
    </header>
  );
}
