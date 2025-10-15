import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import MapView from './components/MapView';
import Dashboard from './components/Dashboard';
import SensorDetailPanel from './components/SensorDetailPanel';
import Footer from './components/Footer';
import CsiModal from './components/CsiModal';
import SystemOperationModal from './components/SystemOperationModal';
import { getSensors } from './services/sensorService';
import { Sensor } from './types';

// Se extiende la interfaz global Window para incluir el objeto 'L' de Leaflet.
// Esto es para que TypeScript no se queje de window.L
declare global {
  interface Window {
    L: any;
  }
}

// --- START: Documentation Modal Component ---
interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Icono SVG para los archivos PDF
const PdfIcon = () => (
    <svg className="w-6 h-6 mr-3 text-ineco-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8.343a2 2 0 00-.586-1.414l-4.343-4.343A2 2 0 0010.343 2H4zM14 9a1 1 0 01-1-1V4l4 4h-3z"></path>
    </svg>
);

const documentationFiles = [
    { name: 'IE 161229 Detector Inundación BM Req.pdf', url: 'https://ivandlpn.github.io/-Aplicaciones-Sensores/archivos/IE%20161229%20Detector%20Inundaci%C3%B3n%20BM%20Req.pdf' },
    { name: 'IT-141010-Detector de inundacionLAV.pdf', url: 'https://ivandlpn.github.io/-Aplicaciones-Sensores/archivos/IT-141010-Detector%20de%20inundacionLAV.pdf' },
    { name: 'ITV.151109-PROYECTO.DETECCION.INUNDACION.ALBALI.PK369.V1.0.pdf', url: 'https://ivandlpn.github.io/-Aplicaciones-Sensores/archivos/ITV.151109-PROYECTO.DETECCION.INUNDACION.ALBALI.PK369.V1.0.pdf' },
    { name: 'PM220322_PROCEDIMIENTO SENSOR INUNDACION CSI_V1.0.pdf', url: 'https://ivandlpn.github.io/-Aplicaciones-Sensores/archivos/PM220322_PROCEDIMIENTO%20SENSOR%20INUNDACION%20CSI_V1.0.pdf' }
];

const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
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
        aria-labelledby="modal-title-documentation"
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 id="modal-title-documentation" className="text-2xl font-bold text-ineco-blue">Documentación del Sistema</h2>
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
            <p className="text-sm text-gray-600 mb-4">
                Haga clic en un archivo para verlo. Los documentos se abrirán en una nueva pestaña.
            </p>
            <ul className="space-y-2">
                {documentationFiles.map((file, index) => (
                    <li key={index}>
                        <a 
                            href={file.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 hover:border-ineco-blue transition-all duration-150 group"
                        >
                            <PdfIcon />
                            <span className="font-medium text-ineco-dark-gray group-hover:text-ineco-blue text-sm break-all">{file.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-ineco-blue text-white font-semibold rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ineco-blue"
            >
                Cerrar
            </button>
        </div>
      </div>
    </div>
  );
};
// --- END: Documentation Modal Component ---


const App: React.FC = () => {
  const [sensors, setSensors] = useState<Sensor[] | null>(null);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isCsiModalOpen, setIsCsiModalOpen] = useState(false);
  const [isSystemOperationModalOpen, setIsSystemOperationModalOpen] = useState(false);
  const [isDocumentationModalOpen, setIsDocumentationModalOpen] = useState(false); // Nuevo estado

  useEffect(() => {
    const initialSensors = getSensors();
    setSensors(initialSensors);
  }, []);
  
  const initialBounds = useMemo(() => {
    if (!sensors || sensors.length === 0 || !window.L) return undefined;
    // Utiliza la utilidad de Leaflet para crear un objeto de límites a partir de las localizaciones de los sensores.
    return window.L.latLngBounds(sensors.map(s => s.location));
  }, [sensors]);

  const handleSensorSelect = useCallback((sensor: Sensor | null) => {
    setSelectedSensor(sensor);
  }, []);

  // Filter sensors based on the search term matching pk_location, name, linea or via
  const filteredSensors = useMemo(() => {
    if (!sensors) return []; // Devuelve un array vacío si los sensores aún no se han cargado
    
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    if (!lowercasedSearchTerm) {
      return sensors;
    }

    return sensors.filter(sensor =>
      sensor.pk_location.toLowerCase().includes(lowercasedSearchTerm) ||
      sensor.name.toLowerCase().includes(lowercasedSearchTerm) ||
      sensor.linea.toString().includes(lowercasedSearchTerm) ||
      sensor.via.toString().includes(lowercasedSearchTerm)
    );
  }, [sensors, searchTerm]);
  
  // Effect to clear selected sensor if it's filtered out
  useEffect(() => {
    if (selectedSensor && !filteredSensors.some(s => s.id === selectedSensor.id)) {
      handleSensorSelect(null);
    }
  }, [filteredSensors, selectedSensor, handleSensorSelect]);

  // Muestra un estado de carga hasta que los sensores y los límites iniciales estén disponibles.
  if (!sensors || !initialBounds) {
    return (
      <div className="flex flex-col h-screen bg-white text-ineco-dark-gray font-sans">
        <Header />
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-ineco-blue mx-auto"></div>
                <p className="mt-4 text-lg text-gray-500">Cargando datos de sensores...</p>
            </div>
        </div>
        <Footer 
          onOpenCsiModal={() => setIsCsiModalOpen(true)}
          onOpenSystemOperationModal={() => setIsSystemOperationModalOpen(true)}
          onOpenDocumentationModal={() => setIsDocumentationModalOpen(true)}
        />
        <CsiModal isOpen={isCsiModalOpen} onClose={() => setIsCsiModalOpen(false)} />
        <SystemOperationModal isOpen={isSystemOperationModalOpen} onClose={() => setIsSystemOperationModalOpen(false)} />
        <DocumentationModal isOpen={isDocumentationModalOpen} onClose={() => setIsDocumentationModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white text-ineco-dark-gray font-sans max-w-[92%] mx-auto shadow-2xl">
      <Header />
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0">
        <main className="flex-1 relative h-1/2 md:h-full">
          <MapView 
            sensors={filteredSensors}
            initialBounds={initialBounds}
            onSensorSelect={handleSensorSelect} 
            selectedSensorId={selectedSensor?.id ?? null} 
          />
        </main>
        <aside className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white border-t md:border-t-0 md:border-l border-gray-200 h-1/2 md:h-full shadow-lg z-20">
          <div className="p-4 h-full overflow-y-auto flex flex-col">
            {selectedSensor ? (
              <SensorDetailPanel 
                sensor={selectedSensor} 
                onClose={() => handleSensorSelect(null)} 
              />
            ) : (
              <Dashboard 
                sensors={filteredSensors} 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onSensorSelect={handleSensorSelect}
                selectedSensorId={selectedSensor?.id ?? null}
              />
            )}
          </div>
        </aside>
      </div>
      <Footer 
        onOpenCsiModal={() => setIsCsiModalOpen(true)}
        onOpenSystemOperationModal={() => setIsSystemOperationModalOpen(true)}
        onOpenDocumentationModal={() => setIsDocumentationModalOpen(true)}
      />
      <CsiModal isOpen={isCsiModalOpen} onClose={() => setIsCsiModalOpen(false)} />
      <SystemOperationModal isOpen={isSystemOperationModalOpen} onClose={() => setIsSystemOperationModalOpen(false)} />
      <DocumentationModal isOpen={isDocumentationModalOpen} onClose={() => setIsDocumentationModalOpen(false)} />
    </div>
  );
};

export default App;