import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FIT_SIZE = 3.6;

class GltfViewer3D {
  constructor(container, modelUrl) {
    this.container = container;
    this.disposed = false;
    this.dirty = true;
    this.busyUntil = 0;
    this.visible = true;
    this.pageVisible = true;
    this.clock = new THREE.Clock();

    this.loaderFillEl = container.querySelector(".gltf-loader-fill");
    this.loaderTextEl = container.querySelector(".gltf-loader-pct");
    this.fallbackEl = container.querySelector(".lab3d-fallback");

    const lowPower =
      window.matchMedia("(max-width: 780px)").matches || (navigator.hardwareConcurrency ?? 8) < 6;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 2);

    this.renderer = new THREE.WebGLRenderer({ antialias: !lowPower, alpha: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    this.camera.position.set(2.0, 0.5, 6.4);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.enablePan = false;
    this.controls.minDistance = 4;
    this.controls.maxDistance = 10;
    this.controls.autoRotate = !REDUCED_MOTION;
    this.controls.autoRotateSpeed = 0.9;
    this.controls.target.set(0, 0, 0);
    this.controls.addEventListener("start", () => (this.dirty = true));

    this.buildLights();
    this.buildEnvironment();
    this.buildContactShadow();

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        this.visible = entry.isIntersecting;
        if (this.visible) this.dirty = true;
      },
      { rootMargin: "100px" },
    );
    this.intersectionObserver.observe(container);
    document.addEventListener("visibilitychange", this.onVisibilityChange);

    this.resize();
    this.animate();
    this.loadModel(modelUrl);
  }


  buildLights() {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(3.5, 5, 5.5);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xdbe6ff, 0.85);
    fill.position.set(-4.5, 1.5, 3.5);
    this.scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 1.4);
    rim.position.set(-3, 4, -5);
    this.scene.add(rim);
  }

  buildEnvironment() {
    const width = 8;
    const height = 24;
    const data = new Uint8Array(width * height * 4);
    const top = new THREE.Color(0xf4f4f4);
    const bottom = new THREE.Color(0x222222);
    const mixed = new THREE.Color();
    for (let y = 0; y < height; y += 1) {
      mixed.copy(bottom).lerp(top, Math.pow(1 - y / (height - 1), 0.8));
      for (let x = 0; x < width; x += 1) {
        const i = (y * width + x) * 4;
        data[i] = mixed.r * 255;
        data[i + 1] = mixed.g * 255;
        data[i + 2] = mixed.b * 255;
        data[i + 3] = 255;
      }
    }
    const source = new THREE.DataTexture(data, width, height);
    source.mapping = THREE.EquirectangularReflectionMapping;
    source.colorSpace = THREE.SRGBColorSpace;
    source.needsUpdate = true;
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromEquirectangular(source).texture;
    pmrem.dispose();
    source.dispose();
  }

  buildContactShadow() {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(size / 2, size / 2, size * 0.06, size / 2, size / 2, size * 0.5);
    gradient.addColorStop(0, "rgba(0,0,0,0.4)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    this.contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 }),
    );
    this.contactShadow.rotation.x = -Math.PI / 2;
    this.scene.add(this.contactShadow);
  }

//modelo

  async loadModel(url) {
    this.setLoading(true, 0);
    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    let gltf;
    try {
      gltf = await loader.loadAsync(url, (event) => {
        if (event.total) this.setLoading(true, event.loaded / event.total);
      });
    } catch (error) {
      console.warn("No se pudo cargar el modelo 3D:", error);
      this.setLoading(false, 0);
      this.container.classList.add("gltf-unsupported");
      if (this.fallbackEl) this.fallbackEl.textContent = "No se pudo cargar el modelo 3D.";
      return;
    }
    if (this.disposed) return;

    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = FIT_SIZE / Math.max(size.x, size.y, size.z, 0.001);
    model.scale.setScalar(scale);
    model.position.copy(center).multiplyScalar(-scale);

    model.traverse((child) => {
      if (!child.isMesh) return;
      child.frustumCulled = false;
      const material = child.material;
      if (material?.isMeshStandardMaterial) material.envMapIntensity = 0.9;
    });

    this.pivot = new THREE.Group();
    this.pivot.add(model);
    this.scene.add(this.pivot);

  
    this.contactShadow.position.y = (box.min.y - center.y) * scale + 0.01;
    this.contactShadow.material.opacity = 0.6;

    this.setLoading(false, 1);
    this.playIntro();
  }

  setLoading(loading, progress) {
    if (loading) {
      this.container.classList.add("is-loading");
      if (this.loaderFillEl) this.loaderFillEl.style.width = `${Math.round(progress * 100)}%`;
      if (this.loaderTextEl) this.loaderTextEl.textContent = `${Math.round(progress * 100)}%`;
    } else {
      this.container.classList.remove("is-loading");
    }
    this.dirty = true;
  }


  animate = () => {
    this.frame = requestAnimationFrame(this.animate);
    if (!this.visible || !this.pageVisible) return;
    const delta = Math.min(this.clock.getDelta(), 0.05);
    const now = performance.now();
    if (this.controls.update(delta)) this.dirty = true;
    if (!this.dirty && now >= this.busyUntil) return;
    this.dirty = false;
    this.renderer.render(this.scene, this.camera);
  };

  playIntro() {
    if (!this.pivot) return;
    if (REDUCED_MOTION) {
      this.pivot.scale.setScalar(1);
      return;
    }
    this.pivot.scale.setScalar(0.001);
    const duration = 850;
    const start = performance.now();
    const easeOutBack = (t) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };
    const step = (now) => {
      if (this.disposed) return;
      const t = Math.min(1, (now - start) / duration);
      this.pivot.scale.setScalar(Math.max(0.001, easeOutBack(t)));
      this.dirty = true;
      this.busyUntil = performance.now() + 50;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  onVisibilityChange = () => {
    this.pageVisible = !document.hidden;
    if (this.pageVisible) {
      this.clock.start();
      this.dirty = true;
    }
  };

  resize() {
    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.dirty = true;
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.controls.dispose();
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    this.scene.traverse((child) => {
      child.geometry?.dispose();
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        if (!material) return;
        Object.values(material).forEach((value) => {
          if (value instanceof THREE.Texture) value.dispose();
        });
        material.dispose();
      });
    });
    this.scene.environment?.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}

export function mountGltfViewer3D(selector, modelUrl) {
  const container = document.querySelector(selector);
  if (!container) return null;
  try {
    const instance = new GltfViewer3D(container, modelUrl);
    container.classList.add("is-ready");
    return instance;
  } catch (error) {
    container.classList.add("gltf-unsupported");
    console.warn("Visor 3D no disponible:", error);
    return null;
  }
}

mountGltfViewer3D("#horse-3d-stage", "assets/models/horse.glb");
