const enterBtn = document.getElementById("enterBtn");
const hero = document.getElementById("hero");
const app = document.getElementById("app");

const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const levelSpan = document.getElementById("level");
const coinsSpan = document.getElementById("coins");
const clickSound = document.getElementById("clickSound");

let xp = 0;
let level = 1;
let coins = 0;
let xpNeeded = 100;

enterBtn.addEventListener("click", () => {
  hero.classList.add("hidden");
  app.classList.remove("hidden");

  // desbloqueia som no mobile
  clickSound.play().catch(() => {});
});

mineBtn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});

  const gain = Math.floor(Math.random() * 15) + 5;
  xp += gain;

  if (Math.random() < 0.3) {
    coins += 1;
    coinsSpan.textContent = coins;
  }

  if (xp >= xpNeeded) {
    xp = xp - xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded * 1.4);
    levelSpan.textContent = level;
  }

  const percent = Math.min((xp / xpNeeded) * 100, 100);
  xpFill.style.width = percent + "%";
});
