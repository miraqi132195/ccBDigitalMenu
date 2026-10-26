import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { formatPrice } from '../../utils/formatPrice';
import { getItemImage } from '../../utils/getItemImage';
import { Badge } from '../ui/Badge';

function FoodCardComponent({ item, categoryKey, onSelect }) {
  const { t } = useLanguage();
  const isAvailable = item.isAvailable !== false;
  const imageSrc = getItemImage(item, categoryKey);

  const handleClick = useCallback(() => {
    if (!isAvailable) return;
    onSelect(item, categoryKey);
  }, [isAvailable, item, categoryKey, onSelect]);

  const handleKeyDown = useCallback(
    (event) => {
      if (!isAvailable) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect(item, categoryKey);
      }
    },
    [isAvailable, item, categoryKey, onSelect],
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      className={[
        'group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900',
        'transition-all duration-300',
        isAvailable
          ? 'amber-glow-hover cursor-pointer focus-within:ring-2 focus-within:ring-amber-700/50'
          : 'cursor-not-allowed opacity-55',
      ].join(' ')}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isAvailable ? 'button' : undefined}
      tabIndex={isAvailable ? 0 : -1}
      aria-disabled={!isAvailable}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
        <img
          src={imageSrc}
          alt={item.name}
          className={[
            'h-full w-full object-cover transition-transform duration-500',
            isAvailable ? 'group-hover:scale-105' : 'grayscale',
          ].join(' ')}
          loading="lazy"
          decoding="async"
        />
        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Badge variant="unavailable">{t.currentlyUnavailable}</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-start text-base font-semibold leading-snug text-white sm:text-lg">
            {item.name}
          </h3>
          <span className="shrink-0 text-base font-bold text-amber-700 sm:text-lg">
            {formatPrice(item.price)}
          </span>
        </div>

        {item.description && (
          <p className="line-clamp-2 flex-1 text-start text-sm leading-relaxed text-zinc-400">
            {item.description}
          </p>
        )}

        {isAvailable && (
          <p className="mt-3 text-start text-xs font-medium text-orange-500 opacity-0 transition-opacity group-hover:opacity-100">
            {t.tapForDetails}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export const FoodCard = memo(FoodCardComponent);
