import { useEffect, useState } from 'react';
import { getCategorySectionId, getVisibleCategoryKeys } from '../constants/categories';

export function useActiveCategory(menu, headerOffset = 140) {
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (!menu) return undefined;

    const visibleKeys = getVisibleCategoryKeys(menu);

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

  const visibleKeys = menu ? getVisibleCategoryKeys(menu) : [];

  return visibleKeys.includes(activeCategory) ? activeCategory : visibleKeys[0] ?? null;
}
