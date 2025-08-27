/**
 * Ley de Ohm calculations.
 * Provide functions to calculate voltage, current, resistance and power.
 * All values are in SI units: V (volts), I (amps), R (ohms), P (watts).
 */

export function calculateCurrent(voltage: number, resistance: number): number {
  return voltage / resistance;
}

export function calculateVoltage(current: number, resistance: number): number {
  return current * resistance;
}

export function calculateResistance(voltage: number, current: number): number {
  return voltage / current;
}

/**
 * Calculates power in a circuit. For DC or single-phase AC, P = V * I * cosPhi.
 * For three-phase, P = sqrt(3) * V * I * cosPhi.
 * @param voltage rms voltage (line to line for 3-phase)
 * @param current rms current
 * @param cosPhi power factor (0-1). default 1 for DC/resistive.
 * @param phases 'mono' for single-phase or 'tri' for three-phase
 */
export function calculatePower(
  voltage: number,
  current: number,
  cosPhi: number = 1,
  phases: 'mono' | 'tri' = 'mono'
): number {
  if (phases === 'tri') {
    return Math.sqrt(3) * voltage * current * cosPhi;
  }
  return voltage * current * cosPhi;
}
