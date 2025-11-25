import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Wallet } from './components/Wallet';
import { VisaChatbot } from './components/VisaChatbot';
import { Transport } from './components/Transport';
import { Translator } from './components/Translator';
import { Community } from './components/Community';
import { ServiceMenu } from './components/ServiceMenu';
import { AppView, Language } from './types';
import { TRANSLATIONS, MEDICAL_LINKS, SHOPPING_LINKS, ADMIN_LINKS } from './constants';
import { Heart, ShoppingBag, FileText } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [language, setLanguage] = useState<Language>('en');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard language={language} onViewChange={setCurrentView} />;
      case 'wallet':
        return <Wallet language={language} />;
      case 'visa':
        return <VisaChatbot language={language} />;
      case 'transport':
        return <Transport language={language} />;
      case 'translator':
        return <Translator language={language} />;
      case 'community':
        return <Community language={language} />;
      case 'medical':
        return <ServiceMenu 
            language={language} 
            title={TRANSLATIONS.service_medical[language]} 
            links={MEDICAL_LINKS}
            icon={Heart}
            colorClass="text-red-500"
        />;
      case 'shopping':
        return <ServiceMenu 
            language={language} 
            title={TRANSLATIONS.service_shopping[language]} 
            links={SHOPPING_LINKS}
            icon={ShoppingBag}
            colorClass="text-pink-500"
        />;
      case 'admin':
        return <ServiceMenu 
            language={language} 
            title={TRANSLATIONS.service_admin[language]} 
            links={ADMIN_LINKS}
            icon={FileText}
            colorClass="text-gray-700"
        />;
      default:
        return <Dashboard language={language} onViewChange={setCurrentView} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setCurrentView={setCurrentView} 
      language={language}
      setLanguage={setLanguage}
    >
      {renderView()}
    </Layout>
  );
};

export default App;