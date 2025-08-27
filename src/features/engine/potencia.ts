// Engine functions for power calculations (active, reactive, apparent, power factor)
// phase: 'mono' for single-phase or 'tri' for three-phase systems

export type Phase = 'mono' | 'tri'

/**
 * Calculates active (real) power P in watts given voltage, current and power factor.
 * For single-phase: P = V * I * cosφ.
 * For three-phase: P = \u221a3 * V * I * cosφ.
 */
export function calculateActivePower(voltage: number, current: number, powerFactor: number, phase: Phase = 'mono'): number {
  if (phase === 'tri') {
    return Math.sqrt(3) * voltage * current * powerFactor;
  }
  return voltage * current * powerFactor;
}

/**
 * Calculates apparent power S in VA given voltage and current.
 * For single-phase: S = V * I.
 * For three-phase: S = \u221a3 * V * I.
 */
export function calculateApparentPower(voltage: number, current: number, phase: Phase = 'mono'): number {
  if (phase === 'tri') {
    return Math.sqrt(3) * voltage * current;
  }
  return voltage * current;
}

/**
 * Calculates power factor given active power and apparent power.
 */
export function calculatePowerFactor(activePower: number, apparentPower: number): number {
  if (apparentPower === 0) return 0;
  return activePower / apparentPower;
}

/**
 * Calculates reactive power Q in vars given active and apparent power.
 * Uses Q = \u221a(S^2 - P^2).
 */
export function calculateReactivePower(activePower: number, apparentPower: number): number {
  const squared = apparentPower * apparentPower - activePower * activePower;
  return Math.sqrt(Math.max(squared, 0));
}
