import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { extractIngredients, formatIngredientsForClipboard } from '@/utils/ingredientExtractor';
import { copyToClipboard } from '@/utils/clipboard';

interface CopyIngredientsButtonProps {
  /**
   * The markdown content of the recipe
   */
  content: string;
}

export function CopyIngredientsButton({ content }: CopyIngredientsButtonProps) {
  const [copied, setCopied] = useState(false);

  const ingredients = extractIngredients(content);
  const hasIngredients = ingredients.length > 0;

  const handleCopy = async () => {
    if (!hasIngredients) return;

    const ingredientsText = formatIngredientsForClipboard(ingredients);
    const success = await copyToClipboard(ingredientsText);

    if (success) {
      setCopied(true);
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      disabled={!hasIngredients}
      variant="outline"
      className="flex items-center gap-2"
      aria-label="Copy ingredients to clipboard"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" aria-hidden="true" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" aria-hidden="true" />
          Copy Ingredients
        </>
      )}
    </Button>
  );
}
