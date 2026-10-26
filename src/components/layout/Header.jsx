import { memo } from 'react';
import logo from '../../assets/logo.png';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

function HeaderComponent() {
  const { t } = useLanguage();

  return (
    <header className="glass-header sticky top-0 z-40 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={logo}
            alt={`${t.restaurantName} logo`}
            className="h-11 w-11 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
            width={48}
            height={48}
            loading="eager"
          />
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold tracking-wide text-white sm:text-lg">
              {t.restaurantName}
            </h1>
            <p className="truncate text-xs text-amber-700/90 sm:text-sm">{t.slogan}</p>
          </div>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
