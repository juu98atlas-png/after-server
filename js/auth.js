const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const authMessage = document.getElementById("authMessage");

// LOGIN
loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      authMessage.innerText = "Login realizado com sucesso!";
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
      authMessage.innerText = "Conta criada com sucesso!";
    })
    .catch(error => {
      authMessage.innerText = error.message;
    });
});
