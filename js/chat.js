const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

const user = JSON.parse(localStorage.getItem("after_user"));

function sendMessage() {
  const msg = chatInput.value.trim();
  if (!msg || !user) return;

  const msgEl = document.createElement("div");
  msgEl.textContent = `${user.nickname} [${user.class} Lv${user.level}]: ${msg}`;
  chatBox.appendChild(msgEl);

  chatBox.scrollTop = chatBox.scrollHeight;
  chatInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
