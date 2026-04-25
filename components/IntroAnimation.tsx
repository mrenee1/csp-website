import React, { useRef, useEffect, useState, useCallback } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const TOTAL = 220;
    const particles = Array.from({ length: TOTAL }, () => {
      const isGold = Math.random() > 0.28;
      const isBig = Math.random() > 0.75;
      return {
        x: rand(0, W),
        y: rand(-H * 0.3, 0),
        vx: rand(-0.3, 0.3),
        vy: rand(0.4, 1.8),
        size: isBig ? rand(2.5, 4.5) : rand(0.8, 2.2),
        opacity: rand(0.3, 1),
        twinkleSpeed: rand(0.008, 0.025),
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
        isBig,
        hue: isGold ? rand(38, 52) : rand(260, 290),
        sat: isGold ? rand(70, 95) : rand(20, 50),
        lit: isGold ? rand(55, 80) : rand(75, 95),
      };
    });

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t++;

      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.opacity += p.twinkleSpeed * p.twinkleDir;
        if (p.opacity >= 1) { p.opacity = 1; p.twinkleDir = -1; }
        if (p.opacity <= 0.1) { p.opacity = 0.1; p.twinkleDir = 1; }
        if (p.y > H + 10) { p.y = rand(-80, 0); p.x = rand(0, W); }

        const color = `hsla(${p.hue},${p.sat}%,${p.lit}%,${p.opacity})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (p.isBig) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},${p.sat}%,${p.lit}%,${p.opacity * 0.15})`;
          ctx.fill();
        }

        if (p.size > 3.5) {
          const len = p.size * 3;
          ctx.strokeStyle = `hsla(${p.hue},${p.sat}%,${p.lit}%,${p.opacity * 0.5})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x - len, p.y); ctx.lineTo(p.x + len, p.y);
          ctx.moveTo(p.x, p.y - len); ctx.lineTo(p.x, p.y + len);
          ctx.stroke();
        }
      });

      if (t < 500) animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => { window.removeEventListener('resize', handleResize); };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();

    const t1 = setTimeout(() => setLogoVisible(true), 900);
    const t2 = setTimeout(() => setFadeOut(true), 4000);
    const t3 = setTimeout(() => {
      cancelAnimationFrame(animFrameRef.current);
      onComplete();
    }, 5200);

    return () => {
      cleanup?.();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initCanvas, onComplete]);

  return (
    <div className={`intro-overlay ${fadeOut ? 'intro-fade-out' : ''}`}>
      <canvas ref={canvasRef} className="intro-canvas" />
      <div className={`intro-logo-wrap ${logoVisible ? 'intro-logo-visible' : ''}`}>
        <div className="intro-pulse-ring" />
        <div className="intro-pulse-ring-2" />
        <img
          className="intro-logo-img"
          src="/assets/csp-logo.svg"
          alt="Creative Solutions Partners CSP logo"
        />
      </div>
    </div>
  );
};
