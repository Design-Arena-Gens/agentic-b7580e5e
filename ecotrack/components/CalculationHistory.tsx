'use client';

import { useState, useEffect } from 'react';
import { Clock, Car, Zap, Utensils, Trash2 } from 'lucide-react';

interface Calculation {
  id: string;
  date: string;
  data: {
    carKm: number;
    airHours: number;
    electricity: number;
    diet: string;
    waste: number;
  };
  results: {
    transportation: number;
    energy: number;
    diet: number;
    waste: number;
    total: number;
  };
}

export default function CalculationHistory() {
  const [history, setHistory] = useState<Calculation[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('carbonHistory') || '[]');
    setHistory(saved.reverse());
  }, []);

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Calculations Yet</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Calculate your carbon footprint to see your history here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Calculation History
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        View all your past carbon footprint calculations
      </p>

      <div className="space-y-4">
        {history.map((calc) => (
          <div key={calc.id} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {calc.results.total.toFixed(2)}t CO₂e/year
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {new Date(calc.date).toLocaleDateString()} at {new Date(calc.date).toLocaleTimeString()}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                calc.results.total > 4.7
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {calc.results.total > 4.7 ? 'Above Average' : 'Below Average'}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Car className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-300">Transportation</span>
                </div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {calc.results.transportation.toFixed(2)}t
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-300">Energy</span>
                </div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {calc.results.energy.toFixed(2)}t
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Utensils className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-300">Diet</span>
                </div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {calc.results.diet.toFixed(2)}t
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Trash2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-300">Waste</span>
                </div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {calc.results.waste.toFixed(2)}t
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Input:</span> {calc.data.carKm}km car, 
                {calc.data.airHours}h flight, {calc.data.electricity}kWh electricity, 
                {calc.data.diet} diet, {calc.data.waste}kg waste
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
