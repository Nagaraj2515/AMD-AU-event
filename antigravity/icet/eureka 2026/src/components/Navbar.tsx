import React from 'react';
import { ShieldAlert, Car, History, Activity, Zap } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'request' | 'tracking' | 'history' | 'admin' | 'providers';
  setCurrentTab: (tab: 'home' | 'request' | 'tracking' | 'history' | 'admin' | 'providers') => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  onEmergencyClick: () => void;
  hasActiveRescue: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  isDemoMode,
  setIsDemoMode,
  onEmergencyClick,
  hasActiveRescue
}) => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Car className="w-5 h-5 text-slate-950 font-bold" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-slate-950 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                RoadRescue
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-md">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Multi-Agent Roadside Intelligence</p>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'home'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setCurrentTab('request')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'request'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Get Help
          </button>

          {hasActiveRescue && (
            <button
              onClick={() => setCurrentTab('tracking')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'tracking'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/30'
              }`}
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Live Tracking
            </button>
          )}

          <button
            onClick={() => setCurrentTab('history')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentTab === 'history'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            History
          </button>

          <button
            onClick={() => setCurrentTab('admin')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentTab === 'admin'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Admin
          </button>
        </nav>

        {/* Right Action Controls: Emergency SOS & Mode Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Emergency SOS Button */}
          <button
            onClick={onEmergencyClick}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/30 border border-red-500/50 animate-emergency-glow transition-all active:scale-95"
            title="Trigger Immediate Police/Hospital Emergency Alert"
          >
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>SOS</span>
          </button>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-[11px]">
            <button
              onClick={() => setIsDemoMode(true)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                isDemoMode 
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3 h-3" />
              DEMO
            </button>
            <button
              onClick={() => setIsDemoMode(false)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                !isDemoMode 
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              LIVE
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
