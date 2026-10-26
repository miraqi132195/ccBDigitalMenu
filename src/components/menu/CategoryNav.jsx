import { memo, useCallback, useEffect, useRef } from 'react';
import {
  getCategoryEmoji,
  getCategorySectionId,
  getVisibleCategoryKeys,
} from '../../constants/categories';
import { useLanguage } from '../../i18n/LanguageContext';
import { getCategoryLabel } from '../../i18n/translations';
import { scrollToElement } from '../../utils/scrollTo';

function CategoryNavComponent({ menu, activeCategory, stickyOffset = 120 }) {
  const { locale, t } = useLanguage();
  const railRef = useRef(null);

  const visibleCategories = getVisibleCategoryKeys(menu);

  const handleCategoryClick = useCallback(
    (key) => {
      scrollToElement(getCategorySectionId(key), stickyOffset);
    },
    [stickyOffset],
  );

  useEffect(() => {
    const rail = railRef.current;
    const chip = rail?.querySelector('[aria-current="true"]');
    if (!rail || !chip || rail.scrollWidth <= rail.clientWidth) return;

    const railRect = rail.getBoundingClientRect();
    const chipRect = chip.getBoundingClientRect();
    const delta =
      chipRect.left + chipRect.width / 2 - (railRect.left + railRect.width / 2);

    rail.scrollBy({ left: delta, behavior: 'smooth' });
  }, [activeCategory]);

  if (visibleCategories.length === 0) return null;

  return (
    <nav
      className="sticky top-16 z-30 w-full bg-surface/90 py-2.5 backdrop-blur-md"
      aria-label={t.menuCategories}
    >
      <div ref={railRef} className="no-scrollbar mx-auto max-w-6xl overflow-x-auto scroll-smooth">
        <div className="flex w-max min-w-full gap-2 px-4 md:justify-center md:px-8">
          {visibleCategories.map((key) => {
            const isActive = activeCategory === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleCategoryClick(key)}
                aria-current={isActive ? 'true' : undefined}
                className={[
                  'flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5',
                  'font-label text-button-text transition-all duration-200 active:scale-95',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                  isActive
                    ? 'scale-[1.02] bg-primary-container text-white shadow-glow'
                    : 'bg-surface-container-lowest text-on-surface-variant shadow-chip hover:text-on-surface',
                ].join(' ')}
              >
                <span aria-hidden="true">{getCategoryEmoji(key)}</span>
                <span>{getCategoryLabel(locale, key)}</span>
                <span className={isActive ? 'text-white/80' : 'text-outline'}>
                  ({menu[key].length})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export const CategoryNav = memo(CategoryNavComponent);
