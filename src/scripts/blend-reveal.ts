import gsap from 'gsap';

let _blendObserver: IntersectionObserver | null = null;

// ── CSS-transition blend (opacity only, for scroll-reveal content) ──────────

export function blendIn(el: HTMLElement): void {
  el.style.transitionDelay = el.dataset.bd ?? '0ms';
  el.classList.add('blend-visible');
}

export function blendOut(el: HTMLElement): void {
  el.style.transitionDelay = '0ms';
  el.classList.remove('blend-visible');
}

// ── GSAP blend-move (opacity + rise, for hero sections) ─────────────────────

export function blendInMove(el: HTMLElement): void {
  const speed = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--blend-move-speed') || '1.15'
  );
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: speed,
    ease: 'power3.out',
    overwrite: true,
  });
}

export function blendOutMove(el: HTMLElement): void {
  const speed = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--blend-move-speed') || '1.15'
  );
  gsap.to(el, {
    opacity: 0,
    y: 16,
    duration: speed * 0.6,
    ease: 'power2.in',
    overwrite: true,
  });
}

// ── Init ────────────────────────────────────────────────────────────────────

export function initBlendReveal(): void {
  if (_blendObserver) { _blendObserver.disconnect(); _blendObserver = null; }

  const blendEls = Array.from(document.querySelectorAll<HTMLElement>('[data-blend]'));
  const moveEls  = Array.from(document.querySelectorAll<HTMLElement>('[data-blend-move]'));
  if (!blendEls.length && !moveEls.length) return;

  _blendObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        el.hasAttribute('data-blend-move') ? blendInMove(el) : blendIn(el);
      } else {
        el.hasAttribute('data-blend-move') ? blendOutMove(el) : blendOut(el);
      }
    });
  }, { threshold: 0 });

  blendEls.forEach(el => {
    el.classList.add('blend-hidden');
    // Skip animation for content already in viewport on load — no flash.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.style.transitionDuration = '0s';
      el.classList.add('blend-visible');
      requestAnimationFrame(() => { el.style.transitionDuration = ''; });
    }
    _blendObserver!.observe(el);
  });

  moveEls.forEach(el => {
    // Set starting state via GSAP so it's in the render pipeline from frame 1.
    gsap.set(el, { opacity: 0, y: 16 });
    _blendObserver!.observe(el);
  });
}
