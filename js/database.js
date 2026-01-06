// Simula o banco de dados
let db = {
  users: [],
  chat: []
};

function saveDB() {
  localStorage.setItem('db', JSON.stringify(db));
}

function loadDB() {
  const data = localStorage.getItem('db');
  if (data) db = JSON.parse(data);
}
loadDB();
