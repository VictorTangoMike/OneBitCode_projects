class Account {
  #balance;

  constructor(owner) {
    this.owner = owner;
    this.#balance = 0;
    this.deposits = [];
    this.loans = [];
    this.transfers = [];
  }

  get balance() {
    return this.#balance;
  }

  addDeposit(deposit) {
    this.#balance += deposit.value;
    this.deposits.push(deposit);
  }

  addLoan(loan) {
    this.#balance += loan.value;
    this.loans.push(loan);
  }

  addTransfer(transfer) {
    if (transfer.origin === this.owner) {
      this.#balance -= transfer.value;
      this.transfers.push(transfer);
    } else if (transfer.destination === this.owner) {
      this.#balance += transfer.value;
      this.transfers.push(transfer);
    }
  }
}

module.exports = { Account };
