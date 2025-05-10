import Vehicle from "./Vehicle";
import { VehicleType } from "./VehicleType";

export default class Car extends Vehicle {
    constructor(numberPlate: string) {
        super(VehicleType.CAR, numberPlate);
    }
}