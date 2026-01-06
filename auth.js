// auth.js
const loginForm = document.getElementById("loginForm");
const nicknameInput = document.getElementById("nickname");
const classSelect = document.getElementById("classSelect");
const passwordInput = document.getElementById("password");

// Função para cadastrar usuário
function registerUser(nickname, userClass, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(u => u.nickname === nickname)) {
    alert("Apelido já existe!");
    return false;
  }
  users.push({ nickname, userClass, password, level: 1, xp: 0, coins: 0, points: {} });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Cadastro realizado com sucesso!");
  return true;
}

// Função para login
function loginUser(nickname, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.nickname === nickname && u.password === password);
  if (!user) {
    alert("Apelido ou senha incorretos!");
    return null;
  }
  localStorage.setItem("currentUser", JSON.stringify(user));
  return user;
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nickname = nicknameInput.value;
    const userClass = classSelect.value;
    const password = passwordInput.value;
    
    if (registerUser(nickname, userClass, password)) {
      loginUser(nickname, password);
      location.reload(); // recarrega para mostrar dashboard
    }
  });
}
