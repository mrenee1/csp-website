import React, { useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import { SERVICES, BLOG_POSTS, TEAM_MEMBERS } from './constants';
import { PageName } from './types';
import { SolutionPage } from './components/SolutionPage';
import { ClarityPage } from './components/ClarityPage';
import { WealthWavePage } from './components/WealthWavePage';
import { ChampionHealthPage } from './components/ChampionHealthPage';
import { TeamCarousel } from './components/TeamCarousel';
import { TopNav } from './components/TopNav';
import { HomePage } from './components/HomePage';
import { Newsletter } from './components/Newsletter';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState<PageName>('home');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (page: PageName) => {
    if (page === 'bizboost') {
      window.location.href = 'mailto:michelle@creativesolutionspartners.com?subject=Technology%20Services%20Consultation%20(Biz%20Boost)';
      return;
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-brand-dark z-50 flex items-center justify-center">
        <div className="animate-fade-in flex flex-col items-center">
          <Logo variant="light" className="mb-8 scale-150" />
          <div className="h-[2px] w-40 bg-white/10 mt-6 overflow-hidden rounded-full">
            <div className="h-full w-1/2 bg-brand-gold animate-[shimmer_1.5s_infinite]" />
          </div>
          <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-white/60 font-medium">Resolution for your health and wealth</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg, #08091a)' }}>
      <TopNav activePage={activePage} onNavigate={navigateTo} />
      <Newsletter />

      <div style={{ paddingTop: 60 }}>
        {activePage === 'home' && (
          <HomePage onNavigate={navigateTo} />
        )}

        {activePage === 'clarity' && <ClarityPage onBack={() => navigateTo('tech')} onNavigate={navigateTo} />}
        {activePage === 'wealthwave' && <WealthWavePage onBack={() => navigateTo('wealth')} onNavigate={navigateTo} />}
        {activePage === 'championhealth' && <ChampionHealthPage onBack={() => navigateTo('health')} onNavigate={navigateTo} />}

        {['health', 'wealth', 'tech'].includes(activePage) && (
          <SolutionPage data={SERVICES[activePage as keyof typeof SERVICES]} onBack={() => navigateTo('home')} onNavigate={navigateTo} />
        )}

        {(activePage === 'about' || activePage === 'blog') && (
          <div className="py-24 px-6 md:px-12 lg:px-24 animate-fade-in" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <button onClick={() => navigateTo('home')} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={16} /> Back
            </button>
            <h1 className="text-5xl font-serif mb-8 text-white capitalize">{activePage === 'blog' ? 'Insights' : 'About Us'}</h1>

            {activePage === 'blog' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post) => (
                  <div key={post.id} className="group">
                    <div className="bg-gray-800 aspect-video mb-4 overflow-hidden rounded-lg">
                      <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" alt="" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-brand-gold transition-colors">{post.title}</h3>
                    <p className="text-gray-400 text-sm">{post.excerpt}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="max-w-4xl mb-24">
                  <p className="text-2xl font-light mb-8 text-gray-300">
                    Creative Solutions Partners is more than a consulting firm. We are the structural engineers of business longevity.
                  </p>
                  <p className="mb-6 text-gray-400 leading-relaxed">
                    Founded on the principle that health, wealth, and technology are inextricably linked, we provide a unified platform for leaders who refuse to compromise on stability or growth.
                  </p>
                  <div className="p-8 border-l-4 border-brand-gold my-8 rounded-r-lg" style={{ background: 'var(--card)' }}>
                    <h4 className="font-bold text-white mb-2">Our Philosophy</h4>
                    <p className="italic text-brand-gold font-medium">"Resolution through integration."</p>
                  </div>
                </div>
                <div className="mb-8">
                  <h2 className="text-3xl font-serif text-white mb-8">Meet The Partners</h2>
                  <TeamCarousel members={TEAM_MEMBERS} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
