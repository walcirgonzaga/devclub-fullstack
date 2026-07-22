const inputMin = document.getElementById("min");
const inputMax = document.getElementById("max");
const btnSortear = document.getElementById("btn-sortear");
const resultado = document.getElementById("resultado");
const numeroSorteado = document.getElementById("numero-sorteado");

function sortear() {
  const min = parseInt(inputMin.value);
  const max = parseInt(inputMax.value);

  if (isNaN(min) || isNaN(max)) {
    alert("Preencha os dois valores do intervalo.");
    return;
  } else if (min >= max) {
    alert("O valor 'entre' precisa ser menor que o valor 'e'.");
    return;
  }

  // Math.random() * (max - min + 1) + min -> sorteia incluindo os dois extremos
  const numero = Math.floor(Math.random() * (max - min + 1)) + min;

  numeroSorteado.textContent = numero;
  resultado.hidden = false;
}

btnSortear.addEventListener("click", sortear);
