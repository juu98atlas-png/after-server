// ===== STATUS / GAME =====
const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const levelSpan = document.getElementById("level");
const coinsSpan = document.getElementById("coins");

let xp = 0, level = 1, coins = 0, xpNeeded = 100;

mineBtn.addEventListener("click", () => {
  xp += Math.floor(Math.random() * 15) + 5;
  if (Math.random() < 0.3) coins++;

  if (xp >= xpNeeded) {
    xp -= xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded * 1.4);
  }

  levelSpan.textContent = level;
  coinsSpan.textContent = coins;
  xpFill.style.width = Math.min((xp / xpNeeded) * 100, 100) + "%";
});

// ===== THREE.JS =====
const container = document.getElementById("artifactViewer");
const fileInput = document.getElementById("fileInput");

let scene, camera, renderer, model;

init3D();

function init3D() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0b0f);

  camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.5, 3);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // LUZ FORTE (mobile safe)
  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
  scene.add(hemi);

  const dir = new THREE.DirectionalLight(0xffffff, 2);
  dir.position.set(5, 10, 7);
  scene.add(dir);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (model) model.rotation.y += 0.005;
  renderer.render(scene, camera);
}

// ===== CARREGAMENTO DE MODELO =====
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);

  if (model) {
    scene.remove(model);
    model = null;
  }

  if (file.name.endsWith(".glb") || file.name.endsWith(".gltf")) {
    const loader = new THREE.GLTFLoader();
    loader.load(url, (gltf) => {
      model = gltf.scene;
      prepareModel(model);
    });
  }

  if (file.name.endsWith(".obj")) {
    const loader = new THREE.OBJLoader();
    loader.load(url, (obj) => {
      model = obj;
      prepareModel(model);
    });
  }
});

// ===== AJUSTE AUTOMÁTICO (O PULO DO GATO) =====
function prepareModel(object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3()).length();
  const center = box.getCenter(new THREE.Vector3());

  object.position.sub(center);
  const scale = 1.5 / size;
  object.scale.setScalar(scale);

  scene.add(object);
}

// ===== RESPONSIVO =====
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
