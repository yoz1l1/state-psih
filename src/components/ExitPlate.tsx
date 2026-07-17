import { useEffect, useState } from 'react';
import { X, DoorClosed } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ExitPlate({ open, onClose, onConfirm }: Props) {
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!mounted) return null;

  const handleCancel = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setMounted(false);
      setClosing(false);
      onClose();
    }, 400);
  };

  const handleConfirm = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setMounted(false);
      setClosing(false);
      onConfirm();
    }, 400);
  };

  return (
    <div
      className={
        'plate-overlay fixed inset-0 z-[60] flex items-center justify-center p-4 ' +
        (closing ? 'is-closing' : '')
      }
      onClick={handleCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-plate-title"
    >
      <div
        className={
          'plate-card paper foxing relative w-full max-w-md rotate-[-1deg] p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.7)] ' +
          (closing ? 'is-closing' : '')
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-2 border border-sepia-400/40" />
        <div className="pointer-events-none absolute inset-3.5 border border-sepia-400/20" />

        <button
          onClick={handleCancel}
          className="absolute right-3 top-3 z-10 rounded-sm p-1 text-sepia-500 transition hover:bg-page-200 hover:text-sepia-800"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>

        <p className="font-fellsc text-[10px] uppercase tracking-[0.35em] text-sepia-500">
          Notice
        </p>
        <div className="mx-auto my-3 h-px w-20 bg-gradient-to-r from-transparent via-sepia-400/60 to-transparent" />
        <h2
          id="exit-plate-title"
          className="font-fellsc text-2xl leading-tight text-sepia-800 sm:text-3xl"
        >
          Close the Album?
        </h2>
        <p className="mx-auto mt-3 max-w-xs font-fell text-sm italic leading-relaxed text-sepia-600">
          You are about to return the staff register to the shelf.
          The photographs will remain where they are.
        </p>

        <div className="my-6 flex justify-center">
          <div className="wax-seal h-16 w-16 rounded-full" aria-hidden />
        </div>

        <div className="relative flex items-center justify-center gap-3">
          <button
            onClick={handleCancel}
            className="rounded-sm border border-sepia-400/50 bg-page-50/80 px-5 py-2.5 font-fell text-sm text-sepia-700 transition hover:bg-page-200"
          >
            Stay &amp; Look On
          </button>
          <button
            onClick={handleConfirm}
            className="flex items-center gap-2 rounded-sm border border-wax/60 bg-wax/90 px-5 py-2.5 font-fell text-sm text-page-50 shadow-[0_3px_8px_rgba(0,0,0,0.35)] transition hover:bg-wax"
          >
            <DoorClosed size={15} />
            Close Album
          </button>
        </div>

        <p className="mt-5 font-elite text-[9px] uppercase tracking-widest text-sepia-400">
          Blackwood State Asylum · Dept. of Records
        </p>
      </div>
    </div>
  );
}
