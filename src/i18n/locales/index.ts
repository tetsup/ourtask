import { ja } from './ja';
import { en } from './en';

export type Lang = 'ja' | 'en';

export const getT = (lang: Lang) => (lang === 'ja' ? ja : en);
