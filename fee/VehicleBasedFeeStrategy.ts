import Ticket from "../Ticket";
import { VehicleType } from "../vehicleType/VehicleType";
import FeeStrategy from "./FeeStrategy";


export default class VehicleBasedFeeStrategy extends FeeStrategy {
    private readonly perMinuteFee: Map<VehicleType, number>;

    constructor(perMinuteFee: Map<VehicleType, number>) {
        super();
        this.perMinuteFee = perMinuteFee;
    }

    calculateFee(ticket: Ticket): number {
        let vehicle = ticket.getVehicle();
        let vehicleType = vehicle.getVehicleType();

        let perMinuteFee = this.perMinuteFee.get(vehicleType);

        if (perMinuteFee === undefined) throw new Error('Fare Type not found!');

        const minutes = VehicleBasedFeeStrategy.getMinutes(ticket);

        return minutes * perMinuteFee;
    }

    static getMinutes(ticket: Ticket): number {
        let startTimestamp = ticket.getEntryTimetsamp();
        let endTimetstamp = ticket.getExitTimestamp();

        if (endTimetstamp === undefined) throw new Error('Ticket is active! No exit time available.');

        return Math.floor((endTimetstamp.getMilliseconds() - startTimestamp.getMilliseconds()) / 1000 * 60);
    }
}