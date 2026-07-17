import { useEffect, useRef, useState } from 'react';
import { Search, ChevronUp, ChevronDown, X } from 'lucide-react';

type Props = {
  query: string;
  setQuery: (q: string) => void;
  wholeWord: boolean;
  setWholeWord: (v: boolean) => void;
  matchCount: number;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onClear: () => void;
};

export default function SearchBar({
  query,
  setQuery,
  wholeWord,
  setWholeWord,
  matchCount,
  activeIndex,
  onPrev,
  onNext,
  onClear,
}: Props) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 30);
      }
      if (e.key === 'Escape') {
        setOpen(false);
        onClear();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClear]);

  return (
    <div className="fixed top-3 right-3 z-50 print:hidden">
      <button
        onClick={() => {
          setOpen((o) => !o);
          if (!open) setTimeout(() => inputRef.current?.focus(), 30);
        }}
        className="flex items-center gap-2 rounded-sm border border-ink-700/70 bg-paper-100/95 px-3 py-2 font-fell text-sm text-ink-700 shadow-md transition hover:bg-paper-200"
        aria-label="Search the article"
      >
        <Search size={16} strokeWidth={2.25} />
        <span className="hidden sm:inline">Search</span>
        <kbd className="ml-1 hidden rounded-sm border border-ink-700/40 px-1.5 text-[10px] text-ink-600 sm:inline">
          ⌘F
        </kbd>
      </button>

      {open && (
        <div className="mt-2 w-[min(92vw,30rem)] rounded-sm border border-ink-700/70 bg-paper-100/98 p-3 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-2">
            <Search size={16} className="shrink-0 text-ink-600" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the page…"
              className="w-full bg-transparent font-fell text-base text-ink-800 placeholder:text-ink-400 focus:outline-none"
              aria-label="Search query"
            />
            {query && (
              <button
                onClick={onClear}
                className="shrink-0 rounded-sm p-1 text-ink-600 hover:bg-paper-200 hover:text-ink-800"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-ink-700/30 pt-2">
            <label className="flex cursor-pointer select-none items-center gap-1.5 font-fell text-xs text-ink-600">
              <input
                type="checkbox"
                checked={wholeWord}
                onChange={(e) => setWholeWord(e.target.checked)}
                className="accent-rust"
              />
              Whole word
            </label>

            <div className="flex items-center gap-2">
              {query ? (
                <span className="font-fell text-xs text-ink-600">
                  {matchCount === 0
                    ? 'no matches'
                    : `${activeIndex + 1} / ${matchCount}`}
                </span>
              ) : (
                <span className="font-fell text-xs italic text-ink-400">
                  try “Blackwood” or “048”
                </span>
              )}
              <div className="flex items-center gap-1">
                <button
                  onClick={onPrev}
                  disabled={matchCount === 0}
                  className="rounded-sm border border-ink-700/40 p-1 text-ink-700 disabled:opacity-30 enabled:hover:bg-paper-200"
                  aria-label="Previous match"
                >
                  <ChevronUp size={15} />
                </button>
                <button
                  onClick={onNext}
                  disabled={matchCount === 0}
                  className="rounded-sm border border-ink-700/40 p-1 text-ink-700 disabled:opacity-30 enabled:hover:bg-paper-200"
                  aria-label="Next match"
                >
                  <ChevronDown size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
