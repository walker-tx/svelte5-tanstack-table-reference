import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import pkg from './package.json' assert { type: 'json' };
import markdown from './src/vite-plugins/markdown';

export default defineConfig({
  plugins: [sveltekit(), markdown],
  define: {
    __GITHUB_URL__: `"${pkg.homepage}"`
  }
});
