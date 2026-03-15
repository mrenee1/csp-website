import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Globe, Palette, BarChart2, Share2, Smartphone, Search, Check, ChevronRight } from 'lucide-react';
import { PageName } from '../types';

interface BizBoostPageProps {
  onBack: () => void;
  onNavigate: (page: PageName) => void;
}

const RevealSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
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
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const SERVICES = [
  {
    icon: Globe,
    title: 'Web Design & Development',
    desc: 'Custom websites built to convert — fast, responsive, and designed around your brand identity and business goals.',
    color: '#c9a84c',
  },
  {
    icon: Palette,
    title: 'Brand Identity',
    desc: 'Logos, color systems, typography, and brand guidelines that make your business instantly recognizable.',
    color: '#c9a84c',
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    desc: 'Strategy, content creation, and scheduling across platforms to grow your audience and drive engagement.',
    color: '#c9a84c',
  },
  {
    icon: Search,
    title: 'SEO & Content Strategy',
    desc: 'Search optimization and content systems that bring qualified traffic to your site month over month.',
    color: '#c9a84c',
  },
  {
    icon: Smartphone,
    title: 'Digital Advertising',
    desc: 'Targeted paid campaigns across Google, Meta, and more — designed for measurable ROI.',
    color: '#c9a84c',
  },
  {
    icon: BarChart2,
    title: 'Analytics & Reporting',
    desc: 'Clear dashboards and monthly reporting so you always know what's working and where to invest next.',
    color: '#c9a84c',
  },
];

const PROCESS = [
  { step: '01', title: 'Discovery', desc: 'We start with a deep-dive into your brand, goals, and competitive landscape.' },
  { step: '02', title: 'Strategy', desc: 'A tailored digital roadmap built around your growth objectives and budget.' },
  { step: '03', title: 'Build', desc: 'Design and development executed with precision, speed, and your approval at every milestone.' },
  { step: '04', title: 'Launch & Grow', desc: 'Go live with confidence — ongoing support, analytics, and optimization baked in.' },
];

// Simple sparkle particle component
const Sparkles: React.FC = () => {
  const particles = [
    { top: '12%', left: '8%', size: 3, opacity: 0.6, delay: 0 },
    { top: '22%', left: '92%', size: 2, opacity: 0.4, delay: 0.5 },
    { top: '8%', left: '55%', size: 4, opacity: 0.5, delay: 1 },
    { top: '35%', left: '18%', size: 2, opacity: 0.3, delay: 1.5 },
    { top: '45%', left: '85%', size: 3, opacity: 0.5, delay: 0.8 },
    { top: '60%', left: '5%', size: 2, opacity: 0.4, delay: 2 },
    { top: '70%', left: '72%', size: 4, opacity: 0.35, delay: 0.3 },
    { top: '80%', left: '30%', size: 2, opacity: 0.4, delay: 1.2 },
    { top: '15%', left: '40%', size: 3, opacity: 0.3, delay: 0.7 },
    { top: '55%', left: '48%', size: 2, opacity: 0.25, delay: 1.8 },
    { top: '90%', left: '60%', size: 3, opacity: 0.45, delay: 0.4 },
    { top: '28%', left: '64%', size: 2, opacity: 0.35, delay: 2.2 },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: '#c9a84c',
            opacity: p.opacity,
            animation: `sparkleFloat 3s ease-in-out ${p.delay}s infinite alternate`,
            boxShadow: `0 0 ${p.size * 3}px rgba(201,168,76,0.8)`,
          }}
        />
      ))}
      <style>{`
        @keyframes sparkleFloat {
          0% { opacity: var(--op, 0.4); transform: scale(1) translateY(0); }
          100% { opacity: calc(var(--op, 0.4) * 1.8); transform: scale(1.4) translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

export const BizBoostPage: React.FC<BizBoostPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div style={{ background: '#05091a', color: '#e8e4dc', fontFamily: "'Barlow', sans-serif", minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 40%, #0d1535 0%, #05091a 65%)',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)',
        }} />

        <Sparkles />

        {/* Back button */}
        <button
          onClick={() => onNavigate('tech')}
          style={{
            position: 'absolute', top: 28, left: 32,
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(232,228,220,0.5)', fontSize: 12,
            fontFamily: "'DM Mono', monospace", letterSpacing: '0.1em',
            textTransform: 'uppercase', transition: 'color 0.2s',
            padding: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,228,220,0.5)')}
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* Eyebrow */}
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#c9a84c',
          marginBottom: 32,
          opacity: 0,
          animation: 'fadeUp 0.8s ease 0.2s forwards',
        }}>
          Creative Solutions Partners
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
          fontSize: 'clamp(64px, 10vw, 120px)',
          fontWeight: 400,
          lineHeight: 1,
          color: '#d4b96a',
          letterSpacing: '0.02em',
          marginBottom: 24,
          opacity: 0,
          animation: 'fadeUp 0.9s ease 0.4s forwards',
          textShadow: '0 0 80px rgba(201,168,76,0.25)',
        }}>
          Creative Web
        </h1>

        {/* Gold divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 32,
          opacity: 0,
          animation: 'fadeUp 0.7s ease 0.6s forwards',
        }}>
          <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, transparent, #c9a84c)' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a84c', boxShadow: '0 0 12px rgba(201,168,76,0.8)' }} />
          <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, #c9a84c, transparent)' }} />
        </div>

        {/* Tagline */}
        <p style={{
          fontSize: 'clamp(22px, 3.5vw, 36px)',
          fontWeight: 300,
          color: '#e8e4dc',
          letterSpacing: '0.01em',
          marginBottom: 24,
          opacity: 0,
          animation: 'fadeUp 0.8s ease 0.75s forwards',
        }}>
          Digital Presence. Built to Perform.
        </p>

        {/* Description */}
        <p style={{
          maxWidth: 540,
          fontSize: 17,
          fontWeight: 300,
          lineHeight: 1.8,
          color: 'rgba(232,228,220,0.6)',
          marginBottom: 48,
          opacity: 0,
          animation: 'fadeUp 0.8s ease 0.9s forwards',
        }}>
          Web design, branding, content, and digital systems for modern business growth.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          justifyContent: 'center',
          opacity: 0,
          animation: 'fadeUp 0.8s ease 1.05s forwards',
        }}>
          <a
            href="mailto:michelle@creativesolutionspartners.com?subject=Creative%20Web%20Consultation"
            style={{
              padding: '16px 40px',
              background: '#c9a84c',
              color: '#05091a',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 17,
              letterSpacing: '0.12em',
              textDecoration: 'none',
              borderRadius: 2,
              transition: 'all 0.25s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e8c96a'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(201,168,76,0.35)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#c9a84c'; (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
          >
            Start Your Project
          </a>
          <button
            onClick={() => {
              const el = document.getElementById('bba-services');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              padding: '16px 40px',
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.4)',
              color: '#c9a84c',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 17,
              letterSpacing: '0.12em',
              borderRadius: 2,
              transition: 'all 0.25s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = '#c9a84c'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; }}
          >
            Explore Services
          </button>
        </div>

        {/* Powered by */}
        <div style={{
          position: 'absolute',
          bottom: 36,
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.6)',
          opacity: 0,
          animation: 'fadeUp 0.7s ease 1.2s forwards',
        }}>
          Powered by Biz Boost Agency
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* ── Services ── */}
      <section id="bba-services" style={{ padding: '100px 56px', background: '#08091a', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)',
        }} />
        <RevealSection style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 72px' }}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.25em',
            color: '#c9a84c', textTransform: 'uppercase', marginBottom: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <span style={{ display: 'block', width: 28, height: 1, background: 'rgba(201,168,76,0.5)' }} />
            What We Build
            <span style={{ display: 'block', width: 28, height: 1, background: 'rgba(201,168,76,0.5)' }} />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 4vw, 56px)',
            fontWeight: 300, lineHeight: 1.15, color: '#e8e4dc', margin: 0,
          }}>
            Everything your brand <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>needs to dominate</em>
          </h2>
        </RevealSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 2,
          maxWidth: 1100,
          margin: '0 auto',
        }}>
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <RevealSection key={svc.title} delay={i * 80}>
                <div
                  style={{
                    background: '#0d1020',
                    border: '1px solid transparent',
                    padding: '36px 32px',
                    transition: 'all 0.3s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.25)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                    (e.currentTarget as HTMLElement).style.transform = '';
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
                    transform: 'scaleX(0)', transition: 'transform 0.4s',
                  }} className="svc-top-line" />
                  <div style={{
                    width: 48, height: 48,
                    border: '1px solid rgba(201,168,76,0.3)',
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20,
                    background: 'rgba(201,168,76,0.06)',
                  }}>
                    <Icon size={22} color="#c9a84c" />
                  </div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22, fontWeight: 600, color: '#e8e4dc', marginBottom: 10,
                  }}>{svc.title}</h3>
                  <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.75, color: '#8892b0' }}>
                    {svc.desc}
                  </p>
                </div>
              </RevealSection>
            );
          })}
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ padding: '100px 56px', background: '#05091a', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)',
        }} />
        <RevealSection style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 72px' }}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.25em',
            color: '#c9a84c', textTransform: 'uppercase', marginBottom: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <span style={{ display: 'block', width: 28, height: 1, background: 'rgba(201,168,76,0.5)' }} />
            How It Works
            <span style={{ display: 'block', width: 28, height: 1, background: 'rgba(201,168,76,0.5)' }} />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: 300, lineHeight: 1.15, color: '#e8e4dc', margin: 0,
          }}>
            From strategy to <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>launch</em>
          </h2>
        </RevealSection>

        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {PROCESS.map((step, i) => (
            <RevealSection key={step.step} delay={i * 100}>
              <div style={{
                background: '#0d1020',
                border: '1px solid rgba(201,168,76,0.12)',
                borderRadius: 4,
                padding: '32px 24px',
                textAlign: 'center',
                position: 'relative',
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 56,
                  color: 'rgba(201,168,76,0.15)',
                  lineHeight: 1,
                  marginBottom: 8,
                  position: 'absolute',
                  top: 12,
                  right: 16,
                }}>
                  {step.step}
                </div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 22,
                  letterSpacing: '0.06em',
                  color: '#c9a84c',
                  marginBottom: 10,
                  position: 'relative',
                }}>
                  {step.title}
                </div>
                <p style={{ fontSize: 13, color: '#8892b0', lineHeight: 1.7, fontWeight: 300, position: 'relative' }}>
                  {step.desc}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '100px 56px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #08091a 0%, #0d1535 50%, #08091a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
        }} />
        <RevealSection>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.25em',
            color: 'rgba(201,168,76,0.7)', textTransform: 'uppercase', marginBottom: 24,
          }}>
            Biz Boost Agency
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: '#e8e4dc',
            marginBottom: 20,
            position: 'relative',
          }}>
            Ready to <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>build</em>,<br />
            brand, and <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>dominate</em>?
          </h2>
          <p style={{
            maxWidth: 480,
            margin: '0 auto 48px',
            fontSize: 17,
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(232,228,220,0.6)',
            position: 'relative',
          }}>
            Let's talk about your digital presence. One conversation could change the trajectory of your business.
          </p>
          <a
            href="mailto:michelle@creativesolutionspartners.com?subject=Creative%20Web%20Project%20Inquiry"
            style={{
              display: 'inline-block',
              padding: '18px 52px',
              background: '#c9a84c',
              color: '#05091a',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 19,
              letterSpacing: '0.14em',
              textDecoration: 'none',
              borderRadius: 2,
              transition: 'all 0.25s',
              position: 'relative',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e8c96a'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(201,168,76,0.35)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#c9a84c'; (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
          >
            Get a Free Consultation
          </a>
        </RevealSection>
      </section>

      {/* ── Footer bar ── */}
      <div style={{
        borderTop: '1px solid rgba(201,168,76,0.12)',
        padding: '24px 56px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#05091a',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.2em', color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase' }}>
          Powered by Biz Boost Agency
        </span>
        <button
          onClick={() => onNavigate('home')}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(232,228,220,0.4)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,228,220,0.4)')}
        >
          ← Back to CSP
        </button>
      </div>
    </div>
  );
};
