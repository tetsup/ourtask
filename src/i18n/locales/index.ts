import { ja } from './ja';
import { en } from './en';

export const languages = { ja: 'Japanese', en: 'English' };

export type Lang = keyof typeof languages;

export const getT = (lang: Lang) => (lang === 'ja' ? ja : en);
