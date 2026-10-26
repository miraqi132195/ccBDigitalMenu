import { SearchX } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export function MenuEmpty({ isSearchResult = false }) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-zinc-500">
        <SearchX className="h-7 w-7" />
      </div>
      <h2 className="mb-2 text-xl font-semibold text-white">
        {isSearchResult ? t.emptySearchTitle : t.emptyMenuTitle}
      </h2>
      <p className="text-sm leading-relaxed text-zinc-400">
        {isSearchResult ? t.emptySearchMessage : t.emptyMenuMessage}
      </p>
    </div>
  );
}
