const fs = require("fs");
const path = require("path");

const CAMINHO_DB = path.join(__dirname, "usuarios.json");

function lerUsuarios() {
  if (!fs.existsSync(CAMINHO_DB)) {
    fs.writeFileSync(CAMINHO_DB, "[]");
  }
  const conteudo = fs.readFileSync(CAMINHO_DB, "utf-8");
  return JSON.parse(conteudo);
}

function salvarUsuarios(usuarios) {
  fs.writeFileSync(CAMINHO_DB, JSON.stringify(usuarios, null, 2));
}

module.exports = { lerUsuarios, salvarUsuarios };
