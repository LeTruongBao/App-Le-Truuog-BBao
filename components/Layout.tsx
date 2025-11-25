import React, { useState } from 'react';
import { AppView, Language } from '../types';
import { Home, Wallet, MessageCircle, Bus, Languages, Menu, Bell } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  setCurrentView,
  language,
  setLanguage
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'transport', icon: Bus, label: 'Move' },
    { id: 'wallet', icon: Wallet, label: 'Pay' },
    { id: 'visa', icon: MessageCircle, label: 'Visa' },
    { id: 'translator', icon: Languages, label: 'Trans' },
  ];

  const getFlag = (lang: Language) => {
    switch(lang) {
      case 'vi': return '🇻🇳';
      case 'ko': return '🇰🇷';
      case 'zh': return '🇨🇳';
      default: return '🇺🇸';
    }
  };

  const getLangLabel = (lang: Language) => {
    return lang === 'zh' ? 'CN' : lang.toUpperCase();
  };

  return (
    <div className="flex flex-col h-screen bg-wild-blue/20 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-200/50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex justify-between items-center shadow-sm z-20">
        <div className="flex items-center space-x-3">
           {/* Logo adjusted: w-14 h-14 with Artistic K */}
           <div className="w-14 h-14 bg-brand-blue rounded-xl flex items-center justify-center text-white border-4 border-brand-yellow shadow-md overflow-hidden">
             <span className="font-artistic text-4xl relative top-1 mr-0.5">K</span>
             <span className="font-bold text-2xl">+</span>
           </div>
           <div className="flex flex-col">
             <span className="font-bold text-brand-blue tracking-tight text-xl leading-tight">KOREA</span>
             <span className="font-bold text-gray-900 tracking-tight text-xl leading-tight">CONNECT</span>
           </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative text-gray-500 hover:text-brand-blue transition-colors">
            <Bell size={24} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-1 text-sm font-medium bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
            >
              <span className="text-lg">{getFlag(language)}</span>
              <span className="uppercase text-xs font-bold text-gray-600">{getLangLabel(language)}</span>
            </button>
            
            {/* Dropdown for language */}
            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsLangOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 z-40 animate-in fade-in slide-in-from-top-2">
                  {(['en', 'vi', 'ko', 'zh'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLanguage(l);
                        setIsLangOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center justify-between border-b border-gray-50 last:border-0"
                    >
                      <span className="uppercase font-semibold">{getLangLabel(l)}</span>
                      <span className="text-lg">{getFlag(l)}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-20 no-scrollbar bg-wild-blue/20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 py-2 px-2 flex justify-around items-center z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as AppView)}
              className={`flex flex-col items-center space-y-1 w-16 transition-all duration-200 ${
                isActive ? 'text-brand-blue -translate-y-1' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-brand-blue/10' : 'bg-transparent'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};