import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PromotionSection from '@/components/PromotionSection';
import RandomPicker from '@/components/RandomPicker';
import BuktiCuci from '@/components/BuktiCuci';
import WithdrawalProof from '@/components/WithdrawalProof';
import GameGallery from '@/components/GameGallery';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { allGames } from '@/lib/data';

export default function Home() {
  const games = allGames();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <PromotionSection />
        <RandomPicker games={games} />
        <BuktiCuci />
        <WithdrawalProof />
        <GameGallery games={games} />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
