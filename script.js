// ELEMENTOS DO DASHBOARD
const authPanel = document.getElementById("authPanel");
const dashboard = document.getElementById("dashboard");
const nicknameInput = document.getElementById("nicknameInput");
const passwordInput = document.getElementById("passwordInput");
const classSelect = document.getElementById("classSelect");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const authMessage = document.getElementById("authMessage");

const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xpText");
const levelEl = document.getElementById("level");
const coinsEl = document.getElementById("coins");

const menuBtn = document.getElementById("menuBtn");
const menuOptions = document.getElementById("menuOptions");

// DADOS
let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = null;

// ESTATÍSTICAS
let xp = 0;
let level = 1;
let coins = 0;
let xpNeeded = 100;

// FUNÇÃO DE CADASTRO
registerBtn.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();
  const password = passwordInput.value.trim();
  const userClass = classSelect.value;

  if (!nickname || !password) {
    authMessage.textContent = "Preencha apelido e senha!";
    return;
  }
  if (users[nickname]) {
    authMessage.textContent = "Apelido já existe!";
    return;
  }

  users[nickname] = { password, class: userClass, level: 1, xp: 0, coins: 0 };
  localStorage.setItem("users", JSON.stringify(users));
  authMessage.textContent = "Cadastro realizado! Agora faça login.";
});

// FUNÇÃO DE LOGIN
loginBtn.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!users[nickname] || users[nickname].password !== password) {
    authMessage.textContent = "Apelido ou senha incorretos!";
    return;
  }

  currentUser = users[nickname];
  xp = currentUser.xp;
  level = currentUser.level;
  coins = currentUser.coins;
  xpNeeded = Math.floor(100 * Math.pow(1.35, level-1));

  updateDashboard();
  authPanel.style.display = "none";
  dashboard.style.display = "grid";
});

// FUNÇÃO DE MINERAÇÃO
mineBtn.addEventListener("click", () => {
  const gain = Math.floor(Math.random() * 12) + 6;
  xp += gain;

  // DROP de moedas raras
  if (Math.random() < 0.35) {
    coins++;
  }

  // LEVEL UP
  if (xp >= xpNeeded) {
    xp -= xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded * 1.35);
  }

  updateDashboard();
  saveUserData();
});

function updateDashboard() {
  const percent = Math.min((xp / xpNeeded) * 100, 100);
  xpFill.style.width = percent + "%";
  xpText.textContent = `${xp} / ${xpNeeded} XP`;
  levelEl.textContent = level;
  coinsEl.textContent = coins;
}

function saveUserData() {
  if (!currentUser) return;
  currentUser.xp = xp;
  currentUser.level = level;
  currentUser.coins = coins;
  users[nicknameInput.value.trim()] = currentUser;
  localStorage.setItem("users", JSON.stringify(users));
}

// MENU LATERAL
menuBtn.addEventListener("click", () => {
  menuOptions.classList.toggle("menu-hidden");
});
