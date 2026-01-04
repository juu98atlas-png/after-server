// Elementos
const mineBtn = document.getElementById("mineBtn");
const xpFill = document.getElementById("xpFill");
const levelSpan = document.getElementById("level");
const coinsSpan = document.getElementById("coins");
const clickSound = document.getElementById("clickSound");
const fileInput = document.getElementById("fileInput");
const artifactViewer = document.getElementById("artifactViewer");

// Estado
let xp = 0;
let level = 1;
let coins = 0;
let xpNeeded = 100;

// Mineração XP
mineBtn.addEventListener("click", () => {
  clickSound.currentTime = 0; clickSound.play().catch(()=>{});
  const gain = Math.floor(Math.random()*15)+5;
  xp += gain;
  if(Math.random()<0.3){coins+=1;coinsSpan.textContent=coins;}
  if(xp>=xpNeeded){xp-=xpNeeded;level++;xpNeeded=Math.floor(xpNeeded*1.4);levelSpan.textContent=level;}
  const percent = Math.min((xp/xpNeeded)*100,100);
  xpFill.style.width = percent + "%";
});

// THREE.js Scene
let scene, camera, renderer, currentModel;
scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
camera = new THREE.PerspectiveCamera(75, artifactViewer.clientWidth/artifactViewer.clientHeight,0.1,1000);
camera.position.z=2;
renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(artifactViewer.clientWidth,artifactViewer.clientHeight);
artifactViewer.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(1,1,2);
scene.add(light);

// Importar 3D
fileInput.addEventListener("change", (e)=>{
  const file = e.target.files[0];
  if(!file)return;
  const reader = new FileReader();
  reader.onload = function(ev){
    const contents = ev.target.result;
    if(file.name.endsWith(".glb")||file.name.endsWith(".gltf")){
      const loader = new THREE.GLTFLoader();
      loader.parse(contents,"", (gltf)=>{
        if(currentModel) scene.remove(currentModel);
        currentModel = gltf.scene;
        scene.add(currentModel);
      });
    } else if(file.name.endsWith(".obj")){
      const loader = new THREE.OBJLoader();
      const object = loader.parse(contents);
      if(currentModel) scene.remove(currentModel);
      currentModel = object;
      scene.add(currentModel);
    }
  };
  reader.readAsArrayBuffer(file);
});

// Animar
function animate(){
  requestAnimationFrame(animate);
  if(currentModel) currentModel.rotation.y+=0.01;
  renderer.render(scene,camera);
}
animate();

// Ajuste responsivo
window.addEventListener("resize", ()=>{
  camera.aspect = artifactViewer.clientWidth/artifactViewer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(artifactViewer.clientWidth,artifactViewer.clientHeight);
});
