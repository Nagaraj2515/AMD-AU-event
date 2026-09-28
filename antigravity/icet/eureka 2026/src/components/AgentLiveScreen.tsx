import React from 'react';
import type { AgentState, AgentLog } from '../types';
import { Cpu, CheckCircle2, Loader2, Clock, Terminal, ChevronRight } from 'lucide-react';

interface AgentLiveScreenProps {
  agentStates: AgentState[];
  agentLogs: AgentLog[];
  activeAgent?: string;
  isFinished: boolean;
  onProceedToResults: () => void;
}

export const AgentLiveScreen: React.FC<AgentLiveScreenProps> = ({
  agentStates,
  agentLogs,
  isFinished,
  onProceedToResults
}) => {
  const completedCount = agentStates.filter((s) => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / agentStates.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Live Agent Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold mb-2">
              <Cpu className="w-3.5 h-3.5 animate-spin" />
              <span>LIVE MULTI-AGENT COLLABORATION PIPELINE</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              AI Agents Orchestrating Your Rescue Plan
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Specialized LLM agents analyzing vehicle diagnostics, GPS coordinates, mechanic availability, and safety advisories in real-time.
            </p>
          </div>

          {/* Action button once finished */}
          {isFinished ? (
            <button
              onClick={onProceedToResults}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black rounded-2xl text-sm flex items-center gap-2 shadow-xl shadow-emerald-500/20 animate-bounce cursor-pointer active:scale-95"
            >
              <span>VIEW RECOMMENDED RESCUE OPTIONS</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/90 rounded-2xl border border-slate-800">
              <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
              <span className="text-xs font-mono font-bold text-amber-300">Agents Collaborating ({progressPercent}%)</span>
            </div>
          )}
        </div>

        {/* Dynamic Pipeline Progress Bar */}
        <div className="mt-6 space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono font-bold text-slate-400">
            <span>PIPELINE EXECUTION PROGRESS</span>
            <span className="text-amber-400">{completedCount} / {agentStates.length} AGENTS READY</span>
          </div>
          <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid of 8 Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agentStates.map((agent) => {
          const isCompleted = agent.status === 'completed';
          const isWorking = agent.status === 'working';
          const isWaiting = agent.status === 'waiting';

          return (
            <div
              key={agent.name}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isWorking
                  ? 'bg-amber-500/10 border-amber-500 text-white ring-2 ring-amber-500/40 shadow-lg shadow-amber-500/10 scale-102'
                  : isCompleted
                  ? 'glass-card border-slate-700/80 text-white'
                  : 'bg-slate-900/40 border-slate-800/60 opacity-60 text-slate-400'
              }`}
            >
              <div className="space-y-3">
                {/* Agent Card Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-black uppercase tracking-wider text-slate-300">
                    {agent.name}
                  </span>

                  {/* Status Indicator Badge */}
                  {isCompleted && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Completed</span>
                    </span>
                  )}

                  {isWorking && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40 animate-pulse">
                      <Loader2 className="w-3 h-3 animate-spin text-amber-400" />
                      <span>Working...</span>
                    </span>
                  )}

                  {isWaiting && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>Waiting</span>
                    </span>
                  )}
                </div>

                {/* Agent Output Summary */}
                <p className={`text-xs leading-relaxed ${isCompleted ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>
                  {agent.summary}
                </p>
              </div>

              {/* Execution Duration Footnote */}
              {agent.durationMs && (
                <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>LATENCY</span>
                  <span className="text-amber-400 font-bold">{agent.durationMs} ms</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Agent Activity Terminal Log Feed */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>AGENT ACTIVITY STREAM & INTERMEDIATE REASONING LOGS</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">STREAMING JSON EVENTS</span>
        </div>

        <div className="h-48 overflow-y-auto font-mono text-xs space-y-2 pr-2">
          {agentLogs.length === 0 ? (
            <div className="text-slate-500 italic text-center pt-8">Initializing agent event stream...</div>
          ) : (
            agentLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-1.5 rounded hover:bg-slate-900/50">
                <span className="text-[10px] text-slate-500 shrink-0 mt-0.5">{log.timestamp}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 bg-slate-800 text-amber-300 border border-slate-700">
                  {log.agent}
                </span>
                <span className={`text-xs leading-tight ${
                  log.type === 'success' ? 'text-emerald-400' : log.type === 'warn' ? 'text-amber-300' : 'text-slate-300'
                }`}>
                  {log.message}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
