import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/layout/Hero';
import { Footer } from '../components/layout/Footer';
import { CategoryNav } from '../components/menu/CategoryNav';
import { CategorySection } from '../components/menu/CategorySection';
import { MenuEmpty } from '../components/menu/MenuEmpty';
import { MenuError } from '../components/menu/MenuError';
import { MenuSearch } from '../components/menu/MenuSearch';
import { MenuSkeleton } from '../components/menu/MenuSkeleton';
import { CATEGORY_KEYS } from '../constants/categories';
import { useActiveCategory } from '../hooks/useActiveCategory';
import { useMenu } from '../hooks/useMenu';
import { filterMenuBySearch, hasVisibleItems } from '../utils/filterMenu';

const FoodDetailsModal = lazy(
  () => import('../components/menu/FoodDetailsModal'),
);

const STICKY_OFFSET = 128;

export default function MenuPage() {
  const { data: menu, isLoading, isError, error, refetch } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(null);

  const filteredMenu = useMemo(
    () => filterMenuBySearch(menu, searchQuery),
    [menu, searchQuery],
  );

  const activeCategory = useActiveCategory(filteredMenu, STICKY_OFFSET);

  const handleSelectItem = useCallback((item, categoryKey) => {
    setSelectedItem(item);
    setSelectedCategoryKey(categoryKey);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
    setSelectedCategoryKey(null);
  }, []);

  const showEmptySearch = filteredMenu && searchQuery && !hasVisibleItems(filteredMenu);
  const showEmptyMenu = filteredMenu && !searchQuery && !hasVisibleItems(filteredMenu);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      <Hero />

      <div id="menu-categories" className="border-t border-zinc-900 bg-zinc-950 pb-16 pt-8">
        {isLoading && <MenuSkeleton />}

        {isError && (
          <MenuError
            message={error?.message}
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && filteredMenu && (
          <>
            <div className="mb-6">
              <MenuSearch value={searchQuery} onChange={setSearchQuery} />
            </div>

            <CategoryNav
              menu={filteredMenu}
              activeCategory={activeCategory}
              stickyOffset={STICKY_OFFSET}
            />

            <div className="mx-auto mt-8 w-full max-w-6xl space-y-12 px-4 sm:px-6">
              {showEmptySearch && <MenuEmpty isSearchResult />}

              {showEmptyMenu && <MenuEmpty />}

              {!showEmptySearch && !showEmptyMenu &&
                CATEGORY_KEYS.map((key) => (
                  <CategorySection
                    key={key}
                    categoryKey={key}
                    items={filteredMenu[key]}
                    onSelectItem={handleSelectItem}
                  />
                ))}
            </div>
          </>
        )}
      </div>

      <Footer />

      <Suspense fallback={null}>
        <FoodDetailsModal
          item={selectedItem}
          categoryKey={selectedCategoryKey}
          isOpen={Boolean(selectedItem)}
          onClose={handleCloseModal}
        />
      </Suspense>
    </div>
  );
}
