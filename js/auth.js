const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const authMessage = document.getElementById("authMessage");

const authBox = document.querySelector(".auth-box");
const dashboard = document.getElementById("dashboard");
const logoutBtn = document.getElementById("logoutBtn");

// LOGIN
loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      authBox.style.display = "none";
      dashboard.style.display = "block";
    })
    .catch(error => {
      authMessage.innerText = error.message;
    });
});

// CADASTRO
registerBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      authMessage.innerText = "Conta criada! Agora faça login.";
    })
    .catch(error => {
      authMessage.innerText = error.message;
    });
});

// LOGOUT
logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    dashboard.style.display = "none";
    authBox.style.display = "block";
  });
});
