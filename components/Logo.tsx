import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12", variant = 'dark' }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  const subColor = variant === 'light' ? 'text-brand-gold' : 'text-brand-purple';
  
  return (
    <div className={`flex flex-col items-start leading-none select-none ${className}`}>
      <div className="flex items-center gap-2">
        <div className={`font-serif text-3xl tracking-tighter font-bold ${textColor}`}>
          CSP
        </div>
        <div className="h-8 w-[1px] bg-brand-gold mx-1"></div>
        <div className="flex flex-col justify-center">
          <span className={`font-serif text-xs tracking-[0.2em] uppercase ${textColor}`}>Creative</span>
          <span className={`font-serif text-xs tracking-[0.2em] uppercase ${textColor}`}>Solutions</span>
        </div>
      </div>
      <div className={`mt-1 text-[0.5rem] tracking-[0.3em] uppercase opacity-80 ${subColor}`}>
        Partners
      </div>
    </div>
  );
};
