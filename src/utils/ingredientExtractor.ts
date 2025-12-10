/**
 * Extracts ingredients from markdown content.
 * Looks for a heading that contains "Ingredient" (case-insensitive)
 * and extracts all list items following it until the next heading.
 */
export function extractIngredients(markdownContent: string): string[] {
  const lines = markdownContent.split('\n');
  const ingredients: string[] = [];
  let inIngredientsSection = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Check if this is a heading
    if (trimmedLine.match(/^#+\s+/)) {
      const headingText = trimmedLine.replace(/^#+\s+/, '');

      // Check if this is the ingredients heading
      if (headingText.toLowerCase().includes('ingredient')) {
        inIngredientsSection = true;
        continue;
      } else if (inIngredientsSection) {
        // We've hit a new heading after ingredients, stop collecting
        break;
      }
    }

    // If we're in the ingredients section, collect list items
    if (inIngredientsSection && trimmedLine.match(/^[-*]\s+/)) {
      // Remove the markdown list marker (- or *) and extract the ingredient text
      const ingredient = trimmedLine.replace(/^[-*]\s+/, '');
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
  }

  return ingredients;
}

/**
 * Formats ingredients as plain text for clipboard (one per line)
 */
export function formatIngredientsForClipboard(ingredients: string[]): string {
  return ingredients.join('\n');
}
