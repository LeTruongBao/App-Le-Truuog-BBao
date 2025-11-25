import React, { useState } from 'react';
import { Language } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, ScanLine, Wallet as WalletIcon, RefreshCw, ArrowRight } from 'lucide-react';

interface WalletProps {
  language: Language;
}

const EXCHANGE_DATA = [
    { name: 'Mon', rate: 1340 },
    { name: 'Tue', rate: 1345 },
    { name: 'Wed', rate: 1330 },
    { name: 'Thu', rate: 1355 },
    { name: 'Fri', rate: 1360 },
    { name: 'Sat', rate: 1358 },
    { name: 'Sun', rate: 1365 },
];

const CURRENCIES = [
    { code: 'KRW', label: 'KRW', flag: '🇰🇷' },
    { code: 'VND', label: 'VND', flag: '🇻🇳' },
    { code: 'CNY', label: 'CNY', flag: '🇨🇳' },
    { code: 'USD', label: 'USD', flag: '🇺🇸' },
];

// Mock conversion rates relative to USD (Base 1)
const RATES: {[key: string]: number} = {
    'USD': 1,
    'KRW': 1365.50,
    'VND': 25450.00,
    'CNY': 7.24
};

export const Wallet: React.FC<WalletProps> = ({ language }) => {
  const [amount, setAmount] = useState<string>('10000');
  const [fromCurr, setFromCurr] = useState('KRW');
  const [toCurr, setToCurr] = useState('VND');

  const convertCurrency = () => {
    const val = parseFloat(amount);
    if (isNaN(val)) return '0';
    
    // Convert to USD first (Base), then to Target
    // AmountInUSD = Amount / RateFrom
    // Target = AmountInUSD * RateTo
    const inUSD = val / RATES[fromCurr];
    const result = inUSD * RATES[toCurr];

    // Formatting based on currency
    if (toCurr === 'VND' || toCurr === 'KRW') {
        return result.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }
    return result.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  return (
    <div className="p-4 space-y-6 bg-wild-blue/20">
      <h2 className="text-xl font-bold text-gray-900 mb-4">My Wallet</h2>

      {/* Card Visual */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Balance</p>
                <h3 className="text-3xl font-bold">₩ 2,450,000</h3>
            </div>
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <WalletIcon className="text-brand-yellow" />
            </div>
        </div>
        <div className="flex space-x-4 relative z-10">
            <button className="flex-1 bg-brand-blue py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2">
                <ScanLine size={16}/> Pay
            </button>
            <button className="flex-1 bg-white/10 py-2 rounded-lg text-sm font-semibold hover:bg-white/20 transition flex items-center justify-center gap-2">
                <RefreshCw size={16}/> Top Up
            </button>
        </div>
      </div>

      {/* Currency Converter */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <RefreshCw size={16} className="text-brand-blue"/> Currency Converter
          </h3>
          
          <div className="flex items-center gap-2 mb-4">
             <div className="flex-1">
                 <label className="text-xs text-gray-500 font-bold ml-1 mb-1 block">From</label>
                 <div className="flex bg-gray-50 rounded-lg border border-gray-200 p-2">
                     <select 
                        value={fromCurr}
                        onChange={(e) => setFromCurr(e.target.value)}
                        className="bg-transparent font-bold text-gray-800 outline-none mr-2"
                     >
                         {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                     </select>
                     <input 
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-transparent text-right outline-none font-mono"
                     />
                 </div>
             </div>
          </div>
          
          <div className="flex justify-center -my-3 relative z-10">
              <div className="bg-white border border-gray-100 rounded-full p-1.5 shadow-sm text-gray-400">
                  <ArrowRight size={16} className="rotate-90"/>
              </div>
          </div>

          <div className="flex items-center gap-2 mt-1">
             <div className="flex-1">
                 <label className="text-xs text-gray-500 font-bold ml-1 mb-1 block">To</label>
                 <div className="flex bg-brand-blue/5 rounded-lg border border-brand-blue/20 p-3 items-center justify-between">
                     <select 
                        value={toCurr}
                        onChange={(e) => setToCurr(e.target.value)}
                        className="bg-transparent font-bold text-brand-blue outline-none mr-2"
                     >
                         {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                     </select>
                     <span className="font-bold text-xl text-brand-blue font-mono">{convertCurrency()}</span>
                 </div>
             </div>
          </div>
      </div>

      {/* Exchange Rate Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h3 className="font-bold text-gray-800">USD to KRW</h3>
                <p className="text-xs text-gray-500">Live Rate</p>
            </div>
            <div className="text-right">
                <p className="text-lg font-bold text-gray-900">1,365</p>
                <p className="text-xs text-green-500 flex items-center justify-end">
                    <ArrowUpRight size={12} className="mr-0.5"/> +0.8%
                </p>
            </div>
        </div>
        
        <div className="h-48 w-full -ml-2">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={EXCHANGE_DATA}>
                    <defs>
                        <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0047A0" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#0047A0" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#aaa'}} />
                    <YAxis domain={['dataMin - 20', 'dataMax + 20']} hide />
                    <Tooltip 
                        contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                    />
                    <Area type="monotone" dataKey="rate" stroke="#0047A0" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};