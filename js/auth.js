// auth.js
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const statusText = document.getElementById("status");

// REGISTRAR
registerBtn.addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );
    statusText.innerText = "Conta criada com sucesso!";
  } catch (error) {
    statusText.innerText = error.message;
  }
});

// LOGIN
loginBtn.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );
    statusText.innerText = "Login realizado!";
  } catch (error) {
    statusText.innerText = error.message;
  }
});

// LOGOUT
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// OBSERVADOR DE LOGIN
onAuthStateChanged(auth, (user) => {
  if (user) {
    statusText.innerText = `Logado como ${user.email}`;
    logoutBtn.style.display = "block";
  } else {
    statusText.innerText = "Não logado";
    logoutBtn.style.display = "none";
  }
});
