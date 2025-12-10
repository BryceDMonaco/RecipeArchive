import { Layout } from '@/components/layout/Layout';
import { RecipeDisplay } from '@/components/recipe/RecipeDisplay';
import { RecipeList } from '@/components/recipe/RecipeList';
import { parseRecipeFile } from '@/services/recipeParser';
import recipeManifest from 'virtual:recipe-manifest';
import recipeContent from '../recipes/chocolate-chip-cookies.md?raw';

function App() {
  const recipe = parseRecipeFile(
    recipeContent,
    'recipes/chocolate-chip-cookies.md'
  );

  return (
    <Layout
      sidebar={
        <RecipeList recipes={recipeManifest} />
      }
    >
      <RecipeDisplay recipe={recipe} />
    </Layout>
  );
}

export default App;
