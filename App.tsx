import React, { useEffect, useState } from 'react';
import SplineBackground from './components/SplineBackground';
import { fetchGoldPrice } from './services/goldService';
import { PriceState } from './types';
import { StatCard } from './components/StatCard';

// Icons
const ArrowUpIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const RefreshIcon = ({ spin }: { spin: boolean }) => (
  <svg className={`w-5 h-5 ${spin ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const App: React.FC = () => {
  const [goldState, setGoldState] = useState<PriceState>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setGoldState(prev => ({ ...prev, loading: true }));
    try {
      const data = await fetchGoldPrice();
      setGoldState({ data, loading: false, error: null });
    } catch (err) {
      setGoldState({ data: null, loading: false, error: 'Failed to fetch data' });
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  const isPositive = goldState.data ? goldState.data.ch >= 0 : true;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white selection:bg-purple-500/30">
      
      {/* 3D Background Layer */}
      <SplineBackground />

      {/* Main Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
        
        {/* Header / Nav */}
        <header className="flex justify-between items-center p-8 md:p-12 w-full pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 animate-pulse" />
            <span className="font-display font-bold text-xl tracking-widest">AURUM FLOW</span>
          </div>
          
          <button 
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-md hover:bg-white/10 transition-all text-sm font-medium text-white/80"
          >
            <RefreshIcon spin={goldState.loading} />
            <span className="hidden md:inline">SYNC DATA</span>
          </button>
        </header>

        {/* Hero Section - Centered/Top */}
        <main className="flex flex-col items-center justify-center flex-grow text-center px-4 -mt-20">
          
          <div className="mb-4">
             <span className="px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
                Live Market Data
             </span>
          </div>

          <h1 className="font-display font-bold text-7xl md:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-2 drop-shadow-2xl">
            {goldState.loading ? "LOADING..." : formatCurrency(goldState.data?.price || 0)}
          </h1>

          <div className={`flex items-center gap-4 text-xl md:text-2xl font-medium backdrop-blur-md px-6 py-2 rounded-2xl border border-white/5 ${isPositive ? 'bg-emerald-900/20 text-emerald-400' : 'bg-rose-900/20 text-rose-400'}`}>
            {goldState.data && (
              <>
                {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                <span>{goldState.data.ch > 0 ? '+' : ''}{goldState.data.ch} ({goldState.data.chp}%)</span>
              </>
            )}
          </div>
          
          <p className="mt-8 text-gray-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
            Real-time volatility tracking of XAU/USD. 
            Experience the fluidity of the market through immersive visualization.
          </p>

        </main>

        {/* Footer / Stats Grid */}
        <footer className="w-full p-6 md:p-12 pointer-events-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
            <StatCard 
              label="Open Price" 
              value={goldState.loading ? "-" : formatCurrency(goldState.data?.open_price || 0)} 
              delay={100}
              icon="🇺🇸"
            />
            <StatCard 
              label="Daily High" 
              value={goldState.loading ? "-" : formatCurrency(goldState.data?.high_price || 0)} 
              trend="up"
              delay={200}
              icon="🇺🇸"
            />
            <StatCard 
              label="Daily Low" 
              value={goldState.loading ? "-" : formatCurrency(goldState.data?.low_price || 0)} 
              trend="down"
              delay={300}
              icon="🇺🇸"
            />
            <StatCard 
              label="24K Gram" 
              value={goldState.loading ? "-" : `$${goldState.data?.price_gram_24k || 0}`} 
              subValue="/g"
              trend="neutral"
              delay={400}
              icon="🇺🇸"
            />
          </div>
          
          <div className="mt-8 flex justify-between items-end text-xs text-gray-600 font-mono">
            <div>
              <p>DATA PROVIDER: GOLDAPI.IO</p>
              <p>ID: XAU-USD-STREAM-01</p>
            </div>
            <div className="text-right">
               <p>LAST UPDATE</p>
               <p>{goldState.data ? new Date(goldState.data.timestamp * 1000).toLocaleTimeString() : "--:--"}</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;