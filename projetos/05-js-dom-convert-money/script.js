// Taxas de conversão fixas (base: 1 unidade de cada moeda em relação ao USD)
const taxas = {
  BRL: 1 / 5.0,
  USD: 1,
  EUR: 1.08,
  GBP: 1.27,
};

const bandeiras = {
  BRL: "🇧🇷",
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
};

const simbolos = {
  BRL: "R$",
  USD: "US$",
  EUR: "€",
  GBP: "£",
};

const selectDe = document.getElementById("moeda-de");
const selectPara = document.getElementById("moeda-para");
const inputValor = document.getElementById("valor");
const btnConverter = document.getElementById("btn-converter");
const resultado = document.getElementById("resultado");
const flagDe = document.getElementById("flag-de");
const flagPara = document.getElementById("flag-para");
const valorDe = document.getElementById("valor-de");
const valorPara = document.getElementById("valor-para");

function formatarMoeda(valor, moeda) {
  return `${simbolos[moeda]} ${valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function converter() {
  const moedaDe = selectDe.value;
  const moedaPara = selectPara.value;
  const valorOriginal = parseFloat(inputValor.value) || 0;

  const valorEmDolar = valorOriginal * taxas[moedaDe];
  const valorConvertido = valorEmDolar / taxas[moedaPara];

  flagDe.textContent = bandeiras[moedaDe];
  valorDe.textContent = formatarMoeda(valorOriginal, moedaDe);

  flagPara.textContent = bandeiras[moedaPara];
  valorPara.textContent = formatarMoeda(valorConvertido, moedaPara);

  resultado.hidden = false;
}

btnConverter.addEventListener("click", converter);
