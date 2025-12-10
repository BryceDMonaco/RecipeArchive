import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { RecipeList } from '@/components/recipe/RecipeList';
import { SearchBar } from '@/components/search/SearchBar';
import { HomePage } from '@/pages/HomePage';
import { RecipeDetailPage } from '@/pages/RecipeDetailPage';
import { useRecipeSearch } from '@/hooks/useRecipeSearch';
import recipeManifest from 'virtual:recipe-manifest';

function App() {
  const { searchQuery, setSearchQuery, filteredRecipes } =
    useRecipeSearch(recipeManifest);

  return (
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
              {searchQuery && (
                <p className="text-xs text-gray-500 mt-2">
                  Showing {filteredRecipes.length} of {recipeManifest.length}{' '}
                  recipes
                </p>
              )}
            </div>
            <RecipeList recipes={filteredRecipes} />
          </>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:recipeSlug" element={<RecipeDetailPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
