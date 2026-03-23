import React, { useRef, useState, useEffect, useCallback } from 'react';

/* ─── Spotlight Card ────────────────────────────────────────────────
   Adapted from ReactBits SpotlightCard (MIT).
   Tracks cursor position and renders a radial gradient glow. ───── */

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(201, 168, 76, 0.08)',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={`promise-spotlight ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <div
        className="promise-spotlight-layer"
        style={{
          opacity,
          background: `radial-gradient(680px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
};

/* ─── Split Text (scroll-triggered word reveal) ─────────────────── */

interface SplitWordsProps {
  text: string;
  className?: string;
  delay?: number;
}

const SplitWords: React.FC<SplitWordsProps> = ({ text, className = '', delay = 60 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3, rootMargin: '-40px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <span ref={ref} className={`split-words-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="split-word-outer">
          <span
            className={`split-word-inner ${visible ? 'split-visible' : ''}`}
            style={{ transitionDelay: `${i * delay}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

/* ─── Main Promise Section ──────────────────────────────────────── */

export const CSPPromiseSection: React.FC = () => {
  return (
    <section className="promise-section-v2">
      {/* Ambient glow layers */}
      <div className="promise-ambient">
        <div className="promise-ray promise-ray-1" />
        <div className="promise-ray promise-ray-2" />
      </div>

      <SpotlightCard>
        <div className="promise-inner">
          <div className="promise-eyebrow-v2">The CSP Promise</div>

          <p className="promise-body-v2">
            We partner with growing businesses to{' '}
            <SplitWords
              text="make you money, save you money, and run more efficiently."
              className="promise-highlight"
              delay={70}
            />
          </p>

          <div className="promise-divider" />

          <p className="promise-kicker-v2">
            If we can't do at least one of those three things for you —
            we won't ask for your time.
          </p>
        </div>
      </SpotlightCard>
    </section>
  );
};
