// src/app/page.tsx
import { EmailSubscription } from '@/components/EmailSubscription';
import { HeroSection } from '@/components/HeroSection';
import { LatestInsights } from '@/components/LatestInsights';
import { TopTools } from '@/components/TopTools';
import { WhyChooseUs } from '@/components/WhyChooseUs';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LatestInsights />
      <TopTools />
      <WhyChooseUs />
      <EmailSubscription />
    </>
  );
}