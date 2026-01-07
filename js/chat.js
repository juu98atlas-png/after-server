document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("AFTER_USER");
  if (!saved) return;

  const user = JSON.parse(saved);

  const chatBox = document.getElementById("chatBox");
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");

  if (!sendBtn) return;

  sendBtn.addEventListener("click", () => {
    const msg = chatInput.value.trim();
    if (!msg) return;

    const line = document.createElement("div");
    line.textContent = `${user.nickname} [${user.class} Lv${user.level}]: ${msg}`;

    chatBox.appendChild(line);
    chatBox.scrollTop = chatBox.scrollHeight;

    chatInput.value = "";
  });
});
