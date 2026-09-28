import type { RescueRequest, ServiceProvider, EmergencyContact } from '../../types';
import { MOCK_SERVICE_PROVIDERS, MOCK_EMERGENCY_CONTACTS } from '../mockData';

export async function locationAgent(_request: RescueRequest): Promise<{
  providers: ServiceProvider[];
  emergencyContacts: EmergencyContact[];
}> {
  await new Promise((res) => setTimeout(res, 700));

  const providers = MOCK_SERVICE_PROVIDERS.map((p) => {
    return {
      ...p,
      distanceKm: p.distanceKm,
      etaMinutes: Math.max(5, Math.round(p.distanceKm * 6 + 2))
    };
  });

  return {
    providers,
    emergencyContacts: MOCK_EMERGENCY_CONTACTS
  };
}
