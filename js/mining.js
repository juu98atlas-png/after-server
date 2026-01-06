const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xpText");
const levelEl = document.getElementById("level");
const coinsEl = document.getElementById("coins");

mineBtn.addEventListener("click", () => {
  if(!currentUser) return alert("Entre primeiro!");

  let gain = Math.floor(Math.random()*12)+6;
  currentUser.xp += gain;

  // drop raro
  let rareDrop = false;
  if(Math.random() < 0.15) {
    currentUser.coins++;
    coinsEl.textContent = currentUser.coins;
    rareDrop = true;
  }

  if(currentUser.xp >= 100) {
    currentUser.xp -= 100;
    currentUser.level++;
  }

  let percent = Math.min((currentUser.xp / 100)*100, 100);
  xpFill.style.width = percent + "%";
  xpText.textContent = `${currentUser.xp} / 100 XP`;
  levelEl.textContent = currentUser.level;

  saveUser(currentUser);

  if(rareDrop) alert("Drop Raro! +1 Coin");
});
