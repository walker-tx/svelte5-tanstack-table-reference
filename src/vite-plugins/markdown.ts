import { themes } from '../lib/highlight';
import rehypeShiki from '@shikijs/rehype';
import { transformerNotationDiff } from '@shikijs/transformers';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import type { PluginOption } from 'vite';

async function convertMarkdownToHtml(raw: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeShiki, {
      themes,
      transformers: [transformerNotationDiff()]
    })
    .use(rehypeStringify)
    .process(raw);

  return String(file);
}

const plugin: PluginOption = {
  name: 'markdown-parser',
  async transform(raw, id) {
    if (id.endsWith('.md')) {
      try {
        const html = await convertMarkdownToHtml(raw);
        return `export default ${JSON.stringify(html)}`;
      } catch (e) {
        this.error(e as Error);
      }
    }
  },
  async handleHotUpdate(ctx) {
    if (ctx.file.endsWith('.md')) {
      const defaultRead = ctx.read;
      ctx.read = async function () {
        const raw = await defaultRead();
        const html = await convertMarkdownToHtml(raw);
        return `export default ${JSON.stringify(html)}`;
      };
    }
  }
};

export default plugin;