const lanches = [
  { nome: "X-Salada", categoria: "Tradicional", preco: 22.9, imagem: "assets/xsalada.jpg" },
  { nome: "X-Bacon", categoria: "Tradicional", preco: 26.9, imagem: "assets/xbacon.jpg" },
  { nome: "Bacon & Egg", categoria: "Tradicional", preco: 28.9, imagem: "assets/bacon-egg.jpg" },
  { nome: "Monstruoso", categoria: "Especial", preco: 34.9, imagem: "assets/monstruoso.jpg" },
  { nome: "X-Vegan", categoria: "Vegano", preco: 24.9, imagem: "assets/xvegan.jpg" },
  { nome: "Monstruoso Vegan", categoria: "Vegano", preco: 32.9, imagem: "assets/monstruoso-vegan.jpg" },
];

const grid = document.getElementById("grid");
const filtros = document.getElementById("filtros");
const valorTotal = document.getElementById("valor-total");

const categorias = ["Todos", ...new Set(lanches.map((lanche) => lanche.categoria))];

function formatarPreco(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Renderiza os cards usando .map() para transformar dados em HTML
function renderizarLanches(categoriaFiltro) {
  const listaFiltrada =
    categoriaFiltro === "Todos"
      ? lanches
      : lanches.filter((lanche) => lanche.categoria === categoriaFiltro);

  grid.innerHTML = listaFiltrada
    .map(
      (lanche) => `
      <div class="card">
        <img src="${lanche.imagem}" alt="${lanche.nome}">
        <div class="card-info">
          <span class="categoria">${lanche.categoria}</span>
          <h3>${lanche.nome}</h3>
          <span class="preco">${formatarPreco(lanche.preco)}</span>
        </div>
      </div>
    `
    )
    .join("");

  // .reduce() para somar o valor total dos itens exibidos
  const total = listaFiltrada.reduce((soma, lanche) => soma + lanche.preco, 0);
  valorTotal.textContent = formatarPreco(total);
}

function renderizarFiltros() {
  filtros.innerHTML = categorias
    .map((categoria) => `<button data-categoria="${categoria}">${categoria}</button>`)
    .join("");

  filtros.querySelectorAll("button").forEach((botao) => {
    botao.addEventListener("click", () => {
      filtros.querySelectorAll("button").forEach((b) => b.classList.remove("ativo"));
      botao.classList.add("ativo");
      renderizarLanches(botao.dataset.categoria);
    });
  });

  filtros.querySelector("button").classList.add("ativo");
}

renderizarFiltros();
renderizarLanches("Todos");
