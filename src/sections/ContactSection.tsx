import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronDown, Mail } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const DROPDOWN_OPTIONS = [
  'Pitch problem',
  'Story submission',
  'Sponsor enquiry',
  'Collaboration',
  'Other',
];

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    club: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

    if (formRef.current) {
      const fields = formRef.current.querySelectorAll('.form-field');
      gsap.from(fields, {
        opacity: 0,
        y: 20,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses =
    'w-full bg-tge-charcoal border border-tge-green-muted/40 rounded-lg px-4 py-3.5 text-tge-white font-inter text-[15px] placeholder:text-tge-grey-text/50 focus:border-tge-lime focus:outline-none transition-colors duration-200';

  const labelClasses =
    'block font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-grey-text mb-2';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-tge-black py-20 md:py-[120px] px-5 md:px-10"
    >
      <div className="max-w-xl mx-auto">
        <div ref={headerRef}>
          <SectionHeader
            label="Get In Touch"
            heading="Contact The Groundsman's Eye"
            description="Want your club, pitch, product, or story featured? Get in touch and let's talk turf."
          />
        </div>

        {/* Email CTA */}
        <div className="mt-8 text-center">
          <a
            href="mailto:thegroundsmans.eye@gmail.com"
            className="inline-flex items-center gap-2 font-inter text-base text-tge-lime hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-tge-lime focus:ring-offset-2 focus:ring-offset-tge-black rounded px-1"
          >
            <Mail className="w-4 h-4" strokeWidth={1.5} />
            thegroundsmans.eye@gmail.com
          </a>
        </div>

        {submitted ? (
          <div className="mt-10 text-center py-16">
            <div className="font-oswald font-semibold text-2xl uppercase text-tge-lime">
              Message Sent!
            </div>
            <p className="font-inter text-tge-grey-text mt-3">
              Thanks for getting in touch. We&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 mt-10">
            <div className="form-field">
              <label htmlFor="name" className={labelClasses}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder="Your name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-field">
              <label htmlFor="club" className={labelClasses}>
                Club / Organisation
              </label>
              <input
                type="text"
                id="club"
                name="club"
                value={formData.club}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Your club or organisation"
              />
            </div>

            <div className="form-field relative">
              <label htmlFor="subject" className={labelClasses}>
                What&apos;s This About?
              </label>
              <div className="relative">
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`${inputClasses} appearance-none pr-10`}
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  {DROPDOWN_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-tge-charcoal">
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tge-lime pointer-events-none" />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="message" className={labelClasses}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className={`${inputClasses} resize-y`}
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <div className="form-field">
              <button
                type="submit"
                className="w-full md:w-auto md:px-16 bg-tge-lime text-tge-black font-inter font-semibold text-sm uppercase tracking-[0.06em] rounded-lg py-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(200,255,0,0.15)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-tge-lime focus:ring-offset-2 focus:ring-offset-tge-black cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
