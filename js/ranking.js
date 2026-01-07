document.addEventListener("DOMContentLoaded", () => {
  const classRankingEl = document.getElementById("classRanking");
  const playerRankingEl = document.getElementById("playerRanking");

  // Se o HTML ainda não tiver ranking, não quebra nada
  if (!classRankingEl || !playerRankingEl) {
    console.warn("Ranking: elementos não encontrados");
    return;
  }

  // Dados mock (temporários)
  const players = [
    { name: "Neo", class: "Minerador", level: 12 },
    { name: "Raven", class: "Piratas", level: 9 },
    { name: "Nyx", class: "Cúpula", level: 15 },
    { name: "Aiko", class: "Alcateia", level: 7 }
  ];

  // ---------- Ranking por Classe ----------
  const classStats = {};

  players.forEach(p => {
    if (!classStats[p.class]) {
      classStats[p.class] = { totalLevel: 0, count: 0 };
    }
    classStats[p.class].totalLevel += p.level;
    classStats[p.class].count++;
  });

  classRankingEl.innerHTML = "";

  Object.keys(classStats).forEach(cls => {
    const avg = Math.floor(classStats[cls].totalLevel / classStats[cls].count);
    const div = document.createElement("div");
    div.textContent = `${cls} — Média Lv ${avg}`;
    classRankingEl.appendChild(div);
  });

  // ---------- Ranking de Jogadores ----------
  const sortedPlayers = [...players].sort((a, b) => b.level - a.level);

  playerRankingEl.innerHTML = "";

  sortedPlayers.forEach((p, index) => {
    const div = document.createElement("div");
    div.textContent = `#${index + 1} ${p.name} [${p.class}] — Lv ${p.level}`;
    playerRankingEl.appendChild(div);
  });
});
