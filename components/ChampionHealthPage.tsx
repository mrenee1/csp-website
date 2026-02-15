import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, HeartPulse, Brain, Activity, Users, BarChart3, Shield, Smile, Dumbbell, Apple, Moon, X, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';
import { PageName } from '../types';

interface ChampionHealthPageProps {
  onBack: () => void;
  onNavigate: (page: PageName) => void;
}

const HERO_FEATURES = [
  {
    title: "Personalized Assessments",
    desc: "Science-backed wellbeing assessments that identify individual health risks and deliver tailored recommendations.",
    icon: BarChart3
  },
  {
    title: "Mental Resilience",
    desc: "Clinically validated tools for stress management, anxiety reduction, and building lasting mental resilience.",
    icon: Brain
  },
  {
    title: "Organizational Insights",
    desc: "Anonymized workforce analytics that reveal population-level health trends and inform strategic decisions.",
    icon: Activity
  }
];

const WELLBEING_PILLARS = [
  {
    icon: Brain,
    title: "Mental Health",
    desc: "Evidence-based support for stress, anxiety, and emotional wellbeing with personalized coping strategies and guided programs."
  },
  {
    icon: Dumbbell,
    title: "Physical Health",
    desc: "Tailored fitness and movement plans designed for real lives, addressing musculoskeletal health, cardiovascular fitness, and daily activity goals."
  },
  {
    icon: Apple,
    title: "Nutrition",
    desc: "Personalized dietary guidance based on individual health profiles, with practical meal planning and habit-building tools."
  },
  {
    icon: Moon,
    title: "Sleep",
    desc: "Clinically informed sleep hygiene programs that address the root causes of poor sleep and build sustainable rest patterns."
  },
  {
    icon: Smile,
    title: "Happiness & Fulfillment",
    desc: "Purpose-driven wellbeing modules grounded in positive psychology, fostering engagement, motivation, and life satisfaction."
  },
  {
    icon: Shield,
    title: "Financial Wellbeing",
    desc: "Reduce financial stress through educational resources and tools that empower employees to take control of their financial health."
  }
];

// Helper component for scroll reveals
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

export const ChampionHealthPage: React.FC<ChampionHealthPageProps> = ({ onBack, onNavigate }) => {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % HERO_FEATURES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const LEAD_EMAIL = 'partners@csp.com';

  return (
    <div className="bg-[#0a0a0a] relative w-full max-w-[100vw] overflow-x-hidden selection:bg-[#2DD4BF]/30">

      {/* Wellbeing Assessment Modal */}
      {isAssessmentOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsAssessmentOpen(false)}></div>
          <div className="relative bg-[#18181b] border border-[#2DD4BF]/40 w-full max-w-xl rounded-xl shadow-[0_0_60px_-10px_rgba(45,212,191,0.5)] overflow-hidden animate-slide-up">
            <div className="bg-[#0a0a0a] text-white p-8 flex justify-between items-start border-b border-white/10">
              <div>
                <h3 className="text-2xl font-serif mb-2">Wellbeing Assessment</h3>
                <p className="text-gray-400 text-sm font-light">Discover the health profile of your organization.</p>
              </div>
              <button onClick={() => setIsAssessmentOpen(false)} className="text-gray-500 hover:text-white transition-colors p-1">
                <X size={24} />
              </button>
            </div>
            <div className="p-8">
              <form className="space-y-8" onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const org = (form.querySelector('[name="org"]') as HTMLInputElement)?.value || '';
                const size = (form.querySelector('[name="size"]') as HTMLSelectElement)?.value || '';
                const concern = (form.querySelector('[name="concern"]:checked') as HTMLInputElement)?.value || '';
                const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value || '';
                const subject = encodeURIComponent('Wellbeing Assessment Request');
                const body = encodeURIComponent(`Organization: ${org}\nEmployee Count: ${size}\nPrimary Concern: ${concern}\nHR Email: ${email}`);
                window.location.href = `mailto:${LEAD_EMAIL}?subject=${subject}&body=${body}`;
                setIsAssessmentOpen(false);
              }}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-[#2DD4BF] transition-colors">Organization Name</label>
                    <input name="org" type="text" className="w-full border border-white/10 bg-white/5 py-3 px-4 rounded-lg text-white placeholder-gray-500 focus:border-[#2DD4BF] focus:outline-none" placeholder="Company Ltd." />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-[#2DD4BF] transition-colors">Employee Count</label>
                    <select name="size" className="w-full border border-white/10 bg-white/5 py-3 px-4 rounded-lg text-white focus:border-[#2DD4BF] focus:outline-none cursor-pointer">
                      <option value="">Select Size</option>
                      <option value="50-250">50 - 250 Employees</option>
                      <option value="250-1000">250 - 1,000 Employees</option>
                      <option value="1000-5000">1,000 - 5,000 Employees</option>
                      <option value="5000+">5,000+ Employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Primary Wellbeing Concern</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Mental Health & Burnout', 'Physical Inactivity', 'High Absenteeism', 'Low Engagement'].map((opt) => (
                      <label key={opt} className="flex items-center gap-3 p-4 border border-white/10 rounded-lg hover:border-[#2DD4BF]/40 hover:bg-[#2DD4BF]/5 cursor-pointer transition-all">
                        <input type="radio" name="concern" value={opt} className="w-4 h-4 text-[#2DD4BF] border-gray-500 focus:ring-[#2DD4BF]" />
                        <span className="text-sm text-gray-300 font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-[#2DD4BF] transition-colors">HR Contact Email</label>
                  <input name="email" type="email" required className="w-full border border-white/10 bg-white/5 py-3 px-4 rounded-lg text-white placeholder-gray-500 focus:border-[#2DD4BF] focus:outline-none" placeholder="hr@company.com" />
                </div>

                <button type="submit" className="w-full bg-[#2DD4BF] text-[#0a0a0a] py-5 font-bold hover:bg-[#5eead4] transition-all duration-500 uppercase tracking-[0.2em] text-xs flex justify-center items-center gap-3 rounded-lg">
                  Request Wellbeing Report <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-[#0a0a0a] text-white min-h-[90vh] flex flex-col justify-center pt-24 pb-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10">
          <button
            onClick={() => onNavigate('health')}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-xs uppercase tracking-[0.3em] group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Health
          </button>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start">

            <div className="w-full lg:w-3/5 space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#2DD4BF]/20 text-[#2DD4BF] px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] border border-[#2DD4BF]/30">
                <HeartPulse size={14} /> Personalized Wellbeing Platform
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-medium leading-[1.1]">
                Champion <span className="text-[#2DD4BF]">Health</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-white font-light leading-relaxed">
                Where Science Meets <br className="hidden md:block" /><span className="text-[#2DD4BF] italic">Wellbeing Strategy</span>.
              </h2>
              <p className="text-lg md:text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                The leading workplace wellbeing platform that combines clinical science with intelligent technology to create personalized health journeys for every employee.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <button
                  onClick={() => setIsAssessmentOpen(true)}
                  className="bg-[#2DD4BF] text-[#0a0a0a] px-10 py-5 font-bold hover:bg-[#5eead4] transition-all duration-500 w-full sm:w-auto text-center rounded-sm shadow-[0_0_40px_-10px_rgba(45,212,191,0.5)] uppercase tracking-widest text-xs"
                >
                  Get Your Wellbeing Report
                </button>
                <div className="hidden sm:flex items-center text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium border-l border-gray-700 pl-6">
                  Science-Backed. <br /> Data-Driven.
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
                          ? 'opacity-100 translate-y-0 z-20 border-[#2DD4BF]/40 shadow-[0_0_40px_-10px_rgba(45,212,191,0.4)]'
                          : 'opacity-0 translate-y-12 z-10 border-white/5 pointer-events-none'
                      }`}
                    >
                      <div className="w-16 h-16 bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 rounded-full flex items-center justify-center mb-8 text-[#2DD4BF] group-hover:scale-110 transition-transform duration-500">
                        <Icon size={32} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-3xl font-serif mb-6 text-white">{feat.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-lg font-light">{feat.desc}</p>
                      <div className="absolute bottom-0 left-0 h-[2px] bg-[#2DD4BF] transition-all duration-[5000ms] ease-linear w-0" style={{ width: isActive ? '100%' : '0%' }}></div>
                    </div>
                  );
                })}
                <div className="absolute -bottom-12 left-0 right-0 flex justify-center lg:justify-start gap-3">
                  {HERO_FEATURES.map((_, idx) => (
                    <button key={idx} onClick={() => setActiveFeatureIndex(idx)} className={`h-1 transition-all duration-500 ${idx === activeFeatureIndex ? 'w-12 bg-[#2DD4BF]' : 'w-4 bg-gray-700'}`} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Wellbeing Gap */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#18181b]">
        <RevealSection className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">The Wellbeing <br />Imperative</h2>
            <p className="text-gray-400 leading-relaxed text-lg font-light">
              Reactive wellness programs fail because they treat symptoms, not root causes. Champion Health takes a fundamentally different approach.
            </p>
            <div className="mt-12 h-px w-24 bg-[#2DD4BF]"></div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 gap-12">
            {[
              { icon: BarChart3, title: "76% of Employees Report Moderate to High Stress", text: "Workplace stress has reached epidemic proportions. Without proactive intervention, organizations face spiraling absenteeism, presenteeism, and talent attrition." },
              { icon: Users, title: "One-Size-Fits-All Programs Don't Work", text: "Generic wellness offerings see single-digit engagement rates. Personalization is no longer a luxury; it is the baseline requirement for meaningful health outcomes." },
              { icon: Activity, title: "The Data Gap Costs Millions", text: "Most organizations cannot quantify their workforce health risk. Without actionable data, wellbeing investments remain unmeasured and under-optimized." }
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 200} className="flex gap-8 items-start group">
                <div className="shrink-0 mt-1 bg-[#0a0a0a] border border-[#2DD4BF]/30 p-4 text-[#2DD4BF] shadow-sm group-hover:shadow-[0_0_30px_-5px_rgba(45,212,191,0.3)] transition-all duration-500">
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

      {/* Six Pillars of Wellbeing */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 border-y border-white/5 bg-[#0a0a0a]">
        <RevealSection className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">A Whole-Person Approach</h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
            Champion Health addresses <strong>six interconnected pillars</strong> of wellbeing, delivering personalized support that adapts to each individual.
          </p>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {WELLBEING_PILLARS.map((item, i) => (
            <RevealSection key={i} delay={i * 100} className="p-10 bg-[#18181b] rounded-xl border border-white/5 hover:border-[#2DD4BF]/40 hover:shadow-[0_0_40px_-10px_rgba(45,212,191,0.3)] transition-all duration-700 group flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#2DD4BF]/10 flex items-center justify-center mb-8 text-[#2DD4BF]">
                <item.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight text-white">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed font-light text-sm">{item.desc}</p>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Platform Intelligence */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#2DD4BF]/[0.07] skew-x-12 transform origin-top-right pointer-events-none"></div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-24 items-center">
          <RevealSection>
            <div className="inline-flex items-center gap-2 text-[#2DD4BF] mb-8 font-bold uppercase tracking-[0.3em] text-[10px]">
              <Sparkles size={16} /> Intelligent Wellbeing Engine
            </div>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Data That <br />Drives Action</h2>
            <p className="text-gray-400 text-xl leading-relaxed mb-12 font-light">
              Champion Health transforms raw wellbeing data into strategic organizational intelligence. Real-time dashboards give HR and leadership the visibility they need to make informed, impactful decisions.
            </p>
            <ul className="space-y-6">
              {[
                { icon: BarChart3, text: "Real-Time Workforce Health Dashboard" },
                { icon: Activity, text: "Predictive Absenteeism Modeling" },
                { icon: Shield, text: "Anonymous & GDPR-Compliant Analytics" }
              ].map((li, i) => (
                <li key={i} className="flex items-center gap-4 group">
                  <div className="p-2 rounded bg-white/5 text-[#2DD4BF] group-hover:bg-[#2DD4BF] group-hover:text-[#0a0a0a] transition-all duration-500">
                    <li.icon size={20} />
                  </div>
                  <span className="text-gray-300 font-medium tracking-wide">{li.text}</span>
                </li>
              ))}
            </ul>
          </RevealSection>

          <RevealSection delay={300} className="relative">
            <div className="bg-[#18181b] border border-[#2DD4BF]/20 rounded-xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <span className="ml-4 text-[10px] text-gray-500 font-mono tracking-widest uppercase">insights.championhealth.co</span>
              </div>
              <div className="p-10 space-y-8">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Engagement", value: "87%", trend: "+12%" },
                    { label: "Wellbeing Score", value: "72", trend: "+8pts" },
                    { label: "Risk Reduction", value: "34%", trend: "YoY" }
                  ].map((metric, idx) => (
                    <div key={idx} className="bg-white/[0.03] border border-white/5 rounded-lg p-4">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{metric.label}</p>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                      <p className="text-xs text-[#2DD4BF] mt-1">{metric.trend}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#2DD4BF]/10 p-8 rounded border-l-2 border-[#2DD4BF] space-y-4">
                  <div className="flex items-center gap-2 text-[10px] text-[#2DD4BF] font-bold uppercase tracking-widest">
                    <CheckCircle2 size={12} /> Population Insight
                  </div>
                  <p className="text-white leading-relaxed">
                    <span className="text-[#2DD4BF] font-bold block mb-1">Top Risk Factor:</span>
                    Sleep Quality (42% below benchmark)
                    <span className="text-gray-500 block mt-2">Recommendation:</span>
                    Deploy targeted sleep program to Engineering & Operations teams.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#2DD4BF]/20 blur-[120px] rounded-full pointer-events-none"></div>
          </RevealSection>
        </div>
      </section>

      {/* Champion Health Difference - Comparison Table */}
      <section className="py-32 md:py-48 bg-[#18181b]">
        <div className="px-6 md:px-12 lg:px-24">
          <RevealSection className="max-w-6xl mx-auto">
            <div className="mb-16 text-center md:text-left">
              <h2 className="text-4xl font-serif text-white mb-4">The Champion Health Difference</h2>
              <p className="text-xl text-gray-400 font-light">Why forward-thinking organizations choose Champion Health over generic wellness programs.</p>
            </div>

            <div className="relative rounded-xl shadow-2xl border border-white/5 bg-[#0a0a0a] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-[#0a0a0a] text-white">
                      <th className="p-8 font-bold text-xs uppercase tracking-[0.2em] w-1/4 sticky left-0 bg-[#0a0a0a] z-20">Capability</th>
                      <th className="p-8 font-bold text-[#2DD4BF] text-xl w-1/4 bg-[#18181b] border-b-4 border-[#2DD4BF]">Champion Health</th>
                      <th className="p-8 font-medium text-gray-500 w-1/4 uppercase tracking-widest text-[10px]">Generic Wellness</th>
                      <th className="p-8 font-medium text-gray-500 w-1/4 uppercase tracking-widest text-[10px]">EAP Programs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {[
                      { feature: 'Approach', champion: 'Personalized & Proactive', generic: 'One-Size-Fits-All', eap: 'Reactive Only' },
                      { feature: 'Assessment', champion: 'Clinical-Grade Science', generic: 'Basic Surveys', eap: 'No Assessment' },
                      { feature: 'Engagement', champion: '70-87% Avg. Engagement', generic: '5-15% Participation', eap: '3-8% Utilization' },
                      { feature: 'Analytics', champion: 'Real-Time Population Data', generic: 'Annual Reports', eap: 'Usage Counts Only' },
                      { feature: 'Coverage', champion: '6 Pillars of Wellbeing', generic: 'Fitness Focus', eap: 'Mental Health Only' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="p-8 font-bold text-white border-r border-white/5 sticky left-0 bg-[#0a0a0a] z-10 group-hover:bg-white/[0.02]">{row.feature}</td>
                        <td className="p-8 bg-[#2DD4BF]/5 border-r border-white/5 text-[#2DD4BF] font-semibold">{row.champion}</td>
                        <td className="p-8 text-gray-400 border-r border-white/5 italic font-light">{row.generic}</td>
                        <td className="p-8 text-gray-400 font-light italic">{row.eap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest lg:hidden">
              <ChevronRight size={14} className="animate-pulse" /> Swipe to compare capabilities
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Dual Perspective CTA */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <RevealSection>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-10 leading-tight">Built for Every Organization</h2>
            <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
              Champion Health scales from high-growth startups to global enterprises, adapting its clinical content and analytics to your unique workforce demographics.
            </p>
            <ul className="space-y-10">
              {[
                { icon: Users, title: "Enterprise & Corporate", text: "Comprehensive wellbeing infrastructure for organizations managing complex, distributed workforces across multiple geographies and cultures." },
                { icon: HeartPulse, title: "Healthcare & Public Sector", text: "Purpose-built support for high-burnout environments where workforce resilience is directly tied to patient and citizen outcomes." },
                { icon: Sparkles, title: "Growth-Stage Companies", text: "Scalable wellbeing programs that grow with your team, helping attract and retain top talent in competitive markets." }
              ].map((item, i) => (
                <li key={i} className="flex gap-6 group">
                  <div className="shrink-0 mt-1 bg-[#2DD4BF] text-[#0a0a0a] p-3 rounded-sm shadow-lg group-hover:scale-110 transition-transform duration-500">
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

          {/* CTA Card */}
          <RevealSection delay={400} className="flex justify-center lg:justify-end">
            <div
              className="relative flex flex-col gap-8 p-10 w-full max-w-[28rem] rounded-2xl overflow-hidden group shadow-[0_0_50px_-10px_rgba(45,212,191,0.35)] transform transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_0_60px_-10px_rgba(45,212,191,0.5)] border border-[#2DD4BF]/20"
              style={{
                backgroundColor: '#111827',
                backgroundImage: `
                  radial-gradient(at 88% 40%, rgba(17, 24, 39, 1) 0px, transparent 85%),
                  radial-gradient(at 0% 64%, rgba(45, 212, 191, 0.25) 0px, transparent 85%),
                  radial-gradient(at 41% 94%, rgba(197, 160, 89, 0.2) 0px, transparent 85%)
                `,
                boxShadow: '0px -16px 40px 0px rgba(255, 255, 255, 0.05) inset'
              }}
            >
              <div className="relative z-10">
                <span className="text-white font-serif text-3xl font-bold tracking-tight block mb-2">Wellbeing Assessment</span>
                <p className="text-gray-400 text-sm font-light leading-relaxed">Understand your workforce health risk profile.</p>
              </div>

              <div className="h-[1px] w-full bg-white/10 relative z-10"></div>

              <ul className="flex flex-col gap-5 relative z-10">
                {['Mental Health Benchmark', 'Physical Activity Index', 'Sleep Quality Score', 'Engagement Forecast'].map((item, idx) => (
                  <li key={item} className="flex items-center gap-4 group/li transition-transform duration-300 hover:translate-x-2" style={{ transitionDelay: `${idx * 50}ms` }}>
                    <span className="flex items-center justify-center w-6 h-6 bg-[#2DD4BF] rounded-full shrink-0 shadow-lg shadow-[#2DD4BF]/30">
                      <svg className="w-3.5 h-3.5 text-[#0a0a0a] fill-current" viewBox="0 0 16 16">
                        <path clipRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" fillRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-base text-gray-200 font-medium tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setIsAssessmentOpen(true)}
                className="relative z-10 w-full py-5 rounded-full text-[#0a0a0a] font-bold text-xs uppercase tracking-[0.3em] shadow-2xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] bg-[#2DD4BF] hover:bg-[#5eead4] hover:shadow-[#2DD4BF]/40"
              >
                Start Assessment
              </button>

              <div className="absolute inset-0 bg-white/[0.02] pointer-events-none"></div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};
