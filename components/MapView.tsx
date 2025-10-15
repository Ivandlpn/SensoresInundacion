import React, { useEffect, useRef, useMemo, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Sensor } from '../types';
import { getLine40Coordinates, getLine42Coordinates } from '../services/lineData';

// Se extiende la interfaz global Window para incluir el objeto 'L' de Leaflet.
declare global {
  interface Window {
    L: any;
  }
}

interface MapViewProps {
  sensors: Sensor[];
  initialBounds: any; // Objeto LatLngBounds de Leaflet
  onSensorSelect: (sensor: Sensor | null) => void;
  selectedSensorId: string | null;
}

const ICON_URL = 'https://cdn3d.iconscout.com/3d/premium/thumb/flood-sign-3d-icon-png-download-10771912.png';

/**
 * Crea un icono de sensor usando una imagen y aplica clases CSS para la selección.
 * @param isSelected Booleano que indica si el sensor está seleccionado.
 * @returns Un objeto L.Icon configurado.
 */
const createSensorImageIcon = (isSelected: boolean) => {
  const L = window.L;
  const size = 48; // Tamaño del icono en píxeles

  const classNames = ['sensor-image-icon'];

  if (isSelected) {
    classNames.push('selected-sensor-icon');
  }

  return L.icon({
    iconUrl: ICON_URL,
    iconSize: [size, size],
    // El ancla del icono se establece en el punto inferior central (la base del icono).
    // Esto es CRÍTICO para asegurar que el marcador permanezca fijo en su coordenada
    // geográfica exacta, sin importar el nivel de zoom.
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size], // Ancla el popup justo encima del punto de anclaje del icono para una posición precisa
    className: classNames.join(' '),
  });
};


/**
 * Componente que gestiona la lógica de renderizado de los marcadores de sensores.
 * Refactorizado para gestionar los marcadores de forma persistente y evitar que desaparezcan al seleccionarlos.
 */
// FIX: Corrected the props type for SensorMarkers to include the 'sensors' prop which it requires.
const SensorMarkers: React.FC<Omit<MapViewProps, 'initialBounds'>> = ({ onSensorSelect, selectedSensorId, sensors }) => {
  const map = useMap();
  // Usamos 'useRef' para mantener una referencia persistente al grupo de capas y a los marcadores individuales.
  const layerGroupRef = useRef<any>(null);
  const markersRef = useRef<{ [id: string]: any }>({});

  // Efecto 1: Se encarga de AÑADIR y QUITAR marcadores del mapa cuando la lista de 'sensors' cambia (ej: al filtrar).
  useEffect(() => {
    const L = window.L;
    if (!L) return;

    // Inicializa el grupo de capas una sola vez y lo añade al mapa.
    if (!layerGroupRef.current) {
      layerGroupRef.current = L.layerGroup().addTo(map);
    }
    const layerGroup = layerGroupRef.current;
    const markers = markersRef.current;
    const existingMarkerIds = Object.keys(markers);
    const sensorIdsToShow = new Set(sensors.map(s => s.id));

    // Eliminar marcadores que ya no están en la lista de sensores filtrados
    existingMarkerIds.forEach(id => {
      if (!sensorIdsToShow.has(id)) {
        layerGroup.removeLayer(markers[id]);
        delete markers[id];
      }
    });

    // Añadir nuevos marcadores que no existen todavía
    sensors.forEach(sensor => {
      if (!markers[sensor.id]) {
        const marker = L.marker(sensor.location);

        marker.on('click', (e: any) => {
          L.DomEvent.stopPropagation(e); // Evita que el clic se propague al mapa
          onSensorSelect(sensor);
        });

        // Se añaden listeners para controlar el efecto hover mediante JavaScript,
        // asegurando que no se aplique al sensor actualmente seleccionado.
        marker.on('mouseover', function (this: any) {
            // 'this' se refiere al marcador. Se accede a su icono.
            const icon = this._icon;
            // Se comprueba que el icono exista y que no tenga ya la clase del sensor seleccionado.
            if (icon && !icon.classList.contains('selected-sensor-icon')) {
                icon.classList.add('marker-hovered');
            }
        });

        marker.on('mouseout', function (this: any) {
            const icon = this._icon;
            if (icon) {
                icon.classList.remove('marker-hovered');
            }
        });

        // Contenido para el Pop-up que aparece al hacer clic
        const popupContent = `
          <div class="space-y-1 p-1 font-sans">
            <div class="font-bold text-base text-ineco-blue">${sensor.name}:</div>
            <div class="text-xs">
              <span class="font-semibold text-gray-500">Línea:</span>
              <span class="ml-1 text-ineco-dark-gray">${sensor.linea}</span>
            </div>
            <div class="text-xs">
              <span class="font-semibold text-gray-500">PK:</span>
              <span class="ml-1 text-ineco-dark-gray">${sensor.pk_location}</span>
            </div>
            <div class="text-xs">
              <span class="font-semibold text-gray-500">Vía:</span>
              <span class="ml-1 text-ineco-dark-gray">${sensor.via}</span>
            </div>
            <div class="text-xs">
              <span class="font-semibold text-gray-500">Tipo:</span>
              <span class="ml-1 text-ineco-dark-gray">${sensor.type}</span>
            </div>
          </div>`;
        marker.bindPopup(popupContent);

        // Contenido para el Tooltip que aparece al pasar el cursor (hover)
        const tooltipContent = `
          <div class="text-center">
            <div class="font-bold text-sm text-ineco-dark-gray">${sensor.name}</div>
            <div class="text-xs text-gray-600">${sensor.pk_location}</div>
          </div>`;
        
        // Asociar el tooltip al marcador para el efecto hover
        marker.bindTooltip(tooltipContent, {
          direction: 'top',
          offset: L.point(0, -48), // Ajusta la posición para que aparezca sobre el icono
          className: 'sensor-tooltip' // Clase CSS personalizada para el estilo
        });

        layerGroup.addLayer(marker);
        markers[sensor.id] = marker;
      }
    });

  }, [sensors, map, onSensorSelect]);


  // Efecto 2: Se encarga de ACTUALIZAR el estado visual (icono, zoom, popup) cuando 'selectedSensorId' cambia.
  useEffect(() => {
    const markers = markersRef.current;
    if (Object.keys(markers).length === 0) return;

    // Primero, actualizar el estado visual de todos los iconos.
    Object.keys(markers).forEach(id => {
      const marker = markers[id];
      const isSelected = id === selectedSensorId;
      marker.setIcon(createSensorImageIcon(isSelected));
      marker.setZIndexOffset(isSelected ? 1000 : 0);
    });

    // Luego, gestionar la vista del mapa y el popup.
    if (selectedSensorId && markers[selectedSensorId]) {
      const markerToOpen = markers[selectedSensorId];
      const targetLatLng = markerToOpen.getLatLng();
      const targetZoom = 14;

      const openThePopup = () => {
        if (map.hasLayer(markerToOpen) && !markerToOpen.isPopupOpen()) {
          markerToOpen.openPopup();
        }
      };
      
      // Se define un manejador de evento de un solo uso para cuando el movimiento del mapa termine.
      // Esto asegura que el popup se abra solo después de que la animación del mapa haya finalizado.
      const onMoveEnd = () => {
        openThePopup();
        map.off('moveend', onMoveEnd); // Importante: limpiar el listener.
      };

      map.on('moveend', onMoveEnd);

      // Se comanda al mapa que vuele a la nueva ubicación. Esta función proporciona una
      // animación suave de zoom y paneo, y el evento 'moveend' se disparará cuando termine.
      map.flyTo(targetLatLng, targetZoom);
      
    } else {
      // Si no hay ningún sensor seleccionado (e.g., al pulsar 'Volver'), se cierra el popup
      // y se reajusta la vista para mostrar los sensores actualmente filtrados.
      map.closePopup();

      if (sensors.length === 1) {
        // Si solo queda un sensor en la vista, se centra en él.
        map.setView(sensors[0].location, 14);
      } else if (sensors.length > 1) {
        // Si hay varios, se ajusta el zoom para que quepan todos en la vista.
        const L = window.L;
        const bounds = L.latLngBounds(sensors.map(s => s.location));
        map.fitBounds(bounds, { padding: [100, 100] });
      }
    }
  }, [selectedSensorId, map, sensors]); // Se añade 'sensors' para reaccionar a cambios en la lista

  return null;
};

// Componente para forzar la re-evaluación del tamaño del mapa y ajustar la vista.
const MapController = ({ sensors, onMapClick }: { sensors: Sensor[], onMapClick: () => void }) => {
    const map = useMap();
    const isInitialRender = useRef(true);

    // Calcula los límites geográficos usando useMemo para optimizar.
    const bounds = useMemo(() => {
        const L = window.L;
        // Se calcula los límites siempre que haya al menos un sensor.
        if (!L || sensors.length === 0) return null;
        return L.latLngBounds(sensors.map(s => s.location));
    }, [sensors]);

    // Efecto para ajustar la vista del mapa.
    useEffect(() => {
        // Un pequeño retardo asegura que el contenedor del mapa tenga su tamaño final,
        // especialmente en diseños complejos o responsivos.
        const timer = setTimeout(() => {
            map.invalidateSize(); // Primero, se actualiza el tamaño del mapa.

            // Para el render inicial, se ajusta la vista explícitamente a los límites.
            // Esto es más robusto que confiar únicamente en la prop 'bounds' de MapContainer,
            // ya que garantiza que el ajuste ocurra DESPUÉS de 'invalidateSize',
            // solucionando el problema del zoom inicial incorrecto.
            if (isInitialRender.current) {
                if (bounds) {
                    map.fitBounds(bounds, { padding: [100, 100] });
                }
                isInitialRender.current = false;
            } else {
                // Para renders subsecuentes (cuando se filtra), ajusta la vista.
                if (sensors.length === 1) {
                    map.setView(sensors[0].location, 14);
                } else if (bounds) {
                    map.fitBounds(bounds, { padding: [100, 100] });
                }
            }
        }, 100);
        
        return () => clearTimeout(timer);
    }, [map, sensors, bounds]); // Se ejecuta cuando los sensores (y por tanto los límites) cambian.
    
    // Efecto para gestionar el clic en el mapa para deseleccionar.
    useEffect(() => {
      map.on('click', onMapClick);
      return () => {
        map.off('click', onMapClick);
      };
    }, [map, onMapClick]);

    return null;
};

// Componente para renderizar la leyenda del mapa.
const Legend: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const L = window.L;
    if (!L) return;

    const legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'leaflet-control-legend');
      div.innerHTML = `
        <h4>Leyenda</h4>
        <div class="legend-item">
          <img src="${ICON_URL}" alt="Icono de Sensor" />
          <span>Ubicación del Sensor</span>
        </div>
        <div class="legend-item">
          <span class="legend-line" style="background-color: #FF0000;"></span>
          <span>Línea 40</span>
        </div>
         <div class="legend-item">
          <span class="legend-line" style="background-color: #1A4488;"></span>
          <span>Línea 42</span>
        </div>
      `;
      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
};

// Componente para el botón de "Resetear Vista"
const ResetViewControl: React.FC<{ sensors: Sensor[]; onSensorSelect: (sensor: Sensor | null) => void; }> = ({ sensors, onSensorSelect }) => {
  const map = useMap();

  useEffect(() => {
    const L = window.L;
    if (!L) return;

    // Se define una nueva clase de control en Leaflet si no existe
    if (!L.Control.ResetView) {
      L.Control.ResetView = L.Control.extend({
        onAdd: function(map: any) {
          // Crea el botón y le da las clases de Leaflet para un estilo consistente.
          const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-reset-view');
          
          // Icono SVG de "home"
          container.innerHTML = `<button title="Resetear Vista">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"></path></svg>
          </button>`;

          // Evita que los clics en el botón se propaguen al mapa.
          L.DomEvent.disableClickPropagation(container);

          // Lógica del clic
          container.onclick = (e) => {
            L.DomEvent.stop(e);
            
            // 1. Deselecciona cualquier sensor
            onSensorSelect(null);

            // 2. Si hay sensores, ajusta la vista del mapa para encuadrarlos.
            if (sensors && sensors.length > 0) {
              const bounds = L.latLngBounds(sensors.map(s => s.location));
              map.flyToBounds(bounds, { padding: [100, 100] });
            }
          };
          
          return container;
        },
        onRemove: function(map: any) {
          // No se necesita ninguna acción de limpieza aquí
        }
      });
    }
    
    // Factory para crear el control
    const resetViewControl = (opts: any) => new L.Control.ResetView(opts);
    
    // Añade el control al mapa
    const control = resetViewControl({ position: 'topleft' }).addTo(map);

    // Función de limpieza para eliminar el control si el componente se desmonta
    return () => {
      control.remove();
    };

  }, [map, sensors, onSensorSelect]);

  return null; // El componente no renderiza nada directamente en React
};

// Componente para renderizar la línea ferroviaria 40
const RailwayLineLayer: React.FC = () => {
  const map = useMap();
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);

  useEffect(() => {
    const fetchLineData = async () => {
        try {
            const coords = await getLine40Coordinates();
            setCoordinates(coords);
        } catch (error) {
            console.error("Error al cargar datos de la línea 40:", error);
        }
    };
    fetchLineData();
  }, []);

  useEffect(() => {
    if (coordinates.length === 0) return;
    
    const L = window.L;
    if (!L) return;

    const polyline = L.polyline(coordinates, {
      color: '#FF0000', // Color rojo brillante para máxima visibilidad
      weight: 4,
      opacity: 0.8,
    });

    polyline.bindTooltip("Línea 40", { sticky: true });
    polyline.addTo(map);

    // Función de limpieza para eliminar la línea si el componente se desmonta
    return () => {
      map.removeLayer(polyline);
    };
  }, [map, coordinates]);

  return null; // No renderiza nada directamente en React
};

// Componente para renderizar la línea ferroviaria 42
const RailwayLineLayer42: React.FC = () => {
  const map = useMap();
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);

  useEffect(() => {
      const fetchLineData = async () => {
          try {
              const coords = await getLine42Coordinates();
              setCoordinates(coords);
          } catch (error) {
              console.error("Error al cargar datos de la línea 42:", error);
          }
      };
      fetchLineData();
  }, []);

  useEffect(() => {
    if (coordinates.length === 0) return;

    const L = window.L;
    if (!L) return;

    const polyline = L.polyline(coordinates, {
      color: '#1A4488', // Color azul oscuro (ineco-blue)
      weight: 4,
      opacity: 0.8,
    });

    polyline.bindTooltip("Línea 42", { sticky: true });
    polyline.addTo(map);

    // Función de limpieza para eliminar la línea si el componente se desmonta
    return () => {
      map.removeLayer(polyline);
    };
  }, [map, coordinates]);

  return null; // No renderiza nada directamente en React
};


const MapView: React.FC<MapViewProps> = ({ sensors, initialBounds, onSensorSelect, selectedSensorId }) => {
  // Solo renderiza el MapContainer si los límites iniciales están definidos
  if (!initialBounds) {
    return null; // O un componente de carga si se prefiere
  }
  
  return (
    <MapContainer 
      bounds={initialBounds}
      boundsOptions={{ padding: [50, 50] }}
      scrollWheelZoom={true} 
      className="h-full w-full z-10" 
      attributionControl={false}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <MapController sensors={sensors} onMapClick={() => onSensorSelect(null)} />
      <SensorMarkers 
        sensors={sensors}
        onSensorSelect={onSensorSelect}
        selectedSensorId={selectedSensorId}
      />
      <RailwayLineLayer />
      <RailwayLineLayer42 />
      <ResetViewControl sensors={sensors} onSensorSelect={onSensorSelect} />
      <Legend />
    </MapContainer>
  );
};

export default MapView;
