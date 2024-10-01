type Situations = "Habitado" | "Habiável" | "Inabiável" | "Inexplorado";
type Coordinates = [number, number, number, number];
type Planet = {
  name: string;
  coordinate: Coordinates;
  situation: Situations;
  satellites: string[];
};

const planets: Planet[] = [];

function addPlanet(
  name: string,
  coordinate: Coordinates,
  situation: Situations
) {
  planets.push({
    name,
    coordinate,
    situation,
    satellites: [],
  });

  alert(`O planeta ${name} foi adicionado com sucesso.`);
}

function findPlanet(name: string) {
  const planet = planets.find((planet) => planet.name === name);

  return planet ?? false;
}

function planetSituation(planet: Planet, situation: Situations) {
  planet.situation = situation;

  alert(`A situação do planeta ${planet.name} foi alterada para ${situation}.`);
}

function addSatellite(name: string, planet: Planet) {
  const hasSatellite = planets.some((planet) =>
    planet.satellites.includes(name)
  );

  if (!hasSatellite) {
    planet.satellites.push(name);
    alert(`O satélite ${name} foi adicionado ao planeta ${planet.name}.`);
  } else {
    alert(`O satélite ${name} já está em órbita de outro planeta.`);
  }
}

function removeSatellite(name: string, planet: Planet) {
  const hasSatellite = planets.some((planet) =>
    planet.satellites.includes(name)
  );

  if (!hasSatellite) {
    alert(`O satélite ${name} não foi encontrado no planeta ${planet.name}.`);
  } else {
    planet.satellites = planet.satellites.filter(
      (satellite) => satellite !== name
    );
    alert(`O satélite ${name} foi removido de ${planet.name}.`);
  }
}

function promptValidSituation() {
  let situation: Situations;
  let validSituation = false;

  while (!validSituation) {
    const situationInput = prompt(
      "Informe a situação do planeta: \n- Habitado\n- Habiável\n- Inabiável\n- Inexplorado"
    );

    switch (situationInput) {
      case "Habitado":
        situation = "Habitado";
        validSituation = true;
        break;
      case "Habiável":
        situation = "Habiável";
        validSituation = true;
        break;
      case "Inabiável":
        situation = "Inabiável";
        validSituation = true;
        break;
      case "Inexplorado":
        situation = "Inexplorado";
        validSituation = true;
        break;
      default:
        alert("Situação inválida.\nPor favor, tente novamente.");
        break;
    }
  }

  return situation;
}

function promptValidPlanet(callback: (planet: Planet) => void) {
  const planetName = prompt("Informe o nome do planeta:");
  const planet = findPlanet(planetName);

  if (planet) {
    callback(planet);
  } else {
    alert("Planeta não encontrado.");
  }
}

function firstMenuOption() {
  const name = prompt("Informe o nome do planeta:");
  const coordinate = prompt("Informe as coordenadas do planeta (x, y, z, w):")
    .split(",")
    .map(Number) as Coordinates;
  const situation = promptValidSituation();

  const confirmation = confirm(
    `Confirma o registro do planeta ${name}?\nCoordenadas: ${coordinate}`
  );

  if (confirmation) {
    addPlanet(name, coordinate, situation);
  }
}

function secondMenuOption() {
  promptValidPlanet((planet) => {
    const situation = promptValidSituation();
    planetSituation(planet, situation);
  });
}

function thirdMenuOption() {
  promptValidPlanet((planet) => {
    const satelliteName = prompt("Informe o nome do satélite:");
    addSatellite(satelliteName, planet);
  });
}

function fourthMenuOption() {
  promptValidPlanet((planet) => {
    const satelliteName = prompt("Informe o nome do satélite:");
    removeSatellite(satelliteName, planet);
  });
}

function fifthMenuOption() {
  let list = "Planetas:\n";

  planets.forEach((planet) => {
    const [a, b, c, d] = planet.coordinate;

    list += `
    Nome: ${planet.name}
    Coordenadas: (${a}, ${b}, ${c}, ${d})
    Situação: ${planet.situation}
    Satélites: Total de ${planet.satellites.length}
    ` 
    planet.satellites.forEach((satellite) => {
      list += `- ${satellite}\n`;
    })
  })
  alert(list);
}

// Menu

let userOption = 0

while (userOption !== 6) {
  const menu = `Menu
    1 - Registrar um novo planeta
    2 - Atualizar situação do planeta
    3 - Adicionar um satélite ao planeta
    4 - Remover um satélite do planeta
    5 - Lista todos os planetas
    6 - Sair
  `

  userOption = Number.parseInt(prompt(menu))

  switch (userOption) {
    case 1:
      firstMenuOption()
      break
    case 2:
      secondMenuOption()
      break
    case 3:
      thirdMenuOption()
      break
    case 4:
      fourthMenuOption()
      break
    case 5:
      fifthMenuOption()
      break
    case 6:
      alert('Encerrando o sistema...')
      break
    default:
      alert('Opção inválida! Retornando ao painel principal...')
      break;
  }
}