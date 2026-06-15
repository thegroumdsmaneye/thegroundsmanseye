import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin } from 'lucide-react';
import { CTAButton } from '@/components/CTAButton';

gsap.registerPlugin(ScrollTrigger);

export const OnTourSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;
    const children = contentRef.current.children;
    gsap.from(children, {
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
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
      id="ontour"
      ref={sectionRef}
      className="relative py-20 md:py-[120px] px-5 md:px-10 overflow-hidden"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/hero-groundsman.jpg)', backgroundPosition: 'center 60%' }}
      />
      <div className="absolute inset-0 bg-tge-black/80" />

      <div ref={contentRef} className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-tge-lime" strokeWidth={1.5} />
          <span className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-lime">
            On Tour
          </span>
        </div>

        <h2 className="font-oswald font-semibold text-4xl md:text-6xl uppercase text-tge-white leading-[1]">
          Groundsman&apos;s Eye: On Tour
        </h2>

        <p className="font-inter text-base md:text-lg text-tge-grey-text mt-5 leading-relaxed">
          We&apos;re travelling around Ireland showcasing the people behind the pitches —
          football, GAA, rugby, golf, schools, councils, and grassroots clubs.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {['Football', 'GAA', 'Rugby', 'Golf', 'Schools', 'Clubs'].map((tag) => (
            <span
              key={tag}
              className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-lime/70 border border-tge-lime/30 rounded-full px-4 py-1.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8">
          <CTAButton onClick={scrollToContact}>Apply To Be Featured</CTAButton>
        </div>
      </div>
    </section>
  );
};
