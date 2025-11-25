import React from 'react';
import { AppView, Language } from '../types';
import { TRANSLATIONS, MOCK_NOTIFICATIONS } from '../constants';
import { ArrowRight, AlertCircle, Calendar, CreditCard, Heart, ShoppingBag, FileText, Bus, Languages, Bell } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  language: Language;
  onViewChange: (view: AppView) => void;
}

const TINY_CHART_DATA = [
  { val: 1300 }, { val: 1310 }, { val: 1305 }, { val: 1325 }, { val: 1340 }, { val: 1335 }, { val: 1350 }
];

export const Dashboard: React.FC<DashboardProps> = ({ language, onViewChange }) => {
  const t = TRANSLATIONS;

  const services = [
    { id: 'visa', icon: AlertCircle, color: 'bg-purple-100 text-purple-600', label: t.service_visa[language] },
    { id: 'transport', icon: Bus, color: 'bg-blue-100 text-blue-600', label: t.service_transport[language] },
    { id: 'wallet', icon: CreditCard, color: 'bg-green-100 text-green-600', label: t.service_wallet[language] },
    { id: 'medical', icon: Heart, color: 'bg-red-100 text-red-600', label: t.service_medical[language] },
    { id: 'shopping', icon: ShoppingBag, color: 'bg-pink-100 text-pink-600', label: t.service_shopping[language] },
    { id: 'community', icon: Calendar, color: 'bg-orange-100 text-orange-600', label: t.service_community[language] },
    { id: 'translator', icon: Languages, color: 'bg-indigo-100 text-indigo-600', label: t.service_translator[language] },
    { id: 'admin', icon: FileText, color: 'bg-gray-200 text-gray-700', label: t.service_admin[language] },
  ];

  return (
    <div className="p-4 space-y-6">
      
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-brand-blue to-blue-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="relative z-10">
            <h1 className="text-xl font-bold mb-1">{t.greeting[language]}</h1>
            <p className="text-blue-100 text-xs mb-3 opacity-90 pr-8">
              {language === 'vi' ? 'Chào mừng bạn đến với Hàn Quốc.' : 'Welcome to your life in Korea.'}
            </p>
            <button 
              onClick={() => onViewChange('visa')}
              className="bg-brand-yellow text-brand-blue px-3 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-yellow-300 transition-colors flex items-center space-x-1 w-fit"
            >
              <span>{t.askBot[language]}</span>
              <ArrowRight size={14} />
            </button>
        </div>
      </div>

      {/* 8 Core Services Grid */}
      <div>
        <h3 className="font-bold text-gray-800 mb-3 px-1">{t.services[language] || 'Services'}</h3>
        <div className="grid grid-cols-4 gap-y-4 gap-x-2">
          {services.map((item) => {
              const Icon = item.icon;
              return (
                  <button 
                      key={item.id} 
                      onClick={() => onViewChange(item.id as AppView)}
                      className="flex flex-col items-center space-y-2 group"
                  >
                      <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform border border-white/50`}>
                          <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-medium text-gray-700 text-center leading-tight px-1">{item.label}</span>
                  </button>
              )
          })}
        </div>
      </div>

      {/* Timeline / Notifications Widget - Reduced Size (1/3) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-2 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                <Bell size={14} className="text-brand-blue"/> {t.timelineTitle[language]}
            </h3>
            <span className="text-[10px] text-brand-blue font-medium">{t.viewAll[language]}</span>
        </div>
        {/* Limited to 2 items max to keep it small (approx 1/3 visually of main screen) */}
        <div className="divide-y divide-gray-100 max-h-32 overflow-y-auto">
            {MOCK_NOTIFICATIONS.slice(0, 2).map((note) => (
                <div key={note.id} className="p-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${note.type === 'visa' ? 'bg-red-500' : 'bg-brand-blue'}`}></div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                            <p className="text-xs font-bold text-gray-800 truncate">{note.title}</p>
                            <p className="text-[10px] text-gray-400">{note.date}</p>
                        </div>
                        <p className="text-[10px] text-gray-500 truncate">{note.message}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Mini Exchange Rate Preview (Optional filler) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex items-center justify-between" onClick={() => onViewChange('wallet')}>
        <div className="flex flex-col">
             <span className="text-[10px] text-gray-500">USD/KRW</span>
             <div className="font-bold text-base text-gray-900">₩1,350 <span className="text-green-500 text-[10px] font-normal ml-1">+1.2%</span></div>
        </div>
        <div className="h-8 w-24">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TINY_CHART_DATA}>
                    <Line type="monotone" dataKey="val" stroke="#0047A0" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};