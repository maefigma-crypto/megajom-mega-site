import Header from '@/components/Header';
import Hero from '@/components/Hero';
import RTPTracker from '@/components/RTPTracker';
import RandomPicker from '@/components/RandomPicker';
import WinnerFeed from '@/components/WinnerFeed';
import BuktiCuci from '@/components/BuktiCuci';
import WithdrawalProof from '@/components/WithdrawalProof';
import GameGallery from '@/components/GameGallery';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { allGames, allRtp, rtpLive, winnerNames } from '@/lib/data';

export default function Home() {
  const rtp = allRtp();
  const games = allGames();
  const feedGames = games.map((g) => ({ name_en: g.name_en, brand: g.brand }));

  return (
    <>
      <Header />
      <main>
        <Hero />
        <RTPTracker
          entries={rtp}
          updatedAt={rtpLive.updated_at}
          nextUpdate={rtpLive.next_update}
        />
        <RandomPicker games={games} />
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
