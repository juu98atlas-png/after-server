const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const levelSpan = document.getElementById("level");
const coinsSpan = document.getElementById("coins");
const buffsSpan = document.getElementById("buffs");
const clickSound = document.getElementById("clickSound");

let xp = 0, level = 1, coins = 0, xpNeeded = 100;
let activeBuffs = [];

function updateProfile() {
  levelSpan.textContent = level;
  coinsSpan.textContent = coins;
  buffsSpan.textContent = activeBuffs.length ? activeBuffs.join(", ") : "Nenhum";
  xpFill.style.width = Math.min((xp / xpNeeded)*100,100) + "%";
}

mineBtn.addEventListener("click", ()=>{
  clickSound.currentTime=0; clickSound.play().catch(()=>{});
  let gain = Math.floor(Math.random()*15)+5;
  if(activeBuffs.includes("XP+")) gain = Math.floor(gain*1.5);
  xp+=gain;

  if(Math.random()<0.3) coins+=1;

  if(xp>=xpNeeded){
    xp-=xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded*1.4);
  }

  updateProfile();
});

updateProfile();
