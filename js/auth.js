document.addEventListener("DOMContentLoaded", () => {
  const authPanel = document.getElementById("authPanel");
  const dashboard = document.getElementById("dashboard");

  const nicknameInput = document.getElementById("nicknameInput");
  const passwordInput = document.getElementById("passwordInput");
  const classSelect = document.getElementById("classSelect");

  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const authMessage = document.getElementById("authMessage");

  function showDashboard() {
    authPanel.style.display = "none";
    dashboard.style.display = "block";
  }

  function showAuth() {
    authPanel.style.display = "block";
    dashboard.style.display = "none";
  }

  // AUTO LOGIN
  const savedUser = localStorage.getItem("AFTER_USER");
  if (savedUser) {
    showDashboard();
  }

  // REGISTRAR
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

    localStorage.setItem("AFTER_USER", JSON.stringify(userData));
    authMessage.textContent = "Conta criada com sucesso!";
  });

  // LOGIN
  loginBtn.addEventListener("click", () => {
    const nickname = nicknameInput.value.trim();
    const password = passwordInput.value.trim();

    const saved = localStorage.getItem("AFTER_USER");

    if (!saved) {
      authMessage.textContent = "Nenhuma conta encontrada.";
      return;
    }

    const user = JSON.parse(saved);

    if (nickname !== user.nickname || password !== user.password) {
      authMessage.textContent = "Apelido ou senha incorretos.";
      return;
    }

    showDashboard();
  });
});
