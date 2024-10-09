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
}

export {};
