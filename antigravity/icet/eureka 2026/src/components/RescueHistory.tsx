import React from 'react';
import type { IncidentHistoryItem } from '../types';
import { History, CheckCircle2, Star, Download, MapPin, Calendar } from 'lucide-react';
import { MOCK_HISTORY_ITEMS } from '../services/mockData';

export const RescueHistory: React.FC = () => {
  const historyList: IncidentHistoryItem[] = MOCK_HISTORY_ITEMS;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
            <History className="w-4 h-4" />
            <span>INCIDENT LOG & INVOICE REPOSITORY</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Rescue Incident History</h2>
          <p className="text-xs text-slate-300">View past roadside assistance requests, provider costs, and resolution receipts.</p>
        </div>
      </div>

      <div className="space-y-4">
        {historyList.map((item) => (
          <div
            key={item.id}
            className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{item.status}</span>
                </span>
                <span className="text-xs font-mono text-slate-400">{item.id}</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span>{item.date}</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{item.problem}</span>
                  <span className="text-xs text-slate-400 font-normal">({item.vehicle})</span>
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.location}</span>
                </p>
              </div>

              <div className="text-xs text-slate-300 flex items-center gap-4">
                <span>Provider: <strong className="text-white">{item.providerName}</strong></span>
                {item.ratingGiven && (
                  <span className="text-amber-400 font-bold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{item.ratingGiven}.0 / 5</span>
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
              <div className="text-xl font-black font-mono text-amber-400">₹{item.cost}</div>
              <button
                onClick={() => alert(`Downloading official PDF Invoice receipt for incident ${item.id}`)}
                className="px-3.5 py-1.5 glass-panel hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Receipt</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
