import React, { useState } from 'react';
import { PageName } from '../types';

interface TopNavProps {
  activePage: PageName;
  onNavigate: (page: PageName) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ activePage, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollOrNav = (sectionId: string) => {
    if (activePage === 'home') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setMobileOpen(false);
  };

  const nav = (page: PageName) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="csp-nav">
        <div className="nav-brand" onClick={() => { onNavigate('home'); setMobileOpen(false); }}>
          <div className="nav-csp">CSP</div>
          <div className="nav-divider" />
          <div className="nav-full">
            <span>Creative Solutions</span>
            <span>Partners</span>
          </div>
        </div>

        <div className="nav-links">
          {/* Solutions dropdown */}
          <div className="nav-dropdown-wrap">
            <button className="nav-dropdown-trigger" onClick={() => scrollOrNav('solutions')}>
              Solutions <span className="dd-arrow">▼</span>
            </button>
            <div className="nav-dropdown-panel">
              <span className="nav-dd-label">Health</span>
              <button className="nav-dd-item" onClick={() => nav('championhealth')}>Champ Plan (Champion Health)</button>
              <div className="nav-dd-divider" />
              <span className="nav-dd-label">Tech</span>
              <button className="nav-dd-item" onClick={() => nav('clarity')}>Clarity Commissions</button>
              <button className="nav-dd-item" onClick={() => nav('bizboost')}>Biz Boost Agency</button>
              <div className="nav-dd-divider" />
              <span className="nav-dd-label">Wealth</span>
              <button className="nav-dd-item" onClick={() => nav('wealthwave')}>WealthWave</button>
              <div className="nav-dd-divider" />
              <span className="nav-dd-label">Other</span>
              <button className="nav-dd-item" onClick={() => nav('about')}>Background Checks</button>
              <button className="nav-dd-item" onClick={() => nav('about')}>CC Processing</button>
            </div>
          </div>

          <button onClick={() => scrollOrNav('tools')}>Tools</button>

          {/* Partners dropdown */}
          <div className="nav-dropdown-wrap">
            <button className="nav-dropdown-trigger" onClick={() => scrollOrNav('ecosystem')}>
              Partners <span className="dd-arrow">▼</span>
            </button>
            <div className="nav-dropdown-panel">
              <button className="nav-dd-item" onClick={() => scrollOrNav('ecosystem')}>Network Overview</button>
              <button className="nav-dd-item" onClick={() => nav('wealthwave')}>WealthWave Partners</button>
              <div className="nav-dd-divider" />
              <a className="nav-dd-item" href="mailto:partners@csp.com?subject=Partnership%20Inquiry">Become a Partner →</a>
            </div>
          </div>

          <button onClick={() => onNavigate('blog')}>Insights</button>
          <button onClick={() => scrollOrNav('contact')}>Contact</button>
          <button className="nav-cta-btn" onClick={() => scrollOrNav('contact')}>Agent Login</button>
        </div>

        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu-overlay">
          <button className="mobile-menu-close" onClick={() => setMobileOpen(false)}>✕</button>
          <button onClick={() => { onNavigate('home'); setMobileOpen(false); }}>Home</button>

          {/* Solutions group */}
          <button className="mobile-group-label" disabled>Solutions</button>
          <button className="mobile-group-item" onClick={() => nav('championhealth')}>Champion Health</button>
          <button className="mobile-group-item" onClick={() => nav('clarity')}>Clarity Commissions</button>
          <button className="mobile-group-item" onClick={() => nav('bizboost')}>Biz Boost Agency</button>
          <button className="mobile-group-item" onClick={() => nav('wealthwave')}>WealthWave</button>
          <button className="mobile-group-item" onClick={() => nav('about')}>Background Checks</button>
          <button className="mobile-group-item" onClick={() => nav('about')}>CC Processing</button>

          <button onClick={() => scrollOrNav('tools')}>Tools</button>

          {/* Partners group */}
          <button className="mobile-group-label" disabled>Partners</button>
          <button className="mobile-group-item" onClick={() => scrollOrNav('ecosystem')}>Network Overview</button>
          <button className="mobile-group-item" onClick={() => nav('wealthwave')}>WealthWave Partners</button>

          <button onClick={() => { onNavigate('blog'); setMobileOpen(false); }}>Insights</button>
          <button onClick={() => scrollOrNav('contact')}>Contact</button>
        </div>
      )}
    </>
  );
};
