
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
