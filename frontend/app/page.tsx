import { CustomCursor } from "@/components/CustomCursor";
import { HeroSection } from "@/components/sections/HeroSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ProcedureSection } from "@/components/sections/ProcedureSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <main>
        {/* H1 lives inside HeroSection */}
        <HeroSection />
        <BeforeAfterSection />
        <BenefitsSection />
        <ProcedureSection />
        <PricingSection />
        <TestimonialsSection />
        <LeadFormSection />
      </main>

      <footer className="border-t border-[rgba(201,169,110,0.2)] py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-cormorant text-2xl text-[var(--stone)]">
              Studio Peau
            </p>
            <p className="text-[var(--ash-light)] text-sm mt-2 font-dm-sans">
              B-12, Vasant Vihar, New Delhi — 110057
            </p>
            <p className="text-[var(--ash-light)] text-sm font-dm-sans">
              hello@studiopeau.in &nbsp;·&nbsp; +91 99999 99999
            </p>
          </div>
          <div className="text-right">
            <p className="label-tag mb-3">Certified Technicians</p>
            <p className="text-[var(--ash-light)] text-sm font-dm-sans">
              &copy; {new Date().getFullYear()} Studio Peau. All rights
              reserved.
            </p>
            <p className="text-[var(--ash-light)] text-xs mt-1 font-dm-sans">
              Lip Blushing in Delhi — Semi-Permanent Beauty
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
