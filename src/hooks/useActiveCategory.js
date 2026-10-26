import { useEffect, useState } from 'react';
import { CATEGORY_KEYS, getCategorySectionId } from '../constants/categories';

export function useActiveCategory(menu, headerOffset = 140) {
  const [activeCategory, setActiveCategory] = useState(CATEGORY_KEYS[0]);

  useEffect(() => {
    if (!menu) return undefined;

    const visibleKeys = CATEGORY_KEYS.filter(
      (key) => Array.isArray(menu[key]) && menu[key].length > 0,
    );

    if (visibleKeys.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          const key = visible[0].target.id.replace('category-', '');
          setActiveCategory(key);
        }
      },
      {
        rootMargin: `-${headerOffset}px 0px -55% 0px`,
        threshold: [0, 0.15, 0.35, 0.55],
      },
    );

    visibleKeys.forEach((key) => {
      const section = document.getElementById(getCategorySectionId(key));
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [menu, headerOffset]);

  return activeCategory;
}
