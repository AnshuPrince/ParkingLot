import Ticket from "../Ticket";

export default abstract class FeeStrategy {
    constructor() {}

    abstract calculateFee(ticket: Ticket): number;
}