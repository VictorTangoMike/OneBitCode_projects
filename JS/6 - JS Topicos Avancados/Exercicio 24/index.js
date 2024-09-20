async function IMC(weight, height) {
  if (isNaN(weight) || isNaN(height)) {
    reject("Valores inválidos");
  } else {
    console.log("\nCalculando IMC:");
    const result = (await weight) / height ** 2;

    switch (true) {
      case result < 18.5:
        resolve(`Você está em magreza.`);
      case result >= 18.5 && result <= 24.9:
        resolve(`Você está no peso normal.`);
        break;
      case result >= 25 && result <= 29.9:
        resolve(`Você está em sobrepeso.`);
        break;
      case result >= 30 && result <= 39.9:
        resolve(`Você está em obesidade`);
        break;
      case result >= 40:
        resolve(`Você está em obesidade grave.`);
        break;
    }
  }
}

console.log("\n Iniciando a função...");

async function calculeIMC(num1, num2) {
  try {
    console.log(`\nO seu peso é ${num1} kg e a sua altura é ${num2} m.\n\n`);
    IMC(num1, num2);
  } catch (error) {
    console.log(error);
  }
}

calculeIMC(62, 1.67);
calculeIMC(71, 1.74);
calculeIMC(48, 1.6);
// calculeIMC(71, "texto");
calculeIMC(82, 1.72);
calculeIMC(120, 1.8);
