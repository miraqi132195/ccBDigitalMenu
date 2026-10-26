export function Badge({ children, variant = 'default', className = '' }) {
  const styles = {
    default: 'bg-zinc-800 text-zinc-300 border border-zinc-700',
    amber: 'bg-amber-700/20 text-amber-400 border border-amber-700/40',
    unavailable: 'bg-red-950/50 text-red-400 border border-red-900/50',
  };

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        styles[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
