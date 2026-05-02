import * as THREE from "three";

const canvas = document.querySelector("[data-automation-scene]");

if (canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0.3, 7.6);

  const group = new THREE.Group();
  scene.add(group);

  const palette = {
    teal: new THREE.Color("#20d0b8"),
    amber: new THREE.Color("#ffb454"),
    coral: new THREE.Color("#ff715b"),
    blue: new THREE.Color("#73a7ff")
  };

  const nodes = [];
  const nodeGeometry = new THREE.IcosahedronGeometry(0.075, 1);
  const positions = [
    [-2.7, 1.2, 0.1],
    [-1.5, 0.2, -0.8],
    [-0.4, 1.1, -0.2],
    [0.8, 0.1, -0.9],
    [2.0, 1.0, 0.05],
    [2.8, -0.45, -0.5],
    [1.0, -1.15, 0.2],
    [-0.9, -0.9, -0.45],
    [-2.4, -0.3, -0.2]
  ];

  positions.forEach((position, index) => {
    const material = new THREE.MeshBasicMaterial({
      color: [palette.teal, palette.amber, palette.blue, palette.coral][index % 4]
    });
    const node = new THREE.Mesh(nodeGeometry, material);
    node.position.set(position[0], position[1], position[2]);
    group.add(node);
    nodes.push(node);
  });

  const linePositions = [];
  const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [8, 0],
    [1, 7],
    [2, 6],
    [3, 8]
  ];

  connections.forEach(([a, b]) => {
    linePositions.push(...nodes[a].position.toArray(), ...nodes[b].position.toArray());
  });

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: "#9ef4e9",
    transparent: true,
    opacity: 0.38
  });
  group.add(new THREE.LineSegments(lineGeometry, lineMaterial));

  const ringGroup = new THREE.Group();
  group.add(ringGroup);

  [1.2, 1.75, 2.3].forEach((radius, index) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.008, 8, 96),
      new THREE.MeshBasicMaterial({
        color: [palette.teal, palette.amber, palette.blue][index],
        transparent: true,
        opacity: 0.5
      })
    );
    ring.rotation.x = Math.PI / 2.45;
    ring.rotation.y = index * 0.42;
    ringGroup.add(ring);
  });

  const particleCount = 900;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 9;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }

  const particles = new THREE.Points(
    new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(particlePositions, 3)),
    new THREE.PointsMaterial({
      color: "#d8fffb",
      size: 0.018,
      transparent: true,
      opacity: 0.58
    })
  );
  scene.add(particles);

  const pointer = { x: 0, y: 0 };

  function resize() {
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  function animate(time) {
    const t = time * 0.001;
    group.rotation.y = t * 0.14 + pointer.x * 0.18;
    group.rotation.x = pointer.y * 0.08;
    ringGroup.rotation.z = t * 0.22;
    particles.rotation.y = t * 0.025;

    nodes.forEach((node, index) => {
      const scale = 1 + Math.sin(t * 2.2 + index) * 0.16;
      node.scale.setScalar(scale);
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * -2;
  });

  resize();
  requestAnimationFrame(animate);
}
