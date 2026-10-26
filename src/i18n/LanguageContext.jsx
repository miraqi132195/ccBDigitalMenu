import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { translations } from './translations';

const STORAGE_KEY = 'ccb-menu-locale';

const LanguageContext = createContext(null);

function isSupportedLocale(locale) {
  return APP_CONFIG.SUPPORTED_LOCALES.includes(locale);
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isSupportedLocale(stored)) return stored;
    return APP_CONFIG.DEFAULT_LOCALE;
  });

  const setLocale = useCallback((nextLocale) => {
    if (!isSupportedLocale(nextLocale)) return;
    setLocaleState(nextLocale);
    localStorage.setItem(STORAGE_KEY, nextLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = 'rtl';
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
      isRtl: true,
    }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
