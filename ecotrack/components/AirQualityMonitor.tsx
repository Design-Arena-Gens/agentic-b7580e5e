'use client';

import { useState, useEffect } from 'react';
import { MapPin, Wind, AlertTriangle } from 'lucide-react';

interface AQIData {
  aqi: number;
  location: string;
  pollutants: {
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    co: number;
    so2: number;
  };
  mainPollutant: string;
  healthAdvisory: string;
}

export default function AirQualityMonitor() {
  const [loading, setLoading] = useState(false);
  const [aqiData, setAqiData] = useState<AQIData | null>(null);

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchAQI(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error(error);
          fetchAQI(28.6139, 77.209);
        }
      );
    } else {
      fetchAQI(28.6139, 77.209);
    }
  };

  const fetchAQI = async (lat: number, lon: number) => {
    setTimeout(() => {
      const mockData: AQIData = {
        aqi: 156,
        location: 'Delhi, India',
        pollutants: {
          pm25: 89.4,
          pm10: 142.3,
          o3: 45.2,
          no2: 52.7,
          co: 1.2,
          so2: 15.3,
        },
        mainPollutant: 'PM2.5',
        healthAdvisory: 'Unhealthy for Sensitive Groups. People with respiratory conditions should limit outdoor activities.',
      };
      setAqiData(mockData);
      setLoading(false);
    }, 1500);
  };

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { level: 'Good', color: 'bg-green-500', textColor: 'text-green-700 dark:text-green-300' };
    if (aqi <= 100) return { level: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-700 dark:text-yellow-300' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500', textColor: 'text-orange-700 dark:text-orange-300' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'bg-red-500', textColor: 'text-red-700 dark:text-red-300' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: 'bg-purple-500', textColor: 'text-purple-700 dark:text-purple-300' };
    return { level: 'Hazardous', color: 'bg-red-900', textColor: 'text-red-900 dark:text-red-300' };
  };

  const aqiLevel = aqiData ? getAQILevel(aqiData.aqi) : null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Air Quality Monitor
      </h2>

      <button
        onClick={getLocation}
        disabled={loading}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        <MapPin className="w-5 h-5" />
        {loading ? 'Getting Location...' : 'Get Current Air Quality'}
      </button>

      {loading && (
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-blue-800 dark:text-blue-200">Fetching air quality data...</span>
        </div>
      )}

      {aqiData && aqiLevel && (
        <div className="space-y-4">
          <div className={`${aqiLevel.color} p-6 rounded-lg text-white`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wind className="w-6 h-6" />
                <h3 className="text-xl font-bold">{aqiData.location}</h3>
              </div>
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-center my-4">
              <div className="text-6xl font-bold">{aqiData.aqi}</div>
              <div className="text-xl font-semibold mt-2">{aqiLevel.level}</div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-700 dark:text-yellow-300 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Health Advisory</h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">{aqiData.healthAdvisory}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h4 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Pollutant Levels</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">PM2.5:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{aqiData.pollutants.pm25} μg/m³</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">PM10:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{aqiData.pollutants.pm10} μg/m³</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">O₃ (Ozone):</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{aqiData.pollutants.o3} ppb</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">NO₂:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{aqiData.pollutants.no2} ppb</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">CO:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{aqiData.pollutants.co} ppm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">SO₂:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{aqiData.pollutants.so2} ppb</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-600 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Main Pollutant:</span> {aqiData.mainPollutant}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">AQI Scale Guide</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-12 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-700 dark:text-gray-300">0-50: Good</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-4 bg-yellow-500 rounded"></div>
                <span className="text-gray-700 dark:text-gray-300">51-100: Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-4 bg-orange-500 rounded"></div>
                <span className="text-gray-700 dark:text-gray-300">101-150: Unhealthy for Sensitive Groups</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-700 dark:text-gray-300">151-200: Unhealthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-4 bg-purple-500 rounded"></div>
                <span className="text-gray-700 dark:text-gray-300">201-300: Very Unhealthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-4 bg-red-900 rounded"></div>
                <span className="text-gray-700 dark:text-gray-300">300+: Hazardous</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
