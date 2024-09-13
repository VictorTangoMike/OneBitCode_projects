const {Deposit} = require("./entities/Deposit");
const {Loan} = require("./entities/Loan");
const {Transfer} = require("./entities/Transfer");
const {User} = require("./entities/User");

class App {
    static #users = [];

    static findUser(email) {
        const user = this.#users.find(user => user.email === email);
        return user ?? null;
    }

    static addUser(name, email) {
        const existingUser = App.findUser(email);
        if (!existingUser) {
            this.#users.push(new User(name, email));
        }
    }

    static deposit(email, amount) {
        const user = this.findUser(email);
        if (user) {
            user.account.addDeposit(new Deposit(amount));
        } else {
            throw new Error("Usuário não encontrado");
        }
    }
    
    static transfer(origin, destination, amount) {
        const originUser = this.findUser(origin);
        const destinationUser = this.findUser(destination);

        if (originUser && destinationUser) {
            const newTransfer = new Transfer(originUser, destinationUser, amount);
            originUser.account.addTransfer(newTransfer);
            destinationUser.account.addTransfer(newTransfer);
        }
    }

    static loan(email, value, installments) {
        const user = App.findUser(email);
        if (user) {
            user.account.addLoan(new Loan(value, installments));
        } else {
            throw new Error("Usuário não encontrado");
        }
    }

    static changeInterestTax(newInterestTax) {
        Loan.interestTax = newInterestTax;
    }
}

module.exports = {App};