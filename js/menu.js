const menuBtn = document.getElementById("menuBtn");
const topMenu = document.getElementById("topMenu");

menuBtn.onclick = () => {
  topMenu.classList.toggle("open");
};
