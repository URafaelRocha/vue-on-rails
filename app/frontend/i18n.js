import { createI18n } from 'vue-i18n';
import messages from './locales';

// const userLang = navigator.language || navigator.languages[0];

// Create and configure I18n instance
export const i18nInstance = createI18n({
  // locale: userLang,
  fallbackLocale: 'en-US',
  globalInjection: true,
  legacy: false,
  messages
});
