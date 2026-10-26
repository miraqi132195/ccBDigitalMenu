import { Sandwich, UtensilsCrossed } from 'lucide-react';

const PULSE = 'animate-pulse bg-surface-container-highest';
const PILL_WIDTHS = ['w-24', 'w-32', 'w-28', 'w-20', 'w-28'];

function FlameMark() {
  return (
    <svg className="h-16 w-16 text-surface-container-high opacity-60" fill="currentColor" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 2C24 2 28 8 28 14C28 15.5 27.6 17 26.8 18.2C29.6 17.5 32 15 32.5 12C36 17 38 23 38 28C38 35.7 31.7 42 24 42C16.3 42 10 35.7 10 28C10 20.2 16.5 12.8 20.8 7.2C22 5.5 24 2 24 2ZM24 26C21.8 26 20 27.8 20 30C20 32.2 21.8 34 24 34C26.2 34 28 32.2 28 30C28 27.8 26.2 26 24 26Z" />
    </svg>
  );
}

function FeaturedSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-surface-container-lowest shadow-sm">
      <div className={['relative flex h-44 items-center justify-center md:aspect-[4/3] md:h-auto', PULSE].join(' ')}>
        <FlameMark />
      </div>
      <div className="space-y-2.5 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className={['h-4 w-3/5 rounded-full', PULSE].join(' ')} />
          <div className={['h-6 w-14 rounded-full', PULSE].join(' ')} />
        </div>
        <div className={['h-2.5 w-full rounded-full', PULSE].join(' ')} />
        <div className={['h-2.5 w-4/5 rounded-full', PULSE].join(' ')} />
      </div>
    </div>
  );
}

function CompactSkeleton({ icon: Icon }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-surface-container-lowest p-3.5 shadow-sm md:flex-col md:rounded-3xl md:p-0">
      <div className="flex flex-1 flex-col justify-between gap-2 py-0.5 md:p-4">
        <div className="space-y-2">
          <div className={['h-4 w-3/4 rounded-full', PULSE].join(' ')} />
          <div className={['h-2.5 w-full rounded-full', PULSE].join(' ')} />
          <div className={['h-2.5 w-3/5 rounded-full', PULSE].join(' ')} />
        </div>
        <div className={['h-6 w-14 rounded-full', PULSE].join(' ')} />
      </div>
      <div
        className={[
          'flex h-24 w-24 shrink-0 items-center justify-center rounded-xl md:order-first md:aspect-[4/3] md:h-auto md:w-full md:rounded-none',
          PULSE,
        ].join(' ')}
      >
        <Icon className="h-8 w-8 text-surface-container-high" aria-hidden="true" />
      </div>
    </div>
  );
}

export function MenuSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <div className="no-scrollbar flex gap-2 overflow-hidden px-4 py-2.5 md:justify-center md:px-8">
        {PILL_WIDTHS.map((width, index) => (
          <div key={index} className={['h-11 shrink-0 rounded-full', width, PULSE].join(' ')} />
        ))}
      </div>

      <div className="mx-auto w-full max-w-6xl space-y-8 px-4 md:px-8">
        {Array.from({ length: 2 }).map((_, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <div className="flex items-center gap-3.5 rounded-3xl border-[1.5px] border-hairline bg-surface-container-low px-4 py-4 md:gap-5 md:px-7 md:py-6">
              <div className={['h-12 w-12 shrink-0 rounded-2xl md:h-16 md:w-16', PULSE].join(' ')} />
              <div className="flex-1 space-y-2">
                <div className={['h-2.5 w-16 rounded-full', PULSE].join(' ')} />
                <div className={['h-6 w-40 rounded-full', PULSE].join(' ')} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
              <FeaturedSkeleton />
              <CompactSkeleton icon={Sandwich} />
              <CompactSkeleton icon={UtensilsCrossed} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
