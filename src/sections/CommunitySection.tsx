import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  AlertTriangle,
  Camera,
  Wrench,
  RotateCcw,
  Users,
  Shield,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { SubmissionTypeCard } from '@/components/SubmissionTypeCard';
import { CTAButton } from '@/components/CTAButton';

gsap.registerPlugin(ScrollTrigger);

const SUBMISSION_TYPES = [
  { icon: AlertTriangle, label: 'Pitch Problems' },
  { icon: Camera, label: 'Before & Afters' },
  { icon: Wrench, label: 'Machinery Setups' },
  { icon: RotateCcw, label: 'Renovation Work' },
  { icon: Users, label: 'Grassroots Stories' },
  { icon: Shield, label: 'Matchday Prep Clips' },
];

export const CommunitySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
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

    // Grid items stagger
    if (gridRef.current) {
      const children = gridRef.current.children;
      gsap.from(children, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        stagger: 0.06,
        duration: 0.5,
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

  const scrollToOnTour = () => {
    const el = document.querySelector('#ontour');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="community"
      ref={sectionRef}
      className="bg-tge-dark-green py-20 md:py-[120px] px-5 md:px-10"
    >
      <div className="max-w-3xl mx-auto">
        <div ref={headerRef}>
          <SectionHeader
            label="Community"
            heading="Your Pitch. Your Story."
            description="We want to hear from you. Send us your pitch problems, before and afters, machinery setups, renovation work, grassroots stories, and matchday prep clips."
          />
        </div>

        {/* Submission Types Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10"
        >
          {SUBMISSION_TYPES.map(({ icon, label }) => (
            <SubmissionTypeCard key={label} icon={icon} label={label} />
          ))}
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <CTAButton onClick={scrollToContact}>Send Your Story</CTAButton>
          <CTAButton variant="secondary" onClick={scrollToOnTour}>
            Apply To Be Featured
          </CTAButton>
        </div>
      </div>
    </section>
  );
};
