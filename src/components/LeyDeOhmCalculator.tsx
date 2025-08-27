import React, { useState } from 'react';
import { calculateCurrent, calculateVoltage, calculateResistance, calculatePower } from '../features/engine/leyDeOhm';

const LeyDeOhmCalculator: React.FC = () => {
  const [calcular, setCalcular] = useState<'V' | 'I' | 'R' | 'P'>('V');
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [cosPhi, setCosPhi] = useState('1');
  const [phase, setPhase] = useState<'mono' | 'tri'>('mono');
  const [result, setResult] = useState<number | null>(null);

  const onCalculate = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const R = parseFloat(resistance);
    const cos = parseFloat(cosPhi);
    let res: number | null = null;
    switch (calcular) {
      case 'V':
        if (!isNaN(I) && !isNaN(R)) {
          res = calculateVoltage(I, R);
        }
        break;
      case 'I':
        if (!isNaN(V) && !isNaN(R)) {
          res = calculateCurrent(V, R);
        }
        break;
      case 'R':
        if (!isNaN(V) && !isNaN(I)) {
          res = calculateResistance(V, I);
        }
        break;
      case 'P':
        if (!isNaN(V) && !isNaN(I)) {
          res = calculatePower(V, I, cos, phase);
        }
        break;
    }
    setResult(res);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">Variable a calcular</label>
        <select className="border px-2 py-1" value={calcular} onChange={e => setCalcular(e.target.value as any)}>
          <option value="V">Voltaje (V)</option>
          <option value="I">Corriente (A)</option>
          <option value="R">Resistencia (Ω)</option>
          <option value="P">Potencia (W)</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Voltaje (V)</label>
          <input type="number" className="border w-full px-2 py-1" value={voltage} onChange={e => setVoltage(e.target.value)} disabled={calcular === 'V'} placeholder="e.g. 230" />
        </div>
        <div>
          <label className="block mb-1">Corriente (A)</label>
          <input type="number" className="border w-full px-2 py-1" value={current} onChange={e => setCurrent(e.target.value)} disabled={calcular === 'I'} placeholder="e.g. 5" />
        </div>
        <div>
          <label className="block mb-1">Resistencia (Ω)</label>
          <input type="number" className="border w-full px-2 py-1" value={resistance} onChange={e => setResistance(e.target.value)} disabled={calcular === 'R'} placeholder="e.g. 50" />
        </div>
        <div>
          <label className="block mb-1">Factor de potencia cos φ</label>
          <input type="number" step="0.01" className="border w-full px-2 py-1" value={cosPhi} onChange={e => setCosPhi(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Sistema</label>
          <select className="border px-2 py-1 w-full" value={phase} onChange={e => setPhase(e.target.value as any)}>
            <option value="mono">Monofásico</option>
            <option value="tri">Trifásico</option>
          </select>
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onCalculate}>Calcular</button>
      {result !== null && (
        <div className="p-4 bg-gray-100 rounded">
          <p className="font-semibold">Resultado:</p>
          {calcular === 'V' && <p>Voltaje: {result.toFixed(2)} V</p>}
          {calcular === 'I' && <p>Corriente: {result.toFixed(2)} A</p>}
          {calcular === 'R' && <p>Resistencia: {result.toFixed(2)} Ω</p>}
          {calcular === 'P' && <p>Potencia: {result.toFixed(2)} W</p>}
        </div>
      )}
    </div>
  );
};

export default LeyDeOhmCalculator;
