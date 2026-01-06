// IMPORTS VIA CDN (SEM PASTA LIBS)
import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';

// CANVAS
const canvas = document.getElementById('artifact-canvas');

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05070d);

// CAMERA
const camera = new THREE.PerspectiveCamera(
  45,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  100
);
camera.position.set(0, 1.2, 3);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// LIGHTS
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const dirLight = new THREE.DirectionalLight(0xff4d7d, 1);
dirLight.position.set(2, 4, 3);
scene.add(dirLight);

// ARTEFATO 3D FIXO (PROFISSIONAL)
const loader = new GLTFLoader();
loader.load(
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf',
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(1.2, 1.2, 1.2);
    scene.add(model);

    // ANIMAÇÃO
    function animate() {
      requestAnimationFrame(animate);
      model.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    animate();
  }
);

// RESPONSIVO
window.addEventListener('resize', () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
});
