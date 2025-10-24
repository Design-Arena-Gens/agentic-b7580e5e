'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingDown, Target, Calendar } from 'lucide-react';

interface Calculation {
  id: string;
  date: string;
  results: {
    transportation: number;
    energy: number;
    diet: number;
    waste: number;
    total: number;
  };
}

export default function ProgressTracking() {
  const [history, setHistory] = useState<Calculation[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('carbonHistory') || '[]');
    setHistory(saved);

    if (saved.length >= 2) {
      const first = saved[0];
      const latest = saved[saved.length - 1];
      const change = ((latest.results.total - first.results.total) / first.results.total) * 100;

      setStats({
        totalChange: change,
        current: latest.results.total,
        parisGoal: 2.0,
        progressToGoal: ((4.7 - latest.results.total) / (4.7 - 2.0)) * 100,
      });
    }
  }, []);

  const chartData = history.map((calc) => ({
    date: new Date(calc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Total: calc.results.total,
    Transportation: calc.results.transportation,
    Energy: calc.results.energy,
    Diet: calc.results.diet,
    Waste: calc.results.waste,
  }));

  if (history.length < 2) {
    return (
      <div className="text-center py-12">
        <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Not Enough Data
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Complete at least 2 calculations to track your progress
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Progress Tracking
      </h2>

      {stats && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Total Change</h3>
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">
              {stats.totalChange > 0 ? '+' : ''}{stats.totalChange.toFixed(1)}%
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
              Since first calculation
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-300" />
              <h3 className="font-semibold text-green-900 dark:text-green-100">Current Footprint</h3>
            </div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-300">
              {stats.current.toFixed(2)}t
            </div>
            <p className="text-sm text-green-700 dark:text-green-200 mt-1">
              CO₂e per year
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-purple-600 dark:text-purple-300" />
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">Paris Agreement Goal</h3>
            </div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-300">
              {Math.min(100, Math.max(0, stats.progressToGoal)).toFixed(0)}%
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-200 mt-1">
              Progress to 2.0t target
            </p>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Emissions Trend Over Time
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'CO₂ (tonnes)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Total" stroke="#10b981" strokeWidth={3} />
            <Line type="monotone" dataKey="Transportation" stroke="#ef4444" strokeWidth={2} />
            <Line type="monotone" dataKey="Energy" stroke="#f59e0b" strokeWidth={2} />
            <Line type="monotone" dataKey="Diet" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="Waste" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
          Achievement Milestones
        </h3>
        <div className="space-y-3">
          <div className={`flex items-center gap-3 ${history.length >= 1 ? 'opacity-100' : 'opacity-50'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${history.length >= 1 ? 'bg-green-500' : 'bg-gray-300'}`}>
              <span className="text-white font-bold">✓</span>
            </div>
            <span className="text-gray-700 dark:text-gray-300">First Calculation Completed</span>
          </div>
          <div className={`flex items-center gap-3 ${history.length >= 3 ? 'opacity-100' : 'opacity-50'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${history.length >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}>
              <span className="text-white font-bold">✓</span>
            </div>
            <span className="text-gray-700 dark:text-gray-300">3 Calculations - Tracking Started</span>
          </div>
          <div className={`flex items-center gap-3 ${history.length >= 5 ? 'opacity-100' : 'opacity-50'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${history.length >= 5 ? 'bg-green-500' : 'bg-gray-300'}`}>
              <span className="text-white font-bold">✓</span>
            </div>
            <span className="text-gray-700 dark:text-gray-300">5 Calculations - Committed to Change</span>
          </div>
          <div className={`flex items-center gap-3 ${stats && stats.current <= 4.7 ? 'opacity-100' : 'opacity-50'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stats && stats.current <= 4.7 ? 'bg-green-500' : 'bg-gray-300'}`}>
              <span className="text-white font-bold">✓</span>
            </div>
            <span className="text-gray-700 dark:text-gray-300">Below Global Average (4.7t)</span>
          </div>
          <div className={`flex items-center gap-3 ${stats && stats.current <= 2.0 ? 'opacity-100' : 'opacity-50'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stats && stats.current <= 2.0 ? 'bg-green-500' : 'bg-gray-300'}`}>
              <span className="text-white font-bold">✓</span>
            </div>
            <span className="text-gray-700 dark:text-gray-300">Paris Agreement Goal Achieved!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
