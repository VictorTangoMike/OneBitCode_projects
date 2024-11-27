import fs from "node:fs";

export function newF(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, "utf-8", (error) => {
      if (error) {
        reject("Erro ao escrever arquivo: ", error.message);
      } else {
        resolve();
      }
    });
  });
}

export function rdFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        reject("Erro ao ler arquivo: ", error.message);
      } else {
        console.log(data);
        resolve();
      }
    });
  });
}

export function edFile(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, "utf-8", (error) => {
      if (error) {
        reject("Erro ao editar arquivo: ", error.message);
      } else {
        console.log("Arquivo excluído com sucesso!");
        resolve();
      }
    });
  });
}

export function delFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        reject("Erro ao deletar arquivo: ", error.message);
      } else {
        resolve();
      }
    });
  });
}
