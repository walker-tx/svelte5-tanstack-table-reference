import { type BundledTheme } from 'shiki/themes';

export const themes: Record<string, BundledTheme> = {
  light: 'github-light-default',
  dark: 'github-dark-default'
} as const;

export const themesArray = ['github-light-default', 'github-dark-default'];
