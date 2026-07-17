import { useState } from 'react';
import type { StaffMember } from '../staff';

export default function PhotoCell({
  member,
  index,
}: {
  member: StaffMember;
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const tilt = (index % 2 === 0 ? -1 : 1) * (1 + (index % 3));

  return (
    <figure
      className="photo-cell fade-in relative mx-auto w-full max-w-[15rem]"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="relative bg-page-200/60 p-3 pb-16 shadow-[0_10px_24px_rgba(0,0,0,0.45)]">
        <span
          className="tape absolute -top-2 left-3 h-7 w-16 -rotate-12 opacity-90"
          aria-hidden
        />
        <span
          className="tape absolute -top-2 right-3 h-7 w-16 rotate-12 opacity-90"
          aria-hidden
        />

        <div className="relative aspect-[4/5] w-full overflow-hidden bg-photo-300">
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-photo-200" />
          )}
          <img
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={
              'vintage-photo h-full w-full object-cover transition-opacity duration-700 ' +
              (loaded ? 'opacity-100' : 'opacity-0')
            }
          />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_22px_rgba(40,30,15,0.5)]" />
          <span className="corner-curl -bottom-px right-0" aria-hidden />
        </div>

        <figcaption className="absolute inset-x-3 bottom-3 text-center">
          <p className="handwritten text-[13px] leading-tight text-sepia-800">
            {member.name}
          </p>
          <p className="handwritten text-[10px] leading-tight text-sepia-600">
            {member.role}
          </p>
        </figcaption>
      </div>

      <div className="pointer-events-none absolute -bottom-2 left-1/2 z-10 w-[14rem] -translate-x-1/2 translate-y-2 rounded-sm border border-sepia-400/40 bg-page-50/97 p-3 text-left opacity-0 shadow-xl transition-all duration-500 hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <dl className="space-y-1 font-elite text-[10px] uppercase tracking-wide text-sepia-700">
          <div className="flex justify-between gap-2">
            <dt className="text-sepia-500">Dept.</dt>
            <dd className="text-right">{member.department}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-sepia-500">Tenure</dt>
            <dd className="text-right">{member.years}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-sepia-500">File №</dt>
            <dd className="text-right">{String(member.id).padStart(3, '0')}</dd>
          </div>
        </dl>
        <p className="mt-2 border-t border-sepia-400/30 pt-2 font-fell text-[11px] italic leading-snug text-sepia-700">
          {member.note}
        </p>
      </div>
    </figure>
  );
}
