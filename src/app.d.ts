// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  type EmptyObject = Record<PropertyKey, never>;

  type PageProps<TPageData = EmptyObject> = {
    data: TPageData;
  };

  declare module '*.md' {
    export default string;
  }

  // Defined in vite.config.ts under "define"
  declare const __GITHUB_URL__: string;
}

export {};
