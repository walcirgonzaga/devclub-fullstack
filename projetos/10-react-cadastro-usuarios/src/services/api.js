const URL_BASE = "http://localhost:3000";

export async function criarUsuario(usuario) {
  const resposta = await fetch(`${URL_BASE}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.erro || "Erro ao criar usuário");
  }

  return dados;
}

export async function listarUsuarios() {
  const resposta = await fetch(`${URL_BASE}/usuarios`);
  return resposta.json();
}

export async function removerUsuario(id) {
  const resposta = await fetch(`${URL_BASE}/usuarios/${id}`, {
    method: "DELETE",
  });
  return resposta.json();
}
