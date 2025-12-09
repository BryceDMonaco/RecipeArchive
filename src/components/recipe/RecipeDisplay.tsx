import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Recipe } from '@/types/recipe';

interface RecipeDisplayProps {
  recipe: Recipe;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <article className="prose prose-zinc max-w-3xl">
      <h1>{recipe.title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{recipe.content}</ReactMarkdown>
    </article>
  );
}
