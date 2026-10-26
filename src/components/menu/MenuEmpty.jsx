import { SearchX } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

function EmptyTrayIllustration() {
  return (
    <svg className="relative z-10 h-32 w-32" fill="none" viewBox="0 0 120 120" aria-hidden="true">
      <rect fill="#F4EDE2" height="50" rx="8" transform="rotate(-6 60 60)" width="70" x="25" y="35" />
      <path d="M18 58L24 94C24.8 98.4 28.6 101.6 33.1 101.6H86.9C91.4 101.6 95.2 98.4 96 94L102 58H18Z" fill="#FFDBCE" />
      <path d="M22 62H98" stroke="#A53C00" strokeLinecap="round" strokeWidth="3" />
      <path d="M40 48C40 37 49 28 60 28C71 28 80 37 80 48H40Z" fill="#FFC928" />
      <path d="M68 28C68 28 73 24 74 20C78 24 78 27 76 30C74 29 70 29 68 28Z" fill="#FF6B21" />
      <circle cx="52" cy="40" fill="#252525" r="2" />
      <circle cx="68" cy="40" fill="#252525" r="2" />
      <path d="M54 48C57 45 63 45 66 48" stroke="#252525" strokeLinecap="round" strokeWidth="2" />
      <circle cx="34" cy="48" fill="#A53C00" r="1.5" />
      <circle cx="86" cy="44" fill="#FF6B21" r="2" />
      <circle cx="82" cy="80" fill="#765A00" r="1.5" />
      <circle cx="38" cy="82" fill="#765A00" r="1.5" />
    </svg>
  );
}

export function MenuEmpty({ isSearchResult = false, onClearSearch }) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-5 rounded-3xl bg-surface-container-lowest p-6 text-center shadow-sm">
      <div className="relative flex h-40 w-40 items-center justify-center">
        <div className="absolute inset-0 scale-95 rounded-full bg-secondary-container/20" aria-hidden="true" />
        <EmptyTrayIllustration />
      </div>

      <div className="max-w-xs space-y-2">
        <h2 className="font-headline text-headline-lg-mobile text-on-surface">
          {isSearchResult ? t.emptySearchTitle : t.emptyMenuTitle}
        </h2>
        <p className="font-body text-body-md leading-relaxed text-on-surface-variant">
          {isSearchResult ? t.emptySearchMessage : t.emptyMenuMessage}
        </p>
      </div>

      {isSearchResult && onClearSearch && (
        <button
          type="button"
          onClick={onClearSearch}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-container font-label text-button-text uppercase tracking-wider text-white shadow-cta transition-transform active:scale-95"
        >
          <SearchX className="h-5 w-5" aria-hidden="true" />
          <span>{t.clearSearch}</span>
        </button>
      )}
    </div>
  );
}
