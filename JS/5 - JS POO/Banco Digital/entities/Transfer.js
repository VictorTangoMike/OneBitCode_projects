class Transfer {
  constructor(origin, destination, value) {
    this.origin = origin;
    this.destination = destination;
    this.value = value;
    this.created_at = new Date();
  }
}

module.exports = { Transfer };
