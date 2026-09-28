import React, { useState } from 'react';
import type { RescuePipelineOutput, ServiceProvider } from '../types';
import { Star, MapPin, Clock, DollarSign, Wrench, Shield, CheckCircle2, ChevronRight, Award, ShieldAlert, X, Phone, Navigation, Key, ExternalLink } from 'lucide-react';

interface RescueResultsProps {
  pipelineOutput: RescuePipelineOutput;
  onSelectProvider: (provider: ServiceProvider) => void;
  onEmergencyClick: () => void;
}

export const RescueResults: React.FC<RescueResultsProps> = ({
  pipelineOutput,
  onSelectProvider,
  onEmergencyClick
}) => {
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);
  const [selectedForDetails, setSelectedForDetails] = useState<ServiceProvider | null>(null);
  const { matchedProviders, priceBreakdown, safetyInstructions } = pipelineOutput;

  // Primary recommended mechanic
  const topMechanic = matchedProviders[0];
  const securityOtp = '7842';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI DIAGNOSIS COMPLETE & MECHANICS MATCHED</span>
          </div>
          <h2 className="text-3xl font-black text-white">Recommended Mechanic Shops & Contact Details</h2>
          <p className="text-xs text-slate-300 mt-1">
            Top 3 verified mechanic shops matched based on 1.2 km proximity, 8-min ETA, and battery diagnostics.
          </p>
        </div>

        <button
          onClick={() => setShowCompareModal(true)}
          className="px-5 py-2.5 glass-card hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-xs border border-amber-500/40 flex items-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <Wrench className="w-4 h-4 text-amber-400" />
          <span>COMPARE ALL OPTIONS</span>
        </button>
      </div>

      {/* #1 Top Recommended Mechanic Contact Card with OTP */}
      {topMechanic && (
        <div className="glass-panel p-6 rounded-3xl border-2 border-amber-500 shadow-2xl shadow-amber-500/20 space-y-6 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/30">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase rounded-full shadow flex items-center gap-1">
                <Award className="w-3.5 h-3.5 fill-slate-950" />
                <span>#1 MATCHED MECHANIC SHOP</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">READY FOR DISPATCH</span>
            </div>

            {/* Verification OTP Box */}
            <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-amber-500/50">
              <Key className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-mono text-slate-400">VERIFICATION OTP:</span>
              <span className="font-mono font-black text-lg text-amber-400 tracking-wider">{securityOtp}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Mechanic Info */}
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black text-white">{topMechanic.name}</h3>
                <span className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{topMechanic.rating} ({topMechanic.reviewsCount} reviews)</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400">Mechanic Phone Contact:</div>
                    <a href={`tel:${topMechanic.phone}`} className="font-mono font-bold text-emerald-400 hover:underline text-sm">
                      {topMechanic.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400">Shop Address & Distance:</div>
                    <div className="font-bold text-white truncate">{topMechanic.address} ({topMechanic.distanceKm} km away)</div>
                  </div>
                </div>
              </div>

              {/* Google Maps Pin Link */}
              <div className="flex items-center justify-between text-xs pt-1">
                <div className="text-slate-400">
                  Assigned Technician: <strong className="text-white">{topMechanic.technicianName}</strong> ({topMechanic.vehicle})
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${topMechanic.lat},${topMechanic.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-amber-400 hover:underline font-bold text-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open Shop Location in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Request Dispatch CTA */}
            <div className="md:col-span-4 space-y-3">
              <button
                onClick={() => onSelectProvider(topMechanic)}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black rounded-2xl text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <span>REQUEST RESCUE NOW (OTP: {securityOtp})</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="text-center text-[11px] text-slate-400 font-mono">
                Estimated Price: <strong className="text-white">₹{topMechanic.priceRange.min}–₹{topMechanic.priceRange.max}</strong> • ETA: <strong className="text-emerald-400">{topMechanic.etaMinutes} mins</strong>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Grid of All 3 Matched Providers */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Wrench className="w-5 h-5 text-amber-400" />
          <span>All Recommended Mechanic Shops</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matchedProviders.map((provider, index) => {
            const isTopPick = index === 0;

            return (
              <div
                key={provider.id}
                className={`relative glass-card p-6 rounded-3xl flex flex-col justify-between space-y-6 transition-all duration-300 ${
                  isTopPick
                    ? 'border-2 border-amber-500/60 shadow-xl bg-slate-900/90'
                    : 'border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-4 pt-2">
                  {/* Name & Rating */}
                  <div>
                    <h4 className="text-lg font-extrabold text-white">{provider.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{provider.rating}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">({provider.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  {/* Contact & Phone */}
                  <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Phone Contact:</span>
                      <a href={`tel:${provider.phone}`} className="font-mono font-bold text-emerald-400 hover:underline">
                        {provider.phone}
                      </a>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Address:</span>
                      <span className="font-semibold text-white truncate max-w-[150px]">{provider.address}</span>
                    </div>
                  </div>

                  {/* Distance, ETA, Price */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800 text-center">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">Distance</div>
                      <div className="text-sm font-black text-amber-400 flex items-center justify-center gap-0.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{provider.distanceKm} km</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">Est. ETA</div>
                      <div className="text-sm font-black text-emerald-400 flex items-center justify-center gap-0.5 mt-0.5">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>{provider.etaMinutes} min</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">Est. Price</div>
                      <div className="text-sm font-black text-white mt-0.5">
                        ₹{provider.priceRange.min}–{provider.priceRange.max}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="space-y-2">
                  <button
                    onClick={() => onSelectProvider(provider)}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>DISPATCH THIS MECHANIC</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedForDetails(provider)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-[11px] rounded-xl border border-slate-800 flex items-center justify-center gap-1"
                  >
                    <Navigation className="w-3 h-3 text-amber-400" />
                    <span>View Shop Google Map & Contact</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Transparent Price Breakdown & Safety Advice Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Transparent Price Breakdown Panel */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <DollarSign className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-extrabold text-white">Transparent Price Breakdown</h3>
          </div>

          <div className="space-y-2.5 text-xs">
            {priceBreakdown.breakdownItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-slate-300">
                <span>{item.label}</span>
                <span className="font-mono font-bold text-white">₹{item.amount}</span>
              </div>
            ))}

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-sm font-extrabold text-amber-400">
              <span>Estimated Total Range</span>
              <span className="text-base font-mono">₹{priceBreakdown.estimatedTotalMin} – ₹{priceBreakdown.estimatedTotalMax}</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 italic">No hidden surge charges. Direct payment to mechanic upon completion.</p>
        </div>

        {/* Safety Agent Contextual Instructions */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-extrabold text-white">Safety Advisory While Waiting</h3>
            </div>
            <button
              onClick={onEmergencyClick}
              className="px-2.5 py-1 bg-red-950 text-red-400 rounded-lg text-[10px] font-bold border border-red-800 flex items-center gap-1"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>SOS</span>
            </button>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            {safetyInstructions.map((inst, i) => (
              <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
                <span className="leading-tight">{inst}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Mechanic Details Modal */}
      {selectedForDetails && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl max-w-lg w-full border border-amber-500/40 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xl font-black text-white">{selectedForDetails.name}</h3>
              <button onClick={() => setSelectedForDetails(null)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-slate-400">Phone Contact:</div>
                <a href={`tel:${selectedForDetails.phone}`} className="text-lg font-mono font-bold text-emerald-400 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>{selectedForDetails.phone}</span>
                </a>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400">Shop Location:</div>
                <div className="font-bold text-white">{selectedForDetails.address}</div>
                <div className="text-[11px] text-slate-400">Coordinates: {selectedForDetails.lat.toFixed(4)}, {selectedForDetails.lng.toFixed(4)}</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between font-mono">
                <span className="text-slate-400">VERIFICATION OTP:</span>
                <span className="font-black text-amber-400 text-lg">{securityOtp}</span>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedForDetails.lat},${selectedForDetails.lng}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl flex items-center justify-center gap-2 border border-slate-700 text-xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Open Google Maps Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <button
              onClick={() => {
                const prov = selectedForDetails;
                setSelectedForDetails(null);
                onSelectProvider(prov);
              }}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider"
            >
              Dispatch This Mechanic Now
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl max-w-4xl w-full border border-amber-500/40 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-black text-white">Compare Mechanic Shop Options</h3>
              <button onClick={() => setShowCompareModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="p-3">Shop Name</th>
                    <th className="p-3">Phone Contact</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3">Distance</th>
                    <th className="p-3">ETA</th>
                    <th className="p-3">Price Range</th>
                    <th className="p-3">Match Score</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {matchedProviders.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/50">
                      <td className="p-3 font-bold text-white">{p.name}</td>
                      <td className="p-3 font-mono font-bold text-emerald-400">
                        <a href={`tel:${p.phone}`}>{p.phone}</a>
                      </td>
                      <td className="p-3 text-amber-400 font-bold">⭐ {p.rating}</td>
                      <td className="p-3">{p.distanceKm} km</td>
                      <td className="p-3 text-emerald-400 font-bold">{p.etaMinutes} min</td>
                      <td className="p-3 font-mono">₹{p.priceRange.min}–{p.priceRange.max}</td>
                      <td className="p-3 font-mono font-bold text-emerald-400">{p.matchScore}/100</td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            setShowCompareModal(false);
                            onSelectProvider(p);
                          }}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-[11px]"
                        >
                          Dispatch
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
