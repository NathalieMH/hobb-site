let _blendObserver: IntersectionObserver | null = null;

export function blendIn(el: HTMLElement): void {
  el.style.transitionDelay = el.dataset.bd ?? '0ms';
  el.classList.add('blend-visible');
}

export function blendOut(el: HTMLElement): void {
  el.style.transitionDelay = '0ms';
  el.classList.remove('blend-visible');
}

export function blendInMove(el: HTMLElement): void {
  el.style.transitionDelay = el.dataset.bd ?? '0ms';
  el.classList.add('blend-move-visible');
}

export function blendOutMove(el: HTMLElement): void {
  el.style.transitionDelay = '0ms';
  el.classList.remove('blend-move-visible');
}

export function initBlendReveal(): void {
  if (_blendObserver) { _blendObserver.disconnect(); _blendObserver = null; }

  const blendEls = Array.from(document.querySelectorAll<HTMLElement>('[data-blend]'));
  const moveEls  = Array.from(document.querySelectorAll<HTMLElement>('[data-blend-move]'));
  const allEls   = [...blendEls, ...moveEls];
  if (!allEls.length) return;

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

  allEls.forEach(el => {
    const isMove = el.hasAttribute('data-blend-move');
    el.classList.add(isMove ? 'blend-move-hidden' : 'blend-hidden');

    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      // Already visible — show without animation so only future scroll-out animates
      el.style.transitionDuration = '0s';
      el.classList.add(isMove ? 'blend-move-visible' : 'blend-visible');
      requestAnimationFrame(() => { el.style.transitionDuration = ''; });
    }

    _blendObserver!.observe(el);
  });
}
