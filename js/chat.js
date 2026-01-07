const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

const user = JSON.parse(localStorage.getItem("after_user"));

sendBtn.onclick = () => {
  const msg = chatInput.value.trim();
  if (!msg) return;

  const el = document.createElement("div");
  el.textContent = `${user.nickname} [${user.class} Lv${user.level}]: ${msg}`;

  chatBox.appendChild(el);
  chatBox.scrollTop = chatBox.scrollHeight;
  chatInput.value = "";
};
