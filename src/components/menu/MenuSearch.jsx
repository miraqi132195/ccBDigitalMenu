import { memo } from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

function MenuSearchComponent({ value, onChange }) {
  const { t } = useLanguage();

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <Search
        className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 sm:start-6"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t.searchPlaceholder}
        aria-label={t.searchPlaceholder}
        dir="auto"
        className={[
          'w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-3.5 ps-12 pe-12',
          'text-base text-white placeholder:text-zinc-500',
          'transition-colors focus:border-amber-700/60 focus:outline-none focus:ring-2',
          'focus:ring-amber-700/30 min-h-[48px]',
        ].join(' ')}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className={[
            'absolute end-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center',
            'justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white',
            'sm:end-6',
          ].join(' ')}
          aria-label={t.clearSearch}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export const MenuSearch = memo(MenuSearchComponent);
