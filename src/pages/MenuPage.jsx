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
import { getVisibleCategoryKeys } from '../constants/categories';
import { useActiveCategory } from '../hooks/useActiveCategory';
import { useMenu } from '../hooks/useMenu';
import { filterMenuBySearch, hasVisibleItems } from '../utils/filterMenu';

const FoodDetailsModal = lazy(
  () => import('../components/menu/FoodDetailsModal'),
);

const STICKY_OFFSET = 132;

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

  const handleClearSearch = useCallback(() => setSearchQuery(''), []);

  const isReady = !isLoading && !isError && Boolean(filteredMenu);
  const showEmptySearch = isReady && searchQuery && !hasVisibleItems(filteredMenu);
  const showEmptyMenu = isReady && !searchQuery && !hasVisibleItems(filteredMenu);

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Header />

      <main className="flex-1">
        <Hero>
          {isReady && <MenuSearch value={searchQuery} onChange={setSearchQuery} />}
        </Hero>

        <div id="menu-categories" className="pb-6">
          {isLoading && <MenuSkeleton />}

          {isError && (
            <MenuError
              message={error?.message}
              onRetry={() => refetch()}
            />
          )}

          {isReady && (
            <>
              <CategoryNav
                menu={filteredMenu}
                activeCategory={activeCategory}
                stickyOffset={STICKY_OFFSET}
              />

              <div className="mx-auto mt-3 w-full max-w-6xl space-y-8 px-4 md:mt-6 md:space-y-12 md:px-8">
                {showEmptySearch && (
                  <MenuEmpty isSearchResult onClearSearch={handleClearSearch} />
                )}

                {showEmptyMenu && <MenuEmpty />}

                {!showEmptySearch && !showEmptyMenu &&
                  getVisibleCategoryKeys(filteredMenu).map((key, index) => (
                    <CategorySection
                      key={key}
                      categoryKey={key}
                      index={index}
                      items={filteredMenu[key]}
                      onSelectItem={handleSelectItem}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </main>

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
