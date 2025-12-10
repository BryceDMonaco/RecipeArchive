import { RecipeMetadata } from '@/types/recipe';
import { Card } from '@/components/ui/card';
import { Link, useLocation } from 'react-router-dom';

interface RecipeListProps {
  recipes: RecipeMetadata[];
}

export function RecipeList({ recipes }: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No recipes found</p>
      </div>
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
        className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
          isActive ? 'bg-blue-50 border-blue-300' : ''
        }`}
      >
        <h3 className="font-medium text-sm">{recipe.title}</h3>
        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {recipe.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
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
