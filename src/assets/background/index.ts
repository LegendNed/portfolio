import {
  Clock, Camera, Scene, PlaneGeometry,
  Vector2, ShaderMaterial, Mesh, WebGLRenderer
} from 'three'

import { getGPUTier } from 'detect-gpu';

import vertexShader from "./vertextShader";
import fragmentShader from "./fragmentShader";

(async () => {
  let gpu = await getGPUTier();

  let clock = new Clock(),
    delta = 0,
    interval = 1 / 24,
    active = true;

  let camera = new Camera();
  camera.position.z = 1;

  let scene = new Scene();
  let geometry = new PlaneGeometry(2, 2);

  let uniforms = {
    u_time: { type: "f", value: 2000 },
    u_resolution: { type: "v2", value: new Vector2() },
    u_mouse: { type: "v2", value: new Vector2() },
    u_complex: { type: "b", value: false },
  };

  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  });

  let mesh = new Mesh(geometry, material);
  scene.add(mesh);

  let renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio / (gpu.tier === 1 ? 4 : 2));
  renderer.setSize(window.innerWidth / (gpu.tier === 1 ? 4 : 2), window.innerHeight / (gpu.tier === 1 ? 4 : 2));

  document.body.appendChild(renderer.domElement);

  onWindowResize();
  window.addEventListener("resize", onWindowResize, false);

  animate();

  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
  }

  function animate() {
    if (!active) return;

    requestAnimationFrame(animate);
    delta += clock.getDelta();
    if (delta > interval) {
      render();
      delta = delta % interval;
    }
  }

  function render() {
    uniforms.u_time.value += 0.1;
    renderer.render(scene, camera);
  }

  window.addEventListener("focus", () => {
    active = true;
    animate();
  });

  window.addEventListener("blur", () => {
    active = false;
  });

  if (gpu.tier === 1)
    document.getElementsByTagName('canvas')[0]
      .classList.add('body-blur')
})();