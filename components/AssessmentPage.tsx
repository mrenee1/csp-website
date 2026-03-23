import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageName } from '../types';
import { LeadCaptureForm } from './LeadCaptureForm';

interface AssessmentPageProps {
  onBack: () => void;
  onNavigate: (page: PageName) => void;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <button
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 32, fontSize: 14 }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 'clamp(24px, 4vw, 48px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--purple), var(--gold))' }} />
          <LeadCaptureForm variant="full" onNavigate={onNavigate} />
        </div>

        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, color: 'var(--gold)' }}>1</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--muted)', marginTop: 4 }}>Submit Your Info</div>
          </div>
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, color: 'var(--gold)' }}>2</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--muted)', marginTop: 4 }}>Advisor Reviews</div>
          </div>
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, color: 'var(--gold)' }}>3</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--muted)', marginTop: 4 }}>Get Your Assessment</div>
          </div>
        </div>
      </div>
    </div>
  );
};
