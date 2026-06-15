import React from 'react';
import { Navigation } from '@/sections/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { SeriesSection } from '@/sections/SeriesSection';
import { FeaturedEpisodeSection } from '@/sections/FeaturedEpisodeSection';
import { OnTourSection } from '@/sections/OnTourSection';
import { JoinListSection } from '@/sections/JoinListSection';
import { CommunitySection } from '@/sections/CommunitySection';
import { ResourcesSection } from '@/sections/ResourcesSection';
import { SponsorsSection } from '@/sections/SponsorsSection';
import { ContactSection } from '@/sections/ContactSection';
import { Footer } from '@/sections/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-tge-black">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SeriesSection />
        <FeaturedEpisodeSection />
        <OnTourSection />
        <JoinListSection />
        <CommunitySection />
        <ResourcesSection />
        <SponsorsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
