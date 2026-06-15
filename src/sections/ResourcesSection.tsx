import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  FileText,
  ClipboardCheck,
  CalendarDays,
  BookOpen,
  Lock,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const RESOURCES = [
  {
    icon: FileText,
    title: 'Pitch Maintenance Templates',
    description: 'Standardised templates for daily, weekly, and monthly pitch maintenance tracking.',
  },
  {
    icon: ClipboardCheck,
    title: 'Matchday Checklists',
    description: 'Step-by-step checklists to ensure your pitch is match-ready every time.',
  },
  {
    icon: CalendarDays,
    title: 'Renovation Planners',
    description: 'Seasonal renovation timelines and planners to keep your pitch in top condition.',
  },
  {
    icon: BookOpen,
    title: 'Grassroots Pitch Guides',
    description: 'Practical guides for volunteers and clubs managing pitches with limited resources.',
  },
];

export const ResourcesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

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

    if (gridRef.current) {
      const children = gridRef.current.children;
      gsap.from(children, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        stagger: 0.08,
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
      id="resources"
      ref={sectionRef}
      className="bg-tge-dark-green py-20 md:py-[120px] px-5 md:px-10"
    >
      <div className="max-w-4xl mx-auto">
        <div ref={headerRef}>
          <SectionHeader
            label="Resources"
            heading="Digital Resources Coming Soon"
            description="Pitch templates, maintenance checklists, matchday sheets, renovation planners, and downloadable guides will be available soon."
          />
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-12"
        >
          {RESOURCES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="relative bg-tge-charcoal border border-tge-green-muted/30 rounded-xl p-6 transition-all duration-300 hover:border-tge-lime/30"
            >
              {/* Coming Soon badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-tge-green-muted/60 rounded-full px-3 py-1">
                <Lock className="w-3 h-3 text-tge-lime/70" strokeWidth={2} />
                <span className="font-inter font-medium text-[10px] uppercase tracking-[0.08em] text-tge-lime/70">
                  Coming Soon
                </span>
              </div>

              <Icon className="w-8 h-8 text-tge-lime" strokeWidth={1.5} />
              <h3 className="font-oswald font-semibold text-lg uppercase text-tge-white mt-4 leading-tight">
                {title}
              </h3>
              <p className="font-inter text-sm text-tge-grey-text mt-2 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Coming soon buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <button
            disabled
            className="bg-transparent border border-tge-green-muted/40 text-tge-grey-text/50 font-inter font-semibold text-sm uppercase tracking-[0.06em] rounded-lg px-6 py-3 cursor-not-allowed"
          >
            Templates Coming Soon
          </button>
          <button
            disabled
            className="bg-transparent border border-tge-green-muted/40 text-tge-grey-text/50 font-inter font-semibold text-sm uppercase tracking-[0.06em] rounded-lg px-6 py-3 cursor-not-allowed"
          >
            Digital Guides Coming Soon
          </button>
        </div>
      </div>
    </section>
  );
};
