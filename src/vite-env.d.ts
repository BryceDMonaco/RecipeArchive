/// <reference types="vite/client" />

declare module 'virtual:recipe-manifest' {
  import { RecipeMetadata } from './types/recipe';
  const manifest: RecipeMetadata[];
  export default manifest;
}
