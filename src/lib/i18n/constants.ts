export const SUPPORTED_LOCALES = ['en', 'de'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';
export const STORAGE_KEY = 'locale';
