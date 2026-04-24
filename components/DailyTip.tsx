import Link from 'next/link';
import { todayTip, allGames } from '@/lib/data';
import { BRAND_LABEL } from '@/lib/site';

export default function DailyTip() {
  const tip = todayTip();
  const game = allGames().find((g) => g.id === tip.game);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h2 className="section-title text-center">
        Today&apos;s <span className="gold-text">Winning Strategy</span>
      </h2>

      <div className="card mx-auto mt-6 flex max-w-3xl flex-col overflow-hidden md:flex-row">
        <div className="h-56 w-full flex-shrink-0 bg-gradient-to-br from-yellow-600 to-red-700 md:h-auto md:w-56">
          {game?.image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={game.image} alt={game.name_en} className="h-full w-full object-cover" />
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="text-xs uppercase tracking-widest text-[color:var(--gold)]">
            Daily tip • Day {tip.day}
          </div>
          <h3 className="mt-2 text-2xl font-bold">{game?.name_en ?? tip.game}</h3>
          <div className="text-xs text-[color:var(--text-dim)]">
            {BRAND_LABEL[tip.brand]}
          </div>
          <p className="mt-3 text-[color:var(--text-dim)]">{tip.tip_short}</p>
          <div className="mt-auto pt-5">
            <Link href="/tips/" className="btn-secondary">
              Browse all strategies →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
