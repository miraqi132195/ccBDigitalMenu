import { memo } from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

function MenuSearchComponent({ value, onChange }) {
  const { t } = useLanguage();

  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute start-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-primary"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t.searchPlaceholder}
        aria-label={t.searchPlaceholder}
        dir="auto"
        enterKeyHint="search"
        className={[
          'h-12 w-full rounded-2xl bg-surface-container-lowest ps-11 text-start',
          value ? 'pe-11' : 'pe-4',
          'font-body text-[16px] text-on-surface placeholder:text-outline/70 md:text-body-md',
          'shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-container',
        ].join(' ')}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className={[
            'absolute end-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center',
            'rounded-full bg-surface-container-high text-on-surface-variant transition-colors',
            'hover:bg-surface-container-highest hover:text-on-surface',
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
