"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Car, Zap, Utensils, Trash2, AlertCircle } from "lucide-react";

interface FormData {
  carKm: number;
  airHours: number;
  electricity: number;
  diet: "vegan" | "vegetarian" | "light-meat" | "medium-meat" | "heavy-meat";
  waste: number;
}

interface Calculation {
  id: string;
  date: string;
  data: FormData;
  results: {
    transportation: number;
    energy: number;
    diet: number;
    waste: number;
    total: number;
  };
}

const dietEmissions = {
  vegan: 1.5,
  vegetarian: 1.7,
  "light-meat": 2.5,
  "medium-meat": 3.3,
  "heavy-meat": 3.9,
};

const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"];

export default function CarbonCalculator() {
  const [formData, setFormData] = useState<FormData>({
    carKm: 0,
    airHours: 0,
    electricity: 0,
    diet: "medium-meat",
    waste: 0,
  });

  const [results, setResults] = useState<any>(null);

  const calculateEmissions = () => {
    const transportation = formData.carKm * 0.00012 + formData.airHours * 0.25;
    const energy = formData.electricity * 0.012 * 0.0005;
    const diet = dietEmissions[formData.diet];
    const waste = formData.waste * 0.012 * 0.05;

    const total = transportation + energy + diet + waste;

    const results = {
      transportation,
      energy,
      diet,
      waste,
      total,
    };

    setResults(results);

    // Save to localStorage
    const calculation: Calculation = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      data: formData,
      results,
    };

    const history = JSON.parse(localStorage.getItem("carbonHistory") || "[]");
    history.push(calculation);
    localStorage.setItem("carbonHistory", JSON.stringify(history));
  };

  const chartData = results
    ? [
        { name: "Transportation", value: results.transportation },
        { name: "Energy", value: results.energy },
        { name: "Diet", value: results.diet },
        { name: "Waste", value: results.waste },
      ]
    : [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Carbon Footprint Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Car className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                Transportation
              </h3>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-300">
                Car Travel (km/year)
                <input
                  type="number"
                  value={formData.carKm}
                  onChange={(e) =>
                    setFormData({ ...formData, carKm: Number(e.target.value) })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white p-2"
                />
              </label>
              <label className="block text-sm text-gray-600 dark:text-gray-300">
                Air Travel (hours/year)
                <input
                  type="number"
                  value={formData.airHours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      airHours: Number(e.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white p-2"
                />
              </label>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                Household Energy
              </h3>
            </div>
            <label className="block text-sm text-gray-600 dark:text-gray-300">
              Monthly Electricity (kWh)
              <input
                type="number"
                value={formData.electricity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    electricity: Number(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white p-2"
              />
            </label>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Utensils className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                Diet
              </h3>
            </div>
            <label className="block text-sm text-gray-600 dark:text-gray-300">
              Diet Type
              <select
                value={formData.diet}
                onChange={(e) =>
                  setFormData({ ...formData, diet: e.target.value as any })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white p-2"
              >
                <option value="vegan">Vegan (1.5t CO₂e/year)</option>
                <option value="vegetarian">Vegetarian (1.7t CO₂e/year)</option>
                <option value="light-meat">Light Meat (2.5t CO₂e/year)</option>
                <option value="medium-meat">
                  Medium Meat (3.3t CO₂e/year)
                </option>
                <option value="heavy-meat">Heavy Meat (3.9t CO₂e/year)</option>
              </select>
            </label>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Trash2 className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                Waste Management
              </h3>
            </div>
            <label className="block text-sm text-gray-600 dark:text-gray-300">
              Monthly Waste (kg)
              <input
                type="number"
                value={formData.waste}
                onChange={(e) =>
                  setFormData({ ...formData, waste: Number(e.target.value) })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white p-2"
              />
            </label>
          </div>

          <button
            onClick={calculateEmissions}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Calculate Carbon Footprint
          </button>
        </div>

        {results && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Your Results
              </h3>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-green-600 dark:text-green-400">
                  {results.total.toFixed(2)}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  tonnes CO₂e/year
                </div>
              </div>

              <div
                className={`flex items-center gap-2 p-3 rounded-lg ${
                  results.total > 4.7
                    ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                    : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                }`}
              >
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {results.total > 4.7
                    ? `${((results.total / 4.7 - 1) * 100).toFixed(0)}% above global average (4.7t)`
                    : `${((1 - results.total / 4.7) * 100).toFixed(0)}% below global average (4.7t)`}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
                Breakdown by Category
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) =>
                      `${name}: ${((percent as number) * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `${value.toFixed(2)}t`}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Transportation:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {results.transportation.toFixed(2)}t
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Energy:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {results.energy.toFixed(2)}t
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Diet:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {results.diet.toFixed(2)}t
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Waste:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {results.waste.toFixed(2)}t
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Recommendations
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                {results.transportation > 1 && (
                  <li>Consider carpooling or public transportation</li>
                )}
                {results.energy > 0.5 && (
                  <li>Switch to renewable energy sources</li>
                )}
                {results.diet > 2 && (
                  <li>Reduce meat consumption for lower emissions</li>
                )}
                {results.waste > 0.3 && (
                  <li>Increase recycling and composting efforts</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
