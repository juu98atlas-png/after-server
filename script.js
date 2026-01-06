// ===============================
// AFTER.SERVER - script.js
// Etapa 5 - Build RPG avançada, ranking e integração completa
// ===============================

// -------------------------
// VARIÁVEIS GLOBAIS
// -------------------------
let users = [];
let currentUser = null;
let artifacts = [
    { name: "Artifact Alpha", rarity: "Raro", buff: 5, img: "https://raw.githubusercontent.com/juu98atlas-png/after-server/main/artifacts/artifact1.png" },
    { name: "Artifact Beta", rarity: "Épico", buff: 10, img: "https://raw.githubusercontent.com/juu98atlas-png/after-server/main/artifacts/artifact2.png" },
    { name: "Artifact Gamma", rarity: "Lendário", buff: 20, img: "https://raw.githubusercontent.com/juu98atlas-png/after-server/main/artifacts/artifact3.png" }
];

// -------------------------
// LOGIN / CADASTRO
// -------------------------
function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const userClass = document.getElementById("userClass").value;

    if (!username || !password) { alert("Preencha todos os campos!"); return; }

    const user = {
        username,
        password,
        class: userClass,
        level: 1,
        xp: 0,
        points: 0,
        build: { mining: 0, luck: 0, efficiency: 0, op1: 0, op2: 0, op3: 0, op4: 0, op5: 0, op6: 0, op7: 0 },
        artifacts: [],
        totalPower: 0,
        messagesSent: 0
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    currentUser = user;

    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    renderProfile();
    renderArtifacts();
    updateClassStats();
    renderRanking();
}

// -------------------------
// RENDERIZAÇÃO PERFIL
// -------------------------
function renderProfile() {
    if (!currentUser) return;

    document.getElementById("profileUsername").textContent = currentUser.username;
    document.getElementById("profileClass").textContent = currentUser.class;
    document.getElementById("profileLevel").textContent = currentUser.level;

    const xpFill = document.getElementById("xpFill");
    xpFill.style.width = `${currentUser.xp}%`;

    // Render build pontos disponíveis
    const buildPanel = document.getElementById("buildPanel");
    buildPanel.innerHTML = "";
    for (const stat in currentUser.build) {
        const container = document.createElement("div");
        container.classList.add("statContainer");
        container.innerHTML = `
            <span>${stat.toUpperCase()}: ${currentUser.build[stat]}</span>
            <button onclick="changeBuild('${stat}', 1)">+</button>
            <button onclick="changeBuild('${stat}', -1)">-</button>
        `;
        buildPanel.appendChild(container);
    }
}

// -------------------------
// ALTERAR BUILD
// -------------------------
function changeBuild(stat, delta) {
    if (!currentUser || currentUser.points <= 0 && delta > 0) return;

    if (delta > 0 && currentUser.points > 0) {
        currentUser.build[stat] += 1;
        currentUser.points -= 1;
    } else if (delta < 0 && currentUser.build[stat] > 0) {
        currentUser.build[stat] -= 1;
        currentUser.points += 1;
    }

    localStorage.setItem("users", JSON.stringify(users));
    renderProfile();
}

// -------------------------
// MINERAÇÃO AVANÇADA
// -------------------------
document.getElementById("mineBtn").addEventListener("click", () => {
    if (!currentUser) return;

    let gainedXP = 5 + currentUser.build.mining + currentUser.build.luck;
    currentUser.artifacts.forEach(a => gainedXP += a.buff);

    currentUser.xp += gainedXP;
    currentUser.totalPower = calculatePower(currentUser);

    if (currentUser.xp >= 100) {
        currentUser.level += 1;
        currentUser.xp -= 100;
        currentUser.points += 5;
        alert(`Parabéns! ${currentUser.username} subiu para o nível ${currentUser.level}`);
    }

    renderProfile();
    renderRanking();
});

// -------------------------
// CALCULAR PODER TOTAL
// -------------------------
function calculatePower(user) {
    let power = user.level * 2;
    power += Object.values(user.build).reduce((a,b)=>a+b,0);
    power += user.artifacts.reduce((a,b)=>a+b.buff,0);
    return power;
}

// -------------------------
// CHAT
// -------------------------
document.getElementById("chatSendBtn").addEventListener("click", () => {
    const msgInput = document.getElementById("chatInput");
    const message = msgInput.value.trim();
    if (!message || !currentUser) return;

    const chatBox = document.getElementById("chatMessages");
    const p = document.createElement("p");
    p.textContent = `[${currentUser.class}] ${currentUser.username} (Lv ${currentUser.level}): ${message}`;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;

    currentUser.messagesSent += 1;
    renderRanking();

    msgInput.value = "";
});

// -------------------------
// ARTEFATOS
// -------------------------
function renderArtifacts() {
    const gallery = document.getElementById("artifactsGallery");
    gallery.innerHTML = "";
    artifacts.forEach((artifact) => {
        const slot = document.createElement("div");
        slot.classList.add("artifactSlot");

        const img = document.createElement("img");
        img.src = artifact.img;
        slot.appendChild(img);

        const name = document.createElement("span");
        name.textContent = artifact.name;
        slot.appendChild(name);

        const buyBtn = document.createElement("button");
        buyBtn.textContent = "Comprar";
        buyBtn.addEventListener("click", () => {
            window.open("https://jlfactoryswoadlyers.blogspot.com", "_blank");
        });
        slot.appendChild(buyBtn);

        gallery.appendChild(slot);
    });
}

// -------------------------
// ADMIN PANEL
// -------------------------
document.getElementById("searchBar").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const val = e.target.value.trim();
        if (val === "/Analise") {
            const password = prompt("Senha:");
            if (password === "0000") {
                document.getElementById("adminPanel").style.display = "flex";
                renderAdminMembers();
            } else alert("Senha incorreta!");
        }
    }
});

function renderAdminMembers() {
    const list = document.getElementById("adminMembers");
    list.innerHTML = "";
    users.forEach((u) => {
        const li = document.createElement("li");
        li.textContent = `${u.username} (${u.class}) - Lv ${u.level} - Power: ${u.totalPower}`;
        list.appendChild(li);
    });
}

// -------------------------
// CLASSES E PAINEL DE MEMBROS
// -------------------------
function updateClassStats() {
    const stats = {Minerador:0, Alcateia:0, Piratas:0, Cúpula:0};
    users.forEach(u => { stats[u.class]++; });

    const list = document.getElementById("classStats");
    list.innerHTML = "";
    for (const c in stats) {
        const li = document.createElement("li");
        li.textContent = `${c}: ${stats[c]} membros`;
        list.appendChild(li);
    }
}

// -------------------------
// RANKING
// -------------------------
function renderRanking() {
    const ranking = document.getElementById("rankingList");
    ranking.innerHTML = "";

    const sortedUsers = [...users].sort((a,b) => b.totalPower - a.totalPower);
    sortedUsers.forEach(u => {
        const li = document.createElement("li");
        li.textContent = `${u.username} (Lv ${u.level}) - Power: ${u.totalPower} - Messages: ${u.messagesSent}`;
        ranking.appendChild(li);
    });
}

// -------------------------
// CARREGAMENTO INICIAL
// -------------------------
window.onload = () => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) users = JSON.parse(savedUsers);
};
