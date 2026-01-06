const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const classSelect = document.getElementById("classSelect");
const passwordInput = document.getElementById("password");

let currentUser = null;

loginBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const classe = classSelect.value;
  const password = passwordInput.value;

  if(username && password){
    currentUser = {username, classe, level:1, coins:0, xp:0};
    loginScreen.classList.add("hidden");
    dashboard.classList.remove("hidden");
    alert(`Bem-vindo ${username} da classe ${classe}!`);
  } else {
    alert("Preencha todos os campos!");
  }
});
