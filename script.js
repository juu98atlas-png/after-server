const enterBtn = document.getElementById("enterBtn");
const hero = document.getElementById("hero");
const app = document.getElementById("app");

const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const levelSpan = document.getElementById("level");
const coinsSpan = document.getElementById("coins");
const clickSound = document.getElementById("clickSound");

const artifactsSection = document.getElementById("artifactsSection");
const artifactUpload = document.getElementById("artifactUpload");
const artifactDisplay = document.getElementById("artifactDisplay");

const shopSection = document.getElementById("shopSection");
const shopItemsContainer = document.getElementById("shopItems");

const labArea = document.getElementById("labArea");
const artifactsArea = document.getElementById("artifactsArea");
const communityArea = document.getElementById("communityArea");
const adminArea = document.getElementById("adminArea");
const shopArea = document.getElementById("shopArea");

let xp = 0;
let level = 1;
let coins = 0;
let xpNeeded = 100;

// Loot/Shop system
let buffs = [
  { name: "XP +10%", cost: 5, effect: () => xpNeeded = Math.floor(xpNeeded * 0.9) },
  { name: "Coins +50%", cost: 10, effect: () => console.log("Chance de moedas aumentada") }
];

// ---------------------
// Landing
enterBtn.addEventListener("click", () => {
  hero.classList.add("hidden");
  app.classList.remove("hidden");
  clickSound.play().catch(() => {});
});

// ---------------------
// Mining XP
mineBtn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});

  const gain = Math.floor(Math.random() * 15) + 5;
  xp += gain;

  if (Math.random() < 0.3) {
    coins += 1;
    coinsSpan.textContent = coins;
  }

  if (xp >= xpNeeded) {
    xp = xp - xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded * 1.4);
    levelSpan.textContent = level;
  }

  const percent = Math.min((xp / xpNeeded) * 100, 100);
  xpFill.style.width = percent + "%";
});

// ---------------------
// Areas Navigation
labArea.addEventListener("click", () => alert("Laboratório em desenvolvimento"));
artifactsArea.addEventListener("click", () => {
  artifactsSection.classList.remove("hidden");
});
communityArea.addEventListener("click", () => alert("Comunidade em breve"));
adminArea.addEventListener("click", () => {
  const pass = prompt("Digite a senha de administração:");
  if(pass === "0000") alert("Acesso liberado!");
  else alert("Senha incorreta!");
});
shopArea.addEventListener("click", () => {
  shopSection.classList.remove("hidden");
});

// ---------------------
// Upload Artefatos
artifactUpload.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    const artifactItem = document.createElement("div");
    artifactItem.textContent = file.name;
    artifactItem.className = "artifactItem";
    artifactDisplay.appendChild(artifactItem);
  });
});

// ---------------------
// Loja
function renderShop() {
  shopItemsContainer.innerHTML = "";
  buffs.forEach(buff => {
    const item = document.createElement("div");
    item.className = "shopItem";
    item.innerHTML = `<span>${buff.name} - ${buff.cost} coins</span>`;
    const buyBtn = document.createElement("button">Comprar</button>`;
    buyBtn.addEventListener("click", () => {
      if(coins >= buff.cost){
        coins -= buff.cost;
        coinsSpan.textContent = coins;
        buff.effect();
        alert(`${buff.name} adquirido!`);
      } else alert("Coins insuficientes!");
    });
    item.appendChild(buyBtn);
    shopItemsContainer.appendChild(item);
  });
}

renderShop();
