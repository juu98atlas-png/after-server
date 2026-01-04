const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const levelSpan = document.getElementById("level");
const coinsSpan = document.getElementById("coins");
const clickSound = document.getElementById("clickSound");

let xp = 0, level = 1, coins = 0, xpNeeded = 100;

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

/* ---------------------- Artefatos ---------------------- */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/OBJLoader.js';

const artifactUpload = document.getElementById("artifactUpload");
const artifactGallery = document.getElementById("artifactGallery");

artifactUpload.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const ext = file.name.split('.').pop().toLowerCase();
  let loader;

  if (ext === 'glb' || ext === 'gltf') loader = new GLTFLoader();
  else if (ext === 'obj') loader = new OBJLoader();
  else alert("Formato não suportado!");

  const reader = new FileReader();
  reader.onload = function(event) {
    const contents = event.target.result;

    const artifactDiv = document.createElement("div");
    artifactDiv.classList.add("artifact-item");

    // Canvas para 3D
    const canvas = document.createElement("canvas");
    artifactDiv.appendChild(canvas);
    const nameLabel = document.createElement("span");
    nameLabel.textContent = file.name;
    artifactDiv.appendChild(nameLabel);

    artifactGallery.appendChild(artifactDiv);

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      const light = new THREE.AmbientLight(0xffffff, 1);
      scene.add(light);

      if (loader instanceof GLTFLoader) {
        loader.parse(contents, '', function(gltf) {
          scene.add(gltf.scene);
          camera.position.z = 2;
          renderer.render(scene, camera);
        });
      } else if (loader instanceof OBJLoader) {
        const object = loader.parse(contents);
        scene.add(object);
        camera.position.z = 2;
        renderer.render(scene, camera);
      }
    } catch (err) {
      // fallback para celulares que não suportam
      canvas.remove();
      const fallback = document.createElement("img");
      fallback.src = "assets/fallback.png";
      artifactDiv.insertBefore(fallback, nameLabel);
    }
  };

  if (ext === 'obj') reader.readAsText(file);
  else reader.readAsArrayBuffer(file);

});
