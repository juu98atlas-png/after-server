document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("AFTER_USER");
  if (!user) return;

  const menuBtn = document.getElementById("menuBtn");
  const topMenu = document.getElementById("topMenu");

  if (!menuBtn || !topMenu) return;

  menuBtn.addEventListener("click", () => {
    topMenu.classList.toggle("open");
  });
});
