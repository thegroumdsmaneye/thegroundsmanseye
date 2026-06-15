import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const JoinListSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="join"
      ref={sectionRef}
      className="bg-tge-black py-20 md:py-[120px] px-5 md:px-10"
    >
      <div ref={contentRef} className="max-w-xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-tge-lime" strokeWidth={1.5} />
          <span className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-lime">
            Newsletter
          </span>
        </div>

        <h2 className="font-oswald font-semibold text-4xl md:text-6xl uppercase text-tge-white leading-[1]">
          Join The Groundsman&apos;s Eye
        </h2>

        <p className="font-inter text-base md:text-lg text-tge-grey-text mt-5 leading-relaxed">
          Get pitch tips, grassroots ideas, renovation insights, machinery notes, and
          new episode updates.
        </p>

        {submitted ? (
          <div className="mt-8 py-6">
            <p className="font-oswald font-semibold text-xl uppercase text-tge-lime">
              You&apos;re On The List!
            </p>
            <p className="font-inter text-sm text-tge-grey-text mt-2">
              Welcome to the community. Watch your inbox for updates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="flex-1 bg-tge-charcoal border border-tge-green-muted/40 rounded-lg px-4 py-3.5 text-tge-white font-inter text-[15px] placeholder:text-tge-grey-text/50 focus:border-tge-lime focus:outline-none transition-colors duration-200"
            />
            <button
              type="submit"
              className="bg-tge-lime text-tge-black font-inter font-semibold text-sm uppercase tracking-[0.06em] rounded-lg px-8 py-3.5 transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(200,255,0,0.15)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-tge-lime focus:ring-offset-2 focus:ring-offset-tge-black cursor-pointer"
            >
              Join The List
            </button>
          </form>
        )}

        <p className="font-inter text-xs text-tge-grey-text/50 mt-4">
          No spam. Unsubscribe anytime. We respect your inbox.
        </p>
      </div>
    </section>
  );
};
