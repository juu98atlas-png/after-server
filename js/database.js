// Simples banco local
const storageKey = "afterServerUsers";

function saveUser(user) {
  let users = JSON.parse(localStorage.getItem(storageKey)) || [];
  users = users.filter(u => u.nickname !== user.nickname); // evita duplicado
  users.push(user);
  localStorage.setItem(storageKey, JSON.stringify(users));
}

function getUser(nickname, password) {
  let users = JSON.parse(localStorage.getItem(storageKey)) || [];
  return users.find(u => u.nickname === nickname && u.password === password);
}
