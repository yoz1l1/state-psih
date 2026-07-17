import { useEffect, useRef, useState } from 'react';
import { article } from './article';
import { useSearchHighlight } from './useSearchHighlight';
import { useReveal } from './useReveal';
import SearchBar from './components/SearchBar';

function Masthead() {
  return (
    <header className="relative pt-6 text-center">
      <div className="rule-thin mx-auto flex max-w-5xl items-center justify-between border-b border-ink-700/40 px-4 pb-1 font-fell text-[11px] uppercase tracking-wide text-ink-600 sm:text-xs">
        <span>{article.vol}</span>
        <span className="hidden sm:inline">{article.city}</span>
        <span>{article.date}</span>
        <span className="hidden sm:inline">{article.no}</span>
        <span>{article.price}</span>
      </div>

      <div className="rule-double mx-auto mt-3 max-w-5xl px-4 py-4">
        <h1 className="font-blackletter ink-bleed text-5xl leading-none text-ink-800 sm:text-7xl md:text-8xl">
          {article.mastheadTitle}
        </h1>
        <p className="mt-2 font-fell italic text-ink-600 text-sm sm:text-base">
          {article.mastheadSubtitle}
        </p>
      </div>

      <div className="rule-thin mx-auto mt-3 max-w-5xl border-t border-ink-700/40 px-4 pt-1 font-fell text-[11px] uppercase tracking-widest text-ink-600">
        {article.kicker}
      </div>
    </header>
  );
}

function Section({
  section,
}: {
  section: (typeof article.sections)[number];
}) {
  switch (section.kind) {
    case 'subhead':
      return (
        <h3 className="reveal mt-10 mb-3 border-b border-ink-700/30 pb-2 text-center font-fellsc text-xl uppercase tracking-[0.2em] text-ink-800 sm:text-2xl">
          {section.heading}
        </h3>
      );

    case 'pullquote':
      return (
        <blockquote className="reveal my-8 break-inside-avoid border-y border-ink-700/40 py-6 text-center">
          <p className="mx-auto max-w-2xl font-fell italic text-2xl leading-snug text-ink-800 sm:text-3xl">
            {section.quote}
          </p>
          {section.attribution && (
            <footer className="mt-3 font-fell text-sm text-ink-600">
              {section.attribution}
            </footer>
          )}
        </blockquote>
      );

    case 'paragraphs':
    default: {
      const isLede = section.id === 'col-i';
      return (
        <div className="mb-4" data-section={section.id}>
          {section.body?.map((p, i) => (
            <p
              key={i}
              className={
                'reveal mb-4 break-inside-avoid font-oldstandard text-[15px] leading-[1.7] text-ink-700 sm:text-base ' +
                (isLede && i === 0
                  ? 'dropcap text-lg sm:text-xl'
                  : 'text-justify')
              }
            >
              {p}
            </p>
          ))}
        </div>
      );
    }
  }
}

export default function App() {
  const [query, setQuery] = useState('');
  const [wholeWord, setWholeWord] = useState(false);
  const [progress, setProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const revealRef = useReveal();

  const { matches, activeIndex, setActiveIndex } = useSearchHighlight(
    contentRef,
    query,
    wholeWord,
  );

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (dir: 1 | -1) => {
    if (matches.length === 0) return;
    setActiveIndex((i) => (i + dir + matches.length) % matches.length);
  };

  useEffect(() => {
    if (!query || matches.length === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        go(e.shiftKey ? -1 : 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [query, matches.length]);

  const matchCount = matches.length;

  return (
    <div ref={revealRef} className="paper-bg foxing relative min-h-screen w-full text-ink-800">
      <div className="fixed inset-x-0 top-0 z-40 h-1 bg-ink-700/10">
        <div className="progress-bar h-full" style={{ width: `${progress}%` }} />
      </div>

      <SearchBar
        query={query}
        setQuery={setQuery}
        wholeWord={wholeWord}
        setWholeWord={setWholeWord}
        matchCount={matchCount}
        activeIndex={activeIndex}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
        onClear={() => setQuery('')}
      />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={
          'fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full border border-ink-700/50 bg-paper-100/90 px-4 py-2 font-fell text-xs uppercase tracking-widest text-ink-700 shadow-lg transition-all duration-500 ' +
          (progress > 8 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')
        }
        aria-label="Return to top"
      >
        ↑ To the top of the page
      </button>

      <main className="mx-auto max-w-3xl px-5 pb-24 pt-8 sm:px-8">
        <Masthead />

        <section className="reveal mt-8 text-center">
          <h2 className="font-playfair text-3xl font-black leading-tight text-ink-800 sm:text-5xl md:text-6xl">
            {article.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-fell italic text-base text-ink-600 sm:text-lg">
            {article.subheadline}
          </p>
          <p className="mt-4 font-fell text-xs uppercase tracking-[0.25em] text-ink-600">
            {article.byline}
          </p>
        </section>

        <div ref={contentRef}>
          <p className="reveal mt-8 border-y border-ink-700/30 py-5 font-oldstandard text-lg leading-[1.7] text-ink-700 sm:text-xl">
            <span className="font-bold uppercase tracking-wide">
              {article.dateline}
            </span>{' '}
            {article.lede}
          </p>

          <div className="column-rules mt-6 md:columns-2 md:[column-fill:balance]">
            {article.sections.map((s) => (
              <Section key={s.id} section={s} />
            ))}
          </div>
        </div>

        <footer className="reveal mt-12 border-t border-ink-700/40 pt-6 text-center">
          <p className="mx-auto max-w-xl font-fell text-xs italic leading-relaxed text-ink-500">
            {article.colophon}
          </p>
          <p className="mt-3 font-fell text-[10px] uppercase tracking-widest text-ink-400">
            — The Blackwood Chronicle · {article.date} ·
          </p>
        </footer>
      </main>
    </div>
  );
}
