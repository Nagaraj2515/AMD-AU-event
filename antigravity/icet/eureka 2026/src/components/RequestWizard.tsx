import React, { useState } from 'react';
import type { VehicleType, ProblemCategory, RescueRequest, UserLocation } from '../types';
import { Car, Bike, Wrench, BatteryCharging, Fuel, ShieldAlert, AlertTriangle, Key, HelpCircle, MapPin, Upload, Sparkles, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { DEFAULT_HYDERABAD_LOCATION } from '../services/mockData';

interface RequestWizardProps {
  onSubmitRequest: (request: RescueRequest) => void;
  onPresetClick: () => void;
}

export const RequestWizard: React.FC<RequestWizardProps> = ({ onSubmitRequest, onPresetClick }) => {
  const [step, setStep] = useState<number>(1);
  
  const [vehicleType, setVehicleType] = useState<VehicleType>('Scooter');
  const [vehicleModel, setVehicleModel] = useState<string>('Honda Activa 6G');
  const [problem, setProblem] = useState<ProblemCategory>('Battery/dead battery');
  const [location, setLocation] = useState<UserLocation>(DEFAULT_HYDERABAD_LOCATION);
  const [description, setDescription] = useState<string>("My scooter suddenly stopped while driving near Jubilee Hills Metro and won't start. Clicking noise heard on ignition.");
  const [photoUrl, setPhotoUrl] = useState<string>('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80');
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [isScanningPhoto, setIsScanningPhoto] = useState<boolean>(false);

  const vehicleOptions: { type: VehicleType; label: string; icon: any }[] = [
    { type: 'Scooter', label: 'Scooter', icon: Bike },
    { type: 'Bike', label: 'Motorbike', icon: Bike },
    { type: 'Car', label: 'Car / SUV', icon: Car },
    { type: 'Other', label: 'Other', icon: Wrench }
  ];

  const problemOptions: { category: ProblemCategory; label: string; icon: any; color: string }[] = [
    { category: 'Battery/dead battery', label: 'Battery Problem', icon: BatteryCharging, color: 'border-amber-500/40 text-amber-400 bg-amber-500/10' },
    { category: 'Flat tyre', label: 'Flat Tyre', icon: Wrench, color: 'border-blue-500/40 text-blue-400 bg-blue-500/10' },
    { category: 'Engine problem', label: 'Engine Issue', icon: Wrench, color: 'border-orange-500/40 text-orange-400 bg-orange-500/10' },
    { category: 'Fuel shortage', label: 'Out of Fuel', icon: Fuel, color: 'border-purple-500/40 text-purple-400 bg-purple-500/10' },
    { category: 'Overheating', label: 'Overheating', icon: AlertTriangle, color: 'border-rose-500/40 text-rose-400 bg-rose-500/10' },
    { category: 'Lockout', label: 'Key / Lockout', icon: Key, color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' },
    { category: 'Accident', label: 'Accident SOS', icon: ShieldAlert, color: 'border-red-500/60 text-red-400 bg-red-500/20' },
    { category: 'Other', label: 'Other Issue', icon: HelpCircle, color: 'border-slate-700 text-slate-300 bg-slate-800/40' }
  ];

  const handleDetectGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            address: `GPS Location (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`,
            city: 'Detected GPS Location'
          });
        },
        () => {
          setLocation(DEFAULT_HYDERABAD_LOCATION);
        }
      );
    }
  };

  const handlePhotoUploadSimulated = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      setIsScanningPhoto(true);
      setTimeout(() => setIsScanningPhoto(false), 1500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const req: RescueRequest = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      vehicleType,
      vehicleModel,
      problem,
      description,
      photoUrl,
      location,
      isEmergency
    };
    onSubmitRequest(req);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      
      {/* Pitch Header Banner */}
      <div className="glass-panel p-5 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-500/30">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <span>🚗 Roadside Emergency Request</span>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono">STEP {step} OF 5</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">Provide your details to initiate 8-agent AI triage, diagnostic & matching pipeline.</p>
        </div>

        {/* 1-Click Pitch Preset Button */}
        <button
          onClick={onPresetClick}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 whitespace-nowrap active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-slate-950" />
          <span>Load Activa Pitch Scenario</span>
        </button>
      </div>

      {/* Wizard Step Navigation */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              step === s
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                : step > s
                ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                : 'bg-slate-900 text-slate-500 border border-slate-800'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-950/40 flex items-center justify-center font-mono text-[10px]">
              {step > s ? '✓' : s}
            </span>
            <span className="hidden md:inline">
              {s === 1 && 'Vehicle'}
              {s === 2 && 'Problem'}
              {s === 3 && 'Location'}
              {s === 4 && 'Photo Scan'}
              {s === 5 && 'Description'}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Vehicle Selection */}
        {step === 1 && (
          <div className="glass-panel p-6 rounded-3xl space-y-6">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-amber-400" />
              <span>Step 1: Select Your Vehicle Type</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {vehicleOptions.map((v) => {
                const Icon = v.icon;
                const isSelected = vehicleType === v.type;
                return (
                  <div
                    key={v.type}
                    onClick={() => setVehicleType(v.type)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-3 ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-white ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10'
                        : 'glass-card border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span className="font-bold text-sm">{v.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-300 mb-2">Vehicle Model Name / Make</label>
              <input
                type="text"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                placeholder="e.g. Honda Activa 6G, Royal Enfield, Hyundai i20"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 shadow"
              >
                <span>Next: Select Problem</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Problem Category */}
        {step === 2 && (
          <div className="glass-panel p-6 rounded-3xl space-y-6">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-amber-400" />
              <span>Step 2: What is the Vehicle Problem?</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {problemOptions.map((p) => {
                const Icon = p.icon;
                const isSelected = problem === p.category;
                return (
                  <div
                    key={p.category}
                    onClick={() => {
                      setProblem(p.category);
                      if (p.category === 'Accident') setIsEmergency(true);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-2.5 ${
                      isSelected
                        ? `${p.color} ring-2 ring-amber-500/50 shadow-lg`
                        : 'glass-card border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-bold text-xs">{p.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Emergency Checkbox */}
            <div className="p-4 rounded-2xl bg-red-950/30 border border-red-800/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <div>
                  <div className="text-xs font-extrabold text-red-300">Is this a critical emergency?</div>
                  <div className="text-[11px] text-slate-400">Triggers immediate police/hospital SOS dispatch along with mechanic matching.</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isEmergency}
                onChange={(e) => setIsEmergency(e.target.checked)}
                className="w-5 h-5 accent-red-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 shadow"
              >
                <span>Next: Location</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div className="glass-panel p-6 rounded-3xl space-y-6">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>Step 3: User GPS Location</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDetectGPS}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl text-xs flex items-center gap-2 border border-slate-700 shadow"
                >
                  <MapPin className="w-4 h-4 text-amber-400 animate-bounce" />
                  <span>Auto-Detect GPS</span>
                </button>
                <span className="text-xs text-slate-400">or use default demo preset location</span>
              </div>

              {/* Map Preview Graphic */}
              <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                
                {/* User Map Marker */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center animate-radar">
                    <MapPin className="w-5 h-5 text-amber-400 fill-amber-400" />
                  </div>
                  <div className="mt-2 px-3 py-1 bg-slate-950/90 rounded-lg border border-slate-700 text-xs font-bold text-amber-300">
                    {location.address}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Landmark / City Address</label>
                <input
                  type="text"
                  value={location.address}
                  onChange={(e) => setLocation({ ...location, address: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 shadow"
              >
                <span>Next: Photo Upload</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Photo/Video Upload with Visual AI Scan */}
        {step === 4 && (
          <div className="glass-panel p-6 rounded-3xl space-y-6">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-amber-400" />
              <span>Step 4: Upload Photo / Video (Visual AI Scan)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Image Preview Container with Scanner Grid */}
              <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center group">
                {photoUrl ? (
                  <>
                    <img src={photoUrl} alt="Vehicle Upload" className="w-full h-full object-cover" />
                    
                    {/* Simulated Visual AI Scanner Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 via-transparent to-amber-500/20 pointer-events-none" />
                    <div className="absolute top-2 left-2 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md rounded-md border border-amber-500/40 text-[11px] font-mono text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 animate-spin" />
                      <span>VISUAL DIAGNOSTIC SCAN READY</span>
                    </div>

                    {isScanningPhoto && (
                      <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-sm flex items-center justify-center">
                        <div className="px-4 py-2 bg-slate-950/90 rounded-xl border border-amber-500 text-xs font-bold text-amber-400 animate-pulse">
                          Scanning image with Diagnostic AI...
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <Upload className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-400">Click to upload engine or tyre photo</p>
                  </div>
                )}
              </div>

              {/* Upload Action controls */}
              <div className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Uploading a photo allows the Diagnostic Agent to perform visual edge detection for tire punctures, oil leaks, or battery terminal corrosion.
                </p>

                <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs cursor-pointer border border-slate-700 shadow">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Choose Photo / Take Picture</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUploadSimulated} className="hidden" />
                </label>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pre-loaded sample photo available for pitch demo</span>
                </div>
              </div>

            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 shadow"
              >
                <span>Next: Describe Problem</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Description & Final Submit */}
        {step === 5 && (
          <div className="glass-panel p-6 rounded-3xl space-y-6">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Step 5: Describe What Happened</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Detailed Symptoms / Notes for AI Agents</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe noises, smoke, indicator lights, or what led to the breakdown..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Request Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">Summary Package for AI Coordinator</div>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div>Vehicle: <span className="text-white font-semibold">{vehicleType} ({vehicleModel})</span></div>
                <div>Problem: <span className="text-white font-semibold">{problem}</span></div>
                <div>Location: <span className="text-white font-semibold">{location.address}</span></div>
                <div>Emergency SOS: <span className={isEmergency ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>{isEmergency ? 'YES (Active)' : 'Standard'}</span></div>
              </div>
            </div>

            {/* Final Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black rounded-2xl text-base tracking-wide shadow-2xl shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:scale-98 flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5 text-slate-950 fill-slate-950" />
                <span>GET HELP NOW – RUN 8 AI AGENTS</span>
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
};
