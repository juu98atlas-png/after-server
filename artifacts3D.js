const fileInput = document.getElementById("fileInput");
const artifactPreview = document.getElementById("artifactPreview");

let scene, camera, renderer, currentModel, controls;

function init3D() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0b0f);

  camera = new THREE.PerspectiveCamera(
    45,
    artifactPreview.clientWidth / artifactPreview.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.5, 3);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(artifactPreview.clientWidth, artifactPreview.clientHeight);
  artifactPreview.innerHTML = ''; // Limpa qualquer coisa anterior
  artifactPreview.appendChild(renderer.domElement);

  // Luzes
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  hemi.position.set(0, 20, 0);
  scene.add(hemi);

  const dir = new THREE.DirectionalLight(0xffffff, 1);
  dir.position.set(5, 10, 7.5);
  dir.castShadow = true;
  scene.add(dir);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (currentModel) currentModel.rotation.y += 0.01;
  renderer.render(scene, camera);
}

function loadModel(file) {
  if (currentModel) {
    scene.remove(currentModel);
    currentModel.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const loader = new THREE.GLTFLoader();
    loader.parse(e.target.result, "", function (gltf) {
      currentModel = gltf.scene;

      // Ajusta escala para caber na tela
      const box = new THREE.Box3().setFromObject(currentModel);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim; // caber na tela
      currentModel.scale.set(scale, scale, scale);

      // Centraliza
      const center = box.getCenter(new THREE.Vector3());
      currentModel.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

      scene.add(currentModel);
    });
  };
  reader.readAsArrayBuffer(file);
}

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  loadModel(file);
});

window.addEventListener("resize", () => {
  if (renderer && camera) {
    camera.aspect = artifactPreview.clientWidth / artifactPreview.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(artifactPreview.clientWidth, artifactPreview.clientHeight);
  }
});

init3D();
