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
    <div className="w-full bg-white relative">
      <div className="flex flex-col md:flex-row min-h-[600px] border border-gray-100 shadow-sm">
        
        {/* Image Section - Transitions with opacity */}
        <div className="w-full md:w-1/2 relative overflow-hidden bg-gray-200 h-[400px] md:h-auto group">
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
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent md:bg-gradient-to-r md:from-transparent md:to-brand-dark/20 mix-blend-multiply"></div>
            </div>
          ))}
          
          {/* Mobile Navigation Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 md:hidden z-20">
            {members.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setActiveIndex(idx); setIsAnimating(true); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'w-6 bg-brand-gold' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative bg-brand-light">
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-gold hidden md:block"></div>
          
          {/* Animated Text Container */}
          <div className="relative overflow-hidden min-h-[300px]">
            {members.map((member, index) => (
              <div
                key={member.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col justify-center ${
                  index === activeIndex 
                    ? 'opacity-100 translate-y-0 relative' 
                    : 'opacity-0 translate-y-8 absolute pointer-events-none'
                }`}
              >
                <div className="mb-2 text-brand-gold font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-brand-gold"></span>
                    Leadership Team
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-2">{member.name}</h2>
                <h3 className="text-xl text-brand-purple mb-8 font-light italic">{member.role}</h3>
                
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-2">
                    {member.specialties.map((spec, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white border border-gray-200 text-xs text-gray-500 uppercase tracking-wider rounded-sm">
                            {spec}
                        </span>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-4 mt-8 pt-8 border-t border-gray-200">
            <button 
              onClick={prevSlide}
              className="p-3 border border-gray-300 rounded-full hover:border-brand-purple hover:text-brand-purple transition-colors disabled:opacity-50"
              disabled={isAnimating}
            >
              <ArrowLeft size={20} />
            </button>
            <div className="text-sm font-medium text-gray-400">
                <span className="text-brand-dark">0{activeIndex + 1}</span> / 0{members.length}
            </div>
            <button 
              onClick={nextSlide}
              className="p-3 border border-gray-300 rounded-full hover:border-brand-purple hover:text-brand-purple transition-colors disabled:opacity-50"
              disabled={isAnimating}
            >
              <ArrowRight size={20} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};