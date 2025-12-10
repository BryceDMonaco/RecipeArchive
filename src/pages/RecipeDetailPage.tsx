import { useParams, useNavigate } from 'react-router-dom';
import { RecipeDisplay } from '@/components/recipe/RecipeDisplay';
import { parseRecipeFile } from '@/services/recipeParser';
import { useEffect, useState } from 'react';
import { Recipe } from '@/types/recipe';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Button } from '@/components/ui/button';
import logger from '@/utils/logger';

export function RecipeDetailPage() {
  const { recipeSlug } = useParams<{ recipeSlug: string }>();
  const navigate = useNavigate();
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
        logger.error('Error loading recipe:', err);
        setError(`Recipe "${recipeSlug}" not found`);
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [recipeSlug]);

  if (loading) {
    return <LoadingSpinner label="Loading recipe" />;
  }

  if (error || !recipe) {
    return (
      <ErrorMessage
        title="Recipe Not Found"
        message={error || 'The recipe you are looking for does not exist.'}
      >
        <Button onClick={() => navigate('/')} variant="outline">
          Browse all recipes
        </Button>
      </ErrorMessage>
    );
  }

  return <RecipeDisplay recipe={recipe} />;
}
