"use client";
import BenefitsSection from "@/components/page/home/benifit-section";
import { CTASection } from "@/components/page/home/cta-section";
import FAQ from "@/components/page/home/faq-section";
import HeroSection from "@/components/page/home/hero-section";
import LogosSection from "@/components/page/home/logos-section";
import { TestimonialSection } from "@/components/page/home/testimonials-section";
import Container from "@/components/section/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import Section from "@/components/section/section";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <main>
        <Header />
        <section>
          <HeroSection />
          <div className="relative sm:rounded-t-3xl lg:rounded-t-[50px] bg-white mb-20">
            <div className="absolute top-0 right-0 bg-[#9471f3] h-40 w-full -z-[1]" />
            <div className="flex z-20 w-full items-center justify-center translate-y-5">
              <LogosSection />
            </div>
          </div>

          <Container>
            <BenefitsSection />

            <Section
              id="testimonials"
              title="What Our Clients Say"
              description="Hear from those who have partnered with us."
            >
              <TestimonialSection />
            </Section>
            <FAQ />

            <CTASection />
          </Container>
        </section>
        <Footer />
      </main>
    </SessionProvider>
  );
}
