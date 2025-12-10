import { useParams } from 'react-router-dom';
import { RecipeDisplay } from '@/components/recipe/RecipeDisplay';
import { parseRecipeFile } from '@/services/recipeParser';
import { useEffect, useState } from 'react';
import { Recipe } from '@/types/recipe';

export function RecipeDetailPage() {
  const { recipeSlug } = useParams<{ recipeSlug: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recipeSlug) {
      setError('No recipe specified');
      setLoading(false);
      return;
    }

    async function loadRecipe() {
      try {
        setLoading(true);
        setError(null);

        // Dynamically import the recipe markdown file
        const recipeModule = await import(
          `../../recipes/${recipeSlug}.md?raw`
        );
        const content = recipeModule.default;

        const parsedRecipe = parseRecipeFile(
          content,
          `recipes/${recipeSlug}.md`
        );

        setRecipe(parsedRecipe);
      } catch (err) {
        console.error('Error loading recipe:', err);
        setError(`Recipe "${recipeSlug}" not found`);
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [recipeSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading recipe...</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-2">
            {error || 'Recipe not found'}
          </p>
          <p className="text-gray-500 text-sm">
            Please select a recipe from the sidebar
          </p>
        </div>
      </div>
    );
  }

  return <RecipeDisplay recipe={recipe} />;
}
