import { useState } from 'react';
import type {
  RescueRequest,
  RescuePipelineOutput,
  AgentState,
  AgentLog,
  ServiceProvider
} from './types';
import { DEFAULT_DEMO_REQUEST, DEFAULT_HYDERABAD_LOCATION } from './services/mockData';
import { runRescuePipeline } from './services/aiService';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RequestWizard } from './components/RequestWizard';
import { AgentLiveScreen } from './components/AgentLiveScreen';
import { RescueResults } from './components/RescueResults';
import { LiveTracking } from './components/LiveTracking';
import { EmergencyModal } from './components/EmergencyModal';
import { RescueHistory } from './components/RescueHistory';
import { AdminDashboard } from './components/AdminDashboard';

export function App() {
  const [currentTab, setCurrentTab] = useState<
    'home' | 'request' | 'live-agents' | 'results' | 'tracking' | 'history' | 'admin' | 'providers'
  >('home');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  const [activeRequest, setActiveRequest] = useState<RescueRequest | null>(null);
  const [pipelineOutput, setPipelineOutput] = useState<RescuePipelineOutput | null>(null);
  
  const [agentStates, setAgentStates] = useState<AgentState[]>([]);
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([]);
  const [isPipelineFinished, setIsPipelineFinished] = useState<boolean>(false);
  
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);

  // Execute Multi-Agent Pipeline
  const executePipelineForRequest = async (request: RescueRequest) => {
    setActiveRequest(request);
    setCurrentTab('live-agents');
    setIsPipelineFinished(false);
    setAgentStates([]);
    setAgentLogs([]);

    const output = await runRescuePipeline(request, {
      isDemoMode,
      onProgress: (states, logs) => {
        setAgentStates(states);
        setAgentLogs(logs);
      }
    });

    setPipelineOutput(output);
    setIsPipelineFinished(true);
  };

  // 1-Click Pitch Scenario Trigger
  const handleRunDemoPreset = () => {
    executePipelineForRequest(DEFAULT_DEMO_REQUEST);
  };

  // User submitted custom wizard form
  const handleWizardSubmit = (request: RescueRequest) => {
    executePipelineForRequest(request);
  };

  // User selected a matched provider
  const handleSelectProvider = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setCurrentTab('tracking');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Global Navbar */}
      <Navbar
        currentTab={currentTab === 'live-agents' || currentTab === 'results' ? 'request' : currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'request' && !activeRequest) {
            setCurrentTab('request');
          } else {
            setCurrentTab(tab);
          }
        }}
        isDemoMode={isDemoMode}
        setIsDemoMode={setIsDemoMode}
        onEmergencyClick={() => setIsEmergencyModalOpen(true)}
        hasActiveRescue={selectedProvider !== null}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            <Hero
              onGetHelpClick={() => setCurrentTab('request')}
              onDemoPresetClick={handleRunDemoPreset}
              onEmergencyClick={() => setIsEmergencyModalOpen(true)}
            />
            {/* Quick Demo Trigger Section below Hero */}
            <div className="max-w-4xl mx-auto px-4 pb-12">
              <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 text-center space-y-3">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 font-mono text-xs font-bold rounded-full">
                  PITCH COMPETITION DEMO READY
                </span>
                <h3 className="text-xl font-black text-white">Default Pitch Scenario: Honda Activa (Battery Issue)</h3>
                <p className="text-xs text-slate-300 max-w-xl mx-auto">
                  Demonstrate the 8-agent AI collaboration live in front of judges with 1-click execution!
                </p>
                <button
                  onClick={handleRunDemoPreset}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                >
                  🚀 START LIVE 8-AGENT DEMO NOW
                </button>
              </div>
            </div>
          </>
        )}

        {currentTab === 'request' && (
          <RequestWizard
            onSubmitRequest={handleWizardSubmit}
            onPresetClick={handleRunDemoPreset}
          />
        )}

        {currentTab === 'live-agents' && (
          <AgentLiveScreen
            agentStates={agentStates}
            agentLogs={agentLogs}
            isFinished={isPipelineFinished}
            onProceedToResults={() => setCurrentTab('results')}
          />
        )}

        {currentTab === 'results' && pipelineOutput && (
          <RescueResults
            pipelineOutput={pipelineOutput}
            onSelectProvider={handleSelectProvider}
            onEmergencyClick={() => setIsEmergencyModalOpen(true)}
          />
        )}

        {currentTab === 'tracking' && selectedProvider && activeRequest && (
          <LiveTracking
            provider={selectedProvider}
            request={activeRequest}
            onEmergencyClick={() => setIsEmergencyModalOpen(true)}
            onReset={() => {
              setSelectedProvider(null);
              setActiveRequest(null);
              setCurrentTab('home');
            }}
          />
        )}

        {currentTab === 'history' && <RescueHistory />}

        {currentTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Emergency SOS Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        userLocation={activeRequest ? activeRequest.location : DEFAULT_HYDERABAD_LOCATION}
      />

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">RoadRescue AI</span>
            <span>• Pitching Competition Project</span>
          </div>
          <div>Built for Vibe Coding Hackathon 2026 • 8-Agent Multi-AI Architecture</div>
        </div>
      </footer>

    </div>
  );
}

export default App;
