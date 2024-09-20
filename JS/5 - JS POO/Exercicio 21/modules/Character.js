// ESM exports

module.exports = class Character {
  constructor(name, lifePoints, attackPoints, defensePoints) {
    this.name = name;
    this.lifePoints = lifePoints;
    this.attackPoints = attackPoints;
    this.defensePoints = defensePoints;
  }

  attack(targetCharacter) {
    if (this.attackPoints - targetCharacter.defensePoints > 0) {
      targetCharacter.lifePoints -= this.attackPoints - targetCharacter.defensePoints;
    } else {
      console.log("Ataque não conseguiu causar dano.")
    };
  };
}
