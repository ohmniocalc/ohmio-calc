import React, { useState } from 'react';
import {
  calculateActivePower,
  calculateApparentPower,
  calculatePowerFactor,
  calculateReactivePower,
  Phae
} from '../features/engine/potencia';

const PotenciaCalculator: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('mono');
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [powerFactorInput, setPowerFactorInput] = useState('');
  const [results, setResults] = useState<{ P: number; S: number; Q: number; pf: number } | null>(null);

  const onCalculate = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const pf = parseFloat(powerFactorInput);
    if (isNaN(V) || isNaN(I) || isNaN(pf)) {
      setResults(null);
      return;
    }
    const P = calculateActivePower(V, I, pf, phase);
    const S = calculateApparentPower(V, I, phase);
    const pfCalc = calculatePowerFactor(P, S);
    const Q = calculateReactivePower(P, S);
    setResults({ P, S, Q, pf: pfCalc });
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tipo de sistema</label>
          <select
            value={phase}
            onChange={(e) => setPhase(e.target.value as Phase)}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="mono">Monofásico</option>
            <option value="tri">Trifásico</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tensión (V)</label>
          <input
            type="number"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            placeholder="230"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Corriente (A)</label>
          <input
            type="number"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            placeholder="10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Factor de potencia (cosφ)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={powerFactorInput}
            onChange={(e) => setPowerFactorInput(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            placeholder="0.8"
          />
        </div>
      </div>
      <button
        onClick={onCalculate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Calcular
      </button>
      {results && (
        <div className="border rounded p-4 bg-gray-50 dark:bg-gray-800">
          <p className="font-semibold">Potencia activa (P): {(results.P / 1000).toFixed(3)} kW</p>
          <p className="font-semibold">Potencia aparente (S): {(results.S / 1000).toFixed(3)} kVA</p>
          <p className="font-semibold">Potencia reactiva (Q): {(results.Q / 1000).toFixed(3)} kVAr</p>
          <p className="font-semibold">Factor de potencia (cosφ): {results.pf.toFixed(3)}</p>
        </div>
      )}
    </div>
  );
};

export default PotenciaCalculator;
