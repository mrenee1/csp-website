import React, { useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { PageName } from '../types';

interface OurSolutionsPageProps {
  onBack: () => void;
  onNavigate: (page: PageName) => void;
}

const PARTNER_CARDS = [
  {
    step: '01',
    title: 'Refer & Earn',
    description: 'Introduce clients to solutions that help them save money, grow revenue, and improve operations.',
    tags: ['Client Introductions', 'Revenue Opportunity', 'Trusted Solutions'],
  },
  {
    step: '02',
    title: 'Sales Enablement',
    description: 'Access resources, positioning, tools, and support to help you start conversations with confidence.',
    tags: ['Training', 'Tools', 'Partner Support'],
  },
  {
    step: '03',
    title: 'Expand Your Value',
    description: 'Offer more ways to help your clients through one partnership — without building every solution yourself.',
    tags: ['Multi-Solution', 'Client Retention', 'Strategic Growth'],
  },
];

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = '', glowColor = 'rgba(201,168,76,0.07)' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const layer = layerRef.current;
    if (!card || !layer) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    layer.style.background = `radial-gradient(420px circle at ${x}px ${y}px, ${glowColor}, transparent 65%)`;
    layer.style.opacity = '1';
  }, [glowColor]);

  const handleLeave = useCallback(() => {
    if (layerRef.current) layerRef.current.style.opacity = '0';
  }, []);

  return (
    <div
      ref={cardRef}
      className={`partner-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div ref={layerRef} className="partner-card-glow" />
      {children}
    </div>
  );
};

export const OurSolutionsPage: React.FC<OurSolutionsPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="hp-wrap">
      {/* ═══ SECTION 1: WHY PARTNER ═══ */}
      <section className="partner-section">
        <div className="partner-ambient">
          <div className="partner-ray partner-ray-1" />
          <div className="partner-ray partner-ray-2" />
        </div>

        <div className="partner-intro">
          <div className="section-tag">Why Partner With CSP</div>
          <h2 className="partner-headline">
            One partnership.<br /><em>Multiple ways to grow.</em>
          </h2>
          <p className="partner-subheadline">
            Give your clients access to health, wealth, and business solutions — while creating new revenue opportunities and deeper relationships.
          </p>
        </div>

        <div className="partner-grid">
          {PARTNER_CARDS.map((card) => (
            <SpotlightCard key={card.step}>
              <div className="partner-card-inner">
                <div className="partner-step">{card.step}</div>
                <h3 className="partner-card-title">{card.title}</h3>
                <p className="partner-card-desc">{card.description}</p>
                <div className="partner-card-tags">
                  {card.tags.map((tag) => (
                    <span key={tag} className="partner-card-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 2: PARTNER LEVELS ═══ */}
      <section className="ptier-section">
        <div className="ptier-intro">
          <div className="section-tag">Partnership Levels</div>
          <h2 className="ptier-headline">
            Built for partners<br /><em>at every level.</em>
          </h2>
          <p className="ptier-subheadline">
            Whether you're referring clients or building alongside us, CSP creates opportunities to grow with intention.
          </p>
        </div>

        <div className="ptier-grid">
          {/* Referral Partner */}
          <SpotlightCard>
            <div className="partner-card-inner">
              <div className="partner-step">Referral Partner</div>
              <h3 className="partner-card-title" style={{ fontSize: 36 }}>Refer &amp; Earn</h3>
              <p className="partner-card-desc" style={{ fontSize: 15 }}>
                Introduce clients to solutions that make them money, save them money, or improve how they operate — and earn when they move forward.
              </p>
              <div className="partner-card-tags">
                <span className="partner-card-tag">Flexible</span>
                <span className="partner-card-tag">Revenue Opportunity</span>
                <span className="partner-card-tag">No Operational Overhead</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Strategic Partner */}
          <SpotlightCard className="ptier-elevated" glowColor="rgba(201,168,76,0.10)">
            <div className="partner-card-inner">
              <div className="ptier-label">By Alignment</div>
              <div className="partner-step">Strategic Partner</div>
              <h3 className="partner-card-title" style={{ fontSize: 36 }}>Build Alongside Us</h3>
              <p className="partner-card-desc" style={{ fontSize: 15 }}>
                Work alongside CSP to deliver aligned solutions that meet our standard for impact, integrity, and long-term value. These partnerships are selective and built around companies and individuals who elevate the entire ecosystem.
              </p>
              <div className="partner-card-tags">
                <span className="partner-card-tag">Vetted Alignment</span>
                <span className="partner-card-tag">Premium Collaboration</span>
                <span className="partner-card-tag">Long-Term Growth</span>
              </div>
            </div>
          </SpotlightCard>
        </div>

        <div className="partner-ctas" style={{ marginTop: 56 }}>
          <button className="btn-gold" onClick={() => onNavigate('partner-application')}>
            Apply to Become a Partner <ArrowRight size={14} style={{ marginLeft: 8 }} />
          </button>
          <button className="btn-ghost" onClick={() => onNavigate('solutions')}>
            Explore Our Solutions
          </button>
        </div>
      </section>
    </div>
  );
};
