import { memo } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { getCategoryLabel } from '../../i18n/translations';
import { formatAddonPrice, formatPrice } from '../../utils/formatPrice';
import { getItemImage } from '../../utils/getItemImage';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';

function OptionGroup({ title, options, delay = 0 }) {
  if (!options?.length) return null;

  return (
    <motion.section
      className="mb-7"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: 'easeOut' }}
    >
      <div className="mb-3 flex items-center gap-3">
        <h3 className="text-start text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-600/90">
          {title}
        </h3>
        <div className="h-px flex-1 bg-gradient-to-l from-zinc-800 to-transparent" />
      </div>

      <ul className="flex flex-wrap gap-2">
        {options.map((option, index) => {
          const label = option.name || option.label || option.title || String(option);
          const price = option.price ?? option.extraPrice ?? option.additionalPrice;
          const addonPrice = formatAddonPrice(price);

          return (
            <li
              key={option._id || option.id || `${label}-${index}`}
              className={[
                'inline-flex max-w-full items-center gap-2 rounded-full',
                'border border-zinc-800/90 bg-zinc-900/80 px-3.5 py-2',
                'text-sm text-zinc-200 transition-colors',
              ].join(' ')}
            >
              <span className="truncate text-start">{label}</span>
              {addonPrice && (
                <span className="shrink-0 text-xs font-semibold text-orange-400">
                  {addonPrice}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}

function FoodDetailsModalComponent({ item, categoryKey, isOpen, onClose }) {
  const { t, locale } = useLanguage();

  if (!item) return null;

  const isAvailable = item.isAvailable !== false;
  const imageSrc = getItemImage(item, categoryKey);
  const categoryLabel = categoryKey
    ? getCategoryLabel(locale, categoryKey)
    : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={item.name}
      showHeader={false}
      size="lg"
    >
      <div className="relative">
        {/* Hero image */}
        <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[16/11]">
          <motion.img
            key={imageSrc}
            src={imageSrc}
            alt={item.name}
            className="h-full w-full object-cover"
            loading="lazy"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/35 to-black/25" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className={[
              'absolute top-4 end-4 z-20 flex h-11 w-11 items-center justify-center',
              'rounded-full border border-white/15 bg-black/45 text-white',
              'backdrop-blur-md transition-colors hover:bg-black/65',
            ].join(' ')}
            aria-label={t.close}
          >
            <X className="h-5 w-5" />
          </button>

          {!isAvailable && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 backdrop-blur-[2px]">
              <Badge variant="unavailable">{t.currentlyUnavailable}</Badge>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 sm:px-6 sm:pb-6">
            {categoryLabel && (
              <span className="mb-2.5 inline-flex rounded-full border border-amber-700/35 bg-amber-950/50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-amber-400 backdrop-blur-sm">
                {categoryLabel}
              </span>
            )}
            <h2
              id="modal-title"
              className="text-start text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl"
            >
              {item.name}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="relative px-5 pb-6 pt-5 sm:px-6 sm:pb-7">
          {item.description && (
            <motion.p
              className="mb-6 text-start text-sm leading-relaxed text-zinc-400 sm:text-[15px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              {item.description}
            </motion.p>
          )}

          <motion.div
            className={[
              'mb-7 flex items-center justify-between gap-4 overflow-hidden',
              'rounded-2xl border border-amber-900/30',
              'bg-gradient-to-br from-amber-950/40 via-zinc-900/80 to-zinc-950',
              'px-4 py-3.5 sm:px-5',
            ].join(' ')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
          >
            <p className="text-start text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
              {t.basePrice}
            </p>
            <p className="text-2xl font-bold tracking-tight text-amber-500 sm:text-3xl">
              {formatPrice(item.price)}
            </p>
          </motion.div>

          <OptionGroup title={t.sizes} options={item.sizes} delay={0.2} />
          <OptionGroup title={t.bread} options={item.breadsArr} delay={0.25} />
          <OptionGroup title={t.toppings} options={item.toppings} delay={0.3} />
          <OptionGroup title={t.sauces} options={item.sauces} delay={0.35} />
        </div>
      </div>
    </Modal>
  );
}

export default memo(FoodDetailsModalComponent);
