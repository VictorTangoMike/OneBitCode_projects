class Transfer {
    constructor( origin, destination, amount) {
        this.origin = origin;
        this.destination = destination;
        this.amount = amount;
        this.created_at = new Date();
    }
}

module.exports = {Transfer};