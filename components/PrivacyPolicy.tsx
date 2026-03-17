import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, FileText, Shield, Eye, Database, Share2, Lock, Globe, ChevronRight } from 'lucide-react';
import { PageName } from '../types';

interface PrivacyPolicyProps {
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

const LAST_UPDATED = "March 17, 2026";

const POLICY_SECTIONS = [
  {
    id: "overview",
    icon: FileText,
    title: "Overview",
    content: [
      `Creative Solutions Partners ("CSP," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.`,
      "By accessing or using our services, you consent to the practices described in this Privacy Policy. If you do not agree with this policy, please do not use our services."
    ]
  },
  {
    id: "collection",
    icon: Database,
    title: "Information We Collect",
    content: [
      "We collect information that you provide directly to us, including:",
      "• Contact information (name, email address, phone number, company name)",
      "• Account credentials and authentication information",
      "• Payment and billing information",
      "• Communications and correspondence with us",
      "• Information provided in forms, surveys, or applications",
      "",
      "We also automatically collect certain information when you use our services:",
      "• Device and browser information",
      "• IP address and location data",
      "• Usage data and analytics",
      "• Cookies and similar tracking technologies"
    ]
  },
  {
    id: "use",
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      "We use the information we collect to:",
      "• Provide, maintain, and improve our services",
      "• Process transactions and send related information",
      "• Send technical notices, updates, security alerts, and support messages",
      "• Respond to your comments, questions, and customer service requests",
      "• Communicate with you about products, services, offers, and events",
      "• Monitor and analyze trends, usage, and activities in connection with our services",
      "• Detect, investigate, and prevent fraudulent transactions and other illegal activities",
      "• Personalize and improve your experience",
      "• Comply with legal obligations and enforce our agreements"
    ]
  },
  {
    id: "sharing",
    icon: Share2,
    title: "Information Sharing and Disclosure",
    content: [
      "We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:",
      "",
      "Service Providers: We may share information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.",
      "",
      "Business Transfers: If we are involved in a merger, acquisition, financing, or sale of business assets, your information may be transferred as part of that transaction.",
      "",
      "Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities.",
      "",
      "Protection of Rights: We may disclose information to protect the rights, property, or safety of CSP, our users, or others."
    ]
  },
  {
    id: "security",
    icon: Lock,
    title: "Data Security",
    content: [
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      "",
      "Security measures include:",
      "• Encryption of data in transit and at rest",
      "• Regular security assessments and penetration testing",
      "• Access controls and authentication requirements",
      "• Employee training on data protection",
      "• Incident response procedures",
      "",
      "However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security."
    ]
  },
  {
    id: "rights",
    icon: Globe,
    title: "Your Privacy Rights",
    content: [
      "Depending on your location, you may have certain rights regarding your personal information:",
      "",
      "• Access: Request access to the personal information we hold about you",
      "• Correction: Request correction of inaccurate or incomplete information",
      "• Deletion: Request deletion of your personal information",
      "• Restriction: Request restriction of processing of your information",
      "• Portability: Request transfer of your information to another controller",
      "• Objection: Object to processing of your information for certain purposes",
      "",
      "To exercise these rights, please contact us using the information provided at the end of this policy."
    ]
  },
  {
    id: "cookies",
    icon: Shield,
    title: "Cookies and Tracking",
    content: [
      "We use cookies and similar tracking technologies to collect information about your browsing activities and to distinguish you from other users of our services.",
      "",
      "Types of cookies we use:",
      "• Essential cookies: Required for the operation of our services",
      "• Analytical cookies: Help us understand how visitors interact with our website",
      "• Functional cookies: Enable enhanced functionality and personalization",
      "• Targeting cookies: Record your visit to our website and help deliver relevant advertising",
      "",
      "You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. However, disabling cookies may affect the functionality of our services."
    ]
  },
  {
    id: "retention",
    icon: Database,
    title: "Data Retention",
    content: [
      "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.",
      "",
      "Factors that determine retention periods include:",
      "• The duration of our relationship with you",
      "• Legal obligations to retain data",
      "• Statutes of limitations for potential legal claims",
      "• Operational requirements and business needs",
      "",
      "When we no longer need your information, we will securely delete or anonymize it in accordance with our data retention policies."
    ]
  },
  {
    id: "children",
    icon: Shield,
    title: "Children's Privacy",
    content: [
      "Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18.",
      "",
      "If we become aware that we have collected personal information from a child under 18 without parental consent, we will take steps to delete that information promptly.",
      "",
      "If you believe we might have any information from or about a child under 18, please contact us immediately."
    ]
  },
  {
    id: "changes",
    icon: FileText,
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.",
      "",
      "We will notify you of any material changes by:",
      "• Posting the updated policy on this page",
      "• Updating the 'Last Updated' date at the top of this policy",
      "• Sending an email notification for significant changes",
      "",
      "We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information."
    ]
  }
];

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="bg-[#0a0a0a] relative w-full max-w-[100vw] overflow-x-hidden selection:bg-[#C5A059]/30">
      {/* Hero Section */}
      <section className="bg-[#0a0a0a] text-white min-h-[50vh] flex flex-col justify-center pt-24 pb-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10 max-w-4xl">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-xs uppercase tracking-[0.3em] group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back Home
          </button>

          <div className="inline-flex items-center gap-2 bg-[#C5A059]/20 text-[#C5A059] px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] border border-[#C5A059]/30 mb-8">
            <FileText size={14} /> Legal
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-medium leading-[1.1] mb-6">
            Privacy <span className="text-[#C5A059]">Policy</span>
          </h1>

          <p className="text-lg text-gray-400 font-light">
            Last Updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#18181b]">
        <RevealSection className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {POLICY_SECTIONS.map((section, i) => (
              <RevealSection key={section.id} delay={i * 100} className="scroll-mt-24" id={section.id}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-lg flex items-center justify-center text-[#C5A059] shrink-0">
                    <section.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif text-white pt-2">{section.title}</h2>
                </div>
                <div className="pl-16 space-y-4">
                  {section.content.map((paragraph, j) => (
                    <p key={j} className={`text-gray-400 leading-relaxed font-light ${paragraph.startsWith('•') ? 'ml-4' : ''}`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </RevealSection>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] border-y border-white/5">
        <RevealSection className="max-w-4xl mx-auto">
          <div className="p-10 md:p-16 bg-gradient-to-br from-[#18181b] to-[#0a0a0a] rounded-2xl border border-[#C5A059]/20 text-center">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">Questions About Our Privacy Policy?</h2>
            <p className="text-gray-400 font-light mb-8 max-w-xl mx-auto">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Privacy Team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:privacy@creativesolutionspartners.com?subject=Privacy%20Policy%20Inquiry"
                className="inline-flex items-center justify-center gap-2 bg-[#C5A059] text-[#0a0a0a] px-8 py-4 font-bold hover:bg-[#d4af37] transition-all duration-500 uppercase tracking-widest text-xs rounded-sm"
              >
                Contact Privacy Team
              </a>
              <button
                onClick={() => onNavigate('trust')}
                className="inline-flex items-center justify-center gap-2 border border-[#C5A059]/50 text-[#C5A059] px-8 py-4 font-bold hover:bg-[#C5A059]/10 transition-all duration-500 uppercase tracking-widest text-xs rounded-sm"
              >
                Visit Trust Center <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Creative Solutions Partners. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('trust')} className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
              Trust Center
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
