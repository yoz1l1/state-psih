import { useEffect, useRef, useState } from 'react';

export type Match = {
  el: HTMLElement;
  text: string;
};

export function useSearchHighlight(
  containerRef: React.RefObject<HTMLElement>,
  query: string,
  wholeWord: boolean,
) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const previousMarks = container.querySelectorAll('mark.hl, mark.hl-active');
    previousMarks.forEach((m) => {
      const parent = m.parentNode;
      if (!parent) return;
      while (m.firstChild) parent.insertBefore(m.firstChild, m);
      parent.removeChild(m);
      parent.normalize();
    });

    const q = query.trim();
    if (!q) {
      setMatches([]);
      setActiveIndex(-1);
      return;
    }

    const found: Match[] = [];
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(wholeWord ? `\\b${escaped}\\b` : escaped, 'gi');

    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'mark') {
            return NodeFilter.FILTER_REJECT;
          }
          if (!node.nodeValue || !node.nodeValue.trim()) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      },
    );

    const textNodes: Text[] = [];
    let n: Node | null;
    while ((n = walker.nextNode())) textNodes.push(n as Text);

    textNodes.forEach((node) => {
      const text = node.nodeValue ?? '';
      re.lastIndex = 0;
      const segments: { text: string; match: boolean }[] = [];
      let last = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(text)) !== null) {
        if (m.index > last) segments.push({ text: text.slice(last, m.index), match: false });
        segments.push({ text: m[0], match: true });
        last = m.index + m[0].length;
        if (m[0].length === 0) re.lastIndex++;
      }
      if (last < text.length) segments.push({ text: text.slice(last), match: false });
      if (!segments.some((s) => s.match)) return;

      const frag = document.createDocumentFragment();
      segments.forEach((s) => {
        if (s.match) {
          const mark = document.createElement('mark');
          mark.className = 'hl';
          mark.textContent = s.text;
          frag.appendChild(mark);
          found.push({ el: mark, text: s.text });
        } else {
          frag.appendChild(document.createTextNode(s.text));
        }
      });
      node.parentNode?.replaceChild(frag, node);
    });

    setMatches(found);
    setActiveIndex(found.length > 0 ? 0 : -1);
  }, [query, wholeWord, containerRef]);

  useEffect(() => {
    matches.forEach((m, i) => {
      if (i === activeIndex) {
        m.el.classList.remove('hl');
        m.el.classList.add('hl', 'hl-active');
      } else {
        m.el.classList.remove('hl-active');
      }
    });
    if (activeIndex >= 0 && matches[activeIndex]) {
      matches[activeIndex].el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeIndex, matches]);

  return { matches, activeIndex, setActiveIndex };
}

void useRef;
