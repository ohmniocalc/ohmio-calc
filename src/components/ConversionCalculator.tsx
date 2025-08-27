import React, { useState } from 'react';
import {
  calculatePowerFactor,
  calculateApparentPower,
  calculateRealPower,
} from '../features/engine/conversion';

/**
 * ConversionCalculator component
 *
 * Provides a UI to convert between real power (P, in watts), apparent power (S, in VA)
 * and power factor (pf). Users select which variable to calculate and provide
 * the other two values. Results are displayed below the form. No units
 * conversion is performed here; inputs are assumed to be in compatible units.
 */
const ConversionCalculator: React.FC = () => {
  type CalcType = 'pf' | 'S' | 'P';
  const [calcType, setCalcType] = useState<CalcType>('pf');
  const [p, setP] = useState('');
  const [s, setS] = useState('');
  const [pf, setPf] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');
    try {
      const pVal = parseFloat(p);
      const sVal = parseFloat(s);
      const pfVal = parseFloat(pf);
      switch (calcType) {
        case 'pf':
          if (isNaN(pVal) || isNaN(sVal)) {
            setError('Introduce potencia real y aparente');
            return;
          }
          setResult(calculatePowerFactor(pVal, sVal));
          break;
        case 'S':
          if (isNaN(pVal) || isNaN(pfVal)) {
            setError('Introduce potencia real y factor de potencia');
            return;
          }
          setResult(calculateApparentPower(pVal, pfVal));
          break;
        case 'P':
          if (isNaN(sVal) || isNaN(pfVal)) {
            setError('Introduce potencia aparente y factor de potencia');
            return;
          }
          setResult(calculateRealPower(sVal, pfVal));
          break;
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="font-semibold">¿Qué deseas calcular?</label>
        <select
          value={calcType}
          onChange={(e) => setCalcType(e.target.value as CalcType)}
          className="border rounded p-2 w-full"
        >
          <option value="pf">Factor de potencia (pf)</option>
          <option value="S">Potencia aparente (S en VA)</option>
          <option value="P">Potencia real (P en W)</option>
        </select>
      </div>
      {calcType !== 'P' && (
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Potencia real P (W)</label>
          <input
            type="number"
            value={p}
            onChange={(e) => setP(e.target.value)}
            className="border rounded p-2"
            placeholder="por ejemplo 1000"
            min="0"
            step="any"
          />
        </div>
      )}
      {calcType !== 'pf' && (
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Factor de potencia (pf)</label>
          <input
            type="number"
            value={pf}
            onChange={(e) => setPf(e.target.value)}
            className="border rounded p-2"
            placeholder="0.8"
            min="0"
            max="1"
            step="any"
          />
        </div>
      )}
      {calcType !== 'S' && (
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Potencia aparente S (VA)</label>
          <input
            type="number"
            value={s}
            onChange={(e) => setS(e.target.value)}
            className="border rounded p-2"
            placeholder="1500"
            min="0"
            step="any"
          />
        </div>
      )}
      <button
        onClick={handleCalculate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Calcular
      </button>
      {error && <div className="text-red-600 font-medium">{error}</div>}
      {result !== null && (
        <div className="p-4 bg-gray-100 rounded border">
          {calcType === 'pf' && (
            <span>
              Factor de potencia calculado: <strong>{result.toFixed(4)}</strong>
            </span>
          )}
          {calcType === 'S' && (
            <span>
              Potencia aparente calculada: <strong>{result.toFixed(2)} VA</strong>
            </span>
          )}
          {calcType === 'P' && (
            <span>
              Potencia real calculada: <strong>{result.toFixed(2)} W</strong>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ConversionCalculator;