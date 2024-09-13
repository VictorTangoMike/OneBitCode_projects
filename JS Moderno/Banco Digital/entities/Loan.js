const {Installment} = require('./Installment');

class Loan {
    static #interestTax = 0.00;

    constructor(totalValue, installments) {
    this.totalValue = totalValue;
    this.installments = [];
    // *************** Analizar
    for (let i = 1; i <= installments; i++) {
        this.installments.push(new Installment((totalValue * Loan.#interestTax) / installments, i));
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

module.exports = {Loan};