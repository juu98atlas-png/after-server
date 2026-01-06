const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", e => { if(e.key === "Enter") sendMessage(); });

function sendMessage(){
  if(currentUser && chatInput.value.trim() !== ""){
    const msg = document.createElement("div");
    msg.textContent = `[${currentUser.username} | ${currentUser.classe} | Lvl ${currentUser.level}] : ${chatInput.value}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
    chatInput.value = "";
  }
}
