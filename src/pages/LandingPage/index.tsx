import { HeroSection } from './sections/HeroSection';
import { TwinShowcase } from './sections/TwinShowcase';
import { FeatureHighlights } from './sections/FeatureHighlights';
import { HowItWorks } from './sections/HowItWorks';
import { FAQSection } from './sections/FAQSection';
import { FooterSection } from './sections/FooterSection';
import { NotificationWidget } from './sections/NotificationWidget';

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
