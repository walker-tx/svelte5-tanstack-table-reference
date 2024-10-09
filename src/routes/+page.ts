import pkg from '../../package.json';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
  return {
    repo_url: pkg.homepage
  };
};
