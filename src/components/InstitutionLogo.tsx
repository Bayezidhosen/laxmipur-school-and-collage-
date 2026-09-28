import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  monochrome?: boolean;
}

export const InstitutionLogo: React.FC<LogoProps> = ({ className = '', size = 'md', monochrome = false }) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`relative flex items-center justify-center rounded-xl font-crest font-bold select-none transition-transform group-hover:scale-105 ${sizeMap[size]} ${
      monochrome 
        ? 'bg-white/10 text-white border border-white/20' 
        : 'bg-gradient-to-br from-blue-950 via-slate-900 to-emerald-950 text-amber-400 shadow-md border border-amber-400/30'
    } ${className}`}>
      {/* Crest SVG graphic */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3/4 h-3/4"
      >
        {/* Shield background */}
        <path
          d="M24 4L8 10V22C8 32 15 40 24 44C33 40 40 32 40 22V10L24 4Z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Open Book */}
        <path
          d="M16 26C18.5 25 21 25.5 24 27C27 25.5 29.5 25 32 26V17C29.5 16 27 16.5 24 18C21 16.5 18.5 16 16 17V26Z"
          fill="currentColor"
          fillOpacity="0.3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Central Quill / Flame */}
        <path
          d="M24 12V22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Stars */}
        <circle cx="20" cy="33" r="1.5" fill="currentColor" />
        <circle cx="24" cy="35" r="1.8" fill="currentColor" />
        <circle cx="28" cy="33" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};
