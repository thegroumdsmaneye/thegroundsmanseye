import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CONTENT_LINKS = [
  { label: 'Pitch Clinic', href: '#series' },
  { label: 'On Tour', href: '#ontour' },
  { label: 'Resources', href: '#resources' },
];

const COMMUNITY_LINKS = [
  { label: 'Submit Story', href: '#community' },
  { label: 'Partner With TGE', href: '#sponsors' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { name: 'TikTok', href: 'https://www.tiktok.com/@thegroundsmanseye' },
  { name: 'Instagram', href: 'https://www.instagram.com/thegroundsmanseye/' },
  { name: 'Facebook', href: 'https://www.facebook.com/thegroundsmanseye/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@thegroundsmanseye' },
];

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;
    gsap.from(footerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: footerRef });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="bg-tge-black border-t border-tge-green-muted/30 py-16 md:py-20 px-5 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top area */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
          {/* Left - Brand */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="/logo-badge.jpg"
              alt="TGE Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <h3 className="font-oswald font-semibold text-xl uppercase text-tge-white mt-3">
              The Groundman&apos;s Eye
            </h3>
            <p className="font-inter text-sm text-tge-grey-text mt-1">
              Sports Turf Through A Different Lens
            </p>
          </div>

          {/* Right - Link groups */}
          <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12 flex-1">
            {/* Content */}
            <div>
              <h4 className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-white mb-3">
                Content
              </h4>
              <ul className="space-y-2">
                {CONTENT_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-grey-text hover:text-tge-lime transition-colors duration-200 leading-[2.2]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-white mb-3">
                Community
              </h4>
              <ul className="space-y-2">
                {COMMUNITY_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-grey-text hover:text-tge-lime transition-colors duration-200 leading-[2.2]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-white mb-3">
                Social
              </h4>
              <ul className="space-y-2">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-grey-text hover:text-tge-lime transition-colors duration-200 leading-[2.2] inline-flex items-center gap-1"
                    >
                      {link.name}
                      <span className="text-[10px]">&uarr;</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom area */}
        <div className="mt-12 pt-8 border-t border-tge-green-muted/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-grey-text/60">
            &copy; 2025 The Groundsman&apos;s Eye. All rights reserved.
          </span>
          <span className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-lime/50 text-center">
            Because Great Pitches Don&apos;t Happen By Chance.
          </span>
        </div>
      </div>
    </footer>
  );
};
