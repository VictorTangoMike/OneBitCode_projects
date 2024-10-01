const spaceships = [];

function createSpaceship(name: string, pilot: string, crewLimit: number) {
  const spaceship = {
    name,
    pilot,
    crewLimit,
    inMission: false,
    crew: [],
  };

  spaceships.push(spaceship);

  return spaceship;
}

function findSpaceship(name: string) {
  let spaceship:  {
    name: string,
    pilot: string,
    crewLimit: number,
    inMission: boolean,
    crew: string[]
  }

  spaceship = spaceships.find((ship) => ship.name === name);

  return spaceship;
}

function addCrewMember(
  spaceship: { name: string; crewLimit: number; crew: string[] },
  member: string
) {

  if (spaceship.crewLimit > spaceship.crew.length) {
    spaceship.crew.push(member);
    alert(
      `O ${member} foi adicionado a tripulação da ${spaceship.name}.`
    );
  } else {
    alert("Limite de tripulação foi atingido.");
  }

  return spaceship;
}

function startMission(spaceship: {
  name: string;
  crewLimit: number;
  inMission: boolean;
  crew: string[];
}) {
  if (
    spaceship.crew.length > Math.floor(spaceship.crewLimit /3) &&
    spaceship.inMission === false
  ) {
    spaceship.inMission = true;
    alert(`A tripulação da ${spaceship.name} iniciou a missão.`);
  }
  else if (spaceship.inMission === true) {
    alert("A missão já está em andamento.");
  } else {
    alert(
      "Não é possível iniciar a missão sem uma tripulação suficiente."
    );
  }

  return spaceship;
}

function listSpaceships() {
  spaceships.forEach((spaceship) => {
    alert(
      `Nome: ${spaceship.name}, Piloto: ${
        spaceship.pilot
      }, Limite de tripulação: ${spaceship.crewLimit}, Em missão: ${
        spaceship.inMission
      }, Tripulação: ${spaceship.crew.join(", ")}`
    );
  });
}


function firstMenuOption() {
  const name = prompt('Qual é o nome da nave a ser registrada?')
  const pilot = prompt(`Qual é o nome do piloto da ${name}`)
  const crewLimit = Number(prompt(`Quantos tripulantes a ${name} suporta?`))

  const confirmation = confirm(`Confirma o registro da nave ${name}?\nPiloto: ${pilot}\nTamanho da Tripulação: ${crewLimit}`)

  if (confirmation) {
    createSpaceship(name, pilot, crewLimit)
  }
}

function secondMenuOption() {
  const member = prompt('Qual é o nome do tripulante?')
  const spaceshipName = prompt(`Para qual nave ${member} deverá ser designado?`)

  const spaceship = findSpaceship(spaceshipName)

  if (spaceship) {
    const confirmation = confirm(`Confirma a inclusão de ${member} na tripulação da ${spaceship.name}?`)

    if (confirmation) {
      addCrewMember(spaceship, member)
    }
  }
}

function thirdMenuOption() {
  const spaceshipName = prompt('Qual é o nome da nave a ser enviada?')

  const spaceship = findSpaceship(spaceshipName);

  if (spaceship) {
    const confirmation = confirm(`Confirma e envio da ${spaceship.name} na missão?`)

    if (confirmation) {
      startMission(spaceship)
    }
  }
}

function fourthMenuOption() {
  let list = 'Naves Registradas:\n'

  spaceships.forEach((spaceship: {
    name: string,
    pilot: string,
    crewLimit: number,
    crew: string[],
    inMission: boolean
  }) => {
    list += `
      Nave: ${spaceship.name}
      Piloto: ${spaceship.pilot}
      Em missão? ${spaceship.inMission ? 'Sim' : 'Não'}
      Tamanho Máximo da Triuplação: ${spaceship.crewLimit}
      Tripulantes: ${spaceship.crew.length}
    `

    spaceship.crew.forEach(member => {
      list += `    - ${member}\n`
    })

  })

  alert(list)
}

/**
 * Menu
 */

let userOption = 0;

while (userOption !== 5) {
  const menu = `Painel Principal
    1 - Registrar uma nova nave
    2 - Adicionar membro da tripulação
    3 - Enviar nave em missão
    4 - Listar naves registradas
    5 - Encerrar
  `

  userOption = Number(prompt(menu))

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
      alert('Encerrando o sistema...')
      break
    default:
      alert('Opção inválida! Retornando ao painel principal...')
      break;
  }
}