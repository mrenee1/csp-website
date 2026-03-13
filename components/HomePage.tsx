import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageName } from '../types';

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

  /* ── Tool Tabs ── */
  const [activeTool, setActiveTool] = useState<'comm' | 'health' | 'brand'>('comm');

  /* ── Commission Calc ── */
  const [cReps, setCReps] = useState(5);
  const [cSales, setCSales] = useState(15000);
  const [cRate, setCRate] = useState(8);
  const [cHrs, setCHrs] = useState(12);
  const cTotal = cReps * cSales * (cRate / 100);
  const cSaved = cHrs * 12 * 45;
  const cAnnual = cTotal * 12;

  /* ── Health Calc ── */
  const [hEmp, setHEmp] = useState(10);
  const [hCost, setHCost] = useState(800);
  const [hAge, setHAge] = useState(0.25);
  const [hTurn, setHTurn] = useState(20);
  const hSave = Math.round(hEmp * hCost * hAge);
  const hAnnual = hSave * 12;
  const hRetain = Math.max(1.2, 2.4 - hTurn / 100).toFixed(1);

  /* ── Brand Checker ── */
  const [brandUrl, setBrandUrl] = useState('');
  const [brandScores, setBrandScores] = useState<null | { presence: number; brand: number; conv: number; social: number }>(null);

  const runBrandCheck = useCallback(() => {
    if (!brandUrl.trim()) return;
    const scores = {
      presence: Math.floor(Math.random() * 35) + 30,
      brand: Math.floor(Math.random() * 40) + 25,
      conv: Math.floor(Math.random() * 35) + 20,
      social: Math.floor(Math.random() * 45) + 20,
    };
    setTimeout(() => setBrandScores(scores), 800);
  }, [brandUrl]);

  const getMsg = (score: number, arr: string[]) => score < 45 ? arr[0] : score < 70 ? arr[1] : arr[2];
  const getGrade = (s: number) => s >= 75 ? 'A' : s >= 60 ? 'B' : s >= 45 ? 'C' : 'D';

  const msgs: Record<string, string[]> = {
    presence: ['Low visibility. Competitors are capturing your traffic.', 'Moderate presence. Significant growth gaps remain.', 'Good foundation, but not fully maximized.'],
    brand: ['Inconsistent branding is costing you credibility daily.', 'Some consistency, but key gaps are hurting conversions.', 'Solid brand presence with room to dominate.'],
    conv: ['Your site is not converting visitors. Revenue is being lost.', 'Moderate conversion setup — missing key trust signals.', 'Good structure, needs optimization to maximize.'],
    social: ["Minimal social presence. You're invisible to a huge audience.", 'Sporadic posting is hurting algorithm reach.', 'Active but not strategically optimized.'],
  };

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
        <p className="hero-sub">
          Running a business today means drowning in options, tools, vendors, and decisions — all pulling you away from the work that actually matters.
          <strong> What if you already knew it would work the first time?</strong>
        </p>
        <div className="hero-tagline">"Our goal is to grow. Our product is partnership."</div>
        <div className="hero-btns">
          <button className="btn-gold" onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}>Find Your Solution</button>
          <button className="btn-ghost" onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}>Try Our Tools Free</button>
        </div>
      </section>

      {/* ════════ TICKER ════════ */}
      <div className="ticker">
        <div className="ticker-track">
          {[...Array(2)].map((_, rep) => (
            <React.Fragment key={rep}>
              {['Champion Health', 'Clarity Commissions', 'Business Booster', 'WealthWave', 'Background Checks', 'Brand & Web Design', 'CC Processing', 'Business Consulting', 'Expert Advisors In The Field'].map((t) => (
                <span className="ticker-item" key={`${rep}-${t}`}>{t} <span className="ticker-sep">✦</span></span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

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
          <div className="overwhelm-cloud">
            <div className="noise-items">
              <div className="ni red" style={{ top: '8%', left: '4%' }}>New CRM Tool</div>
              <div className="ni orange" style={{ top: '5%', left: '28%' }}>Payroll Software</div>
              <div className="ni red" style={{ top: '12%', left: '55%' }}>Another Platform</div>
              <div className="ni dim" style={{ top: '8%', right: '5%' }}>Health Benefits</div>
              <div className="ni orange" style={{ top: '28%', left: '2%' }}>Team Onboarding</div>
              <div className="ni red" style={{ top: '35%', right: '3%' }}>Brand Refresh?</div>
              <div className="ni dim" style={{ top: '22%', left: '72%' }}>Email Hosting</div>
              <div className="ni red" style={{ bottom: '25%', left: '3%' }}>CC Processing</div>
              <div className="ni orange" style={{ bottom: '18%', left: '22%' }}>Which vendor?</div>
              <div className="ni dim" style={{ bottom: '22%', right: '4%' }}>Will it work?</div>
              <div className="ni red" style={{ bottom: '8%', left: '40%' }}>Another Subscription</div>
              <div className="ni orange" style={{ bottom: '12%', right: '18%' }}>Onboarding Again?</div>
              <div className="ni dim" style={{ top: '48%', left: '2%' }}>What's the ROI?</div>
              <div className="ni red" style={{ top: '52%', right: '2%' }}>New AI Tool</div>
            </div>
            <div className="cloud-center">
              <div className="cloud-center-label">You're here trying to run</div>
              <div className="cloud-center-you">YOUR BUSINESS</div>
              <div className="cloud-center-sub">while the noise never stops</div>
            </div>
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
          <h2>What would it be like if you already knew<br/><strong>it would work the first time?</strong></h2>
          <p>That's not a sales pitch. That's the standard we hold ourselves to. We don't recommend tools we haven't vetted. We don't send you a list of vendors. We send <em>our people</em> — expert solution advisors who solve problems alongside you in the field.</p>
          <div className="product-stmt">OUR GOAL IS TO GROW. OUR PRODUCT IS PARTNERSHIP.</div>
        </div>
      </Reveal>

      {/* ════════ PILLARS ════════ */}
      <section id="solutions" className="pillars">
        <div className="pillars-intro">
          <Reveal>
            <h2>BUSINESS SERVICES OVERVIEW</h2>
          </Reveal>
        </div>
        <div className="pillars-grid">
          {/* YOUR PEOPLE */}
          <Reveal className="reveal-d1">
            <div className="pillar p-health">
              <div className="pillar-glow" style={{ background: '#4ade80' }} />
              <div className="p-header">
                <div className="p-icon-box">💚</div>
                <div className="p-title">YOUR PEOPLE</div>
                <div className="p-num">01/04</div>
              </div>
              <div className="p-sub">Champion Health - Champ Plan</div>
              <div className="p-desc">Proactive health management for your team. Comprehensive care that keeps your people healthy and productive.</div>
              <div className="p-tags"><span className="p-tag">Unlimited PCP Visits</span><span className="p-tag">Prescription Benefits</span><span className="p-tag">Employee Wellness</span></div>
              <button className="p-link" onClick={() => onNavigate('championhealth')}>Explore Champion Health →</button>
            </div>
          </Reveal>
          {/* YOUR OPERATIONS */}
          <Reveal className="reveal-d2">
            <div className="pillar p-ops">
              <div className="pillar-glow" style={{ background: 'var(--gold)' }} />
              <div className="p-header">
                <div className="p-icon-box">⚡</div>
                <div className="p-title">YOUR OPERATIONS</div>
                <div className="p-num">02/04</div>
              </div>
              <div className="p-sub">Clarity Commissions - Payroll Precision</div>
              <div className="p-desc">Automated commission processing and dispute resolution. Streamline your payroll operations with precision and clarity.</div>
              <div className="p-tags"><span className="p-tag">Automated Processing</span><span className="p-tag">Dispute Resolution</span><span className="p-tag">Payroll Efficiency</span></div>
              <button className="p-link" onClick={() => onNavigate('clarity')}>Explore Clarity Commissions →</button>
            </div>
          </Reveal>
          {/* YOUR BRAND */}
          <Reveal className="reveal-d3">
            <div className="pillar p-brand">
              <div className="pillar-glow" style={{ background: '#5ba8d4' }} />
              <div className="p-header">
                <div className="p-icon-box">✦</div>
                <div className="p-title">YOUR BRAND</div>
                <div className="p-num">03/04</div>
              </div>
              <div className="p-sub">Business Booster - Web, Design &amp; Growth</div>
              <div className="p-desc">Enhance your digital presence with professional websites, logos, and social media management.</div>
              <div className="p-tags"><span className="p-tag">Web Design</span><span className="p-tag">Logo Creation</span><span className="p-tag">Social Media</span><span className="p-tag">Digital Growth</span></div>
              <button className="p-link" onClick={() => onNavigate('bizboost')}>Explore Business Booster →</button>
            </div>
          </Reveal>
          {/* YOUR ECOSYSTEM */}
          <Reveal className="reveal-d4">
            <div className="pillar p-eco">
              <div className="pillar-glow" style={{ background: '#8ed4b0' }} />
              <div className="p-header">
                <div className="p-icon-box">🤝</div>
                <div className="p-title">YOUR ECOSYSTEM</div>
                <div className="p-num">04/04</div>
              </div>
              <div className="p-sub">The Full CSP Network - Always Expanding</div>
              <div className="p-desc">Comprehensive service suite including background checks, payment processing, and financial education through one point of contact.</div>
              <div className="p-tags"><span className="p-tag">Background Checks</span><span className="p-tag">Payment Processing</span><span className="p-tag">Financial Education</span><span className="p-tag">One Contact</span></div>
              <button className="p-link" onClick={() => document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' })}>Explore CSP Network →</button>
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

      {/* ════════ TOOL DEMOS ════════ */}
      <section id="tools" className="tools">
        <div className="tools-header">
          <Reveal>
            <div className="section-tag">Interactive Tools</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(36px,4vw,56px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 14, color: 'var(--text)' }}>Don't take our word for it.</h2>
            <p style={{ fontSize: 16, color: 'var(--mid)', fontWeight: 300, lineHeight: 1.75 }}>Real calculators. Real results. Try them before you ever talk to us.</p>
          </Reveal>
        </div>
        <Reveal className="reveal-d1">
          <div className="tool-tabs-wrap">
            <div className="tool-tabs">
              <button className={`tool-tab ${activeTool === 'comm' ? 'active' : ''}`} onClick={() => setActiveTool('comm')}>Commission Calc</button>
              <button className={`tool-tab ${activeTool === 'health' ? 'active' : ''}`} onClick={() => setActiveTool('health')}>Health Savings</button>
              <button className={`tool-tab ${activeTool === 'brand' ? 'active' : ''}`} onClick={() => setActiveTool('brand')}>Brand Checker</button>
            </div>

            {/* COMMISSIONS */}
            <div className={`tool-panel ${activeTool === 'comm' ? 'active' : ''}`}>
              <div className="tp-left">
                <h3>What is payroll chaos<br/><em>costing you?</em></h3>
                <p>Every month without automated commission tracking means hours lost, errors made, and team trust eroded. Enter your numbers and see what Clarity Commissions would change.</p>
                <div className="f-group"><label>Number of Sales Reps</label><input type="number" value={cReps} onChange={e => setCReps(+e.target.value || 0)} /></div>
                <div className="f-group"><label>Avg Monthly Sales / Rep ($)</label><input type="number" value={cSales} onChange={e => setCSales(+e.target.value || 0)} /></div>
                <div className="f-group"><label>Commission Rate (%)</label><input type="number" value={cRate} onChange={e => setCRate(+e.target.value || 0)} /></div>
                <div className="f-group"><label>Hours Spent on Payroll / Month</label><input type="number" value={cHrs} onChange={e => setCHrs(+e.target.value || 0)} /></div>
                <button className="tp-cta-link" onClick={() => onNavigate('clarity')}>Get Clarity Commissions →</button>
              </div>
              <div>
                <div className="tp-result">
                  <span className="big">${cTotal > 999 ? fmt(cTotal) : cTotal.toLocaleString()}</span>
                  <span className="lbl">Monthly Commissions to Automate</span>
                  <div className="tp-stats">
                    <div className="tp-stat"><span className="sv">${cSaved.toLocaleString()}</span><span className="sl">Annual Time Saved</span></div>
                    <div className="tp-stat"><span className="sv">94%</span><span className="sl">Error Reduction</span></div>
                    <div className="tp-stat"><span className="sv">${cAnnual > 999 ? fmt(cAnnual) : cAnnual.toLocaleString()}</span><span className="sl">Annual Commissions</span></div>
                    <div className="tp-stat"><span className="sv">≤1mo</span><span className="sl">Onboarding Time</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* HEALTH */}
            <div className={`tool-panel ${activeTool === 'health' ? 'active' : ''}`}>
              <div className="tp-left">
                <h3>How much could you save<br/><em>on benefits?</em></h3>
                <p>The CHAMP Plan typically saves businesses 20–35% compared to traditional coverage. See what it means for your team — and your bottom line.</p>
                <div className="f-group"><label>Number of Employees</label><input type="number" value={hEmp} onChange={e => setHEmp(+e.target.value || 0)} /></div>
                <div className="f-group"><label>Current Monthly Cost / Employee ($)</label><input type="number" value={hCost} onChange={e => setHCost(+e.target.value || 0)} /></div>
                <div className="f-group">
                  <label>Employee Age Range</label>
                  <select value={hAge} onChange={e => setHAge(+e.target.value)}>
                    <option value={0.3}>18–30</option>
                    <option value={0.25}>31–45</option>
                    <option value={0.18}>46–60</option>
                  </select>
                </div>
                <div className="f-group"><label>Annual Turnover Rate (%)</label><input type="number" value={hTurn} onChange={e => setHTurn(+e.target.value || 0)} /></div>
                <button className="tp-cta-link" onClick={() => onNavigate('championhealth')}>Get a Champion Health Quote →</button>
              </div>
              <div>
                <div className="tp-result">
                  <span className="big">${hSave > 999 ? fmt(hSave) : hSave.toLocaleString()}</span>
                  <span className="lbl">Monthly Savings with Champ Plan</span>
                  <div className="tp-stats">
                    <div className="tp-stat"><span className="sv">${hAnnual > 999 ? fmt(hAnnual) : hAnnual.toLocaleString()}</span><span className="sl">Annual Savings</span></div>
                    <div className="tp-stat"><span className="sv">{hRetain}x</span><span className="sl">Retention Boost</span></div>
                    <div className="tp-stat"><span className="sv">$0–$1</span><span className="sl">Rx Copay</span></div>
                    <div className="tp-stat"><span className="sv">100%</span><span className="sl">Preventive Covered</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* BRAND CHECKER */}
            <div className={`brand-panel ${activeTool === 'brand' ? 'active' : ''}`}>
              <div className="brand-checker">
                <h3>Free Brand Health <em>Check</em></h3>
                <p>Most business owners don't know what a weak brand is costing them every day. Enter your website URL and we'll score your brand presence across four critical dimensions — and show you the dollar impact of the gaps.</p>
                <div className="checker-form">
                  <input type="text" placeholder="yourwebsite.com" value={brandUrl} onChange={e => setBrandUrl(e.target.value)} />
                  <button onClick={runBrandCheck}>Check My Brand</button>
                </div>
                <div className={`brand-scores ${brandScores ? 'visible' : ''}`}>
                  {brandScores && (
                    <>
                      {([
                        { key: 'presence', label: 'Online Presence', color: '#5ba8d4' },
                        { key: 'brand', label: 'Brand Consistency', color: 'var(--gold)' },
                        { key: 'conv', label: 'Conversion Readiness', color: 'var(--purple2)' },
                        { key: 'social', label: 'Social Presence', color: '#8ed4b0' },
                      ] as const).map(({ key, label, color }) => {
                        const sc = brandScores[key];
                        return (
                          <div className="score-card" key={key}>
                            <span className="score-label">{label}</span>
                            <div className="score-bar-wrap"><div className="score-bar" style={{ width: `${sc}%`, background: color }} /></div>
                            <span className="score-val" style={{ color }}>{getGrade(sc)} ({sc}%)</span>
                            <p className="score-msg">{getMsg(sc, msgs[key])}</p>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
                {brandScores && (
                  <div className="brand-cost-banner visible">
                    <span>⚠️</span>
                    <span>Based on your scores, your brand gaps are estimated to cost your business <strong>${Math.round((100 - (brandScores.presence + brandScores.brand + brandScores.conv + brandScores.social) / 4) * 40).toLocaleString()}+/month</strong> in lost conversions and missed opportunities. <button onClick={() => onNavigate('bizboost')} style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Let's fix that →</button></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ════════ ECOSYSTEM ════════ */}
      <section id="ecosystem" className="ecosystem">
        <div className="eco-header">
          <Reveal>
            <div className="section-tag">The CSP Network</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(36px,4vw,56px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 14, color: 'var(--text)' }}>
              One partner. <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Every solution.</em>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--mid)', fontWeight: 300, lineHeight: 1.75 }}>Stop managing seven vendors. Access our entire ecosystem through a single trusted relationship — and watch it grow every month.</p>
          </Reveal>
        </div>
        <div className="eco-grid">
          <div className="eco-cell" onClick={() => onNavigate('championhealth')}><Reveal><span className="eco-badge">Health</span><div className="eco-name">Champion Health</div><div className="eco-desc">Employee wellness &amp; Champ Plan benefits</div></Reveal></div>
          <div className="eco-cell" onClick={() => onNavigate('clarity')}><Reveal className="reveal-d1"><span className="eco-badge">Operations</span><div className="eco-name">Clarity Commissions</div><div className="eco-desc">Commission tracking &amp; payroll automation</div></Reveal></div>
          <div className="eco-cell" onClick={() => onNavigate('bizboost')}><Reveal className="reveal-d2"><span className="eco-badge">Brand</span><div className="eco-name">Business Booster</div><div className="eco-desc">Web, apps, logos, branding &amp; social</div></Reveal></div>
          <div className="eco-cell" onClick={() => onNavigate('wealthwave')}><Reveal className="reveal-d3"><span className="eco-badge">Finance</span><div className="eco-name">WealthWave</div><div className="eco-desc">How The Money Works financial program</div><span className="eco-new">Partner</span></Reveal></div>
          <div className="eco-cell" onClick={() => onNavigate('about')}><Reveal className="reveal-d4"><span className="eco-badge">Trust</span><div className="eco-name">Background Checks</div><div className="eco-desc">Fast, compliant screening services</div></Reveal></div>
          <div className="eco-cell" onClick={() => onNavigate('about')}><Reveal><span className="eco-badge">Finance</span><div className="eco-name">CC Processing</div><div className="eco-desc">Competitive credit card processing rates</div></Reveal></div>
          <div className="eco-cell" onClick={() => onNavigate('about')}><Reveal className="reveal-d1"><span className="eco-badge">Infrastructure</span><div className="eco-name">Business Email Hosting</div><div className="eco-desc">Professional email &amp; domain solutions</div></Reveal></div>
          <div className="eco-cell" onClick={() => onNavigate('about')}><Reveal className="reveal-d2"><span className="eco-badge">Consulting</span><div className="eco-name">Business Consulting</div><div className="eco-desc">Strategy, planning &amp; technical research</div></Reveal></div>
          <Reveal className="reveal-d3">
            <div className="eco-join">
              <h4>Your solution belongs here.</h4>
              <p>We're always expanding. If you serve business owners and share our standard of excellence — let's talk partnership.</p>
              <a href="mailto:michelle@creativesolutionspartners.com?subject=Partnership%20Inquiry">Apply to Partner →</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ WEALTHWAVE ════════ */}
      <div className="ww-band">
        <div className="ww-inner">
          <div className="ww-copy">
            <Reveal>
              <div className="section-tag" style={{ justifyContent: 'flex-start' }}>Featured Partner</div>
              <h2>Because we don't just care<br/>about your business.<br/><em>We care about you.</em></h2>
              <p>Financial stress is one of the biggest invisible drains on business owners and their teams. Through our partnership with WealthWave and their flagship How The Money Works program, we bring financial education and wealth-building tools to your employees — and to you.</p>
              <p>Understanding how money actually works changes how you make decisions, how you retain talent, and how you build toward real freedom.</p>
              <button onClick={() => onNavigate('wealthwave')}>Learn about WealthWave →</button>
            </Reveal>
          </div>
          <Reveal className="reveal-d2">
            <div className="ww-card">
              <div className="ww-logo">WealthWave</div>
              <div className="ww-sub">A CSP Partner</div>
              <div className="ww-pill">Featured Program</div>
              <div className="ww-desc"><strong style={{ color: 'var(--text)' }}>"How The Money Works"</strong><br/><br/>Financial education for business owners and their teams — built around real-world wealth strategies that actually get implemented.</div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ════════ BLOG ════════ */}
      <section id="blog" className="hp-blog">
        <div className="blog-header">
          <Reveal>
            <div className="section-tag">CSP Insights</div>
            <h2>Curated knowledge.<br/><em>Zero noise.</em></h2>
            <p>We maintain a living blog of the most relevant news, tools, and strategies across health, operations, and brand — so you stay sharp without spending hours hunting for it.</p>
          </Reveal>
        </div>
        <div className="blog-grid">
          <Reveal className="reveal-d1">
            <div className="blog-card" onClick={() => onNavigate('blog')}>
              <div className="blog-thumb bt-health">💚</div>
              <div className="blog-content">
                <span className="blog-cat">Health &amp; Wellness</span>
                <div className="blog-title">What the 2025 Benefits Landscape Means for Small Business Retention</div>
                <div className="blog-excerpt">Healthcare costs are rising but employee expectations are rising faster. Here's how proactive health management is changing the retention game...</div>
                <button className="blog-read" onClick={(e) => { e.stopPropagation(); onNavigate('blog'); }}>Read More →</button>
              </div>
            </div>
          </Reveal>
          <Reveal className="reveal-d2">
            <div className="blog-card" onClick={() => onNavigate('blog')}>
              <div className="blog-thumb bt-biz">⚡</div>
              <div className="blog-content">
                <span className="blog-cat">Operations</span>
                <div className="blog-title">The Hidden Cost of Commission Disputes: What Your Payroll Process is Really Costing You</div>
                <div className="blog-excerpt">Industry data shows the average payroll error costs $291 — but the real cost goes beyond the dollar amount. Trust takes months to rebuild...</div>
                <button className="blog-read" onClick={(e) => { e.stopPropagation(); onNavigate('blog'); }}>Read More →</button>
              </div>
            </div>
          </Reveal>
          <Reveal className="reveal-d3">
            <div className="blog-card" onClick={() => onNavigate('blog')}>
              <div className="blog-thumb bt-tech">✦</div>
              <div className="blog-content">
                <span className="blog-cat">Brand &amp; Growth</span>
                <div className="blog-title">Your Website is Either Working or Costing You — There is No Middle Ground</div>
                <div className="blog-excerpt">Most business owners treat their website as a business card. The ones who win treat it as their top-performing sales rep. Here's the difference...</div>
                <button className="blog-read" onClick={(e) => { e.stopPropagation(); onNavigate('blog'); }}>Read More →</button>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="blog-cta">
          <Reveal className="reveal-d4">
            <button className="btn-ghost" onClick={() => onNavigate('blog')}>View All Insights →</button>
          </Reveal>
        </div>
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
            <div className="field-stats">
              <div className="fs-card"><span className="fs-num">1</span><span className="fs-label">Point of contact for every service in your business</span></div>
              <div className="fs-card"><span className="fs-num">∞</span><span className="fs-label">Growing ecosystem — new solutions added monthly</span></div>
              <div className="fs-card"><span className="fs-num">0</span><span className="fs-label">Vendors to manage on your own</span></div>
              <div className="fs-card"><span className="fs-num">3</span><span className="fs-label">Core pillars: People, Operations, Brand</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section id="contact" className="final-cta">
        <div className="section-tag">The First Step</div>
        <h2>Let's build<br/>something <em>that actually works.</em></h2>
        <p>No fluff. No vendor directory. Just an honest conversation about where you are, what's holding you back, and what it would look like to have a real partner in your corner from day one.</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <a href="mailto:michelle@creativesolutionspartners.com" className="btn-gold">Start the Conversation</a>
          <a href="mailto:michelle@creativesolutionspartners.com?subject=Partnership%20Inquiry" className="btn-ghost">Become a Partner</a>
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
          <button onClick={() => onNavigate('championhealth')}>Champion Health</button>
          <button onClick={() => onNavigate('clarity')}>Clarity Commissions</button>
          <button onClick={() => onNavigate('bizboost')}>Business Booster</button>
          <button onClick={() => onNavigate('wealthwave')}>WealthWave</button>
          <button onClick={() => onNavigate('about')}>All Services →</button>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <button onClick={() => onNavigate('about')}>About CSP</button>
          <a href="mailto:michelle@creativesolutionspartners.com?subject=Partnership%20Inquiry">Become a Partner</a>
          <button onClick={() => onNavigate('blog')}>Insights Blog</button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact Us</button>
        </div>
      </footer>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Creative Solutions Partners — All rights reserved</span>
        <span>Resolution for Your Health and Wealth</span>
      </div>
    </div>
  );
};
