const express = require("express");
const cors = require("cors");
const { lerUsuarios, salvarUsuarios } = require("./database");

const app = express();
const PORTA = 3000;

app.use(cors());
app.use(express.json());

// GET /usuarios - lista todos, com filtro opcional por nome via query params
app.get("/usuarios", (req, res) => {
  const usuarios = lerUsuarios();
  const { nome } = req.query;

  if (nome) {
    const filtrados = usuarios.filter((usuario) =>
      usuario.nome.toLowerCase().includes(nome.toLowerCase())
    );
    return res.json(filtrados);
  }

  res.json(usuarios);
});

// GET /usuarios/:id - busca um usuario pelo route param
app.get("/usuarios/:id", (req, res) => {
  const usuarios = lerUsuarios();
  const usuario = usuarios.find((u) => u.id === req.params.id);

  if (!usuario) {
    return res.status(404).json({ erro: "Usuario nao encontrado" });
  }

  res.json(usuario);
});

// POST /usuarios - cria usuario a partir do body
app.post("/usuarios", (req, res) => {
  const { nome, email, idade } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: "Nome e email sao obrigatorios" });
  }

  const usuarios = lerUsuarios();

  const emailDuplicado = usuarios.some((usuario) => usuario.email === email);
  if (emailDuplicado) {
    return res.status(409).json({ erro: "Ja existe um usuario com esse email" });
  }

  const novoUsuario = {
    id: Date.now().toString(),
    nome,
    email,
    idade: idade || null,
  };

  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);

  res.status(201).json(novoUsuario);
});

// PUT /usuarios/:id - edita usuario existente
app.put("/usuarios/:id", (req, res) => {
  const usuarios = lerUsuarios();
  const indice = usuarios.findIndex((u) => u.id === req.params.id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Usuario nao encontrado" });
  }

  const { nome, email, idade } = req.body;
  usuarios[indice] = {
    ...usuarios[indice],
    nome: nome ?? usuarios[indice].nome,
    email: email ?? usuarios[indice].email,
    idade: idade ?? usuarios[indice].idade,
  };

  salvarUsuarios(usuarios);
  res.json(usuarios[indice]);
});

// DELETE /usuarios/:id - remove usuario
app.delete("/usuarios/:id", (req, res) => {
  const usuarios = lerUsuarios();
  const indice = usuarios.findIndex((u) => u.id === req.params.id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Usuario nao encontrado" });
  }

  const [removido] = usuarios.splice(indice, 1);
  salvarUsuarios(usuarios);

  res.json({ mensagem: "Usuario removido", usuario: removido });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
