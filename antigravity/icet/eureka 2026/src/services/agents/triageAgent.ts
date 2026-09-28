import type { RescueRequest, TriageResult } from '../../types';

export async function triageAgent(request: RescueRequest): Promise<TriageResult> {
  await new Promise((res) => setTimeout(res, 600));

  const { problem, vehicleType, isEmergency } = request;

  let severityScore = 2;
  let urgency: TriageResult['urgency'] = 'Medium';
  let requiredService = 'Standard Two-Wheeler Assistance';
  let immediateSafetyInstruction = 'Pull over safely to the left shoulder and turn on your indicator or hazard lights.';

  if (isEmergency || problem === 'Accident') {
    severityScore = 5;
    urgency = 'CRITICAL EMERGENCY';
    requiredService = 'Emergency SOS Dispatch & Towing + Medical Ambulance';
    immediateSafetyInstruction = 'IMMEDIATE EMERGENCY: Turn on hazard lights, stay clear of ongoing traffic, and call emergency services if injured.';
  } else if (problem === 'Engine problem' || problem === 'Overheating') {
    severityScore = 3;
    urgency = 'High';
    requiredService = 'Mobile Mechanic & Engine Specialist';
    immediateSafetyInstruction = 'Do not open the hot radiator cap if engine is overheating. Stay safely away from hot engine components.';
  } else if (problem === 'Battery/dead battery') {
    severityScore = 2;
    urgency = 'Medium';
    requiredService = 'Battery Jumpstart & Diagnostics Unit';
    immediateSafetyInstruction = 'Ensure scooter ignition key is in OFF position. Stand off the roadway while awaiting jumpstart.';
  } else if (problem === 'Flat tyre') {
    severityScore = 2;
    urgency = 'Medium';
    requiredService = 'On-site Tyre Repair / Replacement';
    immediateSafetyInstruction = 'Do not attempt to ride on a completely flat tyre to prevent wheel rim damage.';
  } else if (problem === 'Fuel shortage') {
    severityScore = 1;
    urgency = 'Low';
    requiredService = 'Emergency Fuel Delivery (2-5 Litres)';
    immediateSafetyInstruction = 'Park scooter on main stand securely off the active driving lane.';
  }

  if (vehicleType === 'Car') {
    requiredService = requiredService.replace('Two-Wheeler', 'Four-Wheeler Car');
  }

  return {
    category: problem,
    severityScore,
    urgency,
    requiredService,
    immediateSafetyInstruction
  };
}
