// Captura elementos
const authPanel = document.getElementById("authPanel");
const dashboard = document.getElementById("dashboard");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const nicknameInput = document.getElementById("nicknameInput");
const passwordInput = document.getElementById("passwordInput");
const classSelect = document.getElementById("classSelect");
const authMessage = document.getElementById("authMessage");

// Pega lista de usuários do localStorage ou cria vazia
let users = JSON.parse(localStorage.getItem("users") || "[]");
let currentUser = null;

// Função de salvar lista de usuários no localStorage
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// Cadastro
registerBtn.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();
  const password = passwordInput.value.trim();
  const userClass = classSelect.value;

  if (!nickname || !password) {
    authMessage.textContent = "Preencha todos os campos!";
    return;
  }

  if (users.find(u => u.nickname === nickname)) {
    authMessage.textContent = "Usuário já existe!";
    return;
  }

  const newUser = { nickname, password, class: userClass, level: 1, coins: 0, xp: 0 };
  users.push(newUser);
  saveUsers();
  authMessage.textContent = "Cadastro realizado! Faça login agora.";
  nicknameInput.value = "";
  passwordInput.value = "";
});

// Login
loginBtn.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();
  const password = passwordInput.value.trim();

  const user = users.find(u => u.nickname === nickname && u.password === password);

  if (!user) {
    authMessage.textContent = "Usuário ou senha inválidos!";
    return;
  }

  currentUser = user;
  authPanel.style.display = "none";
  dashboard.style.display = "block";

  updateDashboard();
});

// Atualiza painel de usuário
function updateDashboard() {
  document.getElementById("level").textContent = currentUser.level;
  document.getElementById("coins").textContent = currentUser.coins;
  // Atualiza XP bar
  const percent = Math.min((currentUser.xp / 100) * 100, 100);
  const xpFill = document.getElementById("xpFill");
  const xpText = document.getElementById("xpText");
  xpFill.style.width = percent + "%";
  xpText.textContent = `${currentUser.xp} / 100 XP`;
}

// Garante que sempre que minerar ou usar funções, salvamos progresso
function saveCurrentUser() {
  const idx = users.findIndex(u => u.nickname === currentUser.nickname);
  if (idx > -1) {
    users[idx] = currentUser;
    saveUsers();
  }
}
