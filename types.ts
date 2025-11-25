export type AppView = 'dashboard' | 'wallet' | 'visa' | 'transport' | 'translator' | 'community' | 'medical' | 'shopping' | 'admin';

export type Language = 'en' | 'vi' | 'ko' | 'zh';

export interface Translation {
  [key: string]: {
    en: string;
    vi: string;
    ko: string;
    zh: string;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ExchangeRate {
  currency: string;
  rate: number;
  trend: 'up' | 'down' | 'stable';
}

export interface NotificationItem {
  id: string;
  type: 'visa' | 'bill' | 'medical' | 'info';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface LinkItem {
  name: string;
  url: string;
  description: {
    en: string;
    vi: string;
    ko: string;
    zh: string;
  };
  icon?: any;
}