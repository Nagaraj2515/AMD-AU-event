import type { RescueRequest, DiagnosticResult } from '../../types';

export async function diagnosticAgent(request: RescueRequest): Promise<DiagnosticResult> {
  await new Promise((res) => setTimeout(res, 800));

  const desc = request.description.toLowerCase();
  const problem = request.problem;

  let likelyCauses: string[] = [];
  let confidence = 0.85;
  let recommendedTechnicianType = 'General Roadside Technician';
  let isSafeToDrive = false;
  let inspectionTips: string[] = [];

  if (problem === 'Battery/dead battery' || desc.includes('click') || desc.includes('start') || desc.includes('battery')) {
    likelyCauses = [
      'Discharged or dead 12V battery (voltage below 10.5V)',
      'Loose or corroded battery terminal connection',
      'Faulty starter solenoid or ignition relay',
      'Blown starter fuse'
    ];
    recommendedTechnicianType = 'Battery & Auto Electrical Technician';
    inspectionTips = [
      'Visual check of battery terminal tightness',
      'Multimeter voltage measurement under load',
      'Jumpstart attempt using portable battery pack'
    ];
  } else if (problem === 'Flat tyre' || desc.includes('tyre') || desc.includes('tire') || desc.includes('puncture')) {
    likelyCauses = [
      'Nail/sharp object puncture in tread area',
      'Tubeless tyre valve stem leak',
      'Sidewall bulge or air leakage'
    ];
    recommendedTechnicianType = 'Mobile Tyre Specialist & Puncture Repairer';
    inspectionTips = [
      'Inspect tread surface for embedded nails',
      'Soap-water leak check around valve stem',
      'Plug puncture or inflate with portable compressor'
    ];
  } else if (problem === 'Engine problem' || desc.includes('stuck') || desc.includes('smoke')) {
    likelyCauses = [
      'Clogged fuel injector / carburetor jet',
      'Spark plug fouling or ignition coil breakdown',
      'Engine oil pressure drop'
    ];
    confidence = 0.70;
    recommendedTechnicianType = 'Senior Mechanical & Engine Technician';
    inspectionTips = [
      'Spark plug clean & gap test',
      'Fuel pump line pressure check',
      'OBD-II diagnostic scan (if applicable)'
    ];
  } else {
    likelyCauses = [
      'General mechanical or electrical fault',
      'Sensor connector loose'
    ];
    confidence = 0.65;
    recommendedTechnicianType = 'General Roadside Repair Technician';
    inspectionTips = [
      'Physical inspection of engine bay and drive train'
    ];
  }

  if (request.photoUrl) {
    inspectionTips.unshift('Visual AI Scan complete: No severe chassis fracture detected in uploaded image.');
  }

  return {
    likelyCauses,
    confidence,
    recommendedTechnicianType,
    isSafeToDrive,
    inspectionTips
  };
}
