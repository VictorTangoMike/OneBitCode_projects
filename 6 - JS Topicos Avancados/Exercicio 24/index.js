function IMC(weight, height) {
  return new Promise((resolve, reject) => {
    if (isNaN(weight) || isNaN(height)) {
      reject("Valores inválidos");
    } else {
      const imc = weight / height ** 2;

      switch (true) {
        case imc < 18.5:
          resolve(`Você está em magreza.`);
        case imc >= 18.5 && imc <= 24.9:
          resolve(`Você está no peso normal.`);
          break;
        case imc >= 25 && imc <= 29.9:
          resolve(`Você está em sobrepeso.`);
          break;
        case imc >= 30 && imc <= 39.9:
          resolve(`Você está em obesidade`);
          break;
        case imc >= 40:
          resolve(`Você está em obesidade grave.`);
          break;
      }
    }
  });
}

console.log("\n Iniciando a função...");

function calculeIMC(num1, num2) {
  console.log("\nCalculando IMC:");
  console.log(`\nO seu peso é ${num1} kg e a sua altura é ${num2} m.\n\n`);
  IMC(num1, num2)
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
}

calculeIMC(62, 1.67);
calculeIMC(71, 1.74);
calculeIMC(48, 1.6);
// calculeIMC(71, "texto");
calculeIMC(82, 1.72);
calculeIMC(120, 1.8);
