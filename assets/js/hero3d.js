import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Three.Color xd*/
function opaque(cssColor) {
  const match = cssColor.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
  return match ? `rgb(${match[1]}, ${match[2]}, ${match[3]})` : cssColor;
}

class Hero3D {
  constructor(container) {
    this.container = container;
    this.disposed = false;
    this.dirty = true;
    this.busyUntil = 0;
    this.visible = true;
    this.pageVisible = true;
    this.clock = new THREE.Clock();

    const lowPower =
      window.matchMedia("(max-width: 780px)").matches || (navigator.hardwareConcurrency ?? 8) < 6;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 2);

    this.renderer = new THREE.WebGLRenderer({
      antialias: !lowPower,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    this.camera.position.set(0, 0.55, 6.4);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.enablePan = false;
    this.controls.minDistance = 4.2;
    this.controls.maxDistance = 9;
    this.controls.autoRotate = !REDUCED_MOTION;
    this.controls.autoRotateSpeed = 0.7;
    this.controls.target.set(0, 0, 0);
    this.controls.addEventListener("start", () => {
      this.dirty = true;
    });

    this.buildLights();
    this.buildObject();
    this.buildContactShadow();
    this.applyTheme();

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

    this.themeObserver = new MutationObserver(() => this.applyTheme());
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    this.resize();
    this.playIntro();
    this.animate();
  }

  //scena

  buildLights() {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 5, 5);
    this.scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 1.1);
    rim.position.set(-4, 2, -4);
    this.scene.add(rim);
  }

  buildObject() {
    this.group = new THREE.Group();
    this.scene.add(this.group);

    const core = new THREE.IcosahedronGeometry(1.35, 1);
    this.core = new THREE.Mesh(
      core,
      new THREE.MeshStandardMaterial({ color: 0x9a9a9a, flatShading: true, roughness: 0.55, metalness: 0.1 }),
    );
    this.group.add(this.core);

    const shell = new THREE.IcosahedronGeometry(1.7, 1);
    this.wireframe = new THREE.LineSegments(
      new THREE.EdgesGeometry(shell),
      new THREE.LineBasicMaterial({ transparent: true, opacity: 0.55 }),
    );
    this.group.add(this.wireframe);

    this.ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.012, 8, 96),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.35 }),
    );
    this.ring.rotation.x = 1.15;
    this.group.add(this.ring);

    const count = 60;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 5;
      positions[i + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ size: 0.014, transparent: true, opacity: 0.35 }),
    );
    this.scene.add(this.particles);
  }


  buildEnvironmentMap(topHex, bottomHex) {
    const width = 8;
    const height = 24;
    const data = new Uint8Array(width * height * 4);
    const top = new THREE.Color(topHex);
    const bottom = new THREE.Color(bottomHex);
    const mixed = new THREE.Color();
    for (let y = 0; y < height; y += 1) {
      mixed.copy(bottom).lerp(top, 1 - y / (height - 1));
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
    const environment = pmrem.fromEquirectangular(source).texture;
    pmrem.dispose();
    source.dispose();
    return environment;
  }


  buildContactShadow() {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(size / 2, size / 2, size * 0.05, size / 2, size / 2, size * 0.5);
    gradient.addColorStop(0, "rgba(0,0,0,0.35)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    this.contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(4.4, 4.4),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false }),
    );
    this.contactShadow.rotation.x = -Math.PI / 2;
    this.contactShadow.position.y = -1.7;
    this.scene.add(this.contactShadow);
  }


  applyTheme() {
    const styles = getComputedStyle(document.documentElement);
    const text = opaque(styles.getPropertyValue("--text").trim() || "#111111");
    const accent = opaque(styles.getPropertyValue("--accent").trim() || "#111111");
    const muted = opaque(styles.getPropertyValue("--muted").trim() || "#605f5a");
    const bg = opaque(styles.getPropertyValue("--bg").trim() || "#ffffff");

    this.wireframe.material.color.set(accent);
    this.ring.material.color.set(accent);
    this.particles.material.color.set(muted);

    this.scene.environment?.dispose();
    this.scene.environment = this.buildEnvironmentMap(bg, text);
    this.core.material.envMapIntensity = 0.5;
    this.core.material.needsUpdate = true;
    this.dirty = true;
  }



  animate = () => {
    this.frame = requestAnimationFrame(this.animate);
    if (!this.visible || !this.pageVisible) return;

    const delta = Math.min(this.clock.getDelta(), 0.05);
    const now = performance.now();

    if (this.controls.update(delta)) this.dirty = true;
    if (!REDUCED_MOTION) {
      this.wireframe.rotation.y += delta * 0.12;
      this.ring.rotation.z += delta * 0.08;
      this.dirty = true;
    }
    if (!this.dirty && now >= this.busyUntil) return;

    this.dirty = false;
    this.renderer.render(this.scene, this.camera);
  };

  playIntro() {
    if (REDUCED_MOTION) {
      this.group.scale.setScalar(1);
      return;
    }
    this.group.scale.setScalar(0.001);
    const duration = 900;
    const start = performance.now();
    const easeOutBack = (t) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };
    const step = (now) => {
      if (this.disposed) return;
      const t = Math.min(1, (now - start) / duration);
      this.group.scale.setScalar(Math.max(0.001, easeOutBack(t)));
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
    this.themeObserver.disconnect();
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

function mountHero3D(selector) {
  const container = document.querySelector(selector);
  if (!container) return null;
  try {
    const instance = new Hero3D(container);
    container.classList.add("is-ready");
    return instance;
  } catch (error) {
    container.classList.add("lab3d-unsupported");
    console.warn("Vista 3D no disponible:", error);
    return null;
  }
}

mountHero3D("#lab3d-stage");
