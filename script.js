// Mineração
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

// Chat
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const sendBtn = document.getElementById("sendBtn");

// Usuário atual (exemplo)
const currentUser = {
  name: "Usuário",
  classe: "Minerador",
  level: 1
};

function sendMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;

  const p = document.createElement("p");
  p.textContent = `${currentUser.name} [${currentUser.classe} Lv${currentUser.level}]: ${msg}`;
  chatMessages.appendChild(p);

  chatMessages.scrollTop = chatMessages.scrollHeight; // auto-scroll
  chatInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
