import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { translateText } from '../services/geminiService';
import { Languages, Mic, Copy, ArrowLeftRight, Check, ChevronDown, MicOff } from 'lucide-react';

interface TranslatorProps {
  language: Language;
}

const LANGUAGES = [
  { code: 'en', label: 'English', speechCode: 'en-US' },
  { code: 'vi', label: 'Tiếng Việt', speechCode: 'vi-VN' },
  { code: 'ko', label: '한국어', speechCode: 'ko-KR' },
  { code: 'zh', label: '中文', speechCode: 'zh-CN' }
];

export const Translator: React.FC<TranslatorProps> = ({ language }) => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const [sourceLang, setSourceLang] = useState<string>('en');
  const [targetLang, setTargetLang] = useState<string>('ko');

  // Use a ref to keep track of the recognition instance across renders
  const recognitionRef = useRef<any>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setLoading(true);
    try {
        const targetLangLabel = LANGUAGES.find(l => l.code === targetLang)?.label || targetLang;
        const result = await translateText(sourceText, targetLangLabel);
        setTranslatedText(result || '');
    } finally {
        setLoading(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const copyToClipboard = () => {
    if (translatedText) {
        navigator.clipboard.writeText(translatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleListening = () => {
    // If already listening, stop it.
    if (isListening) {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            // We do not set isListening(false) here immediately; 
            // we rely on the onend event to ensure state sync.
        }
        return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Your browser does not support voice input.");
        return;
    }

    try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        
        const langObj = LANGUAGES.find(l => l.code === sourceLang);
        recognition.lang = langObj?.speechCode || 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
            recognitionRef.current = null;
        };
        
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            // Append if there is existing text, or replace? 
            // Usually for a fresh voice command, replacing or appending with space is good.
            // Here we append with space.
            setSourceText((prev) => prev ? prev + ' ' + transcript : transcript);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            // 'aborted' happens if we stop it manually, so we can ignore alerting for it.
            if (event.error === 'not-allowed') {
                alert("Microphone access denied.");
            }
            if (event.error !== 'aborted') {
                setIsListening(false);
            }
        };

        recognition.start();
    } catch (e) {
        console.error("Failed to start recognition", e);
        setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-wild-blue/20">
        {/* Language Selector Bar */}
        <div className="p-4 border-b bg-white flex justify-between items-center text-sm font-medium text-gray-600 gap-2 shadow-sm z-10">
            <div className="relative flex-1">
                <select 
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="w-full appearance-none bg-gray-50 rounded-lg shadow-sm border border-gray-200 py-2 pl-3 pr-8 text-center font-medium text-gray-800 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                >
                    {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <button onClick={swapLanguages} className="p-2 rounded-full hover:bg-gray-200 transition flex-shrink-0 bg-white shadow-sm border border-gray-100">
                <ArrowLeftRight size={16} className="text-brand-blue"/>
            </button>

            <div className="relative flex-1">
                <select 
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full appearance-none bg-brand-blue/5 rounded-lg shadow-sm border border-brand-blue/20 py-2 pl-3 pr-8 text-center font-medium text-brand-blue focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                >
                     {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-blue pointer-events-none" />
            </div>
        </div>

        <div className="flex-1 flex flex-col divide-y divide-gray-100 bg-white m-4 rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Input Area */}
            <div className="flex-1 p-6 relative bg-white">
                <textarea 
                    className="w-full h-full resize-none outline-none text-xl text-gray-800 placeholder-gray-300 bg-transparent"
                    placeholder={isListening ? "Listening..." : "Enter text or speak..."}
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                />
                <button 
                    onClick={toggleListening}
                    className={`absolute bottom-4 left-4 p-3 rounded-full transition shadow-sm flex items-center justify-center ${
                        isListening 
                        ? 'bg-red-500 text-white animate-pulse shadow-red-200' 
                        : 'bg-gray-100 text-gray-500 hover:text-brand-blue hover:bg-blue-50'
                    }`}
                    title="Speech Input"
                >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
            </div>

            {/* Output Area */}
            <div className="flex-1 p-6 bg-brand-blue/5 relative">
                {loading ? (
                     <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                     </div>
                ) : (
                    <p className="text-xl text-brand-blue font-medium leading-relaxed">
                        {translatedText || <span className="text-gray-300 italic">Translation...</span>}
                    </p>
                )}
                
                {translatedText && (
                    <button 
                        onClick={copyToClipboard}
                        className="absolute bottom-4 right-4 p-2 text-gray-400 hover:text-brand-blue transition flex items-center gap-1 text-xs bg-white rounded-lg shadow-sm border border-gray-100"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                )}
            </div>
        </div>
        
        <div className="px-4 pb-4">
             <button 
                onClick={handleTranslate}
                className="w-full bg-brand-blue text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                disabled={loading || !sourceText}
             >
                <Languages size={20}/>
                Translate
             </button>
        </div>
    </div>
  );
};