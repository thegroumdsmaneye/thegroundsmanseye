import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Eye, BookOpen, Handshake, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  { icon: Eye, label: 'Insight' },
  { icon: BookOpen, label: 'Education' },
  { icon: Handshake, label: 'Respect' },
  { icon: Star, label: 'Excellence' },
];

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Text content staggered reveal
    if (textRef.current) {
      const children = textRef.current.children;
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

    // Divider scale
    if (dividerRef.current) {
      gsap.from(dividerRef.current, {
        scaleX: 0,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }

    // Values stagger
    if (valuesRef.current) {
      const children = valuesRef.current.children;
      gsap.from(children, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
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
      id="about"
      ref={sectionRef}
      className="bg-tge-black py-20 md:py-[120px] px-5 md:px-10"
    >
      <div className="max-w-2xl mx-auto">
        <div ref={textRef}>
          <span className="block text-center font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-lime">
            About TGE
          </span>
          <h2 className="text-center font-oswald font-semibold text-4xl md:text-6xl uppercase text-tge-white mt-4 leading-[1]">
            Beyond The Game. Behind The Pitch.
          </h2>
          <p className="text-center font-inter text-[15px] md:text-base text-tge-grey-text mt-6 leading-relaxed">
            The Groundsman&apos;s Eye is sports turf media with a different perspective.
            We cover real turf problems across football pitches, golf courses, and grassroots
            clubs — the stuff that keeps groundsmen, greenkeepers, and volunteers up at night.
          </p>
          <p className="text-center font-inter text-[15px] md:text-base text-tge-grey-text mt-4 leading-relaxed">
            From machinery breakdowns and drainage disasters to weather battles, renovations,
            and matchday preparation — we show what fans don&apos;t see. Real stories, real
            problems, real solutions.
          </p>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="w-[60px] h-0.5 bg-tge-lime mx-auto mt-10 origin-center"
        />

        {/* Values */}
        <div
          ref={valuesRef}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10"
        >
          {VALUES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon className="w-5 h-5 text-tge-lime" strokeWidth={1.5} />
              <span className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-white">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
