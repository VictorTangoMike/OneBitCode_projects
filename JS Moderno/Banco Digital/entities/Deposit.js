class Deposit {
  constructor(amount) {
    this.amount = amount;
    this.created_at = new Date();
  }
}

module.exports = { Deposit };
