// ====== SISTEMA ======
let xp = 0;
let ore = 0;
let level = 1;

const xpSpan = document.getElementById("xp");
const oreSpan = document.getElementById("ore");
const levelSpan = document.getElementById("level");
const mineBtn = document.getElementById("mineBtn");

mineBtn.addEventListener("click", () => {
  ore += 1;
  xp += 5;

  if (xp >= level * 50) {
    xp = 0;
    level++;
  }

  xpSpan.textContent = xp;
  oreSpan.textContent = ore;
  levelSpan.textContent = level;
});

// ====== THREE.JS ======
const canvas = document.getElementById("threeCanvas");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  45,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 1.2, 3);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Luz
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x88ccff, 1);
directionalLight.position.set(2, 5, 5);
scene.add(directionalLight);

// Modelo fixo
const loader = new THREE.GLTFLoader();
let artifact = null;

loader.load(
  "artifact.glb",
  (gltf) => {
    artifact = gltf.scene;
    artifact.scale.set(1.2, 1.2, 1.2);
    scene.add(artifact);
  },
  undefined,
  (error) => {
    console.error("Erro ao carregar modelo:", error);
  }
);

// Resize
window.addEventListener("resize", () => {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

// Loop
function animate() {
  requestAnimationFrame(animate);

  if (artifact) {
    artifact.rotation.y += 0.005;
  }

  renderer.render(scene, camera);
}

animate();
