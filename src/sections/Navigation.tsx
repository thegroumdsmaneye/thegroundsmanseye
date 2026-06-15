import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Series', href: '#series' },
  { label: 'On Tour', href: '#ontour' },
  { label: 'Community', href: '#community' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-5 md:px-10 transition-all duration-300 ${
          scrolled
            ? 'bg-tge-black/90 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.5)] border-b border-tge-green-muted/30'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-tge-lime focus:ring-offset-2 focus:ring-offset-tge-black rounded"
        >
          <img
            src="/thegroundsmanseye/logo-badge.jpg"
            alt="TGE Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="hidden md:block font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-white">
            The Groundsman&apos;s Eye
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-inter font-medium text-[13px] uppercase tracking-[0.08em] text-tge-grey-text hover:text-tge-lime transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-tge-lime focus:ring-offset-2 focus:ring-offset-tge-black rounded"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-tge-white p-1 focus:outline-none focus:ring-2 focus:ring-tge-lime rounded"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-tge-black flex flex-col items-center justify-center transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-oswald font-semibold text-3xl uppercase text-tge-white hover:text-tge-lime transition-colors duration-200"
              style={{
                transitionDelay: menuOpen ? `${i * 0.05}s` : '0s',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
