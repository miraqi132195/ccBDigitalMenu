export function formatPrice(price) {
  if (price == null || Number.isNaN(Number(price))) return '—';
  return `₪${Number(price).toFixed(0)}`;
}

export function formatAddonPrice(price) {
  if (!price || Number(price) === 0) return null;
  return `+${formatPrice(price)}`;
}
