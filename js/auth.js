const authPanel = document.getElementById("authPanel");
const dashboard = document.getElementById("dashboard");

const nicknameInput = document.getElementById("nicknameInput");
const passwordInput = document.getElementById("passwordInput");
const classSelect = document.getElementById("classSelect");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const authMessage = document.getElementById("authMessage");

function loadSession() {
  const user = JSON.parse(localStorage.getItem("after_user"));
  if (user) {
    authPanel.style.display = "none";
    dashboard.style.display = "block";
  }
}

registerBtn.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();
  const password = passwordInput.value.trim();
  const userClass = classSelect.value;

  if (!nickname || !password) {
    authMessage.textContent = "Preencha todos os campos.";
    return;
  }

  const userData = {
    nickname,
    password,
    class: userClass,
    level: 1,
    xp: 0,
    coins: 0
  };

  localStorage.setItem("after_user", JSON.stringify(userData));
  authMessage.textContent = "Conta criada com sucesso!";
});

loginBtn.addEventListener("click", () => {
  const stored = JSON.parse(localStorage.getItem("after_user"));
  if (!stored) {
    authMessage.textContent = "Usuário não encontrado.";
    return;
  }

  if (
    stored.nickname === nicknameInput.value.trim() &&
    stored.password === passwordInput.value.trim()
  ) {
    authPanel.style.display = "none";
    dashboard.style.display = "block";
  } else {
    authMessage.textContent = "Dados incorretos.";
  }
});

loadSession();
