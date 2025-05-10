import FeeStrategy from "./fee/FeeStrategy";
import VehicleBasedFeeStrategy from "./fee/VehicleBasedFeeStrategy";
import ParkingLevel from "./ParkingLevel";
import Ticket from "./Ticket";
import Vehicle from "./vehicleType/Vehicle";
import { VehicleType } from "./vehicleType/VehicleType";

export default class ParkingLot {
    private static instance: ParkingLot;
    private parkingLevels: ParkingLevel[];
    private tickets: Map<number, Ticket>;
    private feeStrategy: FeeStrategy;
    
    private constructor() {
        this.parkingLevels = [];
        this.tickets = new Map();
        const feeStrategy = new Map<VehicleType, number>();
        feeStrategy.set(VehicleType.BIKE, 2);
        feeStrategy.set(VehicleType.CAR, 5);
        feeStrategy.set(VehicleType.TRUCK, 10);
        this.feeStrategy = new VehicleBasedFeeStrategy(feeStrategy);
    }

    public getInstance(): ParkingLot {
        if(ParkingLot.instance === undefined) {
            ParkingLot.instance = new ParkingLot();
        }
        return ParkingLot.instance;
    }

    public addParkingLevel() {
        const parkingLevel = new ParkingLevel([]);
        this.parkingLevels.push(parkingLevel);
    }

    public parkVehicle(vehicle: Vehicle): Ticket {
        for(const parkingLevel of this.parkingLevels) {
            if(parkingLevel.isSpotAvailable(vehicle.getVehicleType()) === false) continue;

            const parkingSpot = parkingLevel.getSpot(vehicle.getVehicleType());

            parkingSpot.park(vehicle);
            const ticket = new Ticket(vehicle, parkingSpot);
            this.tickets.set(ticket.getTicketId(), ticket);

            return ticket;
        }

        throw new Error('No Spot Available');
    }

    public unparkVehicle(ticketId: number) {
        const ticket = this.tickets.get(ticketId);

        if(!ticket) throw new Error('Invalid Ticket ID');

        const spot = ticket.getParkingSpot();
        ticket.setExitTimestamp(new Date());
        spot.unpark();
        this.tickets.delete(ticketId);
        return this.feeStrategy.calculateFee(ticket);
    }
}