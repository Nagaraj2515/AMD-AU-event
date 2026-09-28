import type { RescueRequest, PriceBreakdown } from '../../types';

export async function priceAgent(request: RescueRequest): Promise<PriceBreakdown> {
  await new Promise((res) => setTimeout(res, 500));

  const { vehicleType, problem, isEmergency } = request;

  let baseFee = 250;
  let laborEstimate = 150;
  let distanceSurcharge = 50;
  let emergencyFee = isEmergency ? 200 : 0;

  if (vehicleType === 'Car') {
    baseFee += 150;
    laborEstimate += 100;
  } else if (vehicleType === 'Scooter' || vehicleType === 'Bike') {
    baseFee = 200;
    laborEstimate = 100;
  }

  if (problem === 'Battery/dead battery') {
    laborEstimate = 150;
  } else if (problem === 'Flat tyre') {
    laborEstimate = 120;
  } else if (problem === 'Engine problem') {
    laborEstimate = 300;
  } else if (problem === 'Accident') {
    laborEstimate = 500;
  }

  const estimatedTotalMin = baseFee + laborEstimate + distanceSurcharge + emergencyFee;
  const estimatedTotalMax = estimatedTotalMin + (vehicleType === 'Car' ? 300 : 200);

  return {
    baseFee,
    laborEstimate,
    distanceSurcharge,
    emergencyFee,
    estimatedTotalMin,
    estimatedTotalMax,
    breakdownItems: [
      { label: `Base Callout Fee (${vehicleType})`, amount: baseFee },
      { label: `On-site Labor & Diagnostics (${problem})`, amount: laborEstimate },
      { label: 'GPS Travel Surcharge (~1.2 km)', amount: distanceSurcharge },
      ...(isEmergency ? [{ label: 'Emergency Priority Dispatch Fee', amount: emergencyFee }] : [])
    ]
  };
}
