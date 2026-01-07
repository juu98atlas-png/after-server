function getAllUsers() {
  const users = [];
  for (let key in localStorage) {
    if (key.startsWith("after_user_")) {
      users.push(JSON.parse(localStorage.getItem(key)));
    }
  }
  return users;
}

function renderRanking() {
  const classRankingEl = document.getElementById("classRanking");
  const playerRankingEl = document.getElementById("playerRanking");

  const users = getAllUsers();

  // --- Ranking por Classe ---
  const classPower = {};

  users.forEach(u => {
    if (!classPower[u.class]) classPower[u.class] = 0;
    classPower[u.class] += u.level;
  });

  classRankingEl.innerHTML = "";
  Object.entries(classPower)
    .sort((a,b) => b[1] - a[1])
    .forEach(([cls, power]) => {
      const div = document.createElement("div");
      div.textContent = `${cls}: Poder ${power}`;
      classRankingEl.appendChild(div);
    });

  // --- Ranking de Jogadores ---
  playerRankingEl.innerHTML = "";
  users
    .sort((a,b) => b.level - a.level)
    .slice(0,5)
    .forEach(u => {
      const div = document.createElement("div");
      div.textContent = `${u.nickname} [${u.class}] Lv ${u.level}`;
      playerRankingEl.appendChild(div);
    });
}

renderRanking();
