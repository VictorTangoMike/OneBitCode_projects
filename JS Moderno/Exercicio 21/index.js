const Mage = require("./modules/Mage");
const Thief = require("./modules/Thief");
const Warrior = require("./modules/Warrior");

const victor = new Mage("Victor", 90, 4, 2, 14 )
const beatrice = new Thief("Beatrice", 140, 22, 8 )
const cain = new Warrior("Cain", 200, 14, 12, 4)

console.table({ victor, beatrice, cain })

cain.changePosition()
victor.attack(cain)
beatrice.attack(victor)

console.table({ victor, beatrice, cain })

cain.changePosition()
cain.attack(victor)
victor.heal(victor)

console.table({ victor, beatrice, cain })