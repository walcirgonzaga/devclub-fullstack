const form = document.getElementById("form-tarefa");
const input = document.getElementById("input-tarefa");
const lista = document.getElementById("lista-tarefas");
const contador = document.getElementById("contador");

let tarefas = [];

// Function declaration com parâmetro e return
function criarTarefa(texto) {
  return {
    id: Date.now(),
    texto,
    concluida: false,
  };
}

// Arrow function: conta quantas tarefas ainda não foram concluídas
const contarPendentes = (listaTarefas) =>
  listaTarefas.filter((tarefa) => !tarefa.concluida).length;

function renderizar() {
  lista.innerHTML = "";

  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.className = "tarefa" + (tarefa.concluida ? " concluida" : "");

    const span = document.createElement("span");
    span.textContent = tarefa.texto;

    const btnConcluir = document.createElement("button");
    btnConcluir.textContent = tarefa.concluida ? "↩️" : "✅";
    // function anônima como callback do evento
    btnConcluir.addEventListener("click", function () {
      alternarConclusao(tarefa.id);
    });

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "🗑️";
    btnRemover.addEventListener("click", () => removerTarefa(tarefa.id));

    li.append(span, btnConcluir, btnRemover);
    lista.appendChild(li);
  });

  const pendentes = contarPendentes(tarefas);
  contador.textContent =
    pendentes === 1 ? "1 tarefa pendente" : `${pendentes} tarefas pendentes`;
}

function alternarConclusao(id) {
  tarefas = tarefas.map((tarefa) =>
    tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
  );
  renderizar();
}

function removerTarefa(id) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  renderizar();
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const texto = input.value.trim();
  if (texto === "") return;

  tarefas.push(criarTarefa(texto));
  input.value = "";
  renderizar();
});
