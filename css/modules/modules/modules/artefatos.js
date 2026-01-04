// ARTEFATOS - Upload 3D
const artefatosArea = document.getElementById("artefatosArea");
const artefatosSection = document.getElementById("artefatosSection");
const upload3D = document.getElementById("upload3D");
const artefatosGrid = document.getElementById("artefatosGrid");

artefatosArea.addEventListener("click", () => artefatosSection.classList.toggle("hidden"));

upload3D.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const div = document.createElement("div");
  div.classList.add("artefatoItem");
  div.textContent = file.name;
  artefatosGrid.appendChild(div);
});
