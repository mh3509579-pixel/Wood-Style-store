// Three.js 3D Product Viewer
// Creates an interactive 3D view of a product using Three.js

let threeScene, threeCamera, threeRenderer;
let threeModel;
let isThreeInitialized = false;

function initThreeViewer(containerId) {
  const container = document.getElementById(containerId);
  if (!container || isThreeInitialized) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  threeScene = new THREE.Scene();
  threeScene.background = new THREE.Color(0xF5F0E8);

  threeCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  threeCamera.position.set(5, 3, 8);
  threeCamera.lookAt(0, 0, 0);

  threeRenderer = new THREE.WebGLRenderer({ antialias: true });
  threeRenderer.setSize(width, height);
  threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  threeRenderer.shadowMap.enabled = true;
  threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
  threeRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  threeRenderer.toneMappingExposure = 1.2;
  container.appendChild(threeRenderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  threeScene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(5, 8, 7);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  threeScene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xFFEECC, 0.5);
  fillLight.position.set(-4, 2, 3);
  threeScene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xDDEEFF, 0.6);
  rimLight.position.set(0, -2, -6);
  threeScene.add(rimLight);

  const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x4A3728, 0.3);
  threeScene.add(hemiLight);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.ShadowMaterial({ opacity: 0.3, color: 0x4A3728 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.8;
  ground.receiveShadow = true;
  threeScene.add(ground);

  createProductModel();

  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging || !threeModel) return;
    const deltaX = e.clientX - previousMousePosition.x;
    previousMousePosition = { x: e.clientX, y: e.clientY };
    threeModel.rotation.y += deltaX * 0.01;
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    previousMousePosition = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (!isDragging || !threeModel) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - previousMousePosition.x;
    previousMousePosition = { x: touch.clientX, y: touch.clientY };
    threeModel.rotation.y += deltaX * 0.01;
  }, { passive: true });

  container.addEventListener('touchend', () => { isDragging = false; }, { passive: true });

  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    threeCamera.aspect = w / h;
    threeCamera.updateProjectionMatrix();
    threeRenderer.setSize(w, h);
  });

  isThreeInitialized = true;
  animateThreeViewer();
}

function createProductModel() {
  if (!threeScene) return;

  threeModel = new THREE.Group();

  // Main body - elegant rounded box (desk-like object)
  const bodyGeo = new THREE.BoxGeometry(2.4, 0.3, 1.4);
  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x4A3728,
    metalness: 0.05,
    roughness: 0.6,
    clearcoat: 0.3,
    clearcoatRoughness: 0.4,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.15;
  body.castShadow = true;
  threeModel.add(body);

  // Tabletop
  const topGeo = new THREE.BoxGeometry(2.6, 0.08, 1.6);
  const topMat = new THREE.MeshPhysicalMaterial({
    color: 0x5C4033,
    metalness: 0.0,
    roughness: 0.4,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
  });
  const top = new THREE.Mesh(topGeo, topMat);
  top.position.y = 0.34;
  top.castShadow = true;
  threeModel.add(top);

  // Legs
  const legMat = new THREE.MeshPhysicalMaterial({
    color: 0xC9A96E,
    metalness: 0.9,
    roughness: 0.1,
  });

  const legPositions = [[-1.0, -0.5, -0.5], [1.0, -0.5, -0.5], [-1.0, -0.5, 0.5], [1.0, -0.5, 0.5]];
  legPositions.forEach(pos => {
    const legGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.7, 12);
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(pos[0], pos[1], pos[2]);
    leg.castShadow = true;
    threeModel.add(leg);
  });

  // Cross bar
  const barMat = new THREE.MeshPhysicalMaterial({
    color: 0xC9A96E,
    metalness: 0.9,
    roughness: 0.1,
  });

  const barH = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.0, 8), barMat);
  barH.rotation.z = Math.PI / 2;
  barH.position.set(0, -0.15, 0);
  threeModel.add(barH);

  const barD1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.0, 8), barMat);
  barD1.rotation.x = Math.PI / 2;
  barD1.position.set(-0.5, -0.15, 0);
  threeModel.add(barD1);

  const barD2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.0, 8), barMat);
  barD2.rotation.x = Math.PI / 2;
  barD2.position.set(0.5, -0.15, 0);
  threeModel.add(barD2);

  // Decorative object on top - a vase
  const vaseMat = new THREE.MeshPhysicalMaterial({
    color: 0x8A7F6E,
    metalness: 0.1,
    roughness: 0.3,
    clearcoat: 0.4,
    clearcoatRoughness: 0.3,
  });

  const vaseBody = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.25, 0.3, 24), vaseMat);
  vaseBody.position.set(0.6, 0.55, 0.4);
  vaseBody.castShadow = true;
  threeModel.add(vaseBody);

  const vaseNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.15, 0.12, 24), vaseMat);
  vaseNeck.position.set(0.6, 0.76, 0.4);
  vaseNeck.castShadow = true;
  threeModel.add(vaseNeck);

  // Small objects on desk
  const bookMat = new THREE.MeshPhysicalMaterial({
    color: 0x2D1F14,
    roughness: 0.9,
  });
  const book = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 0.22), bookMat);
  book.position.set(-0.5, 0.38, 0.2);
  book.rotation.y = 0.3;
  book.castShadow = true;
  threeModel.add(book);

  const book2 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.03, 0.2), bookMat);
  book2.position.set(-0.45, 0.41, 0.18);
  book2.rotation.y = 0.2;
  book2.castShadow = true;
  threeModel.add(book2);

  threeModel.position.y = 0.3;
  threeScene.add(threeModel);
}

function animateThreeViewer() {
  requestAnimationFrame(animateThreeViewer);
  if (threeModel && !threeModel.userData.isDragging) {
    threeModel.rotation.y += 0.003;
  }
  if (threeRenderer && threeScene && threeCamera) {
    threeRenderer.render(threeScene, threeCamera);
  }
}
