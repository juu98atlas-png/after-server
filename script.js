const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xpText");
const levelEl = document.getElementById("level");
const coinsEl = document.getElementById("coins");

let xp = 0;
let level = 1;
let coins = 0;
let xpNeeded = 100;

mineBtn.addEventListener("click", () => {
  const gain = Math.floor(Math.random() * 12) + 6;
  xp += gain;

  if (Math.random() < 0.35) {
    coins++;
    coinsEl.textContent = coins;
  }

  if (xp >= xpNeeded) {
    xp -= xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded * 1.35);
    levelEl.textContent = level;
  }

  const percent = Math.min((xp / xpNeeded) * 100, 100);
  xpFill.style.width = percent + "%";
  xpText.textContent = `${xp} / ${xpNeeded} XP`;
});
