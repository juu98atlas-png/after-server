document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("AFTER_USER");
  if (!saved) return;

  let user = JSON.parse(saved);

  const mineBtn = document.getElementById("mineBtn");
  const xpFill = document.getElementById("xpFill");
  const xpText = document.getElementById("xpText");
  const levelEl = document.getElementById("level");
  const coinsEl = document.getElementById("coins");

  if (!mineBtn) return;

  function updateUI() {
    levelEl.textContent = user.level;
    coinsEl.textContent = user.coins;

    const percent = Math.min((user.xp / 100) * 100, 100);
    xpFill.style.width = percent + "%";
    xpText.textContent = `${user.xp} / 100 XP`;
  }

  updateUI();

  mineBtn.addEventListener("click", () => {
    const gain = Math.floor(Math.random() * 10) + 5;
    user.xp += gain;

    if (Math.random() < 0.35) {
      user.coins += 1;
    }

    if (user.xp >= 100) {
      user.xp -= 100;
      user.level += 1;
    }

    localStorage.setItem("AFTER_USER", JSON.stringify(user));
    updateUI();
  });
});
