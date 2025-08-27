/*
 * conversion.ts
 *
 * Functions to convert between real power (watts), apparent power (volt-amps)
 * and power factor (pf). These functions handle simple relationships without
 * considering phase (single or three‑phase) because power factor is independent
 * of phase. All inputs are numbers assumed to be in consistent units.
 *
 * P (real power) = S (apparent power) × pf
 * S (apparent power) = P / pf
 * pf (power factor) = P / S
 */

export function calculatePowerFactor(pWatts: number, sVA: number): number {
  if (sVA === 0) {
    throw new Error('Apparent power cannot be zero when calculating power factor');
  }
  return pWatts / sVA;
}

export function calculateApparentPower(pWatts: number, powerFactor: number): number {
  if (powerFactor === 0) {
    throw new Error('Power factor cannot be zero when calculating apparent power');
  }
  return pWatts / powerFactor;
}

export function calculateRealPower(sVA: number, powerFactor: number): number {
  return sVA * powerFactor;
}
