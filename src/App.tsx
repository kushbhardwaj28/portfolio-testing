import { PortfolioProvider } from '@/context/PortfolioContext';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { CareerPath } from '@/components/CareerPath';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { GameModal } from '@/components/GameModal';
import { CoinLayer } from '@/components/CoinLayer';
import { Toast } from '@/components/Toast';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="relative min-h-screen">
        <div className="bgfx" />
        <div className="grid3d" />
        <div className="scan" />
        <div className="vig" />
        <Nav />
        <main className="relative z-[2] max-w-[1120px] mx-auto px-[22px]">
          <Hero />
          <About />
          <CareerPath />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <GameModal />
        <CoinLayer />
        <Toast />
      </div>
    </PortfolioProvider>
  );
}
