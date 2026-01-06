// chat.js
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSend");

let messages = JSON.parse(localStorage.getItem("messages")) || [];

function renderMessages() {
  if (!chatBox) return;
  chatBox.innerHTML = "";
  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "chat-message";
    div.textContent = `[${msg.userClass}] ${msg.nickname} (Lv ${msg.level}): ${msg.text}`;
    chatBox.appendChild(div);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

if (chatSendBtn) {
  chatSendBtn.addEventListener("click", () => {
    if (!chatInput.value) return;
    messages.push({ 
      nickname: user.nickname, 
      userClass: user.userClass, 
      level: user.level, 
      text: chatInput.value 
    });
    localStorage.setItem("messages", JSON.stringify(messages));
    chatInput.value = "";
    renderMessages();
  });
}

renderMessages();
