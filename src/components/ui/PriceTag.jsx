import { formatPrice } from '../../utils/formatPrice';

const CURRENCY = '₪';

export function PriceTag({ price, className = '' }) {
  const formatted = formatPrice(price);
  const hasCurrency = formatted.startsWith(CURRENCY);

  return (
    <span
      dir="ltr"
      className={['inline-flex items-baseline font-label tabular-nums', className].join(' ')}
    >
      {hasCurrency ? (
        <>
          <span className="me-0.5 text-[0.64em] font-bold">{CURRENCY}</span>
          {formatted.slice(CURRENCY.length)}
        </>
      ) : (
        formatted
      )}
    </span>
  );
}
