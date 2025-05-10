import Ticket from "../Ticket";
import FeeStrategy from "./FeeStrategy";

export default class FlatRateFeeStrategy extends FeeStrategy {
    private readonly perMinuteFee: number;
    constructor(perMinuteFee: number) {
        super();
        this.perMinuteFee = perMinuteFee;
    }

    calculateFee(ticket: Ticket): number {
        if (ticket.isClosed()) throw new Error('Ticket Already Generated');

        ticket.setExitTimestamp(new Date());

        const minutes = FlatRateFeeStrategy.getMinutes(ticket);

        return minutes * this.perMinuteFee;
    }

    private static getMinutes(ticket: Ticket): number {
        let startTimestamp = ticket.getEntryTimetsamp();
        let endTimetstamp = ticket.getExitTimestamp();

        if (endTimetstamp === undefined) throw new Error('Ticket is active! No exit time available.');

        return Math.floor((endTimetstamp.getMilliseconds() - startTimestamp.getMilliseconds()) / 1000 * 60);
    }
}