const fileInput = document.getElementById("fileInput");
const artifactPreview = document.getElementById("artifactPreview");

let scene, camera, renderer, currentModel;

function init3D() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0b0f);

  camera = new THREE.PerspectiveCamera(45, artifactPreview.clientWidth / artifactPreview.clientHeight, 0.1, 1000);
  camera.position.set(0, 1.5, 3);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(artifactPreview.clientWidth, artifactPreview.clientHeight);
  artifactPreview.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5,5,5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if(currentModel) currentModel.rotation.y += 0.01;
  renderer.render(scene,camera);
}

function loadModel(file) {
  if(currentModel) scene.remove(currentModel);

  const reader = new FileReader();
  reader.onload = function(e){
    const loader = new THREE.GLTFLoader();
    loader.parse(e.target.result, '', function(gltf){
      currentModel = gltf.scene;
      currentModel.scale.set(1,1,1);
      scene.add(currentModel);
    });
  };
  reader.readAsArrayBuffer(file);
}

fileInput.addEventListener("change",(e)=>{
  const file = e.target.files[0];
  if(!file) return;
  loadModel(file);
});

window.addEventListener("resize", ()=>{
  if(renderer && camera){
    camera.aspect = artifactPreview.clientWidth / artifactPreview.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(artifactPreview.clientWidth, artifactPreview.clientHeight);
  }
});

init3D();
