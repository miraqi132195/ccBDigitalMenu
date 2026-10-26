import { memo } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LOCALE_OPTIONS } from '../../i18n/translations';

function LanguageSwitcherComponent() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className="flex shrink-0 items-center rounded-full bg-surface-container-high p-1"
      role="group"
      aria-label={t.language}
    >
      {LOCALE_OPTIONS.map((option) => {
        const isActive = locale === option.code;

        return (
          <button
            key={option.code}
            type="button"
            lang={option.code}
            onClick={() => setLocale(option.code)}
            aria-pressed={isActive}
            aria-label={option.name}
            title={option.name}
            className={[
              'flex h-9 min-w-9 items-center justify-center rounded-full px-2.5',
              'font-label text-[12px] font-bold transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container',
              isActive
                ? 'bg-surface-container-lowest text-primary shadow-[0_1px_3px_rgba(95,60,32,0.08)]'
                : 'text-on-surface-variant hover:text-on-surface',
            ].join(' ')}
          >
            {option.short}
          </button>
        );
      })}
    </div>
  );
}

export const LanguageSwitcher = memo(LanguageSwitcherComponent);
