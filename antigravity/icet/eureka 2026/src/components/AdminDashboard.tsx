import React from 'react';
import { Activity, Car, Users, Clock, DollarSign, CheckCircle2, TrendingUp, BarChart3 } from 'lucide-react';
import { MOCK_SERVICE_PROVIDERS } from '../services/mockData';

export const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Rescue Requests', value: '1,420', change: '+12% this week', icon: Car, color: 'text-amber-400' },
    { label: 'Active Rescues Now', value: '18', change: '8 dispatched, 10 on way', icon: Activity, color: 'text-emerald-400' },
    { label: 'Available Technicians', value: '42 / 50', change: '84% online', icon: Users, color: 'text-blue-400' },
    { label: 'Avg Response Time', value: '8.4 Mins', change: '-1.2 min vs target', icon: Clock, color: 'text-purple-400' },
    { label: 'Completed Rescues', value: '1,398', change: '98.4% success rate', icon: CheckCircle2, color: 'text-emerald-400' },
    { label: 'Total Platform Revenue', value: '₹4,85,200', change: '+18.5% YoY', icon: DollarSign, color: 'text-amber-400' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
            <Activity className="w-4 h-4" />
            <span>OPERATIONS COMMAND CENTER</span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1">Admin Dashboard</h2>
          <p className="text-xs text-slate-300">Real-time platform metrics, active dispatch monitor & technician analytics.</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ALL SYSTEMS OPERATIONAL</span>
        </div>
      </div>

      {/* 6 Metric Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-medium">{s.label}</span>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="text-2xl font-black font-mono text-white tracking-tight">{s.value}</div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span>{s.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics & Active Rescue Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Dispatch Grid (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Car className="w-4 h-4 text-amber-400" />
              <span>Active Rescue Dispatch Feed</span>
            </h3>
            <span className="text-xs font-mono text-amber-400">18 ACTIVE NOW</span>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {MOCK_SERVICE_PROVIDERS.map((p, idx) => (
              <div key={p.id} className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{p.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">REQ-{8890 + idx}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Tech: {p.technicianName} • Vehicle: {p.vehicle}</div>
                </div>

                <div className="text-right space-y-1">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                    DISPATCHED (ETA {p.etaMinutes}m)
                  </span>
                  <div className="text-[10px] text-slate-400">{p.address.split(',')[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown Charts (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <span>Problem Distribution</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">THIS MONTH</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Battery / Dead Battery</span>
                <span className="font-mono font-bold text-amber-400">42% (596 req)</span>
              </div>
              <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Flat Tyre / Puncture</span>
                <span className="font-mono font-bold text-blue-400">28% (397 req)</span>
              </div>
              <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Engine / Mechanical</span>
                <span className="font-mono font-bold text-orange-400">18% (255 req)</span>
              </div>
              <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '18%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Fuel Shortage & Other</span>
                <span className="font-mono font-bold text-emerald-400">12% (172 req)</span>
              </div>
              <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '12%' }} />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
