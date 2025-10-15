import React from 'react';

interface FooterProps {
    onOpenCsiModal: () => void;
    onOpenSystemOperationModal: () => void;
    onOpenDocumentationModal: () => void;
}

// Icono de alerta para el botón de actuación CSI.
const CsiAlertIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.001-1.742 3.001H4.42c-1.532 0-2.492-1.667-1.742-3.001l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

// Icono de engranaje para el botón de funcionamiento del sistema.
const SystemCogIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.532 1.532 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
);

// Icono de documento para el botón de Documentación
const DocumentIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8.343a2 2 0 00-.586-1.414l-4.343-4.343A2 2 0 0010.343 2H4zM14 9a1 1 0 01-1-1V4l4 4h-3z"></path>
    </svg>
);

const Footer: React.FC<FooterProps> = ({ onOpenCsiModal, onOpenSystemOperationModal, onOpenDocumentationModal }) => {
    return (
        <footer className="bg-ineco-blue text-white">
            <div className="mx-auto px-4 py-6 flex items-center justify-between">
                {/* Lado izquierdo: Botones */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onOpenSystemOperationModal}
                        className="flex items-center bg-white/10 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-white/20 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ineco-blue focus:ring-white"
                    >
                        <SystemCogIcon />
                        FUNCIONAMIENTO DEL SISTEMA
                    </button>
                    <button
                        onClick={onOpenDocumentationModal}
                        className="flex items-center bg-white/10 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-white/20 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ineco-blue focus:ring-white"
                    >
                        <DocumentIcon />
                        DOCUMENTACIÓN
                    </button>
                    <button
                        onClick={onOpenCsiModal}
                        className="flex items-center bg-ineco-red text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-opacity-90 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ineco-blue focus:ring-white"
                    >
                        <CsiAlertIcon />
                        ACTUACIÓN CSI
                    </button>
                </div>
                
                {/* Lado derecho: Texto de copyright alineado a la derecha */}
                <p className="text-sm text-gray-300 whitespace-nowrap">
                    &copy; 2025 Ineco. Creado por AT Comunicaciones LAV ESTE
                </p>

                {/* El logo de Ineco ha sido eliminado */}
            </div>
        </footer>
    );
};

export default Footer;