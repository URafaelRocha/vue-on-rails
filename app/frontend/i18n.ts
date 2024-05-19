import { createI18n } from 'vue-i18n';
import messages from './locales';

// const userLang = navigator.language || navigator.languages[0];
// const userLang = 'pt-BR';
const userLang = 'en-US';

// Create and configure I18n instance
export const i18nInstance = createI18n({
  locale: userLang,
  globalInjection: true,
  legacy: false,
  messages
});
