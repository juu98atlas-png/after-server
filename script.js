const enterBtn = document.getElementById("enterBtn");
const hero = document.getElementById("hero");
const app = document.getElementById("app");
const clickSound = document.getElementById("clickSound");

enterBtn.addEventListener("click", () => {
  hero.classList.add("hidden");
  app.classList.remove("hidden");
  clickSound.play().catch(() => {});
});
