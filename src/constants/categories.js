export const CATEGORY_KEYS = [
  'burgers',
  'steaks',
  'chicken',
  'sides',
  'drinks',
  'salads',
];

export const CATEGORY_EMOJI = {
  burgers: '🍔',
  chicken: '🍗',
  sides: '🍟',
  drinks: '🥤',
  salads: '🥗',
  steaks: '🥩',
};

export const DEFAULT_CATEGORY_EMOJI = '🍽️';

export const CATEGORY_PLACEHOLDERS = {
  burgers:
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop',
  chicken:
    'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80&auto=format&fit=crop',
  sides:
    'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80&auto=format&fit=crop',
  drinks:
    'https://images.unsplash.com/photo-1546173159-3157242bc82b?w=800&q=80&auto=format&fit=crop',
  salads:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80&auto=format&fit=crop',
  steaks:
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80&auto=format&fit=crop',
};

// Optional cover image per category key, e.g. { burgers: 'https://...' }.
// Categories without an entry render the illustrated header instead.
export const CATEGORY_IMAGES = {};

export const getCategorySectionId = (key) => `category-${key}`;

export function getCategoryKeys(menu) {
  if (!menu) return [];

  const known = CATEGORY_KEYS.filter((key) => Array.isArray(menu[key]));
  const extra = Object.keys(menu).filter(
    (key) => Array.isArray(menu[key]) && !CATEGORY_KEYS.includes(key),
  );

  return [...known, ...extra];
}

export function getVisibleCategoryKeys(menu) {
  return getCategoryKeys(menu).filter((key) => menu[key].length > 0);
}

export function getCategoryEmoji(key) {
  return CATEGORY_EMOJI[key] ?? DEFAULT_CATEGORY_EMOJI;
}

export function getCategoryImage(key) {
  return CATEGORY_IMAGES[key] || null;
}
