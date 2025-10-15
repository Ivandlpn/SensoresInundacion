// Un servicio para mapear nombres de cámaras a sus URLs de imagen correspondientes.
// Los datos se cargan desde un archivo JSON externo y se almacenan en caché.

let cameraDataCache: Record<string, string> | null = null;

/**
 * Carga y almacena en caché los datos de las cámaras desde el archivo JSON.
 * @returns Un objeto que mapea los nombres de las cámaras a sus URLs.
 */
const loadCameraData = async (): Promise<Record<string, string>> => {
  if (cameraDataCache) {
    return cameraDataCache;
  }

  try {
    const response = await fetch('/data/cameras.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Record<string, string> = await response.json();
    cameraDataCache = data;
    return data;
  } catch (error) {
    console.error("No se pudieron cargar los datos de las cámaras:", error);
    return {}; // Devuelve un objeto vacío en caso de error.
  }
};


/**
 * Recupera la URL de la imagen para un nombre de cámara dado.
 * @param cameraName El identificador de la cámara.
 * @returns Una promesa que se resuelve con la URL de la imagen de la cámara, o null si no se encuentra.
 */
export const getCameraImageUrl = async (cameraName: string): Promise<string | null> => {
  const cameraMap = await loadCameraData();
  return cameraMap[cameraName] || null;
};
