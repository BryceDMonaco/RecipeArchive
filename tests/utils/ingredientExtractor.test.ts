import { describe, it, expect } from 'vitest';
import { extractIngredients, formatIngredientsForClipboard } from '@/utils/ingredientExtractor';

describe('extractIngredients', () => {
  it('should extract ingredients from valid markdown with ingredients heading', () => {
    const markdown = `# Recipe Title

## Ingredients

- 2 cups flour
- 1 cup sugar
- 3 eggs

## Instructions

1. Mix ingredients
2. Bake
`;

    const ingredients = extractIngredients(markdown);

    expect(ingredients).toEqual([
      '2 cups flour',
      '1 cup sugar',
      '3 eggs',
    ]);
  });

  it('should handle ingredients heading with different case', () => {
    const markdown = `## INGREDIENTS

- Salt
- Pepper
`;

    const ingredients = extractIngredients(markdown);

    expect(ingredients).toEqual(['Salt', 'Pepper']);
  });

  it('should handle ingredients heading with partial match', () => {
    const markdown = `## Ingredient List

- Butter
- Milk
`;

    const ingredients = extractIngredients(markdown);

    expect(ingredients).toEqual(['Butter', 'Milk']);
  });

  it('should stop extracting at next heading', () => {
    const markdown = `## Ingredients

- Flour
- Sugar

## Instructions

- Mix well
`;

    const ingredients = extractIngredients(markdown);

    expect(ingredients).toEqual(['Flour', 'Sugar']);
    expect(ingredients).not.toContain('Mix well');
  });

  it('should handle asterisk list markers', () => {
    const markdown = `## Ingredients

* Item 1
* Item 2
`;

    const ingredients = extractIngredients(markdown);

    expect(ingredients).toEqual(['Item 1', 'Item 2']);
  });

  it('should return empty array if no ingredients heading found', () => {
    const markdown = `## Instructions

- Step 1
- Step 2
`;

    const ingredients = extractIngredients(markdown);

    expect(ingredients).toEqual([]);
  });

  it('should return empty array if ingredients section is empty', () => {
    const markdown = `## Ingredients

## Instructions

- Mix well
`;

    const ingredients = extractIngredients(markdown);

    expect(ingredients).toEqual([]);
  });

  it('should handle various heading levels', () => {
    const markdown = `### Ingredients

- Ingredient 1
- Ingredient 2

#### Sub-heading
`;

    const ingredients = extractIngredients(markdown);

    expect(ingredients).toEqual(['Ingredient 1', 'Ingredient 2']);
  });

  it('should ignore non-list content in ingredients section', () => {
    const markdown = `## Ingredients

- Flour
Some random text
- Sugar

## Instructions
`;

    const ingredients = extractIngredients(markdown);

    expect(ingredients).toEqual(['Flour', 'Sugar']);
  });
});

describe('formatIngredientsForClipboard', () => {
  it('should format ingredients with newlines', () => {
    const ingredients = ['Flour', 'Sugar', 'Eggs'];

    const formatted = formatIngredientsForClipboard(ingredients);

    expect(formatted).toBe('Flour\nSugar\nEggs');
  });

  it('should handle empty array', () => {
    const formatted = formatIngredientsForClipboard([]);

    expect(formatted).toBe('');
  });

  it('should handle single ingredient', () => {
    const formatted = formatIngredientsForClipboard(['Salt']);

    expect(formatted).toBe('Salt');
  });
});
