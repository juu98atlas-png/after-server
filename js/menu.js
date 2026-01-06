const menuBtn = document.getElementById("menuBtn");
const topMenu = document.getElementById("topMenu");

menuBtn.addEventListener("click", () => {
  topMenu.style.display = topMenu.style.display === "block" ? "none" : "block";
});
