'use client';

import { useState, useEffect } from 'react';
import { MapPin, Factory, Users, TrendingUp } from 'lucide-react';

interface City {
  name: string;
  state: string;
  lat: number;
  lon: number;
  annualCO2: number;
  population: number;
  perCapita: number;
  mainSources: string[];
  rating: 'Low' | 'Medium' | 'High' | 'Very High';
}

const cities: City[] = [
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lon: 77.2090, annualCO2: 45.2, population: 16800000, perCapita: 2.69, mainSources: ['Transportation', 'Power Plants', 'Industry'], rating: 'Very High' },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777, annualCO2: 42.8, population: 20400000, perCapita: 2.10, mainSources: ['Industry', 'Transportation', 'Residential'], rating: 'Very High' },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639, annualCO2: 28.5, population: 14800000, perCapita: 1.93, mainSources: ['Industry', 'Power Plants', 'Transportation'], rating: 'High' },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lon: 77.5946, annualCO2: 32.4, population: 12400000, perCapita: 2.61, mainSources: ['Transportation', 'Residential', 'Industry'], rating: 'High' },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707, annualCO2: 26.7, population: 10700000, perCapita: 2.50, mainSources: ['Industry', 'Transportation', 'Power Plants'], rating: 'High' },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867, annualCO2: 24.3, population: 10000000, perCapita: 2.43, mainSources: ['Industry', 'Transportation', 'Residential'], rating: 'High' },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567, annualCO2: 22.1, population: 6400000, perCapita: 3.45, mainSources: ['Industry', 'Transportation', 'Residential'], rating: 'High' },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714, annualCO2: 18.9, population: 7600000, perCapita: 2.49, mainSources: ['Industry', 'Transportation', 'Power Plants'], rating: 'Medium' },
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lon: 72.8311, annualCO2: 16.2, population: 6100000, perCapita: 2.66, mainSources: ['Industry', 'Transportation', 'Residential'], rating: 'Medium' },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873, annualCO2: 12.4, population: 3900000, perCapita: 3.18, mainSources: ['Transportation', 'Industry', 'Residential'], rating: 'Medium' },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462, annualCO2: 14.8, population: 3400000, perCapita: 4.35, mainSources: ['Transportation', 'Residential', 'Industry'], rating: 'Medium' },
  { name: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lon: 80.3319, annualCO2: 11.6, population: 3200000, perCapita: 3.63, mainSources: ['Industry', 'Transportation', 'Power Plants'], rating: 'Medium' },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lon: 79.0882, annualCO2: 10.2, population: 2700000, perCapita: 3.78, mainSources: ['Transportation', 'Industry', 'Residential'], rating: 'Medium' },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577, annualCO2: 9.8, population: 2400000, perCapita: 4.08, mainSources: ['Industry', 'Transportation', 'Residential'], rating: 'Medium' },
  { name: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lon: 77.4126, annualCO2: 7.2, population: 2300000, perCapita: 3.13, mainSources: ['Transportation', 'Residential', 'Industry'], rating: 'Low' },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6869, lon: 83.2185, annualCO2: 13.5, population: 2200000, perCapita: 6.14, mainSources: ['Industry', 'Power Plants', 'Transportation'], rating: 'Medium' },
  { name: 'Patna', state: 'Bihar', lat: 25.5941, lon: 85.1376, annualCO2: 8.9, population: 2400000, perCapita: 3.71, mainSources: ['Transportation', 'Residential', 'Industry'], rating: 'Medium' },
  { name: 'Chandigarh', state: 'Chandigarh', lat: 30.7333, lon: 76.7794, annualCO2: 5.2, population: 1200000, perCapita: 4.33, mainSources: ['Transportation', 'Residential', 'Industry'], rating: 'Low' },
  { name: 'Kochi', state: 'Kerala', lat: 9.9312, lon: 76.2673, annualCO2: 6.8, population: 2100000, perCapita: 3.24, mainSources: ['Transportation', 'Industry', 'Residential'], rating: 'Low' },
  { name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lon: 76.9558, annualCO2: 8.4, population: 2200000, perCapita: 3.82, mainSources: ['Industry', 'Transportation', 'Residential'], rating: 'Medium' },
  { name: 'Guwahati', state: 'Assam', lat: 26.1445, lon: 91.7362, annualCO2: 4.3, population: 1200000, perCapita: 3.58, mainSources: ['Transportation', 'Residential', 'Industry'], rating: 'Low' },
  { name: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lon: 85.8245, annualCO2: 5.7, population: 1200000, perCapita: 4.75, mainSources: ['Transportation', 'Residential', 'Industry'], rating: 'Low' },
  { name: 'Ranchi', state: 'Jharkhand', lat: 23.3441, lon: 85.3096, annualCO2: 6.2, population: 1300000, perCapita: 4.77, mainSources: ['Industry', 'Transportation', 'Residential'], rating: 'Low' },
  { name: 'Raipur', state: 'Chhattisgarh', lat: 21.2514, lon: 81.6296, annualCO2: 7.5, population: 1300000, perCapita: 5.77, mainSources: ['Industry', 'Power Plants', 'Transportation'], rating: 'Medium' },
  { name: 'Amritsar', state: 'Punjab', lat: 31.6340, lon: 74.8723, annualCO2: 5.9, population: 1400000, perCapita: 4.21, mainSources: ['Transportation', 'Industry', 'Residential'], rating: 'Low' },
];

export default function IndiaEmissionsMap() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [filterRating, setFilterRating] = useState<string>('All');

  const filteredCities = filterRating === 'All' 
    ? cities 
    : cities.filter(c => c.rating === filterRating);

  const totalEmissions = filteredCities.reduce((sum, city) => sum + city.annualCO2, 0);
  const averagePerCapita = filteredCities.reduce((sum, city) => sum + city.perCapita, 0) / filteredCities.length;

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Low': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'High': return 'bg-orange-500';
      case 'Very High': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const top10Cities = [...cities].sort((a, b) => b.annualCO2 - a.annualCO2).slice(0, 10);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        India Emissions Map
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Explore carbon emissions across {cities.length} major cities in India
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-300" />
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Total Cities</h3>
          </div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">{filteredCities.length}</div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Factory className="w-5 h-5 text-red-600 dark:text-red-300" />
            <h3 className="font-semibold text-red-900 dark:text-red-100">Total Emissions</h3>
          </div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-300">{totalEmissions.toFixed(1)}M t</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-green-600 dark:text-green-300" />
            <h3 className="font-semibold text-green-900 dark:text-green-100">Avg Per Capita</h3>
          </div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-300">{averagePerCapita.toFixed(2)}t</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by Rating
        </label>
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        >
          <option value="All">All Cities</option>
          <option value="Low">Low Emissions</option>
          <option value="Medium">Medium Emissions</option>
          <option value="High">High Emissions</option>
          <option value="Very High">Very High Emissions</option>
        </select>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Top 10 Highest Emitting Cities</h3>
        <div className="space-y-3">
          {top10Cities.map((city, index) => (
            <div key={city.name} className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-gray-400 w-8">{index + 1}</div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">{city.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{city.state}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">{city.annualCO2}M t</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{city.perCapita}t per capita</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getRatingColor(city.rating)}`}>
                  {city.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filteredCities.map((city) => (
          <div
            key={city.name}
            onClick={() => setSelectedCity(city)}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white">{city.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{city.state}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getRatingColor(city.rating)}`}>
                {city.rating}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Annual CO₂:</p>
                <p className="font-semibold text-gray-800 dark:text-white">{city.annualCO2}M tonnes</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Per Capita:</p>
                <p className="font-semibold text-gray-800 dark:text-white">{city.perCapita}t</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Population:</p>
                <p className="font-semibold text-gray-800 dark:text-white">{(city.population / 1000000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Main Sources:</p>
                <p className="font-semibold text-gray-800 dark:text-white text-xs">{city.mainSources[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedCity(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedCity.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{selectedCity.state}</p>
              </div>
              <button
                onClick={() => setSelectedCity(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Annual CO₂ Emissions</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{selectedCity.annualCO2}M t</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Per Capita Emissions</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedCity.perCapita}t</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Population</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{(selectedCity.population / 1000000).toFixed(1)}M</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Impact Rating</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{selectedCity.rating}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Main Emission Sources</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCity.mainSources.map((source) => (
                    <span key={source} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Location</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Latitude: {selectedCity.lat.toFixed(4)}°, Longitude: {selectedCity.lon.toFixed(4)}°
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
