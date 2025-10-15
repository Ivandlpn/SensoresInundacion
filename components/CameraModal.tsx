import React from 'react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  cameraName: string;
  imageUrl: string;
}

const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, cameraName, imageUrl }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title-camera"
    >
      <div className="bg-white rounded-lg shadow-2xl w-1/2 h-1/2 flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 id="modal-title-camera" className="text-xl font-bold text-ineco-blue truncate">
            Vista de Cámara: <span className="font-mono text-ineco-dark-gray">{cameraName}</span>
          </h2>
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

        {/* Image Content */}
        <div className="flex-grow overflow-hidden flex items-center justify-center bg-gray-100 rounded-b-lg">
          <img 
            src={imageUrl} 
            alt={`Vista desde la cámara ${cameraName}`} 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default CameraModal;