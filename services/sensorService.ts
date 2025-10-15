import { Sensor } from '../types';

let cachedSensors: Sensor[] | null = null;

/**
 * Obtiene los datos de los sensores.
 * La primera vez, los carga desde un archivo JSON externo y los almacena en caché.
 * Las llamadas posteriores devuelven los datos cacheados para mejorar el rendimiento.
 * @returns Una promesa que se resuelve con un array de objetos Sensor.
 */
export const getSensors = async (): Promise<Sensor[]> => {
  if (cachedSensors) {
    return cachedSensors;
  }

  try {
    const response = await fetch('/data/sensors.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const sensors: Sensor[] = await response.json();
    cachedSensors = sensors;
    return sensors;
  } catch (error) {
    console.error("No se pudieron cargar los datos de los sensores:", error);
    return []; // Devuelve un array vacío en caso de error para evitar que la app se rompa.
  }
};
