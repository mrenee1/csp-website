import React, { useEffect, useRef } from 'react';
import { PageName } from '../types';
import { CSPPromiseSection } from './CSPPromiseSection';

interface HomePageProps {
  onNavigate: (page: PageName) => void;
}

const solutionPillars: Array<{
  id: string;
  number: string;
  title: string;
  className: string;
  summary: string;
  subservices: Array<{ title: string; page: PageName; description: string }>;
}> = [
  {
    id: 'health-solutions',
    number: '01',
    title: 'Health Solutions',
    className: 'p-health',
    summary:
      'Health Solutions helps employers build healthier teams while controlling the rising cost of care. Through Creative Care, CSP supports business owners, HR leaders, and operations teams with practical health benefits strategy, employee wellness guidance, and prevention-minded programs that fit real workplaces. Serving organizations across the United States, we focus on measurable outcomes: stronger retention, healthier employees, fewer avoidable disruptions, and a benefits experience your team can actually understand, communicate, and sustain as your company grows.',
    subservices: [
      {
        title: 'Creative Care',
        page: 'championhealth',
        description: 'Employer health strategy, wellness support, and healthcare cost reduction programs.',
      },
    ],
  },
  {
    id: 'finance-solutions',
    number: '02',
    title: 'Finance Solutions',
    className: 'p-ops',
    summary:
      'Finance Solutions brings together financial education and payment infrastructure so growing businesses can make better decisions with money. WealthWave helps owners and teams understand how money works, build confidence, and plan with clarity. Impact Payments supports modern merchant services and payment systems that keep revenue moving. For organizations across the United States, CSP connects finance tools to business goals, employee education, customer experience, cash flow, and long-term operational resilience without forcing leaders to manage disconnected providers.',
    subservices: [
      {
        title: 'WealthWave',
        page: 'wealthwave',
        description: 'Financial literacy and wealth-building education for owners, employees, and families.',
      },
      {
        title: 'Impact Payments',
        page: 'creativepayments',
        description: 'Payment processing and merchant services designed for modern business operations.',
      },
    ],
  },
  {
    id: 'technology-solutions',
    number: '03',
    title: 'Technology Solutions',
    className: 'p-brand',
    summary:
      'Technology Solutions gives business owners the digital infrastructure to look credible, move faster, and reduce manual work. Creative Web builds websites, brand systems, SEO foundations, and digital growth systems that help clients find and trust your company. Clarity Commissions supports automated commission tracking for teams that need accurate, transparent compensation workflows. Across the United States, CSP helps operations teams choose technology that supports real growth instead of adding another disconnected tool to manage, troubleshoot, or explain to employees.',
    subservices: [
      {
        title: 'Creative Web',
        page: 'bizboost',
        description: 'Website design, brand development, SEO foundations, and digital growth systems.',
      },
      {
        title: 'Clarity Commissions',
        page: 'clarity',
        description: 'Automated commission tracking and compensation transparency for complex teams.',
      },
    ],
  },
];

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
  return (
    <div className="hp-wrap">
      {/* ════════ HERO ════════ */}
      <section className="hero-new">
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-eyebrow">Creative Solutions Partners</div>
        <h1 className="hero-title">
          <span className="ht-1">Integrated Health,</span>
          <span className="ht-2">Wealth &amp; Technology</span>
          <span className="ht-3">Solutions for Growing Businesses</span>
        </h1>
        <p className="hero-subheadline">
          Creative Solutions Partners helps business owners, HR leaders, and operations teams align benefits,
          financial education, payments, websites, and automation through one trusted consulting partner in
          the United States.
        </p>
        <div className="hero-tagline">"Our goal is to grow. Our product is partnership."</div>
        <nav className="hero-link-row" aria-label="Solution shortcuts">
          <a href="/#health-solutions">Health Solutions</a>
          <a href="/#finance-solutions">Finance Solutions</a>
          <a href="/#technology-solutions">Technology Solutions</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
        </nav>
        <div className="hero-btns">
          <button className="btn-gold" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Start the Conversation</button>
          <button className="btn-ghost" onClick={() => onNavigate('about')}>Learn About CSP</button>
        </div>
      </section>

      {/* ════════ PROMISE ════════ */}
      <CSPPromiseSection />

      {/* ════════ SOLUTION PILLARS ════════ */}
      <section className="pillars" aria-labelledby="solutions-heading">
        <div className="pillars-intro">
          <div className="section-tag">Integrated Consulting</div>
          <h2 id="solutions-heading">Health, Wealth &amp; Technology Working Together</h2>
          <p className="pillar-intro-copy">
            CSP is built for leaders who need practical answers, not another vendor list. We connect strategy,
            services, and implementation across the areas that most affect growth: employee health, financial
            confidence, payment operations, web presence, and workflow clarity.
          </p>
        </div>
        <div className="pillars-grid">
          {solutionPillars.map((pillar) => (
            <Reveal key={pillar.id} className={`pillar ${pillar.className}`}>
              <div className="pillar-glow" />
              <div className="p-header">
                <h2 id={pillar.id} className="p-title">{pillar.title}</h2>
                <span className="p-num">{pillar.number}</span>
              </div>
              <p className="p-desc">{pillar.summary}</p>
              <div className="subservice-list">
                {pillar.subservices.map((service) => (
                  <article key={service.title} className="solution-subservice">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <button className="p-link" onClick={() => onNavigate(service.page)}>
                      Explore {service.title} →
                    </button>
                  </article>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <img
              src="/assets/csp-og.svg"
              alt="Creative Solutions Partners consulting partnership across health, finance, and technology"
              style={{ width: '100%', maxWidth: 560, height: 260, objectFit: 'cover', borderRadius: 10, opacity: 0.9 }}
            />
          </div>
          <h2>What would it be like if you already knew<br/><strong>it would work the first time?</strong></h2>
          <p>That's not a sales pitch. That's the standard we hold ourselves to. We don't recommend tools we haven't vetted. We don't send you a list of vendors. We send <em>our people</em> — expert solution advisors who solve problems alongside you in the field.</p>
          <div className="product-stmt">OUR GOAL IS TO GROW. OUR PRODUCT IS PARTNERSHIP.</div>
        </div>
      </Reveal>

      {/* ════════ IN THE FIELD ════════ */}
      <section id="about" className="field">
        <div className="field-inner">
          <Reveal>
            <div className="section-tag">In The Field</div>
            <h2 className="field-heading">We don't just find solutions.<br/><em>We solve them with you.</em></h2>
            <p className="field-body">Most companies hand you a recommendation and wish you luck. That's not our model. CSP puts expert solution advisors alongside business owners — in their operations, understanding their specific context, and staying until the problem is actually solved.</p>
            <blockquote className="field-quote">"Our product is partnership. That means we show up."</blockquote>
          </Reveal>
          <Reveal className="reveal-d1">
            <div className="field-stats">
              <div className="fs-card"><span className="fs-num">1</span><span className="fs-label">Point of contact for every service in your business</span></div>
              <div className="fs-card"><span className="fs-num">∞</span><span className="fs-label">Growing ecosystem — new solutions added monthly</span></div>
              <div className="fs-card"><span className="fs-num">0</span><span className="fs-label">Vendors to manage on your own</span></div>
              <div className="fs-card"><span className="fs-num">3</span><span className="fs-label">Core pillars: Health, Wealth, Technology</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section id="contact" className="final-cta">
        <div className="section-tag">The First Step</div>
        <h2>Schedule a<br/><em>Partnership Call.</em></h2>
        <p>Talk with CSP about the health, finance, or technology gap slowing your business down. We will help you identify the right next step for your team anywhere in the United States.</p>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <a href="mailto:michelle@creativesolutionspartners.com?subject=Schedule%20a%20Partnership%20Call" className="btn-gold">Schedule a Partnership Call</a>
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
          <div className="footer-socials">
            <a href="https://www.linkedin.com/company/creative-solutions-partners/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.instagram.com/creativesolutionspartners" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.facebook.com/share/184bd3fEEQ/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <button onClick={() => onNavigate('solutions')}>Our Platform</button>
          <a href="/#health-solutions">Health Solutions</a>
          <a href="/#finance-solutions">Finance Solutions</a>
          <a href="/#technology-solutions">Technology Solutions</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
          <button onClick={() => onNavigate('about')}>About Us</button>
          <button onClick={() => onNavigate('partner-application')}>Become a Partner</button>
        </div>
      </footer>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Creative Solutions Partners — All rights reserved</span>
        <div className="footer-bottom-links">
          <button onClick={() => onNavigate('trust')}>Trust Center</button>
          <span className="footer-bottom-sep">|</span>
          <button onClick={() => onNavigate('privacy')}>Privacy Policy</button>
        </div>
      </div>
    </div>
  );
};
