import React from 'react';

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-inter font-semibold text-sm uppercase tracking-[0.06em] rounded-lg px-8 py-3.5 transition-all duration-200 cursor-pointer active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-tge-lime focus:ring-offset-2 focus:ring-offset-tge-black disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-tge-lime text-tge-black hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(200,255,0,0.15)]',
    secondary:
      'bg-transparent border border-tge-white text-tge-white hover:bg-tge-white hover:text-tge-black',
    ghost:
      'bg-transparent border-0 text-tge-grey-text hover:text-tge-lime px-0 py-0',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
      {variant === 'ghost' && <span className="ml-1">&rarr;</span>}
    </button>
  );
};
