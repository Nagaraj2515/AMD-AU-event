import React, { useState, useEffect } from 'react';
import type { ServiceProvider, RescueStatus, RescueRequest } from '../types';
import { Car, MapPin, Phone, ShieldAlert, CheckCircle2, Clock, Play, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveTrackingProps {
  provider: ServiceProvider;
  request: RescueRequest;
  onEmergencyClick: () => void;
  onReset: () => void;
}

export const LiveTracking: React.FC<LiveTrackingProps> = ({
  provider,
  request,
  onEmergencyClick,
  onReset
}) => {
  const [status, setStatus] = useState<RescueStatus>('ON THE WAY');
  const [etaMinutes, setEtaMinutes] = useState<number>(provider.etaMinutes);
  const [techProgress, setTechProgress] = useState<number>(45);
  const [otp] = useState<string>('7842');

  const timelineSteps: RescueStatus[] = [
    'REQUESTED',
    'ACCEPTED',
    'TECHNICIAN ASSIGNED',
    'ON THE WAY',
    'ARRIVED',
    'RESOLVED'
  ];

  const currentStepIndex = timelineSteps.indexOf(status);

  useEffect(() => {
    if (status === 'ON THE WAY') {
      const interval = setInterval(() => {
        setTechProgress((prev) => {
          if (prev >= 95) {
            setStatus('ARRIVED');
            setEtaMinutes(0);
            return 100;
          }
          const next = prev + 5;
          setEtaMinutes(Math.max(1, Math.round((1 - next / 100) * provider.etaMinutes)));
          return next;
        });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [status, provider.etaMinutes]);

  const handleAdvanceStep = () => {
    if (currentStepIndex < timelineSteps.length - 1) {
      const nextStatus = timelineSteps[currentStepIndex + 1];
      setStatus(nextStatus);
      if (nextStatus === 'RESOLVED') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Heading Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>LIVE GPS RESCUE DISPATCH ACTIVE</span>
          </div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <span>Rescue is on the way!</span>
            <span className="text-2xl">🚗</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Technician <span className="text-white font-bold">{provider.technicianName}</span> is navigating to your location.
          </p>
        </div>

        {/* OTP Code Card */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-center shrink-0">
          <div className="text-[10px] text-slate-400 font-mono font-bold">VERIFICATION OTP</div>
          <div className="text-2xl font-black font-mono text-amber-400 tracking-widest">{otp}</div>
          <div className="text-[10px] text-slate-400">Share with technician upon arrival</div>
        </div>
      </div>

      {/* Interactive Map Visualizer */}
      <div className="relative h-72 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 p-4 flex flex-col justify-between">
        
        {/* Map Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
        
        {/* Floating Controls */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80 text-xs text-slate-300 font-medium">
            📍 <span className="text-white font-bold">{request.location.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAdvanceStep}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1 shadow"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Fast-Forward Status</span>
            </button>
            <button
              onClick={onEmergencyClick}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>SOS</span>
            </button>
          </div>
        </div>

        {/* Route Line & Moving Technician Icon */}
        <div className="relative z-10 my-auto px-8">
          <div className="relative h-3 bg-slate-900 rounded-full border border-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full transition-all duration-700"
              style={{ width: `${techProgress}%` }}
            />
          </div>

          {/* User Location Pin */}
          <div className="absolute left-8 -top-6 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-red-400 fill-red-400" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-1">Stranded User</span>
          </div>

          {/* Animated Technician Vehicle Marker */}
          <div
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 -ml-5"
            style={{ left: `calc(${techProgress}% + 20px)` }}
          >
            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/40 border-2 border-slate-950 animate-bounce">
              <Car className="w-5 h-5 fill-slate-950" />
            </div>
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 bg-slate-950 text-amber-400 rounded text-[9px] font-mono font-bold border border-slate-800">
              {provider.technicianName}
            </span>
          </div>
        </div>

        {/* Bottom ETA Indicator */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono">
          <div className="text-slate-400">Distance Remaining: <span className="text-amber-400 font-bold">{(provider.distanceKm * (1 - techProgress / 100)).toFixed(1)} km</span></div>
          <div className="text-slate-400">Estimated Arrival: <span className="text-emerald-400 font-bold">{etaMinutes} mins</span></div>
        </div>

      </div>

      {/* Timeline Progression Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Rescue Status Timeline</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {timelineSteps.map((stepName, idx) => {
            const isDone = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={stepName}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500/30'
                    : isDone
                    ? 'bg-slate-900 border-emerald-500/40 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-slate-400 mb-1">0{idx + 1}</div>
                <div className="text-xs font-black uppercase">{stepName}</div>
                <div className="mt-1 flex justify-center">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technician & Provider Details Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        <div className="md:col-span-8 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shrink-0">
            RK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white">{provider.technicianName}</h3>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-md border border-emerald-500/30">VERIFIED MECHANIC</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">{provider.name}</p>
            <p className="text-[11px] text-slate-400 font-mono mt-1">Vehicle: {provider.vehicle}</p>
          </div>
        </div>

        <div className="md:col-span-4 flex items-center gap-3">
          <a
            href={`tel:${provider.phone}`}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>CALL MECHANIC</span>
          </a>

          <button
            onClick={onReset}
            className="py-3 px-4 glass-card hover:bg-slate-800 text-slate-300 font-bold rounded-2xl text-xs border border-slate-700 flex items-center gap-1.5"
            title="Start New Rescue Demo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
