import { AlertCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Button } from '../ui/Button';

export function MenuError({ message, onRetry }) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-950/50 text-red-400">
        <AlertCircle className="h-7 w-7" />
      </div>
      <h2 className="mb-2 text-xl font-semibold text-white">{t.loadErrorTitle}</h2>
      <p className="mb-6 text-sm leading-relaxed text-zinc-400">
        {message || t.loadErrorMessage}
      </p>
      <Button onClick={onRetry} variant="secondary">
        <RefreshCw className="h-4 w-4" />
        {t.tryAgain}
      </Button>
    </div>
  );
}
