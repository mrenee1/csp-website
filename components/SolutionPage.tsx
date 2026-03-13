import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ServiceData } from '../types';
import { PageName } from '../types';

const LEAD_EMAIL = 'michelle@creativesolutionspartners.com';

const getPlatformCardStyle = (platformId: string): { cardClasses: string; accentColor: string } => {
  switch (platformId) {
    case 'bizboost':
      return { cardClasses: 'border-white/5 hover:border-[#00ffff]/40 hover:shadow-[0_0_40px_-10px_rgba(0,255,255,0.4)]', accentColor: '#00ffff' };
    case 'clarity':
      return { cardClasses: 'border-white/5 hover:border-[#06b6d4]/40 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)]', accentColor: '#06b6d4' };
    case 'championhealth':
      return { cardClasses: 'border-white/5 hover:border-[#2DD4BF]/40 hover:shadow-[0_0_40px_-10px_rgba(45,212,191,0.4)]', accentColor: '#2DD4BF' };
    case 'wealthwave':
      return { cardClasses: 'border-white/5 hover:border-[#C5A059]/40 hover:shadow-[0_0_40px_-10px_rgba(197,160,89,0.4)]', accentColor: '#C5A059' };
    case 'creativepayments':
      return { cardClasses: 'border-white/5 hover:border-[#8b5cf6]/40 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.4)]', accentColor: '#8b5cf6' };
    default:
      return { cardClasses: 'border-white/5 hover:border-white/20', accentColor: '#C5A059' };
  }
};

const getFeatureCardGlow = (dataId: string): string => {
  if (dataId === 'health') return 'border-white/5 hover:border-[#2DD4BF]/40 hover:shadow-[0_0_40px_-10px_rgba(45,212,191,0.35)]';
  if (dataId === 'wealth') return 'border-white/5 hover:border-[#C5A059]/40 hover:shadow-[0_0_40px_-10px_rgba(197,160,89,0.35)]';
  if (dataId === 'tech') return 'border-white/5 hover:border-[#00ffff]/40 hover:shadow-[0_0_40px_-10px_rgba(0,255,255,0.35)]';
  return 'border-white/5 hover:border-white/20';
};

const getAccentDot = (dataId: string): string => {
  if (dataId === 'health') return 'bg-[#2DD4BF]';
  if (dataId === 'wealth') return 'bg-[#C5A059]';
  if (dataId === 'tech') return 'bg-[#00ffff]';
  return 'bg-brand-gold';
};

const getHeaderGlow = (dataId: string): string => {
  if (dataId === 'health') return '0 20px 60px -15px rgba(45,212,191,0.3)';
  if (dataId === 'wealth') return '0 20px 60px -15px rgba(197,160,89,0.3)';
  if (dataId === 'tech') return '0 20px 60px -15px rgba(0,255,255,0.3)';
  return 'none';
};

export const SolutionPage: React.FC<{ data: ServiceData; onBack: () => void; onNavigate?: (page: PageName) => void }> = ({ data, onBack, onNavigate }) => {
  const Icon = data.icon;

  const handlePlatformClick = (platformId: string) => {
    if (platformId === 'bizboost') {
      window.location.href = `mailto:${LEAD_EMAIL}?subject=Creative%20Web%20Consultation`;
    } else if (platformId === 'creativepayments') {
      window.location.href = `mailto:${LEAD_EMAIL}?subject=Creative%20Payments%20Consultation`;
    } else if (onNavigate) {
      onNavigate(platformId as PageName);
    }
  };

  return (
    <div className="animate-fade-in bg-[#0a0a0a]">
      {/* Header Section */}
      <div className={`${data.color} ${data.textColor} py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden`} style={{ boxShadow: getHeaderGlow(data.id) }}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none"></div>
        <div className="relative z-10">
          <button onClick={onBack} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity mb-8 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
          <div className="max-w-4xl">
            <div className="inline-block p-3 bg-white/10 backdrop-blur-sm rounded-lg mb-6">
              <Icon size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-medium mb-4">{data.title}</h1>
            <p className="text-xl md:text-2xl opacity-90 font-light">{data.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Content Section - Dark layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="p-12 lg:p-24 bg-[#0f0f0f]">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">The Challenge</h3>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">{data.description}</p>
          <div className={`h-1 w-20 mb-8 ${data.id === 'health' ? 'bg-[#2DD4BF]' : data.id === 'wealth' ? 'bg-[#C5A059]' : 'bg-[#5D2E8E]'}`}></div>
          <p className="text-gray-400 leading-relaxed">
            In today's volatile market, siloed approaches to {data.title.toLowerCase()} create vulnerability. 
            We integrate expert insights with actionable strategy to deliver results that compound over time.
          </p>

          {data.featuredPlatforms && data.featuredPlatforms.length > 0 && (
            <div className="mt-16 pt-8 border-t border-white/5">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Our Solutions</h3>
               <div className="space-y-4">
                 {data.featuredPlatforms.map((platform) => {
                   const { cardClasses, accentColor } = getPlatformCardStyle(platform.id);
                   const titleHoverClass = platform.id === 'bizboost' ? 'group-hover:text-[#00ffff]' : platform.id === 'clarity' ? 'group-hover:text-[#06b6d4]' : platform.id === 'championhealth' ? 'group-hover:text-[#2DD4BF]' : platform.id === 'creativepayments' ? 'group-hover:text-[#8b5cf6]' : 'group-hover:text-[#C5A059]';
                   return (
                     <div
                       key={platform.id}
                       onClick={() => handlePlatformClick(platform.id)}
                       className={`group cursor-pointer border p-6 rounded-xl transition-all bg-[#18181b] ${cardClasses}`}
                     >
                       <div className="flex justify-between items-center mb-2">
                         <h4 className={`text-xl font-serif font-bold text-white transition-colors ${titleHoverClass}`}>{platform.title}</h4>
                         <ArrowRight size={18} className={`transform group-hover:translate-x-1 transition-transform`} style={{ color: accentColor }} />
                       </div>
                       <p className="text-gray-400 text-sm">{platform.description}</p>
                     </div>
                   );
                 })}
               </div>
            </div>
          )}
        </div>

        <div className="p-12 lg:p-24 bg-[#18181b] border-l border-white/5">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">Key Capabilities</h3>
          <div className="grid grid-cols-1 gap-4">
            {data.features.map((feature, idx) => (
              <div key={idx} className={`flex items-start gap-4 p-5 bg-[#0f0f0f] rounded-xl border transition-all duration-500 group/card ${getFeatureCardGlow(data.id)}`}>
                <div className={`shrink-0 mt-0.5 w-2 h-2 rounded-full ${getAccentDot(data.id)}`}></div>
                <span className="text-base text-gray-300 font-medium leading-snug">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-[#0a0a0a] border border-white/5 rounded-xl hover:border-white/10 transition-all duration-500">
            <h4 className="font-serif text-xl mb-2 text-white">Ready to optimize?</h4>
            <p className="text-gray-400 mb-4">Schedule a consultation with our {data.title.split(' ')[0]} experts.</p>
            <a href={`mailto:${LEAD_EMAIL}?subject=${encodeURIComponent(data.title + ' Consultation Request')}`} className={`${data.color} ${data.textColor} w-full py-3 px-6 font-medium hover:opacity-90 transition-opacity block text-center rounded-sm`}>
              Request Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};