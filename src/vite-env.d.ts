/// <reference types="vite/client" />

declare module 'virtual:recipe-manifest' {
  import { SearchableRecipeMetadata } from './types/recipe';
  const manifest: SearchableRecipeMetadata[];
  export default manifest;
}
