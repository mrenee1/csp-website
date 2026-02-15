
import React, { useState } from 'react';
import { NAV_STRUCTURE } from '../constants';
import { PageName } from '../types';
import { Logo } from './Logo';
import { ChevronDown, ChevronRight, LogIn } from 'lucide-react';

interface SidebarProps {
  activePage: PageName;
  onNavigate: (page: PageName) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, isOpen, onClose }) => {
  const [solutionsOpen, setSolutionsOpen] = useState(true);

  const handleNavClick = (id: string, hasChildren: boolean) => {
    if (hasChildren) {
      setSolutionsOpen(!solutionsOpen);
    } else {
      onNavigate(id as PageName);
      if (window.innerWidth < 768) {
        onClose();
      }
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed left-0 top-0 h-full w-72 bg-brand-dark text-white z-40 transform transition-transform duration-300 ease-out md:translate-x-0 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-8 border-b border-gray-800">
          <button onClick={() => { onNavigate('home'); onClose(); }}>
            <Logo variant="light" className="h-12" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-8 px-4">
          <ul className="space-y-2">
            {NAV_STRUCTURE.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              const hasChildren = !!item.children;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id, hasChildren)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-md transition-all duration-200 group ${isActive ? 'bg-brand-purple text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-3">
                      {Icon && <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-brand-gold'} />}
                      <span className="font-medium tracking-wide uppercase text-sm">{item.label}</span>
                    </div>
                    {hasChildren && (
                      solutionsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                    )}
                  </button>

                  {/* Submenu */}
                  {hasChildren && (
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${solutionsOpen ? 'max-h-64 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                      <ul className="pl-4 space-y-1 border-l border-gray-800 ml-6">
                        {item.children?.map((child) => (
                          <li key={child.id}>
                            <button
                              onClick={() => { onNavigate(child.id); if(window.innerWidth < 768) onClose(); }}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-md transition-colors ${activePage === child.id ? 'text-brand-gold bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>
                              {child.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-gray-900/50">
          <p className="text-[10px] text-gray-600 px-4">
            &copy; {new Date().getFullYear()} Creative Solutions Partners
          </p>
        </div>
      </div>
    </>
  );
};
