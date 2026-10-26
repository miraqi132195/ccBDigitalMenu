import { CATEGORY_PLACEHOLDERS } from '../constants/categories';

export function getItemImage(item, categoryKey) {
  if (item?.image) return item.image;
  return CATEGORY_PLACEHOLDERS[categoryKey] || CATEGORY_PLACEHOLDERS.burgers;
}
