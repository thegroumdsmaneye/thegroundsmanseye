import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Stethoscope,
  AlertTriangle,
  Wrench,
  CloudSun,
  Shield,
  RotateCcw,
  Users,
  TreePine,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';
import { SeriesCard } from '@/components/SeriesCard';

gsap.registerPlugin(ScrollTrigger);

const SERIES_DATA = [
  {
    icon: Stethoscope,
    title: 'Pitch Clinic',
    description: 'Real turf problems investigated. Digging into the cause, not just the symptom.',
    tag: 'Diagnosis',
  },
  {
    icon: AlertTriangle,
    title: 'Red Card',
    description: 'Common mistakes in turf maintenance that every groundsman needs to avoid.',
    tag: 'Warnings',
  },
  {
    icon: Wrench,
    title: "Groundsman's Tool Box",
    description: 'Tools, machinery, and equipment that keep pitches in top condition.',
    tag: 'Machinery',
  },
  {
    icon: CloudSun,
    title: 'Weather Watch',
    description: 'How weather impacts surfaces and what to do before, during, and after.',
    tag: 'Forecast',
  },
  {
    icon: Shield,
    title: 'Matchday Watch',
    description: 'Preparation and pitch protection when it matters most.',
    tag: 'Matchday',
  },
  {
    icon: RotateCcw,
    title: 'Renovation Watch',
    description: 'Scarifying, aeration, sand, seed and the full recovery process.',
    tag: 'Renovation',
  },
  {
    icon: Users,
    title: 'Grassroots Eye',
    description: 'Club and volunteer stories from the front lines of community sport.',
    tag: 'Community',
  },
  {
    icon: TreePine,
    title: "Greenkeeper's Eye",
    description: 'Golf turf and fine turf insight from the people who manicure it.',
    tag: 'Golf',
  },
  {
    icon: HelpCircle,
    title: 'Problem Solver',
    description: 'What would you do? Interactive challenges and real-world solutions.',
    tag: 'Challenges',
  },
  {
    icon: MessageSquare,
    title: 'Story Time',
    description: 'Real moments from the job — the good, the bad, and the muddy.',
    tag: 'Stories',
  },
];

export const SeriesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

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
    if (scrollContainerRef.current) {
      const cards = scrollContainerRef.current.querySelectorAll('.snap-start');
      gsap.from(cards, {
        opacity: 0,
        x: 40,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: sectionRef });

  // Track scroll position for dot indicator
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;
      const progress = scrollLeft / maxScroll;
      const dotIndex = Math.round(progress * (SERIES_DATA.length - 1));
      setActiveDot(Math.min(dotIndex, SERIES_DATA.length - 1));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="series"
      ref={sectionRef}
      className="bg-tge-dark-green py-20 md:py-[120px]"
    >
      {/* Header */}
      <div ref={headerRef} className="px-5 md:px-10 mb-12">
        <span className="block font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-lime">
          Content Series
        </span>
        <h2 className="font-oswald font-semibold text-4xl md:text-6xl uppercase text-tge-white mt-3 leading-[1]">
          10 Series. One Mission.
        </h2>
        <p className="font-inter text-base md:text-xl text-tge-grey-text mt-4 max-w-xl leading-relaxed">
          Real turf content for real turf people. From pitch investigations to weather
          breakdowns, toolbox talks to grassroots stories.
        </p>
      </div>

      {/* Horizontal scrolling cards */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        style={{ scrollPaddingLeft: '20px', scrollPaddingRight: '20px' }}
      >
        {/* Spacer for first card alignment */}
        <div className="flex-shrink-0 w-5 md:w-10" />
        {SERIES_DATA.map((series, index) => (
          <SeriesCard key={index} {...series} />
        ))}
        {/* Spacer for last card breathing room */}
        <div className="flex-shrink-0 w-5 md:w-10" />
      </div>

      {/* Dot indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {SERIES_DATA.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === activeDot ? 'bg-tge-lime' : 'bg-tge-green-muted'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
