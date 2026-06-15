import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CTAButton } from '@/components/CTAButton';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !overlayRef.current || !contentRef.current) return;

    // Scroll-driven darkening overlay
    gsap.to(overlayRef.current, {
      opacity: 0.7,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Content fade-in animations
    const label = contentRef.current.querySelector('.hero-label');
    const headline = contentRef.current.querySelector('.hero-headline');
    const subheading = contentRef.current.querySelector('.hero-subheading');
    const ctas = contentRef.current.querySelector('.hero-ctas');

    if (label) {
      gsap.from(label, { opacity: 0, y: 20, duration: 0.6, delay: 0.2 });
    }
    if (headline) {
      gsap.from(headline, { opacity: 0, y: 30, duration: 0.8, delay: 0.4 });
    }
    if (subheading) {
      gsap.from(subheading, { opacity: 0, y: 20, duration: 0.6, delay: 0.6 });
    }
    if (ctas) {
      gsap.from(ctas, { opacity: 0, y: 20, duration: 0.6, delay: 0.8 });
    }
  }, { scope: sectionRef });

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/hero-groundsman.jpg)',
          backgroundPosition: 'center 30%',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-tge-black/30 to-tge-black/85" />

      {/* Scroll-driven darkening overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-tge-black pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 px-5 md:px-10 pb-[15vh] max-w-4xl"
      >
        <span className="hero-label block font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-lime mb-4">
          Sports Turf Media
        </span>

        <h1 className="hero-headline font-oswald font-bold text-5xl md:text-7xl lg:text-[96px] uppercase text-tge-white leading-[0.95]">
          Sports Turf Through A Different Lens
        </h1>

        <p className="hero-subheading font-inter text-base md:text-xl text-tge-grey-text mt-5 max-w-xl leading-relaxed">
          Pitch problems, machinery, renovations, matchday prep and the people behind the surfaces.
        </p>

        <div className="hero-ctas flex flex-wrap gap-3 mt-8">
          <CTAButton onClick={() => scrollToSection('#featured')}>
            Watch Latest Pitch Clinic
          </CTAButton>
          <CTAButton variant="secondary" onClick={() => scrollToSection('#community')}>
            Send Your Pitch Story
          </CTAButton>
          <CTAButton variant="ghost" onClick={() => scrollToSection('#footer')}>
            Follow on Socials
          </CTAButton>
        </div>
      </div>

      {/* Social Icons - desktop only */}
      <div className="hidden md:flex absolute bottom-6 right-10 z-10 items-center gap-4">
        {[
          { name: 'TikTok', href: 'https://www.tiktok.com/@thegroundsmanseye' },
          { name: 'Instagram', href: 'https://www.instagram.com/thegroundsmanseye/' },
          { name: 'Facebook', href: 'https://www.facebook.com/thegroundsmanseye/' },
          { name: 'YouTube', href: 'https://www.youtube.com/@thegroundsmanseye' },
        ].map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-grey-text hover:text-tge-lime transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-tge-lime rounded px-1"
            aria-label={social.name}
          >
            {social.name}
          </a>
        ))}
      </div>
    </section>
  );
};
