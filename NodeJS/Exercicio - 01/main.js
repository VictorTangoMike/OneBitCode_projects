import { newF, rdFile, edFile, delFile } from "./funtions.mjs";

async function start() {
  await newF(
    "./olaMundo.txt",
    "Conteúdo inicial do arquivo.\nCriado com o módulo fs do Node.js.\n"
  );

  console.log("Lendo arquivo antes de alterar.\n");
  await rdFile("./olaMundo.txt");
  //Editando arquivo

  await edFile("./olaMundo.txt", "Conteúdo modificado!");

  //Lendo arquivo
  console.log("Lendo arquivo após alterar.\n");
  await rdFile("./olaMundo.txt");

  //Excluindo arquivo
  await delFile("./olaMundo.txt");
}

start();
