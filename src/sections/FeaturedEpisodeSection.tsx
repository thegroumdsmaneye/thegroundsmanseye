import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Check } from 'lucide-react';
import { CTAButton } from '@/components/CTAButton';

gsap.registerPlugin(ScrollTrigger);

const EPISODE_DETAILS = [
  'Soil profile analysis',
  'Anaerobic condition identification',
  'Drainage system investigation',
  'Interactive problem-solving challenge',
];

export const FeaturedEpisodeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Image slide in from left
    if (imageRef.current) {
      gsap.from(imageRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }

    // Content slide in from right with staggered children
    if (contentRef.current) {
      const children = contentRef.current.children;
      gsap.from(children, {
        opacity: 0,
        x: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="bg-tge-black py-20 md:py-[120px] px-5 md:px-10"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center">
        {/* Image Column */}
        <div ref={imageRef} className="w-full md:w-[55%] relative">
          <div className="relative rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <img
              src="/pitch-clinic.jpg"
              alt="Pitch Clinic: The Mystery Wet Area"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            {/* Featured badge */}
            <div className="absolute top-4 left-4 bg-tge-lime text-tge-black font-inter font-medium text-xs uppercase tracking-[0.08em] px-3 py-1.5 rounded">
              Featured
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div ref={contentRef} className="w-full md:w-[45%]">
          <span className="block font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-lime">
            Pitch Clinic
          </span>
          <h2 className="font-oswald font-semibold text-3xl md:text-5xl uppercase text-tge-white mt-3 leading-[1]">
            #002: The Mystery Wet Area
          </h2>
          <p className="font-inter text-[15px] md:text-base text-tge-grey-text mt-4 leading-relaxed">
            A real wet area investigation showing soil layers, anaerobic conditions,
            old sand slits, gravel bands, perched water and the question every
            groundsman asks — what would you do next?
          </p>

          {/* Episode details */}
          <div className="flex flex-col gap-3 mt-6">
            {EPISODE_DETAILS.map((detail) => (
              <div key={detail} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-tge-lime flex-shrink-0" strokeWidth={2.5} />
                <span className="font-inter text-sm md:text-[15px] text-tge-white">
                  {detail}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <CTAButton onClick={() => {
              const el = document.querySelector('#contact');
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 60;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}>
              Watch This Episode
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};
