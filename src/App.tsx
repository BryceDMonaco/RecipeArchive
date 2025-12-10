import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { RecipeList } from '@/components/recipe/RecipeList';
import { HomePage } from '@/pages/HomePage';
import { RecipeDetailPage } from '@/pages/RecipeDetailPage';
import recipeManifest from 'virtual:recipe-manifest';

function App() {
  return (
    <HashRouter>
      <Layout sidebar={<RecipeList recipes={recipeManifest} />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:recipeSlug" element={<RecipeDetailPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
