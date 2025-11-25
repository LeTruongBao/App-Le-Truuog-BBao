import React from 'react';
import { Language } from '../types';
import { COMMUNITY_LINKS, TRANSLATIONS } from '../constants';
import { ExternalLink, Users, Globe } from 'lucide-react';

interface CommunityProps {
  language: Language;
}

export const Community: React.FC<CommunityProps> = ({ language }) => {
  return (
    <div className="flex flex-col h-full bg-wild-blue/20">
      <div className="p-5 bg-white shadow-sm z-10 sticky top-0">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="text-brand-blue" />
          {TRANSLATIONS.service_community[language]}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
            {language === 'vi' ? 'Các trang web hữu ích cho cuộc sống tại Hàn Quốc' : 'Useful websites for foreigners in Korea'}
        </p>
      </div>

      <div className="p-4 space-y-4">
        {COMMUNITY_LINKS.map((link, index) => (
          <a 
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-blue/30 transition-all group"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-brand-blue transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {link.description[language] || link.description['en']}
                  </p>
                  <span className="text-xs text-gray-400 mt-2 block font-mono">
                    {link.url.replace('https://', '')}
                  </span>
                </div>
              </div>
              <ExternalLink size={16} className="text-gray-300 group-hover:text-brand-blue" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};