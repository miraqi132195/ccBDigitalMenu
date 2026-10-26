import { CATEGORY_KEYS } from '../constants/categories';

function matchesSearch(item, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const name = (item.name || '').toLowerCase();
  const description = (item.description || '').toLowerCase();

  return name.includes(normalized) || description.includes(normalized);
}

export function filterMenuBySearch(menu, query) {
  if (!menu) return null;

  const filtered = { ...menu };

  CATEGORY_KEYS.forEach((key) => {
    const items = menu[key];
    if (!Array.isArray(items)) return;

    filtered[key] = items.filter((item) => matchesSearch(item, query));
  });

  return filtered;
}

export function hasVisibleItems(menu) {
  if (!menu) return false;

  return CATEGORY_KEYS.some(
    (key) => Array.isArray(menu[key]) && menu[key].length > 0,
  );
}
