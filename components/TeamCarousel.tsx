import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { TeamMember } from '../types';

interface TeamCarouselProps {
  members: TeamMember[];
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({ members }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % members.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Optional: Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const activeMember = members[activeIndex];

  return (
    <div className="w-full relative">
      <div className="flex flex-col md:flex-row min-h-[600px] bg-[#0a0a0a] border border-white/10 shadow-2xl rounded-lg overflow-hidden">
        
        {/* Image Section - Transitions with opacity */}
        <div className="w-full md:w-1/2 relative overflow-hidden bg-gray-900 h-[400px] md:h-auto group">
          {members.map((member, index) => (
            <div
              key={member.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              {/* Premium overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-transparent md:to-black/30"></div>
            </div>
          ))}
          
          {/* Mobile Navigation Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 md:hidden z-20">
            {members.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setActiveIndex(idx); setIsAnimating(true); }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'w-8 bg-brand-gold' : 'w-3 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-[#0a0a0a]">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold hidden md:block"></div>
          
          {/* Animated Text Container */}
          <div className="relative overflow-hidden min-h-[320px]">
            {members.map((member, index) => (
              <div
                key={member.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col justify-center ${
                  index === activeIndex 
                    ? 'opacity-100 translate-y-0 relative' 
                    : 'opacity-0 translate-y-8 absolute pointer-events-none'
                }`}
              >
                {/* Role badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-widest rounded-sm">
                    {member.role}
                  </span>
                </div>
                
                {/* Name */}
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-3 tracking-tight">
                  {member.name}
                </h2>
                
                {/* Bio */}
                <p className="text-gray-300 leading-relaxed mb-8 text-base md:text-lg max-w-2xl">
                  {member.bio}
                </p>

                {/* Specialty Tags */}
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((spec, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs text-gray-300 uppercase tracking-wider rounded-sm hover:border-brand-gold/30 hover:text-brand-gold transition-colors"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-4 mt-12 pt-8 border-t border-white/10">
            <button 
              onClick={prevSlide}
              className="p-3 border border-white/20 rounded-full hover:border-brand-gold hover:text-brand-gold transition-all duration-300 disabled:opacity-50 bg-white/5 hover:bg-white/10"
              disabled={isAnimating}
            >
              <ArrowLeft size={18} />
            </button>
            <div className="text-sm font-medium text-gray-400">
              <span className="text-white font-bold">0{activeIndex + 1}</span> / 0{members.length}
            </div>
            <button 
              onClick={nextSlide}
              className="p-3 border border-white/20 rounded-full hover:border-brand-gold hover:text-brand-gold transition-all duration-300 disabled:opacity-50 bg-white/5 hover:bg-white/10"
              disabled={isAnimating}
            >
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};