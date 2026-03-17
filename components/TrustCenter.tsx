import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Shield, Lock, FileText, Eye, Server, Globe, ChevronRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PageName } from '../types';

interface TrustCenterProps {
  onBack: () => void;
  onNavigate: (page: PageName) => void;
}

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

const TRUST_PILLARS = [
  {
    icon: Shield,
    title: "Data Protection",
    description: "Enterprise-grade encryption at rest and in transit. Your data is protected using AES-256 encryption and TLS 1.3 protocols."
  },
  {
    icon: Lock,
    title: "Access Control",
    description: "Role-based access control (RBAC) with multi-factor authentication (MFA) and single sign-on (SSO) integration."
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear data handling practices. We never sell your data and you maintain full ownership of your information."
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    description: "SOC 2 Type II certified data centers with 24/7 monitoring, automated threat detection, and regular penetration testing."
  }
];

const COMPLIANCE_STANDARDS = [
  { name: "SOC 2 Type II", status: "Certified", description: "Security, availability, and confidentiality controls" },
  { name: "GDPR", status: "Compliant", description: "EU data protection regulation compliance" },
  { name: "CCPA", status: "Compliant", description: "California Consumer Privacy Act compliance" },
  { name: "HIPAA", status: "Business Associate", description: "Healthcare data protection standards" },
  { name: "PCI DSS", status: "Level 1", description: "Payment card industry data security" }
];

const SECURITY_PRACTICES = [
  {
    category: "Data Encryption",
    items: [
      "AES-256 encryption for data at rest",
      "TLS 1.3 for data in transit",
      "End-to-end encryption for sensitive communications",
      "Encrypted database backups"
    ]
  },
  {
    category: "Access & Authentication",
    items: [
      "Multi-factor authentication (MFA) required",
      "Single Sign-On (SSO) via SAML 2.0 and OIDC",
      "Role-based access control (RBAC)",
      "Session management with automatic timeout",
      "API key authentication with scoped permissions"
    ]
  },
  {
    category: "Monitoring & Incident Response",
    items: [
      "24/7 security operations center (SOC)",
      "Real-time threat detection and alerting",
      "Automated vulnerability scanning",
      "Annual third-party penetration testing",
      "Incident response plan with defined SLAs"
    ]
  },
  {
    category: "Data Handling",
    items: [
      "Data minimization principles",
      "Automated data retention policies",
      "Secure data deletion procedures",
      "Regular data integrity audits",
      "Geographic data residency options"
    ]
  }
];

export const TrustCenter: React.FC<TrustCenterProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="bg-[#0a0a0a] relative w-full max-w-[100vw] overflow-x-hidden selection:bg-[#C5A059]/30">
      {/* Hero Section */}
      <section className="bg-[#0a0a0a] text-white min-h-[60vh] flex flex-col justify-center pt-24 pb-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10 max-w-4xl">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-xs uppercase tracking-[0.3em] group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back Home
          </button>

          <div className="inline-flex items-center gap-2 bg-[#C5A059]/20 text-[#C5A059] px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] border border-[#C5A059]/30 mb-8">
            <Shield size={14} /> Security & Compliance
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-medium leading-[1.1] mb-6">
            Trust <span className="text-[#C5A059]">Center</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl">
            Your data security is our highest priority. Learn about our security practices, compliance certifications, and commitment to protecting your information.
          </p>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#18181b] border-y border-white/5">
        <RevealSection className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TRUST_PILLARS.map((pillar, i) => (
              <RevealSection key={i} delay={i * 100} className="p-8 bg-[#0a0a0a] rounded-xl border border-white/5 hover:border-[#C5A059]/30 transition-all duration-500 group">
                <div className="w-14 h-14 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-lg flex items-center justify-center mb-6 text-[#C5A059] group-hover:scale-110 transition-transform duration-500">
                  <pillar.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{pillar.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light">{pillar.description}</p>
              </RevealSection>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* Compliance Standards */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]">
        <RevealSection className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Compliance Standards</h2>
            <p className="text-gray-400 font-light">Industry-leading certifications and regulatory compliance</p>
          </div>

          <div className="space-y-4">
            {COMPLIANCE_STANDARDS.map((standard, i) => (
              <RevealSection key={i} delay={i * 100} className="flex items-center gap-6 p-6 bg-[#18181b] rounded-lg border border-white/5 hover:border-[#C5A059]/30 transition-all duration-300">
                <div className="shrink-0">
                  <CheckCircle2 size={24} className="text-[#C5A059]" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-white text-lg">{standard.name}</h4>
                    <span className="px-2 py-0.5 bg-[#C5A059]/20 text-[#C5A059] text-[10px] font-bold uppercase tracking-wider rounded">{standard.status}</span>
                  </div>
                  <p className="text-gray-400 text-sm font-light">{standard.description}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* Security Practices */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#18181b] border-y border-white/5">
        <RevealSection className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Security Practices</h2>
            <p className="text-gray-400 font-light">Comprehensive security measures across our entire platform</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SECURITY_PRACTICES.map((practice, i) => (
              <RevealSection key={i} delay={i * 100} className="p-8 bg-[#0a0a0a] rounded-xl border border-white/5">
                <h3 className="text-lg font-bold text-[#C5A059] mb-6 uppercase tracking-wider text-[10px]">{practice.category}</h3>
                <ul className="space-y-3">
                  {practice.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-300 text-sm font-light">
                      <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full mt-2 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealSection>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* Privacy Policy Link */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]">
        <RevealSection className="max-w-4xl mx-auto">
          <div className="p-10 md:p-16 bg-gradient-to-br from-[#18181b] to-[#0a0a0a] rounded-2xl border border-[#C5A059]/20 text-center">
            <FileText size={48} className="text-[#C5A059] mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Privacy Policy</h2>
            <p className="text-gray-400 font-light mb-8 max-w-xl mx-auto">
              Read our comprehensive privacy policy to understand how we collect, use, and protect your personal information.
            </p>
            <button
              onClick={() => onNavigate('privacy')}
              className="inline-flex items-center gap-3 bg-[#C5A059] text-[#0a0a0a] px-8 py-4 font-bold hover:bg-[#d4af37] transition-all duration-500 uppercase tracking-widest text-xs rounded-sm"
            >
              View Privacy Policy <ChevronRight size={16} />
            </button>
          </div>
        </RevealSection>
      </section>

      {/* Contact Security Team */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#18181b]">
        <RevealSection className="max-w-4xl mx-auto text-center">
          <AlertTriangle size={32} className="text-[#C5A059] mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">Security Concerns?</h2>
          <p className="text-gray-400 font-light mb-8">
            If you have discovered a security vulnerability or have concerns about our security practices, please contact our security team immediately.
          </p>
          <a
            href="mailto:security@creativesolutionspartners.com?subject=Security%20Inquiry"
            className="inline-flex items-center gap-2 text-[#C5A059] hover:text-white transition-colors text-sm uppercase tracking-widest"
          >
            Contact Security Team <ChevronRight size={14} />
          </a>
        </RevealSection>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Creative Solutions Partners. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('privacy')} className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('terms')} className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
              Terms of Service
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
