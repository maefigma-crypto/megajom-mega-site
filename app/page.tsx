import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PromotionSection from '@/components/PromotionSection';
import RandomPicker from '@/components/RandomPicker';
import RTPTracker from '@/components/RTPTracker';
import WinnerFeed from '@/components/WinnerFeed';
import BuktiCuci from '@/components/BuktiCuci';
import WithdrawalProof from '@/components/WithdrawalProof';
import GameGallery from '@/components/GameGallery';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { allGames, allRtp, rtpLive, winnerNames } from '@/lib/data';

export default function Home() {
  const games = allGames();
  const rtp = allRtp();
  const feedGames = games.map((g) => ({ name_en: g.name_en, brand: g.brand }));

  return (
    <>
      <Header />
      <main>
        <Hero />
        <PromotionSection />
        <RandomPicker games={games} />
        <RTPTracker
          entries={rtp}
          updatedAt={rtpLive.updated_at}
          nextUpdate={rtpLive.next_update}
          limit={10}
        />
        <WinnerFeed names={winnerNames} games={feedGames} />
        <BuktiCuci />
        <WithdrawalProof />
        <GameGallery games={games} />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
