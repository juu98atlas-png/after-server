const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xpText");
const levelEl = document.getElementById("level");
const coinsEl = document.getElementById("coins");

mineBtn.addEventListener("click", () => {
  const gain = Math.floor(Math.random() * 12) + 6;
  currentUser.xp += gain;

  if (Math.random() < 0.35) {
    currentUser.coins++;
  }

  if (currentUser.xp >= 100) {
    currentUser.xp -= 100;
    currentUser.level++;
  }

  levelEl.textContent = currentUser.level;
  coinsEl.textContent = currentUser.coins;
  const percent = Math.min((currentUser.xp / 100) * 100, 100);
  xpFill.style.width = percent + "%";
  xpText.textContent = `${currentUser.xp} / 100 XP`;

  // Salva progresso
  const idx = users.findIndex(u => u.nickname === currentUser.nickname);
  if (idx > -1) users[idx] = currentUser;
  localStorage.setItem("users", JSON.stringify(users));
});
