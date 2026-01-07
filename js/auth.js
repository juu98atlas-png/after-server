// auth.js
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Elementos do DOM
const authPanel = document.getElementById("authPanel");
const dashboard = document.getElementById("dashboard");

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");

const authMessage = document.getElementById("authMessage");

// Função para exibir mensagens
function showMessage(msg, success = true) {
  authMessage.textContent = msg;
  authMessage.style.color = success ? "lime" : "red";
}

// CADASTRO
registerBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showMessage("Preencha email e senha.", false);
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage("Conta criada com sucesso!");
      emailInput.value = "";
      passwordInput.value = "";
    })
    .catch((error) => {
      showMessage(error.message, false);
    });
});

// LOGIN
loginBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showMessage("Preencha email e senha.", false);
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage("Login efetuado com sucesso!");
      authPanel.style.display = "none";
      dashboard.style.display = "block";
    })
    .catch((error) => {
      showMessage(error.message, false);
    });
});

// LOGOUT
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      showMessage("Logout efetuado!");
      dashboard.style.display = "none";
      authPanel.style.display = "block";
    })
    .catch((error) => {
      showMessage(error.message, false);
    });
});

// Mantém usuário logado se a página for recarregada
onAuthStateChanged(auth, (user) => {
  if (user) {
    authPanel.style.display = "none";
    dashboard.style.display = "block";
    showMessage(`Bem-vindo ${user.email}!`);
  } else {
    authPanel.style.display = "block";
    dashboard.style.display = "none";
  }
});
