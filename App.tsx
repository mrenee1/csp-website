import React, { useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import { SERVICES, TEAM_MEMBERS } from './constants';
import { PageName } from './types';
import { SolutionPage } from './components/SolutionPage';
import { ClarityPage } from './components/ClarityPage';
import { WealthWavePage } from './components/WealthWavePage';
import { ChampionHealthPage } from './components/ChampionHealthPage';
import { ImpactPaymentsPage } from './components/ImpactPaymentsPage';
import { CreativeWebPage } from './components/CreativeWebPage';
import { PartnerApplication } from './components/PartnerApplication';
import { LoginScreen } from './components/LoginScreen';
import { TeamCarousel } from './components/TeamCarousel';
import { TopNav } from './components/TopNav';
import { HomePage } from './components/HomePage';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState<PageName>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{email: string} | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (page: PageName) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (credentials: { email: string; password: string }) => {
    // In a real app, this would call an authentication API
    setIsAuthenticated(true);
    setUser({ email: credentials.email });
    setActivePage('partner-application'); // Redirect to partner portal/dashboard
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActivePage('home');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-brand-dark z-50 flex items-center justify-center">
        <div className="animate-fade-in flex flex-col items-center">
          <Logo variant="light" className="mb-8 scale-150" />
          <div className="h-[2px] w-40 bg-white/10 mt-6 overflow-hidden rounded-full">
            <div className="h-full w-1/2 bg-brand-gold animate-[shimmer_1.5s_infinite]" />
          </div>
          <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-white/60 font-medium">Resolution for your health, wealth, and technology</p>
        </div>
      </div>
    );
  }

  return (
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

        {activePage === 'clarity' && <ClarityPage onBack={() => navigateTo('tech')} onNavigate={navigateTo} />}
        {activePage === 'wealthwave' && <WealthWavePage onBack={() => navigateTo('finance')} onNavigate={navigateTo} />}
        {activePage === 'championhealth' && <ChampionHealthPage onBack={() => navigateTo('health')} onNavigate={navigateTo} />}
        {activePage === 'creativepayments' && <ImpactPaymentsPage onBack={() => navigateTo('finance')} onNavigate={navigateTo} />}
        {activePage === 'bizboost' && <CreativeWebPage onBack={() => navigateTo('tech')} onNavigate={navigateTo} />}

        {['health', 'finance', 'tech'].includes(activePage) && (
          <SolutionPage data={SERVICES[activePage as keyof typeof SERVICES]} onBack={() => navigateTo('home')} onNavigate={navigateTo} />
        )}

        {activePage === 'login' && (
          <LoginScreen 
            onLogin={handleLogin} 
            onBack={() => navigateTo('home')} 
            onNavigate={navigateTo} 
          />
        )}

        {activePage === 'partner-application' && (
          <PartnerApplication 
            onBack={() => navigateTo('home')} 
            onNavigate={navigateTo} 
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
          />
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
          </div>
        )}
      </div>
    </div>
  );
}
