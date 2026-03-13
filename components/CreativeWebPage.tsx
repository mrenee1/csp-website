import React from 'react';
import { ArrowLeft, Palette, Code, Smartphone, Globe, Zap, Shield, Users } from 'lucide-react';
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
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Galaxy
            starSpeed={0.2}
            density={0.6}
            hueShift={140}
            speed={0.3}
            glowIntensity={0.1}
            saturation={0}
            mouseRepulsion
            repulsionStrength={2}
            twinkleIntensity={0.3}
            rotationSpeed={0}
            transparent
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/60 via-purple-900/50 to-pink-950/60"></div>
        <div className="relative py-24 px-6 md:px-12 lg:px-24">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back Home
          </button>
          
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#C9A84C] mb-8 drop-shadow-[0_0_12px_rgba(201,168,76,0.7)]">
              Creative Web
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed max-w-3xl">
              Websites, branding, and digital marketing that actually move the needle. We don't do average. Every goal, every word, every campaign is built to convert.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-24 px-6 md:px-12 lg:px-24">
        {/* Core Services Section */}
        <section className="mb-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-serif font-medium text-center mb-16">
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">BUILD.</span> <span className="text-[#00FFCC] drop-shadow-[0_0_8px_rgba(0,255,204,0.5)]">BRAND.</span> <span className="text-[#FF3399] drop-shadow-[0_0_8px_rgba(255,51,153,0.5)]">DOMINATE.</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Palette,
                  title: "Custom Website Design",
                  description: "Beautiful, responsive websites crafted specifically for your brand and audience. Modern designs that convert visitors into customers."
                },
                {
                  icon: Code,
                  title: "Web Development",
                  description: "Clean, efficient code with cutting-edge technology. From simple sites to complex web applications."
                },
                {
                  icon: Smartphone,
                  title: "Mobile Optimization",
                  description: "Fully responsive designs that look perfect on every device. Mobile-first approach for today's users."
                },
                {
                  icon: Globe,
                  title: "SEO & Performance",
                  description: "Fast-loading websites optimized for search engines. Technical SEO implementation for better rankings."
                },
                {
                  icon: Zap,
                  title: "E-Commerce Solutions",
                  description: "Complete online store setups with secure payment processing, inventory management, and conversion optimization."
                },
                {
                  icon: Shield,
                  title: "Security & Maintenance",
                  description: "Ongoing security updates, backups, and performance monitoring to keep your site running smoothly."
                }
              ].map((service, index) => (
                <div key={index} className="bg-[#18181b] p-8 rounded-xl border border-white/10 hover:border-[#FF2D92]/40 transition-all duration-500 group">
                  <div className="w-16 h-16 bg-[#FF2D92]/10 rounded-full flex items-center justify-center mb-6 text-[#FF2D92] group-hover:bg-[#FF2D92]/20 transition-colors">
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
            <button 
              onClick={() => {
                window.location.href = 'mailto:michelle@creativesolutionspartners.com?subject=Creative%20Web%20Consultation';
              }}
              className="bg-[#FF2D92] text-white px-12 py-5 font-bold hover:bg-[#FF2D92]/80 transition-all duration-500 rounded-lg text-lg uppercase tracking-widest shadow-lg hover:shadow-[#FF2D92]/25 border-2 border-[#FF2D92]"
            >
              Start Your Project
            </button>
          </div>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-[#FF2D92]/10 text-[#FF2D92] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-[#FF2D92]/20">
              <span>⚡</span>
              Powered by Biz Boost Agency
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};