import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface PartnerCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="bg-tge-charcoal border border-tge-green-muted/30 rounded-xl p-6 flex-1 min-w-[200px] transition-all duration-300 hover:border-tge-lime/40 hover:-translate-y-0.5">
      <Icon className="w-7 h-7 text-tge-lime" strokeWidth={1.5} />
      <h3 className="font-oswald font-semibold text-lg uppercase text-tge-white mt-3 leading-tight">
        {title}
      </h3>
      <p className="font-inter text-sm text-tge-grey-text mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
