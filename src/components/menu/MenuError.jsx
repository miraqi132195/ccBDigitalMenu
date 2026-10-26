import { RotateCw } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

function GrillErrorIllustration() {
  return (
    <svg className="relative z-10 h-32 w-32" fill="none" viewBox="0 0 120 120" aria-hidden="true">
      <rect fill="#333029" height="72" rx="16" width="76" x="22" y="24" />
      <path d="M36 60H52M68 60H84" stroke="#FF6B21" strokeLinecap="round" strokeWidth="4" />
      <path d="M42 42C48 40 72 40 78 42" stroke="#FFC928" strokeDasharray="4 4" strokeLinecap="round" strokeWidth="3" />
      <path d="M42 78C48 80 72 80 78 78" stroke="#FF6B21" strokeLinecap="round" strokeWidth="3" />
      <path d="M52 60C52 68 60 70 60 78C60 84 56 86 56 90" stroke="#FFC928" strokeLinecap="round" strokeWidth="4" />
      <path d="M57 56L63 64" stroke="#E94B32" strokeLinecap="round" strokeWidth="3" />
      <path d="M63 56L57 64" stroke="#E94B32" strokeLinecap="round" strokeWidth="3" />
      <circle cx="86" cy="30" fill="#E94B32" r="10" />
      <path d="M83 27L89 33M89 27L83 33" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

export function MenuError({ message, onRetry }) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8" role="alert">
      <div className="mx-auto flex max-w-md flex-col items-center gap-5 rounded-3xl bg-surface-container-lowest p-6 text-center shadow-sm">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <div className="absolute inset-0 scale-95 rounded-full bg-error-container/30" aria-hidden="true" />
          <GrillErrorIllustration />
        </div>

        <div className="max-w-xs space-y-2">
          <h2 className="font-headline text-headline-lg-mobile text-on-surface">{t.loadErrorTitle}</h2>
          <p className="font-body text-body-md leading-relaxed text-on-surface-variant">
            {message || t.loadErrorMessage}
          </p>
        </div>

        <button
          type="button"
          onClick={onRetry}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-container font-label text-button-text uppercase tracking-wider text-white shadow-cta transition-transform active:scale-95"
        >
          <RotateCw className="h-5 w-5" aria-hidden="true" />
          <span>{t.tryAgain}</span>
        </button>
      </div>
    </div>
  );
}
