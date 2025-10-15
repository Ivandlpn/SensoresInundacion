import { Sensor } from '../types';

// Converts DMS (Degrees, Minutes, Seconds) to Decimal Degrees
const dmsToDd = (degrees: number, minutes: number, seconds: number, direction: 'N' | 'S' | 'E' | 'W'): number => {
    let dd = degrees + minutes / 60 + seconds / 3600;
    if (direction === 'S' || direction === 'W') {
        dd = dd * -1;
    }
    return dd;
};

// Datos de sensores según la información proporcionada.
// Las coordenadas se han convertido de formato DMS (Grados, Minutos, Segundos) a Grados Decimales para su uso en el mapa.
const initialSensors: Sensor[] = [
  {
    id: 'sensor-001',
    name: 'Túnel de Huerta de Colas',
    pk_location: 'Pk 289+800',
    linea: 40,
    via: 1,
    location: [dmsToDd(39, 31, 39.0, 'N'), dmsToDd(1, 33, 5.0, 'W')], // 39°31'39.0"N 1°33'05.0"W
    type: 'Honeywell 470-12',
  },
  {
    id: 'sensor-002',
    name: 'Túnel Rabosera',
    pk_location: 'Pk 346+650',
    linea: 40,
    via: 1,
    location: [dmsToDd(39, 27, 35.5, 'N'), dmsToDd(0, 55, 49.7, 'W')], // 39°27'35.5"N 0°55'49.7"W
    type: 'Honeywell 470-12',
  },
  {
    id: 'sensor-003',
    name: 'Túnel La Cabrera',
    pk_location: 'Pk 351+350',
    linea: 40,
    via: 1,
    location: [dmsToDd(39, 27, 42.1, 'N'), dmsToDd(0, 52, 34.5, 'W')], // 39°27'42.1"N 0°52'34.5"W
    type: 'SLB Systems Water Sensor',
  },
  {
    id: 'sensor-004',
    name: 'Desmonte Chiva',
    pk_location: 'Pk 374+300',
    linea: 40,
    via: 2,
    location: [dmsToDd(39, 28, 25.0, 'N'), dmsToDd(0, 37, 9.9, 'W')], // 39°28'25.0"N 0°37'09.9"W
    type: 'Honeywell 470-12',
  },
  {
    id: 'sensor-005',
    name: 'Caseta Túnel Torrente',
    pk_location: 'Pk 389+200',
    linea: 40,
    via: 2,
    location: [dmsToDd(39, 26, 57.5, 'N'), dmsToDd(0, 27, 16.4, 'W')], // 39°26'57.5"N 0°27'16.4"W
    type: 'Honeywell 470-12',
  },
   {
    id: 'sensor-006',
    name: 'PICV 329',
    pk_location: 'Pk 329+138',
    linea: 42,
    via: 2,
    // Coordenada original: 38°56'60.0"N 1°46'44.6"W
    // Nota: 60.0 segundos equivalen a 1 minuto, por lo que la latitud se convierte en 38°57'0.0"N.
    // Esta conversión es estándar y asegura la ubicación correcta en el mapa.
    location: [dmsToDd(38, 57, 0.0, 'N'), dmsToDd(1, 46, 44.6, 'W')],
    type: 'SLB Systems Water Sensor',
  },
  {
    id: 'sensor-007',
    name: 'Bonete',
    pk_location: 'Pk 368+950',
    linea: 42,
    via: 1,
    location: [dmsToDd(38, 54, 19.6, 'N'), dmsToDd(1, 22, 44.9, 'W')], // 38°54'19.6"N 1°22'44.9"W
    type: 'Honeywell 470-12',
  }
];

export const getSensors = (): Sensor[] => {
  return initialSensors;
};