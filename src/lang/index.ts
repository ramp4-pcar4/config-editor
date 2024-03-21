import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    title: 'RAMP4 Config Editor',
    loading: 'Waiting for config...'
  },
  fr: {
    title: '[FR] RAMP4 Config Editor',
    fr: '[FR] Waiting for config...'
  }
};

const i18n = createI18n({
  legacy: false,
  // get the language of the page from the root `html` node
  locale: 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages
});

export { i18n };
