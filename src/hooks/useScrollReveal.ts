import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  ease?: string;
  scale?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    y = 30,
    x = 0,
    stagger = 0.15,
    duration = 0.7,
    delay = 0,
    start = 'top 75%',
    ease = 'power2.out',
    scale,
  } = options;

  useGSAP(() => {
    if (!ref.current) return;

    const children = ref.current.children;
    if (children.length === 0) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      y,
      x,
      ease,
      delay,
    };

    if (scale !== undefined) {
      fromVars.scale = scale;
    }

    gsap.from(children, {
      ...fromVars,
      stagger,
      duration,
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: 'play none none none',
      },
    });
  }, { scope: ref });

  return ref;
}
