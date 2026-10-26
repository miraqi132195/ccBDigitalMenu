import { memo } from 'react';
import {
  getCategoryEmoji,
  getCategoryImage,
  getCategorySectionId,
} from '../../constants/categories';
import { useLanguage } from '../../i18n/LanguageContext';
import { formatCount, getCategoryLabel } from '../../i18n/translations';
import { CategoryHeader } from './CategoryHeader';
import { MealCard } from './MealCard';

function CategorySectionComponent({ categoryKey, items, index = 0, onSelectItem }) {
  const { locale, t } = useLanguage();

  if (!items?.length) return null;

  const headingId = `${getCategorySectionId(categoryKey)}-title`;

  return (
    <section id={getCategorySectionId(categoryKey)} aria-labelledby={headingId}>
      <CategoryHeader
        headingId={headingId}
        label={getCategoryLabel(locale, categoryKey)}
        emoji={getCategoryEmoji(categoryKey)}
        countLabel={formatCount(t.itemsCount, items.length)}
        image={getCategoryImage(categoryKey)}
        index={index}
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {items.map((item, itemIndex) => (
          <MealCard
            key={item._id ?? `${categoryKey}-${itemIndex}`}
            item={item}
            categoryKey={categoryKey}
            onSelect={onSelectItem}
            featured={itemIndex === 0}
          />
        ))}
      </div>
    </section>
  );
}

export const CategorySection = memo(CategorySectionComponent);
