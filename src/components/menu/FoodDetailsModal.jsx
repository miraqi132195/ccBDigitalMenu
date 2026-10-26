import { memo, useEffect, useRef } from 'react';
import { ArrowLeft, Info, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { getCategoryLabel } from '../../i18n/translations';
import { formatAddonPrice } from '../../utils/formatPrice';
import { getItemImage } from '../../utils/getItemImage';
import { displayText } from '../../utils/text';
import { MealImage } from '../ui/MealImage';
import { PriceTag } from '../ui/PriceTag';

const OPTION_GROUPS = [
  { field: 'sizes', labelKey: 'sizes', dot: 'bg-primary-container' },
  { field: 'breadsArr', labelKey: 'bread', dot: 'bg-secondary-container' },
  { field: 'toppings', labelKey: 'toppings', dot: 'bg-tertiary' },
  { field: 'sauces', labelKey: 'sauces', dot: 'bg-error' },
  { field: 'saladIngredients', labelKey: 'ingredients', dot: 'bg-tertiary' },
  { field: 'steakOptions', labelKey: 'steakOptions', dot: 'bg-primary' },
];

function getOptionLabel(option) {
  if (option && typeof option === 'object') {
    return displayText(option.name || option.label || option.title);
  }
  return displayText(option);
}

function OptionGroup({ title, options, dotClassName }) {
  if (!options?.length) return null;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className={['h-2 w-2 rounded-full', dotClassName].join(' ')} aria-hidden="true" />
        <h3 className="font-label text-headline-sm text-on-surface">{title}</h3>
      </div>
      <ul className="flex flex-wrap gap-2">
        {options.map((option, index) => {
          const label = getOptionLabel(option);
          const addonPrice = formatAddonPrice(
            option?.price ?? option?.extraPrice ?? option?.additionalPrice,
          );

          return (
            <li
              key={option?._id || option?.id || `${label}-${index}`}
              className="inline-flex max-w-full items-center gap-2 rounded-full border-[1.5px] border-hairline bg-surface-container-lowest px-3.5 py-2 shadow-chip"
            >
              <span dir="auto" className="truncate font-body text-body-md font-medium text-on-surface">
                {label}
              </span>
              {addonPrice && (
                <span dir="ltr" className="shrink-0 font-label text-body-sm font-bold text-primary">
                  {addonPrice}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function FoodDetailsModalComponent({ item, categoryKey, isOpen, onClose }) {
  const { t, locale } = useLanguage();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [isOpen, onClose]);

  if (!item || !isOpen) return null;

  const isAvailable = item.isAvailable !== false;
  const categoryLabel = categoryKey ? getCategoryLabel(locale, categoryKey) : null;
  const name = displayText(item.name);
  const description = displayText(item.description);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        tabIndex={-1}
        aria-label={t.close}
        onClick={onClose}
        className="absolute inset-0 hidden animate-fade-in bg-inverse-surface/45 backdrop-blur-sm sm:block"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="meal-details-title"
        className={[
          'relative flex h-full w-full animate-sheet-in flex-col overflow-hidden bg-surface',
          'sm:h-auto sm:max-h-[90vh] sm:max-w-xl sm:rounded-[28px] sm:shadow-sheet',
        ].join(' ')}
      >
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="relative">
            <MealImage
              src={getItemImage(item, categoryKey)}
              alt={name}
              className="aspect-[16/15] w-full rounded-b-[2.25rem] shadow-md sm:aspect-[16/11]"
              imgClassName={isAvailable ? '' : 'grayscale'}
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-b-[2.25rem] bg-gradient-to-t from-on-surface/50 via-transparent to-black/25"
              aria-hidden="true"
            />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className={[
                'absolute start-4 top-[max(1rem,env(safe-area-inset-top))] flex h-11 w-11 items-center justify-center',
                'rounded-full bg-surface/85 text-on-surface shadow-md backdrop-blur-md transition-transform active:scale-95',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container',
              ].join(' ')}
            >
              <X className="h-5 w-5" />
            </button>
            {!isAvailable && (
              <span className="absolute bottom-4 start-4 rounded-full bg-error-container px-3 py-1 font-label text-label-tag text-on-error-container shadow-sm">
                {t.currentlyUnavailable}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-6 px-4 pb-6 pt-5 sm:px-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-col">
                  {categoryLabel && (
                    <span className="font-label text-label-tag uppercase tracking-widest text-primary">
                      {categoryLabel}
                    </span>
                  )}
                  <h2
                    id="meal-details-title"
                    dir="auto"
                    className="text-start font-headline text-headline-lg-mobile font-extrabold tracking-tight text-on-surface"
                  >
                    {name}
                  </h2>
                </div>
                <div className="flex shrink-0 flex-col items-end">
                  <PriceTag price={item.price} className="text-[26px] font-extrabold leading-none text-primary-container" />
                  <span className="mt-1 font-label text-label-tag text-on-surface-variant/80">
                    {t.basePrice}
                  </span>
                </div>
              </div>

              {description && (
                <p
                  dir="auto"
                  className="pt-1 text-start font-body text-body-md leading-relaxed text-on-surface-variant md:text-body-lg"
                >
                  {description}
                </p>
              )}
            </div>

            {OPTION_GROUPS.map((group) => (
              <OptionGroup
                key={group.field}
                title={t[group.labelKey]}
                options={item[group.field]}
                dotClassName={group.dot}
              />
            ))}

            <div className="flex items-start gap-3 rounded-2xl bg-surface-container-high p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div className="flex flex-col gap-0.5">
                <span className="font-label text-[13px] font-bold text-on-surface">{t.allergyTitle}</span>
                <p className="font-body text-body-sm leading-relaxed text-on-surface-variant">
                  {t.allergyNote}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-safe shrink-0 bg-surface/95 shadow-sheet backdrop-blur-xl">
          <div className="flex flex-col gap-2.5 px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className={[
                'flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-container px-5',
                'font-label text-button-text uppercase tracking-wider text-white shadow-cta',
                'transition-all hover:brightness-105 active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
              ].join(' ')}
            >
              <ArrowLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
              <span>{t.backToMenu}</span>
            </button>
            <p className="text-center font-label text-[11px] tracking-wide text-on-surface-variant">
              {t.availabilityNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FoodDetailsModalComponent);
