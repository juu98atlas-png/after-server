console.log("SCRIPT CARREGADO");

// ===== BASE DE DADOS LOCAL =====
const db = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  classStats: JSON.parse(localStorage.getItem("classStats")) || {
    Minerador: 0,
    Alcateia: 0,
    Piratas: 0,
    Cúpula: 0
  }
};

let currentUser = null;

// ===== ELEMENTOS =====
const authScreen = document.getElementById("auth-screen");
const appScreen = document.getElementById("app-screen");
const loginBtn = document.getElementById("login-btn");

const nicknameInput = document.getElementById("nickname");
const classSelect = document.getElementById("class-select");
const passwordInput = document.getElementById("password");

const userNameSpan = document.getElementById("user-name");
const userClassSpan = document.getElementById("user-class");
const userLevelSpan = document.getElementById("user-level");

const mineBtn = document.getElementById("mine-btn");
const xpBar = document.getElementById("xp-bar");

const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-text");
const sendChatBtn = document.getElementById("send-chat");

const commandBar = document.getElementById("command-bar");
const adminPanel = document.getElementById("admin-panel");

// ===== LOGIN / CADASTRO =====
loginBtn.addEventListener("click", () => {
  const nick = nicknameInput.value.trim();
  const userClass = classSelect.value;
  const pass = passwordInput.value.trim();

  if (!nick || !pass) {
    alert("Preencha todos os campos");
    return;
  }

  let user = db.users.find(u => u.nick === nick);

  if (!user) {
    // CRIAR NOVO USUÁRIO
    user = {
      nick,
      class: userClass,
      pass,
      level: 1,
      xp: 0,
      coins: 0,
      skills: {}
    };
    db.users.push(user);
    db.classStats[userClass]++;
    saveDB();
  } else {
    if (user.pass !== pass) {
      alert("Senha incorreta");
      return;
    }
  }

  currentUser = user;
  enterApp();
});

// ===== ENTRAR NO APP =====
function enterApp() {
  authScreen.classList.remove("active");
  appScreen.classList.add("active");

  updateUserUI();
  renderClassPanel();
}

// ===== ATUALIZAR UI =====
function updateUserUI() {
  userNameSpan.textContent = currentUser.nick;
  userClassSpan.textContent = currentUser.class;
  userLevelSpan.textContent = currentUser.level;
  updateXPBar();
}

function updateXPBar() {
  const percent = (currentUser.xp / 100) * 100;
  xpBar.style.width = `${percent}%`;
}

// ===== SALVAR =====
function saveDB() {
  localStorage.setItem("users", JSON.stringify(db.users));
  localStorage.setItem("classStats", JSON.stringify(db.classStats));
}

// ===== CLASSES =====
function renderClassPanel() {
  document.getElementById("count-minerador").textContent = db.classStats.Minerador;
  document.getElementById("count-alcateia").textContent = db.classStats.Alcateia;
  document.getElementById("count-piratas").textContent = db.classStats.Piratas;
  document.getElementById("count-cupula").textContent = db.classStats.Cúpula;
}

// ===== MINERAÇÃO =====
mineBtn.addEventListener("click", () => {
  currentUser.xp += 10;
  currentUser.coins += 1;

  if (currentUser.xp >= 100) {
    currentUser.xp = 0;
    currentUser.level++;
    alert("LEVEL UP!");
  }

  saveDB();
  updateUserUI();
});

// ===== CHAT =====
sendChatBtn.addEventListener("click", sendMessage);

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  const msg = document.createElement("div");
  msg.textContent = `[${currentUser.class}] ${currentUser.nick} (Lv.${currentUser.level}): ${text}`;
  chatMessages.appendChild(msg);

  chatInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== COMANDOS =====
commandBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = commandBar.value.trim();
    commandBar.value = "";

    if (cmd === "/Analise") {
      const senha = prompt("Senha de acesso:");
      if (senha === "0000") {
        adminPanel.classList.remove("hidden");
        alert("Painel administrativo liberado");
      } else {
        alert("Senha incorreta");
      }
    }
  }
});
