# Tech Spec — The Groundsman's Eye

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| react | ^19.0 | UI framework |
| react-dom | ^19.0 | DOM renderer |
| vite | ^7.2 | Build tool |
| @vitejs/plugin-react | ^4.4 | Vite React plugin |
| tailwindcss | ^3.4 | Utility CSS |
| typescript | ^5.7 | Type safety |
| @types/react | ^19.0 | React type defs |
| @types/react-dom | ^19.0 | ReactDOM type defs |
| gsap | ^3.12 | Animation engine (ScrollTrigger, timeline, scrub) |
| @gsap/react | ^2.1 | useGSAP hook for cleanup |
| lucide-react | ^0.468 | Icons (all UI icons) |

No shadcn/ui components needed — the design is fully custom with Tailwind.

## Component Inventory

### Layout

| Component | Source | Reuse |
|---|---|---|
| Navigation | Custom | Single instance — fixed nav with mobile hamburger overlay |
| Footer | Custom | Single instance |

### Sections

| Component | Source | Notes |
|---|---|---|
| HeroSection | Custom | Full-viewport hero with scroll-fade overlay |
| AboutSection | Custom | Centered text block + values row |
| SeriesSection | Custom | Horizontal scroll card strip with dot indicator |
| FeaturedEpisodeSection | Custom | Two-column layout (image + content) |
| CommunitySection | Custom | Submission types grid |
| SponsorsSection | Custom | Partnership cards row |
| ContactSection | Custom | Contact form with 5 fields |

### Reusable Components

| Component | Source | Used By |
|---|---|---|
| SectionHeader | Custom | About, Series, Community, Sponsors, Contact — label + heading + optional description pattern |
| SeriesCard | Custom | SeriesSection (×10) |
| SubmissionTypeCard | Custom | CommunitySection (×6) |
| PartnerCard | Custom | SponsorsSection (×4) |
| CTAButton | Custom | Hero, Featured, Community, Sponsors — supports primary/secondary/ghost variants |

### Hooks

| Hook | Purpose |
|---|---|
| useScrollReveal | Reusable GSAP ScrollTrigger fade-in — avoids repeating animation setup across 7 sections |

## Animation Implementation

| Animation | Library | Approach | Complexity |
|---|---|---|---|
| Hero text staggered fade-in | GSAP | Single timeline with sequential delays (0.2s–1.0s) on mount | Low |
| Hero scroll-fade overlay | GSAP ScrollTrigger | scrub: true tween on overlay opacity 0→0.7, trigger hero section | Medium |
| Section staggered text reveal | GSAP ScrollTrigger | Reusable pattern via useScrollReveal hook: opacity 0→1, y:30→0, stagger 0.15s | Low |
| Values/items grid stagger | GSAP ScrollTrigger | Same reusable pattern with smaller stagger (0.06–0.1s) | Low |
| Series cards horizontal stagger | GSAP ScrollTrigger | x:40→0, stagger 0.08s, triggered once | Low |
| Featured episode split reveal | GSAP ScrollTrigger | Image x:-40→0, content x:40→0 with staggered children | Medium |
| Mobile menu overlay | GSAP | Staggered fade-in from bottom (0.3s each), triggered on menu toggle | Low |
| Divider scaleX | GSAP ScrollTrigger | scaleX 0→1, transform-origin center | Low |
| Horizontal card scroll | CSS + optional JS | CSS scroll-snap + overflow-x:auto; JS for arrow buttons and dot indicator | Medium |

No custom shaders or non-stdlib JS libraries needed.

## Architecture Decisions

### Single-page with scroll-to-section navigation

All 8 sections live on one page. Nav links use `scrollIntoView` with 60px offset for the fixed nav. No React Router needed — this is a marketing landing page.

### GSAP ScrollTrigger for all scroll animations

All scroll-triggered reveals use a single reusable pattern (useScrollReveal hook) wrapping GSAP ScrollTrigger. This avoids duplication across 7 sections while keeping animation code centralized and cleanup-safe via @gsap/react's useGSAP.

### CSS scroll-snap for horizontal card strip

The Series section uses native CSS `scroll-snap-type: x mandatory` for the card container. This is smoother and more reliable than JS-based horizontal scroll. Optional JS enhancement adds arrow buttons (scroll by card width + gap) and a dot indicator (track scroll position).

### Image assets served from public/ directory

All 5 uploaded images are copied to `public/` and referenced by absolute path. No image optimization pipeline needed — images are already brand-ready JPEGs.

