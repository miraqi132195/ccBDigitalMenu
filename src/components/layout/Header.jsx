import { memo } from 'react';
import logo from '../../assets/logo.png';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

function HeaderComponent() {
  const { t } = useLanguage();

  return (
    <header className="pt-safe sticky top-0 z-40 w-full bg-surface/85 shadow-header backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 md:px-8">
        <div className="flex min-w-0 items-center gap-2.5">
          <img
            src={logo}
            alt={`${t.restaurantName} logo`}
            className="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm"
            width={40}
            height={40}
            loading="eager"
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-label text-headline-sm leading-none uppercase tracking-tight text-on-surface">
              CCB
            </span>
            <span className="mt-1 truncate font-label text-label-tag text-on-surface-variant">
              {t.menuLabel}
            </span>
          </div>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
