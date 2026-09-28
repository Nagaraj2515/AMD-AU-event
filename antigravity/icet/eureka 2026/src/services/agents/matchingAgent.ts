import type { RescueRequest, ServiceProvider } from '../../types';

export async function rescueMatchingAgent(
  request: RescueRequest,
  providers: ServiceProvider[]
): Promise<ServiceProvider[]> {
  await new Promise((res) => setTimeout(res, 600));

  const scoredProviders = providers.map((p) => {
    let score = 50;

    if (p.distanceKm < 1.5) score += 25;
    else if (p.distanceKm < 3.0) score += 15;
    else score += 5;

    score += (p.rating / 5) * 25;

    if (p.etaMinutes <= 10) score += 20;
    else if (p.etaMinutes <= 15) score += 10;

    const problem = request.problem.toLowerCase();
    const hasSpeciality = p.serviceTypes.some((s) => s.toLowerCase().includes(problem) || s.toLowerCase().includes('battery') || s.toLowerCase().includes('two-wheeler'));
    if (hasSpeciality) score += 10;

    return {
      ...p,
      matchScore: Math.min(99, Math.round(score))
    };
  });

  scoredProviders.sort((a, b) => b.matchScore - a.matchScore);
  return scoredProviders.slice(0, 3);
}
