const Character = require("./Character");

module.exports = class Mage extends Character {
    constructor(name, lifePoints, attackPoints, defensePoints, magicPoints) {
        super(name, lifePoints, attackPoints, defensePoints);
        this.magicPoints = magicPoints;
    }
    attack(targetCharacter) {

        if ((this.attackPoints + this.magicPoints) - targetCharacter.defensePoints > 0) {
            targetCharacter.lifePoints -= (this.attackPoints + this.magicPoints) - targetCharacter.defensePoints;
        } else {
            console.log("Ataque não conseguiu causar dano.")};
    }
    
    heal(targetCharacter) {
        targetCharacter.lifePoints += this.magicPoints * 2;
    }
    
};