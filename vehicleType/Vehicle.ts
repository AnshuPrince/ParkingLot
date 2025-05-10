import { VehicleType } from './VehicleType';

export default class Vehicle {
    private type: VehicleType;
    private numberPlate: string;

    constructor(type: VehicleType, numberPlate: string) {
        this.type = type;
        this.numberPlate = numberPlate;
    }

    public getVehicleType(): VehicleType {
        return this.type;
    }

    public getNumberPlate(): string {
        return this.numberPlate;
    }
}