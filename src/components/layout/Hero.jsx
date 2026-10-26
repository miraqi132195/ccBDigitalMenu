import { memo } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

function HeroComponent({ children }) {
  const { t } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-3 pt-3 md:px-8 md:pt-6">
      <div className="relative overflow-hidden rounded-3xl bg-surface-container p-5 shadow-[0_4px_20px_-2px_rgba(95,60,32,0.08)] md:p-10">
        <div className="bg-halftone pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -start-12 -top-12 h-44 w-44 rounded-full bg-secondary-container/30 blur-2xl md:h-72 md:w-72"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-10 -end-10 h-36 w-36 rounded-full bg-primary-container/20 blur-xl md:h-64 md:w-64"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-1.5 md:max-w-2xl md:gap-3">
          <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-primary-container px-2.5 py-1 font-label text-label-tag uppercase text-white shadow-sm">
            <span>CCB</span>
            <span aria-hidden="true">✦</span>
            <span>{t.slogan}</span>
          </div>

          <h1 className="mt-1 font-headline text-headline-lg-mobile leading-none tracking-tight text-on-surface md:text-display-hero">
            {t.heroTitle}{' '}
            <span className="text-primary-container">{t.heroTitleAccent}</span>
          </h1>

          <p className="font-body text-body-md font-medium text-on-surface-variant md:text-body-lg">
            {t.heroSubtitle}
          </p>
        </div>

        {children && <div className="relative z-10 mt-4 md:mt-6 md:max-w-xl">{children}</div>}
      </div>
    </section>
  );
}

export const Hero = memo(HeroComponent);
