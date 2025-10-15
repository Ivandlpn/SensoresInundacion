import React from 'react';

const Header: React.FC = () => {
  return (
    // Se ha aplicado un fondo semitransparente con desenfoque (backdrop-blur) para un efecto de profundidad.
    // Se han añadido bordes redondeados en la parte superior para que coincida con el nuevo contenedor principal.
    <header className="grid grid-cols-3 items-center p-4 bg-ineco-blue/80 backdrop-blur-lg text-white shadow-lg z-30 h-28 shrink-0 border-b border-white/20 rounded-t-xl">
      <div className="flex items-center justify-start">
        <img 
          src="https://www.ineco.com/ineco/sites/default/files/2022-12/Logo%20Ineco.png" 
          alt="Ineco Logo" 
          className="h-20 w-auto" // Se aumentó el tamaño del logo
          style={{ 
            filter: 'brightness(0) invert(1) drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
          }}
        />
      </div>
      <div className="text-center">
        <h1 
          className="text-5xl font-bold tracking-tight whitespace-nowrap" // Se aumentó el tamaño y el grosor de la fuente
          style={{ textShadow: '0 2px 6px rgba(0,0,0,0.5)' }} // Se mejoró la sombra del texto para dar profundidad
        >
          Sensores de Inundación LAV Este
        </h1>
      </div>
      {/* Columna derecha vacía para mantener el título centrado */}
      <div></div>
    </header>
  );
};

export default Header;