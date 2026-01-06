// Sala de admin bloqueada: /Analise
const secretCode = "0000";

function checkAdmin(command) {
  if(command === "/Analise") {
    const pass = prompt("Senha de admin:");
    if(pass === secretCode) {
      alert("Acesso liberado!");
      // Aqui podemos abrir o painel de administração
    } else {
      alert("Senha incorreta!");
    }
  }
}
