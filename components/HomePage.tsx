import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageName } from '../types';
import { PLATFORM_PILLARS } from '../constants';

interface HomePageProps {
  onNavigate: (page: PageName) => void;
}

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: string }> = ({ children, className = '', delay }) => {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${delay || ''} ${className}`}>{children}</div>;
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  /* ── ROI Calculator State ── */
  const [roiRev, setRoiRev] = useState(75000);
  const [roiEmp, setRoiEmp] = useState(8);
  const [roiReps, setRoiReps] = useState(4);
  const [roiHrs, setRoiHrs] = useState(15);

  const roiMonthly = Math.round(roiRev * 0.14 + roiReps * 1200 + roiEmp * 150);
  const roiTimeVal = Math.round(roiHrs * 52 * 45);
  const roiPayback = Math.min(Math.max(1, Math.round(4800 / Math.max(roiMonthly, 1) * 4)), 12);

  const fmt = (n: number) => n > 999 ? Math.round(n / 1000) + 'k' : String(n);

  return (
    <div className="hp-wrap">
      {/* ════════ HERO ════════ */}
      <section className="hero-new">
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <svg className="torch-icon" viewBox="0 0 120 280" fill="none"><ellipse cx="60" cy="100" rx="40" ry="60" fill="rgba(123,63,160,0.6)"/><ellipse cx="60" cy="80" rx="28" ry="44" fill="rgba(201,168,76,0.5)"/><ellipse cx="60" cy="65" rx="16" ry="28" fill="rgba(245,240,232,0.4)"/><rect x="48" y="155" width="24" height="90" rx="4" fill="rgba(201,168,76,0.4)"/><rect x="44" y="148" width="32" height="16" rx="2" fill="rgba(201,168,76,0.5)"/><rect x="40" y="220" width="40" height="8" rx="2" fill="rgba(201,168,76,0.3)"/></svg>
        <div className="hero-eyebrow">Creative Solutions Partners</div>
        <h1 className="hero-title">
          <span className="ht-1">Grow.</span>
          <span className="ht-2">Expand.</span>
          <span className="ht-3">Simplify.</span>
        </h1>
        <div className="hero-tagline">"Our goal is to grow. Our product is partnership."</div>
        <div className="hero-btns">
          <button className="btn-gold" onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}>Find Your Solution</button>
          <button className="btn-ghost" onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}>Explore Our Solutions</button>
        </div>
      </section>

      {/* ════════ PROMISE ════════ */}
      <section className="promise-section">
        <div className="promise-eyebrow">The CSP Promise</div>
        <p className="promise-body">
          We partner with growing businesses to <strong>make you money</strong>, <strong>save you money</strong>, and <strong>run more efficiently</strong>.
        </p>
        <p className="promise-kicker">
          If we can't do at least one of those three things for you — we won't ask for your time.
        </p>
      </section>

      {/* ════════ CHAOS SECTION ════════ */}
      <section className="chaos">
        <div className="chaos-header">
          <Reveal>
            <div className="section-tag">The Reality</div>
            <h2 className="chaos-title">Starting &amp; running a business<br/>has never been more <em>overwhelming.</em></h2>
            <p className="chaos-body">Every day there's a new tool, a new platform, a new promotion promising to fix everything. You're bombarded with options — and no clear way to know if any of them will actually work for YOUR business.</p>
          </Reveal>
        </div>
        <Reveal className="reveal-d1">
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
            <iframe 
              src="https://share.descript.com/embed/YW6oMeyhLgD" 
              width="640" 
              height="360" 
              frameBorder="0" 
              allowFullScreen
              style={{ maxWidth: '100%', borderRadius: '12px' }}
            ></iframe>
          </div>
        </Reveal>
        <Reveal className="reveal-d2">
          <div className="chaos-costs">
            <div className="cost-card"><div className="cost-icon">⏱️</div><div className="cost-label">25%+</div><div className="cost-title">Of your time lost to bad tools</div><div className="cost-desc">Manual processes and wrong-fit software steal hours from every week — hours you can never get back.</div></div>
            <div className="cost-card"><div className="cost-icon">💸</div><div className="cost-label">$291</div><div className="cost-title">Average cost per payroll error</div><div className="cost-desc">Every mistake in commissions or payroll doesn't just cost money — it erodes your team's trust in you.</div></div>
            <div className="cost-card"><div className="cost-icon">🔄</div><div className="cost-label">3–6mo</div><div className="cost-title">Average onboarding disruption</div><div className="cost-desc">Every new vendor means re-training, re-configuring, and re-explaining — time no business owner has.</div></div>
          </div>
        </Reveal>
      </section>

      {/* ════════ ANSWER BRIDGE ════════ */}
      <Reveal>
        <div className="answer-bridge">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
            <img 
              src="/images/partnership-handshake.jpg" 
              alt="Partnership" 
              style={{ width: '100%', maxWidth: 600, height: 300, objectFit: 'cover', borderRadius: 12, opacity: 0.9 }}
            />
          </div>
          <h2>What would it be like if you already knew<br/><strong>it would work the first time?</strong></h2>
          <p>That's not a sales pitch. That's the standard we hold ourselves to. We don't recommend tools we haven't vetted. We don't send you a list of vendors. We send <em>our people</em> — expert solution advisors who solve problems alongside you in the field.</p>
          <div className="product-stmt">OUR GOAL IS TO GROW. OUR PRODUCT IS PARTNERSHIP.</div>
        </div>
      </Reveal>

      {/* ════════ THE CSP PLATFORM ════════ */}
      <section id="solutions" className="pillars">
        <div className="pillars-intro">
          <Reveal>
            <h2>OUR PLATFORM</h2>
            <p style={{ fontSize: 20, color: 'var(--gold)', fontWeight: 500, letterSpacing: '0.05em', marginTop: 8 }}>Three Pillars. Five Powerful Solutions.</p>
            <p style={{ fontSize: 16, color: 'var(--mid)', fontWeight: 300, lineHeight: 1.75, marginTop: 12, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>Creative Solutions Partners provides modern business solutions across three core pillars: Health, Wealth, and Technology.</p>
          </Reveal>
        </div>
        {PLATFORM_PILLARS.map((pillar, pIdx) => (
          <div key={pillar.id} style={{ marginBottom: 48 }}>
            <Reveal className={pIdx === 1 ? 'reveal-d1' : pIdx === 2 ? 'reveal-d2' : ''}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingLeft: 4 }}>
                <div style={{ width: 4, height: 28, borderRadius: 2, background: pillar.color }} />
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 500, color: 'var(--text)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{pillar.label}</h3>
              </div>
            </Reveal>
            <div className="pillars-grid" style={{ gridTemplateColumns: pillar.solutions.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))' }}>
              {pillar.solutions.map((sol, sIdx) => {
                const delayClass = sIdx === 0 ? `reveal-d${pIdx + 1}` : `reveal-d${pIdx + sIdx + 1}`;
                const pillarClass = pillar.id === 'health' ? 'p-health' : pillar.id === 'wealth' ? 'p-ops' : 'p-brand';
                return (
                  <Reveal key={sol.id} className={delayClass}>
                    <div className={`pillar ${pillarClass}`}>
                      <div className="pillar-glow" style={{ background: pillar.color }} />
                      <div className="p-header">
                        <div className="p-icon-box">{sol.icon}</div>
                        <div className="p-title">{sol.name}</div>
                      </div>
                      <div className="p-desc">{sol.description}</div>
                      <div className="p-tags">
                        {sol.tags.map((tag) => (
                          <span className="p-tag" key={tag}>{tag}</span>
                        ))}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.03em', marginTop: 8, marginBottom: 8 }}>{sol.commission}</div>
                      <button className="p-link" onClick={() => onNavigate(sol.id as PageName)}>Explore {sol.name} &rarr;</button>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* ════════ IN THE FIELD ════════ */}
      <section className="field">
        <div className="field-inner">
          <div className="field-copy">
            <Reveal>
              <div className="section-tag" style={{ justifyContent: 'flex-start' }}>In The Field</div>
              <h2>We don't just find solutions.<br/><em>We solve them with you.</em></h2>
              <p>Most companies hand you a recommendation and wish you luck. That's not our model. CSP puts expert solution advisors alongside business owners — in their operations, understanding their specific context, and staying until the problem is actually solved.</p>
              <blockquote>"Our product is partnership. That means we show up."</blockquote>
            </Reveal>
          </div>
          <Reveal className="reveal-d2">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <img 
                src="/images/connection.jpg" 
                alt="Human Connection" 
                style={{ width: '100%', maxWidth: 500, height: 250, objectFit: 'cover', borderRadius: 12, opacity: 0.9 }}
              />
              <div className="field-stats">
                <div className="fs-card"><span className="fs-num">1</span><span className="fs-label">Point of contact for every service in your business</span></div>
                <div className="fs-card"><span className="fs-num">∞</span><span className="fs-label">Growing ecosystem — new solutions added monthly</span></div>
                <div className="fs-card"><span className="fs-num">0</span><span className="fs-label">Vendors to manage on your own</span></div>
                <div className="fs-card"><span className="fs-num">3</span><span className="fs-label">Core pillars: Health, Wealth, Technology</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ ROI BAND ════════ */}
      <div className="roi-band">
        <div className="roi-inner">
          <div className="roi-copy">
            <Reveal>
              <div className="section-tag" style={{ justifyContent: 'flex-start' }}>Live ROI</div>
              <div style={{ marginBottom: 24 }}>
                <img 
                  src="/images/data-analytics.jpg" 
                  alt="Data Analytics" 
                  style={{ width: '100%', maxWidth: 450, height: 220, objectFit: 'cover', borderRadius: 12, opacity: 0.9 }}
                />
              </div>
              <h2>See your numbers<br/>move <em>in real time.</em></h2>
              <p>Every day you delay a solution is a day it costs you. Adjust the inputs and watch what partnership with CSP would mean for your business — today, this month, this year.</p>
            </Reveal>
          </div>
          <Reveal className="reveal-d2">
            <div className="roi-display">
              <div className="roi-header">
                <div className="roi-dot" style={{ background: '#ff5f57' }} />
                <div className="roi-dot" style={{ background: '#febc2e' }} />
                <div className="roi-dot" style={{ background: '#28c840' }} />
                <span className="roi-title">CSP Partnership ROI — Live Calculator</span>
              </div>
              <div className="roi-body">
                <div className="roi-inputs">
                  <div className="roi-field"><label>Monthly Revenue ($)</label><input type="number" value={roiRev} onChange={e => setRoiRev(+e.target.value || 0)} /></div>
                  <div className="roi-field"><label>Employees</label><input type="number" value={roiEmp} onChange={e => setRoiEmp(+e.target.value || 0)} /></div>
                  <div className="roi-field"><label>Sales Reps</label><input type="number" value={roiReps} onChange={e => setRoiReps(+e.target.value || 0)} /></div>
                  <div className="roi-field"><label>Hours on Admin / Week</label><input type="number" value={roiHrs} onChange={e => setRoiHrs(+e.target.value || 0)} /></div>
                </div>
                <div className="roi-results">
                  <div><span className="rr-val">+${fmt(roiMonthly)}</span><span className="rr-lbl">Monthly Gain</span></div>
                  <div><span className="rr-val">${fmt(roiTimeVal)}</span><span className="rr-lbl">Annual Time Value</span></div>
                  <div><span className="rr-val">{roiPayback}mo</span><span className="rr-lbl">Payback Period</span></div>
                </div>
                <div className="live-badge"><span className="live-dot" /> Updates as you type</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ════════ FINAL CTA ════════ */}
      <section id="contact" className="final-cta">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <img 
            src="/images/innovation.jpg" 
            alt="Innovation" 
            style={{ width: '100%', maxWidth: 400, height: 220, objectFit: 'cover', borderRadius: 12, opacity: 0.9 }}
          />
        </div>
        <div className="section-tag">THE FIRST STEP</div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, lineHeight: 1.1, marginBottom: 24 }}>
          Let's build<br/>
          something<br/>
          <em style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#c9a227' }}>that lasts.</em>
        </h2>
        <p style={{ maxWidth: 480, margin: '0 auto 32px', color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.6 }}>
          No fluff, no templates. A genuine partnership built around your goals, your business, and your definition of success.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <a 
            href="mailto:michelle@creativesolutionspartners.com" 
            className="btn-gold"
            style={{ 
              backgroundColor: '#c9a227', 
              color: '#0a0a0a', 
              padding: '16px 32px', 
              fontSize: '0.75rem', 
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderRadius: 2,
              border: 'none'
            }}
          >
            Begin the Conversation
          </a>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="hp-footer">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div className="nav-csp" style={{ fontSize: 24 }}>CSP</div>
            <div className="nav-divider" />
            <div className="nav-full"><span>Creative Solutions</span><span>Partners</span></div>
          </div>
          <p>Resolution for your health and wealth. Grow. Expand. Simplify. — No matter your industry.</p>
        </div>
        <div className="footer-col">
          <h4>Solutions</h4>
          <button onClick={() => onNavigate('championhealth')}>Creative Care</button>
          <button onClick={() => onNavigate('clarity')}>Creative Compensation</button>
          <button onClick={() => onNavigate('wealthwave')}>Creative Wealth Education</button>
          <button onClick={() => onNavigate('bizboost')}>Creative Web</button>
          <button onClick={() => onNavigate('creativepayments')}>Creative Payments</button>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <button onClick={() => onNavigate('about')}>About CSP</button>
          <a href="mailto:michelle@creativesolutionspartners.com?subject=Partnership%20Inquiry">Become a Partner</a>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact Us</button>
        </div>
      </footer>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Creative Solutions Partners — All rights reserved</span>
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('trust')} className="text-gray-400 hover:text-white transition-colors">Trust Center</button>
          <span className="text-gray-600">|</span>
          <button onClick={() => onNavigate('privacy')} className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button>
        </div>
      </div>
    </div>
  );
};
