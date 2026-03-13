import React from 'react';
import { ArrowLeft, BookOpen, TrendingUp, Shield, GraduationCap, Users, Check, X, ChevronRight, Briefcase } from 'lucide-react';
import { PageName } from '../types';

interface WealthWavePageProps {
  onBack: () => void;
  onNavigate: (page: PageName) => void;
}

export const WealthWavePage: React.FC<WealthWavePageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="animate-fade-in bg-[#0a0a0a]">
      {/* Hero */}
      <section className="bg-[#0a0a0a] text-white pt-28 pb-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C5A059]/5 skew-x-12 transform origin-top-right"></div>
        
        <button 
          onClick={() => onNavigate('wealth')}
          className="relative z-10 flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 md:mb-12 text-sm uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Wealth
        </button>
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-end">
          <div className="lg:w-2/3">
             <div className="inline-flex items-center gap-2 bg-[#C5A059]/20 text-[#C5A059] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-[#C5A059]/30 mb-6">
                Strategic Partner
             </div>
             <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-medium mb-6 leading-tight">
               Wealth<span className="text-[#C5A059]">Wave</span>
             </h1>
             <p className="text-lg md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed">
               The How Money Works® company. We are disrupting the financial industry by leading with education, not sales.
             </p>
          </div>
          <div className="w-full lg:w-1/3 pb-2">
             <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:michelle@creativesolutionspartners.com?subject=WealthWave%20Book%20Request" className="bg-[#C5A059] text-[#0a0a0a] px-8 py-4 font-bold hover:bg-[#d4b36a] transition-colors w-full md:w-auto text-center rounded-sm shadow-[0_0_40px_-10px_rgba(197,160,89,0.5)]">
                   Get the Book
                </a>
                <a href="mailto:partners@csp.com?subject=WealthWave%20Mission%20Inquiry" className="border border-gray-600 text-white px-8 py-4 font-medium hover:bg-gray-800 transition-colors w-full md:w-auto text-center rounded-sm">
                   Join Mission
                </a>
             </div>
          </div>
        </div>
      </section>

      {/* Narrative Summary */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 border-b border-white/5 bg-[#18181b]">
        <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">The Silent Crisis: <br className="hidden md:block"/>Financial Illiteracy</h2>
           <p className="text-lg text-gray-400 leading-relaxed mb-12">
             Traditional financial institutions thrive on complexity. They reserve the best strategies for the wealthy while keeping the rest in the dark. 
             WealthWave disrupts this model by democratizing the strategies of the wealthy, focusing on the three pillars of financial foundation: 
             <strong className="text-[#C5A059]"> Protection, Savings, and Growth.</strong>
           </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
           <div className="p-8 bg-[#0a0a0a] rounded-xl border border-white/5 hover:border-[#C5A059]/40 hover:shadow-[0_0_40px_-10px_rgba(197,160,89,0.3)] transition-all duration-300">
              <BookOpen className="text-[#C5A059] mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3 text-white">Education First</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We don't sell products; we teach concepts. Using the <em>How Money Works</em> curriculum, we empower clients to make informed decisions about their future.
              </p>
           </div>
           <div className="p-8 bg-[#0a0a0a] rounded-xl border border-white/5 hover:border-[#C5A059]/40 hover:shadow-[0_0_40px_-10px_rgba(197,160,89,0.3)] transition-all duration-300">
              <Shield className="text-[#C5A059] mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3 text-white">Wealth Protection</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Understanding how to leverage living benefits and insurance structures to protect assets from market volatility and life's uncertainties.
              </p>
           </div>
           <div className="p-8 bg-[#0a0a0a] rounded-xl border border-white/5 hover:border-[#C5A059]/40 hover:shadow-[0_0_40px_-10px_rgba(197,160,89,0.3)] transition-all duration-300">
              <TrendingUp className="text-[#C5A059] mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3 text-white">Compound Growth</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Applying the Rule of 72 and tax-advantaged strategies to maximize growth potential without unnecessary risk exposure.
              </p>
           </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 md:mb-12 text-center md:text-left">
               <h2 className="text-3xl font-serif text-white mb-2">The WealthWave Difference</h2>
               <p className="text-gray-400">How we compare to traditional financial advisory.</p>
            </div>

            <div className="relative rounded-xl shadow-2xl border border-white/5 bg-[#18181b] overflow-hidden">
               <div className="overflow-x-auto custom-scrollbar">
                 <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                       <tr className="bg-[#0a0a0a] text-white">
                          <th className="p-6 font-medium text-sm uppercase tracking-wider w-1/3 sticky left-0 bg-[#0a0a0a] z-10">Approach</th>
                          <th className="p-6 font-bold text-[#C5A059] text-lg w-1/3 bg-[#18181b] border-b-4 border-[#C5A059]">WealthWave Model</th>
                          <th className="p-6 font-medium text-gray-400 w-1/3">Traditional Industry</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                       {[
                          { feature: 'Client Focus', ww: 'Education & Empowerment', trad: 'Product Sales & Quotas' },
                          { feature: 'Target Audience', ww: 'Families & Business Owners', trad: 'High Net Worth Only' },
                          { feature: 'Transparency', ww: 'Full Concept Clarity', trad: 'Industry Jargon' },
                          { feature: 'Methodology', ww: 'Holistic Strategy', trad: 'Single-Product Focus' },
                          { feature: 'Opportunity', ww: 'Open Entrepreneurship', trad: 'High Barriers to Entry' },
                       ].map((row, i) => (
                          <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white border-r border-white/5 sticky left-0 bg-[#0a0a0a] z-10">{row.feature}</td>
                             <td className="p-6 bg-[#C5A059]/5 border-r border-white/5 font-medium text-[#C5A059]">{row.ww}</td>
                             <td className="p-6 text-gray-400">{row.trad}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
               <span className="md:hidden flex items-center gap-1"><ChevronRight size={12}/> Scroll to compare</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Perspective CTA */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#18181b]">
         <div className="grid md:grid-cols-2 gap-8">
            <div className="group border border-white/5 p-8 md:p-12 hover:border-[#C5A059]/40 hover:shadow-[0_0_40px_-10px_rgba(197,160,89,0.25)] transition-all duration-300 rounded-xl bg-[#0a0a0a]">
               <div className="w-12 h-12 bg-[#C5A059]/20 text-[#C5A059] rounded-full flex items-center justify-center mb-6 border border-[#C5A059]/30">
                  <Briefcase size={20} />
               </div>
               <h3 className="text-2xl font-serif text-white mb-4">For Business Owners</h3>
               <p className="text-gray-400 mb-8 leading-relaxed">
                  Financial stress is the #1 distraction in the workplace. Implement our <strong>Financial Wellness Program</strong> as an employee benefit at no cost to your company. Educate your team, reduce turnover, and increase productivity.
               </p>
               <a href="mailto:michelle@creativesolutionspartners.com?subject=WealthWave%20Financial%20Wellness%20Workshop" className="text-[#C5A059] font-bold uppercase tracking-widest text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Schedule Workshop <ArrowLeft className="rotate-180" size={16} />
               </a>
            </div>

            <div className="group border border-white/5 p-8 md:p-12 hover:border-[#C5A059]/40 hover:shadow-[0_0_40px_-10px_rgba(197,160,89,0.25)] transition-all duration-300 rounded-xl bg-[#0a0a0a]">
               <div className="w-12 h-12 bg-[#C5A059] text-[#0a0a0a] rounded-full flex items-center justify-center mb-6">
                  <GraduationCap size={20} />
               </div>
               <h3 className="text-2xl font-serif text-white mb-4">For Prospective Partners</h3>
               <p className="text-gray-400 mb-8 leading-relaxed">
                  Join the mission to eradicate financial illiteracy. Whether you are seeking a career change or a side revenue stream, WealthWave offers a scalable platform with world-class mentorship and technology.
               </p>
               <a href="mailto:michelle@creativesolutionspartners.com?subject=WealthWave%20Partnership%20Inquiry" className="text-[#C5A059] font-bold uppercase tracking-widest text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Start Your Journey <ArrowLeft className="rotate-180" size={16} />
               </a>
            </div>
         </div>
      </section>
    </div>
  );
};