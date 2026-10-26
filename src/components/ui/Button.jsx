import { forwardRef } from 'react';

const variants = {
  primary:
    'bg-amber-700 text-white hover:bg-amber-600 active:bg-amber-800 amber-glow',
  secondary:
    'border border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-amber-700/50 hover:bg-zinc-800',
  ghost: 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white',
};

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
        'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-amber-700 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
});
