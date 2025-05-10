import Vehicle from "./Vehicle";
import { VehicleType } from "./VehicleType";

export default class Bike extends Vehicle {
    constructor(numberPlate: string) {
        super(VehicleType.BIKE, numberPlate);
    }
}