import React from 'react';
import { Play, ShieldAlert, Sparkles } from 'lucide-react';

interface HeroProps {
  onGetHelpClick: () => void;
  onDemoPresetClick: () => void;
  onEmergencyClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onGetHelpClick,
  onDemoPresetClick,
  onEmergencyClick
}) => {
  return (
    <section className="relative pt-8 pb-16 overflow-hidden">
      
      {/* Background Decorative Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Multi-Agent AI Roadside Intelligence</span>
            </div>

            {/* Main Pitch Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Stranded on the road? <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                Let AI find your rescue.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              When your vehicle breaks down, don’t panic. 8 collaborative AI agents work simultaneously to diagnose issues, locate verified mechanics, estimate fair prices, and dispatch rapid emergency assistance in minutes.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onGetHelpClick}
                className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold rounded-2xl shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2.5 text-base"
              >
                <span>🚗 GET HELP NOW</span>
              </button>

              <button
                onClick={onDemoPresetClick}
                className="px-6 py-3.5 glass-card hover:bg-slate-800/90 text-white font-bold rounded-2xl border border-slate-700 transition-all flex items-center gap-2 text-sm shadow-md"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>1-Click Pitch Scenario (Activa)</span>
              </button>

              <button
                onClick={onEmergencyClick}
                className="px-5 py-3.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 font-bold rounded-2xl border border-red-800/80 transition-all flex items-center gap-2 text-sm"
              >
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>Emergency SOS</span>
              </button>
            </div>

            {/* Live Stats Row */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="text-2xl font-black text-amber-400">8 Mins</div>
                <div className="text-xs text-slate-400 font-medium">Avg Arrival Time</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400">8 AI Agents</div>
                <div className="text-xs text-slate-400 font-medium">Orchestrated Pipeline</div>
              </div>
              <div>
                <div className="text-2xl font-black text-blue-400">24/7 GPS</div>
                <div className="text-xs text-slate-400 font-medium">Verified Mechanics</div>
              </div>
            </div>

          </div>

          {/* Right Visual Dashboard Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-amber-500/30 via-slate-800/50 to-slate-900/80 shadow-2xl">
              <div className="bg-slate-950/90 rounded-[22px] overflow-hidden border border-slate-800 p-5 space-y-4">
                
                {/* Simulated Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="w-3 h-3 bg-amber-500 rounded-full" />
                    <span className="w-3 h-3 bg-emerald-500 rounded-full" />
                    <span className="text-xs font-mono text-slate-400 ml-2">RoadRescue Agent Stream</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    SYSTEM READY
                  </span>
                </div>

                {/* Hero Vehicle Image Visual */}
                <div className="relative h-48 rounded-xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
                    alt="Stranded Vehicle"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs">
                      <span className="text-slate-400">Current GPS: </span>
                      <span className="text-amber-400 font-semibold">Jubilee Hills, Hyderabad</span>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-500/90 text-slate-950 font-black text-[10px] uppercase rounded-md shadow">
                      Honda Activa Demo
                    </span>
                  </div>
                </div>

                {/* Simulated Agent Execution Cards Preview */}
                <div className="space-y-2">
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-slate-200">TRIAGE AGENT</span>
                    </div>
                    <span className="text-emerald-400 font-mono text-[11px]">✓ Battery Issue (Severity 2/5)</span>
                  </div>

                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-slate-200">LOCATION AGENT</span>
                    </div>
                    <span className="text-emerald-400 font-mono text-[11px]">✓ 5 Mechanics (1.2 km away)</span>
                  </div>

                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-slate-200">PRICE AGENT</span>
                    </div>
                    <span className="text-amber-400 font-mono font-bold text-[11px]">✓ ₹350 – ₹550</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
