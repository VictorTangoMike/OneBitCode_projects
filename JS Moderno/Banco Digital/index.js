const { App } = require("./App");

App.addUser("Isaac Pontes", "isaac@email.com")
App.addUser("Lucas Queiroga", "lucas@email.com")
App.addUser("Juliana Conde", "juliana@email.com")

App.deposit("isaac@email.com", 100)

App.transfer("isaac@email.com", "lucas@email.com", 20)

App.changeInterestTax(10)
App.loan("juliana@email.com", 2000, 24)

console.log(App.findUser("isaac@email.com"))
console.log(App.findUser("isaac@email.com").account)
console.log(App.findUser("lucas@email.com"))
console.log(App.findUser("lucas@email.com").account)
console.log(App.findUser("juliana@email.com"))
console.log(App.findUser("juliana@email.com").account)
console.log(App.findUser("juliana@email.com").account.loans[0].installments)