import React, { useState, useCallback, useEffect } from 'react';
import { IntroAnimation } from './components/IntroAnimation';
import { SERVICES, TEAM_MEMBERS } from './constants';
import { PageName } from './types';
import { ClarityPage } from './components/ClarityPage';
import { WealthWavePage } from './components/WealthWavePage';
import { ChampionHealthPage } from './components/ChampionHealthPage';
import { ImpactPaymentsPage } from './components/ImpactPaymentsPage';
import { CreativeWebPage } from './components/CreativeWebPage';
import { PartnerApplication } from './components/PartnerApplication';
import { LoginScreen } from './components/LoginScreen';
import { TrustCenter } from './components/TrustCenter';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TeamCarousel } from './components/TeamCarousel';
import { TopNav } from './components/TopNav';
import { HomePage } from './components/HomePage';
import { ChatBot } from './components/ChatBot';
import { OurSolutionsPage } from './components/OurSolutionsPage';
import { CreativeCareForm } from './components/CreativeCareForm';
import { ArrowLeft } from 'lucide-react';

function getPageFromPath(): PageName {
  if (window.location.pathname === '/quick-intake') return 'quick-intake';
  if (window.location.pathname === '/consultation-intake') return 'consultation-intake';
  return 'home';
}

function getPathForPage(page: PageName) {
  if (page === 'quick-intake') return '/quick-intake';
  if (page === 'consultation-intake') return '/consultation-intake';
  return '/';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageName>(() => getPageFromPath());
  const [showIntro, setShowIntro] = useState(() => !['quick-intake', 'consultation-intake'].includes(getPageFromPath()));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{email: string} | null>(null);

  const handleIntroComplete = useCallback(() => setShowIntro(false), []);

  const navigateTo = (page: PageName) => {
    setActivePage(page);
    window.history.pushState({}, '', getPathForPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getPageFromPath());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogin = (credentials: { email: string; password: string }) => {
    setIsAuthenticated(true);
    setUser({ email: credentials.email });
    setActivePage('partner-application');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActivePage('home');
  };

  return (
    <>
    {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
    <div className="min-h-screen" style={{ background: 'var(--bg, #08091a)' }}>
      <TopNav 
        activePage={activePage} 
        onNavigate={navigateTo} 
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      <div style={{ paddingTop: 60 }}>
        {activePage === 'home' && (
          <HomePage onNavigate={navigateTo} />
        )}

        {activePage === 'clarity' && <ClarityPage onBack={() => navigateTo('solutions')} onNavigate={navigateTo} />}
        {activePage === 'wealthwave' && <WealthWavePage onBack={() => navigateTo('solutions')} onNavigate={navigateTo} />}
        {activePage === 'championhealth' && <ChampionHealthPage onBack={() => navigateTo('solutions')} onNavigate={navigateTo} />}
        {activePage === 'creativepayments' && <ImpactPaymentsPage onBack={() => navigateTo('solutions')} onNavigate={navigateTo} />}
        {activePage === 'bizboost' && <CreativeWebPage onBack={() => navigateTo('solutions')} onNavigate={navigateTo} />}

        {activePage === 'solutions' && <OurSolutionsPage onBack={() => navigateTo('home')} onNavigate={navigateTo} />}

        {activePage === 'login' && (
          <LoginScreen 
            onLogin={handleLogin} 
            onBack={() => navigateTo('home')} 
            onNavigate={navigateTo} 
          />
        )}

        {activePage === 'partner-application' && (
          <PartnerApplication
            onBack={() => navigateTo('solutions')}
            onNavigate={navigateTo}
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
          />
        )}

        {activePage === 'trust' && <TrustCenter onBack={() => navigateTo('home')} onNavigate={navigateTo} />}
        {activePage === 'privacy' && <PrivacyPolicy onBack={() => navigateTo('home')} onNavigate={navigateTo} />}

        {activePage === 'quick-intake' && (
          <div className="min-h-screen px-6 py-16 md:px-12 lg:px-24" style={{
            background:
              'radial-gradient(circle at top right, rgba(123, 63, 160, 0.16), transparent 34%), linear-gradient(180deg, #08091a, #0d1020)'
          }}>
            <div className="mx-auto max-w-3xl">
              <button onClick={() => navigateTo('championhealth')} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs uppercase tracking-[0.2em]">
                <ArrowLeft size={16} /> Back to Creative Care
              </button>
              <CreativeCareForm variant="cta" sourcePage="creative-care-quick-share" />
            </div>
          </div>
        )}

        {activePage === 'consultation-intake' && (
          <div className="min-h-screen px-6 py-16 md:px-12 lg:px-24" style={{
            background:
              'radial-gradient(circle at top right, rgba(123, 63, 160, 0.16), transparent 34%), linear-gradient(180deg, #08091a, #0d1020)'
          }}>
            <div className="mx-auto max-w-5xl">
              <button onClick={() => navigateTo('championhealth')} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs uppercase tracking-[0.2em]">
                <ArrowLeft size={16} /> Back to Creative Care
              </button>
              <CreativeCareForm variant="consultation" sourcePage="creative-care-consultation-share" />
            </div>
          </div>
        )}

        {activePage === 'about' && (
          <div className="py-24 px-6 md:px-12 lg:px-24 animate-fade-in" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <button onClick={() => navigateTo('home')} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={16} /> Back
            </button>
            <h1 className="text-5xl font-serif mb-8 text-white">About Us</h1>
            <div className="animate-fade-in">
              {/* Eyebrow heading */}
              <div className="mb-4">
                <span className="text-brand-gold text-sm font-bold uppercase tracking-widest">About Us</span>
              </div>
              
              {/* Main heading */}
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                Leadership rooted in strategy, service, and long-term vision
              </h2>
              
              {/* Intro paragraph */}
              <div className="max-w-4xl mb-16">
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  Creative Solutions Partners brings together leadership across business strategy, operations, and financial education to create meaningful solutions for the people, partners, and organizations we serve.
                </p>
              </div>
              
              {/* Leadership Team Section */}
              <div className="mb-8">
                <TeamCarousel members={TEAM_MEMBERS} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Bot */}
      <ChatBot />
    </div>
    </>
  );
}