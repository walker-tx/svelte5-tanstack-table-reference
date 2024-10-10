import { getSingletonHighlighter } from 'shiki/bundle/web';

export async function getHighlighter() {
  const highlighter = await getSingletonHighlighter({
    themes: ['vitesse-light'],
    langs: ['json']
  });

  return (code: string) =>
    highlighter.codeToHtml(code, {
      theme: 'vitesse-light',
      lang: 'json'
    });
}
