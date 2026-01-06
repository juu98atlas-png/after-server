const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", () => {
  sendMessage();
});

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;
  const div = document.createElement("div");
  div.textContent = `${currentUser.nickname} [${currentUser.class}] Lvl:${currentUser.level}: ${msg}`;
  chatBox.appendChild(div);
  chatInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
