import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star, Film, Gift, GraduationCap } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { PartnerCard } from '@/components/PartnerCard';
import { CTAButton } from '@/components/CTAButton';

gsap.registerPlugin(ScrollTrigger);

const PARTNER_TYPES = [
  {
    icon: Star,
    title: 'Product Features',
    description: 'Showcase your products to engaged turf professionals',
  },
  {
    icon: Film,
    title: 'Sponsored Series',
    description: 'Co-create content that resonates with our audience',
  },
  {
    icon: Gift,
    title: 'Giveaways',
    description: 'Run promotions and build brand awareness',
  },
  {
    icon: GraduationCap,
    title: 'Educational Content',
    description: 'Supplier spotlights and how-to collaborations',
  },
];

export const SponsorsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header reveal
    if (headerRef.current) {
      const children = headerRef.current.children;
      gsap.from(children, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }

    // Cards stagger
    if (cardsRef.current) {
      const children = cardsRef.current.children;
      gsap.from(children, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }

    // CTA reveal
    if (ctaRef.current) {
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: sectionRef });

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="bg-tge-black py-20 md:py-[120px] px-5 md:px-10"
    >
      <div className="max-w-4xl mx-auto">
        <div ref={headerRef}>
          <SectionHeader
            label="Partners"
            heading="Grow With TGE"
            description="The Groundsman's Eye is building a focused audience of groundsmen, greenkeepers, sports turf professionals, volunteers, clubs and suppliers. Partner with a brand that speaks directly to the people who matter."
          />
        </div>

        {/* Partnership Cards */}
        <div
          ref={cardsRef}
          className="flex flex-col md:flex-row gap-4 mt-10 justify-center"
        >
          {PARTNER_TYPES.map((partner) => (
            <PartnerCard key={partner.title} {...partner} />
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center mt-10">
          <CTAButton onClick={scrollToContact}>Partner With TGE</CTAButton>
        </div>
      </div>
    </section>
  );
};
