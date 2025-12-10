import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { RecipeList } from '@/components/recipe/RecipeList';
import { SearchBar } from '@/components/search/SearchBar';
import { TagFilter } from '@/components/filter/TagFilter';
import { HomePage } from '@/pages/HomePage';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useRecipeFilter } from '@/hooks/useRecipeFilter';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import recipeManifest from 'virtual:recipe-manifest';

// Lazy load RecipeDetailPage for code splitting
const RecipeDetailPage = lazy(() => import('@/pages/RecipeDetailPage'));

function App() {
  const {
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    clearTagFilters,
    filteredRecipes,
  } = useRecipeFilter(recipeManifest);

  const hasActiveFilters = searchQuery || selectedTags.length > 0;

  return (
    <ErrorBoundary>
      <HashRouter>
        <Layout
          sidebar={
            <>
              <div className="p-4 border-b">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search recipes..."
                />
                {hasActiveFilters && (
                  <p className="text-xs text-gray-500 mt-2">
                    Showing {filteredRecipes.length} of {recipeManifest.length}{' '}
                    recipes
                  </p>
                )}
              </div>
              <TagFilter
                recipes={recipeManifest}
                selectedTags={selectedTags}
                onToggleTag={toggleTag}
                onClearFilters={clearTagFilters}
              />
              <RecipeList recipes={filteredRecipes} />
            </>
          }
        >
          <Suspense fallback={<LoadingSpinner label="Loading page" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipe/:recipeSlug" element={<RecipeDetailPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </HashRouter>
    </ErrorBoundary>
  );
}

export default App;
