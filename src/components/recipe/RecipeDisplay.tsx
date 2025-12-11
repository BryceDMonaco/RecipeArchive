import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Recipe } from '@/types/recipe';
import { CopyIngredientsButton } from './CopyIngredientsButton';

interface RecipeDisplayProps {
  recipe: Recipe;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
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
