export interface Recipe {
  slug: string;
  title: string;
  tags: string[];
  content: string;
  filePath: string;
}

export interface RecipeMetadata {
  slug: string;
  title: string;
  tags: string[];
  filePath: string;
}

export interface RecipeFrontmatter {
  title?: string;
  tags?: string | string[];
}
