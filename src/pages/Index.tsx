import PageLayout from "@/components/layout/PageLayout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import CTA from "@/components/home/CTA";

const Index = () => {
  return (
    <PageLayout>
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </PageLayout>
  );
};

export default Index;
