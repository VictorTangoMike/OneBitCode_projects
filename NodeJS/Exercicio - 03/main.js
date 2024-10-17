const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

const notesDirectory = path.join(__dirname, "notes");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function createDirectory(notesDirectory) {
  if (!fs.existsSync(notesDirectory)) {
    fs.mkdirSync(notesDirectory);
  }
}

function listNotes() {
  const notes = fs.readdirSync(notesDirectory);

  if (notes.length === 0) {
    return console.log("Nenhuma nota encontrada.");
  }
  console.clear();
  console.log("\n--------------Notas:--------------");

  notes.forEach((note, index) => {
    console.log(`${index + 1}. ${note}`);
  });
  console.log("----------------------------------");
}

function readNote() {
  listNotes();

  rl.question("Qual número da nota deseja ler? ", (index) => {
    const notes = fs.readdirSync(notesDirectory);
    const selectedNote = notes[index - 1];

    if (!selectedNote) return console.log("Nota não encontrada.");

    const notePath = path.join(notesDirectory, selectedNote);
    const content = fs.readFileSync(notePath, "utf-8");
    console.clear();
    console.log("\n---------Conteudo da Nota---------\n");
    console.log(content);
    console.log("\n----------------------------------");
    console.log("\n")
    returnToMenu();
  });
}

function createNote() {
  rl.question("Titulo da nota: ", (title) => {
    notePath = path.join(notesDirectory, `${title}.txt`);

    rl.question("Conteúdo da nota: ", (content) => {
      fs.writeFileSync(notePath, content, "utf-8");
      console.log(`Nota ${title}.txt salva.`);
      console.log("\n")
      returnToMenu();
    });
  });
}

function deleteNote() {
  listNotes();

  rl.question("Qual número da nota deseja excluir? ", (index) => {
    const notes = fs.readdirSync(notesDirectory);
    const selectedNote = notes[index - 1];

    notePath = path.join(notesDirectory, selectedNote);

    fs.unlinkSync(notePath);
    
    console.log("\n")
    returnToMenu();
  });
}

function returnToMenu() {
  rl.question("Deseja continuar? (S/N): ", (answer) => {
    answer = answer.trim().toLowerCase();

    switch(answer) {
      case "n":
        console.log("Saindo...")
        return rl.close();
      case "s":
        main();
        break;
      default: 
        console.log("Resposta inválida. Tente novamente.");
        returnToMenu();
        break;
    }
  });
}

function invalidOption() {
  console.log("Opção inválida.");
  returnToMenu();
}

function main() {
  createDirectory(notesDirectory);

  console.clear();

  console.log("----------------------------------");
  console.log("Bem-vindo ao Gerenciador de Notas!");
  console.log("----------------------------------");

  console.log("1. Listar notas");
  console.log("2. Ler nota");
  console.log("3. Criar nota");
  console.log("4. Excluir nota");
  console.log("0. Sair");

  rl.question("Escolha uma opção: ", (choice) => {
    switch (choice) {
      case "1":
        listNotes();
        console.log("\n")
        returnToMenu();
        break;
      case "2":
        readNote();
        break;
      case "3":
        createNote();
        break;
      case "4":
        deleteNote();
        break;
      case "0":
        console.log("Saindo...");
        rl.close();
        process.exit(0);
      default:
        invalidOption();
        break;
    }
  });
}

main();
