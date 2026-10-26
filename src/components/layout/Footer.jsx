import { memo } from 'react';

function FooterComponent() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 py-8">
      <p className="text-center text-xs tracking-wide text-zinc-500 sm:text-sm">
        Powered by{' '}
        <span className="font-semibold text-amber-700/90">Gravnix</span>
      </p>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
