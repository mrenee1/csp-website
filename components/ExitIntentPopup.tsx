import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { PageName } from '../types';
import { LeadCaptureForm } from './LeadCaptureForm';

interface ExitIntentPopupProps {
  onNavigate: (page: PageName) => void;
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ onNavigate }) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !dismissed) {
      setVisible(true);
    }
  }, [dismissed]);

  useEffect(() => {
    const stored = sessionStorage.getItem('csp-exit-dismissed');
    if (stored) {
      setDismissed(true);
      return;
    }

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem('csp-exit-dismissed', '1');
    document.removeEventListener('mouseleave', handleMouseLeave);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(8,9,26,0.85)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20
      }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div
        style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 8, maxWidth: 520, width: '100%',
          padding: 'clamp(24px, 4vw, 40px)', position: 'relative',
          animation: 'fadeUp 0.3s ease'
        }}
      >
        <button
          onClick={dismiss}
          aria-label="Close popup"
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none', color: 'var(--muted)',
            cursor: 'pointer', padding: 4
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--gold)', marginBottom: 12 }}>
            Before you go
          </p>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: 'var(--text)', marginBottom: 8 }}>
            Get a free business assessment
          </h3>
          <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.6 }}>
            Find out where your business is leaving money on the table. Takes 30 seconds.
          </p>
        </div>

        <LeadCaptureForm variant="compact" onNavigate={onNavigate} />
      </div>
    </div>
  );
};
