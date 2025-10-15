interface LinePoint {
    Linea: string;
    PK: string;
    Longitud: string;
    Latitud: string;
}

interface LineData {
    line40: LinePoint[];
    line42: LinePoint[];
}

let lineDataCache: LineData | null = null;

/**
 * Carga los datos de las líneas desde un archivo JSON si aún no están en caché.
 * @returns Una promesa que se resuelve con los datos de todas las líneas.
 */
const loadLineData = async (): Promise<LineData> => {
    if (lineDataCache) {
        return lineDataCache;
    }
    try {
        const response = await fetch('/data/lines.json');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data: LineData = await response.json();
        lineDataCache = data;
        return data;
    } catch (error) {
        console.error("No se pudieron cargar los datos de las líneas:", error);
        // Devuelve un objeto vacío para evitar que la aplicación falle.
        return { line40: [], line42: [] };
    }
};

/**
 * Obtiene las coordenadas para la Línea 40.
 * @returns Una promesa que se resuelve con un array de tuplas de coordenadas [latitud, longitud].
 */
export const getLine40Coordinates = async (): Promise<[number, number][]> => {
    const data = await loadLineData();
    return data.line40.map(point => [
        parseFloat(point.Latitud),
        parseFloat(point.Longitud)
    ]);
};

/**
 * Obtiene las coordenadas para la Línea 42.
 * @returns Una promesa que se resuelve con un array de tuplas de coordenadas [latitud, longitud].
 */
export const getLine42Coordinates = async (): Promise<[number, number][]> => {
    const data = await loadLineData();
    return data.line42.map(point => [
        parseFloat(point.Latitud),
        parseFloat(point.Longitud)
    ]);
};
