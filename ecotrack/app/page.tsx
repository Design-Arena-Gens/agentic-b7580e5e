'use client';

import { useState } from 'react';
import CarbonCalculator from '@/components/CarbonCalculator';
import VehicleScanner from '@/components/VehicleScanner';
import AirQualityMonitor from '@/components/AirQualityMonitor';
import IndiaEmissionsMap from '@/components/IndiaEmissionsMap';
import CalculationHistory from '@/components/CalculationHistory';
import ProgressTracking from '@/components/ProgressTracking';
import { Leaf, Car, Wind, Map, History, TrendingDown } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('calculator');

  const tabs = [
    { id: 'calculator', name: 'Carbon Calculator', icon: Leaf },
    { id: 'vehicle', name: 'Vehicle Scanner', icon: Car },
    { id: 'air', name: 'Air Quality', icon: Wind },
    { id: 'map', name: 'India Emissions', icon: Map },
    { id: 'history', name: 'History', icon: History },
    { id: 'progress', name: 'Progress', icon: TrendingDown },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-2 flex items-center justify-center gap-2">
            <Leaf className="w-10 h-10" />
            EcoTrack
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor, analyze, and reduce your carbon footprint
          </p>
        </header>

        <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8 p-2">
          <div className="flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          {activeTab === 'calculator' && <CarbonCalculator />}
          {activeTab === 'vehicle' && <VehicleScanner />}
          {activeTab === 'air' && <AirQualityMonitor />}
          {activeTab === 'map' && <IndiaEmissionsMap />}
          {activeTab === 'history' && <CalculationHistory />}
          {activeTab === 'progress' && <ProgressTracking />}
        </div>
      </div>
    </main>
  );
}
