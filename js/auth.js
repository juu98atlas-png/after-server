// auth.js

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const authMessage = document.getElementById("authMessage");

const nicknameInput = document.getElementById("nicknameInput");
const classSelect = document.getElementById("classSelect");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

const authPanel = document.getElementById("authPanel");
const dashboard = document.getElementById("dashboard");

// CADASTRAR
registerBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const nickname = nicknameInput.value.trim();
  const userClass = classSelect.value;

  if (!email || !password || !nickname) {
    authMessage.textContent = "Preencha todos os campos";
    return;
  }

  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);

    await db.collection("users").doc(cred.user.uid).set({
      nickname,
      class: userClass,
      level: 1,
      coins: 0,
      createdAt: new Date()
    });

    authMessage.textContent = "Conta criada com sucesso!";
  } catch (err) {
    authMessage.textContent = err.message;
  }
});

// LOGIN
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    authMessage.textContent = "Informe email e senha";
    return;
  }

  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    authMessage.textContent = err.message;
  }
});

// OBSERVADOR DE LOGIN (A PARTE MAIS IMPORTANTE)
auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  const doc = await db.collection("users").doc(user.uid).get();
  const data = doc.data();

  // Salva globalmente (o resto do app vai usar isso depois)
  window.currentUser = {
    uid: user.uid,
    ...data
  };

  // Mostra dashboard
  authPanel.style.display = "none";
  dashboard.style.display = "block";
});
