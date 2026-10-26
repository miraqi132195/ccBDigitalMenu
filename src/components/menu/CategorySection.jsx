import { memo } from 'react';
import { motion } from 'framer-motion';
import { CATEGORY_EMOJI } from '../../constants/categories';
import { useLanguage } from '../../i18n/LanguageContext';
import { getCategoryLabel } from '../../i18n/translations';
import { FoodCard } from './FoodCard';

function CategorySectionComponent({ categoryKey, items, onSelectItem }) {
  const { locale } = useLanguage();

  if (!items?.length) return null;

  const label = getCategoryLabel(locale, categoryKey);
  const emoji = CATEGORY_EMOJI[categoryKey];

  return (
    <motion.section
      id={`category-${categoryKey}`}
      className="scroll-mt-36"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-5 flex items-baseline gap-2">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          <span className="me-2" aria-hidden="true">
            {emoji}
          </span>
          {label}
        </h2>
        <span className="text-sm font-medium text-zinc-500">({items.length})</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <FoodCard
            key={item._id}
            item={item}
            categoryKey={categoryKey}
            onSelect={onSelectItem}
          />
        ))}
      </div>
    </motion.section>
  );
}

export const CategorySection = memo(CategorySectionComponent);
