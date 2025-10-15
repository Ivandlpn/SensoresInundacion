export interface Sensor {
  id: string;
  name: string;
  pk_location: string;
  location: [number, number];
  type: string;
  linea: number;
  via: number;
  maintenanceBase: string;
  associatedCamera?: string | string[];
}