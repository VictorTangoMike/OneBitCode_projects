import fs from "node:fs";

export function newF(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, "utf-8", (err) => {
      if (err) {
        reject("Erro ao escrever arquivo: ", error.message);
      } else {
        resolve();
      }
    });
  });
}

export function rdFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
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
    fs.writeFile(filePath, content, "utf-8", (err) => {
      if (err) {
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
    fs.unlink(filePath, (err) => {
      if (err) {
        reject("Erro ao deletar arquivo: ", error.message);
      } else {
        resolve();
      }
    });
  });
}
