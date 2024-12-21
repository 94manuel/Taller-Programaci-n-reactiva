import { from, merge, Observable } from "rxjs";
import { filter, map, mergeMap, scan } from "rxjs/operators";
import { Sensor, ProcessedSensor } from "../domain/sensor";

export class SensorService {
  /**
   * Procesa dos listas de sensores aplicando operadores reactivos.
   * @param sensors1 Lista de sensores iniciales.
   * @param sensors2 Lista de sensores adicionales.
   * @returns Observable<ProcessedSensor> - Flujo combinado de sensores procesados.
   */
  processSensors(
    sensors1: Sensor[],
    sensors2: Sensor[]
  ): Observable<ProcessedSensor[]> {
    /**
     * Procesa sensores1 para:
     * 1. Filtrar los valores mayores a 50 (filter).
     * 2. Mapear para agregar un estado 'High' a sensores filtrados (map).
     * 3. Expandir cada sensor en dos objetos (uno con alerta) (mergeMap).
     */
    const processedSensors1: Observable<ProcessedSensor> = from(sensors1).pipe(
      filter((sensor: Sensor) => sensor.value > 50), // Filtra sensores con valores > 50.
      map((sensor: Sensor) => ({ ...sensor, status: "High" })), // Añade estado 'High'.
      mergeMap(
        (sensor: ProcessedSensor) => from([sensor, { ...sensor, alert: true }]) // Duplica objetos añadiendo alerta.
      )
    );

    /**
     * Procesa sensores2 para:
     * 1. Mapear valores ajustados incrementándolos en 10% (map).
     * 2. Filtrar sensores procesados para asegurar que están ajustados (filter).
     */
    const processedSensors2: Observable<ProcessedSensor> = from(sensors2).pipe(
      map((sensor: Sensor) => ({
        ...sensor,
        adjustedValue: sensor.value * 1.1,
      })), // Incrementa en 10%.
      filter((sensor: ProcessedSensor) => sensor.adjustedValue !== undefined) // Asegura ajuste válido.
    );

    /**
     * Combina los dos flujos procesados en un solo flujo reactivo (merge).
     */
    const combined = merge(processedSensors1, processedSensors2);

    /**
     * Agrega operador scan para:
     * 1. Acumular resultados en una lista a medida que llegan (scan).
     */
    return combined.pipe(
      scan((acc: ProcessedSensor[], sensor: ProcessedSensor) => {
        acc.push(sensor); // Acumula sensores procesados en una lista.
        return acc;
      }, [] as ProcessedSensor[]) // Inicializa la lista acumuladora.
    );
  }
}
