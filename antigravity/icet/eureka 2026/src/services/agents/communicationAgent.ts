import type { RescueRequest } from '../../types';

export async function communicationAgent(request: RescueRequest): Promise<string> {
  await new Promise((res) => setTimeout(res, 400));

  const { vehicleType, vehicleModel, problem, location, description } = request;

  const dispatchMsg = `[RoadRescue AI Dispatch Alert]
Customer stranded with ${problem.toLowerCase()} on ${vehicleModel || vehicleType}.
Location: ${location.address}, ${location.city} (GPS: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}).
User Note: "${description}".
Immediate technician dispatch & jumpstart/repair assistance requested via RoadRescue AI platform.`;

  return dispatchMsg;
}
