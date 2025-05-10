import ParkingSpot from "./ParkingSpot";
import Vehicle from "./vehicleType/Vehicle";

export default class Ticket {
    private static ticketNumber: number = 1;
    private readonly ticketId: number;
    private readonly vehicle: Vehicle;
    private readonly parkingSpot: ParkingSpot;
    private readonly entryTimestamp: Date;
    private exitTimestamp: Date | undefined;

    constructor(vehicle: Vehicle, spot: ParkingSpot) {
        this.ticketId = Ticket.ticketNumber++;
        this.vehicle = vehicle;
        this.parkingSpot = spot;
        this.entryTimestamp = new Date();
    }

    public setExitTimestamp(timestamp: Date): boolean {
        if (this.exitTimestamp) return false;

        this.exitTimestamp = timestamp;
        return true;
    }

    public getTicketId(): number {
        return this.ticketId;
    }

    public getVehicle(): Vehicle {
        return this.vehicle;
    }

    public getParkingSpot(): ParkingSpot {
        return this.parkingSpot;
    }

    public getEntryTimetsamp(): Date {
        return this.entryTimestamp;
    }

    public getExitTimestamp(): Date | undefined {
        return this.exitTimestamp;
    }

    public isClosed(): boolean {
        if (this.exitTimestamp) return true;

        return false;
    }
}