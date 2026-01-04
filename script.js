// ELEMENTOS
const enterBtn = document.getElementById("enterBtn");
const hero = document.getElementById("hero");
const app = document.getElementById("app");

const clickSound = document.getElementById("clickSound");

// ENTRAR NO SISTEMA
enterBtn.addEventListener("click", () => {
  // Toca som no mobile
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});

  // Mostra app e esconde landing
  hero.classList.add("hidden");
  app.classList.remove("hidden");
});
