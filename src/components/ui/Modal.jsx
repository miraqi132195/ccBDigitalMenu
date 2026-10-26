import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  showHeader = true,
  size = 'md',
  className = '',
}) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const sizeClass =
    size === 'lg' ? 'sm:max-w-xl' : size === 'xl' ? 'sm:max-w-2xl' : 'sm:max-w-lg';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
          <motion.button
            type="button"
            aria-label={t.close}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            className={[
              'relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden',
              'rounded-t-[1.75rem] border border-zinc-800/80 bg-zinc-950',
              'shadow-[0_25px_80px_-12px_rgba(0,0,0,0.75)] sm:rounded-3xl',
              sizeClass,
              className,
            ].join(' ')}
            initial={{ opacity: 0, y: 56, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: 'spring', damping: 30, stiffness: 340 }}
          >
            {showHeader && (
              <div className="flex items-center justify-between border-b border-zinc-800/80 px-5 py-4">
                {title ? (
                  <h2 id="modal-title" className="text-start text-lg font-semibold text-white">
                    {title}
                  </h2>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className={[
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                    'text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white',
                  ].join(' ')}
                  aria-label={t.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
