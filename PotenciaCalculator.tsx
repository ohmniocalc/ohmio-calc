import React, { useState } from 'react';

import {
  calculateActivePower,
  calculateApparentPower,
  calculatePowerFactor,
  calculateReactivePower,
} from '../features/engine/potencia';

// Define the allowed phase types.  A monofásico (single‑phase) circuit
// uses a different formula than a trifásico (three‑phase) circuit.
type Phase = 'mono' | 'tri';

/**
 * PotenciaCalculator renders a form to compute active (P), apparent (S)
 * and reactive (Q) power given voltage, current and power factor.
 *
 * The user can select between single‑phase and three‑phase systems.
 * When the form is submitted, the results are displayed below.
 */
const PotenciaCalculator: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('mono');
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [powerFactorInput, setPowerFactorInput] = useState('');
  const [results, setResults] = useState<{
    P: number;
    S: number;
    Q: number;
    pf: number;
  } | null>(null);

  /**
   * Handle click on the Calculate button.  Parses inputs and calls
   * the engine functions to compute P, S, Q and the derived power factor.
   */
  const onCalculate = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const pfInput = parseFloat(powerFactorInput);
    if (isNaN(V) || isNaN(I) || isNaN(pfInput)) {
      setResults(null);
      return;
    }
    // Compute the powers using the pure engine functions.  For three‑phase
    // systems, calculateActivePower and calculateApparentPower account
    // for the √3 multiplier.
    const P = calculateActivePower(V, I, pfInput, phase);
    const S = calculateApparentPower(V, I, phase);
    const pfCalculated = calculatePowerFactor(P, S);
    const Q = calculateReactivePower(P, S);
    setResults({ P, S, Q, pf: pfCalculated });
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Sistema</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={phase}
            onChange={(e) => setPhase(e.target.value as Phase)}
          >
            <option value="mono">Monofásico</option>
            <option value="tri">Trifásico</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Tensión (V)</label>
          <input
            type="number"
            step="any"
            className="w-full mt-1 p-2 border rounded"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Corriente (A)</label>
          <input
            type="number"
            step="any"
            className="w-full mt-1 p-2 border rounded"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Factor de potencia (cosφ)</label>
          <input
            type="number"
            step="any"
            className="w-full mt-1 p-2 border rounded"
            value={powerFactorInput}
            onChange={(e) => setPowerFactorInput(e.target.value)}
          />
        </div>
      </div>
      <button
        className="bg-brand text-white px-4 py-2 rounded"
        type="button"
        onClick={onCalculate}
      >
        Calcular
      </button>
      {results && (
        <div className="p-4 border rounded space-y-2">
          <p>Potencia activa (P): {results.P.toFixed(2)} W</p>
          <p>Potencia aparente (S): {results.S.toFixed(2)} VA</p>
          <p>Potencia reactiva (Q): {results.Q.toFixed(2)} var</p>
          <p>Factor de potencia calculado: {results.pf.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
};

export default PotenciaCalculator;
