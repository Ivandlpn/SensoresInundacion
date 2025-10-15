import React from 'react';

interface SystemOperationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Iconos SVG para el flujo de funcionamiento
const SensorIcon = () => (
    <svg className="w-8 h-8 text-ineco-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.75 2.25l-2.5 19.5"></path></svg>
);

const CabinetIcon = () => (
    <svg className="w-8 h-8 text-ineco-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
);

const NetworkIcon = () => (
    <svg className="w-8 h-8 text-ineco-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.862 12.524 9.386 12 10 12h4c.614 0 1.138.524 1.316 1.342m-5.932 2.658C8.138 17.476 8.524 18 9 18h6c.476 0 .862-.524 1.068-1.342M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l1.414 1.414M4.222 4.222l1.414 1.414m12.728 0l-1.414 1.414M5.636 18.364l-1.414 1.414"></path></svg>
);

const MonitorIcon = () => (
    <svg className="w-8 h-8 text-ineco-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
);

const ArrowDown = () => (
    <div className="flex justify-center items-center my-2">
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
    </div>
);


const SystemOperationModal: React.FC<SystemOperationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title-system"
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 id="modal-title-system" className="text-2xl font-bold text-ineco-blue">Funcionamiento del Sistema de Alarma</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-800 transition-colors"
            aria-label="Cerrar modal"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-gray-700">
            <p className="text-sm text-center text-gray-500 mb-6">La alarma de inundación se transporta hasta CSI siguiendo el siguiente flujo:</p>

            <div className="flex flex-col items-center">
                {/* Step 1 */}
                <div className="flex items-center w-full max-w-lg">
                    <SensorIcon />
                    <div className="ml-4">
                        <h4 className="font-semibold">1. Sensor de Humedad</h4>
                        <p className="text-sm text-gray-600">La señal parte del sensor (dos electrodos) al detectar agua en el punto de inundación.</p>
                    </div>
                </div>
                <ArrowDown />

                {/* Step 2 */}
                <div className="flex items-center w-full max-w-lg">
                    <CabinetIcon />
                    <div className="ml-4">
                        <h4 className="font-semibold">2. Electrónica Detectora</h4>
                        <p className="text-sm text-gray-600">Instalada en el armario VCA más cercano, el detector se activa cerrando un contacto libre de potencial.</p>
                    </div>
                </div>
                <ArrowDown />

                {/* Step 3 */}
                <div className="flex items-center w-full max-w-lg">
                    <NetworkIcon />
                    <div className="ml-4">
                        <h4 className="font-semibold">3. Módulo de Red SDH</h4>
                        <p className="text-sm text-gray-600">La señal se lleva al módulo SDH (1662 o 1642) a través del puerto de alarmas "house keeping".</p>
                    </div>
                </div>
                <ArrowDown />

                {/* Step 4 */}
                <div className="flex items-center w-full max-w-lg">
                    <MonitorIcon />
                    <div className="ml-4">
                        <h4 className="font-semibold">4. Gestor de Alarmas CSI</h4>
                        <p className="text-sm text-gray-600">La alarma se registra y visualiza en el gestor "1353_NM" del CRC de Albacete.</p>
                        <p className="text-xs text-gray-500 mt-2 p-2 bg-gray-100 rounded">Ejemplo: <code className="font-mono">ALARMA DE INUNDACION A6V_T_389,17_DM01</code>.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-ineco-blue text-white font-semibold rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ineco-blue"
            >
                Entendido
            </button>
        </div>
      </div>
    </div>
  );
};

export default SystemOperationModal;
