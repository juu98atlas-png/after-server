// ===============================
// AUTH.JS — Login e Cadastro
// ===============================

const authPanel = document.getElementById("authPanel");
const dashboard = document.getElementById("dashboard");

const nicknameInput = document.getElementById("nicknameInput");
const passwordInput = document.getElementById("passwordInput");
const classSelect = document.getElementById("classSelect");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const authMessage = document.getElementById("authMessage");

// ===============================
// Helpers
// ===============================

function getUserKey(nickname) {
  return `after_user_${nickname.toLowerCase()}`;
}

function saveCurrentUser(user) {
  localStorage.setItem("after_current_user", user.nickname);
}

function getCurrentUser() {
  const nickname = localStorage.getItem("after_current_user");
  if (!nickname) return null;

  const data = localStorage.getItem(getUserKey(nickname));
  return data ? JSON.parse(data) : null;
}

function updateUI(user) {
  document.getElementById("level").textContent = user.level;
  document.getElementById("coins").textContent = user.coins;

  authPanel.style.display = "none";
  dashboard.style.display = "block";
}

// ===============================
// Cadastro
// ===============================

registerBtn.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();
  const password = passwordInput.value.trim();
  const userClass = classSelect.value;

  if (!nickname || !password) {
    authMessage.textContent = "Preencha apelido e senha.";
    return;
  }

  const key = getUserKey(nickname);

  if (localStorage.getItem(key)) {
    authMessage.textContent = "Esse apelido já existe.";
    return;
  }

  const newUser = {
    nickname,
    password,
    class: userClass,
    level: 1,
    xp: 0,
    xpMax: 100,
    coins: 0,
    createdAt: Date.now()
  };

  localStorage.setItem(key, JSON.stringify(newUser));
  saveCurrentUser(newUser);

  authMessage.textContent = "Cadastro realizado com sucesso!";
  updateUI(newUser);
});

// ===============================
// Login
// ===============================

loginBtn.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!nickname || !password) {
    authMessage.textContent = "Preencha apelido e senha.";
    return;
  }

  const key = getUserKey(nickname);
  const data = localStorage.getItem(key);

  if (!data) {
    authMessage.textContent = "Usuário não encontrado.";
    return;
  }

  const user = JSON.parse(data);

  if (user.password !== password) {
    authMessage.textContent = "Senha incorreta.";
    return;
  }

  saveCurrentUser(user);
  updateUI(user);
});

// ===============================
// Auto-login
// ===============================

window.addEventListener("load", () => {
  const user = getCurrentUser();
  if (user) {
    updateUI(user);
  }
});
