import { HeroSection } from './LandingPage/sections/HeroSection';
import { TwinShowcase } from './LandingPage/sections/TwinShowcase';
import { FeatureHighlights } from './LandingPage/sections/FeatureHighlights';
import { HowItWorks } from './LandingPage/sections/HowItWorks';
import { FAQSection } from './LandingPage/sections/FAQSection';
import { FooterSection } from './LandingPage/sections/FooterSection';
import { NotificationWidget } from './LandingPage/sections/NotificationWidget';

export function LandingPage() {
  return (
    <div className="w-full flex flex-col gap-12 md:gap-16 lg:gap-24">
      <HeroSection />
      <TwinShowcase />
      <FeatureHighlights />
      <HowItWorks />
      <FAQSection />
      <FooterSection />
      <NotificationWidget />
    </div>
  );
}

export default LandingPage;
