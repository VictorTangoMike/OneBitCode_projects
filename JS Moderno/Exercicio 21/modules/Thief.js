const Character = require('./Character');

module.exports = class Thief extends Character {
    attack(targetCharacter) {
      if (this.attackPoints - targetCharacter.defensePoints > 0) {
        targetCharacter.lifePoints -= (this.attackPoints - targetCharacter.defensePoints) * 2;
      } else {
        console.log("Ataque não conseguiu causar dano.")};
    }
};