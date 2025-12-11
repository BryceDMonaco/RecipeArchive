import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Recipe } from '@/types/recipe';
import { CopyIngredientsButton } from './CopyIngredientsButton';

interface RecipeDisplayProps {
  recipe: Recipe;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  // Check if content has "## Ingredients" heading
  const hasIngredientsHeading = /^##\s+Ingredients/m.test(recipe.content);

  if (hasIngredientsHeading) {
    // Split content at Ingredients heading
    const parts = recipe.content.split(/^(##\s+Ingredients)/m);
    const beforeIngredients = parts[0] || '';
    const ingredientsHeading = parts[1] || '';
    const afterIngredients = parts[2] || '';

    return (
      <article className="prose prose-zinc max-w-3xl pb-24">
        <h1>{recipe.title}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {beforeIngredients}
        </ReactMarkdown>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {ingredientsHeading}
        </ReactMarkdown>
        <div className="not-prose my-4">
          <CopyIngredientsButton content={recipe.content} />
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {afterIngredients}
        </ReactMarkdown>
      </article>
    );
  }

  // Fallback: current behavior (button at bottom)
  return (
    <article className="prose prose-zinc max-w-3xl pb-24">
      <h1>{recipe.title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{recipe.content}</ReactMarkdown>
      <div className="not-prose my-6">
        <CopyIngredientsButton content={recipe.content} />
      </div>
    </article>
  );
}
