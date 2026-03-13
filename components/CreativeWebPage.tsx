import React from 'react';
import { ArrowLeft, Palette, Code, Smartphone, Globe, Zap, Shield, Users } from 'lucide-react';
import { PageName } from '../types';

interface CreativeWebPageProps {
  onBack: () => void;
  onNavigate: (page: PageName) => void;
}

export const CreativeWebPage: React.FC<CreativeWebPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-500/20"></div>
        <div className="relative py-24 px-6 md:px-12 lg:px-24">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Technology
          </button>
          
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-pink-500/20 text-pink-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-8 border border-pink-500/30">
              Web Solutions
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-8">
              Creative <span className="text-pink-400">Web</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed max-w-3xl">
              Professional Websites, Branding & Digital Growth Systems
            </p>
            
            <p className="text-lg text-gray-400 mt-8 max-w-3xl leading-relaxed">
              Transform your digital presence with custom websites, branding solutions, and growth-focused web systems designed for modern businesses. We create digital experiences that convert visitors into customers and elevate your brand.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-24 px-6 md:px-12 lg:px-24">
        {/* Core Services Section */}
        <section className="mb-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-16 text-center">
              Our Web Solutions
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
                <div key={index} className="bg-[#18181b] p-8 rounded-xl border border-white/10 hover:border-purple-500/40 transition-all duration-500 group">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
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
                  <div className="shrink-0 w-16 h-16 rounded-full bg-purple-500/10 border-2 border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xl group-hover:bg-purple-500/20 transition-colors">
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
                <div key={index} className="bg-[#18181b] p-8 rounded-xl border border-white/10 hover:border-purple-500/40 transition-all duration-500">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 text-purple-400 mx-auto">
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
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-16 rounded-2xl border border-purple-500/20">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Ready to Elevate Your Digital Presence?
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Let's discuss how we can transform your online presence and drive real business results through exceptional web design and development.
            </p>
            <button 
              onClick={() => {
                window.location.href = 'mailto:partners@csp.com?subject=Creative%20Web%20Consultation';
              }}
              className="bg-purple-500 text-white px-12 py-5 font-bold hover:bg-purple-600 transition-all duration-500 rounded-lg text-lg uppercase tracking-widest shadow-lg hover:shadow-purple-500/25"
            >
              Start Your Project
            </button>
          </div>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-pink-500/20">
              <span>⚡</span>
              Powered by Biz Boost Agency
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};