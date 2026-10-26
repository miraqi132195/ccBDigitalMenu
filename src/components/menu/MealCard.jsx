import { memo, useCallback } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { getItemImage } from '../../utils/getItemImage';
import { displayText } from '../../utils/text';
import { MealImage } from '../ui/MealImage';
import { PriceTag } from '../ui/PriceTag';

function UnavailableBadge({ label }) {
  return (
    <span className="inline-flex items-center rounded-full bg-error-container px-2.5 py-1 font-label text-label-tag text-on-error-container shadow-sm">
      {label}
    </span>
  );
}

function MealCardComponent({ item, categoryKey, onSelect, featured = false }) {
  const { t } = useLanguage();
  const isAvailable = item.isAvailable !== false;
  const imageSrc = getItemImage(item, categoryKey);
  const name = displayText(item.name);
  const descriptionText = displayText(item.description);

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

  const interactive = isAvailable
    ? [
        'cursor-pointer transition-[transform,box-shadow] duration-300',
        'hover:-translate-y-0.5 hover:shadow-card-hover active:scale-[0.99]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container',
      ].join(' ')
    : 'cursor-not-allowed opacity-60';

  const title = (
    <h3
      dir="auto"
      className={[
        'text-start font-label text-headline-sm tracking-tight text-on-surface',
        featured ? '' : 'line-clamp-1 md:line-clamp-2',
      ].join(' ')}
    >
      {name}
    </h3>
  );

  const description = descriptionText && (
    <p
      dir="auto"
      className={[
        'line-clamp-2 text-start font-body text-on-surface-variant',
        featured ? 'text-body-md leading-relaxed' : 'text-body-sm md:text-body-md md:leading-relaxed',
      ].join(' ')}
    >
      {descriptionText}
    </p>
  );

  const price = <PriceTag price={item.price} className="shrink-0 text-price-display text-primary" />;

  const unavailableOverlay = !isAvailable && (
    <div className="absolute inset-0 flex items-center justify-center bg-on-surface/35">
      <UnavailableBadge label={t.currentlyUnavailable} />
    </div>
  );

  const articleProps = {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    role: isAvailable ? 'button' : undefined,
    tabIndex: isAvailable ? 0 : -1,
    'aria-disabled': !isAvailable,
  };

  if (featured) {
    return (
      <article
        {...articleProps}
        className={[
          'group flex flex-col overflow-hidden rounded-3xl bg-surface-container-lowest shadow-card',
          interactive,
        ].join(' ')}
      >
        <div className="relative">
          <MealImage
            src={imageSrc}
            alt={name}
            className="h-56 w-full md:aspect-[4/3] md:h-auto"
            imgClassName={[
              'transition-transform duration-500 ease-out',
              isAvailable ? 'group-hover:scale-105' : 'grayscale',
            ].join(' ')}
          />
          {unavailableOverlay}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-3">
            {title}
            {price}
          </div>
          {description}
        </div>
      </article>
    );
  }

  return (
    <article
      {...articleProps}
      className={[
        'group flex items-center gap-3.5 rounded-2xl bg-surface-container-lowest p-3.5 shadow-card',
        'md:flex-col md:items-stretch md:gap-0 md:overflow-hidden md:rounded-3xl md:p-0',
        interactive,
      ].join(' ')}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1 md:gap-2 md:p-4">
        <div className="flex items-start justify-between gap-3">
          {title}
          <span className="hidden md:inline-flex">{price}</span>
        </div>
        {description}
        <div className="mt-0.5 flex flex-wrap items-center gap-2 pt-1 md:hidden">
          {price}
          {!isAvailable && <UnavailableBadge label={t.currentlyUnavailable} />}
        </div>
      </div>
      <div className="relative shrink-0 md:order-first">
        <MealImage
          src={imageSrc}
          alt={name}
          compact
          className="h-24 w-24 rounded-xl md:aspect-[4/3] md:h-auto md:w-full md:rounded-none"
          imgClassName={[
            'transition-transform duration-500 ease-out',
            isAvailable ? 'md:group-hover:scale-105' : 'grayscale',
          ].join(' ')}
        />
        {!isAvailable && (
          <div className="absolute inset-0 hidden items-center justify-center bg-on-surface/35 md:flex">
            <UnavailableBadge label={t.currentlyUnavailable} />
          </div>
        )}
      </div>
    </article>
  );
}

export const MealCard = memo(MealCardComponent);
