const levelEl = document.getElementById("level");
const coinsEl = document.getElementById("coins");
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xpText");

function updateProfile(){
  if(currentUser){
    levelEl.textContent = currentUser.level;
    coinsEl.textContent = currentUser.coins;
    const percent = Math.min((currentUser.xp / 100) * 100, 100);
    xpFill.style.width = percent + "%";
    xpText.textContent = `${currentUser.xp} / 100 XP`;
  }
}
