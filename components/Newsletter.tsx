import React, { useState } from 'react';
import { Mail, X, ChevronRight, FileText } from 'lucide-react';
import { RSR_RESOURCES } from '../constants';

export const Newsletter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Newsletter Signup - Insights');
    const body = encodeURIComponent(`Email: ${email}\n\nI would like to receive strategic insights on health, wealth, and technology.`);
    window.location.href = `mailto:partners@csp.com?subject=${subject}&body=${body}`;
    setStatus('success');
    setTimeout(() => {
      setIsOpen(false);
      setStatus('idle');
      setEmail('');
    }, 1500);
  };

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* Trigger Button */}
      <div 
        className={`fixed right-0 bottom-8 z-40 transition-transform duration-300 ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
      >
        <div className="relative group">
            <button
                onClick={() => setIsOpen(true)}
                className="bg-brand-gold text-white py-2 px-4 shadow-lg hover:bg-yellow-600 transition-all duration-300 rounded-l-md flex items-center gap-2"
                aria-label="Open Insights"
            >
                <Mail size={16} />
                <span className="font-semibold text-xs tracking-wider uppercase">Insights</span>
            </button>
            
            {/* Dismiss Tab Button - Appears on Hover */}
            <button 
                onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
                className="absolute -top-2 -left-2 bg-gray-900 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                title="Close tab"
            >
                <X size={10} />
            </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-serif text-brand-dark">Join the Inner Circle</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-brand-purple transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="mb-10">
            <p className="text-gray-600 mb-6 leading-relaxed">
              Get strategic insights on health, wealth, and technology delivered to your inbox. No fluff, just high-value intelligence for business leaders.
            </p>
            
            {status === 'success' ? (
              <div className="bg-green-50 text-green-800 p-4 rounded-md border border-green-200">
                Thank you for subscribing. Welcome to the partners network.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                    placeholder="name@company.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-purple text-white py-3 px-6 hover:bg-purple-900 transition-colors duration-300 flex items-center justify-center gap-2 font-medium"
                >
                  Subscribe <ChevronRight size={16} />
                </button>
              </form>
            )}
          </div>

          <div className="mt-auto border-t border-gray-100 pt-8">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">RSR Free Resources</h4>
            <ul className="space-y-4">
              {RSR_RESOURCES.map((resource, idx) => (
                <li key={idx}>
                  <a href={resource.url} className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="mt-1 text-brand-gold group-hover:text-brand-purple transition-colors">
                      <FileText size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-brand-purple transition-colors">{resource.title}</div>
                      <div className="text-xs text-gray-500">{resource.type}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
