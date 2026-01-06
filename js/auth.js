const loginSection = document.getElementById("loginSection");
const nicknameInput = document.getElementById("nickname");
const classSelect = document.getElementById("classSelect");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();
  const userClass = classSelect.value;
  const password = passwordInput.value;

  if (!nickname || !userClass || !password) return alert("Preencha todos os campos");

  let user = db.users.find(u => u.nickname === nickname);
  if (!user) {
    // cadastro
    user = { nickname, class: userClass, password, level: 1, xp: 0, coins: 0 };
    db.users.push(user);
    saveDB();
  } else if (user.password !== password) {
    return alert("Senha incorreta!");
  }

  loginSection.classList.add("hidden");
  window.currentUser = user;
  updateStats();
});
