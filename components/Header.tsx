import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="grid grid-cols-3 items-center p-4 bg-ineco-blue text-white shadow-sm z-30 h-24 shrink-0">
      <div className="flex items-center justify-start">
        <img 
          src="https://www.ineco.com/ineco/sites/default/files/2022-12/Logo%20Ineco.png" 
          alt="Ineco Logo" 
          className="h-16 w-auto"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight whitespace-nowrap">Sensores de Inundación LAV Este</h1>
      </div>
      {/* Columna derecha vacía para mantener el título centrado */}
      <div></div>
    </header>
  );
};

export default Header;