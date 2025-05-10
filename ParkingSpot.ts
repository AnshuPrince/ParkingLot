import ParkingLevel from "./ParkingLevel";
import Vehicle from "./vehicleType/Vehicle";
import { VehicleType } from "./vehicleType/VehicleType";

export default class ParkingSpot {
    static parkingSpotCount: number = 0;
    private readonly spotNumber: number;
    private vehicleType: VehicleType;
    private vehicle: Vehicle | null;
    private isOccupied: boolean;
    private parkingLevel: ParkingLevel;

    constructor(vehicleType: VehicleType, parkingLevel: ParkingLevel) {
        this.spotNumber = ++ParkingSpot.parkingSpotCount;
        this.vehicleType = vehicleType;
        this.parkingLevel = parkingLevel;
        this.vehicle = null;
        this.isOccupied = false;
    }

    public getSpotNumber(): number {
        return this.spotNumber;
    }

    public getVehicleType(): VehicleType {
        return this.vehicleType;
    }

    public getVehicle(): Vehicle | null {
        return this.vehicle;
    }

    public isAvailable(): boolean {
        return this.isOccupied;
    }

    public park(vehicle: Vehicle): boolean {
        if(this.isOccupied) return false;

        this.vehicle = vehicle;
        this.isOccupied = true;
        return true;
    }

    public unpark(): boolean {
        if(!this.isOccupied) return false;
        
        this.vehicle = null;
        this.isOccupied = false;
        return true;
    }
}