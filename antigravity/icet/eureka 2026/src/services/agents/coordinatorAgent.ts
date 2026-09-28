import type {
  RescueRequest,
  AgentState,
  AgentLog,
  AgentName,
  RescuePipelineOutput
} from '../../types';
import { triageAgent } from './triageAgent';
import { diagnosticAgent } from './diagnosticAgent';
import { locationAgent } from './locationAgent';
import { priceAgent } from './priceAgent';
import { rescueMatchingAgent } from './matchingAgent';
import { safetyAgent } from './safetyAgent';
import { communicationAgent } from './communicationAgent';

export type AgentCallback = (
  states: AgentState[],
  logs: AgentLog[],
  activeAgent?: AgentName
) => void;

export async function coordinatorAgent(
  request: RescueRequest,
  onProgress?: AgentCallback
): Promise<RescuePipelineOutput> {
  const initialAgentStates: AgentState[] = [
    { name: 'COORDINATOR AGENT', status: 'working', summary: 'Receiving request & planning multi-agent execution pipeline...' },
    { name: 'TRIAGE AGENT', status: 'waiting', summary: 'Pending urgency & severity classification' },
    { name: 'DIAGNOSTIC AGENT', status: 'waiting', summary: 'Pending visual & symptom mechanical analysis' },
    { name: 'LOCATION AGENT', status: 'waiting', summary: 'Pending GPS radius scan for mechanics & emergency services' },
    { name: 'PRICE AGENT', status: 'waiting', summary: 'Pending transparent cost breakdown calculation' },
    { name: 'RESCUE MATCHING AGENT', status: 'waiting', summary: 'Pending multi-criteria provider scoring' },
    { name: 'SAFETY AGENT', status: 'waiting', summary: 'Pending contextual roadside safety advisory' },
    { name: 'COMMUNICATION AGENT', status: 'waiting', summary: 'Pending dispatch payload generation' }
  ];

  let states: AgentState[] = [...initialAgentStates];
  let logs: AgentLog[] = [];

  const addLog = (agent: AgentName, message: string, type: AgentLog['type'] = 'info') => {
    const logItem: AgentLog = {
      id: Math.random().toString(36).substring(2, 9),
      agent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message,
      type
    };
    logs = [logItem, ...logs];
    if (onProgress) onProgress([...states], [...logs], agent);
  };

  const updateAgentState = (
    name: AgentName,
    status: AgentState['status'],
    summary: string,
    result?: any,
    durationMs?: number
  ) => {
    states = states.map((s) => (s.name === name ? { ...s, status, summary, result, durationMs } : s));
    if (onProgress) onProgress([...states], [...logs], name);
  };

  // Step 0: Coordinator Init
  addLog('COORDINATOR AGENT', `Received emergency request REQ-${request.id} for ${request.vehicleType} (${request.problem}) at ${request.location.city}`);
  updateAgentState('COORDINATOR AGENT', 'completed', 'Orchestration pipeline initialized. 7 specialized sub-agents dispatched.');

  // Step 1: Triage Agent
  updateAgentState('TRIAGE AGENT', 'working', 'Classifying issue category, urgency rating, and required service class...');
  addLog('TRIAGE AGENT', 'Evaluating problem urgency, vehicle type, and emergency flags...');
  const t0 = Date.now();
  const triageResult = await triageAgent(request);
  const t1 = Date.now();
  updateAgentState(
    'TRIAGE AGENT',
    'completed',
    `Urgency: ${triageResult.urgency} | Severity: ${triageResult.severityScore}/5 | Service: ${triageResult.requiredService}`,
    triageResult,
    t1 - t0
  );
  addLog('TRIAGE AGENT', `Problem triaged as "${triageResult.category}" with ${triageResult.urgency} urgency. Required service: ${triageResult.requiredService}`, 'success');

  // Step 2: Diagnostic Agent
  updateAgentState('DIAGNOSTIC AGENT', 'working', 'Analyzing description and uploaded media for likely mechanical causes...');
  addLog('DIAGNOSTIC AGENT', `Scanning text logs: "${request.description.slice(0, 45)}..."`);
  const d0 = Date.now();
  const diagnosticResult = await diagnosticAgent(request);
  const d1 = Date.now();
  updateAgentState(
    'DIAGNOSTIC AGENT',
    'completed',
    `Identified ${diagnosticResult.likelyCauses.length} likely root causes with ${(diagnosticResult.confidence * 100).toFixed(0)}% confidence`,
    diagnosticResult,
    d1 - d0
  );
  addLog('DIAGNOSTIC AGENT', `Primary likely cause: ${diagnosticResult.likelyCauses[0]}`, 'success');

  // Step 3: Location Agent
  updateAgentState('LOCATION AGENT', 'working', `Scanning GPS radius (${request.location.lat.toFixed(4)}, ${request.location.lng.toFixed(4)}) for verified providers...`);
  addLog('LOCATION AGENT', `Querying provider map registry within 5km of ${request.location.address}...`);
  const l0 = Date.now();
  const { providers, emergencyContacts } = await locationAgent(request);
  const l1 = Date.now();
  updateAgentState(
    'LOCATION AGENT',
    'completed',
    `Found ${providers.length} service providers and ${emergencyContacts.length} emergency units (Police/Hospitals)`,
    { providers, emergencyContacts },
    l1 - l0
  );
  addLog('LOCATION AGENT', `Located ${providers.length} mechanics. Closest provider: ${providers[0].name} (${providers[0].distanceKm} km away)`, 'success');

  // Step 4: Price Agent
  updateAgentState('PRICE AGENT', 'working', 'Calculating transparent price range and fee breakdown...');
  addLog('PRICE AGENT', `Computing base callout + labor + distance fee for ${request.vehicleType}...`);
  const p0 = Date.now();
  const priceBreakdown = await priceAgent(request);
  const p1 = Date.now();
  updateAgentState(
    'PRICE AGENT',
    'completed',
    `Estimated total cost: ₹${priceBreakdown.estimatedTotalMin} – ₹${priceBreakdown.estimatedTotalMax}`,
    priceBreakdown,
    p1 - p0
  );
  addLog('PRICE AGENT', `Transparent price calculated: ₹${priceBreakdown.estimatedTotalMin} - ₹${priceBreakdown.estimatedTotalMax}`, 'success');

  // Step 5: Rescue Matching Agent
  updateAgentState('RESCUE MATCHING AGENT', 'working', 'Scoring & matching best service providers based on distance, rating, and ETA...');
  addLog('RESCUE MATCHING AGENT', 'Running multi-criteria scoring algorithm (Distance 30%, Rating 30%, ETA 20%, Specs 20%)...');
  const m0 = Date.now();
  const matchedProviders = await rescueMatchingAgent(request, providers);
  const m1 = Date.now();
  updateAgentState(
    'RESCUE MATCHING AGENT',
    'completed',
    `Matched top ${matchedProviders.length} optimal service providers for dispatch`,
    matchedProviders,
    m1 - m0
  );
  addLog('RESCUE MATCHING AGENT', `#1 Recommended Match: ${matchedProviders[0].name} (Score: ${matchedProviders[0].matchScore}/100)`, 'success');

  // Step 6: Safety Agent
  updateAgentState('SAFETY AGENT', 'working', 'Generating situational roadside safety guidelines...');
  addLog('SAFETY AGENT', 'Building customized safety checklist for waiting user...');
  const s0 = Date.now();
  const safetyInstructions = await safetyAgent(request);
  const s1 = Date.now();
  updateAgentState(
    'SAFETY AGENT',
    'completed',
    `Generated ${safetyInstructions.length} context-aware safety instructions`,
    safetyInstructions,
    s1 - s0
  );
  addLog('SAFETY AGENT', `Safety advisory ready: ${safetyInstructions[0]}`, 'info');

  // Step 7: Communication Agent
  updateAgentState('COMMUNICATION AGENT', 'working', 'Generating provider dispatch alert payload & SMS text...');
  addLog('COMMUNICATION AGENT', 'Formatting concise rescue dispatch message for mechanic & emergency units...');
  const c0 = Date.now();
  const dispatchMessage = await communicationAgent(request);
  const c1 = Date.now();
  updateAgentState(
    'COMMUNICATION AGENT',
    'completed',
    'Rescue dispatch package generated successfully',
    dispatchMessage,
    c1 - c0
  );
  addLog('COMMUNICATION AGENT', 'Dispatch payload formatted for SMS/WhatsApp API transmission.', 'success');

  // Finish Coordinator
  addLog('COORDINATOR AGENT', '✨ Multi-Agent Collaboration Complete! Rescue plan presented to user.', 'success');

  return {
    triage: triageResult,
    diagnostic: diagnosticResult,
    nearbyProviders: providers,
    emergencyContacts,
    priceBreakdown,
    matchedProviders,
    safetyInstructions,
    dispatchMessage
  };
}
