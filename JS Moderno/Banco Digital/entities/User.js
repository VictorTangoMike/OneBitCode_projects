const {Account} = require('./Account');

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.account = new Account(this);
    }
}

module.exports = {User};