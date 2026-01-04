// LOJA - Itens compráveis
const lojaArea = document.getElementById("lojaArea");
const lojaSection = document.getElementById("lojaSection");
const lojaGrid = document.getElementById("lojaGrid");

const itens = [
  {name: "XP+ Buff", price: 10},
  {name: "Moeda+ Chance", price: 15},
  {name: "Sorte Rara", price: 25},
];

lojaArea.addEventListener("click", () => {
  lojaSection.classList.toggle("hidden");
  lojaGrid.innerHTML = "";
  itens.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("lojaItem");
    div.textContent = `${item.name}\n${item.price} Coins`;
    div.addEventListener("click", () => {
      if (coins >= item.price) { coins -= item.price; coinsSpan.textContent = coins; alert(`Comprou: ${item.name}`);}
      else alert("Moedas insuficientes!");
    });
    lojaGrid.appendChild(div);
  });
});
