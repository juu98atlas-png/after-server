import * as THREE from './libs/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById("artifactCanvas");

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// CAMERA
const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
camera.position.set(0, 1.2, 3);

// RENDERER
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// LIGHTS
scene.add(new THREE.AmbientLight(0xffffff, 0.8));

const dirLight = new THREE.DirectionalLight(0xffc75f, 1);
dirLight.position.set(3, 5, 2);
scene.add(dirLight);

// LOAD MODEL
const loader = new GLTFLoader();
loader.load(
  './models/artifact.glb',
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(1,1,1);
    scene.add(model);

    function animate() {
      requestAnimationFrame(animate);
      model.rotation.y += 0.005;
      renderer.render(scene, camera);
    }

    animate();
  },
  undefined,
  (error) => {
    console.error("Erro ao carregar modelo:", error);
  }
);

// GAME LOGIC
let xp = 0;
let level = 1;
let coins = 0;
let xpNeeded = 100;

const xpFill = document.getElementById("xpFill");
const levelSpan = document.getElementById("level");
const coinsSpan = document.getElementById("coins");
const mineBtn = document.getElementById("mineBtn");

mineBtn.addEventListener("click", () => {
  xp += Math.floor(Math.random() * 12) + 6;

  if (Math.random() < 0.35) coins++;

  if (xp >= xpNeeded) {
    xp -= xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded * 1.4);
    levelSpan.textContent = level;
  }

  coinsSpan.textContent = coins;
  xpFill.style.width = Math.min((xp / xpNeeded) * 100, 100) + "%";
});
