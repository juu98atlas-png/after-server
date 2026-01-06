const chatInput = document.getElementById("chatInput");
const chatBox = document.getElementById("chatBox");
const sendChatBtn = document.getElementById("sendChatBtn");

sendChatBtn.addEventListener("click", sendChat);
chatInput.addEventListener("keypress", e => {
  if(e.key === "Enter") sendChat();
});

function sendChat() {
  if(!currentUser) return alert("Entre primeiro!");
  const msg = chatInput.value.trim();
  if(!msg) return;

  const p = document.createElement("p");
  p.textContent = `[${currentUser.nickname} | ${currentUser.className} | Lvl ${currentUser.level}]: ${msg}`;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;

  chatInput.value = "";
}
