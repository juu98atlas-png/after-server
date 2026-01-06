// mining.js
const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xpText");
const levelEl = document.getElementById("level");
const coinsEl = document.getElementById("coins");

let user = getCurrentUser();

if (user && mineBtn) {
  let xpNeeded = 100 * user.level;

  function updateMiningUI() {
    const percent = Math.min((user.xp / xpNeeded) * 100, 100);
    xpFill.style.width = percent + "%";
    xpText.textContent = `${user.xp} / ${xpNeeded} XP`;
    levelEl.textContent = user.level;
    coinsEl.textContent = user.coins;
  }

  updateMiningUI();

  mineBtn.addEventListener("click", () => {
    const gain = Math.floor(Math.random() * 12) + 6;
    user.xp += gain;

    if (Math.random() < 0.35) {
      user.coins++;
    }

    if (user.xp >= xpNeeded) {
      user.xp -= xpNeeded;
      user.level++;
      xpNeeded = Math.floor(xpNeeded * 1.35 * user.level);
    }

    saveCurrentUser(user);
    updateMiningUI();
  });
}
