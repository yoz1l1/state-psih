import { useEffect, useRef } from 'react';

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root: ParentNode = (ref.current as ParentNode | null) ?? document;
    const targets: Element[] = Array.from(root.querySelectorAll('.reveal'));
    if (targets.length === 0) return;

    const hasIO = typeof IntersectionObserver !== 'undefined';
    if (hasIO) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              obs.unobserve(e.target);
            }
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
      );
      targets.forEach((t) => obs.observe(t as Element));
      return () => obs.disconnect();
    }

    const win = window as Window & typeof globalThis;
    const onScroll = () => {
      const vh = win.innerHeight;
      targets.forEach((t) => {
        const rect = (t as HTMLElement).getBoundingClientRect();
        if (rect.top < vh * 0.95) (t as HTMLElement).classList.add('is-visible');
      });
    };
    onScroll();
    win.addEventListener('scroll', onScroll, { passive: true });
    return () => win.removeEventListener('scroll', onScroll);
  }, []);

  return ref;
}
