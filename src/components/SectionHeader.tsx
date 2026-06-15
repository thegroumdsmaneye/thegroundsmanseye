import React from 'react';

interface SectionHeaderProps {
  label: string;
  heading: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  heading,
  description,
  centered = true,
  className = '',
}) => {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <span className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-lime">
        {label}
      </span>
      <h2 className="font-oswald font-semibold text-4xl md:text-6xl uppercase text-tge-white mt-3 leading-[1] tracking-tight">
        {heading}
      </h2>
      {description && (
        <p className="font-inter text-base md:text-xl text-tge-grey-text mt-4 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
