// services/sensorTypeService.ts

// Mapea los nombres de los tipos de sensor a sus respectivas URLs de imágenes.
const sensorTypeImageMap: Record<string, string> = {
  'Honeywell 470-12': 'https://ivandlpn.github.io/SensoresInundacion/sensor/honeywell.png',
  'SLB Systems Water Sensor': 'https://ivandlpn.github.io/SensoresInundacion/sensor/SLB.png',
};

/**
 * Obtiene la URL de la imagen para un tipo de sensor específico.
 * @param sensorType El nombre del tipo de sensor.
 * @returns La URL de la imagen del sensor o null si no se encuentra.
 */
export const getSensorTypeImageUrl = (sensorType: string): string | null => {
  return sensorTypeImageMap[sensorType] || null;
};
