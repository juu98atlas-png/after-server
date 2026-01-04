const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const levelSpan = document.getElementById("level");
const coinsSpan = document.getElementById("coins");
const levelupSound = document.getElementById("levelupSound");

let xp = 0;
let level = 1;
let coins = 0;
let xpNeeded = 100;

mineBtn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});

  const gain = Math.floor(Math.random()*15)+5;
  xp += gain;

  if(Math.random()<0.3){ coins++; coinsSpan.textContent = coins; }

  if(xp>=xpNeeded){
    xp -= xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded*1.4);
    levelSpan.textContent = level;
    levelupSound.play().catch(()=>{});
  }

  xpFill.style.width = Math.min((xp/xpNeeded)*100,100)+"%";
});
