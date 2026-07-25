export interface MobileSliderOptions {
  /** Called with the active slide index whenever it changes on mobile. */
  onActiveChange?: (index: number) => void;
}

/**
 * Wires the mobile peek-slider behavior for a section that uses the `.m-slider`
 * markup (see src/styles/slider.css): tracks the centered slide, syncs the
 * `.m-slider__dot` indicators, and lets dots scroll to their slide. Desktop is a
 * plain grid, so the observer only runs on mobile.
 */
export function initMobileSlider(root: HTMLElement, options: MobileSliderOptions = {}): void {
  const track = root.querySelector<HTMLElement>('.m-slider');
  if (!track) return;

  const slides = Array.from(track.children) as HTMLElement[];
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('.m-slider__dot'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mqMobile = window.matchMedia('(max-width: 809px)');

  let observer: IntersectionObserver | null = null;

  const setActive = (index: number) => {
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
    options.onActiveChange?.(index);
  };

  const buildObserver = () =>
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActive(slides.indexOf(entry.target as HTMLElement));
          }
        });
      },
      { root: track, threshold: 0.6 }
    );

  const wire = () => {
    observer?.disconnect();
    observer = null;
    if (mqMobile.matches) {
      observer = buildObserver();
      slides.forEach((slide) => observer!.observe(slide));
    }
  };

  wire();
  mqMobile.addEventListener('change', wire);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      slides[i]?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        inline: 'start',
        block: 'nearest',
      });
    });
  });
}
