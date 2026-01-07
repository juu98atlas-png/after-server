let user = JSON.parse(localStorage.getItem("after_user"));

const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xpText");
const levelEl = document.getElementById("level");
const coinsEl = document.getElementById("coins");

levelEl.textContent = user.level;
coinsEl.textContent = user.coins;

mineBtn.onclick = () => {
  const gain = Math.floor(Math.random() * 12) + 6;
  user.xp += gain;

  if (Math.random() < 0.35) {
    user.coins++;
  }

  if (user.xp >= user.xpNeeded) {
    user.xp -= user.xpNeeded;
    user.level++;
    user.xpNeeded = Math.floor(user.xpNeeded * 1.35);
  }

  localStorage.setItem("after_user", JSON.stringify(user));

  levelEl.textContent = user.level;
  coinsEl.textContent = user.coins;

  xpFill.style.width = `${(user.xp / user.xpNeeded) * 100}%`;
  xpText.textContent = `${user.xp} / ${user.xpNeeded} XP`;
};
