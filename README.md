# Taller sobre Operadores de Programación Reactiva en TypeScript

Este proyecto demuestra el uso de cinco operadores de programación reactiva (**map**, **filter**, **flatMap (mergeMap)**, **merge**, y **scan**) utilizando **RxJS** en **TypeScript**. El objetivo es mostrar cómo manejar flujos de datos de manera reactiva siguiendo la arquitectura **DDD (Domain-Driven Design)**.

---

## 📋 Requisitos previos

- **Node.js** instalado (versión 14 o superior).
- Conocimientos básicos de **TypeScript** y programación reactiva.
- Editor de texto como **Visual Studio Code**.

---

## 🚀 Instalación y configuración

1. **Clonar el repositorio** o descargar el archivo ZIP proporcionado.
2. **Instalar las dependencias** ejecutando:
   ```bash
   npm install
   ```
3. **Ejecutar el proyecto**:
   ```bash
   npm run start
   ```

---

## 📂 Estructura del Proyecto

```bash
src/
├── domain/
│   ├── sensor.ts        # Definiciones de modelos y tipos.
├── application/
│   ├── sensorService.ts # Servicio que contiene la lógica reactiva.
├── presentation/
│   ├── controller.ts    # Controlador para ejecutar el ejemplo.
├── package.json         # Dependencias y scripts.
└── tsconfig.json        # Configuración de TypeScript.
```

---

## 🛠️ Descripción del código

### **1. Dominio**

Define los modelos básicos para los sensores:

```typescript
export interface Sensor {
  id: number;
  type: string;
  value: number;
}

export interface ProcessedSensor extends Sensor {
  status?: string;
  alert?: boolean;
  adjustedValue?: number;
}
```

### **2. Aplicación**

Implementa la lógica de negocio utilizando los operadores:

```typescript
filter: // Filtra los sensores con valores mayores a 50.
map: // Modifica los objetos agregando propiedades como 'status'.
mergeMap: // Duplica objetos añadiendo nuevas propiedades como 'alert'.
merge: // Combina dos flujos de datos en uno solo.
scan: // Acumula los sensores procesados en una lista.
```

Ejemplo del operador **filter**:

```typescript
filter((sensor: Sensor) => sensor.value > 50);
```

Ejemplo del operador **map**:

```typescript
map((sensor: Sensor) => ({ ...sensor, status: "High" }));
```

Ejemplo del operador **mergeMap**:

```typescript
mergeMap((sensor: ProcessedSensor) =>
  from([sensor, { ...sensor, alert: true }])
);
```

Ejemplo del operador **merge**:

```typescript
merge(processedSensors1, processedSensors2);
```

Ejemplo del operador **scan**:

```typescript
scan((acc: ProcessedSensor[], sensor: ProcessedSensor) => {
  acc.push(sensor);
  return acc;
}, [] as ProcessedSensor[]);
```

### **3. Presentación**

El controlador ejecuta el ejemplo:

```typescript
const service = new SensorService();
service
  .processSensors(sensors1, sensors2)
  .subscribe((sensor) => console.log(sensor));
```

---

## 📊 Resultado esperado

Al ejecutar el proyecto, se mostrarán los sensores procesados en la consola, con propiedades adicionales como **status**, **alert**, y **adjustedValue**. Por ejemplo:

```
{ id: 1, type: 'Temperature', value: 80, status: 'High' }
{ id: 1, type: 'Temperature', value: 80, status: 'High', alert: true }
{ id: 3, type: 'Temperature', value: 60, adjustedValue: 66 }
```

---

## 📄 Notas adicionales

- **No se requiere Docker** para ejecutar este proyecto.
- El código sigue principios de **DDD (Domain-Driven Design)** dividiendo el proyecto en capas: **Dominio**, **Aplicación**, y **Presentación**.
- Los operadores utilizados están actualizados y compatibles con las últimas versiones de **RxJS**.

---

## 📝 Autor Manuel Fernando Santofimio Tovar

Proyecto desarrollado como parte del taller de operadores de programación reactiva en TypeScript.
