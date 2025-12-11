import { RecipeMetadata } from '@/types/recipe';
import { Card } from '@/components/ui/card';
import { Link, useLocation } from 'react-router-dom';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';

interface RecipeListProps {
  recipes: RecipeMetadata[];
}

export function RecipeList({ recipes }: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <EmptyState
        title="No Recipes Found"
        message="No recipes match your current search or filter criteria. Try adjusting your filters or search terms."
        icon={<Search className="h-16 w-16" />}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-auto">
      {recipes.map(recipe => (
        <RecipeListItem key={recipe.slug} recipe={recipe} />
      ))}
    </div>
  );
}

interface RecipeListItemProps {
  recipe: RecipeMetadata;
}

function RecipeListItem({ recipe }: RecipeListItemProps) {
  const location = useLocation();
  const isActive = location.pathname === `/recipe/${recipe.slug}`;

  return (
    <Link to={`/recipe/${recipe.slug}`}>
      <Card
        className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
          isActive ? 'bg-blue-50 border-blue-300 dark:bg-blue-950 dark:border-blue-700' : ''
        }`}
      >
        <h3 className="font-medium text-sm">{recipe.title}</h3>
        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {recipe.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Card>
    </Link>
  );
}
