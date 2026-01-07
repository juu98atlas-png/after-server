const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const authPanel = document.getElementById("authPanel");
const dashboard = document.getElementById("dashboard");
const message = document.getElementById("authMessage");

function enterApp(user) {
  localStorage.setItem("after_user", JSON.stringify(user));
  authPanel.style.display = "none";
  dashboard.style.display = "block";
}

loginBtn.onclick = () => {
  const user = JSON.parse(localStorage.getItem("after_user"));
  if (!user) {
    message.textContent = "Usuário não encontrado.";
    return;
  }
  enterApp(user);
};

registerBtn.onclick = () => {
  const user = {
    nickname: nicknameInput.value,
    class: classSelect.value,
    level: 1,
    coins: 0,
    xp: 0,
    xpNeeded: 100
  };
  enterApp(user);
};
