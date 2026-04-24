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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-black">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-b from-yellow-300 to-yellow-500 text-black">
            M
          </span>
          <span className="gold-text">MEGAJOM</span>
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
