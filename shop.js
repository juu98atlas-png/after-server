const buyBuffBtn = document.getElementById("buyBuffBtn");
const shopNotice = document.getElementById("shopNotice");

buyBuffBtn.addEventListener("click", ()=>{
  if(coins>=5){
    coins-=5;
    if(!activeBuffs.includes("XP+")) activeBuffs.push("XP+");
    shopNotice.textContent="Buff XP+ ativado!";
    updateProfile();
  } else {
    shopNotice.textContent="Moedas insuficientes!";
  }
});
