// Menu toggle
const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.toggle("open");
});

// Mineração
const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xpText");
const levelEl = document.getElementById("level");
const coinsEl = document.getElementById("coins");

let xp = 0, level = 1, coins = 0, xpNeeded = 100;

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

// Chat global básico
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  const username = "Player1"; // futuramente pegar do login
  const levelDisplay = level;
  const classDisplay = "Minerador"; // futuramente pegar do login

  const message = `${username} [${classDisplay} Lv${levelDisplay}]: ${msg}`;
  const msgEl = document.createElement("div");
  msgEl.textContent = message;
  chatBox.appendChild(msgEl);
  chatBox.scrollTop = chatBox.scrollHeight;

  chatInput.value = "";
});
