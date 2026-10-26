import { getCategoryKeys, getVisibleCategoryKeys } from '../constants/categories';

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

  getCategoryKeys(menu).forEach((key) => {
    filtered[key] = menu[key].filter((item) => matchesSearch(item, query));
  });

  return filtered;
}

export function hasVisibleItems(menu) {
  if (!menu) return false;

  return getVisibleCategoryKeys(menu).length > 0;
}
