import { newF, rdFile, edFile, delFile } from "./funtions.mjs";

async function start() {
  await newF(
    "./meuarquivo.txt",
    "Conteúdo inicial do arquivo.\nCriado com o módulo fs do Node.js.\n"
  );

  console.log("Lendo arquivo antes de alterar.\n");
  await rdFile("./meuarquivo.txt");
  //Editando arquivo

  await edFile("./meuarquivo.txt", "Conteúdo modificado!");

  //Lendo arquivo
  console.log("Lendo arquivo após alterar.\n");
  await rdFile("./meuarquivo.txt");

  //Excluindo arquivo
  await delFile("./meuarquivo.txt");
}

start();
