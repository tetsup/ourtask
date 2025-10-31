'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { getT, Lang } from './locales/index';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: ReturnType<typeof getT>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
  initialLang: Lang;
}

export const LanguageProvider = ({
  children,
  initialLang,
}: LanguageProviderProps) => {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [t, setT] = useState(getT(lang));
  useEffect(() => {
    setT(getT(lang));
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
