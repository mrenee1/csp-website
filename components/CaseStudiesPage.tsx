import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageName } from '../types';

interface CaseStudiesPageProps {
  onBack: () => void;
  onNavigate: (page: PageName) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <button
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 32, fontSize: 14 }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div className="section-tag">Case Studies</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(36px,4vw,56px)', fontWeight: 300, color: 'var(--text)', marginBottom: 20 }}>
            Real Results from Real Partnerships
          </h1>
          <p style={{ fontSize: 17, color: 'var(--mid)', maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.8 }}>
            {/* TODO: Replace with real client data */}
            Case studies from our partners will be published here soon. In the meantime, get your free business assessment to see how CSP can help your organization.
          </p>
          <button
            className="btn-gold"
            onClick={() => onNavigate('assessment')}
          >
            Get Your Free Assessment
          </button>
        </div>
      </div>
    </div>
  );
};
