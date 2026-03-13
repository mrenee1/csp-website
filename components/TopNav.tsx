import React, { useState } from 'react';
import { PageName } from '../types';
import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface TopNavProps {
  activePage: PageName;
  onNavigate: (page: PageName) => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ activePage, onNavigate, isAuthenticated = false, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
              <button className="nav-dd-item" onClick={() => nav('championhealth')}>Creative Care</button>
              <div className="nav-dd-divider" />
              <span className="nav-dd-label">Finance</span>
              <button className="nav-dd-item" onClick={() => nav('wealthwave')}>WealthWave</button>
              <button className="nav-dd-item" onClick={() => nav('creativepayments')}>Impact Payments</button>
              <div className="nav-dd-divider" />
              <span className="nav-dd-label">Technology</span>
              <button className="nav-dd-item" onClick={() => nav('bizboost')}>Creative Web</button>
              <button className="nav-dd-item" onClick={() => nav('clarity')}>Clarity Commissions</button>
            </div>
          </div>



          {/* Partners dropdown */}
          <div className="nav-dropdown-wrap">
            <button className="nav-dropdown-trigger" onClick={() => scrollOrNav('ecosystem')}>
              Partners <span className="dd-arrow">▼</span>
            </button>
            <div className="nav-dropdown-panel">
              <button className="nav-dd-item" onClick={() => scrollOrNav('ecosystem')}>Network Overview</button>
              <div className="nav-dd-divider" />
              <button className="nav-dd-item" onClick={() => onNavigate('partner-application')}>Become a Partner →</button>
            </div>
          </div>

          <button onClick={() => window.open('https://csp-insights.replit.app', '_blank')}>Insights</button>
          <button onClick={() => onNavigate('about')}>About</button>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          {isAuthenticated ? (
            <button className="nav-cta-btn" onClick={onLogout}>Logout</button>
          ) : (
            <button className="nav-cta-btn" onClick={() => onNavigate('login')}>Partner Login</button>
          )}
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
          <button className="mobile-group-item" onClick={() => nav('championhealth')}>Creative Care</button>
          <button className="mobile-group-item" onClick={() => nav('wealthwave')}>WealthWave</button>
          <button className="mobile-group-item" onClick={() => nav('creativepayments')}>Impact Payments</button>
          <button className="mobile-group-item" onClick={() => nav('bizboost')}>Creative Web</button>
          <button className="mobile-group-item" onClick={() => nav('clarity')}>Clarity Commissions</button>



          {/* Partners group */}
          <button className="mobile-group-label" disabled>Partners</button>
          <button className="mobile-group-item" onClick={() => scrollOrNav('ecosystem')}>Network Overview</button>
          <button className="mobile-group-item" onClick={() => { onNavigate('partner-application'); setMobileOpen(false); }}>Become a Partner</button>

          <button onClick={() => { window.open('https://csp-insights.replit.app', '_blank'); setMobileOpen(false); }}>Insights</button>
          <button onClick={() => { onNavigate('about'); setMobileOpen(false); }}>About</button>
          
          {/* Mobile Theme Toggle */}
          <button 
            onClick={() => { toggleTheme(); }}
            className="mobile-theme-toggle"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      )}
    </>
  );
};
