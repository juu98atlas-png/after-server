const auth = window.auth;
const db = window.db;

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const message = document.getElementById("authMessage");

const authPanel = document.getElementById("authPanel");
const dashboard = document.getElementById("dashboard");

loginBtn.onclick = async () => {
  const nick = nicknameInput.value.trim();
  const pass = passwordInput.value;

  if (!nick || !pass) {
    message.textContent = "Preencha todos os campos";
    return;
  }

  try {
    await auth.signInWithEmailAndPassword(`${nick}@after.app`, pass);
    authPanel.style.display = "none";
    dashboard.style.display = "block";
  } catch (err) {
    message.textContent = err.message;
  }
};

registerBtn.onclick = async () => {
  const nick = nicknameInput.value.trim();
  const pass = passwordInput.value;
  const classe = classSelect.value;

  if (!nick || !pass) {
    message.textContent = "Campos vazios";
    return;
  }

  try {
    const userCred = await auth.createUserWithEmailAndPassword(
      `${nick}@after.app`,
      pass
    );

    await db.collection("users").doc(userCred.user.uid).set({
      nickname: nick,
      classe,
      level: 1,
      coins: 0
    });

    message.textContent = "Conta criada com sucesso!";
  } catch (err) {
    message.textContent = err.message;
  }
};
