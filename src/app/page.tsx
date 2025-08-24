import { Navigation } from '@/components/landing/navigation';
import { HeroSection } from '@/components/landing/hero-section';
import { ProblemSection } from '@/components/landing/problem-section';
import { SolutionSection } from '@/components/landing/solution-section';
import { ProductSection } from '@/components/landing/product-section';
import { MarketSizeSection } from '@/components/landing/market-size-section';
import { TargetSection } from '@/components/landing/target-section';
import { ValuePropSection } from '@/components/landing/value-prop-section';
import { AskSection } from '@/components/landing/ask-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ProductSection />
      <MarketSizeSection />
      <TargetSection />
      <ValuePropSection />
      <AskSection />
      <HowItWorksSection />
      <Footer />
    </>
  );
}
