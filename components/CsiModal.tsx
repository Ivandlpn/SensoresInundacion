import React from 'react';

interface CsiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Iconos SVG para mejorar la presentación visual del protocolo
const AlertIcon = () => (
  <svg className="w-6 h-6 mr-3 text-ineco-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
);

const CameraIcon = () => (
    <svg className="w-6 h-6 mr-3 text-ineco-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

const UserGroupIcon = () => (
    <svg className="w-6 h-6 mr-3 text-ineco-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

const PhoneIcon = () => (
    <svg className="w-6 h-6 mr-3 text-ineco-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);

const WrenchIcon = () => (
    <svg className="w-6 h-6 mr-3 text-ineco-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
);


const CsiModal: React.FC<CsiModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Cierra el modal solo si se hace clic directamente en el fondo
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
        aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 id="modal-title" className="text-2xl font-bold text-ineco-blue">Protocolo de Actuación CSI</h2>
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
        <div className="p-6 overflow-y-auto space-y-6 text-gray-700">
          <div className="flex items-start bg-red-50 border-l-4 border-ineco-red p-4 rounded-r-lg">
              <AlertIcon/>
              <div>
                  <h3 className="font-semibold text-ineco-red mb-1">Activación de Alarma</h3>
                  <p className="text-sm">
                    En caso de que el agua llegue al sensor, una alarma de “HouseKeeping” conectada al nodo SDH llegará al gestor de telecomunicaciones de la red de datos SDH “1353_NM” de CSI del CRC de Albacete.
                  </p>
              </div>
          </div>

          <div>
              <h3 className="text-lg font-semibold text-ineco-dark-gray mb-4">Secuencia de Actuación:</h3>
              <ul className="space-y-4">
                  <li className="flex items-start">
                      <CameraIcon/>
                      <div>
                          <p className="font-semibold">1. Aviso y Visionado de Cámaras</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Se dará aviso al regulador para solicitar a CPS el visionado de las cámaras más cercanas al PK del sensor o se accederá directamente al visionado si es posible.
                          </p>
                      </div>
                  </li>
                  <li className="flex items-start">
                      <UserGroupIcon/>
                      <div>
                          <p className="font-semibold">2. Confirmación y Aviso a IyV</p>
                          <p className="text-sm text-gray-600 mt-1">
                          Si se observa acumulación de agua (o no es posible el visionado), se avisará al personal de guardia de IyV para que acuda al emplazamiento.
                          </p>
                      </div>
                  </li>
                  <li className="flex items-start">
                      <PhoneIcon/>
                      <div>
                          <p className="font-semibold">3. Escalado a Nivel 2</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Si se confirma una elevada acumulación de agua, se avisará por llamada al personal de Nivel 2 de guardia de la base correspondiente y se informará de las medidas de circulación adoptadas (p.e. LTV).
                          </p>
                      </div>
                  </li>
                   <li className="flex items-start">
                      <WrenchIcon/>
                      <div>
                          <p className="font-semibold">4. Gestión de Falsa Alarma</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Si se detecta que es una falsa alarma, se deberá avisar al personal de IISS de guardia, responsable del mantenimiento del equipo.
                          </p>
                      </div>
                  </li>
              </ul>
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

export default CsiModal;