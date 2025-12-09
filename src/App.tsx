import { Layout } from '@/components/layout/Layout';
import { RecipeDisplay } from '@/components/recipe/RecipeDisplay';
import { parseRecipeFile } from '@/services/recipeParser';
import recipeContent from '../recipes/chocolate-chip-cookies.md?raw';

function App() {
  const recipe = parseRecipeFile(
    recipeContent,
    'recipes/chocolate-chip-cookies.md'
  );

  return (
    <Layout
      sidebar={
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Welcome to Recipe Archive
          </p>
        </div>
      }
    >
      <RecipeDisplay recipe={recipe} />
    </Layout>
  );
}

export default App;
