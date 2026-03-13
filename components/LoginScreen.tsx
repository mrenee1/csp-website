import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, User } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (credentials: { email: string; password: string }) => void;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onBack, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      if (email === 'partner@csp.com' && password === 'welcome123') {
        onLogin({ email, password });
      } else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-yellow-900/10" />
        
        <div className="relative py-24 px-6 md:px-12 lg:px-24">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>

          <div className="max-w-md mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-gold/30">
                Partner Portal
              </div>
              <h1 className="text-4xl font-serif font-medium mb-4">Welcome Back</h1>
              <p className="text-gray-400">Sign in to access your partner dashboard</p>
            </div>

            <div className="bg-[#18181b] border border-white/10 rounded-xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:border-gold focus:outline-none transition-colors placeholder-gray-500"
                      placeholder="partner@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg pl-10 pr-12 py-3 text-white focus:border-gold focus:outline-none transition-colors placeholder-gray-500"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gold text-[#0a0a0a] py-4 font-bold hover:bg-[#d4af37] transition-all duration-300 rounded-lg text-lg uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-center text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => onNavigate('partner-application')}
                    className="text-gold font-medium hover:underline"
                  >
                    Apply to become a partner
                  </button>
                </p>
                
                <div className="mt-4 text-center">
                  <button className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
                    Forgot your password?
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-gray-500">
              <p>For demo purposes, use:</p>
              <p className="mt-1">Email: partner@csp.com</p>
              <p>Password: welcome123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};