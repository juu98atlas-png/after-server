document.addEventListener("DOMContentLoaded", () => {
  const authPanel = document.getElementById("authPanel");
  const dashboard = document.getElementById("dashboard");

  const nicknameInput = document.getElementById("nicknameInput");
  const passwordInput = document.getElementById("passwordInput");
  const classSelect = document.getElementById("classSelect");

  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const authMessage = document.getElementById("authMessage");

  // Segurança básica
  if (!loginBtn || !registerBtn) {
    console.error("auth.js: Botões não encontrados");
    return;
  }

  // REGISTRO
  registerBtn.addEventListener("click", () => {
    const nickname = nicknameInput.value.trim();
    const password = passwordInput.value.trim();
    const userClass = classSelect.value;

    if (!nickname || !password) {
      authMessage.textContent = "Preencha todos os campos.";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[nickname]) {
      authMessage.textContent = "Usuário já existe.";
      return;
    }

    users[nickname] = {
      password,
      class: userClass,
      level: 1,
      coins: 0,
      xp: 0
    };

    localStorage.setItem("users", JSON.stringify(users));
    authMessage.textContent = "Cadastro realizado! Agora faça login.";
  });

  // LOGIN
  loginBtn.addEventListener("click", () => {
    const nickname = nicknameInput.value.trim();
    const password = passwordInput.value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[nickname] || users[nickname].password !== password) {
      authMessage.textContent = "Login inválido.";
      return;
    }

    localStorage.setItem("currentUser", nickname);

    // Atualiza HUD
    document.getElementById("level").textContent = users[nickname].level;
    document.getElementById("coins").textContent = users[nickname].coins;

    authPanel.style.display = "none";
    dashboard.style.display = "block";
  });
});
