import { SensorService } from "../application/sensorService";
import { Sensor } from "../domain/sensor";

const sensors1: Sensor[] = [
  { id: 1, type: "Temperature", value: 80 },
  { id: 2, type: "Humidity", value: 30 },
  { id: 5, type: "Pressure", value: 1000 },
  { id: 6, type: "Light", value: 500 },
  { id: 7, type: "Temperature", value: 85 },
  { id: 8, type: "Humidity", value: 45 },
  { id: 9, type: "Pressure", value: 1020 },
  { id: 10, type: "Light", value: 300 },
];

const sensors2: Sensor[] = [
  { id: 3, type: "Temperature", value: 60 },
  { id: 4, type: "Humidity", value: 40 },
  { id: 11, type: "Pressure", value: 1010 },
  { id: 12, type: "Light", value: 450 },
  { id: 13, type: "Temperature", value: 78 },
  { id: 14, type: "Humidity", value: 50 },
  { id: 15, type: "Pressure", value: 990 },
  { id: 16, type: "Light", value: 200 },
];

const service = new SensorService();
service
  .processSensors(sensors1, sensors2)
  .subscribe((sensor) => console.log(sensor));
