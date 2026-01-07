import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";

const authPanel = document.getElementById("authPanel");
const dashboard = document.getElementById("dashboard");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const authMessage = document.getElementById("authMessage");

// CADASTRO
registerBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if (!email || !password) {
    authMessage.textContent = "Preencha todos os campos!";
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Cria dados iniciais no Database
      set(ref(db, 'users/' + user.uid), {
        email: user.email,
        level: 1,
        coins: 0,
        xp: 0
      });
      authMessage.textContent = "Cadastro realizado com sucesso!";
      authPanel.style.display = "none";
      dashboard.style.display = "block";
    })
    .catch((error) => {
      authMessage.textContent = error.message;
    });
});

// LOGIN
loginBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if (!email || !password) {
    authMessage.textContent = "Preencha todos os campos!";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      authMessage.textContent = "Login efetuado com sucesso!";
      authPanel.style.display = "none";
      dashboard.style.display = "block";
    })
    .catch((error) => {
      authMessage.textContent = error.message;
    });
});

// LOGOUT
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      dashboard.style.display = "none";
      authPanel.style.display = "block";
      authMessage.textContent = "";
      emailInput.value = "";
      passwordInput.value = "";
    });
});
