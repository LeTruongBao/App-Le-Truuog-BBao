import React from 'react';
import { Language, LinkItem } from '../types';
import { ExternalLink, Globe, ChevronRight } from 'lucide-react';

interface ServiceMenuProps {
  language: Language;
  title: string;
  links: LinkItem[];
  icon?: React.ElementType;
  colorClass?: string;
}

export const ServiceMenu: React.FC<ServiceMenuProps> = ({ language, title, links, icon: Icon, colorClass = "text-brand-blue" }) => {
  return (
    <div className="flex flex-col h-full bg-wild-blue/20">
      <div className="p-5 bg-white shadow-sm z-10 sticky top-0 border-b border-gray-100">
        <h2 className={`text-xl font-bold flex items-center gap-2 ${colorClass}`}>
          {Icon && <Icon className="fill-current opacity-20 absolute" size={40} />}
          {Icon && <Icon className="relative z-10" size={24} />}
          <span className="relative z-10 text-gray-900">{title}</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1 relative z-10">
           {language === 'vi' ? 'Chọn dịch vụ để truy cập' : 'Select a service to access'}
        </p>
      </div>

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        {links.map((link, index) => (
          <a 
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-blue/30 transition-all group relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-gray-50 rounded-bl-full -mr-5 -mt-5 group-hover:to-brand-blue/5 transition-colors`}></div>

            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-brand-blue group-hover:text-white transition-colors shadow-inner">
                   {link.icon ? <link.icon size={24} /> : <Globe size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-brand-blue transition-colors text-lg">
                    {link.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    {link.description[language] || link.description['en']}
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};