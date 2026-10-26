import { memo, useCallback } from 'react';
import {
  CATEGORY_EMOJI,
  CATEGORY_KEYS,
  getCategorySectionId,
} from '../../constants/categories';
import { useLanguage } from '../../i18n/LanguageContext';
import { getCategoryLabel } from '../../i18n/translations';
import { scrollToElement } from '../../utils/scrollTo';

function CategoryNavComponent({ menu, activeCategory, stickyOffset = 120 }) {
  const { locale } = useLanguage();

  const visibleCategories = CATEGORY_KEYS.filter(
    (key) => Array.isArray(menu?.[key]) && menu[key].length > 0,
  );

  const handleCategoryClick = useCallback(
    (key) => {
      scrollToElement(getCategorySectionId(key), stickyOffset);
    },
    [stickyOffset],
  );

  if (visibleCategories.length === 0) return null;

  return (
    <nav
      className="glass-nav sticky top-[60px] z-30 w-full sm:top-[68px]"
      aria-label="Menu categories"
    >
      <div className="hide-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6">
        {visibleCategories.map((key) => {
          const label = getCategoryLabel(locale, key);
          const emoji = CATEGORY_EMOJI[key];
          const isActive = activeCategory === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => handleCategoryClick(key)}
              className={[
                'shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200',
                'min-h-[44px] whitespace-nowrap',
                isActive
                  ? 'bg-amber-700 text-white amber-glow'
                  : 'border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-amber-700/40 hover:text-white',
              ].join(' ')}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="me-1.5" aria-hidden="true">
                {emoji}
              </span>
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export const CategoryNav = memo(CategoryNavComponent);
