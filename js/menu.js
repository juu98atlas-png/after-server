const menuBtn = document.getElementById("menuBtn");
const topMenu = document.getElementById("topMenu");

if (menuBtn && topMenu) {
  menuBtn.addEventListener("click", () => {
    topMenu.classList.toggle("open");
  });
}
