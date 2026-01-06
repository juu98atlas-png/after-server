// database.js

// Função para atualizar usuário
function updateUser(user) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const index = users.findIndex(u => u.nickname === user.nickname);
  if (index !== -1) {
    users[index] = user;
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// Função para buscar usuário atual
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
}

// Função para salvar estado atual do usuário
function saveCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
  updateUser(user);
}
