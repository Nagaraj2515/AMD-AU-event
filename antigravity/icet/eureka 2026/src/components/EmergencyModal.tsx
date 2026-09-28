import React, { useState } from 'react';
import { ShieldAlert, Phone, MapPin, Send, CheckCircle2, X, ExternalLink } from 'lucide-react';
import { MOCK_EMERGENCY_CONTACTS } from '../services/mockData';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  userLocation: { lat: number; lng: number; address: string };
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  userLocation
}) => {
  const [broadcastSent, setBroadcastSent] = useState<boolean>(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Police', 'Hospital', 'Nearby Helper']);

  if (!isOpen) return null;

  const googleMapsUrl = `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`;
  const emergencyMessage = `🚨 EMERGENCY SOS ALERT 🚨\nI am stranded and need immediate emergency assistance!\nLocation: ${userLocation.address}\nGoogle Maps GPS Link: ${googleMapsUrl}\nSent via RoadRescue AI Safety System.`;

  const handleSendSOS = () => {
    setBroadcastSent(true);
  };

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 rounded-3xl max-w-xl w-full border-2 border-red-600 shadow-2xl shadow-red-600/30 space-y-6 relative overflow-hidden">
        
        {/* Header Alert Strip */}
        <div className="flex items-center justify-between border-b border-red-900/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/40 animate-pulse">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Emergency SOS Alert</h3>
              <p className="text-xs text-red-300 font-medium">Broadcast location & distress SMS to emergency services</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!broadcastSent ? (
          <div className="space-y-5">
            {/* GPS Location Alert Box */}
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/50 space-y-2">
              <div className="text-xs font-mono font-bold text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-400 animate-bounce" />
                <span>Current GPS Coordinates Attached</span>
              </div>
              <p className="text-xs text-slate-200 font-semibold">{userLocation.address}</p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:underline"
              >
                <span>Open Google Maps Pin</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Broadcast Target Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">Broadcast Recipients:</label>
              <div className="grid grid-cols-3 gap-2">
                {['Police', 'Hospital', 'Nearby Helper'].map((t) => {
                  const isChecked = selectedTypes.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleType(t)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        isChecked
                          ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/20'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '} {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nearest Emergency Units List */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">Nearest Identified Stations (0.9km - 2.3km):</label>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {MOCK_EMERGENCY_CONTACTS.map((ec) => (
                  <div key={ec.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{ec.name}</div>
                      <div className="text-[10px] text-slate-400">{ec.address} • {ec.distanceKm} km</div>
                    </div>
                    <a
                      href={`tel:${ec.phone}`}
                      className="px-2.5 py-1 bg-red-950 hover:bg-red-900 text-red-300 rounded-lg font-mono font-bold text-[11px] border border-red-800 flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{ec.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Broadcast Action Button */}
            <button
              onClick={handleSendSOS}
              className="w-full py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black rounded-2xl text-base tracking-wide shadow-xl shadow-red-600/40 flex items-center justify-center gap-2.5 active:scale-98"
            >
              <Send className="w-5 h-5 animate-bounce" />
              <span>BROADCAST EMERGENCY SOS & LOCATION NOW</span>
            </button>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-2xl font-black text-white">Emergency SOS Sent!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                Emergency dispatch alert and live Google Maps GPS location have been broadcast to Jubilee Hills Police Station, Apollo Trauma Care, and nearby registered helpers.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-left font-mono text-xs text-amber-300 whitespace-pre-wrap">
              {emergencyMessage}
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs"
            >
              Close Emergency Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
