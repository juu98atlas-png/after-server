// PERFIL - XP, LEVEL, COINS
const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const levelSpan = document.getElementById("level");
const coinsSpan = document.getElementById("coins");
const levelupSound = document.getElementById("levelupSound");
const buffSpan = document.getElementById("buff");

let xp = 0, level = 1, coins = 0, xpNeeded = 100, buff = "Nenhum";

mineBtn.addEventListener("click", () => {
  const gain = Math.floor(Math.random() * 15) + 5;
  xp += gain;

  if (Math.random() < 0.3) { coins++; coinsSpan.textContent = coins; }

  if (xp >= xpNeeded) {
    xp -= xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded * 1.4);
    levelSpan.textContent = level;
    levelupSound.play().catch(() => {});
    buff = "XP+";
    buffSpan.textContent = buff;
  }

  xpFill.style.width = Math.min((xp / xpNeeded) * 100, 100) + "%";
});
