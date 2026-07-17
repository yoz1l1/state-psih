import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { staff } from './staff';
import PhotoCell from './components/PhotoCell';
import ExitPlate from './components/ExitPlate';

const PER_PAGE = 2;
const pages: typeof staff[] = [];
for (let i = 0; i < staff.length; i += PER_PAGE) {
  pages.push(staff.slice(i, i + PER_PAGE));
}
const TOTAL = pages.length;

function LeatherCover({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,154,82,0.08),transparent_60%)]" />

      <button
        onClick={onOpen}
        className="leather group relative block w-full max-w-xl cursor-pointer rounded-sm border border-leather-500/30 p-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:scale-[1.015] sm:p-14"
        aria-label="Open the album"
      >
        <div className="pointer-events-none absolute inset-3 border border-brass-500/30" />
        <div className="pointer-events-none absolute inset-5 border border-brass-400/20" />

        {[
          'left-4 top-4',
          'right-4 top-4 rotate-90',
          'left-4 bottom-4 -rotate-90',
          'right-4 bottom-4 rotate-180',
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={
              'absolute h-8 w-8 ' +
              pos +
              ' bg-gradient-to-br from-brass-300/70 to-brass-600/40 [clip-path:polygon(0_0,100%_0,100%_30%,30%_30%,30%_100%,0_100%)]'
            }
          />
        ))}

        <div className="relative">
          <p className="font-fellsc text-[11px] uppercase tracking-[0.4em] text-brass-300/80 sm:text-xs">
            State of New Hampshire
          </p>
          <div className="mx-auto my-5 h-px w-24 bg-gradient-to-r from-transparent via-brass-400/60 to-transparent" />
          <h1 className="deboss font-fellsc text-3xl leading-tight text-brass-300 sm:text-5xl">
            Blackwood State
            <br />
            Asylum
          </h1>
          <p className="mt-4 font-fell italic text-base text-brass-400/70 sm:text-lg">
            Staff Register
          </p>
          <p className="mt-1 font-fell text-sm text-brass-400/60">
            Anno Domini MCMLVIII
          </p>

          <div className="mx-auto my-6 h-px w-24 bg-gradient-to-r from-transparent via-brass-400/40 to-transparent" />

          <span className="inline-block translate-y-0 font-fellsc text-xs uppercase tracking-[0.3em] text-brass-300/0 transition-all duration-500 group-hover:text-brass-300/80 group-hover:tracking-[0.5em]">
            ◈ &nbsp;Open the Album &nbsp;◈
          </span>
        </div>
      </button>
    </div>
  );
}

function PageSpread({
  page,
  pageIndex,
  total,
  onPrev,
  onNext,
}: {
  page: typeof staff;
  pageIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = revealRef.current;
    if (!root) return;
    const targets = root.querySelectorAll('.fade-in');
    targets.forEach((t) => t.classList.remove('is-visible'));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('is-visible'), 60);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pageIndex]);

  return (
    <div
      ref={revealRef}
      className="relative mx-auto flex w-full max-w-5xl flex-col"
    >
      <header className="fade-in mb-6 flex items-end justify-between border-b-2 border-double border-sepia-400/50 pb-2">
        <span className="font-fellsc text-[11px] uppercase tracking-[0.25em] text-sepia-600 sm:text-xs">
          Blackwood State Asylum
        </span>
        <span className="font-fell italic text-sepia-600 text-sm sm:text-base">
          Staff Register — 1958
        </span>
        <span className="font-fellsc text-[11px] uppercase tracking-[0.25em] text-sepia-600 sm:text-xs">
          Plate {pageIndex + 1} / {total}
        </span>
      </header>

      <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
        {page.map((m, i) => (
          <div key={m.id} className="group relative flex justify-center">
            <PhotoCell member={m} index={pageIndex * PER_PAGE + i} />
          </div>
        ))}
      </div>

      <nav className="fade-in mt-12 flex items-center justify-between border-t border-sepia-400/40 pt-4">
        <button
          onClick={onPrev}
          disabled={pageIndex === 0}
          className="flex items-center gap-1 rounded-sm border border-sepia-400/40 bg-page-50/80 px-4 py-2 font-fell text-sm text-sepia-700 transition hover:bg-page-200 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={
                'h-1.5 rounded-full transition-all duration-300 ' +
                (i === pageIndex
                  ? 'w-6 bg-sepia-700'
                  : 'w-1.5 bg-sepia-400/40')
              }
            />
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={pageIndex === total - 1}
          className="flex items-center gap-1 rounded-sm border border-sepia-400/40 bg-page-50/80 px-4 py-2 font-fell text-sm text-sepia-700 transition hover:bg-page-200 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [anim, setAnim] = useState<'idle' | 'forward' | 'back'>('idle');
  const [exitOpen, setExitOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (dir: 1 | -1) => {
    if (anim !== 'idle') return;
    const next = page + dir;
    if (next < 0 || next >= TOTAL) return;
    setAnim(dir === 1 ? 'forward' : 'back');
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setPage(next);
      setAnim('idle');
    }, 420);
  };

  const doClose = () => {
    setOpen(false);
    setPage(0);
    setAnim('idle');
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  if (!open) {
    return (
      <div className="wood-bg min-h-screen">
        <LeatherCover onOpen={() => setOpen(true)} />
      </div>
    );
  }

  const pageStyle: React.CSSProperties =
    anim === 'forward'
      ? { transform: 'perspective(2400px) rotateY(-22deg)', opacity: 0.4, transformOrigin: 'left center' }
      : anim === 'back'
        ? { transform: 'perspective(2400px) rotateY(22deg)', opacity: 0.4, transformOrigin: 'right center' }
        : {};

  return (
    <div className="wood-bg relative min-h-screen w-full overflow-hidden">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(184,154,82,0.07),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6">
        <div className="fade-in mb-6 flex items-center justify-between">
          <button
            onClick={() => setExitOpen(true)}
            className="flex items-center gap-2 rounded-sm border border-brass-500/40 bg-leather-700/60 px-3 py-2 font-fell text-xs uppercase tracking-widest text-brass-300/80 transition hover:bg-leather-600"
          >
            <ChevronLeft size={14} />
            Close Album
          </button>
          <p className="hidden font-fell italic text-brass-300/50 sm:block">
            Blackwood State Asylum · Staff Register
          </p>
        </div>

        <div className="album-spread relative flex-1">
          <div className="pointer-events-none absolute -left-3 top-8 bottom-8 z-20 hidden flex-col justify-between sm:flex">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="spiral-hole h-4 w-4 rounded-full"
                aria-hidden
              />
            ))}
          </div>

          <div
            className="paper foxing relative flex-1 rounded-sm p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-[420ms] ease-out sm:p-8"
            style={pageStyle}
          >
            <PageSpread
              key={page}
              page={pages[page]}
              pageIndex={page}
              total={TOTAL}
              onPrev={() => go(-1)}
              onNext={() => go(1)}
            />
          </div>
        </div>

        <p className="fade-in mt-6 text-center font-fell text-xs italic text-brass-300/40">
          Use the arrows below each plate to turn the page.
        </p>
      </div>

      <ExitPlate
        open={exitOpen}
        onClose={() => setExitOpen(false)}
        onConfirm={doClose}
      />
    </div>
  );
}
