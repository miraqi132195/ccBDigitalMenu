import { useState } from 'react';

export function CategoryHeader({ headingId, label, emoji, countLabel, image, index }) {
  const [failedImage, setFailedImage] = useState(null);
  const hasImage = Boolean(image) && failedImage !== image;
  const ordinal = String(index + 1).padStart(2, '0');

  return (
    <header
      className={`relative isolate mb-4 flex overflow-hidden rounded-3xl md:mb-6 ${
        hasImage
          ? 'min-h-36 items-end bg-inverse-surface shadow-card md:min-h-48'
          : 'items-center border-[1.5px] border-hairline bg-surface-container-low'
      }`}
    >
      {hasImage ? (
        <>
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setFailedImage(image)}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/45 to-inverse-surface/5"
            aria-hidden="true"
          />
        </>
      ) : (
        <>
          <div className="bg-halftone absolute inset-0 -z-10 opacity-[0.06]" aria-hidden="true" />
          <div
            className="absolute -end-10 -top-12 -z-10 h-36 w-36 rounded-full bg-secondary-container/30 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-14 end-16 -z-10 h-28 w-28 rounded-full bg-primary-container/15 blur-2xl"
            aria-hidden="true"
          />
        </>
      )}

      <span
        className={`pointer-events-none absolute end-4 font-headline text-[56px] leading-none font-extrabold tracking-tighter select-none md:end-6 md:text-[80px] ${
          hasImage ? 'top-3 text-white/20' : 'top-1/2 -translate-y-1/2 text-primary-container/10'
        }`}
        dir="ltr"
        aria-hidden="true"
      >
        {ordinal}
      </span>

      <div className="flex w-full min-w-0 items-center gap-3.5 px-4 py-4 md:gap-5 md:px-7 md:py-6">
        <span
          className="flex h-12 w-12 shrink-0 -rotate-6 items-center justify-center rounded-2xl bg-surface-container-lowest text-2xl shadow-card ring-1 ring-hairline md:h-16 md:w-16 md:text-[32px] rtl:rotate-6"
          aria-hidden="true"
        >
          {emoji}
        </span>

        <div className="min-w-0 flex-1 pe-14 md:pe-24">
          <p
            className={`font-label text-label-tag tracking-[0.16em] uppercase ${
              hasImage ? 'text-secondary-container' : 'text-primary'
            }`}
          >
            {countLabel}
          </p>
          <h2
            id={headingId}
            className={`mt-0.5 truncate font-headline text-headline-lg-mobile font-extrabold md:text-headline-lg ${
              hasImage ? 'text-white' : 'text-on-surface'
            }`}
          >
            {label}
          </h2>
          <span
            className="mt-2 block h-1 w-10 rounded-full bg-gradient-to-r from-primary-container to-secondary-container md:w-14 rtl:bg-gradient-to-l"
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  );
}
