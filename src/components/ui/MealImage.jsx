import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

function ImageFallback({ compact }) {
  const { t } = useLanguage();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-surface-container p-2 text-center">
      <div className="bg-halftone pointer-events-none absolute inset-0 opacity-15" aria-hidden="true" />
      <div
        className={[
          'relative flex items-center justify-center rounded-2xl bg-secondary-container/60 text-on-secondary-fixed shadow-inner',
          compact ? 'h-10 w-10' : 'h-14 w-14',
        ].join(' ')}
      >
        <UtensilsCrossed className={compact ? 'h-5 w-5' : 'h-7 w-7'} aria-hidden="true" />
      </div>
      {!compact && (
        <div className="relative mt-2 space-y-0.5">
          <span className="block font-label text-label-tag uppercase text-primary">
            {t.freshFromKitchen}
          </span>
          <span className="block font-label text-body-sm font-semibold text-on-surface">
            {t.photoComingSoon}
          </span>
        </div>
      )}
    </div>
  );
}

export function MealImage({ src, alt, className = '', imgClassName = '', compact = false }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const showFallback = !src || failedSrc === src;

  return (
    <div className={['relative overflow-hidden bg-surface-container-high', className].join(' ')}>
      {showFallback ? (
        <ImageFallback compact={compact} />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailedSrc(src)}
          className={['h-full w-full object-cover', imgClassName].join(' ')}
        />
      )}
    </div>
  );
}
