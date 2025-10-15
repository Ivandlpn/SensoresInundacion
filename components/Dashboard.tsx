import React from 'react';
import { Sensor } from '../types';
import SensorIcon from './SensorIcon';

interface DashboardProps {
  sensors: Sensor[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSensorSelect: (sensor: Sensor) => void;
  selectedSensorId: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ sensors, searchTerm, onSearchChange, onSensorSelect, selectedSensorId }) => {
  const total = sensors.length;

  return (
    <div className="flex flex-col h-full">
      {/* Search and Summary (Fixed Section) */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-ineco-blue mb-3">Buscar Sensor</h2>
          <input
            type="text"
            placeholder="Filtrar por PK, nombre, línea o vía..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ineco-blue text-sm"
            aria-label="Buscar sensor por PK, nombre, línea o vía"
          />
        </div>

        <h2 className="text-lg font-semibold text-ineco-blue mb-3">Resumen de Sensores</h2>
        <div className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col items-center justify-center shadow-sm mb-4">
          <span className="text-4xl font-bold text-ineco-blue">{total}</span>
          <span className="text-sm text-gray-500 uppercase tracking-wider mt-1">Sensores Mostrados</span>
        </div>
      </div>
      
      {/* Scrollable Sensor List */}
      <div className="flex-1 min-h-0 overflow-y-auto border-t border-gray-200 -mx-4 px-4 pt-2">
         {sensors.length > 0 ? (
          <ul className="space-y-2 py-1">
            {sensors.map(sensor => (
              <li key={sensor.id}>
                <button
                  onClick={() => onSensorSelect(sensor)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 flex items-center space-x-3 relative overflow-hidden ${
                    selectedSensorId === sensor.id 
                      ? 'bg-ineco-blue text-white border-ineco-blue shadow-lg' 
                      : 'bg-white border-gray-200 hover:border-ineco-blue hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-ineco-blue'
                  }`}
                  aria-current={selectedSensorId === sensor.id ? 'true' : 'false'}
                >
                  {/* Colored bar for Linea */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${sensor.linea === 40 ? 'bg-ineco-red' : 'bg-ineco-blue'}`}></div>
                  
                  {/* Icon */}
                  <div className={`flex-shrink-0 p-2 rounded-full ${selectedSensorId === sensor.id ? 'bg-white/20' : 'bg-gray-100'}`}>
                      <SensorIcon className={`w-5 h-5 ${selectedSensorId === sensor.id ? 'text-white' : 'text-ineco-blue'}`} />
                  </div>

                  {/* Text content */}
                  <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{sensor.name}</p>
                      <p className={`text-xs ${selectedSensorId === sensor.id ? 'text-gray-200' : 'text-gray-600'}`}>
                          {sensor.pk_location}
                      </p>
                  </div>
                  
                  {/* Right-aligned info */}
                  <div className={`text-xs text-right pr-1 flex-shrink-0 ${ selectedSensorId === sensor.id ? 'text-gray-300' : 'text-gray-500'}`}>
                      <p>Línea: {sensor.linea}</p>
                      <p>Vía: {sensor.via}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-6 text-sm">No se encontraron sensores.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;