const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });

function sendMessage() {
  if (!window.currentUser) return alert("Faça login primeiro");
  const text = chatInput.value.trim();
  if (!text) return;
  const msg = { text, user: window.currentUser.nickname, class: window.currentUser.class, level: window.currentUser.level };
  db.chat.push(msg);
  saveDB();
  renderChat();
  chatInput.value = "";
}

function renderChat() {
  chatMessages.innerHTML = "";
  db.chat.slice(-50).forEach(msg => {
    const div = document.createElement("div");
    div.textContent = `[${msg.class} Lv${msg.level}] ${msg.user}: ${msg.text}`;
    chatMessages.appendChild(div);
  });
}
renderChat();
