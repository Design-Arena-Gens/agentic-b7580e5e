"use client";

import { useState } from "react";
import { Upload, Camera, AlertCircle } from "lucide-react";

interface Vehicle {
  id: string;
  type: string;
  make: string;
  model: string;
  color: string;
  fuelType: string;
  engineCapacity: string;
  year: number;
  condition: string;
  co2PerKm: number;
  annualCO2: number;
  fuelEfficiency: number;
  rating: "Low" | "Medium" | "High" | "Very High";
  confidence: number;
  identificationBasis: string;
}

export default function VehicleScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const analyzeVehicle = async () => {
    if (!file) return;

    setAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const mockVehicles: Vehicle[] = [
        {
          id: "1",
          type: "Sedan",
          make: "Toyota",
          model: "Camry",
          color: "Silver",
          fuelType: "Petrol",
          engineCapacity: "2.5L",
          year: 2020,
          condition: "Good",
          co2PerKm: 168,
          annualCO2: 3.36,
          fuelEfficiency: 14.5,
          rating: "Medium",
          confidence: 92,
          identificationBasis: "Body shape, front grille, headlight design",
        },
        {
          id: "2",
          type: "SUV",
          make: "Honda",
          model: "CR-V",
          color: "Black",
          fuelType: "Diesel",
          engineCapacity: "1.6L",
          year: 2019,
          condition: "Good",
          co2PerKm: 142,
          annualCO2: 2.84,
          fuelEfficiency: 17.8,
          rating: "Medium",
          confidence: 88,
          identificationBasis: "Vehicle profile, wheel design, body lines",
        },
      ];

      setVehicles(mockVehicles);
      setAnalyzing(false);
    }, 2000);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "High":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "Very High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Vehicle Carbon Scanner
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Upload a photo or video of vehicles to analyze their carbon emissions
      </p>

      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-8">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <label className="cursor-pointer">
            <span className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg inline-block">
              Choose File
            </span>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {file && (
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              Selected: {file.name}
            </p>
          )}
        </div>

        {file && (
          <button
            onClick={analyzeVehicle}
            disabled={analyzing}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {analyzing ? "Analyzing..." : "Analyze Vehicles"}
          </button>
        )}
      </div>

      {analyzing && (
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-blue-800 dark:text-blue-200">
            Analyzing vehicles using AI...
          </span>
        </div>
      )}

      {vehicles.length > 0 && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">
              Detection Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Vehicles:
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {vehicles.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Combined Annual Emissions:
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {vehicles.reduce((sum, v) => sum + v.annualCO2, 0).toFixed(2)}
                  t
                </p>
              </div>
            </div>
          </div>

          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                    {vehicle.make} {vehicle.model}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {vehicle.type} • {vehicle.color}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getRatingColor(vehicle.rating)}`}
                >
                  {vehicle.rating} Impact
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      Fuel Type:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {vehicle.fuelType}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      Engine:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {vehicle.engineCapacity}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      Year:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {vehicle.year}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      Condition:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {vehicle.condition}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      CO₂ per km:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {vehicle.co2PerKm}g/km
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      Annual CO₂:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {vehicle.annualCO2}t/year
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      Fuel Efficiency:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {vehicle.fuelEfficiency}km/L
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      Confidence:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {vehicle.confidence}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Identification basis:</span>{" "}
                  {vehicle.identificationBasis}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
