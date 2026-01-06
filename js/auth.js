const loginSection = document.getElementById("loginSection");
const nicknameInput = document.getElementById("nickname");
const classSelect = document.getElementById("classSelect");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

let currentUser = null;

loginBtn.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();
  const className = classSelect.value;
  const password = passwordInput.value;

  if (!nickname || !className || !password) return alert("Preencha todos os campos!");

  let user = getUser(nickname, password);

  if (!user) {
    // Criar novo
    user = { nickname, className, password, xp: 0, level: 1, coins: 0 };
    saveUser(user);
  }

  currentUser = user;
  loginSection.style.display = "none";

  // Atualizar dashboard
  updateDashboard();
});

function updateDashboard() {
  document.getElementById("level").textContent = currentUser.level;
  document.getElementById("coins").textContent = currentUser.coins;
}
