import en from './en.js';
import zh from './zh.js';

export const LOCALE_OPTIONS = {
    zh: 'zh-TW',
    en: 'en'
};

export const getLocaleMessages = (locale) => {
    return locale === LOCALE_OPTIONS.zh ? zh : en;
};