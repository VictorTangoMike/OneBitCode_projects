const Character = require('./Character');
  
module.exports = class Warrior extends Character {
    constructor(name, lifePoints, attackPoints, defensePoints, shieldPoints) {
        super(name, lifePoints, attackPoints, defensePoints);
        this.shieldPoints = shieldPoints;
        this.position = "attack";
    }
    attack(targetCharacter) {
    if (this.position === "attack") {
        super.attack(targetCharacter);
        }
    }

    changePosition() {
    if (this.position === "attack") {
        this.position = "defence";
        this.defensePoints += this.shieldPoints;
        }
    else {
        this.position = "attack";
        this.defensePoints -= this.shieldPoints;
        }
    }
};
