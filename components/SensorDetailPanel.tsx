import React from 'react';
import { Sensor } from '../types';

interface SensorDetailPanelProps {
  sensor: Sensor | null;
  onClose: () => void;
}

// Se ha rediseñado el componente 'DetailItem' para que muestre la etiqueta encima del valor,
// siguiendo el formato solicitado por el usuario para mayor claridad.
const DetailItem: React.FC<{ label: string; value: string | number; }> = ({ label, value }) => (
    <div className="py-3 border-b border-gray-200">
        <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-md text-ineco-dark-gray font-semibold mt-1">{value}</p>
    </div>
);

const SensorDetailPanel: React.FC<SensorDetailPanelProps> = ({ sensor, onClose }) => {
  if (!sensor) {
    // This case should not be reached due to the conditional rendering in App.tsx
    // but it's good practice to keep it.
    return <div className="text-center text-gray-500 mt-10">Seleccione un sensor en el mapa para ver los detalles.</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <button 
          onClick={onClose} 
          className="flex items-center text-sm text-gray-600 hover:text-ineco-blue mb-3 transition-colors duration-150"
          aria-label="Volver a la lista de sensores"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
        <h3 className="text-xl font-bold text-ineco-blue">{sensor.name}</h3>
      </div>
      
      <div className="flex-grow space-y-1">
        <div>
            <h4 className="text-md font-semibold text-ineco-dark-gray mb-2">Detalles</h4>
            {/* Se ha reordenado la lista de detalles para que siga la secuencia solicitada:
                Línea, Ubicación (PK), Vía y, finalmente, Tipo de Sensor. */}
            <DetailItem label="Línea" value={sensor.linea} />
            <DetailItem label="Ubicación (PK)" value={sensor.pk_location} />
            <DetailItem label="Vía" value={sensor.via} />
            <DetailItem label="Tipo de Sensor" value={sensor.type} />
        </div>
      </div>
    </div>
  );
};

export default SensorDetailPanel;