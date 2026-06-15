import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SeriesCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
}

export const SeriesCard: React.FC<SeriesCardProps> = ({
  icon: Icon,
  title,
  description,
  tag,
}) => {
  return (
    <div
      className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
    >
      <div className="h-full bg-tge-charcoal rounded-xl border border-tge-green-muted/40 p-6 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-tge-lime/60 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(200,255,0,0.15)] group">
        <div>
          <div className="w-12 h-12 rounded-full bg-tge-green-muted flex items-center justify-center">
            <Icon className="w-6 h-6 text-tge-lime" strokeWidth={1.5} />
          </div>
          <h3 className="font-oswald font-semibold text-xl md:text-[28px] uppercase text-tge-white mt-4 leading-tight">
            {title}
          </h3>
          <p className="font-inter text-sm text-tge-grey-text mt-2 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
        <div className="mt-6">
          <div className="w-10 h-0.5 bg-tge-lime mb-3" />
          <span className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-lime/70">
            {tag}
          </span>
        </div>
      </div>
    </div>
  );
};
