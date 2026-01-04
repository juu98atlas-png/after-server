let xp = 30;
let level = 1;
let coins = 0;

function openProfile() {
  alert(`Usuário: Convidado\nEmblema: 🛠️ Minerador\nLevel: ${level}\nCoins: ${coins}`);
}

function handleSearch(event) {
  if (event.key === "Enter") {
    const val = event.target.value.toLowerCase();
    if (val === "/análise") {
      document.getElementById("admin-section").classList.remove("hidden");
    }
    event.target.value = "";
  }
}

function enterAdmin() {
  const pass = document.getElementById("admin-pass").value;
  if (pass === "0000") {
    document.getElementById("admin-tools").classList.remove("hidden");
    alert("Acesso liberado!");
  } else {
    alert("Senha incorreta!");
  }
}

function addArtifact(event) {
  const file = event.target.files[0];
  if (!file) return;
  const artifactList = document.getElementById("artifact-list");
  const div = document.createElement("div");
  div.textContent = file.name;
  div.className = "artifact-item";
  artifactList.appendChild(div);
}

function playClick() {
  const sound = document.getElementById("click-sound");
  sound.currentTime = 0;
  sound.play();
}

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", playClick);
});
