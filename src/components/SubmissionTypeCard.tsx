import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SubmissionTypeCardProps {
  icon: LucideIcon;
  label: string;
}

export const SubmissionTypeCard: React.FC<SubmissionTypeCardProps> = ({
  icon: Icon,
  label,
}) => {
  return (
    <div className="bg-tge-charcoal border border-tge-green-muted/30 rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:border-tge-lime/40 hover:-translate-y-0.5">
      <Icon className="w-8 h-8 text-tge-lime" strokeWidth={1.5} />
      <span className="font-inter font-medium text-xs uppercase tracking-[0.08em] text-tge-white mt-3">
        {label}
      </span>
    </div>
  );
};
