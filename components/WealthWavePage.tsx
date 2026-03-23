import React from 'react';
import { ArrowLeft, BookOpen, TrendingUp, Shield, GraduationCap, Users, Check, Target, DollarSign, PiggyBank, BarChart3, Clock, Lightbulb, Award } from 'lucide-react';
import { PageName } from '../types';

interface WealthWavePageProps {
  onBack: () => void;
  onNavigate: (page: PageName) => void;
}

export const WealthWavePage: React.FC<WealthWavePageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="animate-fade-in bg-[#0a0a0a]">
      {/* Hero */}
      <section className="bg-[rgb(22,84,97)] text-white pt-28 pb-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        
        <button 
          onClick={onBack}
          className="relative z-10 flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 md:mb-12 text-sm uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Solutions
        </button>
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="lg:w-1/2">
             <img 
               src="/wealthwave-logo.png" 
               alt="WealthWave" 
               className="h-16 md:h-20 mb-6"
             />
             <p className="text-lg md:text-2xl text-white/80 font-light max-w-2xl leading-relaxed mb-6">
               The How Money Works® Company. Erasing financial illiteracy and building wealth through education, not sales.
             </p>
             <div className="mt-6 flex items-center gap-6 text-sm text-white/60">
               <span className="flex items-center gap-2">
                 <Users size={16} className="text-white" />
                 500k+ Educated
               </span>
               <span className="flex items-center gap-2">
                 <BookOpen size={16} className="text-white" />
                 Best-Selling Books
               </span>
             </div>
             <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="mailto:michelle@creativesolutionspartners.com?subject=WealthWave%20Book%20Request" className="bg-white text-[#165461] px-8 py-4 font-bold hover:bg-gray-100 transition-colors w-full md:w-auto text-center rounded-sm shadow-lg">
                   Get the Book
                </a>
                <a href="https://registration.wfglaunch.com/" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-8 py-4 font-medium hover:bg-white/10 transition-colors w-full md:w-auto text-center rounded-sm">
                   Join Mission
                </a>
             </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
             <img 
               src="/how-money-works-books.png" 
               alt="How Money Works Books" 
               className="max-w-md w-full drop-shadow-2xl"
             />
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 border-b border-white/5 bg-[#18181b]">
        <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
             Erase Financial Illiteracy.<br className="hidden md:block"/> Build and Protect Wealth.
           </h2>
           <p className="text-lg text-gray-400 leading-relaxed mb-8">
             Financial illiteracy is the <strong className="text-[#165461]">#1 economic crisis</strong> in America. WealthWave is a financial education and financial services marketing company dedicated to solving this crisis through comprehensive education, high-tech tools, and personalized guidance.
           </p>
           <p className="text-base text-gray-500 leading-relaxed">
             We don't sell products—we teach concepts. Using the How Money Works® curriculum, we empower individuals and families to make informed decisions about their financial future.
           </p>
        </div>
      </section>

      {/* The 7 Money Milestones */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
               <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">The 7 Money Milestones®</h2>
               <p className="text-gray-400 max-w-2xl mx-auto">Your step-by-step financial roadmap to building lasting wealth and security.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Begin Your Journey", icon: Target, desc: "Start with a clear understanding of where you are and where you want to go financially." },
                { step: "02", title: "Build Your Foundation", icon: Shield, desc: "Protect your income and assets with proper insurance and emergency fund strategies." },
                { step: "03", title: "Eliminate Debt", icon: DollarSign, desc: "Create a systematic approach to becoming debt-free and freeing up cash flow." },
                { step: "04", title: "Emergency Fund", icon: PiggyBank, desc: "Establish your safety net with 3-6 months of living expenses secured." },
                { step: "05", title: "Proper Protection", icon: Shield, desc: "Ensure your family is protected with the right coverage for life's uncertainties." },
                { step: "06", title: "Build Wealth", icon: BarChart3, desc: "Implement tax-advantaged strategies to grow your wealth systematically." },
                { step: "07", title: "Preserve Wealth", icon: Clock, desc: "Create a legacy that lasts generations through proper estate planning." },
              ].map((milestone, i) => (
                <div key={i} className="group p-6 bg-[#18181b] rounded-xl border border-white/5 hover:border-[#165461]/40 hover:shadow-[0_0_40px_-10px_rgba(22,84,97,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#165461]/20 text-[#165461] flex items-center justify-center font-bold text-sm">
                      {milestone.step}
                    </div>
                    <milestone.icon size={20} className="text-[#165461]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{milestone.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rule of 72 */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#18181b] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">The Rule of 72</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                One of the most powerful concepts in finance. The Rule of 72 shows you how long it takes for your money to double at any given interest rate. Simply divide 72 by your interest rate to see how many years it takes.
              </p>
              <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                <p className="text-sm text-gray-500 mb-2">Example:</p>
                <p className="text-2xl text-white font-bold mb-2">72 ÷ 6% = <span className="text-[#165461]">12 years</span></p>
                <p className="text-sm text-gray-400">Your money doubles every 12 years at 6% return</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { rate: "3%", years: "24 years", label: "Typical Savings Account" },
                { rate: "6%", years: "12 years", label: "Conservative Investment" },
                { rate: "9%", years: "8 years", label: "Moderate Growth Portfolio" },
                { rate: "12%", years: "6 years", label: "Aggressive Growth Strategy" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-white/5">
                  <div>
                    <p className="text-[#165461] font-bold text-lg">{item.rate}</p>
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{item.years}</p>
                    <p className="text-xs text-gray-500">to double</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Three Pillars of Financial Foundation</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Building wealth requires a solid foundation based on these essential pillars.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#18181b] rounded-xl border border-white/5 hover:border-[#165461]/40 hover:shadow-[0_0_40px_-10px_rgba(22,84,97,0.3)] transition-all duration-300">
              <Shield className="text-[#165461] mb-4" size={40} />
              <h3 className="text-2xl font-bold mb-4 text-white">Protection</h3>
              <p className="text-gray-400 leading-relaxed">
                Safeguard your income, assets, and family against life's uncertainties. Proper protection ensures your wealth-building journey stays on track.
              </p>
            </div>
            <div className="p-8 bg-[#18181b] rounded-xl border border-white/5 hover:border-[#165461]/40 hover:shadow-[0_0_40px_-10px_rgba(22,84,97,0.3)] transition-all duration-300">
              <PiggyBank className="text-[#165461] mb-4" size={40} />
              <h3 className="text-2xl font-bold mb-4 text-white">Savings</h3>
              <p className="text-gray-400 leading-relaxed">
                Build your emergency fund and systematic savings plan. Create the financial cushion that gives you freedom and peace of mind.
              </p>
            </div>
            <div className="p-8 bg-[#18181b] rounded-xl border border-white/5 hover:border-[#165461]/40 hover:shadow-[0_0_40px_-10px_rgba(22,84,97,0.3)] transition-all duration-300">
              <TrendingUp className="text-[#165461] mb-4" size={40} />
              <h3 className="text-2xl font-bold mb-4 text-white">Growth</h3>
              <p className="text-gray-400 leading-relaxed">
                Leverage compound interest and tax-advantaged strategies to maximize your wealth potential over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Money Works */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#18181b] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#165461]/20 text-[#165461] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-[#165461]/30 mb-6">
                Educational Platform
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">How Money Works®</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Our comprehensive financial literacy initiative provides books, courses, and challenges designed to teach you how money really works. From earning and saving to investing and protecting, we cover it all.
              </p>
              <ul className="space-y-3">
                {[
                  "Best-selling educational books",
                  "Interactive online courses",
                  "Live workshops and webinars",
                  "Personal financial assessments",
                  "Ongoing mentorship and support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check size={16} className="text-[#165461]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0a0a0a] p-8 rounded-xl border border-white/5">
              <BookOpen className="text-[#165461] mb-6" size={48} />
              <h3 className="text-2xl font-bold text-white mb-4">Request Your Free Book</h3>
              <p className="text-gray-400 mb-6">
                Get started with our best-selling book that breaks down complex financial concepts into simple, actionable steps.
              </p>
              <a 
                href="mailto:michelle@creativesolutionspartners.com?subject=How%20Money%20Works%20Book%20Request" 
                className="bg-[#165461] text-white px-8 py-4 font-bold hover:bg-[#1e7a8a] transition-colors inline-block rounded-sm shadow-[0_0_40px_-10px_rgba(22,84,97,0.5)]"
              >
                Get Your Free Copy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 md:mb-12 text-center">
               <h2 className="text-3xl font-serif text-white mb-2">The WealthWave Difference</h2>
               <p className="text-gray-400">How we compare to traditional financial advisory.</p>
            </div>

            <div className="relative rounded-xl shadow-2xl border border-white/5 bg-[#18181b] overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                       <tr className="bg-[#0a0a0a] text-white">
                          <th className="p-6 font-medium text-sm uppercase tracking-wider w-1/3">Approach</th>
                          <th className="p-6 font-bold text-[#165461] text-lg w-1/3 bg-[#18181b] border-b-4 border-[#165461]">WealthWave Model</th>
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
                          { feature: 'Technology', ww: 'High-Tech, High-Touch Tools', trad: 'Traditional Methods' },
                       ].map((row, i) => (
                          <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white">{row.feature}</td>
                             <td className="p-6 bg-[#165461]/5 font-medium text-[#165461]">{row.ww}</td>
                             <td className="p-6 text-gray-400">{row.trad}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Perspective CTA */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#18181b]">
         <div className="grid md:grid-cols-2 gap-8">
            <div className="group border border-white/5 p-8 md:p-12 hover:border-[#165461]/40 hover:shadow-[0_0_40px_-10px_rgba(22,84,97,0.25)] transition-all duration-300 rounded-xl bg-[#0a0a0a]">
               <div className="w-12 h-12 bg-[#165461]/20 text-[#165461] rounded-full flex items-center justify-center mb-6 border border-[#165461]/30">
                  <Lightbulb size={20} />
               </div>
               <h3 className="text-2xl font-serif text-white mb-4">For Individuals & Families</h3>
               <p className="text-gray-400 mb-8 leading-relaxed">
                  Take control of your financial future. Learn the strategies that wealthy families have used for generations. Get educated, get protected, and build lasting wealth.
               </p>
               <a href="mailto:michelle@creativesolutionspartners.com?subject=WealthWave%20Personal%20Consultation" className="text-[#165461] font-bold uppercase tracking-widest text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Schedule Consultation <ArrowLeft className="rotate-180" size={16} />
               </a>
            </div>

            <div className="group border border-white/5 p-8 md:p-12 hover:border-[#165461]/40 hover:shadow-[0_0_40px_-10px_rgba(22,84,97,0.25)] transition-all duration-300 rounded-xl bg-[#0a0a0a]">
               <div className="w-12 h-12 bg-[#165461] text-[#0a0a0a] rounded-full flex items-center justify-center mb-6">
                  <GraduationCap size={20} />
               </div>
               <h3 className="text-2xl font-serif text-white mb-4">For Prospective Partners</h3>
               <p className="text-gray-400 mb-8 leading-relaxed">
                  Join the mission to eradicate financial illiteracy. Whether you're seeking a career change or building additional income streams, WealthWave offers a scalable platform with world-class mentorship and technology.
               </p>
               <a href="mailto:michelle@creativesolutionspartners.com?subject=WealthWave%20Partnership%20Inquiry" className="text-[#165461] font-bold uppercase tracking-widest text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Start Your Journey <ArrowLeft className="rotate-180" size={16} />
               </a>
            </div>
         </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl md:text-6xl font-bold text-[#165461] mb-2">500k+</p>
              <p className="text-gray-400">Individuals & Families Educated</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-bold text-[#165461] mb-2">7</p>
              <p className="text-gray-400">Money Milestones Framework</p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-bold text-[#165461] mb-2">1</p>
              <p className="text-gray-400">Mission: Eradicate Financial Illiteracy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
