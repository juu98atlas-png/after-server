const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xpText");
const levelEl = document.getElementById("level");
const coinsEl = document.getElementById("coins");
const minedItemsDiv = document.getElementById("minedItems");

mineBtn.addEventListener("click", () => {
  if (!window.currentUser) return alert("Faça login primeiro");

  const gain = Math.floor(Math.random() * 12) + 6;
  window.currentUser.xp += gain;

  // drop de item raro
  let item = null;
  if (Math.random() < 0.2) item = { name: "Cristal Raro", rare: true };
  else if (Math.random() < 0.35) item = { name: "Pedra Comum", rare: false };

  if (item) {
    const div = document.createElement("div");
    div.textContent = item.name;
    div.className = item.rare ? "item-rare" : "item-common";
    minedItemsDiv.prepend(div);
  }

  window.currentUser.coins++;
  coinsEl.textContent = window.currentUser.coins;

  const xpNeeded = 100 + (window.currentUser.level - 1) * 35;
  if (window.currentUser.xp >= xpNeeded) {
    window.currentUser.xp -= xpNeeded;
    window.currentUser.level++;
  }

  const percent = Math.min((window.currentUser.xp / xpNeeded) * 100, 100);
  xpFill.style.width = percent + "%";
  xpText.textContent = `${window.currentUser.xp} / ${xpNeeded} XP`;
  levelEl.textContent = window.currentUser.level;

  saveDB();
});

function updateStats() {
  if (!window.currentUser) return;
  coinsEl.textContent = window.currentUser.coins;
  levelEl.textContent = window.currentUser.level;
  const xpNeeded = 100 + (window.currentUser.level - 1) * 35;
  xpFill.style.width = Math.min((window.currentUser.xp / xpNeeded) * 100, 100) + "%";
  xpText.textContent = `${window.currentUser.xp} / ${xpNeeded} XP`;
}
