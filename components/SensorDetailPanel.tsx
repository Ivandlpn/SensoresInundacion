import React from 'react';
import { Sensor } from '../types';
import SensorIcon from './SensorIcon';

interface SensorDetailPanelProps {
  sensor: Sensor;
  onClose: () => void;
  onOpenCameraModal: (cameraName: string) => void;
  onOpenSensorTypeModal: (sensorType: string) => void;
}

// --- START: SVG Icons for Detail Cards ---
const LineIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
);

const TrackIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16m16-16v16M4 12h16M4 8h16M4 16h16" />
    </svg>
);

const ChipIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V5m0 14v-1M9 6l1.004-1.004a1 1 0 011.414 0l1.582 1.582a1 1 0 001.414 0L15 6m-3 12l-1.004 1.004a1 1 0 01-1.414 0l-1.582-1.582a1 1 0 00-1.414 0L9 18m0-6h6m-6 3h6m-6-6h6" />
    </svg>
);

const WrenchIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CameraIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const NoCameraIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.586 15.586a2 2 0 01-2.828 0L12 14.828l-.758.758a2 2 0 01-2.828-2.828L10.172 12l-.758-.758a2 2 0 012.828-2.828L12 9.172l.758-.758a2 2 0 012.828 2.828L13.828 12l.758.758z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const EyeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
// --- END: SVG Icons ---


const InfoCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string | number;
    onClick?: () => void;
    showActionIndicator?: boolean;
}> = ({ icon, label, value, onClick, showActionIndicator = false }) => {
    const isClickable = !!onClick;
    const Wrapper = isClickable ? 'button' : 'div';
    
    return (
        <Wrapper
            className={`group bg-white rounded-lg p-3 flex items-center justify-between space-x-3 border border-gray-200 shadow-sm w-full text-left ${
                isClickable ? 'cursor-pointer hover:border-ineco-blue hover:bg-blue-50/70 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ineco-blue' : ''
            }`}
            onClick={onClick}
            aria-label={isClickable ? `Ver detalles de ${label}` : undefined}
        >
            <div className="flex items-center space-x-3 flex-grow min-w-0">
                <div className="flex-shrink-0 bg-ineco-blue/10 text-ineco-blue p-2 rounded-full">
                    {icon}
                </div>
                <div className="flex-grow min-w-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-semibold text-ineco-dark-gray truncate">{value}</p>
                </div>
            </div>
            {showActionIndicator && isClickable && (
                <div className="flex-shrink-0 text-gray-400 group-hover:text-ineco-blue transition-colors duration-150">
                    <EyeIcon className="w-6 h-6" />
                </div>
            )}
        </Wrapper>
    );
};


const SensorDetailPanel: React.FC<SensorDetailPanelProps> = ({ sensor, onClose, onOpenCameraModal, onOpenSensorTypeModal }) => {
  // Normaliza los datos de la cámara en una lista para un manejo consistente.
  const cameraList = React.useMemo(() => {
    if (Array.isArray(sensor.associatedCamera)) {
      return sensor.associatedCamera;
    }
    if (sensor.associatedCamera && sensor.associatedCamera !== 'Pendiente de asignar') {
      return [sensor.associatedCamera];
    }
    return [];
  }, [sensor.associatedCamera]);

  const hasCamera = cameraList.length > 0;

  return (
    <div className="flex flex-col h-full bg-gray-50 -m-4 p-4">
      {/* Header Section */}
      <div className="pb-4 border-b border-gray-200">
        <button 
          onClick={onClose} 
          className="flex items-center text-sm text-gray-600 hover:text-ineco-blue mb-4 transition-colors duration-150"
          aria-label="Volver a la lista de sensores"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a la lista
        </button>
        <div className="flex items-center">
            <div className="flex-shrink-0 bg-ineco-blue/10 p-3 rounded-lg mr-4">
                <SensorIcon className="w-8 h-8 text-ineco-blue" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-ineco-blue leading-tight">{sensor.name}</h3>
                <p className="text-sm text-gray-500 font-semibold">{sensor.pk_location}</p>
            </div>
        </div>
      </div>
      
      {/* Scrollable Details Area */}
      <div className="flex-grow overflow-y-auto pt-4 -mr-2 pr-2">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Detalles del Sensor</h4>
        <div className="grid grid-cols-1 gap-3">
            <InfoCard icon={<LineIcon />} label="Línea" value={sensor.linea} />
            <InfoCard icon={<TrackIcon />} label="Vía" value={sensor.via} />
            <InfoCard 
              icon={<ChipIcon />} 
              label="Tipo de Sensor" 
              value={sensor.type} 
              onClick={() => onOpenSensorTypeModal(sensor.type)}
              showActionIndicator={true}
            />
            <InfoCard icon={<WrenchIcon />} label="Mantenimiento" value={sensor.maintenanceBase} />
        </div>

        {/* Camera Section */}
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-6 mb-3">Verificación Visual</h4>
        {hasCamera ? (
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="space-y-4">
              {cameraList.map((cameraName, index) => (
                <div key={index} className="flex flex-col">
                  <div>
                    <p className="text-xs text-gray-500">
                      Cámara Asociada {cameraList.length > 1 ? `#${index + 1}` : ''}
                    </p>
                    <p className="text-md font-semibold font-mono text-ineco-dark-gray break-all">
                      {cameraName}
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenCameraModal(cameraName)}
                    className="flex items-center justify-center w-full mt-3 text-sm font-semibold bg-ineco-blue text-white py-2 px-3 rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-sm"
                    aria-label={`Ver imagen de la cámara ${cameraName}`}
                  >
                    <CameraIcon className="w-5 h-5 mr-2" />
                    Ver Imagen
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-4 border border-dashed border-gray-300">
             <div className="flex items-center">
               <div className="flex-shrink-0 bg-gray-200 text-gray-400 p-2 rounded-full">
                <NoCameraIcon className="w-6 h-6"/>
               </div>
               <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-600">Sin Cámara Asignada</p>
                  <p className="text-xs text-gray-500">
                    {typeof sensor.associatedCamera === 'string' ? sensor.associatedCamera : 'Pendiente de asignar'}
                  </p>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SensorDetailPanel;