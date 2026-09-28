import type { RescueRequest } from '../../types';

export async function safetyAgent(request: RescueRequest): Promise<string[]> {
  await new Promise((res) => setTimeout(res, 500));

  const instructions: string[] = [
    '📍 Stay off the active road: Move yourself and your vehicle onto the left pavement or shoulder.',
    '⚠️ Hazard Lighting: Keep parking or hazard lights switched ON to ensure visibility to oncoming traffic.',
    '🚶‍♂️ Road Safety: Never stand directly in front of or behind your stranded vehicle on open roads.',
    '📱 Keep phone active: Maintain adequate battery for live tracking and technician updates.',
    '🛡️ Beware of unverified bystanders: Wait inside or beside a well-lit area until your assigned technician arrives.',
    '🚨 Emergency SOS: If you feel unsafe or in case of traffic conflict, tap the SOS button to alert Police (100) or Emergency Care.'
  ];

  if (request.problem === 'Overheating') {
    instructions.push('🔥 Cool Down Advisory: Do NOT touch or attempt to unscrew the engine coolant cap while hot.');
  } else if (request.problem === 'Accident' || request.isEmergency) {
    instructions.unshift('🚑 Emergency Protocol: If any injury has occurred, dial 108 or 112 immediately before mechanic dispatch.');
  }

  return instructions;
}
