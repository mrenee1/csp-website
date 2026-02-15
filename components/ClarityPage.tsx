
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, X, ShieldCheck, Calculator, Layers, ChevronRight, Scale, Users, FileSearch, ArrowRight, Lock, FileText, Database, BrainCircuit, LineChart, AlertTriangle } from 'lucide-react';
import { PageName } from '../types';

const LEAD_EMAIL = 'partners@csp.com';

const HERO_FEATURES = [
  {
    title: "Decimal Precision",
    desc: "Banking-grade calculation engine eliminating floating-point errors and variance.",
    icon: Calculator
  },
  {
    title: "Audit Lineage",
    desc: "Immutable ledger tracking every transaction, adjustment, and logic change.",
    icon: ShieldCheck
  },
  {
    title: "Temporal Hierarchy",
    desc: "Pay based on the organizational structure as it existed at the precise moment of sale.",
    icon: Layers
  }
];

const RevealSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const ClarityPage: React.FC<{ onBack: () => void; onNavigate: (page: PageName) => void }> = ({ onBack, onNavigate }) => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % HERO_FEATURES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Clarity Commissions Waitlist');
    const body = encodeURIComponent(`Email: ${waitlistEmail}\n\nI'd like to join the waitlist for early access to audit-grade commission infrastructure.`);
    window.location.href = `mailto:${LEAD_EMAIL}?subject=${subject}&body=${body}`;
    setWaitlistSubmitted(true);
    setTimeout(() => {
      setIsWaitlistOpen(false);
      setWaitlistEmail('');
      setWaitlistSubmitted(false);
    }, 1500);
  };

  return (
    <div className="bg-[#0a0a0a] relative w-full max-w-[100vw] overflow-x-hidden selection:bg-[#06b6d4]/30">
      
      {/* Waitlist Modal */}
      {isWaitlistOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsWaitlistOpen(false)}></div>
          <div className="relative bg-[#18181b] border border-[#06b6d4]/40 w-full max-w-md rounded-xl shadow-[0_0_60px_-10px_rgba(6,182,212,0.5)] overflow-hidden animate-slide-up">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-serif text-white mb-2">Join the Waitlist</h3>
                  <p className="text-gray-400 text-sm font-light">Early access to audit-grade commission infrastructure.</p>
                </div>
                <button onClick={() => setIsWaitlistOpen(false)} className="text-gray-500 hover:text-white transition-colors p-1">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleWaitlistSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="w-full border border-white/10 bg-white/5 py-3 px-4 rounded-lg text-white placeholder-gray-500 focus:border-[#06b6d4] focus:outline-none focus:ring-1 focus:ring-[#06b6d4]"
                    placeholder="you@company.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={waitlistSubmitted}
                  className="w-full bg-[#06b6d4] text-[#0a0a0a] py-5 font-bold hover:bg-[#22d3ee] transition-all duration-500 uppercase tracking-[0.2em] text-xs flex justify-center items-center gap-3 rounded-lg"
                >
                  {waitlistSubmitted ? 'Submitted!' : 'Join Waitlist'} <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-[#0a0a0a] text-white min-h-[90vh] flex flex-col justify-center pt-24 pb-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
        
        <div className="relative z-10">
          <button 
            onClick={() => onNavigate('tech')}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-xs uppercase tracking-[0.3em] group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Technology
          </button>
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start">
            
            <div className="w-full lg:w-3/5 space-y-8">
               <div className="inline-flex items-center gap-2 bg-[#06b6d4]/20 text-[#06b6d4] px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] border border-[#06b6d4]/30">
                  Coming Soon · Audit-Grade Financial Infrastructure
               </div>
               <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-medium leading-[1.1]">
                 Clarity <span className="text-[#06b6d4]">Commissions</span>
               </h1>
               <h2 className="text-2xl md:text-3xl text-white font-light leading-relaxed">
                  The System of Record for <br className="hidden md:block" /><span className="text-[#06b6d4] italic">Commission Truth</span>.
               </h2>
               <p className="text-lg md:text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                 Commission is not a sales expense; it is a financial obligation. 
                 We replace fragile spreadsheets with the audit-grade infrastructure required to defend every dollar.
               </p>

               <div className="flex flex-col sm:flex-row gap-6 pt-4">
                  <button 
                    onClick={() => setIsWaitlistOpen(true)}
                    className="bg-[#06b6d4] text-[#0a0a0a] px-10 py-5 font-bold hover:bg-[#22d3ee] transition-all duration-500 w-full sm:w-auto text-center rounded-sm shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] uppercase tracking-widest text-xs"
                  >
                     Join the Waitlist
                  </button>
                  <div className="hidden sm:flex items-center text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium border-l border-gray-700 pl-6">
                    No Demo. <br/> Just Diagnosis.
                  </div>
               </div>
            </div>

            <div className="w-full lg:w-2/5">
               <div className="relative h-[400px] w-full group">
                  {HERO_FEATURES.map((feat, index) => {
                    const isActive = index === activeFeatureIndex;
                    const Icon = feat.icon;
                    return (
                      <div 
                        key={index}
                        onClick={() => setActiveFeatureIndex(index)}
                        className={`absolute inset-0 bg-[#18181b] border backdrop-blur-md p-10 rounded-xl transition-all duration-1000 cursor-pointer shadow-2xl ${
                          isActive 
                            ? 'opacity-100 translate-y-0 z-20 border-[#06b6d4]/40 shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)]' 
                            : 'opacity-0 translate-y-12 z-10 border-white/5 pointer-events-none'
                        }`}
                      >
                        <div className="w-16 h-16 bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-full flex items-center justify-center mb-8 text-[#06b6d4]">
                          <Icon size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl font-serif mb-6 text-white">{feat.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-lg font-light">{feat.desc}</p>
                        <div className="absolute bottom-0 left-0 h-[2px] bg-[#06b6d4] transition-all duration-[5000ms] ease-linear w-0" style={{ width: isActive ? '100%' : '0%' }}></div>
                      </div>
                    );
                  })}
                  <div className="absolute -bottom-12 left-0 right-0 flex justify-center lg:justify-start gap-3">
                    {HERO_FEATURES.map((_, idx) => (
                      <button key={idx} onClick={() => setActiveFeatureIndex(idx)} className={`h-1 transition-all duration-500 ${idx === activeFeatureIndex ? 'w-12 bg-[#06b6d4]' : 'w-4 bg-gray-700'}`} />
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Cost of the Status Quo */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#18181b]">
         <RevealSection className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4">
               <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">The Cost of <br/>the Status Quo</h2>
               <p className="text-gray-400 leading-relaxed text-lg font-light">
                 Managing complex incentive structures in general-purpose software or spreadsheets introduces three distinct vectors of operational risk.
               </p>
               <div className="mt-12 h-px w-24 bg-[#06b6d4]"></div>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 gap-12">
               {[
                 { icon: AlertTriangle, title: "Operational Risk", text: "Manual calculations and spreadsheet dependencies create single points of failure. When logic lives in an individual's head, business continuity is compromised." },
                 { icon: Scale, title: "Calculation Drift", text: "Floating-point errors in standard software can compound into significant capital leakage over fiscal quarters. We eliminate variance." },
                 { icon: FileSearch, title: "Audit Vulnerability", text: "Without a deterministic audit trail, the inability to reconstruct historical payment logic exposes the organization to legal and regulatory liability." }
               ].map((item, i) => (
                 <RevealSection key={i} delay={i * 200} className="flex gap-8 items-start group">
                    <div className="shrink-0 mt-1 bg-[#0a0a0a] border border-[#06b6d4]/30 p-4 text-[#06b6d4] shadow-sm group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] transition-all duration-500">
                      <item.icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xl mb-3 tracking-tight">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-base font-light">{item.text}</p>
                    </div>
                 </RevealSection>
               ))}
            </div>
         </RevealSection>
      </section>

      {/* Built for Financial Control */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 border-y border-white/5 bg-[#0a0a0a]">
        <RevealSection className="max-w-4xl mx-auto text-center mb-20">
           <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Built for Financial Control</h2>
           <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
             Clarity is <strong>financial infrastructure</strong> tailored for high-complexity payout environments. We prioritize precision and defensibility above all else.
           </p>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
           {[
             { icon: Calculator, title: "Decimal-Safe Engine", text: "We replace \"estimated\" floating-point math with decimal-perfect calculation engines. Zero drift. Zero rounding errors." },
             { icon: Lock, title: "Immutable Ledger", text: "Clarity is an append-only system. We do not overwrite data; we version it. Every adjustment creates a traceable lineage." },
             { icon: Layers, title: "Temporal Hierarchy", text: "Manage team structures across time. Pay based on the hierarchy as it existed at the point of sale, not the point of payout." }
           ].map((item, i) => (
             <RevealSection key={i} delay={i * 150} className="p-12 bg-[#18181b] rounded-xl border border-white/5 hover:border-[#06b6d4]/40 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] transition-all duration-700 group flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#06b6d4]/10 flex items-center justify-center mb-8 text-[#06b6d4]">
                  <item.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light">{item.text}</p>
             </RevealSection>
           ))}
        </div>
      </section>

      {/* Clarity Intelligence (AI) */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#18181b] text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-[#06b6d4]/[0.07] skew-x-12 transform origin-top-right pointer-events-none"></div>
         
         <div className="relative z-10 grid lg:grid-cols-2 gap-24 items-center">
            <RevealSection>
               <div className="inline-flex items-center gap-2 text-[#06b6d4] mb-8 font-bold uppercase tracking-[0.3em] text-[10px]">
                  <BrainCircuit size={16} /> Clarity Intelligence
               </div>
               <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">The Virtual <br/>Commission Analyst</h2>
               <p className="text-gray-400 text-xl leading-relaxed mb-12 font-light">
                  Reduce time-to-insight for Finance teams. Query your commission data using natural language to uncover variance, detect anomalies, and model future liability.
               </p>
               <ul className="space-y-6">
                  {[
                    { icon: LineChart, text: "Instant Variance Analysis" },
                    { icon: AlertTriangle, text: "Automated Anomaly Detection" },
                    { icon: FileText, text: "Natural Language Reporting" }
                  ].map((li, i) => (
                    <li key={i} className="flex items-center gap-4 group">
                       <div className="p-2 rounded bg-white/5 text-[#06b6d4] group-hover:bg-[#06b6d4] group-hover:text-[#0a0a0a] transition-all duration-500">
                        <li.icon size={20} />
                       </div>
                       <span className="text-gray-300 font-medium tracking-wide">{li.text}</span>
                    </li>
                  ))}
               </ul>
            </RevealSection>
            
            <RevealSection delay={300} className="relative">
               <div className="bg-[#0c111d] border border-[#06b6d4]/20 rounded-xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                     <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                     <span className="ml-4 text-[10px] text-gray-500 font-mono tracking-widest uppercase">intelligence.clarity.ai</span>
                  </div>
                  <div className="p-10 space-y-10 font-mono text-sm">
                     <div className="flex gap-6 animate-pulse">
                        <span className="text-[#06b6d4] shrink-0 opacity-50 font-bold">{'>'}</span>
                        <p className="text-gray-100 leading-relaxed">Show me the payout variance between Q3 and Q4 for the Northeast Region.</p>
                     </div>
                     <div className="bg-[#06b6d4]/10 p-8 rounded border-l-2 border-[#06b6d4] space-y-4">
                        <div className="flex items-center gap-2 text-[10px] text-[#06b6d4] font-bold uppercase tracking-widest">
                           <ShieldCheck size={12} /> Analysis Complete
                        </div>
                        <p className="text-white leading-relaxed">
                           <span className="text-[#06b6d4] font-bold block mb-1">Variance Detected:</span> 
                           +12.4% ($42,105)<br/>
                           <span className="text-gray-500 block mt-2">Primary Driver:</span> 
                           Retroactive adjustment applied to 'Senior Agent' tier on Nov 15th.
                        </p>
                     </div>
                  </div>
               </div>
               <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#06b6d4]/20 blur-[120px] rounded-full pointer-events-none"></div>
            </RevealSection>
         </div>
      </section>

      {/* Architecture of Trust Comparison */}
      <section className="py-32 md:py-48 bg-[#0a0a0a]">
        <div className="px-6 md:px-12 lg:px-24">
          <RevealSection className="max-w-6xl mx-auto">
            <div className="mb-16 text-center md:text-left">
               <h2 className="text-4xl font-serif text-white mb-4">Architecture of Trust</h2>
               <p className="text-xl text-gray-400 font-light">Why enterprise finance leaders choose infrastructure over general-purpose software.</p>
            </div>

            <div className="relative rounded-xl border border-white/10 bg-[#18181b] overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                       <tr className="bg-[#0a0a0a] text-white">
                          <th className="p-8 font-bold text-xs uppercase tracking-[0.2em] w-1/4 sticky left-0 bg-[#0a0a0a] z-20">Core Capability</th>
                          <th className="p-8 font-bold text-[#06b6d4] text-xl w-1/4 bg-[#18181b] border-b-4 border-[#06b6d4]">Clarity Infrastructure</th>
                          <th className="p-8 font-medium text-gray-500 w-1/4 uppercase tracking-widest text-[10px]">Incentive Software</th>
                          <th className="p-8 font-medium text-gray-500 w-1/4 uppercase tracking-widest text-[10px]">Spreadsheets</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                       {[
                          { feature: 'Math Engine', clarity: 'Decimal-Safe (Banking Std)', soft: 'Floating Point (Approx)', spread: 'Formula Based (Fragile)' },
                          { feature: 'Data State', clarity: 'Immutable / Versioned', soft: 'Overwritable', spread: 'Manual Saves' },
                          { feature: 'Audit Trail', clarity: 'Forensic Lineage', soft: 'Activity Log', spread: 'None' },
                          { feature: 'Hierarchy', clarity: 'Infinite / Temporal', soft: 'Fixed Levels', spread: 'Manual Links' },
                          { feature: 'Dispute Res', clarity: 'Traceable Resolution', soft: 'Ticket Based', spread: 'Email Chains' },
                       ].map((row, i) => (
                          <tr key={i} className="hover:bg-white/5 transition-colors group">
                             <td className="p-8 font-bold text-white border-r border-white/5 sticky left-0 bg-[#18181b] z-10">{row.feature}</td>
                             <td className="p-8 bg-[#06b6d4]/5 border-r border-white/5 text-[#06b6d4] font-semibold">{row.clarity}</td>
                             <td className="p-8 text-gray-500 border-r border-white/5 italic font-light">{row.soft}</td>
                             <td className="p-8 text-gray-500 font-light italic">{row.spread}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </div>
             <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest lg:hidden">
               <ChevronRight size={14} className="animate-pulse" /> Swipe to compare core capabilities
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Environments of Consequence + Waitlist CTA */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#18181b]">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <RevealSection>
               <h2 className="text-4xl md:text-6xl font-serif text-white mb-10 leading-tight">Environments of Consequence</h2>
               <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
                  Clarity is purpose-built for organizations where commission errors create regulatory risk, not just annoyance.
               </p>
               <ul className="space-y-10">
                  {[
                    { icon: Users, title: "1099 Large-Scale Organizations", text: "Ingesting raw data and delivering audit-ready statements for thousands of independent contractors with zero tolerance for variance." },
                    { icon: FileText, title: "Insurance & Distribution Firms", text: "Managing complex TPA structures, multi-tier overrides, and temporal hierarchy changes (splits, shared codes, and retroactive adjustments)." },
                    { icon: Database, title: "High-Velocity Pay Environments", text: "Administrators handling mixed pay frequencies, daily processing, and automated chargeback handling." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-6 group">
                       <div className="shrink-0 mt-1 bg-[#06b6d4] text-[#0a0a0a] p-3 rounded-sm shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <item.icon size={24} strokeWidth={1.5} />
                       </div>
                       <div>
                          <h4 className="font-bold text-white text-xl mb-2 tracking-tight">{item.title}</h4>
                          <p className="text-gray-400 leading-relaxed font-light">{item.text}</p>
                       </div>
                    </li>
                  ))}
               </ul>
            </RevealSection>
            
            {/* Waitlist CTA Card */}
            <RevealSection delay={400} className="flex justify-center lg:justify-end">
                <div 
                    className="relative flex flex-col gap-8 p-10 w-full max-w-[28rem] rounded-2xl overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.3)] transform transition-all duration-700 hover:-translate-y-4 border border-[#06b6d4]/30 hover:border-[#06b6d4]/60 hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.5)]"
                    style={{
                        backgroundColor: '#111827',
                        backgroundImage: `
                            radial-gradient(at 88% 40%, rgba(17, 24, 39, 1) 0px, transparent 85%),
                            radial-gradient(at 49% 30%, rgba(17, 24, 39, 1) 0px, transparent 85%),
                            radial-gradient(at 0% 64%, rgba(6, 182, 212, 0.2) 0px, transparent 85%),
                            radial-gradient(at 41% 94%, rgba(6, 182, 212, 0.15) 0px, transparent 85%)
                        `,
                        boxShadow: '0px -16px 40px 0px rgba(255, 255, 255, 0.03) inset'
                    }}
                >
                    <div className="relative z-10">
                        <span className="text-white font-serif text-3xl font-bold tracking-tight block mb-2">Join the Waitlist</span>
                        <p className="text-gray-400 text-sm font-light leading-relaxed">Early access to audit-grade commission infrastructure.</p>
                    </div>
                    
                    <div className="h-[1px] w-full bg-white/10 relative z-10"></div>
                    
                    <ul className="flex flex-col gap-5 relative z-10">
                        {['Hierarchy Traceability', 'Calculation Drift', 'Retroactive Logic', 'Data Lineage'].map((item, idx) => (
                            <li key={item} className="flex items-center gap-4 group/li transition-transform duration-300 hover:translate-x-2">
                                <span className="flex items-center justify-center w-6 h-6 bg-[#06b6d4] rounded-full shrink-0 shadow-lg shadow-[#06b6d4]/20">
                                    <svg className="w-3.5 h-3.5 text-[#0a0a0a] fill-current" viewBox="0 0 16 16">
                                        <path clipRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" fillRule="evenodd" />
                                    </svg>
                                </span>
                                <span className="text-base text-gray-200 font-medium tracking-tight">{item}</span>
                            </li>
                        ))}
                    </ul>
                    
                    <button 
                        onClick={() => setIsWaitlistOpen(true)}
                        className="relative z-10 w-full py-5 rounded-full text-[#0a0a0a] font-bold text-xs uppercase tracking-[0.3em] shadow-2xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] bg-[#06b6d4] hover:bg-[#22d3ee] hover:shadow-[#06b6d4]/40"
                    >
                        Join Waitlist
                    </button>
                    
                    <div className="absolute inset-0 bg-white/[0.02] pointer-events-none"></div>
                </div>
            </RevealSection>
         </div>
      </section>
    </div>
  );
};
