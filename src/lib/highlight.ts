import highlightJS from 'highlight.js';
import jsonHighlighter from 'highlight.js/lib/languages/json';

highlightJS.registerLanguage('json', jsonHighlighter);

export function highlightJson(json: string): string {
  return highlightJS.highlight(json, { language: 'json' }).value;
}
