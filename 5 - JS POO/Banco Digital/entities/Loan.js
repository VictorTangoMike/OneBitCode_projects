const { Installment } = require("./Installment");

class Loan {
  static #interestTax = 0.0;

  constructor(totalValue, installmentsNumber) {
    this.totalValue = totalValue;
    this.installments = [];
    for (let i = 1; i <= installmentsNumber; i++) {
      this.installments.push(
        new Installment(
          (totalValue * Loan.#interestTax) / installmentsNumber,
          i
        )
      );
    }
    this.createdAt = new Date();
  }

  static get interestTax() {
    return Loan.#interestTax;
  }

  static set interestTax(newInterestTax) {
    Loan.#interestTax = 1 + newInterestTax / 100;
  }
}

module.exports = { Loan };
