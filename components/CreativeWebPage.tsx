import React from 'react';
import { ArrowLeft, Palette, Monitor, Share2, Lightbulb, BarChart2, Mail, Zap, Shield, Users } from 'lucide-react';
import { PageName } from '../types';
import { Galaxy } from './Galaxy';

interface CreativeWebPageProps {
  onBack: () => void;
  onNavigate: (page: PageName) => void;
}

export const CreativeWebPage: React.FC<CreativeWebPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C5A059]/10 via-transparent to-transparent"></div>
        <div className="py-20 px-6 md:px-12 lg:px-24 relative z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Solutions
          </button>
          
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C5A059] mb-4">Creative Solutions Partners</p>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#C5A059] mb-4 drop-shadow-[0_0_30px_rgba(197,160,89,0.3)]">
              Creative Web
            </h1>
            <div className="w-24 h-px bg-[#C5A059] mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl text-white font-light mb-2">
              Digital Presence. Built to Perform.
            </p>
            <p className="text-sm text-white/60 max-w-md mx-auto mb-6">
              Web design, branding, content, and digital systems for modern business growth.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C5A059]/80">
              Powered by Biz Boost Agency
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-24 px-6 md:px-12 lg:px-24">
        {/* Core Services Section */}
        <section className="mb-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Monitor,
                  title: "Web Design",
                  description: "Custom websites built to convert. Fast, mobile-first, designed to make your competition nervous."
                },
                {
                  icon: Palette,
                  title: "Brand Identity",
                  description: "Logos, color systems, and brand guidelines that make you instantly recognizable and undeniably credible."
                },
                {
                  icon: Share2,
                  title: "Social Media",
                  description: "Content strategy and scheduling that builds community and keeps your brand in the feed — every day."
                },
                {
                  icon: Lightbulb,
                  title: "Consulting",
                  description: "We diagnose your business, identify the leaks, and hand you a concrete roadmap to plug them."
                },
                {
                  icon: BarChart2,
                  title: "SEO & Ads",
                  description: "Organic rankings and paid campaigns that bring buyers to your door — not browsers. ROI-focused."
                },
                {
                  icon: Mail,
                  title: "Email Marketing",
                  description: "Automated sequences and newsletters that turn one-time buyers into loyal, repeat customers."
                }
              ].map((service, index) => (
                <div key={index} className="bg-[#18181b] p-8 rounded-xl border border-white/10 hover:border-[#C5A059]/40 transition-all duration-500 group">
                  <div className="w-16 h-16 bg-[#C5A059]/10 rounded-full flex items-center justify-center mb-6 text-[#C5A059] group-hover:bg-[#C5A059]/20 transition-colors">
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-32">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-16 text-center">
              Our Process
            </h2>
            
            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Discovery & Strategy",
                  description: "We dive deep into your business goals, target audience, and competitive landscape to develop a winning digital strategy."
                },
                {
                  step: "02", 
                  title: "Design & Prototyping",
                  description: "Create wireframes and mockups that bring your vision to life, focusing on user experience and conversion optimization."
                },
                {
                  step: "03",
                  title: "Development & Testing",
                  description: "Build your website with clean code, rigorous testing, and quality assurance across all devices and browsers."
                },
                {
                  step: "04",
                  title: "Launch & Optimization",
                  description: "Go live with confidence, followed by ongoing performance monitoring and continuous improvement."
                }
              ].map((step, index) => (
                <div key={index} className="flex gap-8 items-start group">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-[#FF2D92]/10 border-2 border-[#FF2D92]/30 flex items-center justify-center text-[#FF2D92] font-bold text-xl group-hover:bg-[#FF2D92]/20 transition-colors">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="mb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-12">
              Why Choose Our Creative Web Solutions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  icon: Users,
                  title: "Results-Focused Design",
                  description: "Every design decision is made with conversion and user experience in mind, not just aesthetics."
                },
                {
                  icon: Zap,
                  title: "Lightning Fast Performance",
                  description: "Optimized for speed and performance to keep users engaged and improve search rankings."
                },
                {
                  icon: Shield,
                  title: "Future-Proof Technology",
                  description: "Built with modern, scalable technologies that grow with your business needs."
                },
                {
                  icon: Palette,
                  title: "Brand-Aligned Solutions",
                  description: "Websites that perfectly reflect your brand identity and business values."
                }
              ].map((benefit, index) => (
                <div key={index} className="bg-[#18181b] p-8 rounded-xl border border-white/10 hover:border-[#FF2D92]/40 transition-all duration-500">
                  <div className="w-12 h-12 bg-[#FF2D92]/10 rounded-full flex items-center justify-center mb-6 text-[#FF2D92] mx-auto">
                    <benefit.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#FF2D92]/20 to-[#00AABF]/20 p-16 rounded-2xl border border-[#FF2D92]/20">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Ready to Elevate Your Digital Presence?
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Let's discuss how we can transform your online presence and drive real business results through exceptional web design and development.
            </p>
            <a 
              href="mailto:michelle@creativesolutionspartners.com?subject=Creative%20Web%20Project%20Inquiry&body=Hi%20CSP%20Team%2C%0A%0AI'm%20interested%20in%20discussing%20a%20Creative%20Web%20project.%20Please%20contact%20me%20to%20schedule%20a%20consultation.%0A%0ABest%20regards"
              className="inline-block bg-[#C5A059] text-[#0a0a0a] px-12 py-5 font-bold hover:bg-[#D4AF37] transition-all duration-500 rounded-lg text-lg uppercase tracking-widest shadow-lg hover:shadow-[#C5A059]/25 border-2 border-[#C5A059]"
            >
              Start Your Project
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};