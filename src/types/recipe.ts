export interface Recipe {
  slug: string;
  title: string;
  tags: string[];
  content: string;
  filePath: string;
}

export interface RecipeMetadata {
  filename: string;
  slug: string;
  title: string;
  tags: string[];
}

export interface RecipeFrontmatter {
  title?: string;
  tags?: string | string[];
}
