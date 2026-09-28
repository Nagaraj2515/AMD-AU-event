import type { RescueRequest, RescuePipelineOutput, AgentState, AgentLog, AgentName } from '../types';
import { coordinatorAgent } from './agents/coordinatorAgent';

export interface AIServiceOptions {
  isDemoMode: boolean;
  onProgress?: (states: AgentState[], logs: AgentLog[], activeAgent?: AgentName) => void;
}

export async function runRescuePipeline(
  request: RescueRequest,
  options: AIServiceOptions
): Promise<RescuePipelineOutput> {
  return await coordinatorAgent(request, options.onProgress);
}
