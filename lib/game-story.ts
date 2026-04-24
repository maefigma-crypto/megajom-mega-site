import type { Game } from './data';
import { BRAND_LABEL } from './site';

const CATEGORY_LABEL: Record<string, string> = {
  slot: 'Slot Game',
  live: 'Live Casino Game',
  fish: 'Fish Shooter Game',
};

const TAG_INTRO: Record<string, string> = {
  'free-spin': 'With its trademark free-spin bonus round, this game rewards patience — the bonus trigger drops multi-spin payouts that routinely dwarf the base-game earnings.',
  jackpot: 'The progressive jackpot is the headline feature — a rising pool that can erase weeks of losses in a single spin when it finally hits.',
  angpao: 'Angpao drops — floating red-packet bonuses with instant multipliers — are the game\'s signature feature and the reason Malaysian players keep coming back.',
  wild: 'Stacked and expanding wilds do most of the heavy lifting here, turning modest winning lines into session-defining payouts.',
  dragon: 'The dragon theme is more than window-dressing — it drives the entire bonus mechanic, with dragon scatters triggering the highest-paying round.',
  asian: 'Asian cultural motifs and festival imagery anchor the visual style, while the math design favors frequent small wins over rare jackpots.',
  ocean: 'Ocean imagery and marine symbols dominate — the deep-sea bonus round is where players chase the big multiplier wins.',
  pirate: 'Pirate-themed adventure mechanics drive the bonus rounds — treasure-map features and cannon-fire multipliers add extra risk-reward layers.',
  egypt: 'Egyptian pyramid and pharaoh imagery power a tomb-pick bonus round that is consistently one of the highest-RTP features on the platform.',
  classic: 'A classic three-reel design with modern payout math — simple to play, moderate variance, good for bankroll-extension sessions.',
  sports: 'Sports-themed reels keep the visual energy high while the payout math stays straightforward — pick-me bonus rounds reward attentive play.',
  fish: 'As a fish shooter, skill-to-payout conversion matters more than luck — targeting the right fish at the right ammo cost is what separates winners from losers.',
  table: 'Classic table game mechanics, live-streamed to mobile. Side-bet options let skilled players edge the house more than the main wager alone.',
  halloween: 'The Halloween theme is seasonal but the base math is year-round — high variance with generous free-spin multipliers.',
  christmas: 'Christmas visuals with a bonus-heavy math model — Santa scatters trigger the free-spin round that carries 80%+ of the game\'s RTP realization.',
  bonus: 'The pick-me bonus round is the signature feature — skill-check moments where choice affects expected value.',
  mythology: 'Ancient mythology themes pair with high-variance free-spin rounds — long stretches of base-game, punctuated by session-making bonus hits.',
  warrior: 'Warrior-themed reels with combat-style bonus rounds — expanding wilds and weapon-multiplier features drive the big wins.',
  adventure: 'Adventure narrative runs through the bonus mechanic — each expansion unlocks new multiplier tiers up to the game\'s hard cap.',
};

const STRATEGY_BY_CATEGORY: Record<string, string> = {
  slot: [
    'Set a session budget that can survive at least 150-200 spins at your chosen bet. Slot variance needs sample size to realize published RTP.',
    'Avoid chasing losses by increasing bet size mid-session. The math is the same whether you bet RM 0.50 or RM 5 per spin — higher bet just accelerates bankroll burn.',
    'Triggered a bonus round? Don\'t change your bet size immediately after. The bonus reward scales with the bet that triggered it, not your next bet.',
    'Track session RTP on our /rtp/ page before you start. Playing a game in its current hot-zone window is not guaranteed profit but it is a small statistical edge.',
  ].join(' '),
  live: [
    'Live table games offer the highest base-game RTP on the platform (95-99%) but lowest variance — consistent small edges compound over long sessions.',
    'Avoid side bets unless you understand their specific RTP; most side bets sit below 93% RTP despite tempting payouts.',
    'Pick a single table and watch its pattern for 5-10 hands before committing chips. Live tables have genuine streak dynamics that can be read.',
    'Use the dealer breaks to pause your own play — continuous hands is where most players leak bankroll.',
  ].join(' '),
  fish: [
    'Fish shooters are skill-based. Upgrade your cannon gradually — starting at max ammo cost burns your bankroll before you can read fish patterns.',
    'Target mid-tier fish (crab, puffer, ray) for the best ammo-to-reward ratio. Boss fish look tempting but the variance is brutal.',
    'Avoid engaging bosses in the first 30 seconds of spawning. Their hit points reset if the room changes and you waste high-cost ammo.',
    'Play on less crowded tables when possible — fewer players means bigger share of the bonus round drops when they trigger.',
  ].join(' '),
};

export function buildGameStory(game: Game & { brand: string }) {
  const brandName = BRAND_LABEL[game.brand] ?? game.brand;
  const categoryLabel = CATEGORY_LABEL[game.category] ?? 'Casino Game';

  const tagIntro = game.tags
    .map((t) => TAG_INTRO[t])
    .filter(Boolean)
    .slice(0, 2)
    .join(' ');

  const intro =
    `${game.name_en} is a ${categoryLabel.toLowerCase()} in the ${brandName} catalog, ` +
    `available to Malaysian players through the MEGAJOM portal. ` +
    (tagIntro ||
      'It has earned a steady following among experienced Malaysian slot players for its balance of frequent small wins and occasional session-defining payouts.');

  const features = [
    `Base RTP: ${game.rtp_base.toFixed(1)}%`,
    `Category: ${categoryLabel}`,
    `Platform: ${brandName}`,
    game.tags.length ? `Themes: ${game.tags.join(', ')}` : null,
  ].filter(Boolean) as string[];

  const strategy = STRATEGY_BY_CATEGORY[game.category] ?? STRATEGY_BY_CATEGORY.slot;

  const rtpNote =
    `${game.name_en} publishes a base RTP of ${game.rtp_base.toFixed(1)}%. ` +
    `Session-level realized RTP will swing above and below that figure — our live tracker at ` +
    `/rtp/ shows the current 2-hour window. Over 500+ spin sessions, realized RTP tends to ` +
    `converge on the published base. Under 200 spins, it can vary wildly either direction.`;

  const faq = [
    {
      q: `What is the RTP of ${game.name_en}?`,
      a: `${game.name_en} has a published base RTP of ${game.rtp_base.toFixed(1)}%. Short-term session RTP varies significantly — check our live tracker for the current 2-hour window.`,
    },
    {
      q: `Is ${game.name_en} available in Malaysia?`,
      a: `Yes. ${game.name_en} runs on the ${brandName} platform and is available to Malaysian players through the MEGAJOM portal. Deposits in MYR via FPX, Touch 'n Go, Boost, and direct bank transfer.`,
    },
    {
      q: `How do I play ${game.name_en} on iPhone?`,
      a: `Use the ${brandName} iOS build from our /download/ios/ guide. Install takes under 2 minutes using Apple's enterprise profile system — no jailbreak required.`,
    },
    {
      q: `What's the maximum win on ${game.name_en}?`,
      a: `Maximum win varies by bet size. With free-spin multipliers and bonus rounds stacked, top-end single-spin wins exceed 1000x base bet on this title, though such hits are rare. Most sessions pay in the 2-5x range.`,
    },
  ];

  return { intro, features, strategy, rtpNote, faq };
}
