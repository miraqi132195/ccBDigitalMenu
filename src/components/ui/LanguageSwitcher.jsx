import { memo } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

function LanguageSwitcherComponent() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 p-1"
      role="group"
      aria-label={t.language}
    >
      <button
        type="button"
        onClick={() => setLocale('he')}
        className={[
          'min-h-[36px] rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm',
          locale === 'he'
            ? 'bg-amber-700 text-white'
            : 'text-zinc-400 hover:text-white',
        ].join(' ')}
        aria-pressed={locale === 'he'}
      >
        עברית
      </button>
      <button
        type="button"
        onClick={() => setLocale('ar')}
        className={[
          'min-h-[36px] rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm',
          locale === 'ar'
            ? 'bg-amber-700 text-white'
            : 'text-zinc-400 hover:text-white',
        ].join(' ')}
        aria-pressed={locale === 'ar'}
      >
        العربية
      </button>
    </div>
  );
}

export const LanguageSwitcher = memo(LanguageSwitcherComponent);
