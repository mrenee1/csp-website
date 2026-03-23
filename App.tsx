import React, { useState, useCallback } from 'react';
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
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activePage, setActivePage] = useState<PageName>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{email: string} | null>(null);

  const handleIntroComplete = useCallback(() => setShowIntro(false), []);

  const navigateTo = (page: PageName) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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