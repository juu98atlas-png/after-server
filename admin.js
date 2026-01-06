// admin.js
function openAdminPanel() {
  const cmd = prompt("Digite o comando:");
  if (cmd === "/Analise") {
    const pass = prompt("Senha:");
    if (pass === "0000") {
      alert("Acesso liberado ao painel de administração!");
      // Aqui você poderá abrir o painel real com controles de membros
    } else {
      alert("Senha incorreta!");
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "F2") { // exemplo: F2 abre painel de admin
    openAdminPanel();
  }
});
