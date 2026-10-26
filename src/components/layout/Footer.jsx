import { memo } from 'react';
import { Leaf } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

function FooterComponent() {
  const { t } = useLanguage();

  return (
    <footer className="pb-safe mx-auto w-full max-w-6xl px-6 pb-8 pt-6 text-center md:px-8">
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-1.5 font-label text-label-tag text-on-surface-variant">
          <Leaf className="h-4 w-4 shrink-0 text-tertiary" aria-hidden="true" />
          <span>{t.allergyTitle}</span>
        </div>
        <p className="max-w-md font-body text-body-sm text-outline">{t.allergyNote}</p>
      </div>
      <p className="mt-6 font-body text-body-sm text-outline" dir="ltr">
        Powered by <span className="font-label font-bold text-primary">Gravnix</span>
      </p>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
