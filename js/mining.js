const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xpText");
const levelEl = document.getElementById("level");
const coinsEl = document.getElementById("coins");

let user = JSON.parse(localStorage.getItem("after_user"));

if (user) {
  let xp = user.xp || 0;
  let level = user.level || 1;
  let coins = user.coins || 0;
  let xpNeeded = 100 + level * 25;

  function updateUI() {
    levelEl.textContent = level;
    coinsEl.textContent = coins;
    xpFill.style.width = Math.min((xp / xpNeeded) * 100, 100) + "%";
    xpText.textContent = `${xp} / ${xpNeeded} XP`;
  }

  updateUI();

  mineBtn.addEventListener("click", () => {
    const gain = Math.floor(Math.random() * 12) + 6;
    xp += gain;

    if (Math.random() < 0.35) {
      coins++;
    }

    if (xp >= xpNeeded) {
      xp -= xpNeeded;
      level++;
      xpNeeded = 100 + level * 25;
    }

    user.xp = xp;
    user.level = level;
    user.coins = coins;

    localStorage.setItem("after_user", JSON.stringify(user));
    updateUI();
  });
}
