alert("SCRIPT CARREGOU");

let xp = 0;
let level = 1;
let coins = 0;
let xpNeeded = 100;

const config = {
  xpPerClick: 10,
  multiplier: 1
};

const xpFill = document.getElementById("xpFill");
const levelSpan = document.getElementById("level");
const coinsSpan = document.getElementById("coins");
const mineBtn = document.getElementById("mineBtn");

mineBtn.addEventListener("click", () => {
  const gain = Math.floor(config.xpPerClick * config.multiplier);
  xp += gain;

  if (Math.random() < 0.3) coins++;

  if (xp >= xpNeeded) {
    xp -= xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded * 1.4);
    levelSpan.textContent = level;
  }

  coinsSpan.textContent = coins;
  xpFill.style.width = Math.min((xp / xpNeeded) * 100, 100) + "%";
});

/* COMMAND SYSTEM */
const commandInput = document.getElementById("commandInput");
const adminModal = document.getElementById("adminModal");
const passwordBox = document.getElementById("passwordBox");
const adminPanel = document.getElementById("adminPanel");

const adminPassword = document.getElementById("adminPassword");
const confirmPassword = document.getElementById("confirmPassword");
const closeAdmin = document.getElementById("closeAdmin");

const xpControl = document.getElementById("xpControl");
const multiplierControl = document.getElementById("multiplierControl");

commandInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && commandInput.value === "/analise") {
    adminModal.classList.remove("hidden");
    commandInput.value = "";
  }
});

confirmPassword.onclick = () => {
  if (adminPassword.value === "0000") {
    passwordBox.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    xpControl.value = config.xpPerClick;
    multiplierControl.value = config.multiplier;
  } else {
    alert("Senha incorreta");
  }
};

xpControl.oninput = () => config.xpPerClick = Number(xpControl.value);
multiplierControl.oninput = () => config.multiplier = Number(multiplierControl.value);

closeAdmin.onclick = () => {
  adminModal.classList.add("hidden");
  passwordBox.classList.remove("hidden");
  adminPanel.classList.add("hidden");
};
