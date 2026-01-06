// CONFIRMAÇÃO ABSOLUTA
console.log("SCRIPT CARREGOU");
alert("SCRIPT CARREGOU");

// ESTADO
let level = 1;
let xp = 0;
let coins = 0;
let xpMax = 100;

// ELEMENTOS
const levelEl = document.getElementById("level");
const coinsEl = document.getElementById("coins");
const xpFill = document.getElementById("xp-fill");
const mineBtn = document.getElementById("mineBtn");

// FUNÇÃO DE ATUALIZAÇÃO
function updateUI() {
  levelEl.textContent = level;
  coinsEl.textContent = coins;
  xpFill.style.width = (xp / xpMax) * 100 + "%";
}

// MINERAÇÃO
mineBtn.addEventListener("click", () => {
  xp += 10;
  coins += 1;

  if (xp >= xpMax) {
    xp = 0;
    level++;
    xpMax += 50;
  }

  updateUI();
});

// INIT
updateUI();
