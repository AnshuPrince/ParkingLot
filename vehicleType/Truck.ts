import Vehicle from "./Vehicle";
import { VehicleType } from "./VehicleType";

export default class Truck extends Vehicle {
    constructor(numberPlate: string) {
        super(VehicleType.TRUCK, numberPlate);
    }
}