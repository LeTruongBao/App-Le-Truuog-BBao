import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { getTransportRoute, reverseGeocode } from '../services/geminiService';
import { MapPin, Navigation, Bus, Train, Loader2, Map } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface TransportProps {
  language: Language;
}

export const Transport: React.FC<TransportProps> = ({ language }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [routeInfo, setRouteInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    // Auto-detect location on mount
    handleAutoLocate();
  }, []);

  const handleAutoLocate = () => {
    if (!navigator.geolocation) return;
    
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Use Gemini to reverse geocode because we don't have a Maps API key for Geocoding
        const address = await reverseGeocode(latitude, longitude, language);
        if (address) {
          setFrom(address);
        } else {
          setFrom(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
        setLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocating(false);
      }
    );
  };

  const handleSearch = async () => {
    if (!from || !to) return;
    setLoading(true);
    setRouteInfo(null);
    try {
        const result = await getTransportRoute(from, to, language);
        setRouteInfo(result || "No route found.");
    } catch (e) {
        setRouteInfo("Error finding route.");
    } finally {
        setLoading(false);
    }
  };

  const openMap = () => {
    // Open Google Maps with language preference
    const mapUrl = `https://www.google.com/maps?hl=${language}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-wild-blue/20">
        <div className="bg-white p-4 shadow-sm z-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Navigation className="text-brand-blue"/> Transport AI
            </h2>
            
            <div className="space-y-3">
                <div className="relative">
                    <div className="absolute left-3 top-3 text-brand-blue flex items-center h-5">
                         {locating ? <Loader2 size={16} className="animate-spin"/> : <div className="w-2 h-2 rounded-full border-2 border-brand-blue"></div>}
                    </div>
                    <input 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all"
                        placeholder={locating ? "Locating..." : "Start Location (e.g. Current Location)"}
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <div className="absolute left-3 top-3 text-red-500 flex items-center h-5">
                         <MapPin size={16} fill="currentColor" className="text-red-500"/>
                    </div>
                    <input 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-12 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all"
                        placeholder="Destination"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                    <button 
                        onClick={openMap}
                        className="absolute right-2 top-2 p-1.5 text-gray-400 hover:text-brand-blue bg-white rounded-lg shadow-sm border border-gray-100"
                        title="Pick on Map"
                    >
                        <Map size={16} />
                    </button>
                </div>
                
                <button 
                    onClick={handleSearch}
                    disabled={loading || !from || !to}
                    className="w-full bg-brand-blue text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 flex justify-center items-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin"/> : <SearchLabel language={language}/>}
                </button>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
            {routeInfo ? (
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 prose prose-sm max-w-none">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Bus className="text-green-600"/> Recommended Route
                    </h3>
                    <div className="markdown-body text-gray-600">
                        <ReactMarkdown>{routeInfo}</ReactMarkdown>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-80">
                    <Train size={64} strokeWidth={1} className="mb-4 text-brand-blue"/>
                    <p className="text-sm font-medium">Enter locations to get AI routing.</p>
                </div>
            )}
        </div>
    </div>
  );
};

const SearchLabel = ({language}: {language: Language}) => {
    switch(language) {
        case 'vi': return <>Tìm đường</>;
        case 'ko': return <>길 찾기</>;
        case 'zh': return <>寻找路线</>;
        default: return <>Find Route</>;
    }
}