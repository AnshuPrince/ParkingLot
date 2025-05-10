import ParkingSpot from "./ParkingSpot";
import { VehicleType } from "./vehicleType/VehicleType";

export default class ParkingLevel {
    private static parkingLevelCount = 0;
    private parkingSpots: ParkingSpot[];
    private parkingLevel: number;

    constructor(parkingSpots: ParkingSpot[]) {
        ParkingLevel.parkingLevelCount++;
        this.parkingLevel = ParkingLevel.parkingLevelCount;
        this.parkingSpots = parkingSpots;
    }

    public addParkingSpot(vehicleType: VehicleType) {
        const parkingSpot = new ParkingSpot(vehicleType, this);
        this.parkingSpots.push(parkingSpot);
    }

    public isSpotAvailable(vehicleType: VehicleType): boolean {
        return this.parkingSpots.some((spot: ParkingSpot) => spot.isAvailable() && spot.getVehicleType() === vehicleType);
    }

    public getSpot(vehicleType: VehicleType): ParkingSpot {
        const spot = this.parkingSpots.find((spot: ParkingSpot) => spot.isAvailable() && spot.getVehicleType() === vehicleType);

        if (spot === undefined) throw new Error('No Spot Available');

        return spot
    }

    public getParkingLevel(): number {
        return this.parkingLevel;
    }

}